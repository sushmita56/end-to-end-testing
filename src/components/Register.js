import React from 'react'
import {Redirect, useHistory } from 'react-router-dom';


class Register extends React.Component {
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

  //required function

  handleCancel = (e) => {
    
    this.props.history.push("/home");
    
  }

  handleDataEntry = (e) => {
    this.props.history.push("/home");
  }



  render()
  {

    if(this.state.loggedIn === false)
    {
      return <Redirect to="/" />
    }
    return(
      <div>
        Register Page <br></br>
        <button onClick ={() => this.handleDataEntry()} >Done</button>
        <button onClick ={() => this.handleCancel()} >Cancel</button>
       
      </div>
    )
  }
}

export default Register;