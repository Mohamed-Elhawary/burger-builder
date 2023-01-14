import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    let sideDrawerClasses = [classes.SideDrawer, classes.Close];
    if(props.sideDrawerShow) {
        sideDrawerClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop modalShow={props.sideDrawerShow} modalCanceled={props.sideDrawerCancelled}/>
            <div className={sideDrawerClasses.join(' ')}>
                <Logo />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;