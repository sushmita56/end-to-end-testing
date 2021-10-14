import React, { useReducer, useState } from 'react'
import {Link, Redirect } from 'react-router-dom';
import '../cssfolder/home.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { makeStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { borderRadius, minWidth } from '@mui/system';
import { green } from '@mui/material/colors';

class Home extends React.Component {
  constructor(props)
  {
    super(props)
    
    this.state = {
      allUser : [],
      DataisLoaded: false,
     
    }
  
  }

 async componentDidMount(){

  // this.getPlayerData();

  const response = await fetch("/home");
  if(response){
    const data = await response.json();
    if(data){
      this.setState({
        allUser: data,
        DataisLoaded: true,
        
    });
    }
   }
  }


  handleAdminUpdate = () => {

    this.props.history.push("/setting");

  }


  handleLogout = (e) => {
    localStorage.removeItem("token");
    this.props.history.push("/");
    
  }

  handleRegister = (e) => {
    this.props.history.push("/register");
  }

  handleDelete = async (user_id) =>{
    window.alert(user_id + "data has been deleted from database!!") 

    try {

     await fetch(`delete/${user_id}`);

      
    } catch (error) {

      console.log(error)
      
    }


  } 
  
          render()
          {
          
            if(localStorage.getItem("token") === null)
            {
              return <Redirect to="/" />
            }

            const { allUser,column} = this.state;
            var i = 1; 
        
            
            return(
              <div className = "container">
                   <TableContainer component={Paper} className = "tableContainer">
                <Table>
                    <TableHead>
                    <TableRow style = {{backgroundColor:"red"}}>
                        <TableCell >S.N.</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >Address</TableCell>
                        <TableCell >Phone</TableCell>
                        <TableCell ></TableCell>
                        <TableCell ></TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {allUser.map((user) => (
                        <TableRow key={user.name} >
                        <TableCell >{i++}</TableCell >
                        <TableCell >{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell><Link to = {`/viewdetails/${user._id}`}>Details</Link></TableCell> 
                        <TableCell><Link to = {`/update/${user._id}`}>Edit</Link></TableCell>
                        <TableCell><Link to ={`/`} onClick = {() => this.handleDelete(user._id)} >Delete</Link></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
              </div>
            )
          }
}

export default Home;