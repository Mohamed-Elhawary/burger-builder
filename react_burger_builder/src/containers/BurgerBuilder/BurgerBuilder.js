import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: .7,
    bacon: .6,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        modalShow: false,
        error: null
    }

    componentDidMount() {
        axios.get("/ingredients.json").then(response => {
            this.setState({ingredients: response.data});
            
        }).catch(error => this.setState({error: error}));
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey]
        }).reduce((prev, curr) => {
            return prev + curr;
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    updateModalShowState = () => {
        this.setState({modalShow: true});
    }

    modalCanceled = () => {
        this.setState({modalShow: false});        
    }

    checkoutSuccessed = () => {
       let queryParams = [];
       for(let ingredient in this.state.ingredients) {
           //console.log(ingredient);
           queryParams.push(encodeURIComponent(ingredient) + "=" + encodeURIComponent(this.state.ingredients[ingredient]));
       }
       queryParams.push('price=' + this.state.totalPrice);
       let queryString = queryParams.join("&");
       this.props.history.push({
           pathname: '/checkout',
           search: "?" + queryString
       });
    }

    addIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddedItem = INGREDIENT_PRICES[type];
        const oldTotalPrice  = this.state.totalPrice;
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
        const oldTotalPrice  = this.state.totalPrice;
        const newTotalPrice  = oldTotalPrice - priceRemovedItem;
        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledIngredients = {
            ...this.state.ingredients
        }
        for (let i in disabledIngredients) {
            disabledIngredients[i] = disabledIngredients[i] <= 0
        }

        let burger = this.state.error ? <p>Some went Wrong in the Connection</p> : <Spinner/>;
        let orderSummary = null;
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BurgerControls 
                        addIngredients = {this.addIngredients} 
                        removeIngredients = {this.removeIngredients}
                        disabled = {disabledIngredients}
                        price = {this.state.totalPrice}
                        purchaseState = {this.state.purchasable}
                        modalShow = {this.updateModalShowState}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients = {this.state.ingredients} modalCanceled={this.modalCanceled} checkoutSuccessed={this.checkoutSuccessed} totalPrice={this.state.totalPrice}/>
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

export default withErrorHandler(BurgerBuilder, axios);