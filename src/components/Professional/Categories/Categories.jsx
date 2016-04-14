'use strict';

//React
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

function getInitialState() {
	return {
		isLoading: true,
		categories: []
	}
}

function getStateFromStores() {
	let categories = ProfessionalStore.getCategories();
	return categories == null ? null : {
		isLoading: false,
		categories
	}
}

function fireActions(state, callback) {

}

class Categories extends Component {
	constructor(props, context){
		super(props, context);
		this.state = getInitialState();
		
		this.onChange = () => {
			let newState = getStateFromStores();
	        if (newState != null) {
	            this.setState(newState);
	        }
		}
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

	render(){
		let viewAll = (
			<div className='category' onClick={ () => this.context.router.push( { pathname: `/professionals` }) }>
				<div style={ {backgroundImage: 'url(https://qanvast-api.s3.amazonaws.com/ware/large/ce807a0d-e2cd-4c34-ac0e-651edc67af5f.jpg)', backgroundSize: 'cover'} }>
					<h2>View All</h2>
				</div>
			</div>
		);
		let categories = this.state.categories.map( category =>
			<div key={ category.id } className='category' onClick={ () => this.context.router.push( { pathname: `/professionals`, query: { category: category.name } }) }>
				<div style={ {backgroundImage: 'url(' + category.background + ')', backgroundSize: 'cover'} }>
					<h2>{category.name}</h2>
				</div>
			</div>
		)
		return(
			<div className='container-fluid'>
				<div className='categories'>
					{ viewAll }
					{ categories }
				</div>
			</div>
		);
	}

	// static fetchData(routerState, callback) {

	// }

	static generateMetadata(routerState) {
		return {
			title: 'Professional Categories',
			description: ''
		};
	}
}

Categories.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default Categories;