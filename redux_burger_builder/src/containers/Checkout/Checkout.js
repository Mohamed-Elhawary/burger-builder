import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
     /* state = {
        ingredients: {},
        totalPrice: 0
    } */ 

    /*Note:- you can use here componentWillMount() >> instead of componentDidMount() & making the (this.state.ingredients to {}),
    so we can make (this.state.ingredients to (null)), because (componentWillMount) will be mounted before the children of this component are mounted,
    so the [ingredients props] in the <ContactData/> component will not causes any errors,
    BUT unfurtunatally this function is DEPRECATED in modern versions of react so you have to use (this.state.ingredients to {})*/
    
    /* componentDidMount() { 
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        //console.log(query)
        //console.log(query.entries());
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
    } */

    checkoutContinuedHandler =  () => {
        this.props.history.replace('/checkout/contact-data')
    }

    checkoutCancelledHandler =  () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to='/' />;
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelledHandler} 
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        /* render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} */
                        component = {ContactData}    
                    />
                </div>
            )
        } 
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);