import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUser: null,
      userIntervalIsSet: false
    }
  }

  componentDidMount() {
    this.getUsers();
    if (!this.state.userIntervalIsSet) {
      let interval = setInterval(this.getUsers, 1000);
      this.setState({ userIntervalIsSet: interval });
    }
  }

  // clean-up before component is removed from DOM
  componentWillUnmount() {
    if (this.state.itemIntervalIsSet) {
      clearInterval(this.state.itemIntervalIsSet);
      this.setState({ itemIntervalIsSet: null });
    }
  }

   // fetch Users from database and set state with json response
   getUsers = () => {
    fetch("/api/getAllUsers")
    
      .then(users => users.json())
      .then(res => this.setState({ users: res.users }));
  };
  handleSignUp(event) {
    console.log("signUp called");
    event.preventDefault();
    //let currentIds = this.state.users.map(user => //user.id);
    let newUserId = 1;
    //while (currentIds.includes(newUserId)) {
      //++newUserId;
    //}
    console.log(event.target.elements.username.value);
    axios.post("/api/userSignUp", {
      id: newUserId,
      username: event.target.elements.username.value,
      password: event.target.elements.password.value
    });
  }

  render() {
    return (
      <section>
        <h3>This is the sign in page!</h3>
        <form onSubmit={this.handleSignUp}>
          <label>
            Userame:
            <input type="text" name="username" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
            <input type="submit" value="Log in"/>
        </form>
      </section>
    )
  }
}
export default SignIn;