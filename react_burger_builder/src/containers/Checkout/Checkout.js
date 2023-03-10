import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        //console.log(query)
        //console.log(query.entries())
        for(let param of query.entries()) {
            if(param[0] == "price") {
                price = +param[1];
            } else {
                //console.log(param);
                ingredients[param[0]] = +param[1];
            }
        }
        //console.log(ingredients);
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutContinuedHandler =  () => {
        this.props.history.replace('/checkout/contact-data')
    }

    checkoutCancelledHandler =  () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;