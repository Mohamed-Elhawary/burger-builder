import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => (
    props.modalShow ? <div className={classes.Backdrop} onClick={props.modalCanceled}></div> : null     
);

export default backdrop;