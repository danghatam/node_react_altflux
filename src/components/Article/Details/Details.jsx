'use strict';

// React
import React from 'react';

// Libraries
import assign from 'object-assign';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';

// Components
import { Button } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import Share from '../../Widgets/Share';

// Actions
import ArticleActions from '../../../actions/ArticleActions';

// Stores
import ArticleStore from '../../../stores/ArticleStore';


function getInitialState() {
    return {
        isLoading: true,
        article: {}
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

/**
 * Article Details
 */
class Details extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.

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
        if (this.state.isLoading) {
            return (<h1>Loading...</h1>)
        }
        let article = this.state.article;
        //test
        article.images.Cover.baseUrl = 'https://placehold.it/1000x400/?text=Cover';

        let readMoreData = {
            title: 'Read More Articles',
            items: []
        };

        let otherCategoriesData = {
            title: 'Other Article Categories',
            items: []
        }

        const articleCover = (
            <div id="cover">
                <img src={article.images.Cover.baseUrl} className="img-responsive" width="100%"/>
                <ol className='breadcrumb'>
                    <li>Articles</li>
                    <li>{article.categories[0]}</li>
                    <li className="active">{article.title}</li>
                </ol>
            </div>
        );

        const articleFooter = (
            <div className="container">
                <p>
                    If you need our expertise to connect you with trusted home professionals, simply drop us a quote request here and we can match you with 5 firms that best fit your renovation budget and requirements.
                </p>
                <Button>Get a Quotion</Button>
            </div>
        );

        return (
            <div>
                <div className="container-fluid article-details">
                    <div className="row">
                        <div className="col-md-9">
                            {articleCover}
                            <div className="row">
                                <div className="col-md-9 article-title">
                                    <h1>{article.title}</h1>
                                </div>
                                <div className="col-md-3">
                                    <Share link="haha" />
                                </div>
                            </div>
                            <ReactMarkdown className="article-content" source={article.markdown} />,
                        </div>
                        <div className="col-md-3">
                            <Sidebar data={readMoreData} />
                            <Sidebar data={otherCategoriesData} />
                        </div>
                    </div>
                </div>
                <div className="article-footer">
                    {articleFooter}
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
    static fetchData(routerState, callback) {
        let state = getInitialState();

        if (routerState.params != null) {
            if (routerState.params.id != null) {
                let articleId = parseInt(routerState.params.id);

                if (!isNaN(articleId)) {
                    state.article.id = articleId;
                }
            }
        }

        fireActions(state, callback);
    }

    static generateMetadata(routerState) {
        let state = getInitialState();

        if (routerState.params != null) {
            if (routerState.params.id != null) {
                let articleId = parseInt(routerState.params.id);

                if (!isNaN(articleId)) {
                    state.article.id = articleId;
                }
            }
        }

        let article = ArticleStore.get(state.article.id);

        if (article) {
            return article.metadata;
        }
        return {
            title: '404',
            description: 'Not Found'
        }
    }
}

Details.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Details;
