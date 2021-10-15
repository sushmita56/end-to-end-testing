import React, { useReducer, useState } from 'react'
import {Link, Redirect } from 'react-router-dom';
import '../cssfolder/home.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import HomeLogo from '../images/homelogowaves.png'

class Home extends React.Component {
  constructor(props)
  {
    super(props)
    
    this.state = {
      allUser : [],
      DataisLoaded: false,
      page:0,
      rowsPerPage:7
     
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
        search:""
        
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

            const { allUser,page,rowsPerPage,search} = this.state;
            var i = 1; 
        
            
            return(
              // <div className = "container">
              
              // </div>
              <div className = "main">

                

                <div className = "container center-div">
                {/* <div className = "settingSearch text-center">
                  <input type = "text" placeholder = "Search..." onChange ={(e) => { this.setState({search: e.target.value})}}></input>
                  <button className = "registerButton" onClick = {this.handleRegister}>Registration</button>
                </div> */}

                {/* top section */}

                <div className = "container" style=  {{backgroundColor:""}}>

                <div class="row">
                  <div class="col-6">
                    <img className = "homeLogo" src = {HomeLogo}></img>
                  </div>
                  <div class="col-3 inputSearchDiv">
                  <input className = "searchInput" type = "text" placeholder = "Search..." onChange ={(e) => { this.setState({search: e.target.value})}} />
                  </div>
                  <div class="col-3">
                  <button className = "registerButton" onClick = {this.handleRegister}>New Registration</button>
                   
                  </div>
                </div>

                </div>



       

                <TableContainer className = "tableContainer" style={{height:550, marginTop:30}}>
                  <Table>
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
                     {allUser
                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                     .filter((val) => {
                       if(search === ""){
                         return val;
                       }else if(val.name.toLowerCase().includes(search.toLowerCase())){
                         return val;
                       }
                     })
                     .map((user) => (
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

            
               
               </TableContainer>
                

                {/* pagination section */}

                <div className = "pagination">
                  <div>
                      <TablePagination
                        rowsPerPageOptions={[7, 12, 15]}
                        component="div"
                        count={allUser.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                      />
                  </div>

               

                </div>

                   
               
                   
                </div>

              </div>
            )
          }
}

export default Home;