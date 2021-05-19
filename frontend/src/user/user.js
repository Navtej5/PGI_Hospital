
import React, {Component,useEffect} from "react";
import {Row} from "simple-flexbox";
import {Link} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import PatientDetails from "../patient/patientDetails";
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import { useLocation } from "react-router-dom";
import './user.css';
//import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router";
import {Button,Table,TableBody,TableCell,Grid,TextField,Typography} from '@material-ui/core';
import { token } from '../login/login.js';
const history = createBrowserHistory({forceRefresh:true});
// const location = useLocation(); 
// string myvar;
var myvar;

const readable = {
  "Filling":"In Progress",
  "Pending":"Pending Approval",
  "Approved":"Approved by Consultant",
  "SentToPharma":"Inventory Ordered and Waiting for delivery",
  "ReceivedFromPharma":"Inventory Received by Unit Manager (Audit Pending)",
  "ReceivedByNurse":"Inventory Received by Nurse (Verification Pending)",
  "Ready":"Read for Surgery/Operation",
  "Completed":"Completed",
};

const redirect_url = {
  "Filling":"/form/",
  "Pending":"/returned/",
  "Approved":"/returned/",
  "SentToPharma":"/returned/",
  "ReceivedFromPharma":"/returned/",
  "ReceivedByNurse":"/returned/",
  "Completed":"/returned/",
};

const headerleft = {
    flexGrow: "1",
    cursor:'pointer',
    fontSize: "22px",
    paddingLeft: "20px",
    color: "white",
};
const help = {
    float: "right",
    display:'flex',
    textTranform: "initial",
    margin: "0px 20px 0px 0px",
    fontFamily: "Roboto",
    fontSize: "22px",
    color: "white",
};
const headerDiv = {
    width: "100%",
    backgroundColor: "#205081",
    height: "45px",
    paddingTop: "5px",
    paddingBottom: "5px",
    alignItems: "center",
    top: 0,
    position: "fixed",
    zIndex: "100",

};
const TableViewContainer = styled.div`
  display: flex;
  margin-top: 70px;
  margin-left: 20px;
`;
const PatientContainer = styled.div`
  min-width: 49%;
  margin-right: 1%;
`;
const PatientRow = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
`;

const PatientHeading = styled.div`
  width: 100%;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 500;
  color: #222222;
`;
// const Button = styled.button`
//   width: 88px;
//   height: 30px;
//   color: #0052cc;
//   border-radius: 4px;
//   border: solid 1px #0052cc;
//   background-color: #ffffff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   &:focus {
//     outline: none;
//     border: solid 2px #0052cc;
//   }
//   font-family: Roboto;
//   font-size: 11px;
//   font-weight: normal;
//   // margin-bottom: 20px;
// `;
const HorizontalLine = styled.div`
  // margin-top: -10px;
  width: 100%;
  border-bottom: solid 1px #e8e8e8;
`;

const TableRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  cursor: pointer;
  padding-bottom: 3px;
`;

const ActionRequiredLabelData = styled.div`
  width: 75%;
  font-family: Roboto;
  font-size: 16x;
  font-weight: 400;
  color: #000;
`;

const HotPOContainer = styled.div`
  min-width: 49%;
  margin-left: 1%;
