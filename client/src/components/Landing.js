import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <BrowserRouter>
      <section>
        <h3>Welcome to Grocery Guide!</h3>
        <Link to='/SignUp'>Sign Up</Link>
        <Link to='/SignIn'>Sign In</Link>
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
      </section>
      
      </BrowserRouter>
      
    )
  }
}

export default Landing;
