'use strict';

//Libraries
import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import async from 'async';
import http from 'superagent';
import moment from 'moment';

//Utilities
import Lead from '../../src/api/Lead';
import tests from '../../src/configs/tests';

chai.use(chaiAsPromised);
chai.should();

let superuserToken = 'bearer ';
let superuserId = '';
let userToken = 'bearer ';
let userId = '';
let leadId = '';
let updatePasswordUserToken = 'bearer ';
let updatePasswordUserId = '';
let loginUserId = '';
let refreshTokenUserId = '';
let refreshTokenToken = '';
let validLeadData = {
    budget: tests.lead_budget.valid,
    property: {
        size: tests.lead_property_size.valid,
        type: tests.lead_property_type.valid,
        isNew: tests.lead_property_is_new.valid
    },
    style: tests.lead_style.valid,
    isLoanRequired: tests.lead_is_loan_required.valid,
    priority: tests.lead_priority.valid,
    keyCollection: tests.lead_key_collection.valid,
    contact: tests.lead_contact,
    details: tests.lead_details,
    preferredTimeOfContact: tests.lead_preferred_time_of_contact.valid,
    os: tests.lead_os.valid
};

describe('Lead', () => {
    before((done) => {
        console.log(`Start of Lead tests`);
        console.log(`Setting up tests...`);
        async.series([
            callback => {
                http
                    .post('/authentication/connect/local/')
                    .use(tests.base_url)
                    .type('json')
                    .send({
                        email: tests.test_user.email,
                        password: tests.test_user.password
                    })
                    .end((error, res) => {
                        if (!error) {
                            if (res.body.role !== 'superuser') {
                                callback(new Error('test_user supplied is not a superuser!'));
                            } else {
                                superuserId = res.body.user._id;
                                superuserToken += res.body.tokens.accessToken;
                                callback();
                            }
                        } else {
                            callback(error);
                        }
                    });
            }, callback => {
                http
                    .post('/authentication/register/')
                    .use(tests.base_url)
                    .type('json')
                    .send({
                        name: tests.register_name.valid,
                        email: tests.register_email.valid,
                        password: tests.register_password.valid
                    })
                    .end((error, res) => {
                        if (!error) {
                            userToken += res.body.tokens.accessToken;
                            userId = res.body.user._id;
                            callback();
                        } else {
                            callback(error);
                        }
                    });
            }, callback => {
                http
                    .post('/lead')
                    .use(tests.base_url)
                    .set('Authorization', userToken)
                    .type('json')
                    .send(validLeadData)
                    .end((error, res) => {
                        if (!error) {
                            leadId = res.body._id;
                            callback();
                        } else {
                            callback(error);
                        }
                    });
            }
        ], error => {
            if (!error) {
                console.log(`Setup complete.`);
                console.log(`Expected values:`);
                console.log(`\tsuperuserId: %s`, superuserId);
                console.log(`\tuserId: %s`, userId);
                console.log(`\tleadId: %s`, leadId);
                console.log(`Starting tests...`);
                done();
            } else {
                console.log(`Error occured! Aborting...`);
                done(error);
            }
        });
    });

    describe('#getLead', () => {
        it('should be a method', () => {
            assert.equal(typeof Lead, 'function');
            assert.equal(typeof Lead.getLead, 'function');
        });

        it('should return a function', () => {
            let getLead = Lead.getLead();
            assert.equal(typeof getLead, 'function');
        });

        describe('#return', () => {
            it('should return a Promise', () => {
                let getLead = Lead.getLead();
                assert.instanceOf(getLead(), Promise);
            });

            it('#1 should return an error 401', () => {
                let getLead = Lead.getLead();
                return getLead().should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#2 should return an error 401', () => {
                let nullAll = Lead.getLead();
                return nullAll(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#3 should return an error 401', () => {
                let emptyAll = Lead.getLead();
                return emptyAll('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#4 should return an error 401', () => {
                let invalidAll = Lead.getLead();
                return invalidAll(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#5 should return a lead with leadId', () => {
                let validAll = Lead.getLead();
                return validAll(userToken).should.eventually.be.fulfilled
                    .and.eventually.have.property('_id', leadId);
            });
        });
    });

    after((done) => {
        console.log(`Cleaning up...`);
        let hasError = false;
        async.parallel({
            deleteUser: callback => {
                http
                    .del('/superuser/user/' + userId)
                    .use(tests.base_url)
                    .set('Authorization', superuserToken)
                    .end((error, res) => {
                        if (!error) {
                            callback(null);
                        } else {
                            //Want to propagate all errors
                            hasError = true;
                            callback(null, error);
                        }
                    });
            }
        }, (error, results) => {
            if (hasError) {
                //prints all propagated errors
                console.log(results);
                console.log(`Clean up done with error(s).`);
            } else {
                console.log(`Clean up done.`);
            }
            console.log(`End of Lead tests`);
            done();
        });
    });
});
