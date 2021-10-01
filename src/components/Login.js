import React from 'react'
import { Link } from 'react-router-dom';

class Login extends React.Component {


  render()
  {
    return(
      <div>
        <form>
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