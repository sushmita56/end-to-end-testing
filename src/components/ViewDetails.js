import { fontWeight } from '@mui/system';
import React from 'react'
import {Redirect,useHistory,useLocation } from 'react-router-dom';
import '../cssfolder/viewDetails.css'



class ViewDetails extends React.Component {

  constructor(props)
  {
   super();

   this.state = {
     individualUserData : [],
     showIeltsScore:false,
     topMargin:"55%",
   }
   this.HEROKUURL = "https://wave-entry-server.herokuapp.com"
    this.HOMEURL = "http://localhost:5000/"
  }


  async componentDidMount()
  {
    console.log(this.props.match.params.id)

    const response = await fetch(`${this.HEROKUURL}/viewdetails/${this.props.match.params.id}`);
      if(response){
        const data = await response.json();
        if(data){
          this.setState({
           individualUserData : data
        });
        }

        if(this.state.individualUserData.ielts === "yes"){
          this.setState({
            showIeltsScore:true,
            topMargin:"45%"
         });
        }
  }
}

handleGoBack = () => {
  this.props.history.push("/home");
}

 


  render()
  {
    if(localStorage.getItem("token") === null)
    {
      return <Redirect to = "/" />
    }

    const {individualUserData, topMargin} = this.state
    return(
     
          <div className =  "detail-center-div" style = {{top:topMargin}}> 

              <div className = "container header-div text-center">
                  <h1 className = "heading">Individual Details</h1>
              </div>
              <div className = "details-div">

                  {/* <div class=" info-details "> */}

                    <div className ="row ">

                      <div className  ="col-6 text-center">
                          <p style = {{fontWeight:"bold",color:"#2c2c2c",textIndent:"9em"}}>NAME:</p> 
                      </div>
                      <div className  ="col-6 text-left">
                         <p style = {{textIndent:"4em"}}> {individualUserData.name}</p>
                      </div>

                    </div>

                    <div className ="row ">

                        <div className  ="col-6 text-center">
                            <p style = {{fontWeight:"bold",color:"#2c2c2c",textIndent:"9em"}}>EMAIL:</p> 
                        </div>
                        <div className  ="col-6 text-left">
                          <p style = {{textIndent:"4em"}}> {individualUserData.email}</p>
                        </div>

                      </div>

                      <div className ="row ">

                        <div className  ="col-6 text-center">
                            <p style = {{fontWeight:"bold",color:"#2c2c2c",textIndent:"9em"}}>ADDRESS:</p> 
                        </div>
                        <div className  ="col-6 text-left">
                          <p style = {{textIndent:"4em"}}> {individualUserData.address}</p>
                        </div>

                      </div>

                      <div className ="row ">

                        <div className  ="col-6 text-center">
                            <p style = {{fontWeight:"bold",color:"#2c2c2c",textIndent:"9em"}}>PHONE:</p> 
                        </div>
                        <div className  ="col-6 text-left">
                          <p style = {{textIndent:"4em"}}> {individualUserData.phone}</p>
                        </div>

                        </div>

                        <div className ="row ">

                              <div className  ="col-6 text-center">
                                  <p style = {{fontWeight:"bold",color:"#2c2c2c",textIndent:"9em"}}>DESTINATION:</p> 
                              </div>
                              <div className  ="col-6 text-left">
                                <p style = {{textIndent:"4em"}}> {individualUserData.destination}</p>
                              </div>

                        </div>

                        <div className ="row ">

                          <div className  ="col-6 text-center">
                              <p style = {{fontWeight:"bold",color:"#2c2c2c",textIndent:"9em"}}>QUALIFICATION:</p> 
                          </div>
                          <div className  ="col-6 text-left">
                            <p style = {{textIndent:"4em"}}> {individualUserData.qualification}</p>
                          </div>

                          </div>
                          <div className ="row ">

                            <div className  ="col-6 text-center">
                                <p style = {{fontWeight:"bold",color:"#2c2c2c",textIndent:"9em"}}>PERCENTAGE/GPA:</p> 
                            </div>
                            <div className  ="col-6 text-left">
                              <p style = {{textIndent:"4em"}}> {individualUserData.percentage}</p>
                            </div>

                            </div>
                          <div className ="row ">

                          <div className  ="col-6 text-center">
                              <p style = {{fontWeight:"bold",color:"#2c2c2c",textIndent:"9em"}}>IELTS</p> 
                          </div>
                          <div className  ="col-6 text-left">
                            <p style = {{textIndent:"4em"}}> {individualUserData.ielts}</p>
                          </div>

                          </div>

                          {this.state.showIeltsScore &&
                            <div className = "text-center">

                                   <p style = {{fontWeight:"bold",color:"#0000FF" }}><u>IELTS SCORE:</u></p>
                                   <div className = "row">

                                      <div className = "col-3">
                                        <p><span style = {{fontWeight:"bold",color:"#2c2c2c"}}>LISTENING&nbsp;:&nbsp;</span>{individualUserData.listening}</p>
                                      </div>
                                      <div className = "col-3">
                                        <p><span style = {{fontWeight:"bold",color:"#2c2c2c"}}>READING&nbsp;:&nbsp;</span>{individualUserData.reading}</p>
                                      </div>
                                      <div className = "col-3">
                                        <p><span style = {{fontWeight:"bold",color:"#2c2c2c"}}>WRITING&nbsp;:&nbsp;</span>{individualUserData.writing}</p>
                                      </div>
                                      <div className = "col-3">
                                        <p><span style = {{fontWeight:"bold",color:"#2c2c2c"}}>SPEAKING&nbsp;:&nbsp;</span>{individualUserData.speaking}</p>
                                      </div>

                                   </div>

                                   <p><span style = {{fontWeight:"bold",color:"#00A36C"}}>OVERALL BAND  &nbsp;:&nbsp;</span>{individualUserData.overallband}</p>


                            </div>
                          }
                          
                          <div className = "text-center">
                          <button className = "goBackButton" onClick = {this.handleGoBack}>Go Back</button>

                          </div>

                  </div>

                 
                 

              {/* </div> */}


          </div>
        
  
    )
  }
}

export default ViewDetails;