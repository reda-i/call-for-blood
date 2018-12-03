import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import request from '../../shared/request';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import './signin.css';
class SignIn extends Component {
    state = {
        username: '',
        password: ''
    }

    signInUser = () => {
        const currentState = this.state;
        const { history } = this.props;
        request.post('/endpoints/login', currentState)
            .then((res) => {
                if (!res || !res.data) {
                    return NotificationManager.error('An unknown error occurred, please try again later.');
                }
                localStorage.setItem('userdata_cfb', JSON.stringify(res.data.obj));
                localStorage.setItem('cfb_token', res.data.token);
                // eslint-disable-next-line dot-notation
                request.defaults.headers.common['authorization'] = res.data.token;

                NotificationManager.success('You have signed in successfully');

                return history.push('/calls');
            })
            .catch((err) => {
                if (!err ||
                    !err.response ||
                    !err.response.data ||
                    !err.response.data.err) {
                    return NotificationManager.error('An unknown error occurred, please try again later.');
                }
                const errors = err.response.data.err;

                return Object.keys(errors).forEach((error) => NotificationManager.error(`${errors[error].param} is invalid`));
            });
    }

    handleInputChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className='fill-page signin-back d-flex'>
                <div className='container mt-auto mb-auto'>
                    <div className='row'>
                        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                            <div className='card card-signin my-5'>
                                <div className='card-body'>
                                    <h5 className='card-title text-center'>Sign In</h5>
                                    {!this.props.isGeolocationAvailable
                                        ? <div>
                                            Your browser does not support geolocation, you need to upgrade or change your browser
                                        </div> : !this.props.isGeolocationEnabled
                                            ? <div>
                                                You need to enable geolocation to use CFB app services
                                            </div>
                                            : <form
                                                className='form-signin'
                                                onSubmit={(event) => event.preventDefault()}>
                                                <div className='form-label-group'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='username'
                                                        id='username'
                                                        placeholder='Username'
                                                        value={this.state.username}
                                                        onChange={this.handleInputChange}
                                                        required />
                                                    <label htmlFor='username'>username</label>
                                                </div>
                                                <div className='form-label-group'>
                                                    <input
                                                        type='password'
                                                        className='form-control'
                                                        name='password'
                                                        id='password'
                                                        placeholder='Password'
                                                        value={this.state.password}
                                                        onChange={this.handleInputChange}
                                                        required />
                                                    <label htmlFor='password'>Password</label>
                                                </div>
                                                <button type='button' className='btn btn-lg btn-danger btn-block text-uppercase' onClick={this.signInUser}>Sign IN</button>
                                            </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(geolocated({
    positionOptions: {
        enableHighAccuracy: true
    },
    userDecisionTimeout: 10000
})(SignIn));
