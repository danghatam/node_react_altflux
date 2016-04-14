'use strict';

// React
import React, { Component } from 'react';

// bootstrap
import { DropdownButton, MenuItem, Input } from 'react-bootstrap';

//Actions
import ProfessionalActions from '../../../../actions/ProfessionalActions';

class Filter extends Component {

	filterCategories(e){
		let value = this.refs.filterInput.getValue();
		this.props.onFilter(value);
	}

	search(e){
		if (e.charCode === 13 || e.which === 13) {
			let value = this.refs.searchInput.getValue();
			this.props.onSearch(value);
		}
	}

	render() {
		return (
			<div className='filter-wrapper'>
				<div className='filter'>
					<i className='fa fa-filter'></i>
					<span>Filter by:</span>
				    <Input className='dropdown' type="select" ref='filterInput' onChange={ this.filterCategories.bind(this) }>
				      <option value=''>View All</option>
				      <option value='Interior Designers'>Interior Designers</option>
				      <option value='Architects'>Architects</option>
				      <option value='Product Merchants'>Product Merchants</option>
				      <option value='Maybank'>Maybank</option>
				      <option value='M1 Promotion'>M1 Promotion</option>
				    </Input>
				</div>
				<div className='vr'></div>
				<div className='search'>
                    <i className='icon-md icon-search'></i>
					<Input type='text' placeholder='Search for ...' ref='searchInput' onKeyPress={ this.search.bind(this) } />
				</div>
			</div>
		);
	}

}

export default Filter;