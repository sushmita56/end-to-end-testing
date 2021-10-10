import React, { Component } from "react";
import {Redirect, useHistory } from 'react-router-dom';


class Setting extends Component{
    constructor(){
        super()

        this.state = {
            user_id : "",
            newUsername:"",
            newPassword :"",
            confirmPassword :""
        }
    }

    handleCancel = () =>{
       
            this.props.history.push("/home");
        
        
    }

    changeSetting =() =>{
        // change setting button handler
        
    }

    render(){

        if(localStorage.getItem("token") === null)
            {
            return <Redirect to="/" />
            }

        return(
            <div>
                <form onSubmit={(event) => this.loginHandler} >

                <input type = "text"
                 name = "user_id"
                 value = {this.state.user_id}
                 onChange = {(event) => this.setState({user_id: event.target.value})}
                 placeholder = "user id"
           /><br></br>
        
          <input type = "text"
                 name = "newusername"
                 value = {this.state.newUsername}
                 onChange = {(event) => this.setState({newUsername: event.target.value})}
                 placeholder = "new username"
           /><br></br>

         
          <input type = "password" 
                 name = "newpassword"
                 value = {this.state.newPassword}
                 onChange = {(event) => this.setState({newPassword: event.target.value})}
                 placeholder = "new password"
           /><br></br>
            <input type = "password" 
                 name = "confirmpassword"
                 value = {this.state.confirmPassword}
                 onChange = {(event) => this.setState({confirmPassword: event.target.value})}
                 placeholder = "confirm password"
           /><br></br>
          <input type = "submit" value = "Change"  onClick = {e => this.changeSetting(e)} />
          <button onClick = {() => this.handleCancel()} >Cancel</button>
        
        </form>
            </div>
        )
    }
    
}

export default Setting;