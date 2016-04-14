// Libraries
import _ from 'lodash';

// Dispatcher and constants
import alt from '../alt';

// Actions
import AppActions from './AppActions';

// API
import ArticleAPI from '../api/Article';

class ArticleActions {
    getArticle(parameters) {
        const { id, fields, callback } = parameters;

        const payload = {
            id,
            fields,
            getData: ArticleAPI.get(id),
            onError: error => {
                AppActions.showAlert({ error });
            },
            onFinish: (callback != null && _.isFunction(callback)) ? callback : undefined
        };

        this.dispatch(payload);
    }

    getArticles(parameters) {
        const { page, perPageCount, fields, callback } = parameters;

        const payload = {
            page,
            perPageCount,
            fields,
            getData: ArticleAPI.getPage(page, perPageCount),
            onError: error => {
                // TODO: You can add in hooks here to do something when an error occurs.
                AppActions.showAlert({ error });
            },
            onFinish: (callback != null && _.isFunction(callback)) ? callback : undefined
        };

        this.dispatch(payload);
    }
}

export default alt.createActions(ArticleActions);
