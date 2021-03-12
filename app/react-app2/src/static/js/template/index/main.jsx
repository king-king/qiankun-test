import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import 'style/template/index.scss';
import Capp from './containers/Capp.js';
import reducer from './reducers/reducer.js';

const store = createStore(reducer, applyMiddleware(thunk));


ReactDOM.render(<Provider store={store}><Capp /></Provider>, document.querySelector('#main'));
