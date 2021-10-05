import React from 'react'
import {Redirect } from 'react-router-dom';

class Home extends React.Component {
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
      loggedIn
    }
    this.state = {
      allUser : [],
      DataisLoaded: false
    }

  }

 async  componentDidMount(){

  const response = await fetch("/home");
  if(response){
    const data = await response.json();
    if(data){
      this.setState({
        allUser: data,
        DataisLoaded: true
    });
    }
  }


    // fetch(
    //   "/home")
    //               .then((res) => res.json())
    //               .then((json) => {
    //                   this.setState({
    //                       allUser: json,
    //                       DataisLoaded: true
    //                   });
    //       })
    
   

  }


  handleLogout = (e) => {
    localStorage.removeItem("token");
    this.props.history.push("/");
    
  }

  handleRegister = (e) => {
    this.props.history.push("/register");
  }

  
render()
  {
    if(this.state.loggedIn === false)
    {
      return <Redirect to="/" />
    }

    const { DataisLoaded, allUser, } = this.state;
    var i = 1; 
    if (!DataisLoaded) return <div>
            <h4> Pleses wait some time.... </h4> </div> ;

    return(
      <div>
        Home Page <br></br>

       




<div class="table-data">
<h2>Total  No of User!!</h2>
    <table border="1">
        <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>

            {
              allUser.map((user) => ( 
                <tr key = {user.id}>
                <td>{i}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                {i++}
                <td><a href="/users/details/">Details</a></td>
                <td><a href="/users/edit/">Edit</a></td>
                <td><a href="/users/delete/>">Delete</a></td>
                </tr>
                ))
            }
      
    </table>
    </div>
        <button onClick ={() => this.handleLogout()} >Logout</button>
        <button onClick ={() => this.handleRegister()} >Registration</button>
      </div>
    )
  }
}

export default Home;