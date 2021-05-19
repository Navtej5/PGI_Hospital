// import React from 'react';
// import React, { useState , useEffect} from 'react';
// // import Link from '@material-ui/core/Link';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Title from './Title';
// import Switch from "react-switch";
// import axios from 'axios';
// import {TextField} from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import { createBrowserHistory } from 'history';
// import { Link} from "react-router-dom";
// const history = createBrowserHistory({forceRefresh:true});

// // var myvar;

// function createData(doc,wardadhaar,name , ViewRequest, Toggle) {
//   return {doc,wardadhaar,name ,ViewRequest, Toggle};
// }
// var i;
// // var rows = [
// //   createData(0, 'Approved: 867', '1100', <a href="http://localhost:8000/addrequest">click here</a>,<SwitchExample />),
// // ];
// // for(i=0;i<20;i++){
// //   rows.push(createData(0, 'Approved: '+i, 47*i+9, <a href="http://localhost:8000/addrequest">click here</a>,<SwitchExample />));
// // }


// function preventDefault(event) {
//   event.preventDefault();
// }

// const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
// }));



// export default function SentToPharma(props) {
//   const classes = useStyles();
//   const [checked,setChecked]= React.useState(false);

//   const apiURL = "http://127.0.0.1:8000/api/view-request-table";
//   const updateURL = "http://127.0.0.1:8000/api/get-request-table/" ;

  
//   // update(e) {
//   //   // update entity - PUT
//   //   e.preventDefault();
//   // }
//   const SwitchExample = () => {
//       return (
//         <label>
//           <button onClick={()=>{ setChecked(checked^1) }} >
//             Move to Pending
//           </button>
//         </label>
//       );
//   }
// //   const SwitchExample = (docnumber) => {
// //     return (
// //       <label>
// //         <Switch button onChange={()=>{ dotoggle(docnumber) }} />
// //       </label>
// //     );
// // }

//   const [books, setBooks] = React. useState(null);
//   const [rows, setRows] = React. useState(createData(123323427897,11,"atul","yo","sfsdf"));
//   const [patientSearch,setPatientSearch] = React.useState("");
//   const dobutton = async (docnumber,i,books) => {
//     books[i].state = "Pending";
//     axios.patch(updateURL+docnumber,books[i]);
//   }
//   const fetchData = async () => {
//       console.log("in fetch");
//       const response = await axios.get(apiURL)
//       // const response = await fetch(apiURL);
//       const books = await response.data;
//       // console.log("see here bruh : "+books[0].createdby);
//       // books[0].createdby = "atul op";
//       // axios.patch(updateURL+"199/",books[0]);
//       console.log("response\n");
//       console.log(response);

//       var temp = [];
//       for(i=0;i<books.length;i++){
//         if(books[i].state != "SentToPharma")continue;
//         var naam = books[i].patientname;
//         var ward = books[i].wardadhaar;
//         var link = "see details";
//         var doc = books[i].docnumber;
//         var booktemp = books[i];
//         var tog = booktemp;
//         temp.push({doc,ward,naam,link,tog});
//       } 
//       setRows(temp);
//       // console.log("temp==>\n",temp);
//       // console.log("rows===>\n",rows);
//       // books[0].name = "Thischangedname";
//       // axios.put(updateURL,books);
//   }

//   console.log("globe");
//   useEffect(()=>{
//     console.log("in use effect");  
//     fetchData()
    
//       // getPatientList()
//     },[])   
// // const rows;

//   return (
//     <React.Fragment>
//       <TextField id="filled-basic" label="Patient Name" variant="filled"
//       onChange={(event) => (setPatientSearch(event.target.value))}
//       />
      
//       {/* <Title>Requests</Title> */}
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//           <TableCell>DOCUMENT NUMBER</TableCell>
//             <TableCell>PATIENT NAME</TableCell>
//             <TableCell>WARD-ADHAAR</TableCell>
//             <TableCell>VIEW COMPLETE REQUEST</TableCell>
//             {props.user=="unitman"?
//               <TableCell>ACTION</TableCell>:""}
//             {/* <TableCell align="right">Sale Amount</TableCell> */}
//           </TableRow>
//         </TableHead>
//         <TableBody>

//           {rows.length>0 ? 
//           rows.map((row) => (
//               row.naam.toLowerCase().includes(patientSearch.toLowerCase()) || row.doc.includes(patientSearch.toLowerCase()) || row.ward.toString().includes(patientSearch.toLowerCase())?

