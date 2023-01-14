import React from 'react';
import classes from './ToggleButton.module.css';


const toggleButton = (props) => {
    return (
       <div onClick={props.clicked} className={classes.ToggleButton}>
           <div></div>
           <div></div>
           <div></div>
       </div> 
    )
}

export default toggleButton;