'use strict';

// Libraries
import async from 'async';
import http from 'superagent';
import {Promise} from 'es6-promise';
import validator from 'validator';

// Base API class
import Base from './Base';

class Ware extends Base {
	static getWares(token, query) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.get('/wares/')
							.use(super.constants.BASE_URL)
							.set('Authorization', token)
							.query(query)
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
}

export default Ware;
