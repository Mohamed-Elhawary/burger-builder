import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: .7,
    bacon: .6,
}

const addIngredient = (state, action) => {
    let updatedAddedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    let updatedAddedIngredients = updateObject(state.ingredients, updatedAddedIngredient);
    let updatedAddedState = {
        ingredients: updatedAddedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedAddedState);
}

const removeIngredient = (state, action) => {
    let updatedRemovedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    let updatedRemovedIngredients = updateObject(state.ingredients, updatedRemovedIngredient);
    let updatedRemovedState = {
        ingredients: updatedRemovedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedRemovedState);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false,
                building: false
            });
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.ADD_INGREDIENT): return addIngredient(state, action);
        case(actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);  
        case(actionTypes.SET_INGREDIENTS): return setIngredients(state, action); 
        case(actionTypes.FETCH_INGREDIENTS_FAILED): return updateObject(state, {error: true});
        default: return state;
    }
};

export default burgerBuilderReducer;