import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let errorMsg = null;
    if(props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
        errorMsg = <p className={classes.ErrorMsg}>Please Enter a valid {props.elementName}</p>
    }

    switch(props.elementType) {
        case ("input") :
            inputElement = <input {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>
            break;
        case ("textarea") :
            inputElement = <textarea {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>
            break;
        case ("select") :
            inputElement = (<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                                {props.elementConfig.options.map(option => (
                                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                                ))}
                            </select>)
            break;
        default:
            inputElement = <input {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>
    }

    return (
        <div className={classes.Input}>
            {inputElement}
            {errorMsg}
        </div>
    )
}

export default input;