'use strict';

// React
import React from 'react';

// Libraries
import _ from 'lodash';
import {RouteHandler} from 'react-router';

// Components
import Navigation from '../Widgets/Navigation';
import Footer from '../Widgets/Footer';
import GoogleAnalytics from 'react-ga';
import List from '../Widgets/List';

// Actions
import UserActions from '../../actions/UserActions';

// Stores
import AppStore from '../../stores/AppStore';

class App extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.

        this.onTestLoginBtnClicked = () => {
            //FOR TESTING ONLY
            let parameters = {
                email: 'test@email.com',
                password: 'password'
            };

            UserActions.loginUser(parameters);
        };

    }

    componentDidMount() {
        AppStore.listen(this.onAlert);
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onAlert);
    }

    /**
     * @return {object}
     */
    render() {
        return (
            <div>
                <Navigation onLogin={this.onTestLoginBtnClicked}/>
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </div>
        );
    }

    /**
     * Event handler for 'change' events coming from the UserStore
     */
    onAlert() {
        _.forEach(AppStore.getPendingAlerts(), (alertPayload) => {
            console.log(`${alertPayload.type.toUpperCase()} :: ${alertPayload.title} - ${alertPayload.message}`);
            window.alert(`${alertPayload.type.toUpperCase()} :: ${alertPayload.title} - ${alertPayload.message}`);
        });
    }
}

export default App;
