'use strict';
import API from '../../src/api/Base';

export default{
    base_url: API.constants.BASE_URL,
    test_user: {
        email: 'testuser@qanvast.com',
        password: 'P@ssw0rd123'
    },
    token: {
        invalid: 'bearer THISISGIBBERISH'
    },
    article: {
        title: 'fooArticleTitle'
    },
    id: {
        invalid: '000000000000000000000000'
    },
    lead_budget: {
        valid: 300,
        invalid: 'THISISNOTANUMBER',
    },
    lead_property_size: {
        valid: 13,
        invalid: 'THISISNOTANUMBER'
    },
    lead_property_type: {
        valid: 'Landed Property',
        invalid: 'THISISNOTANEXPECTEDENUM'
    },
    lead_property_is_new: {
        valid: false,
        invalid: ''
    },
    lead_style: {
        valid: 'No Preference',
        invalid: 'THISISNOTANEXPECTEDENUM'
    },
    lead_is_loan_required: {
        valid: false,
        invalid: ''
    },
    lead_priority: {
        valid: 'Design Centric',
        invalid: 'THISISNOTANEXPECTEDENUM'
    },
    lead_key_collection: {
        valid: 'Keys Collected',
        invalid: 'THISISNOTANEXPECTEDENUM'
    },
    lead_contact: '98765432',
    lead_details: 'foo',
    lead_preferred_time_of_contact: {
        valid: 'Not Provided',
        invalid: 'THISISNOTANEXPECTEDENUM'
    },
    lead_os: {
        valid: 'Web',
        invalid: 'THISISNOTANEXPECTEDENUM'
    },
    lead_offline_user_email: {
        valid: 'foo@foo.com',
        invalid: 'foo.com'
    },
    lead_offline_user_name: {
        valid: 'name',
        invalid: 'abcedfghijabcedfghijabcedfghijabcedfghijabcedfghi' //49 char name
    },
    update_password_params: {
        valid: {
            email: 'foo2@foo.com',
            name: 'foo2',
            creationPassword: 'foo12345',
            password: 'bar12345',
            match: 'bar12345',
            no_match: 'bar12349'
        },
        invalid: { //7 char password
            password: 'bar1234',
            match: 'bar1234',
            no_match: 'bar1235'
        }
    },
    register_name: {
        valid: 'foo',
        invalid: 'abcedfghijabcedfghijabcedfghijabcedfghijabcedfghi' //49 char name
    },
    register_email: {
        valid: 'foo@foo.com',
        invalid: '@foo.com'
    },
    register_password: {
        valid: 'foo12345',
        invalid: 'foo1234' //7 char password
    },
    login_name: 'foo',
    login_email: {
        valid: 'foo3@foo.com',
        invalid: 'foo.com'
    },
    login_password: {
        valid: 'foo12345',
        invalid: 'foo1234'
    },
    refresh_token_name: 'foo',
    refresh_token_email: 'foo4@foo.com',
    refresh_token_password: 'foo12345',
    refresh_token_token: {
        invalid: 'THISISGIBBERISH'
    }
}
