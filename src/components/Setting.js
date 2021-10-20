import React, { Component } from "react";
import {Redirect, useHistory } from 'react-router-dom';
import '../cssfolder/setting.css'


class Setting extends Component{
    constructor(){
        super()

        this.state = {
            user_id : "",
            newUsername: "",    
            newPassword :"",
            confirmPassword :""
        }
    }

    componentDidMount()
    {
        // console.log(this.props.location.state.detail)
        this.setState({
            newUsername: sessionStorage.getItem("currentUsername")
        })
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
            <div className = "setting-main-div">

                    

                        <div className = "setting-info-div">
                        <div className = "setting-heading-div text-center">
                        <h2 className = "setting-heading">Change Your Credential</h2>
                    </div>
                        <form onSubmit={(event) => this.changeSetting()} >
                            <div className = "info-div">
                                <lable>
                                    User ID: <span style={{ color: "red" }}>*</span>
                                </lable>{" "}
                                <br></br>
                                <input type = "text"
                                        name = "user_id"
                                        value = {this.state.user_id}
                                        onChange = {(event) => this.setState({user_id: event.target.value})}
                                        placeholder = "user id"
                                        className = "setting-input"
                                />
                            </div>

                            <div className = "info-div">
                                <lable>
                                    Username: <span style={{ color: "red" }}></span>
                                </lable>{" "}
                                <br></br>
                                <input type = "text"
                                        name = "newusername"
                                        value = {this.state.newUsername}
                                        onChange = {(event) => this.setState({newUsername: event.target.value})}
                                        placeholder = "new username"
                                        className = "setting-input"

                                />
                               
                            </div>

                            <div className = "info-div">
                                <lable>
                                    New Password: <span style={{ color: "red" }}>*</span>
                                </lable>{" "}
                                <br></br>
                                <input type = "password" 
                                        name = "newpassword"
                                        value = {this.state.newPassword}
                                        onChange = {(event) => this.setState({newPassword: event.target.value})}
                                        placeholder = "new password"
                                        className = "setting-input"

                                />
                               
                            </div>

                            <div className = "info-div">
                                <lable>
                                    Confirm New Password: <span style={{ color: "red" }}>*</span>
                                </lable>{" "}
                                <br></br>
                                <input type = "password" 
                                        name = "confirmpassword"
                                        value = {this.state.confirmPassword}
                                        onChange = {(event) => this.setState({confirmPassword: event.target.value})}
                                        placeholder = "confirm password"
                                        className = "setting-input"

                                />
                            </div>
                            <button className = "backSetting" onClick = {() => this.handleCancel()} >Back</button>

                            <input className = "changeSetting" type = "submit" value = "Change"  onClick = {e => this.changeSetting(e)} />
                            </form>
                        </div>

                   

            </div>
                /* <form onSubmit={(event) => this.changeSetting()} >

               <br></br>
        
         <br></br>

         
          <br></br>
            <br></br>
          <input type = "submit" value = "Change"  onClick = {e => this.changeSetting(e)} />
          <button onClick = {() => this.handleCancel()} >Cancel</button>
        
        </form> */
           
        )
    }
    
}

export default Setting;