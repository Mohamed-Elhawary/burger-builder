import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css';
import {withRouter} from 'react-router-dom';

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients).map(ingredientKey => {
        //console.log(ingredientKey);
        return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
            return <BurgerIngredient type={ingredientKey} key={ingredientKey + i}/>
        });
    }).reduce((prev, curr) => {
        return prev.concat(curr);
    }, []);

    //console.log(ingredients);

    if(ingredients.length == 0) {
        ingredients = <p>Please Add ingredients to your Burger</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);