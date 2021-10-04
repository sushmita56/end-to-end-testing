import userEvent from '@testing-library/user-event';
import React from 'react'
import {Redirect, useHistory } from 'react-router-dom';
import Select from 'react-select';

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
      selectedIeltsOption: "No",
      selectedDestinationOption: "AUSTRALIA",
      selectedQualificationOption:"+2",
      showOption: false
    };
 }


 handleDestinationChange = selectedDestinationOption => {
   
  this.setState({ selectedDestinationOption });
  console.log(selectedDestinationOption.value);
};

handleQualificationChange = selectedQualificationOption => {
   
  this.setState({ selectedQualificationOption });
  console.log(selectedQualificationOption.value);
};




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

    const { selectedIeltsOption, selectedDestinationOption , selectedQualificationOption } = this.state;
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


          


          <Select
            value={selectedQualificationOption}
            placeholder="+2"
            onChange={this.handleQualificationChange}
            options={qualificationOptions}
            isSearchable={false}
            
          />

          <Select
            value={selectedDestinationOption}
            isSearchable={false}
            placeholder="AUSTRALIA"
            onChange={this.handleDestinationChange}
            options={destinationOptions}
            
          />


         

          <Select
            value={selectedIeltsOption}
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
             <input type ="text" placeholder = "Listening" ></input>
             <input type ="text" placeholder = "Reading" ></input>
             <input type ="text" placeholder = "Writing" ></input>
             <input type ="text" placeholder = "Speaking" ></input>
             <input type ="text" placeholder = "Overall" ></input>

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