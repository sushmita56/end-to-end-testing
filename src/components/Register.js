import userEvent from '@testing-library/user-event';
import React from 'react'
import {Redirect, useHistory } from 'react-router-dom';
import Select from 'react-select';

const ieltsOptions = [
  { value: 'No', label: 'No' },
  { value: 'Yes', label: 'Yes' },
  
];



class Register extends React.Component {
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
      loggedIn,
      
    }
    this.state = {
      selectedIeltsOption: "No",
      showOption: false
    };


  
 }


 handleIeltsChange = selectedIeltsOption => {
   
  this.setState({ selectedIeltsOption });

  if(selectedIeltsOption.value === "Yes")
  {
    this.setState({
      showOption:true
    })
  }else{
    this.setState({
      showOption:false
    })
  }

  
   


  console.log(selectedIeltsOption.value);
};

//required function

handleCancel = (e) => {
  
  this.props.history.push("/home");
  
}

handleDataEntry = (e) => {
  this.props.history.push("/home");
}





  render()
  {

    if(this.state.loggedIn === false)
    {
      return <Redirect to="/" />
    }

    const { selectedIeltsOption } = this.state;
    return(
      <div>
        
        <input type = "text" name = "name" id = "name" autoComplete="off" 
          
          placeholder = "Enter your name" /> <br></br>

        <input type = "text" name = "address" id = "address" autoComplete="off" 
                 
                  placeholder = "Enter your address" /> <br></br>

         <input type = "text" name = "phone" id = "phone" autoComplete="off" 
                  
                  placeholder = "Enter your Phone number" /> <br></br>
          
          <input type = "email" name = "email" id = "email" autoComplete="off" 
                 
                  placeholder = "Enter your emial" /> <br></br>

          <input type = "text" name = "percentage" id = "percentage" autoComplete="off" 
                 
                  placeholder = "Enter your emial" /> <br></br>


          <select id="destination">
            <option value="AUSTRALIA">AUSTRALIA</option>
            <option value="USA">USA</option>
            <option value="CANADA">CANADA</option>
            <option value="JAPAN">JAPAN</option>
          </select> <br></br>

          <select id="qualification">
            <option value="+2">+2</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select> <br></br>

          <Select
            value={selectedIeltsOption}
            onChange={this.handleIeltsChange}
            options={ieltsOptions}
          />

          {/* invisible div when option yes is clicked!! */}

          <div>
          {this.state.showOption &&
            <label>visibility is working!!!</label>
          }
          </div>
          

          

        <button onClick ={() => this.handleDataEntry()} >Done</button>
        <button onClick ={() => this.handleCancel()} >Cancel</button>
       
      </div>
    )
  }
}

export default Register;