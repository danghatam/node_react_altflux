// Libraries
import async from 'async';
import http from 'superagent';
import { Promise } from 'es6-promise';

// Base API class
import Base from './Base';

class User extends Base {

    static get(id) {
        return () => {
            const headers = {};
            headers[`x-csrf-token`] = this.getCsrfToken();

            return new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        http
                            .get(`/user/${id}`)
                            .set(headers)
                            .withCredentials()
                            .use(this.constants.URL_PREFIX)
                            .timeout(this.constants.TIMEOUT_MS)
                            .end(callback);
                    },

                    (result, callback) => {
                        // TODO: Transform the data if necessary.
                        // TODO: Otherwise, pass it back to the caller.
                        callback(null, result.body);
                    }
                ], (error, data) => {
                    if (!error) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                });
            });
        };
    }

    static getPage(page, perPageCount) {
        return () => {
            const headers = {};
            headers['x-csrf-token'] = this.getCsrfToken();

            return new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        http
                            .get('/users')
                            .set(headers)
                            .withCredentials()
                            .query({
                                page,
                                per_page_count: perPageCount
                            })
                            .use(this.constants.URL_PREFIX)
                            .timeout(this.constants.TIMEOUT_MS)
                            .end(callback);
                    },

                    (result, callback) => {
                        // TODO: Transform the data if necessary.
                        // TODO: Otherwise, pass it back to the caller.
                        const response = result.body;

                        if (response.page === page &&
                            response.perPageCount === perPageCount &&
                            response.data != null) {
                            callback(null, response.data);
                        } else {
                            callback(new Error('Invalid response!'));
                        }
                    }
                ], (error, data) => {
                    if (!error) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                });
            });
        };
    }

    static register(name, email, password) {
        return () => {
            const headers = {};
            headers['x-csrf-token'] = this.getCsrfToken();

            const promise = new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        http
                            .post('/authentication/register')
                            .set(headers)
                            .withCredentials()
                            .use(super.constants.BASE_URL)
                            .type('json')
                            .send({
                                name,
                                email,
                                password
                            })
                            .timeout(super.constants.TIMEOUT_MS)
                            .end(callback);
                    }, (result, callback) => {
                        callback(null, result.body);
                    }
                ], (error, data) => {
                    if (!error) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                });
            });

            return promise;
        };
    }

    static getUser(populateLead) {
        return token => {
            const headers = {};
            headers[`x-csrf-token`] = this.getCsrfToken();

            const promise = new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        const request = http
                            .get('/user/')
                            .set(headers)
                            .withCredentials()
                            .use(this.constants.URL_PREFIX)
                            .query({
                                'populate[lead]': populateLead
                            })
                            .timeout(super.constants.TIMEOUT_MS);

                        if (token) {
                            request
                                .set('Authorization', token)
                                .end(callback);
                        } else {
                            request
                                .end(callback);
                        }
                    }, (result, callback) => {
                        callback(null, result.body);
                    }
                ], (error, data) => {
                    if (!error) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                });
            });

            return promise;
        };
    }

    static updatePassword(password, passwordConfirm) {
        return (token) => {
            const headers = {};
            headers[`x-csrf-token`] = this.getCsrfToken();
            const promise = new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        const request = http
                            .post('/user/password')
                            .set(headers)
                            .withCredentials()
                            .use(this.constants.URL_PREFIX)
                            .send({
                                newPassword: password,
                                newPasswordConfirm: passwordConfirm
                            })
                            .type('json')
                            .timeout(super.constants.TIMEOUT_MS);

                        if (token) {
                            request
                                .set('Authorization', token)
                                .end(callback);
                        } else {
                            request
                                .end(callback);
                        }
                    }, (result, callback) => {
                        callback(null, result.body);
                    }
                ], (error, data) => {
                    if (!error) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                });
            });

            return promise;
        };
    }

    static getUserPublic(userId) {
        return (token) => {
            const headers = {};
            headers[`x-csrf-token`] = this.getCsrfToken();
            const promise = new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        const request = http
                            .get(`/user/${userId}`)
                            .set(headers)
                            .withCredentials()
                            .use(this.constants.URL_PREFIX)
                            .type('json')
                            .timeout(super.constants.TIMEOUT_MS);

                        if (token) {
                            request
                                .set('Authorization', token)
                                .end(callback);
                        } else {
                            request
                                .end(callback);
                        }
                    }, (results, callback) => {
                        callback(null, results.body);
                    }
                ], (error, data) => {
                    if (!error) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                });
            });

            return promise;
        };
    }

    static login(email, password) {
        return () => {
            const headers = {};
            headers[`x-csrf-token`] = this.getCsrfToken();
            const promise = new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        http
                            .post('/authentication/connect/local/')
                            .use(this.constants.URL_PREFIX)
                            .set(headers)
                            .type('json')
                            .send({ email, password })
                            .withCredentials()
                            .timeout(this.constants.TIMEOUT_MS)
                            .end(callback);
                    }, (results, callback) => {
                        callback(null, results.body);
                    }
                ], (error, data) => {
                    if (!error) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                });
            });

            return promise;
        };
    }

    static refreshToken() {
        return (refreshToken) => {
            const headers = {};
            headers[`x-csrf-token`] = this.getCsrfToken();
            const promise = new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        http
                            .post('/authentication/oauth2/token/refresh/')
                            .use(this.constants.URL_PREFIX)
                            .set(headers)
                            .type('json')
                            .withCredentials()
                            .send({ refreshToken })
                            .timeout(super.constants.TIMEOUT_MS)
                            .end(callback);
                    }, (results, callback) => {
                        callback(null, results.body);
                    }
                ], (error, data) => {
                    if (!error) {
                        resolve(data);
                    } else {
                        reject(error);
                    }
                });
            });

            return promise;
        };
    }
}

export default User;
