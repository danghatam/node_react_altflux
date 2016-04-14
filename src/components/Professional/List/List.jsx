'use strict';

// React
import React, { Component } from 'react';

//Libraries
import _ from 'lodash';
import assign from 'object-assign';
import { Link } from 'react-router';

//Actions
import AppActions from '../../../actions/AppActions';
import ProfessionalActions from '../../../actions/ProfessionalActions';

//Store
import ProfessionalStore from '../../../stores/ProfessionalStore';

//Components
import Filter from './Filter';

function getInitialState() {
	return {
		isLoading: true,
        page: 1,
        perPageCount: 14,
        filters: {
            category: null,
            search: null
        },
		professionals: []
	};
}

function getStateFromStores(parameters) {
	let professionals = ProfessionalStore.getPage(parameters.page, parameters.perPageCount, parameters.filters);
	return professionals == null ? null : {
		isLoading: false,
		page: parameters.page,
		perPageCount: parameters.perPageCount,
        filters: parameters.filters,
		professionals
	};
}

function fireActions(state, callback) {
	let parameters = {
		page: state.page,
		perPageCount: state.perPageCount,
		fields: {},
		callback: callback
	};

	ProfessionalActions.getProfessionals(parameters);
}

class List extends Component {
	
	constructor(props, context){
		super(props, context);
		this.state = getInitialState();

		this.onChange = () => {
            let parameters = {
                page: this.state.page,
                perPageCount: this.state.perPageCount,
                filters: this.state.filters
            };

            if (this.props.params != null) {
                if (this.props.params.categories != null) {
                    parameters.filters.categories = his.props.params.categories.toString();
                }
                if (this.props.params.page != null) {
                    let page = parseInt(this.props.params.page);

                    if (!isNaN(page)) {
                        parameters.page = page;
                    }
                }

                if (this.props.params.per_page_count != null) {
                    let perPageCount = parseInt(this.props.params.per_page_count);

                    if (!isNaN(perPageCount)) {
                        parameters.perPageCount = perPageCount;
                    }
                }
            }

            if(this.props.location != null && this.state.filters == null){
                const { query } = this.props.location;
                parameters.filters.category = query && query.category ? query.category : null;

            }

            let newState = getStateFromStores(parameters);
            if (newState != null) {
                this.setState(newState);
            }
        };
	}

	componentDidMount() {
        ProfessionalStore.listen(this.onChange);
    }

    componentWillMount() {
        this.onChange();
    }

    componentWillUnmount() {
        ProfessionalStore.unlisten(this.onChange);
    }

    componentWillReceiveProps(nextProps) {
        this.onChange();
    }

    filter(value){
        // let filters = { category: value };
        this.setState({
            filters: { category: value }
        }, () => {
            console.log(this.state);
        
            this.onChange();
        });
    }

    search(value){
        this.setState({
            filters: {
                search: value
            }
        }, () => {
            this.onChange();
        });
    }

	render(){

                console.log(this.state);
		let professionals = this.state.professionals.map ( pro =>
			<div key={pro.id} className='professional'>
				<div className='showcase'>
					<a onClick={ () => this.context.router.push(`/professionals/${pro.id}`)}>
						<img src={'https://qanvast-api.s3.amazonaws.com/ware/large/ce807a0d-e2cd-4c34-ac0e-651edc67af5f.jpg'} />
					</a>
				</div>
				<div className='info'>
					<div className='logo'>
						<img src={'https://qanvast-api.s3.amazonaws.com/company/logo/thumbnail/21261984-a08a-43b9-b01a-d1bca5d7f021.jpg'} />
					</div>
					<div className='contact'>
						<p className='category'>{pro.categories[0]}</p>
						<p><a className='name' onClick={ () => this.context.router.push(`/professionals/${pro.id}`)}>{pro.name}</a></p>
						<p className='address'>{pro.address}</p>
						<p className='phone'><i className="fa fa-phone"></i><span>{pro.phone}</span></p>
						<p className='email'><i className="fa fa-envelope-o"></i><span>{pro.email}</span></p>
					</div>
				</div>
			</div>
		);
		return (
			<div className='container'>
                <Filter onFilter={ this.filter.bind(this) } onSearch={ this.search.bind(this) } />
				<div className='professional-list'>
					{ professionals }
				</div>
			</div>
		);
	}

	static fetchData(routerState, callback) {
        let state = getInitialState();

        if (routerState.params != null) {
            if (routerState.params.page != null) {
                let page = parseInt(routerState.params.page);

                if (!isNaN(page)) {
                    state.page = page;
                }
            }

            if (routerState.params.per_page_count != null) {
                let perPageCount = parseInt(routerState.params.per_page_count);

                if (!isNaN(perPageCount)) {
                    state.perPageCount = perPageCount;
                }
            }
        }

        fireActions(state, callback);
    }

    static generateMetadata(routerState) {
        let state = getInitialState();

        if (routerState.params != null) {
            if (routerState.params.page != null) {
                let page = parseInt(routerState.params.page);

                if (!isNaN(page)) {
                    state.page = page;
                }
            }

            if (routerState.params.per_page_count != null) {
                let perPageCount = parseInt(routerState.params.per_page_count);

                if (!isNaN(perPageCount)) {
                    state.perPageCount = perPageCount;
                }
            }
        }

        return {
            title: 'Professionals',
            description: 'This is the professionals page.'
        };
    }
}

List.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default List;