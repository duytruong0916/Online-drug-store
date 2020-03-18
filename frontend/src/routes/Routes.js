import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history'
import SignIn from '../auth/signin';
import ProductList from '../core/productList';
import productDetail from '../core/productDetail';
import UserProfile from '../core/profile';
import UserProfileUpdate  from '../core/profileUpdate';
import Menu from '../core/Menu';
import OrdersHistory from '../core/OrderHistory';
export const history = createHistory();

const Routes = ()=>{
    return(
        <Router history={history} forceRefresh={true}>
        <Menu />
                <Route path = '/' exact = {true}component={SignIn}/>
                <Route path = '/products' component={ProductList}/>
                <Route path = '/productDetail/:productid' component={productDetail}/>
                <Route path = '/profile' component={UserProfile}/>
                <Route path = '/update/:userid' component={UserProfileUpdate}/>
                <Route path = '/orderHistory' component={OrdersHistory}/>
        </Router>
    )
}
export default Routes;