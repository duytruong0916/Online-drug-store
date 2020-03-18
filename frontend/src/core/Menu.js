import React, { Fragment } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { isAuth, Signout } from '../auth/Helpers';
import { history } from '../routes/Routes';
import { connect } from 'react-redux';

const Menu = (props) => {
    const onClickHandle = () => {
        history.push('/');
        Signout(() => {
            console.log('Signed Out');
            window.location.reload(false);
        })
    }

    const renderToggle = () => (
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            {!isAuth() &&
                <Fragment>
                    <span>
                        <NavLink to='/' activeClassName='is-active' className='link-nav'>LOG IN</NavLink>
                    </span>
                </Fragment>}
            {isAuth() &&
                <div className="d-block">
                    <div className="pt-4">
                        <NavLink to='/orderHistory' activeClassName='is-active' className='link-nav'>ORDER HISTORY</NavLink>
                    </div>
                    <div className="pt-4">
                        <NavLink to='/products' activeClassName='is-active' className='link-nav'>PRODUCTS</NavLink>
                    </div>
                    <div className="mt-4">
                        <NavLink to='/profile' activeClassName='is-active' className='link-nav'>PROFILE</NavLink>
                    </div>
                    <div onClick={onClickHandle} className="py-4">
                        <span className='link-nav' style={{ cursor: 'pointer' }}>LOG OUT</span>
                    </div>
                </div>}
        </div>
    );

    const renderMain = () => (
        <div className="navbar">
            <div className="main">
                {!isAuth() &&
                    <Fragment>
                        <span>
                            <NavLink to='/' activeClassName='is-active' className='link-nav'>LOG IN</NavLink>
                        </span>
                    </Fragment>}
                {isAuth() &&
                    <div className="d-flex">
                        <div>
                            <NavLink to='/orderHistory' activeClassName='is-active' className='link-nav'>ORDER HISTORY</NavLink>
                        </div>
                        <div>
                            <NavLink to='/products' activeClassName='is-active' className='link-nav'>PRODUCTS</NavLink>
                        </div>
                        <div>
                            <NavLink to='/profile' activeClassName='is-active' className='link-nav'>PROFILE</NavLink>
                        </div>
                        <div onClick={onClickHandle}>
                            <span className='link-nav' style={{ cursor: 'pointer' }}>LOG OUT</span>
                        </div>
                        {/* <div>
                            <span className='ml-4 mr-4'>
                                <i className="fa fa-shopping-bag mr-2 text-white" style={{ fontSize: '4rem' }}></i>
                                {props.numberOfItem > 0 && <sup><small className='cart-badge' style={{ fontSize: '15px' }}>{props.numberOfItem}</small></sup>}
                            </span>
                        </div> */}
                    </div>}
            </div>
            <span className="navbar-toggle" data-toggle="collapse" data-target="#collapsibleNavbar">
                <i className="fa fa-bars "></i>
            </span>
        </div>
    );

    return (
        <Fragment>
            <div className='w-100 sticky-top' style={{ zIndex: '1', top: 0 }}>
                {renderMain()}
                {renderToggle()}
            </div>
        </Fragment>
    );
}

const mapStatetoProps = (state) => ({
    numberOfItem: state.cart.item
})

export default connect(mapStatetoProps)(Menu);