import React, {/* Component, */ useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components//UI/Input/Input';
import {updateObject, checkValidation} from '../../shared/utility';
import * as actions from '../../store/actions/index';

const Auth = props => {
    /* state = {
        authFormData: {
            email: {
                elementType: "input",
                elementName: "Email",
                value: "",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementName: "Password",
                value: "",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignup: true
    } */

    const [authFormData, setAuthFormData] = useState({
        email: {
            elementType: "input",
            elementName: "Email",
            value: "",
            elementConfig: {
                type: "email",
                placeholder: "Your E-Mail"
            },
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: "input",
            elementName: "Password",
            value: "",
            elementConfig: {
                type: "password",
                placeholder: "Password"
            },
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    });

    const [isSignup, setIsSignup] = useState(true);

    const [formIsValid, setFormIsValid] = useState(false);

    /* componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath();
        }
    } */

    const { building, authRedirectPath, setAuthRedirectPath } = props;

    useEffect(() => {
        if(!building && authRedirectPath !== '/') {
            setAuthRedirectPath();
        }
    }, [building, authRedirectPath, setAuthRedirectPath]);

    const authHandler = (e) => {
        e.preventDefault();
        props.sendAuth(authFormData.email.value, authFormData.password.value, isSignup);
    }

    const authSwitchModeHandler = () => {
        //this.setState({isSignup: !this.state.isSignup});
        /*Or*/
        /* this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        }); */

        setIsSignup(!isSignup);
    }

    const inputChangeHandler = (event, id) => {
        //const clonedAuthFormData = this.state.authFormData;    // Same pointer for the two refernce data type of objects {cloned object & original object}
        /* const clonedAuthFormData = {...this.state.authFormData}; // New pointer to this refernce data type of cloned object
        const clonedAuthFormDataElement = {...clonedAuthFormData[id]};
        clonedAuthFormDataElement.value = event.target.value;
        clonedAuthFormDataElement.valid = checkValidation(clonedAuthFormDataElement.value, clonedAuthFormDataElement.validation);
        clonedAuthFormDataElement.touched = true;
        clonedAuthFormData[id] = clonedAuthFormDataElement; */
        /* OR */
        /* const clonedAuthFormData = {
            ...this.state.authFormData,
            [id]: {
                ...this.state.authFormData[id],
                value: event.target.value,
                valid: checkValidation(event.target.value, this.state.authFormData[id].validation),
                touched: true
            }
        } */
        const clonedAuthFormData = updateObject(authFormData, {
            [id]: updateObject(authFormData[id], {
                value: event.target.value,
                valid: checkValidation(event.target.value, authFormData[id].validation),
                touched: true
            })
        });
        let formIsValid = true;
        for(let key in clonedAuthFormData) {
            formIsValid = clonedAuthFormData[key].valid && formIsValid; 
        }
        //this.setState({authFormData: clonedAuthFormData, formIsValid: formIsValid});
        setAuthFormData(clonedAuthFormData);

        setFormIsValid(formIsValid);
    }

    const formElementsArray = [];
    for(let key in authFormData) {
        formElementsArray.push({
        id: [key],
        config: authFormData[key]
        });
    }

    let form = (
    <form onSubmit={authHandler}>
        {formElementsArray.map(element => (
            <Input 
                elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} 
                value={element.config.value} 
                changed={(event) => inputChangeHandler(event, element.id)} 
                key={element.id}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation && element.config.touched}
                elementName={element.config.elementName}/>
        ))}
        {isSignup ? (
            <Button btnType= "Success" disabled={!formIsValid}>Signup</Button>
        ) : (
            <Button btnType= "Success">Signin</Button>
        )}
    </form>
    );

    if(props.spinnerState) {
        form = <Spinner/>
    }

    let errorMsg = null;
    if(props.errorState) {
        errorMsg = <p className={classes.AuthErrorMsg}>{props.errorState.message}</p>;
    }

    let authRedirect = null;
    if(props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            <h3>{isSignup ? "Signup" : "Signin"}</h3>
            {form}
            <Button btnType= "Danger" clicked={authSwitchModeHandler}>Switch to {isSignup ? "Signin" : "Signup"}</Button>
            {errorMsg}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        spinnerState: state.auth.loading,
        errorState: state.auth.error,
        isAuth: state.auth.idToken !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burgerBuilder.building
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        sendAuth: (email, password, isSignup) => dispatch(actions.sendAuth(email, password, isSignup)),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);