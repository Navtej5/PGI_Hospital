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
import Completed from './Completed';
// import Orders from './Pending';
import Switch from "react-switch";
import ReceivedFromPharma from '../unitmanager/received_from_pharma';
import SentToPharma from '../unitmanager/Sent_to_pharma';
const history = createBrowserHistory({forceRefresh:true});
// class SwitchExample extends Component {
//   constructor() {
//     super();
//     this.state = { checked: false };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(checked) {
//     this.setState({ checked });
//   }

//   render() {
//     return (
//       <label>
//         <span>Switch with default style</span>
//         <Switch onChange={this.handleChange} checked={this.state.checked} />
//       </label>
//     );
//   }
// }

//////

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        PGI 
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
          {/* <span>Switch with default style</span> */}
          {/* <Switch onChange={handleChange} checked={checked} /> */}
          <Switch button onChange={()=>{ setChecked(checked^1) }} checked={checked}/>
        </label>
      );
    // }
  }


  return (

    <div className={classes.root} style={{ background:"linear-gradient(45deg, lightblue , transparent)"}}>



      {/*  */}
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
                      {/* <ListItem button onClick={lischoose = 1}>  */}
                      <ListItem button onClick={()=>{ setChoose(0) }} selected= {choose==0}>
                        <ListItemIcon>
                        <AssignmentIcon />
                          {/* <DashboardIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Pending Requests" />
                      </ListItem>
                      <ListItem button onClick={()=>{ setChoose(1) }} selected= {choose==1}>
                        <ListItemIcon>
                        <AssignmentIcon />
                          {/* <ShoppingCartIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Approved" />
                      </ListItem>

                      {/* <SwitchExample /> */}
                      <ListItem button onClick={()=>{ setChoose(2) }} selected= {choose==2}>
                        <ListItemIcon>
                        <AssignmentIcon />
                          {/* <ShoppingCartIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Sent to Pharmacy" />
                      </ListItem>

                      <ListItem button onClick={()=>{ setChoose(3) }} selected= {choose==3}>
                        <ListItemIcon>
                        <AssignmentIcon />
                          {/* <ShoppingCartIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Received from Pharmacy" />
                      </ListItem>

                      <ListItem button onClick={()=>{ setChoose(4) }} selected= {choose==4}>
                        <ListItemIcon>
                          <AssignmentIcon />
                          {/* <PeopleIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Completed" />
                      </ListItem>
                      {/*<ListItem button>
                        <ListItemIcon>
                          <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon>
                          <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Integrations" />
                      </ListItem> */}

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
                        <Title>Pending Requests</Title>
                        <Pending fromUser="consultant"/>
                      </div>
                  :""}
                  {choose===1?
                      <div>
                        <Title>Approved Requests</Title>
                        <Approved fromUser="consultant"/>
                      </div>
                  :""}
                  {choose===2?
                      <div>
                        <Title>Requests sent to pharmacy</Title>
                        <SentToPharma fromUser="consultant"/>
                      </div>
                  :""}
                  {choose===3?
                      <div>
                        <Title>Received from Pharmacy (Audit Pending)</Title>
                        <ReceivedFromPharma fromUser="consultant"/>
                      </div>
                  :""}
                  {choose===4?
                      <div>
                        <Title>Completed Requests</Title>
                        <Completed fromUser="consultant"/>
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
 
