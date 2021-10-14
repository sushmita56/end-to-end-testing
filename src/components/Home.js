import React, { useReducer, useState } from 'react'
import {Link, Redirect } from 'react-router-dom';
import '../cssfolder/home.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import { TablePagination } from '@mui/material';

class Home extends React.Component {
  constructor(props)
  {
    super(props)
    
    this.state = {
      allUser : [],
      DataisLoaded: false,
      page:0,
      rowsPerPage:5
     
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

  handleChangePage = (event, newPage) => {
    this.setState({
      page:newPage
    })
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage:[event.target.value],
      page:0
    })
    // setRowsPerPage(+event.target.value);
    // setPage(0);
  };
  
  
          render()
          {
          
            if(localStorage.getItem("token") === null)
            {
              return <Redirect to="/" />
            }

            const { allUser,page,rowsPerPage} = this.state;
            var i = 1; 
        
            
            return(
              // <div className = "container">
              
              // </div>
              <div className = "main">

                

                <div className = "container center-div">
                <div className = "settingSearch text-center">
                  <h1>Setting,search and New Registration</h1>
                </div>

                <div>

                <TableContainer className = "tableContainer" style={{height:500}}>
                  <Table >
                     <TableHead>
                     <TableRow className = "tableHeading">
                         <TableCell style = {{padding:"25px", color:"white"}}>S.N.</TableCell>
                         <TableCell style = {{padding:"25px", color:"white"}}>NAME</TableCell>
                         <TableCell style = {{padding:"25px", color:"white"}}>EMAIL</TableCell>
                         <TableCell style = {{padding:"25px", color:"white"}}>ADDRESS</TableCell>
                         <TableCell style = {{padding:"25px", color:"white"}}>PHONE</TableCell>
                         <TableCell style = {{padding:"25px", color:"white"}}></TableCell>
                         <TableCell style = {{padding:"25px", color:"white"}}></TableCell>
                         <TableCell style = {{padding:"25px", color:"white"}}></TableCell>
                     </TableRow>
                     </TableHead>
                     <TableBody>
                     {allUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                        <TableRow key={user.id} >
                        <TableCell style = {{padding:"22px"}} >{i++}</TableCell >
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

                <TablePagination
                 rowsPerPageOptions={[5, 10, 15]}
                 component="div"
                 count={allUser.length}
                 rowsPerPage={rowsPerPage}
                 page={page}
                 onPageChange={this.handleChangePage}
                 onRowsPerPageChange={this.handleChangeRowsPerPage}
               />
               
               </TableContainer>
                </div>
                   
               
                   
                </div>

              </div>
            )
          }
}

export default Home;