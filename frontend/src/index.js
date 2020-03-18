import React from 'react';
import ReactDOM from 'react-dom';
import './style/styles.scss';
import { isAuth } from './auth/Helpers';
import {itemTotal} from './redux-store/actions/cart';
import Routes, { history } from './routes/Routes';
import configureStore from './redux-store/configureStore';
import {Provider} from 'react-redux';
const store = configureStore();

const jsx = (
    <Provider store = {store}>
        <Routes />
    </Provider>
);

ReactDOM.render(<p>loading...</p>, document.getElementById('root'));
let hasRendered = false; 

const renderApp =() =>{
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    }
}


if (isAuth()) {
    const numberOfItem = itemTotal();
    store.dispatch({ type: 'UPDATE_ITEM', numberOfItem});
    renderApp();
    if (history.location.pathname === '/') {
        history.push('/products')
    }
}else {
    renderApp();
    history.push('/');
}
