import React, { Component } from 'react';
import request from '../shared/request';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import './calls.css';


class Calls extends Component {
    state = {
        title: '',
        case: '',
        parsedUser: null,
        token: ''
    }

    componentDidMount = () => {
        const userString = localStorage.getItem('userdata_cfb');
        const token = localStorage.getItem('cfb_token');
        if (!userString || !token) {
            return this.props.history.push('/signin');
        }

        const parsedUser = JSON.parse(userString);

        return this.setState((prevState) => ({
            ...prevState,
            parsedUser,
            token
        }));

    }

    handleInputChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        this.setState({
            [name]: value
        });
    }

    createACall = () => {
        const currentState = this.state;
        request.post('/endpoints/call/send', currentState)
            .then((res) => {
                if (!res || !res.data) {
                    return NotificationManager.error('An unknown error occurred, please try again later.');
                }

                return NotificationManager.success('A call for blood has been sent successfully');
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

    render() {
        return (
            <div className='fill-page calls-back d-flex'>
                <div className='container mt-auto mb-auto'>
                    <div className='row'>
                        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                            <div className='card card-calls my-5'>
                                <div className='card-body'>
                                    <h5 className='card-title text-center'>Make A Call</h5>
                                    {(this.state.parsedUser && this.state.parsedUser.isHospital)
                                        ? <form
                                            className='form-calls'
                                            onSubmit={(event) => event.preventDefault()}>
                                            <div className='form-label-group'>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    name='title'
                                                    id='title'
                                                    placeholder='title'
                                                    value={this.state.title}
                                                    onChange={this.handleInputChange}
                                                    required />
                                                <label htmlFor='title'>title</label>
                                            </div>
                                            <div className='form-label-group'>
                                                <textarea
                                                    className='form-control round-field'
                                                    name='case'
                                                    id='case'
                                                    placeholder='case'
                                                    rows='15'
                                                    cols='75'
                                                    value={this.state.case}
                                                    onChange={this.handleInputChange}
                                                    required>
                                                </textarea>
                                            </div>
                                            <button type='button' className='btn btn-lg btn-danger btn-block text-uppercase' onClick={this.createACall}>MAKE THE CALL</button>
                                        </form>
                                        : <div>Just sit back and wait for emails from nearby hospitals</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Calls);
