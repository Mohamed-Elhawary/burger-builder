import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import lazyLoadComponent from './hoc/lazyLoadComponent/lazyLoadComponent';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
/* import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'; */
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Footer from './components/Footer/Footer';

const lazyLoadCheckout = lazyLoadComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const lazyLoadOrders = lazyLoadComponent(() => {
  return import('./containers/Orders/Orders');
});

const lazyLoadAuth = lazyLoadComponent(() => {
  return import('./containers/Auth/Auth');
});
class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    let routes = null;

    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/checkout' component={lazyLoadCheckout}/>
          <Route path='/orders' component={lazyLoadOrders}/>
          <Route path='/auth' component={lazyLoadAuth}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/' />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path='/auth' component={lazyLoadAuth}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
          <Footer />
        </Layout>
      </div>
    );
  }
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
