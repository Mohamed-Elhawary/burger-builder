import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        //ingredients: null,
        //totalPrice: 4,
        //purchasable: false,
        modalShow: false,
        //error: null
    }

    componentDidMount() {
        /* axios.get("/ingredients.json").then(response => {
            this.setState({ingredients: response.data});
            
        }).catch(error => this.setState({error: error})); */
        this.props.initIngredients();
    } 

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey]
        }).reduce((prev, curr) => {
            return prev + curr;
        }, 0);

        //this.setState({purchasable: sum > 0});
        return sum > 0;
    }

    updateModalShowState = () => {
        if(this.props.isAuth) {
            this.setState({modalShow: true});
        } else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    modalCanceled = () => {
        this.setState({modalShow: false});        
    }

    checkoutSuccessed = () => {
       /* let queryParams = [];
       for(let ingredient in this.props.ings) {
           //console.log(ingredient);
           queryParams.push(encodeURIComponent(ingredient) + "=" + encodeURIComponent(this.props.ings[ingredient]));
       }
       queryParams.push('price=' + this.props.totalPrice);
       let queryString = queryParams.join("&"); */
       /* this.props.history.push({
           pathname: '/checkout',
           search: "?" + queryString
       }); */
       this.props.initPurchase();
       this.props.history.push('/checkout');
    }

    /* addIngredients = (type) => {
        const oldCount = this.props.ings[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ings
        };
        updatedIngredients[type] = updatedCount;

        const priceAddedItem = INGREDIENT_PRICES[type];
        const oldTotalPrice  = this.props.totalPrice;
        const newTotalPrice  = oldTotalPrice + priceAddedItem;
        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceRemovedItem = INGREDIENT_PRICES[type];
        const oldTotalPrice  = this.props.totalPrice;
        const newTotalPrice  = oldTotalPrice - priceRemovedItem;
        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});
        this.updatePurchaseState(updatedIngredients);
    } */

    render() {
        const disabledIngredients = {
            ...this.props.ings
        }
        for (let i in disabledIngredients) {
            disabledIngredients[i] = disabledIngredients[i] <= 0
        }

        let burger = this.props.error ? <p>Some went Wrong in the Connection</p> : <Spinner/>;
        let orderSummary = null;
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BurgerControls 
                        addIngredients = {this.props.addIngredient} 
                        removeIngredients = {this.props.removeIngredient}
                        disabled = {disabledIngredients}
                        price = {this.props.totalPrice}
                        purchaseState = {this.updatePurchaseState(this.props.ings)}
                        modalShow = {this.updateModalShowState}
                        isAuth = {this.props.isAuth}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients = {this.props.ings} modalCanceled={this.modalCanceled} checkoutSuccessed={this.checkoutSuccessed} totalPrice={this.props.totalPrice}/>
        }

        return (
            <Aux>
                <Modal modalShow = {this.state.modalShow} modalCanceled = {this.modalCanceled}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.idToken !== null
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        removeIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.initPurchase()),
        setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));