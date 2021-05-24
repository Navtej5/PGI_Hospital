import React, {Component, useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from 'styled-components';
import DatePicker from "react-datepicker";
//import moment from "Moment";
import format from 'date-fns/format';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "@material-ui/core";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    customdiv: {
      height: '100%'
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      // position: 'fixed', 
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
      height: '100%'
      // height: 240,
    },
}));

const REQUEST_TABLE_API='http://127.0.0.1:8000/api/requests'

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
const Input = styled.input`
  width: 100%;
  height: 20px;
  border-radius: 4px;
  border: solid 1px #a8a8a8;
  background-color: #ffffff;
  margin-top: 18px;
  padding: 10px;
  &:focus{
  outline: none;
  border: solid 2px #0052cc;
  `;

export default function AddRequest(){

        const [department,setDepartment]=useState("Bypass Surgery");
        const [crNumber,setCrNumber]=useState("_");
        const [wardAdhaar,setWardAdhaar]=useState(0);
        const [wardName,setWardName]=useState("_");
        // const [patientName,setPatientName]=useState("_");
        const [docNumber,setDocNumber]=useState("_");
        const [consultantUname,setConsultantUname]=useState("_");
        const [height,setHeight] = useState(0);
        const [weight,setWeight] = useState(0);

        const classes = useStyles();

        return(
        <div >
            <ReactNotification />
            {/* <Row style={headerDiv}>
                <div className="montserrat" 
                style={headerleft} 
                >
                PGIMER                   
                </div>                
                <span style={{marginRight:"640px",color: "white",fontSize:"28px"}}>
                    <div>Add Requests</div>
                </span>
                <span style={help}>
                    <button className="fs-16" style={{background:'none',border:'none',boxShadow:'none', textDecoration: "none", color: "white" }}>
                    Welcome!
                    </button>
                 </span>                
                <span style={help}>
              </span>
            </Row> */}

            {/* <AppBar position="absolute" className={clsx(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                
                <Typography component="h1" variant="h6" color="inherit" align="center" noWrap className={classes.title}>
                    ADD REQUEST
                </Typography>
                {/* <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                    </Badge>
                </IconButton> 
                <Link to="/user">
                <Button variant="contained" color="secondary">
                    Go Back
                </Button>
                </Link>
                </Toolbar>
            </AppBar> */}

            <Table style={{marginTop:"80px",marginLeft:"400px",width:"650px"}}>
                <TableBody>
                    <TableRow>
                        <TableCell><div style={{marginTop:"0px",marginLeft:"20px",fontSize:"18px"}}>CR Number:</div></TableCell>
                        <TableCell><Input style={{marginTop:"0px",marginLeft:"-80px",height:"8px"}}
                            onChange={(event)=>{
                                setCrNumber(event.target.value)
                            }}
                        ></Input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"0px",marginLeft:"20px",fontSize:"18px"}}>Ward Adhaar No.:</div></TableCell>
                        <TableCell><Input type="number" style={{marginTop:"0px",marginLeft:"-80px",height:"8px"}} min="100000000000"  max="999999999999"
                            onChange={(event)=>{
                                setWardAdhaar(event.target.value)
                            }}
                        ></Input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"0px",marginLeft:"20px",fontSize:"18px"}}>Ward Name:</div></TableCell>
                        <TableCell><Input style={{marginTop:"0px",marginLeft:"-80px",height:"8px"}}
                            onChange={(event)=>{
                                setWardName(event.target.value)
                            }}
                        ></Input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"0px",marginLeft:"20px",fontSize:"18px"}}>Department:</div></TableCell>
                        <TableCell>
                            <Select style={{marginTop:"0px",marginLeft:"-80px",width:"80%"}}
                                onChange={(event)=>{
                                    setDepartment(event.target.value)
                                }}
                            >   
                                <option value="Cardiology">Cardiology</option>
                                <option value="Immunology">Immunology</option>
                                <option value="Oncology">Oncology</option>
                                <option value="Psychiatry">Psychiatry</option>
                            </Select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"0px",marginLeft:"20px",fontSize:"18px"}}>Document Number:</div></TableCell>
                        <TableCell><Input style={{marginTop:"0px",marginLeft:"-80px",height:"8px"}}
                            onChange={(event)=>{
                                setDocNumber(event.target.value)
                            }}
                        ></Input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"0px",marginLeft:"20px",fontSize:"18px"}}>Consultant User Name:</div></TableCell>
                        <TableCell><Input style={{marginTop:"0px",marginLeft:"-80px",height:"8px"}}
                            onChange={(event)=>{
                                setConsultantUname(event.target.value)
                            }}
                        ></Input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"0px",marginLeft:"20px",fontSize:"18px"}}>Height</div></TableCell>
                        <TableCell><Input type="number" style={{marginTop:"1px",marginLeft:"-80px",height:"8px"}} placeholder="Type in cm"
                            onChange={(event)=>{
                                setHeight(event.target.value);
                            }}
                        ></Input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"0px",marginLeft:"20px",fontSize:"18px"}}>Weight</div></TableCell>
                        <TableCell><Input type="number" style={{marginTop:"0px",marginLeft:"-80px",height:"8px"}} placeholder="Type in kg"
                            onChange={(event)=>{
                                setWeight(event.target.value);
                            }}
                        ></Input></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button variant="contained" color="primary"
            style={{fontSize:"18px",marginLeft:"680px",marginTop:"20px",height:"40px",width:"150px",font:"message-box"}}
                onClick={()=>(
                    console.log(crNumber,wardAdhaar,wardName,department,docNumber,consultantUname,height,weight),
                    fetch(REQUEST_TABLE_API,
                        {
                        // credentials: 'include',
                        credentials: 'omit',
                        method:'POST',
                        headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                        },
                        body: JSON.stringify({
                            crnumber: crNumber,
                            wardadhaar: wardAdhaar,
                            patientname: wardName,
                            department: department,
                            docnumber: docNumber,
                            consultantuname: consultantUname,
                            height: height,
                            weight:weight,
                            bsa:0,
                        }),
                    })
                    .then((result)=>{
                    store.addNotification({
                        title: "Success",
                        message: "Request added successfully",
                        type: "success",
                        insert: "top",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 5000,
                          onScreen: true
                        }
                      });
                      console.log("Success===:",result);
                    //   window.location.replace("/user");
                    })
                    .catch((error)=>{store.addNotification({
                        title: "Failed",
                        message: "Request could not be added",
                        type: "danger",
                        insert: "top",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 5000,
                          onScreen: true
                        }
                      });console.log("Error===:",error)})
                )}
                
            ><h3>SUBMIT</h3>
            </Button>
            <div style={{height:"20px"}}></div>
        </div>
        )
    
}
