import userEvent from '@testing-library/user-event';
import React from 'react'
import {Redirect, useHistory } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

const ieltsOptions = [
  { value: 'No', label: 'No' },
  { value: 'Yes', label: 'Yes' },
  
];

const destinationOptions = [
  { value: 'AUSTRALIA', label: 'AUSTRALIA' },
  { value: 'USA', label: 'USA' },
  { value: 'CANADA', label: 'CANADA' },
  { value: 'JAPAN', label: 'JAPAN' },
  
];

const qualificationOptions = [
  { value: '+2', label: '+2' },
  { value: 'Bachelors', label: 'Bachelors' },
  { value: 'Masters', label: 'Masters' },]
  ;



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
      ielts:  { value: 'No', label: 'No' },
      destination:  { value: 'AUSTRALIA', label: 'AUSTRALIA' },
      qualification:{ value: '+2', label: '+2' },
      showOption: false,
      name:"",
      address:"",
      phone:"",
      email:"",
      percentage:"",
      listening:"",
      reading:"",
      writing:"",
      speaking:"",
      overallband:"",
    };
 }


 handleDestinationChange = destination => {
   
  this.setState({ destination });
};

handleQualificationChange = qualification => {
   
  this.setState({ qualification });
};




 handleIeltsChange = ielts => {
   
  this.setState({ ielts });

  if(ielts.value === "Yes")
  {
    this.setState({
      showOption:true
    })
  }else{
    this.setState({
      showOption:false
    })
  }
};

//required function

handleCancel = (e) => {
  
  this.props.history.push("/home");
  
}

handleDataEntry = () => {
  // this.props.history.push("/home");
  const {name,address,ielts,destination,
    qualification,phone,email,percentage,listening,reading,writing,speaking,overallband} = this.state
    const data = {name,address,ielts,destination,
      qualification,phone,email,percentage,listening,reading,writing,speaking,overallband}
    
    fetch('/register',{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    }).then(() =>{
      console.log('new data added!!')
    })
   
   
    // this.props.history.push("/home");
}





  render()
  {

    if(this.state.loggedIn === false)
    {
      return <Redirect to="/" />
    }

    const { ielts, destination , qualification } = this.state;
    return(
      <div>
        
        <input type = "text"  onChange={(e) => { this.setState({name: e.target.value})}}
          
          placeholder = "Enter your name" /> <br></br>

        <input type = "text"  onChange={(e) => { this.setState({address: e.target.value})}}
                 
                  placeholder = "Enter your address" /> <br></br>

         <input type = "text" onChange={this.handleChange} onChange={(e) => { this.setState({phone: e.target.value})}}
                  
                  placeholder = "Enter your Phone number" /> <br></br>
          
          <input type = "email" onChange={this.handleChange} onChange={(e) => { this.setState({email: e.target.value})}}
                 
                  placeholder = "Enter your emial" /> <br></br>

          <input type = "text" onChange={this.handleChange} onChange={(e) => { this.setState({percentage: e.target.value})}}
                 
                  placeholder = "Enter your Percentage" /> <br></br>

          <Select
            value={qualification}
            placeholder="+2"
            onChange={this.handleQualificationChange}
            options={qualificationOptions}
            isSearchable={false}
            
          />

          <Select
            value={destination}
            isSearchable={false}
            placeholder="AUSTRALIA"
            onChange={this.handleDestinationChange}
            options={destinationOptions}
            
          />

          <Select
            value={ielts}
            placeholder="No"
            onChange={this.handleIeltsChange}
            options={ieltsOptions}
            isSearchable={false}
            
          />

          {/* invisible div when option yes is clicked!! */}

          <div>
          {this.state.showOption &&
           <div>
             <p>Please enter your ielts score</p>
             <input type ="text" placeholder = "Listening" onChange={(e) => { this.setState({listening: e.target.value})}} ></input>
             <input type ="text" placeholder = "Reading" onChange={(e) => { this.setState({reading: e.target.value})}} ></input>
             <input type ="text" placeholder = "Writing" onChange={(e) => { this.setState({writing: e.target.value})}} ></input>
             <input type ="text" placeholder = "Speaking" onChange={(e) => { this.setState({speaking: e.target.value})}} ></input>
             <input type ="text" placeholder = "Overall" onChange={(e) => { this.setState({overallband: e.target.value})}} ></input>

           </div>
            
          }
          </div>
          

        <button onClick ={() => this.handleDataEntry()} >Save</button>
        <button onClick ={() => this.handleCancel()} >Cancel</button>
      </div>
    )
  }
}

export default Register;