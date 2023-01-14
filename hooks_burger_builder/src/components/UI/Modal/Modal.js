import React, {/* Component */} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
    /* componentDidUpdate() {
        //console.log("Modal is updating");
    } */

    /* shouldComponentUpdate(nextProps, nextState) {
        return nextProps.modalShow != this.props.modalShow || nextProps.children != this.props.children
    }; */

    return(
        <Aux>
            <Backdrop modalShow={props.modalShow} modalCanceled={props.modalCanceled}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: props.modalShow ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.modalShow ? "1" : "0"            
                }}>
                {props.children}
            </div>
        </Aux>
    );
}

export default React.memo(Modal, (prevProps, nextProps) => nextProps.modalShow === prevProps.modalShow && nextProps.children === prevProps.children);