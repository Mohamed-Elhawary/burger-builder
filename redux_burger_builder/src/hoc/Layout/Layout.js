import React, { Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerShow: false
    }

    sideDrawerCancelled = () => {
        this.setState({sideDrawerShow: false})
    }

    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return {sideDrawerShow: !prevState.sideDrawerShow};
        });
    };

    render () {
        return (
            <Aux>
                <Toolbar sideDrawerToggle={this.sideDrawerToggle} isAuth={this.props.isAuth}/>
                <SideDrawer sideDrawerShow = {this.state.sideDrawerShow} sideDrawerCancelled={this.sideDrawerCancelled} isAuth={this.props.isAuth}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps, null)(Layout);