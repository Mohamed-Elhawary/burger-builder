import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl'
import classes from './BurgerControls.module.css';

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
];
const burgerControls = (props) => {
    return (
        <div className={classes.BurgerControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)} $</strong></p>
            {controls.map(ctrl => {
                return <BurgerControl 
                        key={ctrl.label} 
                        label={ctrl.label} 
                        addIngredients = {() => props.addIngredients(ctrl.type)}
                        removeIngredients = {() => props.removeIngredients(ctrl.type)}
                        disabled = {props.disabled[ctrl.type]}
                        />
            })}

            <button className={classes.OrderButton} disabled={!props.purchaseState} onClick={props.modalShow}>{props.isAuth ? "Order Now" : "Signup to Order"}</button>
        </div>
    );
};

export default burgerControls;