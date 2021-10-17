import React from 'react'
import {Redirect,useHistory } from 'react-router-dom';
import '../cssfolder/Login.css';
import LoginLogo from '../images/loginlogowaves.png'
import ReactModal from 'react-modal';
import SadEmoji from '../images/sad.png'


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
      


      showModal: false,
      errorMessage :"",
      loggedIn
     
    }
    this.loginHandler = this.loginHandler.bind(this);
  }

  async loginHandler(event)
  {
  
    event.preventDefault();




    // condition for validation
    const {username,password} = this.state
    sessionStorage.currentUsername = username

   

    if(username === "" && password === ""){
      this.setState({
        showModal:true,
        errorMessage:"Please Enter Your Login Credential !!"
      })
    }else if(username === ""){
      this.setState({
        showModal:true,
        errorMessage:"Username Required !!"
      })
    }else if(password === ""){
      this.setState({
        showModal:true,
        errorMessage:"Password Required !!"
      })
    }else{


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
      // console.log(JSON.stringify(data))
      if(data.status === 201){
        localStorage.setItem("token","mytoken");
        this.setState({
          loggedIn:true
        })
  
        this.props.history.push({
          pathname:"/home"});
      }
      else{

        this.setState({
          showModal:true,
          errorMessage:JSON.stringify(data.error)
        })

      }


     
    }
  

  }

  // closing the modal dialog

  handleCloseModal = () => {
      this.setState({
        showModal:false
      })
  }

  hideUsernameError = () =>{
    this.setState({
      showUserNameError:false
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
                          onClick = {this.hideUsernameError}
                    />
                    <br></br>

                    <input type = "password" 
                          name = "password"
                          value = {this.state.password}
                          onChange = {(event) => this.setState({password: event.target.value})}
                          className = "password"
                          placeholder = "Password"
                    />
                     
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
             <div className = "modaldiv text-center">
               <p>{this.state.errorMessage}</p>
               <img className = "sademoji"  src = {SadEmoji}></img>
              </div>
            
             </ReactModal>}

              

            </div> 

        </div>

      
    )
  }
}

export default Login;