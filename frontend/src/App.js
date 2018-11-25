import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FirstPage from './components/firstpage';
import SignUp from './components/signup/signup';
import SecondPage from './components/secondpage';
import ThirdPage from './components/thirdpage';

class App extends Component {
  state = {};

  // the other pages are to be added later
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={FirstPage} />
          <Route path='/join' component={SignUp} />
          <Route path='/products' component={ThirdPage} />
          <Route path='/about' component={SecondPage} />
        </div>
      </Router>
    );
  }
}

export default App;
