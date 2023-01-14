import * as actionTypes from './actionTypes';

export const addIngredient = ing => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ing
    }
}

export const removeIngredient = ing => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ing
    }
}

export const setIngredients = ings => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ings
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
    }
}