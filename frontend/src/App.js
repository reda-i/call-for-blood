import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import SignIn from './modules/auth/signin/signin';
import SignUp from './modules/auth/signup/signup';
import Calls from './modules/calls/calls';
import Landing from './modules/landing/landing';
import Aux from './modules/shared/auxiliary';
import request from './modules/shared/request';

import 'react-notifications/lib/notifications.css';

class App extends Component {
  state = {
    isLoggedIn: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const token = localStorage.getItem('cfb_token');
      if (token) {
        // eslint-disable-next-line dot-notation
        request.defaults.headers.common['authorization'] = token;
        this.setState({ isLoggedIn: true });
      }
    }
  }

  // the other pages are to be added later
  render() {
    return (
      <Aux>
        <header className='cfb-color-primary cfb-color-background container-fluid'>
          <div className='row justify-content-between'>
            <div className='pl-3'>
              <h3>CFB | Call For Blood</h3>
            </div>
            <div className='col-xs-2 pr-3'>
              <nav className='nav ml-auto'>
                {!this.state.isLoggedIn
                  ? <Aux>
                    <Link to='/signin' className='nav-link'>SignIn</Link>
                    <Link to='/signup' className='nav-link'>SignUp</Link>
                  </Aux>
                  : <Link to='/calls' className='nav-link'>My Calls</Link>
                }

              </nav>
            </div>
          </div>
        </header>
        <div className='fill-page pad-header'>
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/calls' component={Calls} />
          </Switch>
        </div>
        <footer className='mastfoot mt-auto'>
          <div className='inner'></div>
        </footer>
        <NotificationContainer />
      </Aux>

    );
  }
}

export default withRouter(App);
