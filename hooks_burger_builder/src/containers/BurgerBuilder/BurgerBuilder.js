import React, { /* Component,  */useEffect, useState, useCallback } from 'react';
import {/* connect, */ useDispatch, useSelector } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {
    /* state = {
        //ingredients: null,
        //totalPrice: 4,
        //purchasable: false,
        modalShow: false,
        //error: null
    } */

    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);

    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);

    const error =  useSelector(state => state.burgerBuilder.error);

    const isAuth = useSelector(state => state.auth.idToken !== null);
 
    const addIngredient = (ingName) => dispatch(actions.addIngredient(ingName));
 
    const removeIngredient = (ingName) => dispatch(actions.removeIngredient(ingName));
 
    const initIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
 
    const initPurchase = () => dispatch(actions.initPurchase());
 
    const setAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    /* componentDidMount() {
        axios.get("/ingredients.json").then(response => {
            this.setState({ingredients: response.data});
            
        }).catch(error => this.setState({error: error}));
        this.props.initIngredients();
    }  */

    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey]
        }).reduce((prev, curr) => {
            return prev + curr;
        }, 0);

        //this.setState({purchasable: sum > 0});
        return sum > 0;
    }

    const updateModalShowState = () => {
        if(isAuth) {
            //this.setState({modalShow: true});
            setModalShow(true);
        } else {
            setAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const modalCanceled = () => {
        //this.setState({modalShow: false});        
        setModalShow(false);
    }

    const checkoutSuccessed = () => {
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
       initPurchase();
       props.history.push('/checkout');
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

    const disabledIngredients = {
        ...ings
    }
    for (let i in disabledIngredients) {
        disabledIngredients[i] = disabledIngredients[i] <= 0
    }

    let burger = error ? <p>Some went Wrong in the Connection</p> : <Spinner/>;
    let orderSummary = null;
    if(ings) {
        burger = (
            <Aux>
                <Burger ingredients = {ings}/>
                <BurgerControls 
                    addIngredients = {addIngredient} 
                    removeIngredients = {removeIngredient}
                    disabled = {disabledIngredients}
                    price = {totalPrice}
                    purchaseState = {updatePurchaseState(ings)}
                    modalShow = {updateModalShowState}
                    isAuth = {isAuth}
                />
            </Aux>
        );
        orderSummary = <OrderSummary ingredients = {ings} modalCanceled={modalCanceled} checkoutSuccessed={checkoutSuccessed} totalPrice={totalPrice}/>
    }

    return (
        <Aux>
            <Modal modalShow = {modalShow} modalCanceled = {modalCanceled}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

/* const mapStateToProps = state => {
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
} */

export default /* connect(mapStateToProps, mapDispatchToProps)( */withErrorHandler(BurgerBuilder, axios);