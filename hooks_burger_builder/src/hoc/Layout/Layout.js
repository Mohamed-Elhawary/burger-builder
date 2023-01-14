import React, { /* Component */ useState } from 'react';
import {connect} from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    /* state = {
        sideDrawerShow: false
    } */

    const [sideDrawerShow, setSideDrawerShow] = useState(false);

    const sideDrawerCancelled = () => {
        setSideDrawerShow(false);
        //this.setState({sideDrawerShow: false})
    }

    const sideDrawerToggle = () => {
        /* this.setState((prevState) => {
            return {sideDrawerShow: !prevState.sideDrawerShow};
        }); */
        setSideDrawerShow(!sideDrawerShow);
    };

    return (
        <Aux>
            <Toolbar sideDrawerToggle={sideDrawerToggle} isAuth={props.isAuth}/>
            <SideDrawer sideDrawerShow = {sideDrawerShow} sideDrawerCancelled={sideDrawerCancelled} isAuth={props.isAuth}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps, null)(Layout);