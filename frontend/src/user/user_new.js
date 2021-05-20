import React,{useEffect} from 'react';
import {Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//import ImageList from '@material-ui/core/ImageList';
//import ImageListItem from '@material-ui/core/ImageListItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Deposits from "./details";
//import Link from '@material-ui/core/Link';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
//import { mainListItems, secondaryListItems } from './listItems';
//import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
//import FormA from './formA';
//import FormB from './formB';
import {myvar} from '../user/user.js';
import { createBrowserHistory } from 'history';
import Title from '../user/dashboard/Title'
import axios from 'axios';
import AddPatient from './addPatient';
import AddRequest from './addRequest';
import CollapsibleTable from './requestlist.js';
//import { CardActionArea } from '@material-ui/core';
const history = createBrowserHistory({forceRefresh:true});

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
// export const mainListItems = (
//   <div>
//     <ListItem button>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Orders" />
//     </ListItem>
//     <ListItem button onClick={()=>{
//                     setForm(1)
//                 }}>
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Customers" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <BarChartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Reports" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Integrations" />
//     </ListItem>
//   </div>
// );

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
//import Chart from './Chart';
//import Deposits from './Deposits';
//import Orders from './Orders';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function UserNew(props) {
  //const SUBMIT_REQUEST_API = 'http://127.0.0.1:8000/api/update-request-remarks/'+props.match.params.docnumber;
  //const GET_REQUEST_DATA_API = 'http://127.0.0.1:8000/api/get-request-table/'+props.match.params.docnumber;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [form,setForm]=React.useState(0);
  const logout = async () => {
    localStorage.clear();
    history.push("/");
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

//   console.log("$$$$$$$$$$$$$$$$$$\ndocnumber:",props.location.docnumber,"\nstage:",props.location.stage);

//   const notificationfunction = async () =>{
//     console.log("in use effect");  
//     // fetchData();
//     var xy = await axios.get(SUBMIT_REQUEST_API);
//     xy.data.notificationbit = 0;
//     axios.put(SUBMIT_REQUEST_API,xy.data);
//     var xyz = await axios.get(GET_REQUEST_DATA_API);
//     setNurseflag(xyz.data.nurseflag);
//     setTechflag(xyz.data.technicianflag);
//     setPerflag(xyz.data.perfusionistflag);

//   }

//   useEffect(()=>{
//     console.log("in use effect");  
//     notificationfunction();
// },[])
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            PGIMER Nurse Page
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon /> 
            </Badge>
          </IconButton> */}
          <Button variant="contained" color="secondary" onClick={logout} >Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
    <List><div>
    <ListItem button onClick={()=>{setForm(0)}}  selected= {form==0}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Request" />
    </ListItem>
    <ListItem button onClick={()=>{setForm(1)}} selected= {form==1}>
      <ListItemIcon>
        <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Add Patient" />
    </ListItem>
    <ListItem button onClick={()=>{setForm(2)}} selected= {form==2}>
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Add Request" />
    </ListItem>
    <Divider />
    <Card className={classes.root}>
      {/* <CardActionArea> */}
        <CardMedia
          component="img"
          alt="IIT ROPAR"
          height="300"
          width="100"
          image="https://img.collegedekhocdn.com/media/img/institute/logo/IIT_Ropar.jpg"
          title="Contemplative Reptile"
        />
        {/* </CardActionArea> */}
        </Card>
    {/* <ListItem button onClick={()=>{
                    setForm(3)
                }}>
      <ListItemIcon>
        <Filter4Icon />
      </ListItemIcon>
      <ListItemText primary="Suture Materials" />
    </ListItem>
    <ListItem button onClick={()=>{
                    setForm(4)
                }}>
      <ListItemIcon>
        <Filter5Icon />
      </ListItemIcon>
      <ListItemText primary="Drugs/Medicines" />
    </ListItem> */}
  </div></List>
        {/* <Divider />
        <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
{form===0? 
  <div>
    <Grid item xs={12}>
      {/* <Paper className={classes.paper}> */}
          <CollapsibleTable />
        {/* <FormA docnumber={props.match.params.docnumber} user={props.location.user} stage={props.location.stage} nurseflag={nurseflag} perflag={perflag} techflag={techflag}/> */}
      {/* </Paper>   */}
    </Grid>
  </div>
          :
          ""
}
{form===1?
  <div>
    <Grid item xs={12}>
      <Title>{readable[props.location.stage]}</Title>
      <Paper>
        {/* <Deposits docnumber={props.match.params.docnumber}/> */}
      </Paper>
    </Grid>
    <br></br>
    <Grid item xs={12}>
      <Title>{readable[props.location.stage]}</Title>
      {/* <Paper className={classes.paper}> */}
        {/* <FormB docnumber={props.match.params.docnumber} user={props.location.user} stage={props.location.stage} nurseflag={nurseflag} perflag={perflag} techflag={techflag}/> */}
        <AddPatient />
      {/* </Paper> */}
    </Grid>
  </div>
:""}
{form===2?
    <div>
    <Grid item xs={12}>
      {/* <Title>Add Request</Title> */}
      
        {/* <FormB docnumber={props.match.params.docnumber} user={props.location.user} stage={props.location.stage} nurseflag={nurseflag} perflag={perflag} techflag={techflag}/> */}
        <AddRequest />
      
    </Grid>
  </div>
:""}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}