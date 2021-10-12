import React from 'react'
import {Redirect } from 'react-router-dom';
import '../cssfolder/Login.css';
import LoginLogo from '../images/loginlogowaves.png'
import ReactModal from 'react-modal';

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
      usernameError:"",
      passwordError:"",
      showModal: false,
      loggedIn
     
    }
    this.loginHandler = this.loginHandler.bind(this);
  }

  async loginHandler(event)
  {
  
    event.preventDefault();

    // condition for validation

    

    const {username,password} = this.state

    if(username === "" && password === ""){
      this.setState({
        showModal:true
      })
    }

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

  }

  // closing the modal dialog

  handleCloseModal = () => {
      this.setState({
        showModal:false
      })
  }


  render()
  {
    if(this.state.loggedIn)
    {
      return <Redirect to = "/home" />
    }
    return(
     
        <div className = "primary">
           
            <div className = "text-center">
              <img className = "loginlogo" src ={LoginLogo} />

            </div>

            {/* form section div */}

           

            <div className = "formdiv text-center">

                  <form onSubmit={() => this.loginHandler} >
                  
                    <input type = "text"
                          name = "usename"
                          value = {this.state.username}
                          onChange = {(event) => this.setState({username: event.target.value})}
                          className = "username"
                          placeholder = "Username"
                    />
                    {this.state.usernameError}
                    <br></br>

                    <input type = "password" 
                          name = "password"
                          value = {this.state.password}
                          onChange = {(event) => this.setState({password: event.target.value})}
                          className = "password"
                          placeholder = "Password"
                    />
                     {this.state.passwordError}
                    <br></br>
                  



                    <input type = "submit" value = "LOGIN"  onClick = {e => this.loginHandler(e)} className = "submitbutton" />
              
              </form>


              {/* modal dialog */
              
              <ReactModal 
              isOpen={this.state.showModal}
              contentLabel="Minimal Modal Example"
              className="Modal"
              overlayClassName="Overlay"
              onRequestClose={this.handleCloseModal}
           >
             <div>Hello This is a modal at the center</div>
            
             </ReactModal>}

              

            </div> 

        </div>

      
    )
  }
}

export default Login;