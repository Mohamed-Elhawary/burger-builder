import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    componentDidUpdate() {
        //console.log("Modal is updating");
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.modalShow != this.props.modalShow || nextProps.children != this.props.children
    };

    render() {
        return(
            <Aux>
                <Backdrop modalShow={this.props.modalShow} modalCanceled={this.props.modalCanceled}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.modalShow ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.modalShow ? "1" : "0"            
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
} 

export default Modal;