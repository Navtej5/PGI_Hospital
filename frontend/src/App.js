
import './App.css';
import Login from './login/login.js';
import User from './user/user.js';
import AddPatient from './user/addPatient.js';
import AddRequest from './user/addRequest.js';
import Routes from './routes';
import React, { useState,useEffect } from "react";
import {BrowserRouter as Router,Route,Switch,Link,Redirect} from "react-router-dom";
import PatientDetails from './patient/patientDetails';
import ViewRequest from './user/viewRequest';
import CardiacForm from './patient/cardiacforms';
import Dashboard from './user/dashboard/Dashboard';
import ManagerDashboard from './user/unitmanager/ManagerDashboard';
import CardiacForm_um from './user/unitmanager/cardiacforms_um';
import ReturnedCardiacForm from './patient/returnedcardiacform';
import ProductsTblPage from './user/sorttable';
function App() {
  const [nurse, setNurse] = useState("false");
  const [consultant,setConsultant] = useState("false");
  const [unitman,setUnitman]=useState("false");
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser==="Nurse") {
      //const foundUser = JSON.parse(loggedInUser);
      //console.log(loggedInUser["user"]["category"])
      console.log(loggedInUser)
      setNurse("true");
    }else if(loggedInUser==="Consultant"){
      console.log("Consultant");
      setConsultant("true");
    }
    else if(loggedInUser==="Unitman"){
      console.log("Unitman");
      setUnitman("true");
    }
    else{
      console.log("nope")
    }
  }, []);
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Login}/>
      {/* <Route exact path="/user" component={User} /> */}
      {nurse ? (
          <Route exact path="/user" component={User} />
        ) : (
          <Redirect to="/" />
        )}
      {/* <Route exact path={"/user"} component={User}/> */}
      {consultant ? (
          <Route path={"/consultantDash"} component={Dashboard}/>
        ) : (
          <Redirect to="/" />
        )}
      {unitman ? (
          <Route path={"/unitmanDash"} component={ManagerDashboard}/>
        ) : (
          <Redirect to="/" />
        )}
      <Route exact path={"/addpatient"} component={AddPatient}/>
      <Route exact path={"/addrequest"} component={AddRequest}/>
      <Route exact path={"/view_request"} component={ViewRequest}/>
      <Route path={"/patientdetails/"} component={PatientDetails}/>
      <Route path={"/form/:docnumber"} component={CardiacForm}/>
      
      
      <Route path={"/cardiacform_um/:docnumber"} component={CardiacForm_um}/>
      <Route path={"/returned/:docnumber"} component={ReturnedCardiacForm}/>
      <Route exact path={"/table"} component={ProductsTblPage}/>
      </Switch>

    </Router>
  );
}

export default App;
