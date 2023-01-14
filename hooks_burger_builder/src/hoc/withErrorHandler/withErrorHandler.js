import React, { /* Component, useState, useEffect */} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, modalCancelled] = useHttpErrorHandler(axios);

        /* state = {
            error: null
        }

        const [error, setError] = useState(null);

        UNSAFE_componentWillMount() {  //UNSAFE_componentWillMount "alternative for modern react because componentWillMount will be deprecated Soon"
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        const reqInterceptors = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptors = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resInterceptors);
            }
        }, [reqInterceptors, resInterceptors]);

        const modalCancelled = () => {
            setError(null);
        }*/

        return (
            <Aux>
                <Modal modalShow={error} modalCanceled={modalCancelled}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        )
    }
}

export default withErrorHandler;