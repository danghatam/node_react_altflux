'use strict';
// Libraries
import async from 'async';
import http from 'superagent';

// Base API class
import Base from './Base';

class Lead extends Base {
    static getLead() {
        return (token) => {
            let promise = new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        let request = http
                            .get('/user/lead')
                            .use(super.constants.BASE_URL)
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

    static sendLead(leadData) {
        return (token) => {
            let promise = new Promise((resolve, reject) => {
                async.waterfall([
                    callback => {
                        let request = http
                            .post('/lead')
                            .use(super.constants.BASE_URL)
                            .type('json')
                            .send(leadData)
                            .timeout(super.constants.TIMEOUT_MS);

                        if(token) {
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
                    if(!error) {
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

export default Lead;
