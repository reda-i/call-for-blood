import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './modules/auth/signup/signup';
import Landing from './modules/landing/landing';
import Aux from './modules/shared/auxiliary';
class App extends Component {
  state = {};

  // the other pages are to be added later
  render() {
    return (
      <Aux>
        <header className='cfb-color-primary cfb-color-background container-fluid pb-5'>
          <div className='row justify-content-between'>
            <div className='pl-3'>
              <h3>CFB | Call For Blood</h3>
            </div>
            <div className='col-xs-2 pr-3'>
              <nav className='nav ml-auto'>
                <a className='nav-link'>Login</a>
              </nav>
            </div>
          </div>
        </header>
        <div className='fill-page pad-header'>
          <Router>
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/signup' component={SignUp} />
            </Switch>
          </Router>
        </div>
        <footer className='mastfoot mt-auto'>
          <div className='inner'>
            <p>Cover template for <a href='https://getbootstrap.com/'>Bootstrap</a>, by <a href='https://twitter.com/mdo'>@mdo</a>.</p>
          </div>
        </footer>
      </Aux>
    );
  }
}

export default App;
