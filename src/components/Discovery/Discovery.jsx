'use strict';

// React
import React from 'react';

// Libraries
import _ from 'lodash';
//import {RouteHandler} from 'react-router';

// Components
import {Button, ButtonGroup, Panel} from 'react-bootstrap';
import List from '../Widgets/List';

// Actions
// import UserActions from '../../actions/UserActions';

// Stores
// import WareStore from '../../stores/WareStore';

function getInitialState() {
    return {
        wares: [],
        page: 1,
        perPageCount: 10
    };
}

function getStateFromStores(parameters) {
    let wares = null;
    // let wares = WareStore.getPage(parameters.page, parameters.perPageCount);

    return (wares == null) ? null : {
        page: parameters.page,
        perPageCount: parameters.perPageCount,
        wares
    };
}

function fireActions(state, callback) {
    let parameters = {
        page: state.page,
        perPageCount: state.perPageCount,
        callback: callback
    };

    // TODO Remove
    callback();

    // TODO
    // WareActions.getwares(parameters);
}

class Discovery extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.

        this.state = getInitialState();

        /**
         * Event handler for 'change' events coming from the WareStore
         */
        this.onChange = () => {
            let parameters = {
                page: this.state.page,
                perPageCount: this.state.perPageCount
            };

            if (this.context.router != null) {
                let params = this.context.router.getCurrentParams();

                if (params.page != null) {
                    let page = parseInt(params.page);

                    if (!isNaN(page)) {
                        parameters.page = page;
                    }
                }

                if (params.per_page_count != null) {
                    let perPageCount = parseInt(params.per_page_count);

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

        this.onNextButtonClicked = () => {
            let page = this.state.page + 1;

            this.loadPage(page);
        };

        this.onPrevButtonClicked = () => {
            let page = this.state.page - 1;

            if (page < 1) {
                page = 1;
            }

            this.loadPage(page);
        };

        this.loadPage = (page) => {
            this.context.router.transitionTo('discovery', {page: page});
        };
    }

    componentDidMount() {
        // WareStore.listen(this.onChange);
    }

    componentWillMount() {
        this.onChange();
    }

    componentWillUnmount() {
        // WareStore.unlisten(this.onChange);
    }

    componentWillReceiveProps(nextProps) {
        this.onChange();
    }

    /**
     * @return {object}
     */
    render() {
        const panelHeader = (<h2>Discovery - Page {this.state.page}</h2>);
        const panelContent = (<p>Test Content</p>);
        const panelFooter = (
            <ButtonGroup>
                <Button bsStyle='info' onClick={this.onPrevButtonClicked}>
                    &#8592; Prev
                </Button>
                <Button bsStyle='info' onClick={this.onNextButtonClicked}>
                    Next &#8594;
                </Button>
            </ButtonGroup>
        );

        return (
            <div>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
                <Panel header={panelHeader} footer={panelFooter}>{panelContent}</Panel>
            </div>
        );
    }

    /**
     * Static method to trigger data actions for server-side rendering.
     *
     * @param routerState
     * @returns {*}
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
            title: `Home - Page ${state.page}`,
            description: `This is the home page.`
        };
    }
}

Discovery.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Discovery;
