'use strict';

// Libraries
import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import async from 'async';
import http from 'superagent';

// Utilities
import Article from '../../src/api/Article';
import tests from '../../src/configs/tests';

chai.use(chaiAsPromised);
chai.should();

let superuserToken = "bearer ";
let articleCount = 0;
let articleId = '';

describe('Article', () => {
    before((done) => {
        console.log(`Start of Article tests`);
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
                                superuserToken += res.body.tokens.accessToken;
                                callback();
                            }
                        } else {
                            callback(error);
                        }
                    });
            }, (callback) => {
                //Inserting test article
                http
                    .post('/superuser/article/')
                    .use(tests.base_url)
                    .set('Authorization', superuserToken)
                    .send({
                        'title': tests.article.title
                    })
                    .end((error, res) => {
                        if (!error) {
                            articleId = res.body._id;
                            callback(null);
                        } else {
                            callback(error);
                        }
                    });
            },
            (callback) => {
                //Retrieving total article count directly
                http
                    .get('/articles/')
                    .use(tests.base_url)
                    .set('Authorization', superuserToken)
                    .end((error, res) => {
                        if (!error) {
                            articleCount = res.body.itemCount;
                            callback(null);
                        } else {
                            callback(error);
                        }
                    });
            }
        ], (error) => {
            if (!error) {
                console.log(`Setup complete.`);
                console.log(`Expected values:`);
                console.log(`\tarticleCount: %s`, articleCount);
                console.log(`\tarticleId: %s`, articleId);
                console.log(`Starting tests...`);
                done();
            } else {
                console.log(`Error occured! Aborting...`)
                console.log(error);
                done(error);
            }
        });
    });

    describe('#getArticles', () => {
        it('should be a method', () => {
            assert.equal(typeof Article, 'function');
            assert.equal(typeof Article.getArticles, 'function');
        });

        it('should return a method when called', () => {
            let getArticles = Article.getArticles();
            assert.equal(typeof getArticles, 'function');
        });

        describe('#return', () => {
            it('should return a Promise', () => {
                let getArticles = Article.getArticles();
                assert.instanceOf(getArticles(), Promise);
            });

            it('#1 should be fulfilled', () => {
                let getArticles = Article.getArticles();
                return getArticles().should.eventually.be.fulfilled;
            });

            it('#2 should return an error 403', () => {
                let getArticles = Article.getArticles();
                return getArticles(null).should.eventually.be.fulfilled;
            });

            it('#3 should return an error 403', () => {
                let getArticles = Article.getArticles();
                return getArticles('').should.eventually.be.fulfilled;
            });

            it('#4 should return an error 403', () => {
                let getArticles = Article.getArticles();
                return getArticles(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 403);
            });

            it('should be fulfilled when called', () => {
                let getArticles = Article.getArticles();
                return getArticles(superuserToken).should.eventually.be.fulfilled;
            });

            it('should have a itemCount field', () => {
                let getArticles = Article.getArticles();
                return getArticles(superuserToken).should.eventually.be.fulfilled
                    .and.eventually.have.property('itemCount');
            });

            it('should have a data field', () => {
                let getArticles = Article.getArticles();
                return getArticles(superuserToken).should.eventually.be.fulfilled
                    .and.eventually.have.property('data');
            });

            it('should return articleCount value for itemCount', () => {
                let getArticles = Article.getArticles();
                return getArticles(superuserToken).should.eventually.be.fulfilled
                    .and.eventually.have.property('itemCount', articleCount);
            });
        });
    });

    describe('#getArticle', () => {
        it('should be a method', () => {
            assert.equal(typeof Article, 'function');
            assert.equal(typeof Article.getArticle, 'function');
        });

        it('should return a method when called', () => {
            let getArticle = Article.getArticle();
            assert.equal(typeof getArticle, 'function');
        });

        describe('#return', () => {
            it('should return a Promise', () => {
                let getArticle = Article.getArticle();
                assert.instanceOf(getArticle(), Promise);
            });

            it('#1 should return an error 500', () => {
                let getArticle = Article.getArticle();
                return getArticle().should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            it('#2 should return an error 500', () => {
                let getArticle = Article.getArticle();
                return getArticle(superuserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            // test article has no score and thus will not be found
            it('#3 should return an error 400', () => {
                let getArticle = Article.getArticle(articleId);
                return getArticle().should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#4 should return an error 500', () => {
                let getArticle = Article.getArticle(null);
                return getArticle(null).should.eventually.be.rejected
                    .and.eventually.have.property('status', 500);
            });

            // test article has no score and thus will not be found
            it('#5 should return an error 400', () => {
                let getArticle = Article.getArticle(articleId);
                return getArticle('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#6 should return an error 404', () => {
                let getArticle = Article.getArticle('');
                return getArticle(superuserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 404);
            });

            it('#7 should return an error 404', () => {
                let getArticle = Article.getArticle('');
                return getArticle('').should.eventually.be.rejected
                    .and.eventually.have.property('status', 404);
            });

            it('#8 should return an error 403', () => {
                let getArticle = Article.getArticle(articleId);
                return getArticle(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 403);
            });

            it('#9 should return an error 400', () => {
                let getArticle = Article.getArticle(tests.id.invalid);
                return getArticle(superuserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            it('#10 should return an error 403', () => {
                let getArticle = Article.getArticle(tests.id.invalid);
                return getArticle(tests.token.invalid).should.eventually.be.rejected
                    .and.eventually.have.property('status', 403);
            });

            it('#11 should return an error 400', () => {
                let getArticle = Article.getArticle(articleId);
                return getArticle(superuserToken).should.eventually.be.rejected
                    .and.eventually.have.property('status', 400);
            });

            //No test case for pulling out article with score
        });
    });

    after((done) => {
        console.log(`Cleaning up...`);
        let hasError = false;
        async.parallel({
            deleteArticle: (callback) => {
                http
                    .del('/superuser/article/' + articleId)
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
                //prints propagated errors
                console.log(results);
                console.log(`Clean up done with error(s).`);
            } else {
                console.log(`Clean up done.`);
            }
            console.log(`End of Article tests.`);
            done();
        });
    });
});
