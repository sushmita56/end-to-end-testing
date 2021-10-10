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

    changeSetting = async (e) =>{
        // change setting button handler
        e.preventDefault()

        const{user_id,newUsername, newPassword} = this.state

        const res = await fetch("/changesetting",{
            method:"POST",
            headers:{
              'Content-Type' : 'application/json'
            },
            body:JSON.stringify({

                user_id:user_id,
                newUsername:newUsername,
                newPassword:newPassword
                
            })
          })

          const data = await res.json();

          if(!data){
            window.alert("Registration Failed!!!");

          }else{
            window.alert(JSON.stringify(data.response));
            this.props.history.push("/home");

          }
    }

    render(){

        if(localStorage.getItem("token") === null)
            {
            return <Redirect to="/" />
            }

        return(
            <div>
                <form onSubmit={(event) => this.changeSetting()} >

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