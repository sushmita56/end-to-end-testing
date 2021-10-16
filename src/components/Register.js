import userEvent from "@testing-library/user-event";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "../cssfolder/register.css";

const customStyles = {
  container: provided => ({
    ...provided,
    width: 300
  })
};

const ieltsOptions = [
  { value: "no", label: "no" },
  { value: "yes", label: "yes" },
];

const destinationOptions = [
  { value: "australia", label: "australia" },
  { value: "usa", label: "usa" },
  { value: "canada", label: "canada" },
  { value: "japan", label: "japan" },
];

const qualificationOptions = [
  { value: "+2", label: "+2" },
  { value: "bachelors", label: "bachelors" },
  { value: "masters", label: "masters" },
];
class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ielts: { value: "no", label: "no" },
      destination: { value: "australia", label: "australia" },
      qualification: { value: "+2", label: "+2" },
      showOption: false,
      name: "",
      address: "",
      phone: "",
      email: "",
      percentage: "",
      listening: "",
      reading: "",
      writing: "",
      speaking: "",
      overallband: "",
      margin :160
    };
  }

  handleDestinationChange = (destination) => {
    this.setState({ destination });
  };

  handleQualificationChange = (qualification) => {
    this.setState({ qualification });
  };

  handleIeltsChange = (ielts) => {
    this.setState({ ielts });

    if (ielts.value === "yes") {
      this.setState({
        showOption: true,
        margin:40
      });
    } else {
      this.setState({
        showOption: false,
        margin:160
      });
    }
  };

  //required function

  handleCancel = (e) => {
    this.props.history.push("/home");
  };

  handleDataEntry = async () => {
    // this.props.history.push("/home");
    // e.preventDefault();

    console.log(this.state.ielts.value);

    const ielts = this.state.ielts.value;
    const destination = this.state.destination.value;
    const qualification = this.state.qualification.value;

    const {
      name,
      address,
      phone,
      email,
      percentage,
      listening,
      reading,
      writing,
      speaking,
      overallband,
    } = this.state;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        destination: destination,
        qualification: qualification,
        address: address,
        percentage: percentage,
        ielts: ielts,
        listening: listening,
        reading: reading,
        writing: writing,
        speaking: speaking,
        overallband: overallband,
      }),
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Failed");
      console.log("Registration failed");
    } else {
      window.alert("Successfull !!!");
      this.props.history.push("/home");
      console.log("Registration successfull");
    }
  };

  render() {
    if (localStorage.getItem("token") === null) {
      return <Redirect to="/" />;
    }

    const { ielts, destination, qualification } = this.state;
    return (
      <div className="container main-register-div" style = {{marginTop:this.state.margin}}>
        <div className = "register-heading-div text-center">
          <h2 className = "register-heading">Register New Student</h2>
        </div>
        <div className="student-info-div">
          <div className="row">
            <div className="col-6" style = {{paddingLeft:"130px"}}>
              <lable>
                Name: <span style={{ color: "red" }}>*</span>
              </lable>{" "}
              <br></br>
              <input
                className="name-input"
                type="text"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
                placeholder=""
              />
            </div>

            <div className="col-6">
              <lable>
                Email: <span style={{ color: "red" }}>*</span>
              </lable>{" "}
              <br></br>
              <input
                className="name-input"
                type="text"
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                placeholder=""
              />
            </div>
          </div>

          <div className="row"  style = {{marginTop:"20px"}}>
            <div className="col-6" style = {{paddingLeft:"130px"}}>
              <lable>
                Address: <span style={{ color: "red" }}>*</span>
              </lable>{" "}
              <br></br>
              <input
                className="name-input"
                type="text"
                onChange={(e) => {
                  this.setState({address: e.target.value });
                }}
                placeholder=""
              />
            </div>

            <div className="col-6" >
              <lable>
                Phone:
                <span style={{ color: "red", textIndent: "2em" }}>*</span>
              </lable>
              <br></br>
              <input
                className="name-input"
                type="text"
                onChange={(e) => {
                  this.setState({ phone: e.target.value });
                }}
                placeholder=""
              />
            </div>
          </div>

          <div className="row"  style = {{marginTop:"20px"}}>
            <div className="col-6" style = {{paddingLeft:"130px"}}>
              <lable>
                Qualification: <span style={{ color: "red" }}>*</span>
              </lable>{" "}
              <br></br>
              <Select
                value={this.state.qualification}
                placeholder="+2"
                onChange={this.handleQualificationChange}
                options={qualificationOptions}
                isSearchable={false}
                styles = {customStyles}
              />
            </div>

            <div className="col-6" >
              <lable>
                Percentage / GPA:
                <span style={{ color: "red", textIndent: "2em" }}>*</span>
              </lable>
              <br></br>
              <input
                className="name-input"
                type="text"
                onChange={(e) => {
                  this.setState({ percentage: e.target.value });
                }}
                placeholder=""
              />
            </div>
          </div>

          <div className="row"  style = {{marginTop:"20px"}}>
            <div className="col-6" style = {{paddingLeft:"130px"}}>
              <lable>
                Destination: <span style={{ color: "red" }}>*</span>
              </lable>{" "}
              <br></br>
              <Select
            value={this.state.destination}
            isSearchable={false}
            placeholder="australia"
            onChange={this.handleDestinationChange}
            options={destinationOptions}
            styles = {customStyles}
            
          />
            </div>

            <div className="col-6" >
              <lable>
                IELTS:
                <span style={{ color: "red", textIndent: "2em" }}>*</span>
              </lable>
              <br></br>
              <Select
                  value={this.state.ielts}
                  placeholder="no"
                  onChange={this.handleIeltsChange}
                  options={ieltsOptions}
                  isSearchable={false}
                  styles = {customStyles}
                /> 
            </div>
          </div>

          

        </div>

        <div className = "ielts-score-div">
          {this.state.showOption &&
           <div className = "ielts-input-div">
             <p style = {{fontSize:"18px"}}>Please enter your ielts score</p>

              <div className = "row">

                <div className = "col-3">
                <lable>
                 Listening <span style={{ color: "red" }}>*</span>
              </lable>
                <input className="listening-input" type ="text"   onChange={(e) => { this.setState({reading: e.target.value})}} ></input><br></br>

                </div>
                <div className = "col-3">
                <lable>
                 Reading <span style={{ color: "red" }}>*</span>
              </lable>
                <input className="reading-input" type ="text"  onChange={(e) => { this.setState({writing: e.target.value})}} ></input><br></br>

                  </div>
                  <div className = "col-3">
                  <lable>
                 Writing <span style={{ color: "red" }}>*</span>
              </lable>
                  <input className="writing-input" type ="text"  onChange={(e) => { this.setState({speaking: e.target.value})}} ></input><br></br>

                  </div>
                  <div className = "col-3">
                  <lable>
                 Speaking <span style={{ color: "red" }}>*</span>
              </lable>
                  <input className="speaking-input" type ="text"  onChange={(e) => { this.setState({overallband: e.target.value})}} ></input><br></br>

                  </div>
      

              </div>

              <div className =  "row m-4">

                <div className = "col-12">
                <lable>
                 Overall Band <span style={{ color: "red" }}>*</span>
              </lable><br></br>
                  <input className = "overallband-input" type ="text"  onChange={(e) => { this.setState({overallband: e.target.value})}} ></input>
                </div> 
              </div>
           </div>
            
          }
          </div>

          <div className = "text-center">
           <button className = "cancelButton" onClick ={() => this.handleCancel()} >Cancel</button><button className = "register-Button" onClick = {this.handleDataEntry}>Register</button>
          </div>

      </div>
    );

 
  }
}

export default Register;
