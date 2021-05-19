import React from 'react';
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
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom' ;
//////////
// import { mainListItems, secondaryListItems, lischoose } from './listItems';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';

import Title from './Title'
import { createBrowserHistory } from 'history';
import Chart from './Chart';
// import Deposits from './Deposits';
import Approved from './Approved';
import Pending from './Pending';
import InProgress from './inprogress';
import Completed from './Completed';
import ReceivedByNurseCons from './ReceivedByNurseRequests';
// import Orders from './Pending';
import Switch from "react-switch";
import ReceivedFromPharma from '../unitmanager/received_from_pharma';
import SentToPharma from '../unitmanager/Sent_to_pharma';
import ReadyCons from './ReadyRequests';
import OperationDoneCons from './OperationDoneRequests';
const history = createBrowserHistory({forceRefresh:true});

const readable = {
  "Filling":"In Progress",
  "Pending":"Pending Approval",
  "Approved":"Approved by Consultant",
  "SentToPharma":"Inventory Ordered and Waiting for delivery",
  "ReceivedFromPharma":"Inventory Received by Unit Manager (Audit Pending)",
  "ReceivedByNurse":"Inventory Received by Nurse (Verification Pending)",
  "Ready":"Ready for Surgery/Operation",
  "OperationDone":"Post Operation Consumption Audit",
  "Completed":"Completed",
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        IIT Ropar
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
    height: '100%'
    // height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [choose,setChoose]=React.useState(0);
  const [checked,setChecked]=React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = ()  =>{
    setChecked(true);
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const logout=(async)=>{
    localStorage.clear();
    history.push("/");
  }
  const SwitchExample = () => {
    // render() {
      return (
        <label>
          <Switch button onChange={()=>{ setChecked(checked^1) }} checked={checked}/>
        </label>
      );
    // }
  }


  return (

    <div className={classes.root} style={{ background:"linear-gradient(45deg, lightblue , transparent)"}}>
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
          <Typography component="h1" variant="h6" color="inherit" align="center" noWrap className={classes.title}>
            CONSULTANT PAGE
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
           <Link to="/">
          <Button variant="contained" color="secondary" onclick={logout}>
            Logout
          </Button>
          
          </Link>
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
        {/* <List>{callmain}</List> */}

                  <div>
                      <ListItem button onClick={()=>{ setChoose(0) }} selected= {choose==0}>
                        <ListItemIcon>
                        <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={readable['Filling']} />
                      </ListItem>
                      
                      <ListItem button onClick={()=>{ setChoose(1) }} selected= {choose==1}>
                        <ListItemIcon>
                        <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary={readable['Pending']} />
                      </ListItem>
                      <ListItem button onClick={()=>{ setChoose(2) }} selected= {choose==2}>
                        <ListItemIcon>
                        <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary='Approved' />
                      </ListItem>

                      <ListItem button onClick={()=>{ setChoose(3) }} selected= {choose==3}>
                        <ListItemIcon>
                        <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sent to Pharmacy" />
                      </ListItem>

                      <ListItem button onClick={()=>{ setChoose(4) }} selected= {choose==4}>
                        <ListItemIcon>
                        <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Received from Pharmacy" />
                      </ListItem>

                      <ListItem button onClick={()=>{ setChoose(5) }} selected= {choose==5}>
                        <ListItemIcon>
                          <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Received By Nurse" />
                      </ListItem>

                      <ListItem button onClick={()=>{ setChoose(6) }} selected= {choose==6}>
                        <ListItemIcon>
                          <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ready for Surgery" />
                      </ListItem>
                      <ListItem button onClick={()=>{ setChoose(7) }} selected= {choose==7}>
                        <ListItemIcon>
                          <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Post Operation Audit" />
                      </ListItem>
                      <ListItem button onClick={()=>{ setChoose(8) }} selected= {choose==8}>
                        <ListItemIcon>
                          <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Completed" />
                      </ListItem>
                    </div>
  {/* {end here pasted one} */}
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* <Grid container spacing={3}> */}
            {/* <Chart/> */}
            {/* <Grid item xs={12} md={8} lg={9}> */}
              {/* <Paper className={fixedHeightPaper}> */}
                {/* <Chart /> */}
              {/* </Paper> */}
            {/* </Grid> */}
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid> */}
            {/* Recent Orders */}
            {/* <div > */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {/* {conditional_render(choose)} */}


                  {choose===0?
                      <div>
                        <Title>In Progress Requests</Title>
                        <InProgress user="consultant"/>
                      </div>
                  :""}
                  {choose===1?
                      <div>
                        <Title>Pending Requests</Title>
                        <Pending user="consultant"/>
                      </div>
                  :""}
                  {choose===2?
                      <div>
                        <Title>Approved Requests</Title>
                        <Approved user="consultant"/>
                      </div>
                  :""}
                  {choose===3?
                      <div>
                        <Title>{readable['SentToPharma']}</Title>
                        <SentToPharma user="consultant"/>
                      </div>
                  :""}
                  {choose===4?
                      <div>
                        <Title>{readable['ReceivedFromPharma']}</Title>
                        <ReceivedFromPharma user="consultant"/>
                      </div>
                  :""}
                  {choose===5?
                      <div>
                        <Title>{readable['ReceivedByNurse']}</Title>
                        <ReceivedByNurseCons user="consultant"/>
                      </div>
                  :""}
                  {choose===6?
                      <div>
                        <Title>{readable['Ready']}</Title>
                        <ReadyCons user="consultant"/>
                      </div>
                  :""}
                  {choose===7?
                      <div>
                        <Title>{readable['OperationDone']}</Title>
                        <OperationDoneCons user="consultant"/>
                      </div>
                  :""}
                  {choose===8?
                      <div>
                        <Title>Completed Requests</Title>
                        <Completed user="consultant"/>
                      </div>
                  :""}
                </Paper>
              </Grid>
            {/* </div> */}
          {/* </Grid> */}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
 
