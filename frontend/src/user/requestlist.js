import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import {Button,Table,TableBody,TableCell,Grid,Typography,TextField} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withStyles, makeStyles } from '@material-ui/core/styles';
const readable = {
    "Filling":"In Progress",
    "Pending":"Pending Approval",
    "Approved":"Approved by Consultant",
    "SentToPharma":"Inventory Ordered and Waiting for delivery",
    "ReceivedFromPharma":"Inventory Received by Unit Manager (Audit Pending)",
    "ReceivedByNurse":"Inventory Received by Nurse (Verification Pending)",
    "Ready":"Ready for Surgery/Operation",
    "OperationDone":"Post Operation Consumption Updation",
    "Completed":"Completed",
  };
  const redirect_url = {
    "Filling":"/form/",
    "Pending":"/returned/",
    "Approved":"/returned/",
    "SentToPharma":"/returned/",
    "ReceivedFromPharma":"/returned/",
    "ReceivedByNurse":"/returned/",
    "Ready":"/returned/",
    "OperationDone":"/returned/",
    "Completed":"/returned/",
  };
  

 const useRowStyles = makeStyles({
   root: {
     '& > *': {
       borderBottom: 'unset',
     },
   },
 });
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
function createData(name,wardadhaar,docnumber,department,dateofprocedure,state,remark,notificationbit,crnumber,height,weight,bsa,consultantname){
    return {name,wardadhaar,docnumber,department,dateofprocedure,state,remark,notificationbit,crnumber,height,weight,bsa,consultantname}
}
// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       { date: '2020-01-05', customerId: '11091700', amount: 3 },
//       { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//     ],
//   };
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
             {row.notificationbit && row.state=="Filling"?
              <IconButton color="primary">
                {/* <Badge badgeContent={1} color="secondary"> */}
                  <NotificationsIcon color="secondary" /> 
                {/* </Badge> */}
              </IconButton>
              :""} 
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
        <Typography variant="body1">{row.name}</Typography>
        </TableCell>
        <TableCell align="right">{row.crnumber}</TableCell>
        <TableCell align="right">{row.docnumber}</TableCell>
        <TableCell align="right">{row.wardadhaar}</TableCell>
        <TableCell align="right">{readable[row.state]}</TableCell>
        <TableCell align="right">{row.dateofprocedure}</TableCell>
        <TableCell align="right"><Link to={{
                pathname:
                redirect_url[row.state]+row.docnumber,
                docnumber: row.docnumber,
                stage: row.state,
                user: "user",
              }
              }>
              <Button color="primary" variant="contained">
                Details
              </Button>
              </Link></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="body1" gutterBottom gutterBottom component="div">
                Status: {readable[row.state]}
              </Typography>
              {/* <Typography variant="body1" gutterBottom gutterBottom component="div">
                Remarks: {row.remark}
              </Typography> */}
              <Grid container spacing={1}>
              <Grid item xs={6}>
              
                Department: {row.department}
              
               </Grid>
               <Grid item xs={6}>
              
                Consultant Name: {row.consultantname}
              
               </Grid>
               <Grid item xs={4}>
              
                Height: {row.height} cm
              
               </Grid>
               <Grid item xs={4}>
              
                Weight: {row.weight}  kg
              
               </Grid>
               <Grid item xs={4}>
              
                BSA: {row.bsa}
              
               </Grid>
               </Grid>
              {/* <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} 
                </TableBody>
              </Table> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];
const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
export default function CollapsibleTable() {
    const classes = useStyles();
    const [rows, setRows] = React. useState([createData(123323427897,11,"atul","yo","sfsdf")]);
    const [patientSearch,setPatientSearch] = React.useState("");
  let REQUEST_TABLE_API='http://127.0.0.1:8000/api/view-request-table';
  const fetchData = async () => {
    const response = await axios.get(REQUEST_TABLE_API)
    // const response = await fetch(apiURL);
    const books = await response.data;
   console.log("data",books);
   
    var temp = [];
    for(var i=0;i<books.length;i++){
      //if(books[i].state != "ReceivedFromPharma")continue;
      var name = books[i].patientname;
      var ward = books[i].wardadhaar;
      var dept = books[i].department;
      var link = "see details";
      var doc = books[i].docnumber;
      var dateop = books[i].dateofprocedure
      var notificationbit = books[i].notificationbit;
      var remark = books[i].remarksfromconsultant;
      var stage = books[i].state;
      var crnumber=books[i].crnumber;
      var height=books[i].height;
      var weight=books[i].weight;
      var bsa=books[i].bsa;
      var consultantname=books[i].consultantuname;
      temp.push(createData(name,ward,doc,dept,dateop,stage,remark,notificationbit,crnumber,height,weight,bsa,consultantname));
    }
    //temp.push(createData('201','100000000001','samreet','see details','kljl')); 
    setRows(temp);
    //this.setState({requests:req_data})
  }
  useEffect(()=>{
    console.log("in use effect");  
    fetchData()
    },[]) 
  return (
      <div>
    <TextField id="filled-basic" label="Search Patient" variant="outlined"
    onChange={(event) => (setPatientSearch(event.target.value))}
    />
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Docnumber</TableCell>
            <TableCell align="right">CR Number</TableCell>
            <TableCell align="right">Ward Adhaar&nbsp;</TableCell>
            <TableCell align="right">Status&nbsp;</TableCell>
            <TableCell align="right">Date of Surgery/Operation&nbsp;</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
               return(
                 row.name.toString().toLowerCase().includes(patientSearch.toLowerCase()) || row.docnumber.includes(patientSearch.toLowerCase()) || row.wardadhaar.toString().includes(patientSearch.toLowerCase()) || readable[row.state].toLowerCase().includes(patientSearch.toLowerCase()) || row.crnumber.toString().includes(patientSearch.toLowerCase())?
            <Row key={row.name} row={row} />
            :""
          );
               })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
