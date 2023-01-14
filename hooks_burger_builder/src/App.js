import React, { /* Component, */ useEffect, Suspense } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
//import lazyLoadComponent from './hoc/lazyLoadComponent/lazyLoadComponent';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
/* import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'; */
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const App = (props) => {
  const { checkAuthState } = props;

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  let routes = null;

  if(props.isAuth) {
    routes = (
      <Switch>
        <Route path='/checkout' /* component={lazyLoadCheckout} */ render={(props) => <Checkout {...props} />} />
        <Route path='/orders' /* component={lazyLoadOrders} */ render={(props) => <Orders {...props} />} />
        <Route path='/auth' /* component={lazyLoadAuth} */ render={(props) => <Auth {...props} />} />
        <Route path='/logout' component={Logout}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/auth' /* component={lazyLoadAuth} */ render={(props) => <Auth {...props} />} />
        <Route path='/' exact component={BurgerBuilder}/>
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