`;
//const history2 = useHistory();
export default class User extends Component{
  //let history2 = useHistory();
  constructor(props) {
    super(props);
    //le history2 = useHistory();
    this.logout = this.logout.bind(this);
  }
  state = {
      patients:[],
      selected_patient:"",
      requests:[],
      selected_request:"",
      patient_search:"",
      request_search:"",
    }
  // var history2 = useHistory();

  async componentDidMount() {
    let PATIENT_TABLE_API='http://127.0.0.1:8000/api/get-patient-table';
    // let PATIENT_TABLE_API='https://pgi-backend.herokuapp.com/api/get-patient-table';
    let REQUEST_TABLE_API='http://127.0.0.1:8000/api/view-request-table';
    const response=await fetch(PATIENT_TABLE_API);
    const data=await response.json();
    await this.setState({patients:data})
    await this.setState({selected_patient:data[0]})
    const req_response=await fetch(REQUEST_TABLE_API);
    const req_data=await req_response.json();
    await this.setState({requests:req_data})
    await this.setState({selected_request:req_data[0]})
    console.log("data",req_data)
    console.log("Patients",this.state.patients)
    // this.timer = setInterval(() => this.fetchUsers(), 5000);
}

logout=(async)=>{
  localStorage.clear();
  history.push("/");
//   console.log({token});
//   console.log(this.props.location.state.detail);
//   var x="Authorization: Token "+this.props.location.state.detail;
//   const requestOptions = {
//     method: 'POST',
//     body: x,
// };
//   let LOGOUT_API='http://127.0.0.1:8000/api/logout';
//   console.log(x);
//   const response=fetch(LOGOUT_API,requestOptions);
}

    render()
    {
      // useEffect(()=>{
      //   // getPatientList()
      // },[])    

      return(
        <div style={{ 
          height:"1000px",
          width:"100%",
          marginTop:"-20px",
          overflow:"auto",
          // backgroundImage: `url("https://wallpaperaccess.com/full/449895.jpg")`,
          backgroundColor:"#d9e6fa",
          backgroundRepeat: "no-repeat"
        }}>            
            <div style={{height:"20px"}}></div>
            {console.log("Receiveed:",this.props)}
            <Row style={headerDiv}>
                <div className="montserrat" 
                style={headerleft} 
                >
                PGIMER                   
                </div>                
                <span style={help}>
                    <button className="fs-16" style={{background:'none',border:'none',boxShadow:'none', textDecoration: "none", color: "white" }}>
                    Welcome!
                    </button>
                    <Button variant="contained" color="secondary" onClick={this.logout} >Logout</Button>
                 </span>                
                <span style={help}>
                  
              </span>
            </Row>
    {
    <TableViewContainer >
        <PatientContainer>
          <PatientRow>
            <h2 style={{marginLeft:"30%"}}>Patients</h2>{" "}
            <Link to={"/addpatient"} style={{textDecoration:"none",width:"50px",height:"50px",marginTop:"-750px",marginRight:"100px"}}>
            <div class="center">
            <div class="btn-1">
            <a href=""><span>+</span></a>
            </div>
            </div>
              </Link>
          </PatientRow>
          <HorizontalLine />
          <div>
            <HorizontalLine />
            <TextField id="filled-basic" label="Patient Name" variant="filled"
            onChange={(event)=>(this.setState({patient_search:event.target.value}))}
            />
            <Button
            style={{marginLeft:"400px",marginTop:"-43px"}}
            onClick={()=>{
              var list = this.state.patients;
              list.sort((a, b) => a.name.localeCompare(b.name))
              console.log("List:",list)
              this.setState({patients:list})
            }}
            >Sort</Button>
          </div>
          <div style={{maxHeight:"270px",height:"270px",maxWidth:"700px",overflowY:"auto",overflowX:"auto"}}>
          {
          this.state.patients?
          <>
          <ul>
          {
                this.state.patients.map((patient)=>(
                  patient.name.toLowerCase().includes(this.state.patient_search.toLowerCase())?
                  <>
                  <li>
                <HotPOContainer>
                  <TableRowContainer className="row"
                  style={{marginLeft:"10px"}}
                  onClick={()=>(
                    this.setState({selected_patient:patient})
                  )} 
                  >
                    <ActionRequiredLabelData>
                      &emsp;{patient.name} - {patient.bloodgroup}
                    </ActionRequiredLabelData>
                  </TableRowContainer>
                  </HotPOContainer>
                  </li>
                  </>
                  :
                  ""
                ))
          }
          </ul>
          </>
          :
          <>
          </>
          }
          </div>
        </PatientContainer>
        </TableViewContainer>
          }

      <div style={{marginLeft:"850px",marginTop:"-360px",width:"650px",height:"300px"}} class="container">
          <h2 style={{marginLeft:"-50px"}}>
            Patient Details
          </h2>
          <Table 
          // style={{marginTop:"150px",marginLeft:"400px",width:"650px"}}
          >
            <ul class="responsive-table">
                <TableBody>
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginLeft:"20px"}}>Name of Patient:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_patient==""?<></>:this.state.selected_patient.name}</TableCell>
                    </li>
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginLeft:"20px"}}>ward adhaar No.:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_patient==""?<></>:this.state.selected_patient.wardadhaar}</TableCell>
                    </li>
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginLeft:"20px"}}>Blood Group:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_patient==""?<></>:this.state.selected_patient.bloodgroup}</TableCell>
                    </li>
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginLeft:"20px"}}>Gender:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_patient==""?<></>:this.state.selected_patient.gender}</TableCell>
                    </li>
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginLeft:"20px"}}>Date Of Birth:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_patient==""?<></>:this.state.selected_patient.dob}</TableCell>
                    </li>
                </TableBody>
                </ul>
            </Table>
      </div>

      <TableViewContainer style={{marginTop:"30px"}}>
        <PatientContainer>
          <PatientRow>
            <h2 style={{marginLeft:"30%"}}>Requests</h2>{" "}
            <Link to={"/addrequest"} style={{textDecoration:"none",width:"50px",height:"50px",marginTop:"-750px",marginRight:"100px"}}>
              
            <div class="center">
            <div class="btn-1">
            <a href=""><span>+</span></a>
            </div>
            </div>
              
            </Link>
          </PatientRow>
          <HorizontalLine style={{width:"650px"}}/>
          <div>
            <HorizontalLine />
            <TextField id="filled-basic" label="Request CR Number" variant="filled"
            onChange={(event)=>(this.setState({request_search:event.target.value}))}
            />
            <Button
            style={{marginLeft:"400px",marginTop:"-43px"}}
            onClick={()=>{
              var list = this.state.requests;
              list.sort((a, b) => a.crnumber.localeCompare(b.crnumber))
              console.log("List:",list)
              this.setState({requests:list})
            }}
            >Sort</Button>
            {/* <HorizontalLine /> */}
          </div>
          <div style={{height:"270px",maxHeight:"270px",maxWidth:"700px",overflowY:"auto",overflowX:"auto"}}>
          {
          this.state.requests?
          <>
          <ul>
          {
                this.state.requests.map((request)=>(
                  request.docnumber.toString().includes(this.state.request_search) || request.wardadhaar.toString().includes(this.state.request_search) || readable[request.state].toLowerCase().includes(this.state.request_search.toLowerCase())? 
                  <li class='table-row'>
                <HotPOContainer>
                  <TableRowContainer className="row"
                  style={{marginLeft:"10px",width:"500px",height:"22px",maxWidth:"300px"}}
                  onClick={()=>(
                    this.setState({selected_request:request})
                  )} 
                  >
                    <div style={{width:"800px",marginTop:"0px",fontFamily: "Roboto",fontSize: "16px",fontWeight: "400",color: "#000"}}>
                    &emsp;
                    {/* {request.crnumber}- */}
                    {request.docnumber} - {request.wardadhaar} - {readable[request.state]}

                    </div>
                  
                    {/* <Link to={{
                    // pathname: "/form",
                    // search: request.crnumber, 
                    }} 
                    style={{textDecoration:"none",marginTop:"-10px",marginLeft:"400px"}}
                    > */}
                  {/* <Button align="center" onClick={()=>(this.setState({selected_request:request}),console.log(this.state.selected_request.docnumber))}> */}
                    {/* <a class="example_f" href="add-website-here" target="_blank" rel="nofollow"> */}
                    {/* <span>update</span> */}
                    {/* </a> */}
                  {/* </Button> */}
                  {/* </Link> */}
                  </TableRowContainer>
                  </HotPOContainer>
                  </li>
                  :
                  ""
                ))
          }
          </ul>
          </>
          :
          <>
          </>
          }
          </div>

        </PatientContainer>

      </TableViewContainer>

      <div style={{marginLeft:"850px",marginTop:"-350px",width:"650px",height:"300px"}} class="container">
          <h2 style={{marginLeft:"-50px"}}>Request Details</h2>
          
          <Grid container spacing={1}>
            <Grid item xs={6} style={{alignItems:"center",justifyContent:"left",display:"flex"}}>
              {/* <Button disabled variant="text" style={{color:"black",textTranform:"none"}}>  */}
                STATUS :  {readable[this.state.selected_request.state]}
              {/* </Button> */}
              
            </Grid>
            <Grid item xs={6}>
              
              <Link to={{
                pathname:
                redirect_url[this.state.selected_request.state]+this.state.selected_request.docnumber,
                docnumber: this.state.selected_request.docnumber,
                stage: this.state.selected_request.state,
                user: "user",
              }
              }>
              <Button color="primary" variant="contained">
                View Details
              </Button>
              {this.state.selected_request.notificationbit && this.state.selected_request.state=="Filling"?
              <IconButton color="primary">
                {/* <Badge badgeContent={1} color="secondary"> */}
                  <NotificationsIcon color="secondary" /> 
                {/* </Badge> */}
              </IconButton>
              :""}
              </Link>
            </Grid>
          </Grid>

          {/* {this.state.selected_request.state=="Pending"?(
          <Link to={'/form/'+this.state.selected_request.docnumber}>
          <Button color="primary" variant="contained"
              style={{align:"center",marginLeft:"250px"}} 
              onClick={()=>(
                myvar = this.state.selected_request.docnumber,
                console.log(this.state.selected_request.docnumber,myvar)
              )}
            >
              Update
            </Button>  
          </Link>):this.state.selected_request.state=="Approved"?
          <Link to={'/returned/'+this.state.selected_request.docnumber}>
          <Button color="primary" variant="contained"
              style={{align:"center",marginLeft:"250px"}} 
              onClick={()=>(
                myvar = this.state.selected_request.docnumber,
                console.log(this.state.selected_request.docnumber,myvar)
              )}
            >
              Returned
            </Button>  
          </Link>:""
          } */}

          <Table 
          // style={{marginTop:"150px",marginLeft:"400px",width:"650px"}}
          >
            <ul class="responsive-table">
                <TableBody>
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginTop:"5px",marginLeft:"20px"}}>CR Number:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_request==""?<></>:this.state.selected_request.crnumber}</TableCell>
                    </li>
                    {/* <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginTop:"5px",marginLeft:"20px"}}>ID:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_request==""?<></>:this.state.selected_request.id}</TableCell>
                    </li> */}
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginTop:"5px",marginLeft:"20px"}}>Ward Adhaar no.:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_request==""?<></>:this.state.selected_request.wardadhaar}</TableCell>
                    </li>
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginTop:"5px",marginLeft:"20px"}}>Document Number:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_request==""?<></>:this.state.selected_request.docnumber}</TableCell>
                    </li>
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginTop:"5px",marginLeft:"20px"}}>Department:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_request==""?<></>:this.state.selected_request.department}</TableCell>
                    </li>
                    <li class="table-row">
                        <TableCell class="col col-1" style={{width:"250px"}}><div style={{marginTop:"5px",marginLeft:"20px"}}>Consultant:</div></TableCell>
                        <TableCell class="col col-2" style={{width:"250px"}}>{this.state.selected_request==""?<></>:this.state.selected_request.consultantuname}</TableCell>
                    </li>
                </TableBody>
                </ul>
            </Table>
      </div>


      </div>

        )
    }
}

export { myvar } ;
