'use strict';

//Libraries
import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import async from 'async';
import http from 'superagent';
import moment from 'moment';

//Utilities
import User from '../../src/api/User';
import tests from '../../src/configs/tests';

chai.use(chaiAsPromised);
chai.should();

let superuserToken = 'bearer ';
let superuserId = '';
let userToken = 'bearer ';
let userId = '';
let leadId = '';
let registerTestEmail = moment().valueOf() + tests.register_email.valid;
let updatePasswordUserToken = 'bearer ';
let updatePasswordUserId = '';
let loginUserId = '';
let refreshTokenUserId = '';
let refreshTokenToken = '';

describe('User', () => {
    before((done) => {
        console.log(`Start of User tests`);
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
                    .send({
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
                    })
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
                console.log('\temail: %s', registerTestEmail);
                console.log(`Starting tests...`);
                done();
            } else {
                console.log(`Error occured! Aborting...`);
                done(error);
            }
        });
    });

    describe('#getUser', () => {
        it('should be a method', () => {
            assert.equal(typeof User, 'function');
            assert.equal(typeof User.getUser, 'function');
        });

        it('should return a function', () => {
            let getUser = User.getUser();
            assert.equal(typeof getUser, 'function');
        });

        describe('#return', () => {
            it('should return a Promise', () => {
                let getUser = User.getUser();
                assert.instanceOf(getUser(), Promise);
            });

            it('#1 should return an error 401', () => {
                let getUser = User.getUser();
                return getUser().should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#2 should return an error 401', () => {
                let nullToken = User.getUser(false);
                return nullToken(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#3 should be fulfilled', () => {
                let nullPoplead = User.getUser(null);
                return nullPoplead(userToken).should.eventually.be.fulfilled;
            });

            it('#4 should return an error 401', () => {
                let nullAll = User.getUser(null);
                return nullAll(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#5 should return an error 401', () => {
                let emptyToken = User.getUser(false);
                return emptyToken('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#6 should be fulfilled', () => {
                let emptyPoplead = User.getUser('');
                return emptyPoplead(userToken).should.eventually.be.fulfilled;
            });

            it('#7 should return an error 401', () => {
                let emptyAll = User.getUser('');
                return emptyAll('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#8 should return an error 401', () => {
                let invalidToken = User.getUser(false);
                return invalidToken(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#9 should be fulfilled', () => {
                let invalidPoplead = User.getUser('foo'); // expects boolean
                return invalidPoplead(userToken).should.eventually.be.fulfilled;
            });

            it('#10 should return an error 401', () => {
                let invalidAll = User.getUser('foo');
                return invalidAll(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#11 should be fulfilled with matching userId', () => {
                let validToken = User.getUser();
                return validToken(userToken).should.eventually.be.fulfilled
                    .and.eventually.have.property('_id', userId);
            });

            it('#11 should be fulfilled with no lead field', () => {
                let validToken = User.getUser();
                return validToken(userToken).should.eventually.be.fulfilled
                    .and.eventually.not.have.property('lead');
            });

            it('#12 should be fulfilled with lead and its leadId', () => {
                let popleadTrue = User.getUser(true);
                return popleadTrue(userToken).should.eventually.be.fulfilled
                    .and.eventually.have.property('lead')
                    .and.eventually.have.property('_id', leadId);
            });

            it('#13 should be fulfilled with no lead', () => {
                let popleadFalse = User.getUser(false);
                return popleadFalse(userToken).should.eventually.be.fulfilled
                    .and.eventually.not.have.property('lead');
            });
        });
    });

    describe('#updatePassword', () => {
        before((done) => {
            console.log('Setting up dedicated user for update password tests...');
            async.series([
                callback => {
                    http
                        .post('/authentication/register/')
                        .use(tests.base_url)
                        .type('json')
                        .send({
                            name: tests.update_password_params.valid.name,
                            email: tests.update_password_params.valid.email,
                            password: tests.update_password_params.valid.creationPassword
                        })
                        .end((error, res) => {
                            if (!error) {
                                updatePasswordUserToken += res.body.tokens.accessToken;
                                updatePasswordUserId = res.body.user._id;
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
                    console.log(`\tupdatePasswordUserId: %s`, updatePasswordUserId);
                    console.log(`Starting tests...`);
                    done();
                } else {
                    console.log(`Error occured! Aborting...`);
                    done(error);
                }
            });
        });

        it('should be a method', () => {
            assert.equal(typeof User, 'function');
            assert.equal(typeof User.updatePassword, 'function');
        });

        it('should return a function', () => {
            let updatePassword = User.updatePassword();
            assert.equal(typeof updatePassword, 'function');
        });

        describe('#return', () => {
            it('should return a Promise', () => {
                let updatePassword = User.updatePassword();
                assert.instanceOf(updatePassword(), Promise);
            });

            it('#1 should return an error 401', () => {
                let updatePassword = User.updatePassword();
                return updatePassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#2 should return an error 401', () => {
                let nullToken = User.updatePassword(tests.update_password_params.valid.password, tests.update_password_params.valid.match);
                return nullToken(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#3 should return an error 400', () => {
                let nullPassword = User.updatePassword(null, tests.update_password_params.valid.match);
                return nullPassword(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#4 should return an error 400', () => {
                let nullPasswordConfirm = User.updatePassword(tests.update_password_params.valid.password, null);
                return nullPasswordConfirm(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#5 should return an error 401', () => {
                let nullTokenPassword = User.updatePassword(null, tests.update_password_params.valid.match);
                return nullTokenPassword(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#6 should return an error 401', () => {
                let nullTokenPasswordConfirm = User.updatePassword(tests.update_password_params.valid.password, null);
                return nullTokenPasswordConfirm(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#7 should return an error 400', () => {
                let nullPasswordPasswordConfirm = User.updatePassword(null, null);
                return nullPasswordPasswordConfirm(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#8 should return an error 401', () => {
                let nullAll = User.updatePassword(null, null);
                return nullAll(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#9 should return an error 401', () => {
                let emptyToken = User.updatePassword(tests.update_password_params.valid.password, tests.update_password_params.valid.match);
                return emptyToken('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#10 should return an error 400', () => {
                let emptyPassword = User.updatePassword('', tests.update_password_params.valid.match);
                return emptyPassword(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#11 should return an error 400', () => {
                let emptyPasswordConfirm = User.updatePassword(tests.update_password_params.valid.password, '');
                return emptyPasswordConfirm(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#12 should return an error 401', () => {
                let emptyTokenPassword = User.updatePassword('', tests.update_password_params.valid.match);
                return emptyTokenPassword('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#13 should return an error 401', () => {
                let emptyTokenPasswordConfirm = User.updatePassword(tests.update_password_params.valid.password, '');
                return emptyTokenPasswordConfirm('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#14 should return an error 400', () => {
                let emptyPasswordPasswordConfirm = User.updatePassword('', '');
                return emptyPasswordPasswordConfirm(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#15 should return an error 401', () => {
                let emptyAll = User.updatePassword('', '');
                return emptyAll('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#16 should return an error 401', () => {
                let invalidToken = User.updatePassword(tests.update_password_params.valid.password, tests.update_password_params.valid.match);
                return invalidToken(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#17 should return an error 400', () => {
                let invalidPassword = User.updatePassword(tests.update_password_params.invalid.password, tests.update_password_params.valid.match);
                return invalidPassword(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#18 should return an error 400', () => {
                let invalidPasswordConfirm = User.updatePassword(tests.update_password_params.valid.password, tests.update_password_params.invalid.match);
                return invalidPasswordConfirm(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#19 should return an error 401', () =>  {
                let invalidTokenPassword = User.updatePassword(tests.update_password_params.invalid.password, tests.update_password_params.valid.match);
                return invalidTokenPassword(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#20 should return an error 401', () => {
                let invalidTokenPasswordConfirm = User.updatePassword(tests.update_password_params.valid.password, tests.update_password_params.invalid.match);
                return invalidTokenPasswordConfirm(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#21 should return an error 400', () => {
                let invalidPasswordPasswordConfirm = User.updatePassword(tests.update_password_params.invalid.password, tests.update_password_params.invalid.match);
                return invalidPasswordPasswordConfirm(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#22 should return an error 401', () => {
                let invalidAll = User.updatePassword(tests.update_password_params.invalid.password, tests.update_password_params.invalid.match);
                return invalidAll(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#23 should return an error 400', () => {
                let validNoMatch = User.updatePassword(tests.update_password_params.valid.password, tests.update_password_params.valid.no_match);
                return validNoMatch(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#24 should return an error 400', () => {
                let invalidNoMatch = User.updatePassword(tests.update_password_params.invalid.password, tests.update_password_params.invalid.no_match);
                return invalidNoMatch(updatePasswordUserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#25 should be fulfilled', () => {
                let validAll = User.updatePassword(tests.update_password_params.valid.password, tests.update_password_params.valid.match);
                return validAll(updatePasswordUserToken).should.eventually.be.fulfilled;
            });
        });

        after((done) => {
            console.log(`Cleaning up after update password tests...`);
            let hasError = false;
            async.parallel({
                deleteUser: callback => {
                    http
                        .del('/superuser/user/' + updatePasswordUserId)
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
                console.log(`End of update password tests`);
                done();
            });
        });
    });

    describe('#getUserPublic', () => {
        it('should be a method', () => {
            assert.equal(typeof User, 'function');
            assert.equal(typeof User.getUserPublic, 'function');
        });

        it('should return a function', () => {
            let getUserPublic = User.getUserPublic();
            assert.equal(typeof getUserPublic, 'function');
        });

        describe('#return', () => {
            it('should return a Promise', () => {
                let getUserPublic = User.getUserPublic();
                assert.instanceOf(getUserPublic(), Promise);
            });

            it('#1 should return an error 401', () => {
                let getUserPublic = User.getUserPublic();
                return getUserPublic().should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#2 should return an error 401', () => {
                let nullToken = User.getUserPublic(superuserId);
                return nullToken(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#3 should return an error 500', () => {
                let nullUser = User.getUserPublic(null);
                return nullUser(userToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            it('#4 should return an error 401', () => {
                let nullAll = User.getUserPublic(null);
                return nullAll(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#5 should return an error 401', () => {
                let emptyToken = User.getUserPublic(superuserId);
                return emptyToken('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#6 should be fulfilled with userId', () => {
                let emptyUserId = User.getUserPublic('');
                return emptyUserId(userToken).should.eventually.be.fulfilled
                    .and.eventually.have.property('_id', userId);
            });

            it('#7 should return an error 401', () =>  {
                let emptyAll = User.getUserPublic('');
                return emptyAll('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#8 should return an error 401', () => {
                let invalidToken = User.getUserPublic(superuserId);
                return invalidToken(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#9 should return an error 404', () => {
                let invalidUserId = User.getUserPublic(tests.id.invalid);
                return invalidUserId(userToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#10 should return an error 401', () => {
                let invalidAll = User.getUserPublic(tests.id.invalid);
                return invalidAll(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#11 should be fulfilled with superuserId', () => {
                let validAll = User.getUserPublic(superuserId);
                return validAll(userToken).should.eventually.be.fulfilled
                    .and.eventually.have.property('_id', superuserId);
            });
        });
    });

    describe('#register', () => {
        it('should be a method', () => {
            assert.equal(typeof User, 'function');
            assert.equal(typeof User.register, 'function');
        });

        it('should return a function', () => {
            let register = User.register();
            assert.equal(typeof register, 'function');
        });

        describe('#return', () => {
            it('should return a Promise', () => {
                let register = User.register();
                assert.instanceOf(register(), Promise);
            });

            it('#1 should return an error 500', () => {
                let register = User.register();
                return register().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#2 should return an error 400', () => {
                let nullName = User.register(null, registerTestEmail, tests.register_password.valid);
                return nullName().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#3 should return an error 400', () => {
                let nullEmail = User.register(tests.register_name.valid, null, tests.register_password.valid);
                return nullEmail().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#4 should return an error 400', () => {
                let nullPassword = User.register(tests.register_name.valid, registerTestEmail, null);
            });

            it('#5 should return an error 400', () => {
                let nullNameEmail = User.register(null, null, tests.register_password.valid);
                return nullNameEmail().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#6 should return an error 400', () => {
                let nullNamePassword = User.register(null, registerTestEmail, null);
                return nullNamePassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#7 should return an error 400', () => {
                let nullEmailPassword = User.register(tests.register_name.valid, null, null);
                return nullEmailPassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#8 should return an error 400', () => {
                let nullAll = User.register(null, null, null);
                return nullAll().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#9 should return an error 500', () => {
                let emptyName = User.register('', registerTestEmail, tests.register_password.valid);
                return emptyName().should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            it('#10 should return an error 500', () => {
                let emptyEmail = User.register(tests.register_name.valid, '', tests.register_password.valid);
                return emptyEmail().should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            it('#11 should return an error 400', () => {
                let emptyPassword = User.register(tests.register_name.valid, registerTestEmail, '');
                return emptyPassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#12 should return an error 500', () => {
                let emptyNameEmail = User.register('', '', tests.register_password.valid);
                return emptyNameEmail().should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            it('#13 should return an error 400', () => {
                let emptyNamePassword = User.register('', registerTestEmail, '');
                return emptyNamePassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#14 should return an error 400', () => {
                let emptyEmailPassword = User.register(tests.register_name.valid, '', '');
                return emptyEmailPassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#15 should return an error 400', () => {
                let emptyAll = User.register('', '', '');
                return emptyAll().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#16 should return an error 500', () => {
                let invalidName = User.register(tests.register_name.invalid, registerTestEmail, tests.register_password.valid);
                return invalidName().should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            it('#17 should return an error 500',() => {
                let invalidEmail = User.register(tests.register_name.valid, tests.register_email.invalid, tests.register_password.valid);
                return invalidEmail().should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            it('#18 should return an error 400', () => {
                let invalidPassword =
                User.register(tests.register_name.valid, registerTestEmail, tests.register_password.invalid);
                return invalidPassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#19 should return an error 500', () => {
                let invalidNameEmail = User.register(tests.register_name.invalid, tests.register_email.invalid, tests.register_password.valid);
                return invalidNameEmail().should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            it('#20 should return an error 400', () => {
                let invalidNamePassword = User.register(tests.register_name.invalid, registerTestEmail, tests.register_password.invalid);
                return invalidNamePassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#21 should return an error 400', () => {
                let invalidEmailPassword = User.register(tests.register_name.valid, tests.register_email.invalid, tests.register_password.invalid);
                return invalidEmailPassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#22 should return an error 400', () => {
                let invalidAll = User.register(tests.register_name.invalid, tests.register_email.invalid, tests.register_password.invalid);
                return invalidAll().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#23 should be fulfilled', () => {
                let validAll = User.register(tests.register_name.valid, registerTestEmail, tests.register_password.valid);
                return validAll().should.eventually.be.fulfilled;
            });

            it('#24 should return an error 400', () => {
                let secondCall = User.register(tests.register_name.valid, registerTestEmail, tests.register_password.valid);
                return secondCall().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });
        });
    });

    describe('#login', () => {
        before((done) => {
            console.log('Setting up dedicated user for login tests...');
            async.series([
                callback => {
                    http
                        .post('/authentication/register/')
                        .use(tests.base_url)
                        .type('form')
                        .send({
                            name: tests.login_name,
                            email: tests.login_email.valid,
                            password: tests.login_password.valid
                        })
                        .end((error, res) => {
                            if (!error) {
                                loginUserId = res.body.user._id;
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
                    console.log(`\tloginUserId: %s`, loginUserId);
                    console.log(`Starting tests...`);
                    done();
                } else {
                    console.log(`Error occured! Aborting...`);
                    done(error);
                }
            });
        });

        it('should be a method', () => {
            assert.equal(typeof User, 'function');
            assert.equal(typeof User.login, 'function');
        });

        it('should return a function', () => {
            let login = User.login();
            assert.equal(typeof login, 'function');
        });

        describe('#return', () => {
            it('should return a promise', () => {
                let login = User.login();
                assert.instanceOf(login(), Promise);
            });

            it('#1 should return an error 400', () => {
                let login = User.login();
                return login().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#2 should return an error 400', () => {
                let nullEmail = User.login(null, tests.login_password.valid);
                return nullEmail().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#3 should return an error 400', () => {
                let nullPassword = User.login(tests.login_email.valid, null);
                return nullPassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#4 should return an error 400', () => {
                let nullAll = User.login(null, null);
                return nullAll().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#5 should return an error 400', () => {
                let emptyEmail = User.login('', tests.login_password.valid);
                return emptyEmail().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#6 should return an error 400', () => {
                let emptyPassword = User.login(tests.login_email.valid, '');
                return emptyPassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#7 should return an error 400', () => {
                let emptyAll = User.login('', '');
                return emptyAll().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#8 should return an error 400', () => {
                let invalidEmail = User.login(tests.login_email.invalid, tests.login_password.valid);
                return invalidEmail().should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#9 should return an error 400', () => {
                let invalidPassword = User.login(tests.login_email.valid, tests.login_password.invalid);
                return invalidPassword().should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#10 should return an error 400', () => {
                let invalidAll = User.login(tests.login_email.invalid, tests.login_password.invalid);
                return invalidAll().should.eventually.be.rejected
                    .and.eventually.have.property('status', 401);
            });

            it('#11 should be fulfilled with loginUserId', () => {
                let validAll = User.login(tests.login_email.valid, tests.login_password.valid);
                return validAll().should.eventually.be.fulfilled
                    .and.eventually.have.property('user')
                    .and.eventually.have.property('_id', loginUserId);
            });
        });

        after((done) => {
            console.log(`Cleaning up after login tests...`);
            let hasError = false;
            async.parallel({
                deleteUser: callback => {
                    http
                        .del('/superuser/user/' + loginUserId)
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
                console.log(`End of login tests`);
                done();
            });
        });
    });

    describe('#refreshToken', () => {
        before((done) => {
            console.log('Setting up dedicated user for refresh tokens tests...');
            async.series([
                callback => {
                    http
                        .post('/authentication/register/')
                        .use(tests.base_url)
                        .type('form')
                        .send({
                            name: tests.refresh_token_name,
                            email: tests.refresh_token_email,
                            password: tests.refresh_token_password
                        })
                        .end((error, res) => {
                            if (!error) {
                                refreshTokenUserId = res.body.user._id;
                                refreshTokenToken = res.body.tokens.refreshToken;
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
                    console.log(`\trefreshTokenUserId: %s`, refreshTokenUserId);
                    console.log(`Starting tests...`);
                    done();
                } else {
                    console.log(`Error occured! Aborting...`);
                    done(error);
                }
            });
        });

        it('should be a method', () => {
            assert.equal(typeof User, 'function');
            assert.equal(typeof User.refreshToken, 'function');
        });

        it('should return a function', () => {
            let refreshToken = User.refreshToken();
            assert.equal(typeof refreshToken, 'function');
        });

        describe('#return', () => {
            it('should return a promise', () => {
                let refreshToken = User.refreshToken();
                assert.instanceOf(refreshToken(), Promise);
            });

            it('#1 should return an error 400', () => {
                let refreshToken = User.refreshToken();
                return refreshToken().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#2 should return an error 400', () => {
                let nullAll = User.refreshToken();
                return nullAll(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#3 should return an error 400', () => {
                let emptyAll = User.refreshToken();
                return emptyAll('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#4 should return an error 400', () => {
                let invalidAll = User.refreshToken();
                return invalidAll(tests.refresh_token_token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#5 should be fulfilled with refreshTokenUserId', () => {
                let validAll = User.refreshToken();
                return validAll(refreshTokenToken).should.eventually.be.fulfilled
                    .and.eventually.have.property('user')
                    .and.eventually.have.property('_id', refreshTokenUserId);
            })
        });

        after((done) => {
            console.log(`Cleaning up after refresh token tests...`);
            let hasError = false;
            async.parallel({
                deleteUser: callback => {
                    http
                        .del('/superuser/user/' + refreshTokenUserId)
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
                console.log(`End of Refresh Token tests`);
                done();
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
            console.log(`End of User tests`);
            done();
        });
    });
});
