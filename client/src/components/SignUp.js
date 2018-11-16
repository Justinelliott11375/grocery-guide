import React, { Component } from 'react';
import axios from 'axios';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUser: null,
      currentUserId: null,
      userIntervalIsSet: false,
      userToDelete: null,
      userToUpdate: null,
      userObjectToUpdate: null,
    }
    this.handleSignUp = this.handleSignUp.bind(this);
    this.userIdGenerator = this.userIdGenerator.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    if (!this.state.userIntervalIsSet) {
      let interval = setInterval(this.getUsers, 1000);
      this.setState({ userIntervalIsSet: interval });
    }
  }

  userIdGenerator() {
    var u='',i=0;
    while(i++<36) {
      var c='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i-1],r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
      u+=(c=='-'||c=='4')?c:v.toString(16)
    }
    return u;
  }
  

  // clean-up before component is removed from DOM
  componentWillUnmount() {
    if (this.state.itemIntervalIsSet) {
      clearInterval(this.state.itemIntervalIsSet);
      this.setState({ userIntervalIsSet: null });
    }
  }

   // fetch Users from database and set state with json response
   getUsers = () => {
    fetch("/api/getAllUsers")
    
      .then(users => users.json())
      .then(res => this.setState({ users: res.users }));
  };
  handleSignUp = (event) => {
    console.log("signUp called");
    event.preventDefault();
    let newUserId =  this.userIdGenerator();
    console.log(newUserId);
    axios.post("/api/userSignUp", {
      id: newUserId,
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
      passwordConfirmation: event.target.elements.passwordConfirmation.value
    });
    this.setState({currentUserId: newUserId }, () => console.log("activeUser:", this.state.currentUserId));
  }

  render() {
    return (
      <section>
        <h3>This is the sign up page!</h3>
        <form onSubmit={this.handleSignUp}>
          <label>
            Userame:
            <input type="text" name="username" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <label>
            Confrim password:
            <input type="password" name="passwordConfirmation" />
          </label>
            <input type="submit" value="Submit"/>
        </form>
      </section>
    )
  }
}
export default SignUp;