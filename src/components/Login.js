import React from 'react'
import { Link } from 'react-router-dom';

class Login extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      username : "",
      password : ""
    }
  }

  login(e)
  {
    alert("submit function working!!")
  }


  render()
  {
    return(
      <div>
        <form onSubmit={this.login.bind(this)} >
          <label>Username:</label><br>
          </br>
          <input type = "text" name = "usename" /><br></br>

          <label>Password:</label><br>
          </br>
          <input type = "password" name = "password" /><br></br>
          <input type = "submit" value = "Login" />
        
        </form>
      </div>
    )
  }
}

export default Login;