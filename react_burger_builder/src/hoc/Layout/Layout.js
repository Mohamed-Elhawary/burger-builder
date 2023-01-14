import React, { Component} from 'react';
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
                <Toolbar sideDrawerToggle={this.sideDrawerToggle}/>
                <SideDrawer sideDrawerShow = {this.state.sideDrawerShow} sideDrawerCancelled={this.sideDrawerCancelled}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;