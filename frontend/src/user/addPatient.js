import React, {Component, useState} from "react";
import axios from "axios";
import {Row} from "simple-flexbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from 'styled-components';
import DatePicker from "react-datepicker";
//import moment from "Moment";
import format from 'date-fns/format';
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "@material-ui/core";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
//import {NotificationContainer, NotificationManager} from 'react-notifications';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';

// window.location.href = "/user";

const useStyles = (theme) => ({
    root: {
      display: 'flex',
      overflow: 'hidden',
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
});

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


const PATIENT_TABLE_API='https://pgi-backend.herokuapp.com/api/patients'


class AddPatient extends Component{
    // createNotification = (type) => {
    //     return () => {
    //       switch (type) {
    //         case 'info':
    //           NotificationManager.info('Info message');
    //           break;
    //         case 'success':
    //           NotificationManager.success('Success message', 'Title here');
    //           break;
    //         case 'warning':
    //           NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
    //           break;
    //         case 'error':
    //           NotificationManager.error('Error message', 'Click me!', 5000, () => {
    //             alert('callback');
    //           });
    //           break;
    //       }
    //     };
      //};
    
    state = {
        name:"",
        ward_adhaar:0,
        blood_group:"",
        gender:"",
        dob: "",
    }



    render()
    {      
        // const [dateofbirth,setdateofbirth] = useState(null);
        // const classes = useStyles();
        const { classes } = this.props;
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
                    <div>Add Patients</div>
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
                    ADD PATIENT 
                </Typography>
                
                <Link to="/user">
                <Button variant="contained" color="secondary">
                    Go Back
                </Button>
                </Link>
                </Toolbar>
            </AppBar> */}

            {/* <Table style={{marginTop:"100px",marginLeft:"100px",width:"650px"}}> */}
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell><div style={{marginTop:"20px",marginLeft:"10%",fontSize:"18px"}}>Name of Patient:</div></TableCell>
                        <TableCell><Input style={{marginLeft:"0px",height:"15px",width:"70%"}}
                        onChange={event=>(
                            this.setState({name:event.target.value})
                        )}
                        ></Input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"20px",marginLeft:"10%",fontSize:"18px"}}>Wardadhaar:</div></TableCell>
                        <TableCell><Input type="number" style={{marginLeft:"0px",height:"15px",width:"70%"}} min="100000000000"  max="999999999999"
                        onChange={event=>(
                            this.setState({ward_adhaar:event.target.value})
                        )}                        
                        ></Input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"20px",marginLeft:"10%",width:"80%",fontSize:"18px"}}>Blood Group:</div></TableCell>
                        <TableCell><Select style={{marginLeft:"0px",width:"40%"}}
                        onChange={event=>(
                            this.setState({blood_group:event.target.value})
                        )}                        
                        >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option selected value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>    
                        </Select></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"20px",marginLeft:"10%",fontSize:"18px"}}>Gender:</div></TableCell>
                        <TableCell><Select style={{marginLeft:"0px",width:"40%"}}
                        onChange={event=>(
                            this.setState({gender:event.target.value})
                        )}                        
                        ><option value="male">Male</option>
                        <option value="female">Female</option>
                        <option selected value="other">Other</option></Select></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><div style={{marginTop:"20px",marginLeft:"10%",fontSize:"18px"}}>Date Of Birth:</div></TableCell>
                        <TableCell>
                        <div style={{marginLeft:"0px"}}>
                        <DatePicker
                        placeholderText="Select DoB"
                        showYearDropdown
                        isClearable
                        selected={ this.state.dob }
                        onChange={(newDate)=> 
                        (   
                            console.log("Picked:",format(newDate,"yyyy-MM-dd")),
                            this.setState({dob:newDate})
                        )
                        }
                        name="startDate"
                        dateFormat="yyyy-MM-dd"
                        /></div>
                            {/* <Input style={{marginLeft:"-80px"}}
                        onChange={event=>(
                            this.setState({dob:event.target.value})
                        )}                        
                        ></Input> */}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" 
            style={{margin: '0 auto', display: "flex"}}
            onClick={()=>(
                console.log("Posting"),
                //this.createNotification('success'),
                
                fetch(PATIENT_TABLE_API,
                    {
                        // credentials: 'include',
                        credentials: 'omit',
                        method:'POST',
                        headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                  },
                  body: JSON.stringify({
                    name: this.state.name,
                    wardadhaar: this.state.ward_adhaar,
                    bloodgroup: this.state.blood_group,
                    gender: this.state.gender,
                    dob: format(this.state.dob,'yyyy-MM-dd'),
                  }),
                })
                .then((result)=>{store.addNotification({
                    title: "Success",
                    message: "Patient added successfully",
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
                  // browserHistory.goBack;
                  // window.location.replace("/user");
                }).catch((error)=>{store.addNotification({
                    title: "Failed",
                    message: "Patient could not be added",
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
            >Submit</Button>
            
            </div>
        )
    }
}

export default withStyles(useStyles)(AddPatient)