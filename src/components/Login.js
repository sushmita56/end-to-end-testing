import React from 'react'
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render()
  {
    return(
      <div>
      <Link to="/">Login</Link>
      <Link to="/home">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/">Logout</Link>
    </div>
    )
  }
}

export default Login;