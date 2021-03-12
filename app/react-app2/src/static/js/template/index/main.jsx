import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import 'style/template/index.scss';
import Capp from './containers/Capp.js';
import reducer from './reducers/reducer.js';

const store = createStore(reducer, applyMiddleware(thunk));


function render(props) {
    const { container } = props;
    ReactDOM.render(<Provider store={store}><Capp /></Provider>, container ? container.querySelector('#root') : document.querySelector('#main'));
}

if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
}

export async function mount(props) {
    render(props);
}

export async function unmount(props) {
    const { container } = props;
    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#main'));
}
