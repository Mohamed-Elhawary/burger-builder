import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    let orders = [];
    for(let order in props.ingredients) {
        orders.push({ingredientName: order, value: props.ingredients[order]});
    }

    let outputOrders = orders.map(ing => {
        return <span className={classes.Ingredient} key={ing.ingredientName}>{ing.ingredientName}: ({ing.value})</span>
    });
    return (
        <div className={classes.Order}>
            <p>{outputOrders}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;