import React, { Component } from 'react';

class ThirdPage extends Component {
  state = {
    stylePath: 'logcss.css'
  };

  constructor(props) {
    super(props);
    this.state = { stylePath: 'logcss.css' };
  }

  saySomething(something) {
    console.log(something);
}

  componentDidMount() {

    this.saySomething('component did mount');
}

  render() {

    return (
        <div>
            <h1> HI</h1>
        </div>
    );
  }
}
export default ThirdPage;