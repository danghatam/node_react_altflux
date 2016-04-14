// Core
import alt from '../alt';
// import EventEmitter from 'eventemitter3';

// Actions
import ArticleActions from '../actions/ArticleActions';

// Dependent Stores
// import AppStore from './AppStore';

// Libraries
import _ from 'lodash';
// import assign from 'object-assign';
import objectHasKey from '../utilities/objectHasKey';

class ArticleStore {
    constructor() {
        this.articles = [];
        this.articleListOrder = [];

        this.bindAction(ArticleActions.getArticle, this.onGetArticle);
        this.bindAction(ArticleActions.getArticles, this.onGetArticles);

        this.exportPublicMethods({
            get: this.get,
            getList: this.getList,
            getPage: this.getPage
        });
    }

    onGetArticle(payload) {
        const {
            id,
            fields,
            getData,
            onError,
            onFinish
            } = payload;

        const successCallback = article => {
            if (article != null) {
                this.set(article);
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

        if (!this.has(id, fields)) {
            getData()
                .then(successCallback)
                .catch(errorCallback);
        } else {
            successCallback();
        }

        // We don't want to trigger the change event until the async operation completes.
        return false;
    }

    onGetArticles(payload) {
        const {
            page,
            perPageCount,
            fields,
            getData,
            onError,
            onFinish
            } = payload;

        const successCallback = articles => {
            if (articles != null) {
                this.setList(articles, (page - 1) * perPageCount);
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

        if (!this.hasPage(page, perPageCount, fields)) {
            getData()
                .then(successCallback)
                .catch(errorCallback);
        } else {
            successCallback();
        }

        // We don't want to trigger the change event until the async operation completes.
        return false;
    }

    has(id, fields) {
        const article = this.articles[id];

        if (article != null) {
            if (_.isArray(fields)) {
                let hasAllRequiredFields = true;
                for (const field of fields) {
                    if (!objectHasKey(article, field)) {
                        hasAllRequiredFields = false;
                        break;
                    }
                }

                return hasAllRequiredFields;
            }

            return true;
        }

        return false;
    }

    hasList(startIndex, count, fields) {
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
                const articleId = this.articleListOrder[i];
                if (articleId == null || !this.has(articleId, fields)) {
                    listElementsExists = false;
                    break;
                }
            }

            return listElementsExists;
        }

        return false;
    }

    hasPage(page, count, fields) {
        return this.hasList((page - 1) * count, count, fields);
    }

    get(id) {
        const state = this.getState();
        return state.articles[id];
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

            let articleList = _.slice(state.articleListOrder, listStartIndex, endIndex);

            articleList = _.map(articleList, function iterator(id) {
                return this.articles[id];
            }, state);

            return articleList;
        }

        return null;
    }

    getPage(page, count) {
        return this.getList((page - 1) * count, count);
    }

    set(article) {
        if (article != null) {
            const clonedArticle = _.cloneDeep(article);
            this.articles[clonedArticle.id] = clonedArticle;

            return true; // Article was successfully updated.
        }

        return false;
    }

    setList(articleList, startIndex) {
        let i = startIndex;

        if (_.isArray(articleList)) {
            _.forEach(articleList, article => {
                const clonedArticle = _.cloneDeep(article);

                // TODO We might want to do a merge here?
                // In case the API returns data differently
                this.articles[clonedArticle.id] = clonedArticle;
                this.articleListOrder[i] = clonedArticle.id;
                ++i;
            }, this);

            return true;
        }

        return false;
    }
}

export default alt.createStore(ArticleStore, 'ArticleStore', true);
