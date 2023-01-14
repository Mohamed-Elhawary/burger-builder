import React from 'react';
import classes from './Logo.module.css';
import logoImg from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={logoImg} alt="logo"/>
    </div>
);

export default logo;