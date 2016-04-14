'use strict';

// React
import React from 'react';

// Libraries
import _ from 'lodash';
//import { RouteHandler } from 'react-router';
import chance from 'chance';

// Components
import { Button, ButtonGroup, Panel } from 'react-bootstrap';
import HeroCarousel from '../Carousel';
import DiscoveryFeeds from '../Discovery/Feeds';
import List from '../Widgets/List';
import UserWidget from '../User/Widget';
import ArticleWidget from '../Article/Widget';

// Actions
import FeedActions from '../../actions/FeedActions';

// Stores
import FeedStore from '../../stores/FeedStore';

function getInitialState() {
    return {
        feeds: [],
        page: 1,
        perPageCount: 14
    };
}

function getStateFromStores(parameters) {
    let feeds = FeedStore.getPage(parameters.page, parameters.perPageCount);

    return (feeds == null) ? null : {
        page: parameters.page,
        perPageCount: parameters.perPageCount,
        feeds: feeds
    };
}

function fireActions(state, callback) {
    let parameters = {
        page: state.page,
        perPageCount: state.perPageCount,
        callback: callback
    };

    FeedActions.getFeeds(parameters);
}

class Home extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.

        this.state = getInitialState();

        /**
         * Event handler for 'change' events coming from the FeedStore
         */
        this.onChange = () => {
            let parameters = {
                page: this.state.page,
                perPageCount: this.state.perPageCount
            };

            if (this.props.params != null) {
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

            let newState = getStateFromStores(parameters);

            if (newState != null) {
                this.setState(newState);
            }
        };
    }

    componentDidMount() {
        FeedStore.listen(this.onChange);
    }

    componentWillMount() {
        this.onChange();
    }

    componentWillUnmount() {
        FeedStore.unlisten(this.onChange);
    }

    componentWillReceiveProps(nextProps) {
        this.onChange();
    }

    /**
     * @return {object}
     */
    render() {
        const homeBar = (
            <div id="home-bar">
                <section>
                    <span className="icon-xl icon-trusted"></span>
                    <span>Find trusted home professionals</span>
                </section>
                <section>
                    <span className="icon-xl icon-discover"></span>
                    <span>Discover thousands of interior design ideas</span>
                </section>
                <section>
                    <span className="icon-xl icon-flooring"></span>
                    <span>Get renovation details and reviews</span>
                </section>
                <section>
                    <span className="icon-xl icon-trusted"></span>
                    <span>Find trusted home professionals</span>
                </section>
                <section>
                    <span className="icon-xl icon-flooring"></span>
                    <span>Get renovation details and reviews</span>
                </section>
            </div>
        );

        const generator = chance();
        let carouselData = [];
        for (var i=0; i<4; i++) {
            carouselData.push({
                src: 'http://placehold.it/1000x350/333333/c0392b/&text=Carousel+Slide',
                title: generator.sentence({words: generator.natural({min: 1, max: 5})}),
                description: generator.sentence()
            });
        }
        return (
            <div>
                <HeroCarousel data={carouselData} />
                <div className="container-fluid">
                    {homeBar}
                    <DiscoveryFeeds data={this.state.feeds} />
                </div>
            </div>
        )
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
            title: `Home`,
            description: `This is the home page.`
        };
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Home;
