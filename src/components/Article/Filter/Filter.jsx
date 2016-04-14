'use strict';

// React
import React from 'react';

// Libraries
import {Input, Button, Collapse} from 'react-bootstrap';
import Select from 'react-select';

function getInitialState() {
    return {
        isExpanded: false,
        filters: {}
    };
}
/**
 * Article Filter
 */
class Filter extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.

        this.showFilters = this.showFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.filterSortChanged = this.filterSortChanged.bind(this);
        this.filterCategoryChanged = this.filterCategoryChanged.bind(this);
        this.filterRegionChanged = this.filterRegionChanged.bind(this);
        this.filterSearchChanged = this.filterSearchChanged.bind(this);
        this.clearSortFilter = this.clearSortFilter.bind(this);
        this.clearCategoryFilter = this.clearCategoryFilter.bind(this);
        this.clearRegionFilter = this.clearRegionFilter.bind(this);

        this.state = getInitialState();
    }

    showFilters(e) {
        e.preventDefault();
        this.setState({
            isExpanded: true
        });
    }

    clearFilters(e) {
        e.preventDefault();
        this.setState({
            isExpanded: false,
            filters: {}
        });
    }

    applyFilters(e) {
        e.preventDefault();
        this.props.filterFunction(this.state.filters);
        this.setState({
            isExpanded: false
        });
    }

    filterSortChanged(val) {
        let filters = this.state.filters;
        filters.sort = val;
        this.setState({
            filters: filters
        });
    }

    clearSortFilter(e) {
        e.preventDefault();
        let filters = this.state.filters;
        delete filters.sort;
        this.setState({
            filters: filters
        });
    }

    filterCategoryChanged(val) {
        let filters = this.state.filters;
        filters.category = val;
        this.setState({
            filters: filters
        });
    }

    clearCategoryFilter(e) {
        e.preventDefault();
        let filters = this.state.filters;
        delete filters.category;
        this.setState({
            filters: filters
        });
    }

    filterRegionChanged(val) {
        let filters = this.state.filters;
        filters.region = val;
        this.setState({
            filters: filters
        });
    }

    clearRegionFilter(e) {
        e.preventDefault();
        let filters = this.state.filters;
        delete filters.region;
        this.setState({
            filters: filters
        });
    }

    filterSearchChanged(e) {
        let filters = this.state.filters;
        filters.search = e.target.value;
        this.setState({
            filters: filters
        });
    }

    /**
     * @return {object}
     */
    render() {
        const options = this.props.options;
        const filters = this.state.filters;

        const sortFilterItem = (
            <div className='filter-item'>
                {filters.sort}
                &nbsp;&nbsp;
                <i
                    className='icon-md icon-center icon-cancel-circle'
                    onClick={this.clearSortFilter}
                />
            </div>
        );
        const categoryFilterItem = (
            <div className='filter-item'>
                {filters.category}
                &nbsp;&nbsp;
                <i
                    className='icon-md icon-center icon-cancel-circle'
                    onClick={this.clearCategoryFilter}
                />
            </div>
        );
        const regionFilterItem = (
            <div className='filter-item'>
                {filters.region}
                &nbsp;&nbsp;
                <i
                    className='icon-md icon-center icon-cancel-circle'
                    onClick={this.clearRegionFilter}
                />
            </div>
        );

        const normal = (
            <div className='row' id='filter-normal'>
                <div className='col-md-6'>
                    <div className='filter-item'>
                        <i className='icon-search icon-center icon-md'></i>
                        &nbsp;&nbsp;Filter by:
                    </div>
                    {filters.sort?sortFilterItem:null}
                    {filters.category?categoryFilterItem:null}
                    {filters.region?regionFilterItem:null}
                </div>
                <div className='col-md-6'>
                    <i className='icon-search icon-center icon-md'></i>
                    <span onClick={this.showFilters}>
                        &nbsp;&nbsp;
                        {filters.search?filters.search:'Search for e.g. Punggol HDB, open kitchen'}
                    </span>
                </div>
            </div>
        );

        const expanded = (
            <div className='row' id='filter-expanded'>
                <div className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <p>Sort</p>
                            <Select
                                name='sort-select'
                                value={this.state.filters.sort}
                                clearable={false}
                                searchable={false}
                                options={options.sort}
                                onChange={this.filterSortChanged}
                            />
                        </div>
                        <div className='col-md-4'>
                            <p>Category</p>
                            <Select
                                name='category-select'
                                value={this.state.filters.category}
                                clearable={false}
                                searchable={false}
                                options={options.category}
                                onChange={this.filterCategoryChanged}
                            />
                        </div>
                        <div className='col-md-4'>
                            <p>Region</p>
                            <Select
                                name='region-select'
                                value={this.state.filters.region}
                                clearable={false}
                                searchable={false}
                                options={options.region}
                                onChange={this.filterRegionChanged}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <i className='icon-md icon-search'></i>
                            <Input
                                type='text'
                                placeholder='Search for e.g. Punggol HDB, open kitchen'
                                onChange={this.filterSearchChanged}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <Button block bsStyle='success' className='btn-apply' onClick={this.applyFilters}>Apply Filters</Button>
                    <Button block className='btn-clear' onClick={this.clearFilters}>Clear Filters</Button>
                </div>
            </div>
        );

        return (
            <div className={`article-filter ${this.state.isExpanded?'expanded':'normal'}`}>
                <div className='container'>
                    {!this.state.isExpanded?normal:null}
                    <Collapse in={this.state.isExpanded}>
                        <div>
                            {expanded}
                        </div>
                    </Collapse>
                </div>
            </div>
        );
    }
}

Filter.propTypes = {
    options: React.PropTypes.object.isRequired,
    filterFunction: React.PropTypes.func.isRequired
};

export default Filter;
