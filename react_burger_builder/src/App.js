import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/' exact component={BurgerBuilder}/>
          </Switch>
          <Footer />
        </Layout>
      </div>
    );
  }
}

export default App;
