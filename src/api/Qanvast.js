'use strict';

// Libraries
import async from 'async';
import http from 'superagent';
import {Promise} from 'es6-promise';
import validator from 'validator';

// Base API class
import Base from './Base';

class Qanvast extends Base {
	static createQanvastBoard(token, name, description) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.post('/qanvast/')
							.use(super.constants.BASE_URL)
							.set('Authorization', token)
							.send({
								'name': name,
								'description': description
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

	static createQanvastPhoto(token, qanvast, description, ware, photo) {
		return () => {
			let promise = new Promise((resolve, reject) => {
				async.waterfall([
					callback => {
						http
							.post('/qanvast/' + qanvast + '/qanvast-photo')
							.use(super.constants.BASE_URL)
							.set('Authorization', token)
							.send({
								'qanvast': qanvast,
								'description': description,
								'ware': ware,
								'photo': photo
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
}

export default Qanvast;
