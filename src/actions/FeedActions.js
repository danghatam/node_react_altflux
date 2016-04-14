// Libraries
import _ from 'lodash';

// Dispatcher and constants
import alt from '../alt';

// Actions
import AppActions from './AppActions';

// API
import FeedAPI from '../api/Feed';

class FeedActions {
    getFeed(parameters) {
        const { id, callback } = parameters;

        const payload = {
            id,
            getData: FeedAPI.get(id),
            onError: error => {
                AppActions.showAlert({ error });
            },
            onFinish: (callback != null && _.isFunction(callback)) ? callback : undefined
        };

        this.dispatch(payload);
    }

    getFeeds(parameters) {
        const { page, perPageCount, callback } = parameters;

        const payload = {
            page,
            perPageCount,
            getData: FeedAPI.getPage(page, perPageCount),
            onError: error => {
                // TODO: You can add in hooks here to do something when an error occurs.
                AppActions.showAlert({ error });
            },
            onFinish: (callback != null && _.isFunction(callback)) ? callback : undefined
        };

        this.dispatch(payload);
    }
}

export default alt.createActions(FeedActions);
