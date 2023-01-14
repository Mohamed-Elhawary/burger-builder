import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const orderList = Object.keys(props.ingredients).map(ingredientKey => {
        return (
            <li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span> {props.ingredients[ingredientKey]}
            </li>
        );
    });
    return (
        <Aux>
            <p>Your Order Summary is:</p>
            <ul>
                {orderList}
            </ul>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}$</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType="Success" clicked={props.checkoutSuccessed}>Checkout</Button>
            <Button btnType="Danger" clicked={props.modalCanceled}>Cancel</Button>
        </Aux>
    );
};

export default orderSummary;