import React, { useReducer, useState } from 'react'
import {Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap  from 'react-bootstrap'
import '../cssfolder/home.css'
import MTable from '../components/MTable'



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

  handleDetails(row) {
    window.alert(row._id)
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

              // <div>
              //   <div class="table-data">
              //   <h2>Total  No of User!!</h2>
              //       <table border="1">
              //           <tr>
              //               <th>S.N</th>
              //               <th>Name</th>
              //               <th>Email</th>
              //               <th>Address</th>
              //               <th>Details</th>
              //               <th>Edit</th>
              //               <th>Delete</th>
              //           </tr>

              //               {
              //                 allUser.map((user) => ( 
              //                   <tr key = {user.id}>
              //                   <td>{i++}</td>
              //                   <td>{user.name}</td>
              //                   <td>{user.email}</td>
              //                   <td>{user.address}</td>
                                
              //                   <td><Link to = {`/viewdetails/${user._id}`}>Details</Link></td>
              //                   <td><Link to = {`/update/${user._id}`}>Edit</Link></td>
              //                   <td><Link to ={`/`} onClick = {() => this.handleDelete(user._id)} >Delete</Link></td>
              //                   </tr>
              //                   ))
              //               }
                      
              //       </table>
              //       </div>
              //       <button onClick ={() => this.handleLogout()} >Logout</button>
              //       <button onClick ={() => this.handleRegister()} >Registration</button>
              //   <button onClick ={() => this.handleAdminUpdate()} >Setting</button>

              // </div>
              <div className = "container">
               <MTable />
              </div>
            )
          }
}

export default Home;