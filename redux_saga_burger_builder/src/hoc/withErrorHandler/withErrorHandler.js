import React, { Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        UNSAFE_componentWillMount() {  //UNSAFE_componentWillMount "alternative for modern react because componentWillMount will be deprecated Soon"
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        modalCancelled = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal modalShow={this.state.error} modalCanceled={this.modalCancelled}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;