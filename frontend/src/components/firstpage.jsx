/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class FirstPage extends Component {
  state = {
    stylePath: 'css/page1.css'
  };

  render() {
    return (
      <section className='hero is-fullheight'>
        <link rel='stylesheet' type='text/css' href={this.state.stylePath} />
        <div className='hero-head'>
          <nav className='navbar' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
              <div className='navbar-item'>
                <img src='media/drop.png' />
                <p>C-F-B</p>
              </div>
              <a
                role='button'
                className='navbar-burger burger'
                aria-label='menu'
                aria-expanded='false'
                data-target='navbarBasicExample'
              >
                <span aria-hidden='true' />
                <span aria-hidden='true' />
                <span aria-hidden='true' />
              </a>
            </div>

            <div className='navbar-end'>
              <div className='navbar-item'>
                <div className='buttons'>
                  <a className='button'>
                    About
                  </a>
                  <a className='button is-light'>Contact Us</a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className='hero-body has-text-centered'>
          <div className='container header'>
            <img src='media/drop.png' />
            <h1 className='title'>Call For Blood</h1>
            <h2 className='subtitle'>A Product That Saves Lives</h2>
            <p>Register Now To Help Others</p>
            <div className='columns'>
              <div className='column' />
              <div className='column is-one-third'>
                <form>
                  <div className='field has-addons'>
                    <div className='control has-icons-left'>
                      <input
                        className='input is-expanded is-large'
                        type='email'
                        placeholder='Email Address'
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-envelope' />
                      </span>
                    </div>
                    <div className='control'>
                      <Link to='/join'>
                        <a className='button is-large is-danger '> Submit </a>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
              <div className='column' />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default FirstPage;
