import React from 'react'
import {Redirect,useHistory,useLocation } from 'react-router-dom';



class ViewDetails extends React.Component {

  constructor(props)
  {
   super();
  }


   componentDidMount()
  {
       

  }

 


  render()
  {
    if(localStorage.getItem("token") === null)
    {
      return <Redirect to = "/" />
    }
    return(
      <div>
        <p>Individual Details</p>
      </div>
    )
  }
}

export default ViewDetails;