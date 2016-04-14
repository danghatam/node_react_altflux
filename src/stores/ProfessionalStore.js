// Libraries
import _ from 'lodash';

// Core
import alt from '../alt';

// Actions
import ProfessionalActions from '../actions/ProfessionalActions';

// import assign from 'object-assign';
import objectHasKey from '../utilities/objectHasKey';

class ProfessionalStore {
	constructor() {
		this.categories = [
			{
				id: 1,
				name: 'Interior Designers',
				background: 'https://qanvast-api.s3.amazonaws.com/ware/large/ce807a0d-e2cd-4c34-ac0e-651edc67af5f.jpg'
			},
			{
				id: 2,
				name: 'Architects',
				background: 'https://qanvast-api.s3.amazonaws.com/ware/large/ce807a0d-e2cd-4c34-ac0e-651edc67af5f.jpg'
			},
			{
				id: 3,
				name: 'Product Merchants',
				background: 'https://qanvast-api.s3.amazonaws.com/ware/large/ce807a0d-e2cd-4c34-ac0e-651edc67af5f.jpg'
			},
			{
				id: 4,
				name: 'Maybank',
				background: 'https://qanvast-api.s3.amazonaws.com/ware/large/ce807a0d-e2cd-4c34-ac0e-651edc67af5f.jpg'
			},
			{
				id: 5,
				name: 'M1 Promotion',
				background: 'https://qanvast-api.s3.amazonaws.com/ware/large/ce807a0d-e2cd-4c34-ac0e-651edc67af5f.jpg'
			}
		];
		this.professionals = [];
		this.professionalListOrder = [];
        this.professionalListFilter = [];

		this.bindAction(ProfessionalActions.getProfessionalCategories, this.onGetProfessionalCategories);
		this.bindAction(ProfessionalActions.getProfessionals, this.onGetProfessionals);
		this.bindAction(ProfessionalActions.getProfessional, this.onGetProfessional);
		this.bindAction(ProfessionalActions.showReviewsModal, this.onShowReviewsModal);

		this.exportPublicMethods({
			getCategories: this.getCategories,
			get: this.get,
			getList: this.getList,
			getPage: this.getPage
		});
	}

	onGetProfessionalCategories() {

	}

	onGetProfessionals(payload) {
		const {
            page,
            perPageCount,
            fields,
            getData,
            onError,
            onFinish
        } = payload;

        const successCallback = professionals => {

            if (professionals != null) {
                this.setList(professionals.data, (page - 1) * perPageCount);
            }

            if (onFinish != null && _.isFunction(onFinish)) {
                onFinish();
            }

            this.emitChange();
        };

        const errorCallback = error => {
            if (onError != null && _.isFunction(onError)) {
                onError(error);
            }

            if (onFinish != null && _.isFunction(onFinish)) {
                onFinish(error);
            }
        };

        if (!this.hasPage(page, perPageCount, fields)) {
            getData()
                .then(successCallback)
                .catch(errorCallback);
        } else {
            successCallback();
        }

        // We don't want to trigger the change event until the async operation completes.
        return false;
	}

	onGetProfessional(payload) {
		const {
            id,
            fields,
            getData,
            onError,
            onFinish
        } = payload;

        const successCallback = professional => {
            if (professional != null) {
                this.set(professional);
            }

            if (onFinish != null && _.isFunction(onFinish)) {
                onFinish();
            }

            this.emitChange();
        };

        const errorCallback = error => {
            if (onError != null && _.isFunction(onError)) {
                onError(error);
            }

            if (onFinish != null && _.isFunction(onFinish)) {
                onFinish(error);
            }
        };

        if (!this.has(id, fields)) {
            getData()
                .then(successCallback)
                .catch(errorCallback);
        } else {
            successCallback();
        }

        // We don't want to trigger the change event until the async operation completes.
        return false;
	}

	onShowReviewsModal() {
		
	}

	getCategories() {
		const state = this.getState();
		return state.categories;
	}

	get(id) {
		const state = this.getState();
        return state.professionals[id];
	}

	getList(startIndex, count, filters) {
        const state = this.getState();
        let listCount = count;
        let listStartIndex = startIndex;
        const { category, search } = filters;

        if (listCount == null && listStartIndex != null) {
            listCount = listStartIndex;
            listStartIndex = 0;
        }

        if (listStartIndex >= 0 && listCount > 1) {
            const endIndex = listStartIndex + listCount;

            let proList = state.professionalListOrder;

            if(category) {
                proList = proList.filter( p => p.categories.indexOf(category) > -1 );
            }
            
            if(search) {
                proList = proList.filter( p => p.name.toLowerCase().indexOf(search.toLowerCase()) > -1 );
            }

            proList = _.slice(proList, listStartIndex, endIndex);

            proList = _.map(proList, function(pro){
                return this.professionals[pro.id];
            }, state);

            return proList;
        }

        return null;
    }

	getPage(page, count, filters) {
		return this.getList((page - 1) * count, count, filters);
	}

	set(professional){
		if(!professional != null){
			const clonedPro = _.cloneDeep(professional);
			this.professionals[clonedPro.id] = clonedPro;
			return true;	
		}
		return false;
	}

	setList(professionalList, startIndex){
		let i = startIndex;
		if(_.isArray(professionalList)) {

			_.forEach( professionalList, pro => {
				const clonedPro = _.cloneDeep(pro);
				this.professionals[clonedPro.id] = clonedPro;
				this.professionalListOrder[i] = clonedPro;
				++i;
			}, this);

			return true;
		}
		return false;
	}

	has(id, fields) {
		const pro = this.professionals[id];

        if (pro != null) {
            if (_.isArray(fields)) {
                let hasAllRequiredFields = true;
                for (const field of fields) {
                    if (!objectHasKey(pro, field)) {
                        hasAllRequiredFields = false;
                        break;
                    }
                }

                return hasAllRequiredFields;
            }

            return true;
        }

        return false;
	}

	hasList(startIndex, count, fields) {
        let listCount = count;
        let listStartIndex = startIndex;

        if (listCount == null && listStartIndex != null) {
            listCount = listStartIndex;
            listStartIndex = 0;
        }

        if (listStartIndex >= 0 && listCount > 1) {
            const lastIndex = listStartIndex + listCount;
            let listElementsExists = true;

            for (let i = listStartIndex; i < lastIndex; ++i) {
                const proId = this.professionalListOrder[i];
                if (proId == null || !this.has(proId, fields)) {
                    listElementsExists = false;
                    break;
                }
            }

            return listElementsExists;
        }

        return false;
    }

	hasPage(page, count, fields) {
		return this.hasList((page - 1) * count, count, fields);
	}

}

export default alt.createStore(ProfessionalStore, 'ProfessionalStore', true);