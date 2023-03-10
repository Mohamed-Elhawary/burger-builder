import React, {/* Component, */ useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';

const Logout = props => {
    /* componentDidMount() {
        this.props.logout();
    }
 */
    const { logout } = props;

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <Redirect to='/' />
    );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
};

export default connect(null, mapDispatchToProps)(Logout);