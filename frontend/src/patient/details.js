import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../user/dashboard/Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  //const SUBMIT_FORM_API = 'http://127.0.0.1:8000/api/get-patient-table';
  const REQUEST_TABLE_API='http://127.0.0.1:8000/api/get-request-table/'+props.docnumber;
  const classes = useStyles();
  var form1=[];
  var form2=[];
  const [name,setName] = useState("");
  const [height,setHeight] = useState("");
  const [weight,setWeight] = useState("");
  //const [name,setName] = useState("");
  const [wardadhaar,setWardadhaar] = useState("");
  const [cr,setCr]= useState("");
  const fetchData = async () => {
    //console.log("***\n",props.mode)
    console.log("in fetch");
    //const response1 = await axios.get(SUBMIT_FORM_API)
    //form1 = await response1.data;
    const response2 = await axios.get(REQUEST_TABLE_API)
    form2 = await response2.data;
    setName(form2.patientname);
    setHeight(form2.height);
    setWeight(form2.weight);
    setWardadhaar(form2.wardadhaar);
    setCr(form2.crnumber);
    console.log("response",form2);
  }
  useEffect(()=>{
    console.log("in use effect");  
    fetchData();
 },[])
  return (
    <React.Fragment>
      <Title>Patient Details</Title>
      {/* <Typography component="p" variant="h5">
        Name: { name}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Weight: {weight} kg
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Height: {height} cm
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Aadhar Number: {wardadhaar} 
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        CR number: {cr}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Gender: Male
      </Typography> */}
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Typography component="p" variant="h4">
        Name: { name}
      </Typography>
        </Grid>
        <Grid item xs={3}>
        <Typography color="textSecondary" className={classes.depositContext} variant="h5">
        Weight: {weight} kg
      </Typography>
        </Grid>
        <Grid item xs={3}>
        <Typography color="textSecondary" className={classes.depositContext} variant="h5">
        Height: {height} cm
      </Typography>
        </Grid>
        <Grid item xs={3}>
        <Typography color="textSecondary" className={classes.depositContext} variant="h5">
        Gender: Male
      </Typography> 
        </Grid>
        <Grid item xs={3}>
        <Typography color="textSecondary" className={classes.depositContext} variant="h5">
        CR number: {cr}
      </Typography>
        </Grid>
      </Grid>
    </div>
    </React.Fragment>
  );
}