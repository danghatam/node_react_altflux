// Core
import alt from '../alt';

// Actions
import FeedActions from '../actions/FeedActions';

// Dependent Stores

// Libraries
import _ from 'lodash';


class FeedStore {
    constructor() {
        this.feeds = [];
        this.feedListOrder = [];

        this.bindAction(FeedActions.getFeeds, this.onGetFeeds);

        this.exportPublicMethods({
            get: this.get,
            getList: this.getList,
            getPage: this.getPage
        });
    }

    onGetFeeds(payload) {
        const {
            page,
            perPageCount,
            getData,
            onError,
            onFinish
            } = payload;

        const successCallback = feeds => {
            if (feeds != null) {
                this.setList(feeds, (page - 1) * perPageCount);
            }

            if (onFinish != null && _.isFunction(onFinish)) {
                onFinish();
            }
            this.emitChange();
        };

        const errorCallback = error => {
            if (onError != null && _.isFunction(onError)) {
                onError(error);
            }

            if (onFinish != null && _.isFunction(onFinish)) {
                onFinish(error);
            }
        };

        if (!this.hasPage(page, perPageCount)) {
            getData()
                .then(successCallback)
                .catch(errorCallback);
        } else {
            successCallback();
        }

        // We don't want to trigger the change event until the async operation completes.
        return false;
    }

    has(id) {
        const feed = this.feeds[id];

        if (feed != null) {
            return true;
        }

        return false;
    }

    hasList(startIndex, count) {
        let listCount = count;
        let listStartIndex = startIndex;

        if (listCount == null && listStartIndex != null) {
            listCount = listStartIndex;
            listStartIndex = 0;
        }

        if (listStartIndex >= 0 && listCount > 1) {
            const lastIndex = listStartIndex + listCount;
            let listElementsExists = true;

            for (let i = listStartIndex; i < lastIndex; ++i) {
                const feedId = this.feedListOrder[i];
                if (feedId == null || !this.has(feedId)) {
                    listElementsExists = false;
                    break;
                }
            }

            return listElementsExists;
        }

        return false;
    }

    hasPage(page, count) {
        return this.hasList((page - 1) * count, count);
    }

    get(id) {
        const state = this.getState();

        return state.feeds[id];
    }

    getList(startIndex, count) {
        const state = this.getState();
        let listCount = count;
        let listStartIndex = startIndex;

        if (listCount == null && listStartIndex != null) {
            listCount = listStartIndex;
            listStartIndex = 0;
        }

        if (listStartIndex >= 0 && listCount > 1) {
            const endIndex = listStartIndex + listCount;

            let feedList = _.slice(state.feedListOrder, listStartIndex, endIndex);

            feedList = _.map(feedList, function iterator(id) {
                return this.feeds[id];
            }, state);

            return feedList;
        }

        return null;
    }

    getPage(page, count) {
        return this.getList((page - 1) * count, count);
    }

    set(feed) {
        if (feed != null) {
            const clonedFeed = _.cloneDeep(feed);

            // TODO We might want to do a merge here? In case the API returns data differently
            this.feeds[clonedFeed.id] = clonedFeed;

            return true; // Feed was successfully updated.
        }

        return false;
    }

    setList(feedList, startIndex) {
        let i = startIndex;

        if (_.isArray(feedList)) {
            _.forEach(feedList, feed => {
                const clonedFeed = _.cloneDeep(feed);

                // TODO We might want to do a merge here?
                // In case the API returns data differently
                this.feeds[clonedFeed.id] = clonedFeed;
                this.feedListOrder[i] = clonedFeed.id;
                ++i;
            }, this);

            return true;
        }

        return false;
    }
}

export default alt.createStore(FeedStore, 'FeedStore', true);
