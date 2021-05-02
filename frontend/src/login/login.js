import React, {Component} from "react";
import styled from 'styled-components';
import Table from "@material-ui/core/Table";
import {Link, Redirect} from "react-router-dom";
import logo from '.././logo.svg';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory({forceRefresh:true});
var token;
const Input=styled.input`
  width:100%;
  height: 35px;
  border-radius: 4px;
  border: solid 1px #a8a8a8;
  margin-bottom:18px;
  margin-left:-12px;
  font-size:13px;
  color:#454545;
  font-family:roboto;
  padding:10px;
  &:focus{
    outline:none;
    border:solid 2px #0052cc;
    }

`;

const Button=styled.button`
  width: 100%;
  height: 35px;
  border-radius: 4px;
  font-size: 12px;
  background-color: #0052cc;
  margin-bottom:30px;
  border:none;
  text-align:center;
  color:#ffffff;
  `;

const HorizontalLine=styled.hr`
  width: 100%;
  border: solid 1px #e8e8e8;
  `;

const LoginToAccount=styled.h1`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
  color: #454545;
 display: flex;
 justify-content: center;
 padding-bottom: 20px;
`;

const LoginBox=styled.div`
  max-width: 335px;
  width:auto;
  padding-left:35px;
  padding-right:35px;
  padding-top: 25px;
  margin:auto;
  border-radius: 4px;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #e2e2e2;
  background-color: #ffffff;
  `;


export default class Login extends Component{

  state = {
    username:"",
    password:"",
    user:{},
  }


  validate=async()=> {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.state.username,password:this.state.password })
  };
    let USER_TABLE_API='http://127.0.0.1:8000/api/login'
    const response=await fetch(USER_TABLE_API,requestOptions);
    const _data=await response.json();
    if(_data.hasOwnProperty("non_field_errors")){
      alert("Username or Password Incorrect")
    }
    else{
      this.setState({user:response.data});
  // store the user in localStorage
  console.log(_data);
    localStorage.setItem('user', _data["user"]["category"]);
    //console.log(_data);
      token=_data["token"];
      //console.log(_data);
      if(_data["user"]["category"]=="Nurse"){
        // (<Redirect to="/user" />)
           history.push({
             pathname: '/user',
             state: { detail: _data['token'] }
         });
        console.log("yoo");
      }
      else if(_data["user"]["category"]=="Consultant"){
        history.push("/consultantDash");
      }
      else if(_data["user"]["category"]=="Unitman"){
        history.push("/unitmanDash");
      }
      else{
        alert("Category of the user invalid")
      }
    }
    // console.log(data["non_field_errors"]);
    // //if(data["non_field_error"]="")
    // console.log(data["user"]["category"]);
    
  } 
    render()
    {
        return (
            <>
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{marginTop:"-470px",marginLeft:"-38px",width:"50px",height:"50px"}} className="App-logo" alt="logo" />
      </header>
    </div>

            <div style={{margin:'auto',marginTop: '-600px',
  marginBottom: '40px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'50px'}} className="montserrat"><span style={{color:'#999997'}} className='montserrat'>PGI</span><span className='montserrat' style={{color:'#005CA8'}}>MER</span></div>

            <LoginBox style={{marginTop:"-40px"}}>
                <LoginToAccount>Log in to your account</LoginToAccount>
                <Input
                    id="email"
                    type="text"
                    placeholder="Username"
                    onChange={(event)=>{
                      this.setState({username:event.target.value})
                    }}                
                />
                <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={(event)=>{
                      this.setState({password:event.target.value})
                    }}                
                />

                <Button
                onClick={()=>{this.validate()}}
                >Log in</Button>
                <HorizontalLine></HorizontalLine>

            </LoginBox>

            </>
        )
    }
} 
export {token};
