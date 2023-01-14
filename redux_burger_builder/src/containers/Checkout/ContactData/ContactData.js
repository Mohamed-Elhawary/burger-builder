import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components//UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {updateObject, checkValidation} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderFormData: {
            name: {
                elementType: "input",
                elementName: "Name",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementName: "Country",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: "input",
                elementName: "Address",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Address"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip_code: {
                elementType: "input",
                elementName: "ZIP Code",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code"
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
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
            phone: {
                elementType: "input",
                elementName: "Phone",
                value: "",
                elementConfig: {
                    type: "tel",
                    placeholder: "Your Phone"
                },
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            delivery_method: {
                elementType: "select",
                value: "fastest",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "Cheapest", displayValue: "Cheapest"}
                    ]
                },
                validation: {},
                valid: true
            },
            purchase_method: {
                elementType: "select",
                value: "cash",
                elementConfig: {
                    options: [
                        {value: "visa", displayValue: "VISA"},
                        {value: "master card", displayValue: "MASTER CARD"},
                        {value: "cash", displayValue: "CASH"}
                    ]
                },
                validation: {},
                valid: true
            },
        },
        //spinnerState: false,
        formIsValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        //this.setState({spinnerState: true});
        const formData = {};
        for (let key in this.state.orderFormData) {
            formData[key] = this.state.orderFormData[key].value;
        }
        let order = {
            ingredients: this.props.ings,
            totalPrice: this.props.totalPrice,
            orderData: formData,
            userId: this.props.localId
        }
       /* axios.post("/orders.json", order)
       .then(response => {
            this.setState({spinnerState: false});        
            this.props.history.push('/');
       }).catch(error => {this.setState({spinnerState: false})}); */

       this.props.orderBurger(order, this.props.token);
    }

    inputChangeHandler = (event, id) => {
      //const clonedOrderFormData = this.state.orderFormData;    // Same pointer for the two refernce data type of objects {cloned object & original object}
      /*const clonedOrderFormData = {...this.state.orderFormData}; // New pointer to this refernce data type of cloned object
      const clonedOrderFormDataElement = {...clonedOrderFormData[id]};
      clonedOrderFormDataElement.value = event.target.value;
      clonedOrderFormDataElement.valid = checkValidation(clonedOrderFormDataElement.value, clonedOrderFormDataElement.validation);
      clonedOrderFormDataElement.touched = true;
      clonedOrderFormData[id] = clonedOrderFormDataElement; */
      const clonedOrderFormDataElement = updateObject(this.state.orderFormData[id], {
        value: event.target.value,
        valid: checkValidation(event.target.value, this.state.orderFormData[id].validation),
        touched: true
      });
      const clonedOrderFormData = updateObject(this.state.orderFormData, {
        [id]: clonedOrderFormDataElement
      });
      //console.log(clonedOrderFormDataElement);
      let formIsValid = true;
      for(let id in clonedOrderFormData) {
          formIsValid = clonedOrderFormData[id].valid && formIsValid; 
      }
      this.setState({orderFormData: clonedOrderFormData, formIsValid: formIsValid});
    }

    render() {
         const formElementsArray = [];
         for(let key in this.state.orderFormData) {
             formElementsArray.push({
                id: [key],
                config: this.state.orderFormData[key]
             });
         }
        
         let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(element => (
                    <Input 
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value} 
                        changed={(event) => this.inputChangeHandler(event, element.id)} 
                        key={element.id}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation && element.config.touched}
                        elementName={element.config.elementName}/>
                ))}
                <Button btnType= "Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
         );
        //if(this.state.spinnerState) {
        if(this.props.spinnerState) {
            form = <Spinner/>
        }
         return (
             <div className={classes.ContactData}>
                 <h3>Add your Data to continue checkout</h3>
                 {form}
             </div>
         )
     }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        spinnerState: state.order.loading,
        token: state.auth.idToken,
        localId: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));