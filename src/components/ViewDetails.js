import React from 'react'
import {Redirect,useHistory,useLocation } from 'react-router-dom';



class ViewDetails extends React.Component {

  constructor(props)
  {
   super();

   this.state = {
     individualUserData : [],
   }
  }


  async componentDidMount()
  {
    console.log(this.props.match.params.id)

    const response = await fetch(`/viewdetails/${this.props.match.params.id}`);
      if(response){
        const data = await response.json();
        if(data){
          this.setState({
           individualUserData : data
            
        });
        }
  }


  }

 


  render()
  {
    if(localStorage.getItem("token") === null)
    {
      return <Redirect to = "/" />
    }

    const {individualUserData} = this.state
    return(
      <div>
        <h1>Individual User Data!!</h1>
        
          <p>{individualUserData.name}</p>
          <p>{individualUserData.email}</p>
          <p>{individualUserData.phone}</p>
          <p>{individualUserData.address}</p>
          <p>{individualUserData.destination}</p>
          <p>{individualUserData.qualification}</p>
          <p>{individualUserData.percentage}</p>
          <p>{individualUserData.ielts}</p>
          <p>{individualUserData.listening}</p>

          <div>
              <p>{individualUserData.reading}</p>
              <p>{individualUserData.writing}</p>
              <p>{individualUserData.speaking}</p>
              <p>{individualUserData.overallband}</p>
          </div>
          
         
        
      </div>
    )
  }
}

export default ViewDetails;