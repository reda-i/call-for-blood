import React, { Component } from 'react';
import styles from './signup.module.css';
class SignUp extends Component {

  render() {
    return (
      <div>
          <div id='wrapper' className={styles.normal}>
          <div className='login front'>
              <h1>Welcome</h1>
              <div className={styles['input-wrapper']}>
                  <i className='fa fa-envelope' aria-hidden='true'></i>
                  <input type='email' placeholder='Email'></input>
              </div>
             <div className='input-wrapper'>
                 <i className='fa fa-lock' aria-hidden='true'></i>
                  <input type='password' placeholder='Password'></input>
              </div>
              <button type='submit'>Login</button>
              <div className='links'>
                  <button className='toggler'>{`Don't have and account?`}</button>
              </div>
          </div>
          <div className='register back'>
              <h1>Welcome</h1>
              <div className='input-wrapper'>
                  <i className='fa fa-envelope' aria-hidden='true'></i>
                  <input type='email' placeholder='Email'></input>
              </div>
              <div className='input-wrapper'>
                  <i className='fa fa-user' aria-hidden='true'></i>
                  <input type='text' placeholder='Full name'></input>
              </div>
              <div className='input-wrapper'>
                 <i className='fa fa-lock' aria-hidden='true'></i>
                  <input type='password' placeholder='Password'></input>
              </div>
              <div className='input-wrapper'>
                 <i className='fa fa-lock' aria-hidden='true'></i>
                  <input type='password' placeholder='Confirm password'></input>
              </div>

              <button type='submit'>Register</button>

              <div className='links'>
                  <button className='toggler'>Already Signed in ?</button>
              </div>
          </div>
      </div>
      </div>
    );
  }
}

export default SignUp;
