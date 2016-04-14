// Libraries
import _ from 'lodash';

// Dispatcher and constants
import alt from '../alt';

// API
import CompanyAPI from '../api/Company';

// Actions
import AppActions from './AppActions';

// uuid
import uuid from 'uuid';

class ProfessionalActions {
	constructor() {
		this.generateActions('getProfessionalCategories');	
	}

	getProfessionals(parameters) {
		const { page, perPageCount, fields, callback } = parameters;

		const payload = {
			page,
			perPageCount,
			fields,
			getData: CompanyAPI.getCompanies(uuid.v4()),
			onError: error => {
                // TODO: You can add in hooks here to do something when an error occurs.
                AppActions.showAlert({ error });
            },
            onFinish: (callback != null && _.isFunction(callback)) ? callback : undefined
		}

        this.dispatch(payload);
	}

	getProfessional(parameters) {
		const { id, fields, callback } = parameters;

        const payload = {
            id,
            fields,
            getData: CompanyAPI.getCompany(uuid.v4(), id),
            onError: error => {
                AppActions.showAlert({ error });
            },
            onFinish: (callback != null && _.isFunction(callback)) ? callback : undefined
        };

        this.dispatch(payload);
	}

	showReviewsModal() {
		
	}
}

export default alt.createActions(ProfessionalActions);