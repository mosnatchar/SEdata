import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import  logger  from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './redux/index';
import ManagementActivity from './screen/ManagementActivity/ManagementActivity';

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(
    rootReducer,
        applyMiddleware(
            logger,
            middleware,
            thunk,
            promiseMiddleware()
        ) 
);


ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history} >
        <App />
       
    </ConnectedRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
