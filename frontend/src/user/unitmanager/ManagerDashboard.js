import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { createBrowserHistory } from 'history';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
// import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
//////////
// import { mainListItems, secondaryListItems, lischoose } from './listItems';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Title from './Title';

// import Chart from './Chart';
// import Deposits from './Deposits';
import Approved from './Approved';
import Completed from '../dashboard/Completed.js';
import SentToPharma from "./Sent_to_pharma";
import ReceivedFromPharma from "./received_from_pharma";
// import Orders from './Pending';
import Switch from "react-switch";
const history = createBrowserHistory({forceRefresh:true});


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
    // position: 'fixed', 
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

export default function ManagerDashboard() {
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
  const logout=(async)=>{
    localStorage.clear();
    history.push("/");
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
            UNIT MANAGER PAGE 
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
                      
                      <ListItem button onClick={()=>{ setChoose(0) }} selected={choose==0}>
                        <ListItemIcon>
                        <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Approved" />
                      </ListItem>
                      {/* <SwitchExample /> */}
                      
                      <ListItem button onClick={()=>{ setChoose(1) }} selected={choose==1}>
                        <ListItemIcon>
                          <AssignmentIcon />
                          {/* <PeopleIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Sent to Pharmacy" />
                      </ListItem>
                      <ListItem button onClick={()=>{ setChoose(2) }} selected={choose==2}>
                        <ListItemIcon>
                          <AssignmentIcon />
                          {/* <PeopleIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Received from Pharmacy" />
                      </ListItem>
                      <ListItem button onClick={()=>{ setChoose(3) }} selected={choose==3}>
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
        <Card className={classes.root}>
      {/* <CardActionArea> */}
        <CardMedia
          component="img"
          alt="IIT ROPAR"
          height="300"
          width="100"
          image="https://img.collegedekhocdn.com/media/img/institute/logo/IIT_Ropar.jpg"
          title="IIT Ropar"
        />
        </Card>
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {choose==0?
                  <div>
                    <Title>Approved Requests</Title>
                      <Approved user="unitman"/>
                  </div>
                      
                  :""}
                  {choose==1?
                    <div>
                    <Title>Requests sent to pharmacy</Title>
                    <SentToPharma user="unitman"/>
                    </div>
                  :""}

                  {choose==2?
                    <div>
                    <Title>Received from Pharmacy (Audit Pending)</Title>
                    <ReceivedFromPharma user="unitman"/>
                    </div>
                  :""}
                  {choose==3?
                    <div>
                    <Title>Completed Requests</Title>
                    <Completed user="unitman"/>
                    </div>
                  :""}
                </Paper>
              </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
 
