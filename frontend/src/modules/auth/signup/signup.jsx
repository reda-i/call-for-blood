import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import request from '../../shared/request';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';

import './signup.css';
class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        isHospital: false,
        phoneNumber: '',
        location: {
            type: 'Point',
            coordinates: []
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('cfb_token');
        if (token) {
            this.props.history.push('/calls');
        }
    }

    signUpUser = () => {
        const currentState = this.state;
        const { history } = this.props;
        currentState.location.coordinates =
            [
                this.props.coords.longitude,
                this.props.coords.latitude
            ]
        request.post('/endpoints/signup', currentState)
            .then((res) => {
                if (!res || !res.data) {
                    return NotificationManager.error('An unknown error occurred, please try again later.');
                }
                localStorage.setItem('userdata_cfb', JSON.stringify(res.data.obj));
                localStorage.setItem('cfb_token', res.data.token);
                // eslint-disable-next-line dot-notation
                request.defaults.headers.common['authorization'] = res.data.token;

                NotificationManager.success('You have signed up successfully');

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
            <div className='fill-page signup-back d-flex'>
                <div className='container mt-auto mb-auto'>
                    <div className='row'>
                        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                            <div className='card card-signup my-5'>
                                <div className='card-body'>
                                    <h5 className='card-title text-center'>Sign Up</h5>
                                    {!this.props.isGeolocationAvailable
                                        ? <div>
                                            Your browser does not support geolocation, you need to upgrade or change your browser
                                        </div> : !this.props.isGeolocationEnabled
                                            ? <div>
                                                You need to enable geolocation to use CFB app services
                                            </div>
                                            : <form
                                                className='form-signup'
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
                                                        type='email'
                                                        className='form-control'
                                                        name='email'
                                                        id='email'
                                                        placeholder='Email Address'
                                                        value={this.state.email}
                                                        onChange={this.handleInputChange}
                                                        required />
                                                    <label htmlFor='email'>Email Address</label>
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
                                                <div className='form-label-group'>
                                                    <input
                                                        type='tel'
                                                        className='form-control'
                                                        name='phoneNumber'
                                                        id='phoneNumber'
                                                        value={this.state.phoneNumber}
                                                        onChange={this.handleInputChange}
                                                        placeholder='Phone Number' />
                                                    <label htmlFor='phoneNumber'>Phone Number</label>
                                                </div>
                                                <div className='custom-control custom-checkbox mb-3'>
                                                    <input
                                                        type='checkbox'
                                                        className='custom-control-input'
                                                        name='isHospital'
                                                        id='isHospital'
                                                        checked={this.state.isHospital}
                                                        onChange={this.handleInputChange}
                                                    />
                                                    <label className='custom-control-label' htmlFor='isHospital'>I am a hospital administrator</label>
                                                </div>
                                                <button type='button' className='btn btn-lg btn-danger btn-block text-uppercase' onClick={this.signUpUser}>Sign Up</button>
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
})(SignUp));
