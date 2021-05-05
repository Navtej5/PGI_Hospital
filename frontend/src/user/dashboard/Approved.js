import Button from '@material-ui/core/Button';
import React, { useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Switch from "react-switch";
import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({forceRefresh:true});

function createData(doc,wardadhaar,name , ViewRequest, Toggle) {
  return {doc,wardadhaar,name ,ViewRequest, Toggle};
}
var i;
// var rows = [
//   createData(0, 'Approved: 867', '1100', <a href="http://localhost:8000/addrequest">click here</a>,<SwitchExample />),
// ];
// for(i=0;i<20;i++){
//   rows.push(createData(0, 'Approved: '+i, 47*i+9, <a href="http://localhost:8000/addrequest">click here</a>,<SwitchExample />));
// }


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function Approved(props) {
  const classes = useStyles();
  const [checked,setChecked]= React.useState(false);

  const apiURL = "http://127.0.0.1:8000/api/view-request-table";
  // const apiURL = "http://127.0.0.1:8000/api/view-request-table/";
  const updateURL = "http://127.0.0.1:8000/api/get-request-table/" ;
  const REMARKS_API = "http://127.0.0.1:8000/api/update-request-remarks/";
  
  // update(e) {
  //   // update entity - PUT
  //   e.preventDefault();
  // }
  const SwitchExample = () => {
      return (
        <label>
          <button onClick={()=>{ setChecked(checked^1) }} >
            Move to Pending
            </button>
        </label>
      );
  }
//   const SwitchExample = (docnumber) => {
//     return (
//       <label>
//         <Switch button onChange={()=>{ dotoggle(docnumber) }} />
//       </label>
//     );
// }

  // const [books, setBooks] = React. useState(null);
  const [rows, setRows] = React. useState([]);
  // const [tempstring,setTempString] = useState("blank string");
  const dobutton = async (docnumber,i,books) => {
    books[i].state = "Pending";
    axios.patch(updateURL+docnumber,books[i]);
  }
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
        if(books[i].state != "Approved")continue;
        var naam = books[i].patientname;
        var ward = books[i].wardadhaar;
        var link = "see details";
        var doc = books[i].docnumber;
        var booktemp = books[i];
        var remarks = books[i].remarksfromconsultant;
        var tog = booktemp;
        temp.push({doc,ward,naam,link,tog,remarks});
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

  return (
    <React.Fragment>
      
      {/* <Title>Requests</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>DOCUMENT NUMBER</TableCell>
            <TableCell>PATIENT NAME</TableCell>
            <TableCell>WARD-ADHAAR</TableCell>
            <TableCell>VIEW COMPLETE REQUEST</TableCell>
            {/* <TableCell>REMARKS</TableCell> */}
            <TableCell>ACTION</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>

          {rows.length>0 ? 
          rows.map((row,idx) => (
            <TableRow key={row.doc}>
              <TableCell>{row.doc}</TableCell>
              <TableCell>{row.naam}</TableCell>
              <TableCell>{row.ward}</TableCell>
              <TableCell>
              <Link 
                  to={{
                    pathname:"/cardiacform_um/"+row.doc,
                    mode:"view_only",
                    stage:"Approved",
                    user:"consultant",
                  }}
                >
                {row.link}
              </Link>
              </TableCell>
              {/* <TableCell> */}
                {/* <input type="text"
                  value={tempstring}
                  value = {rows[idx].remarks}
                  onChange={(event)=>{
                    setRows(...rows,[rows[idx].remarks]:event.target.value)
                    row.remarks = event.target.value;
                    console.log("newremarks => ",row.remarks);
                    setTempString(event.target.value);
                    console.log(tempstring);
                  }}
                ></input> */}
              {/* </TableCell> */}
              <TableCell>
                {/* var booktemp = {row.tog}; */}
              <Button color="primary" variant="contained" 
              onClick={()=>{ 
                row.tog.state = "Pending";
                // axios.patch(updateURL+row.doc,{"remarksfromconsultant":row.remarks});
                axios.patch(updateURL+row.doc,row.tog); 
                
                // fetch(REMARKS_API+row.doc,
                //   {
                //     credentials: 'include',
                //     method:'PATCH',
                //     headers: {
                //     Accept: 'application/json',
                //     "Content-Type": 'application/json',
                // },
                //     body: JSON.stringify({
                //         remarks: tempstring,
                //         // wardadhaar: "100000000000",

                //     }),
                // })

      }} >
      Move to Pending
      </Button>
          
                </TableCell>
              {/* <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
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
 
