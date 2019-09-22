import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (Wrapped,axios) => {
    return class extends Component {
        constructor(props){
            super(props);

            this.state = {
                error: null
            }

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            }, error => Promise.reject(error));
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                // console.log(error);
                this.setState({ error: error });
                return Promise.reject(error);
            });
        }

        componentWillUnmount(){
            // console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        
        errorHandler = () => {
            this.setState({error:null});
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorHandler}>
                        {this.state.error? this.state.error.message:null}
                    </Modal>
                    <Wrapped {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;