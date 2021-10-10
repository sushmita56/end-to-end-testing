import React, { Component } from "react";
import {Redirect, useHistory } from 'react-router-dom';


class Setting extends Component{
    constructor(){
        super()
    }

    render(){

        if(localStorage.getItem("token") === null)
            {
            return <Redirect to="/" />
            }

        return(
            <div>
                <p>This is a Admin setting page!!</p>
            </div>
        )
    }
    
}

export default Setting;