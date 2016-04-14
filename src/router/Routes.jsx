'use strict';

/*=================================
 React & Router
 =================================*/
import React from 'react';
import {Route, IndexRoute} from 'react-router';

/*=================================
 Components
 =================================*/
import App from '../components/App';
import Home from '../components/Home';
import UserDetails from '../components/User/Details';
import ArticleList from '../components/Article/List';
import ArticleDetails from '../components/Article/Details';
import ProfessionalCategories from '../components/Professional/Categories';
import ProfessionalList from '../components/Professional/List';
import ProfessionalDetails from '../components/Professional/Details';

/*=================================
 ROUTES
 =================================*/
let routes = (
	<Route path="/" component={App} >
        <Route path="/article" component={ArticleList} />
        <Route path="/article/:id/:slug" component={ArticleDetails} />
        <Route path="/categories" component={ProfessionalCategories} />
        <Route path="professionals">
        	<IndexRoute component={ProfessionalList} />
        	<Route path=":id" component={ProfessionalDetails} />
        </Route>
        <Route path="/user/:id" component={UserDetails} />
        <IndexRoute component={Home} />
    </Route>
);

export default routes;
