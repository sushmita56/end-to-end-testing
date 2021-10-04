import React from 'react'
import {Redirect } from 'react-router-dom';

class Login extends React.Component {

  constructor(props)
  {
    super(props)
    const token  = localStorage.getItem("token")
    let loggedIn = true;

    if(token === null)
    {
      loggedIn = false;
    }

    this.state = {
      username : "",
      password : "",
      loggedIn
     
    }
    this.loginHandler = this.loginHandler.bind(this);
  }

  loginHandler(event)
  {
  
    event.preventDefault();
    // console.log(this.state.username);
    // console.log(this.state.password);
    var username = "b";
    var password = "b";

    if(username === this.state.username && password === this.state.password)
    {
      localStorage.setItem("token","mytoken");
      this.setState({
        loggedIn:true
      })
    }
  }


  render()
  {
    if(this.state.loggedIn)
    {
      return <Redirect to = "/home" />
    }
    return(
      <div>
        <form onSubmit={(event) => this.loginHandler} >
          <label>Username:</label><br>
          </br>
          <input type = "text"
                 name = "usename"
                 value = {this.state.username}
                 onChange = {(event) => this.setState({username: event.target.value})}
           /><br></br>

          <label>Password:</label><br>
          </br>
          <input type = "password" 
                 name = "password"
                 value = {this.state.password}
                 onChange = {(event) => this.setState({password: event.target.value})}
           /><br></br>
          <input type = "submit" value = "Login"  onClick = {e => this.loginHandler(e)} />
        
        </form>
      </div>
    )
  }
}

export default Login;