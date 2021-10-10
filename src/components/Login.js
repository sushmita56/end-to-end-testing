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

  async loginHandler(event)
  {
  
    event.preventDefault();

    const {username,password} = this.state

    const res = await fetch("/",{
      method:"POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({
        username:username,
        password:password,
       
      })
    })

    const data = await res.json();
    console.log(data)

    if(username === data.username && password === data.password){

      localStorage.setItem("token","mytoken");
      this.setState({
        loggedIn:true
      })

      this.props.history.push("/home");

    }

    

    // if(username === this.state.username && password === this.state.password)
    // {
   
    // }
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