'use strict';

// React
import React from 'react';

// Components
import Filter from '../Filter';
import Widget from '../Widget';

// Actions
import ArticleActions from '../../../actions/ArticleActions';

// Stores
import ArticleStore from '../../../stores/ArticleStore';

function getInitialState() {
    return {
        filters: {},
        articles: []
    };
}

function getStateFromStores(parameters) {
    let article = ArticleStore.get(parameters.article.id);

    return (article == null) ? null : {
        isLoading: false,
        article: article
    };
}

function fireActions(state, callback) {
    let parameters = {
        id: state.article.id,
        callback: callback
    };

    ArticleActions.getArticle(parameters);
}

function filterOptions() {
    return {
        sort: [{
            value: 'latest',
            label: 'Latest'
        },{
            value: 'other',
            label: 'Other'
        }],
        category: [{
            value: 'all',
            label: 'all'
        },{
            value: 'other',
            label: 'Other'
        }],
        region: [{
            value: 'singapore',
            label: 'Singapore'
        }, {
            value: 'malaysia',
            label: 'Malaysia'
        }]
    }
}

/**
 * Article List
 */
class List extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.

        this.onFilterChange = this.onFilterChange.bind(this);

        this.state = getInitialState();

        /**
         * Event handler for 'change' events coming from the ArticleStore
         */
        this.onChange = () => {
            let parameters = {
                article: {
                    id: null
                }
            };

            if (this.props.params != null) {
                if (this.props.params.id != null) {
                    let articleId = parseInt(this.props.params.id);

                    if (!isNaN(articleId)) {
                        parameters.article.id = articleId;
                    }
                }
            }

            let newState = getStateFromStores(parameters);

            if (newState != null) {
                this.setState(newState);
            }
        };
    }

    onFilterChange(filters) {
        console.log('list filters', filters);
        // TO-DO fetch new data
    }

    componentDidMount() {
        ArticleStore.listen(this.onChange);
    }

    componentWillUnmount() {
        ArticleStore.unlisten(this.onChange);
    }

    componentWillReceiveProps(nextProps) {
        this.onChange();
    }

    /**
     * @return {object}
     */
    render() {
        return (
            <div className='article-list'>
                <Filter options={filterOptions()} filterFunction={this.onFilterChange} />
                <div className='container-fluid'>
                    Content
                </div>
            </div>
        );
    }

    /**
     * Static method to trigger data actions for server-side rendering.
     *
     * @param routerState
     * @param callback
     */
    //static fetchData(routerState, callback) {
    //    let state = getInitialState();
    //
    //    //fireActions(state, callback);
    //}

    static generateMetadata(routerState) {
        return {
            title: 'Articles',
            description: 'This is articles page'
        }
    }
}

export default List;
