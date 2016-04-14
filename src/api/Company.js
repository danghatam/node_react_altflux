'use strict';

// Libraries
import async from 'async';
import http from 'superagent';
import {Promise} from 'es6-promise';
import validator from 'validator';

// Base API class
import Base from './Base';

class Company extends Base {
	static getCompanies(token) {
		return () => {

            const headers = {};
            headers[`x-csrf-token`] = this.getCsrfToken();

			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.get('/companies/')
							.set(headers)
                            .withCredentials()
                            .use(this.constants.URL_PREFIX)
                            .timeout(this.constants.TIMEOUT_MS)
                            .end(callback);
					},

					(result, callback) => {
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

	static sendEmailToCompanies(token, companies, subject, body) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.post('/companies/email')
							.use(super.constants.BASE_URL)
							.set('Authorization', token)
							.send({
								'companies': companies,
								'subject': subject,
								'body': body
							})
							.timeout(super.constants.TIMEOUT_MS)
							.end(callback);
					},

					(result, callback) => {
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

	static getCompany(token, id) {
		return () => {
			
			const headers = {};
            headers[`x-csrf-token`] = this.getCsrfToken();

			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.get('/company/' + id)
							.use(this.constants.URL_PREFIX)
							.set(headers)
                            .withCredentials()
							.timeout(super.constants.TIMEOUT_MS)
							.end(callback);
					},

					(result, callback) => {
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

	static sendEmailToCompany(token, id) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.post('/company/' + id + '/email')
							.use(super.constants.BASE_URL)
							.set('Authorization', token)
							.timeout(super.constants.TIMEOUT_MS)
							.end(callback);
					},

					(result, callback) => {
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

	static getCompanyReviews(token, id) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.get('/company/' + id + '/reviews')
							.use(super.constants.BASE_URL)
							.set('Authorization', token)
							.timeout(super.constants.TIMEOUT_MS)
							.end(callback);
					},

					(result, callback) => {
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

	//Re-check this on future implmentation of endpoint
	//Endpoint returns a TODO
	static getCompanyReview(token, id, review) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.get('/company/' + id + '/review/' + review)
							.use(super.constants.BASE_URL)
							.set('Authorization', token)
							.timeout(super.constants.TIMEOUT_MS)
							.end(callback);
					},

					(result, callback) => {
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

	static getCompanyWares(token, id) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.get('/company/' + id + '/wares')
							.use(super.constants.BASE_URL)
							.set('Authorization', token)
							.timeout(super.constants.TIMEOUT_MS)
							.end(callback);
					},

					(result, callback) => {
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

	static getCompanyWare(token, id, ware) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.get('/company/' + id + '/ware/' + ware)
							.use(super.constants.BASE_URL)
							.set('Authorization', token)
							.timeout(super.constants.TIMEOUT_MS)
							.end(callback);
					},

					(result, callback) => {
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

	static getCompanyWarePhoto(token, id, ware, photo) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
						.get('/company/' + id + '/ware/' + ware + '/photo/' + photo)
						.use(super.constants.LOCAL_URL)
						.set('Authorization', token)
						.timeout(super.constants.TIMEOUT_MS)
						.end(callback);
					},

					(result, callback) => {
						console.log(result.body);
						callback(null, result.body);
					}
				], (error, data) => {
					if (!error) {
						resolve(data);
					} else {
						console.log(error);
						reject(error);
					}
				});
			});

			return promise;
		};
	}
}

export default Company;
