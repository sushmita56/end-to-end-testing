import userEvent from '@testing-library/user-event';
import React from 'react'
import {Redirect, useHistory } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

const ieltsOptions = [
  { value: 'no', label: 'no' },
  { value: 'yes', label: 'yes' },
  
];

const destinationOptions = [
  { value: 'australia', label: 'australia' },
  { value: 'usa', label: 'usa' },
  { value: 'canada', label: 'canada' },
  { value: 'japan', label: 'japan' },
  
];

const qualificationOptions = [
  { value: '+2', label: '+2' },
  { value: 'bachelors', label: 'bachelors' },
  { value: 'masters', label: 'masters' },]
  ;



class UpdateUser extends React.Component {
  constructor(props)
  {
    super(props)
  
    this.state = {
      editDetails : [],  
      ielts:  { value: 'no', label: 'no' },
      destination:  { value: 'australia', label: 'australia' },
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
      prevIelts:"",
      prevDestination:"",
      prevQualification:""
    };
 }


 handleDestinationChange = destination => {
   
  this.setState({ destination});

};



handleQualificationChange = qualification => {
   
  this.setState({qualification});
};




 handleIeltsChange = ielts => {
   
  this.setState({  ielts });

  if(ielts.value === "yes")
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

handleDataEntry = async () => {
  // this.props.history.push("/home");
  // e.preventDefault();

//   when something change in the react select then it stores json array with value and label so we have to select value only not the json array string

var ielts,destination,qualification

    if(this.state.ielts !== this.state.prevIelts)
    {
        ielts = this.state.ielts.value
    }else{
        ielts = this.state.prevIelts
    }
    if(this.state.destination !== this.state.prevDestination){
        destination = this.state.destination.value
    }else{
        destination = this.state.prevDestination
    }

    if(this.state.qualification !== this.state.prevQualification){
        qualification = this.state.qualification.value
    }else{
        qualification = this.state.prevQualification
    }

    console.log(ielts + destination + qualification)

  

//   const ielts = this.state.ielts.value
//   const destination =  this.state.destination.value
//   const qualification = this.state.qualification.value

//   console.log(this.state.ielts.value)

  const {name,address,phone,email,percentage,listening,reading,writing,speaking,overallband} = this.state

  

    const res = await fetch(`/update/${this.props.match.params.id}`,{
      method:"POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({
        name:name,
        email:email,
        phone:phone,
        destination:destination,
        qualification :qualification,
        address:address,
        percentage:percentage,
        ielts:ielts,
        listening:listening,
        reading:reading,
        writing:writing,
        speaking:speaking,
        overallband:overallband
      })
    })

    const data = await res.json();
    if(data.status === 422 || !data)
    {
      window.alert("Failed");
      console.log("Update Successfull!!! ");
    }else{
      window.alert("Successfull !!!");
      this.props.history.push("/home");
      console.log("Update Successfull!!");
    }

   
}


async componentDidMount()
{

    // console.log(this.props.match.params.id)

    const response = await fetch(`/update/${this.props.match.params.id}`);
      if(response){
        const data = await response.json();
        if(data){
          this.setState({
           editDetails : data,  
        });
        }
        // console.log(UpdateUser)

    }
    console.log(this.state.editDetails.ielts)

    if(this.state.editDetails.ielts === "yes"){
        this.setState({
            showOption:true
        })
    }

    this.setState({
        name:this.state.editDetails.name,
        email:this.state.editDetails.email,
        phone:this.state.editDetails.phone,
        destination:this.state.editDetails.destination,
        prevDestination:this.state.editDetails.destination,
        qualification :this.state.editDetails.qualification,
        prevQualification :this.state.editDetails.qualification,

        address:this.state.editDetails.address,
        percentage:this.state.editDetails.percentage,
        ielts:this.state.editDetails.ielts,
        prevIelts:this.state.editDetails.ielts,
        listening:this.state.editDetails.listening,
        reading:this.state.editDetails.reading,
        writing:this.state.editDetails.writing,
        speaking:this.state.editDetails.speaking,
        overallband:this.state.editDetails.overallband
    })
     

}





  render()
  {

    
    if(localStorage.getItem("token") === null)
    {
      return <Redirect to="/" />
    }

    
    return(
      <div>

       
        <input type = "text" value = {this.state.name}  onChange={(e) => { this.setState({name: e.target.value})}}
          
           /> <br></br>

        <input type = "text" value = {this.state.address}  onChange={(e) => { this.setState({address: e.target.value})}}
                 
                  placeholder = "Enter your address" /> <br></br>

         <input type = "text" value = {this.state.phone} onChange={(e) => { this.setState({phone: e.target.value})}}
                  
                  placeholder = "Enter your Phone number" /> <br></br>
          
          <input type = "email" value = {this.state.email} onChange={(e) => { this.setState({email: e.target.value})}}
                 
                  placeholder = "Enter your emial" /> <br></br>

          <input type = "text" value = {this.state.percentage} onChange={(e) => { this.setState({percentage: e.target.value})}}
                 
                  placeholder = "Enter your Percentage" /> <br></br>

          <Select
            value={this.state.qualification}
            placeholder={this.state.editDetails.qualification}
            onChange={this.handleQualificationChange}
            options={qualificationOptions}
            isSearchable={false}
            
          />

          <Select
            value={this.state.destination}
            isSearchable={false}
            placeholder={this.state.editDetails.destination}
            onChange={this.handleDestinationChange}
            options={destinationOptions}
            
          />

          <Select
            value={this.state.ielts}
            placeholder={this.state.editDetails.ielts}
            onChange={this.handleIeltsChange}
            options={ieltsOptions}
            isSearchable={false}
            
          />

          {/* invisible div when option yes is clicked!! */}

          <div>
          {this.state.showOption &&
           <div>
             <p>Please enter your ielts score</p>
             <input type ="text" value = {this.state.listening} placeholder = "Listening" onChange={(e) => { this.setState({listening: e.target.value})}} ></input>
             <input type ="text" value = {this.state.reading} placeholder = "Reading" onChange={(e) => { this.setState({reading: e.target.value})}} ></input>
             <input type ="text" value = {this.state.writing} placeholder = "Writing" onChange={(e) => { this.setState({writing: e.target.value})}} ></input>
             <input type ="text" value = {this.state.speaking} placeholder = "Speaking" onChange={(e) => { this.setState({speaking: e.target.value})}} ></input>
             <input type ="text" value = {this.state.overallband} placeholder = "Overall" onChange={(e) => { this.setState({overallband: e.target.value})}} ></input>

           </div>
            
          }
          </div>

          <button onClick = {this.handleDataEntry}>Save</button>
        <button onClick ={() => this.handleCancel()} >Back</button>
     

        
      </div>
    )
  }

}

export default UpdateUser;