//             <TableRow key={row.doc}>
//               <TableCell>{row.doc}</TableCell>
//               <TableCell>{row.naam}</TableCell>
//               <TableCell>{row.ward}</TableCell>
//               <TableCell>
//               <Link 
//                   to={{
//                     pathname:"/cardiacform_um/"+row.doc,
//                     mode:"view_only",
//                     stage:"SentToPharma",
//                     user:props.user
//                   }}
//                 >
//                   {row.link}
//                 </Link>
//               </TableCell>   
//               {props.user=="unitman"?
//               <TableCell>
//                 {/* var booktemp = {row.tog}; */}
//               <Button color="primary" variant = "contained" onClick={()=>{ row.tog.state = "SentToPharma";
//               axios.patch(updateURL+row.doc,row.tog); 
//               }} >
//               Received
//               </Button>
//               </TableCell>:""}
//               {/* <TableCell>{row.doc}</TableCell>    */}
//               {/* <TableCell align="right">{row.amount}</TableCell> */}
//             </TableRow>
//             :
//             ""
//           ))
//           : ""}
//         </TableBody>
//       </Table>
//       <div className={classes.seeMore}>
//         <Link color="primary" href="#" onClick={preventDefault}>
//           See more orders
//         </Link>
//       </div>
//     </React.Fragment>
//   );
// }
 
//------------------------------------------------------------------------------------------------------------------------------------------------------------

import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import axios from 'axios';
import { Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
function createData(docnumber,wardadhaar,name , ViewRequest, Toggle) {
    return {docnumber,wardadhaar,name ,ViewRequest, Toggle};
  }
  var i;
// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'NAME' },
  { id: 'docnumber', numeric: true, disablePadding: false, label: 'DOCNUMBER' },
  { id: 'wardadhaar', numeric: true, disablePadding: false, label: 'WARDAADHAR' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'LINK' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'ACTION' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : ""}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function SentToPharma(props) {
  const classes = useStyles();
  const apiURL = "http://127.0.0.1:8000/api/view-request-table";
  const updateURL = "http://127.0.0.1:8000/api/get-request-table/" ;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('docnumber');
  const [rows, setRows] = React. useState([createData(123323427897,11,"atul","yo","sfsdf")]);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [patientSearch,setPatientSearch] = React.useState("");
  const [checked,setChecked]= React.useState(false);
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
    const SwitchExample = () => {
             return (
               <label>
                 <button onClick={()=>{ setChecked(checked^1) }} >
                   Move to Pending
                 </button>
              </label>
             );
         }
    var temp = [];
    for(i=0;i<books.length;i++){
      if(books[i].state != "SentToPharma")continue;
      var naam = books[i].patientname;
      var ward = books[i].wardadhaar;
      var link = "see details";
      var doc = books[i].docnumber;
      var booktemp = books[i];
      var tog = booktemp;
      //var stage = books[i].state;
      temp.push(createData(doc,ward,naam,link,tog));
    }
    temp.push(createData('201','100000000001','samreet','see details','kljl')); 
    setRows(temp);
    // console.log("temp==>\n",temp);
    // console.log("rows===>\n",rows);
    // books[0].name = "Thischangedname";
    // axios.put(updateURL,books);
}

console.log("globe");
useEffect(()=>{
  console.log("in use effect");  
  fetchData()
  },[])     
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TextField id="filled-basic" label="Patient Name" variant="filled"
      onChange={(event) => (setPatientSearch(event.target.value))}
      />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    row.name.toLowerCase().includes(patientSearch.toLowerCase()) || row.docnumber.includes(patientSearch.toLowerCase()) || row.wardadhaar.toString().includes(patientSearch.toLowerCase())?
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.docnumber}</TableCell>
                      <TableCell align="right">{row.wardadhaar}</TableCell>
                      <TableCell align="right">
                      <Link 
                  to={{
                    pathname:"/cardiacform_um/"+row.docnumber,
                    mode:"view_only",
                    stage:"SentToPharma",
                    user:props.user
                  }}
                >
                {row.ViewRequest}
                </Link>
                        </TableCell>
                        {props.user=="unitman"?
                      <TableCell align="right"><Button color="primary" variant = "contained" onClick={()=>{ row.tog.state = "SentToPharma";
      axios.patch(updateURL+row.docnumber,row.tog); 
      }} >
      Received
      </Button></TableCell>:""}
                    </TableRow>:""
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}