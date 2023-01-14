import react from 'react';
import classes from './BurgerControl.module.css';

const burgerControl = (props) => {
    return (
        <div className={classes.BurgerControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.removeIngredients} disabled={props.disabled}>-</button>
            <button className={classes.More} onClick={props.addIngredients}>+</button>
        </div>
    );
};

export default burgerControl;