import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Burger</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuth ? <NavigationItem link="/auth">Signup/Login</NavigationItem> : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;