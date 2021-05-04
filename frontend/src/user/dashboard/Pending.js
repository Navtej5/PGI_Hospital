import React, { useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Title from './Title';
import Switch from "react-switch";
import axios from 'axios';
import Button from '@material-ui/core/Button';

// Generate Order Data


  // const SwitchExample = (checked,setChecked) => {
  //   // render() {
  //     return (
  //       <label>
  //         {/* <span>Switch with default style</span> */}
  //         {/* <Switch onChange={handleChange} checked={checked} /> */}
  //         <Switch button onChange={()=>{ setChecked(checked^1) }} checked={0}/>
  //       </label>
  //     );
  //   // }
  // }

  function createData(docnumber,wardadhaar,name , ViewRequest, Toggle) {
    return {docnumber,wardadhaar,name ,ViewRequest, Toggle};
  }
var i;
// const rows = [
//   createData(0, 'Pending: 19', '777', <a href="http://localhost:8000/addrequest">click here</a>,<SwitchExample state={0}/>),
// ];
// for(i=0;i<20;i++){
//   rows.push(createData(0, 'Pending: '+13*i+11, 73*i+97, <a href="http://localhost:8000/addrequest">click here</a>,<SwitchExample state={0} />));
// }


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function Pending() {
  const classes = useStyles();
  const [checked,setChecked]=React.useState(false);
  const [searchText,setSearchText] = React.useState("");
  function dobutton(){
    // Boolean x = !checked;
    setChecked(checked? false : true);
    console.log("checked = ",checked);
  }
    const SwitchExample = () => {
      return (
        <label>
          <button  onClick={()=>{ dobutton() } }  >Approve this</button>
        </label>
      );
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////
  const [books, setBooks] = React. useState(null);
  const [rows, setRows] = React. useState(createData(1231241,11,"atul","link","state"));
  const apiURL = "http://127.0.0.1:8000/api/view-request-table";
  const updateURL = "http://127.0.0.1:8000/api/get-request-table/";
  const fetchData = async () => {
    console.log("in fetch");
    const response = await axios.get(apiURL)
    // const response = await fetch(apiURL);
    const books = await response.data;
    // console.log("see here bruh : "+books[0].createdby);
    // books[0].createdby = "atul op";
    // axios.patch(updateURL+"199/",books[0]);
    console.log("response\n");
    console.log(response);

    var temp = [];
    for(i=0;i<books.length;i++){
      if(books[i].state != "Pending")continue;
      var naam = books[i].patientname;
      var ward = books[i].wardadhaar;
      var link = "see details";
      var doc = books[i].docnumber;
      var booktemp = books[i];
      var tog = booktemp;
      temp.push({doc,ward,naam,link,tog});
    } 
    setRows(temp);
    // books[0].name = "Thischangedname";
    // axios.put(updateURL,books);
}

  console.log("globe");
  useEffect(()=>{
    console.log("in use effect");  
    fetchData()
    
      // getPatientList()
    },[])   
// const rows;
//////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <React.Fragment>
      {/* <Title>Requests</Title> */}
      <TextField id="filled-basic" label="Search Name" variant="filled"
            onChange={(event)=>(setSearchText(event.target.value))}
            style={{width:"210px"}}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>DOCUMENT NUMBER</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>WARD-ADHAAR</TableCell>
            <TableCell>VIEW COMPLETE REQUEST</TableCell>
            <TableCell>ACTION</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.length>0 ? 
          rows.map((row) => (
            row.naam.toLowerCase().includes(searchText.toLowerCase())?
            <TableRow key={row.doc}>
              <TableCell>{row.doc}</TableCell>
              <TableCell>{row.naam}</TableCell>
              <TableCell>{row.ward}</TableCell>
              <TableCell>
                <Link 
                    to={{
                      pathname:"/cardiacform_um/"+row.doc,
                      mode:"view_only",
                      stage:"Pending",
                      user:"consultant",
                    }}
                  >
                  {row.link}
                </Link>
              </TableCell>
              {/* <TableCell
              style={{color:"blue",textDecoration:"underline"}}
              onClick={()=>(history.push(`/consultantView/${row.ward}/${row.doc}`))}              
              >{row.link}</TableCell> */}
              <TableCell>
                {/* var booktemp = {row.tog}; */}
              <Button color='primary' variant='contained'onClick={()=>{ row.tog.state = "Approved";
      axios.patch(updateURL+row.doc,row.tog); 
      }} >
      Move to Approved
      </Button>
          
                </TableCell>
              {/* <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
            :
            ""
          ))
          : ""}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
 