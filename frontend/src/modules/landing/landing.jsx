import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
const landing = () => (
    <div className='fill-page'>
        <div className='w-100 cfb-color-background cover-padding'>
            <div className='half-page text-center d-flex w-100 p-3 mx-auto flex-column'>
                <div className='mt-auto mb-auto w-75 align-self-center'>
                        <h1 className='cover-heading text-light'>Blood Donations Made Easy</h1>
                    <p className='lead cfb-color-primary'> Reach out to the hospitals that need you the most with a swipe! The call for blood app connects you with nearby hospitals with critical cases that need immediate transfusions in a blink. </p>
                    <p className='lead'>
                        <Link to='/signup' className='btn btn-lg btn-secondary'>Sign Up Now</Link>
                    </p>
                </div>
            </div>
        </div>
        <div className='container pt-5'>
            <div className='row'>
                <div className='col-xs-12 col-md-6 align-self-center'>
                    <h3>Simple, and Painless</h3>
                    <p className='text-justify'>All it takes is clicking on an email or tapping on a notifcation, and you are up to the races helping save lives.</p>
                    <h3>For everyone, hospitals included</h3>
                    <p className='text-justify'>As a hospital administrator, all you need to do is initiate a call for blood, bleed your case for donation, and leave everything else to us. We will get the people that can help to your door. </p>
                </div>
                <div className='col-xs-12 col-md-6 align-self-center'>
                    <img className='img-fluid' src='https://stanfordbloodcenter.org/wp-content/uploads/2017/03/Young-donor-on-phone-1.jpg' />
                </div>
            </div>
            <div className='row justify-content-center pt-5'>
                <div className='col-xs-12'>
                    <p className='lead'>
                        <Link to='/signup' className='btn btn-lg btn-secondary'>Join Us Now</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default landing;