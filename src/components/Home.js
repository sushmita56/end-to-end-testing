import React from 'react'
import {Redirect, useHistory } from 'react-router-dom';

class Home extends React.Component {
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
      loggedIn
    }

  }


  handleLogout = (e) => {
    localStorage.removeItem("token");
    this.props.history.push("/");
    
  }

  handleRegister = (e) => {
    this.props.history.push("/register");
  }

  
render()
  {
    if(this.state.loggedIn === false)
    {
      return <Redirect to="/" />
    }
    return(
      <div>
        Home Page <br></br>
        <button onClick ={() => this.handleLogout()} >Logout</button>
        <button onClick ={() => this.handleRegister()} >Registration</button>
        


      
      </div>
    )
  }
}

export default Home;