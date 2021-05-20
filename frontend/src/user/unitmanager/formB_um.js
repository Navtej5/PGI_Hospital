import React, {Component,useState,useEffect} from "react";
// import {Row} from "simple-flexbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {Link, useHistory } from "react-router-dom"; 
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import styled from 'styled-components';
// import { useLocation } from "react-router";
// import Checkbox from "@material-ui/core/Checkbox";
import {myvar} from '../user.js';
import axios from 'axios';

// const myvar2 = 200;


// const Input = styled.input`
//   border-radius: 4px;
//   border: solid 1px #a8a8a8;
//   background-color: #ffffff;
//   margin-top: 10px;
//   padding: 5px;
//   &:focus{
//   outline: none;
//   border: solid 2px #0052cc;
//   `;


// function createData(id,name,descr,brand,qty){
//     return {id,name,descr,brand,qty};
// }



export default function FormB_um(props) {
    const SUBMIT_FORM_API = 'https://pgi-backend.herokuapp.com/api/update-cardiac-supplied-formb/'+props.docnumber;
    const GET_COMBINED_API = "https://pgi-backend.herokuapp.com/api/combined-form/"+props.docnumber;
    const [rows, setRows] = React.useState([]);
    const [qtySupplied, setQtySupplied] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    const [qtyRcdPharma,setQtyRcdPharma] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    const [verified,setVerified] = useState({'1':false,'2A':false,'2B':false,'3A':false,'3B':false,'3C':false,'3D':false})
    const [remarkfc,setreamarkfc]=React.useState("_")
    // const [rows2,setRows2] = useState(null);
    // var rows2;
    function BooltoCharfunction(var1){
        if(var1){
            return "T";
        }
        else{
            return "F";
        }
    }

    let history = useHistory();
    const fetchData = async () => {
        console.log("in formB_um\nmode=",props.mode,"\nstage:",props.stage,"\nuser=",props.user)
        console.log("in fetch");
        const response = await axios.get(GET_COMBINED_API)
        // const response = await fetch(apiURL);
        const form = await response.data;
        // console.log("see here bruh : "+books[0].createdby);
        // books[0].createdby = "atul op";
        // axios.patch(updateURL+"199/",books[0]);
        console.log("response\n",form);

        var x;
        var temp = [];
        var ids = ['1','2A','2B','3A','3B','3C','3D'];
        for (x = 0; x < ids.length; x++){
            
            var col1 = "B_"+ids[x]+"_name";
            var col2 = "B_"+ids[x]+"_descr";
            var col3 = "B_"+ids[x]+"_brand";
            var col4 = "B_"+ids[x]+"_qty";
            var col5 = "B_"+ids[x]+"_qty_rcd";
            var col6 = "B_"+ids[x]+"_tally_unitman";
            var id = ids[x];
            var name = form["**Requested**"][0][col1];
            var descr = form["**Requested**"][0][col2];
            var brand = form["**Requested**"][0][col3];
            var qty_requested= form["**Requested**"][0][col4];
            var tallyunitman=false;
            if(form["**Supplied**"][0][col6]=='T'){
                tallyunitman=true;
                setVerified(verified => (
                    {...verified,[id]:true}
                ));
            }
            else{
                tallyunitman=false;
            }
            if(form["**Supplied**"].length>0){
                var qty_supplied = form["**Supplied**"][0][col4];
                var qty_from_pharma = form["**Supplied**"][0][col5];
            }
            else{
                var qty_supplied = 0;
                var qty_from_pharma = 0;
            }
            setQtySupplied(qtySupplied => (
                {...qtySupplied, [id]: qty_supplied}
            ));
            setQtyRcdPharma(qtyRcdPharma => (
                {...qtyRcdPharma,[id]:qty_from_pharma}
            ));
            temp.push({id,name,descr,brand,qty_requested,qty_supplied,qty_from_pharma});
            // console.log("id = ",id,"  qty_requested = ",qty_requested, "qty_supplied=",qty_supplied)
        }
        setRows(temp);
        // console.log("temp==>\n",temp);
        // console.log("rows===>\n",rows);
    }

    // console.log("globe");
    useEffect(()=>{
        // console.log("in use effect");  
        fetchData();
      // getPatientList()
    },[])

    const SUBMIT_REQUEST_API = 'https://pgi-backend.herokuapp.com/api/update-request-remarks/'
    var temp;
    const fetchreq = async () => {
        temp = await axios.get(SUBMIT_REQUEST_API+props.docnumber);
        setreamarkfc(temp.data.remarksfromconsultant);
        console.log(temp.data.remarksfromconsultant," ===== ",remarkfc);
    }
    const patchreq = async () => {
        temp = await axios.get(SUBMIT_REQUEST_API+props.docnumber);
        temp.data.remarksfromconsultant = remarkfc;
        temp.data.notificationbit = true;
        temp.data.state = 'Filling';
        temp.data.nurseflag="F";
        console.log(remarkfc,"see here u  :::::::::: ", temp.data.department)
        await axios.put(SUBMIT_REQUEST_API+props.docnumber,temp.data);
        history.goBack()
    }
    useEffect(() => {
        // console.log(myvar);
        fetchreq();
    },[]);

    // const [B_1_remarks,setB_1_remarks]=React.useState("_")
    // const [B_2A_remarks,setB_2A_remarks]=React.useState("_")
    // const [B_2B_remarks,setB_2B_remarks]=React.useState("_")
    // const [B_3A_remarks,setB_3A_remarks]=React.useState("_")
    // const [B_3B_remarks,setB_3B_remarks]=React.useState("_")
    // const [B_3C_remarks,setB_3C_remarks]=React.useState("_")
    // const [B_3D_remarks,setB_3D_remarks]=React.useState("_")

    return(

        props.mode == "view_only" ?
            
            <div>    
            <Table> {//style={{marginTop:"-350px",marginLeft:"400px",width:"650px",color:"white"}}>}
        }
                <TableHead>
                    <TableRow>
                        <TableCell style={{color:"black"}}>
                            Sr. No.
                        </TableCell>
                        <TableCell style={{color:"black"}}>
                            Name
                        </TableCell>
                        <TableCell style={{color:"black"}}>
                            Specification
                        </TableCell>
                        <TableCell style={{color:"black"}}>
                            Company Name
                        </TableCell>
                        <TableCell style={{color:"black"}}>
                            Quantity Required
                        </TableCell>
                        
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.length>0 ? 
                    rows.map((row,index) => ( 
                        <TableRow key={index}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.descr}</TableCell>
                        <TableCell>{row.brand}</TableCell>
                        <TableCell>{row.qty_requested}</TableCell>   
                        </TableRow>
                     ))
                : ""}


                </TableBody>
            </Table>
            {props.stage=="Pending"?
            <div style={{padding:"10px"}}>
                <Grid container >
                    <Grid item xs={10}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Remarks"
                        style={{width:"95%"}}
                        multiline
                        rows={4}
                        // cols={12}
                        // defaultValue="Default Value"
                        placeholder="enter comments/remarks"
                        variant="outlined"
                        value={remarkfc}
                        onChange={event => setreamarkfc(event.target.value)}
                    />
                    </Grid>
                
                <Grid item xs={2} style={{padding:"3.5%"}}>
                <Button 
                style={{padding:"10px"} }
                variant="contained" color="primary"
                    onClick={()=>(
                        
                        console.log("********** SUBMIT ***********")
                        ,patchreq()
                    )}
                >Suggest Edit</Button>
                </Grid>
            </Grid>
            </div>
            :""}
            </div>
:

//************************************************************************************************************************
//*************************************************************************************Part for read-write mode starts now

<div>
                
                <Table> {//style={{marginTop:"-350px",marginLeft:"400px",width:"650px",color:"white"}}>}
            }
                    <TableHead>
                        <TableRow>
                            <TableCell style={{color:"black"}}>
                                Sr. No.
                            </TableCell>
                            <TableCell style={{color:"black"}}>
                                Name
                            </TableCell>
                            <TableCell style={{color:"black"}}>
                                Specification
                            </TableCell>
                            <TableCell style={{color:"black"}}>
                                Company Name
                            </TableCell>
                            <TableCell style={{color:"black"}}>
                                Quantity Required
                            </TableCell>
                            <TableCell>
                                Quantity Received From Pharmacy
                            </TableCell>
                            <TableCell>
                                Quantity Supplied To Dept
                            </TableCell>
                            {props.user=="unitman" && props.stage!="completed"?
                            <TableCell>
                                Verfication done?
                            </TableCell>
                            :""}
                            {/* <TableCell style={{color:"black"}}>
                                Remarks
                            </TableCell> */}
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.length>0 ? 
                        rows.map((row,index) => ( 
                            <TableRow key={index}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.descr}</TableCell>
                            <TableCell>{row.brand}</TableCell>
                            <TableCell>{row.qty_requested}</TableCell>
                            {props.user=="unitman" && props.stage!="completed"?
                                <TableCell>
                                    <input 
                                    type="number" name={row.id} 
                                    value={
                                        qtyRcdPharma[row.id]
                                    }
                                    min='0'
                                    default={9}
                                    onChange={(event)=>{
                                        setQtyRcdPharma(qtyRcdPharma => (
                                            {...qtyRcdPharma, [event.target.name]: event.target.value}
                                        ));
                                    }}
                                    >
                                    </input>
                                </TableCell>
                            :
                                <TableCell>
                                    <input disabled
                                    type="number" name={row.id} 
                                    value={
                                        qtyRcdPharma[row.id]
                                    }
                                    min='0'
                                    default={9}
                                    onChange={(event)=>{
                                        setQtyRcdPharma(qtyRcdPharma => (
                                            {...qtyRcdPharma, [event.target.name]: event.target.value}
                                        ));
                                    }}
                                    >
                                    </input>
                                </TableCell>
                            }
                            {props.user=="unitman" && props.stage!="completed"?
                                <TableCell>
                                    <input 
                                    type="number" name={row.id} 
                                    value={
                                        qtySupplied[row.id]
                                    }
                                    min='0'
                                    default={9}
                                    onChange={(event)=>{
                                        setQtySupplied(qtySupplied => (
                                            {...qtySupplied, [event.target.name]: event.target.value}
                                        ));
                                    }}
                                    >
                                    </input>
                                </TableCell>
                            : 
                                <TableCell>
                                    <input disabled
                                    type="number" name={row.id} 
                                    value={
                                        qtySupplied[row.id]
                                    }
                                    min='0'
                                    default={9}
                                    onChange={(event)=>{
                                        setQtySupplied(qtySupplied => (
                                            {...qtySupplied, [event.target.name]: event.target.value}
                                        ));
                                    }}
                                    >
                                    </input>
                                </TableCell>
                            }


                            {props.user=="unitman" && props.stage!="completed"?
                                <TableCell>
                                    <Checkbox 
                                        checked={verified[row.id]}
                                        // value={row.tallyunitman}
                                        onChange={(event)=>{
                                            setVerified(verified => (
                                                {...verified,[row.id]:event.target.checked}
                                            ));
                                            console.log("row.id",row.id,event.target.checked,row.tallyunitman);
                                        }}
                                    />
                                </TableCell>
                            :
                                ""
                            }
                            </TableRow>
                        ))
                    :""}
                    </TableBody>
                </Table>
        {props.user=="unitman" && props.stage!="completed"?
            <Button variant="contained" color="primary"
            onClick={()=>(
                console.log("******submitting*********")
                ,fetch(SUBMIT_FORM_API,
                    {
                        // credentials: 'include',
                        credentials: 'omit',
                        method:'PATCH',
                        headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                    },
                        body: JSON.stringify({
                            code         : myvar,
                            B_1_qty      :qtySupplied['1'],
                            // B_1_remarks  :B_1_remarks,
                            B_2A_qty      :qtySupplied['2A'],
                            // B_2A_remarks  :B_2A_remarks,
                            B_2B_qty      :qtySupplied['2B'],
                            // B_2B_remarks  :B_2B_remarks,
                            B_3A_qty      :qtySupplied['3A'],
                            // B_3A_remarks  :B_3A_remarks,
                            B_3B_qty      :qtySupplied['3B'],
                            // B_3B_remarks  :B_3B_remarks,
                            B_3C_qty      :qtySupplied['3C'],
                            // B_3C_remarks  :B_3C_remarks,
                            B_3D_qty      :qtySupplied['3D'],
                            // B_3D_remarks  :B_3D_remarks,
                            B_1_qty_rcd      :qtyRcdPharma['1'],
                            B_2A_qty_rcd      :qtyRcdPharma['2A'],
                            B_2B_qty_rcd      :qtyRcdPharma['2B'],
                            B_3A_qty_rcd      :qtyRcdPharma['3A'],
                            B_3B_qty_rcd      :qtyRcdPharma['3B'],
                            B_3C_qty_rcd      :qtyRcdPharma['3C'],
                            B_3D_qty_rcd      :qtyRcdPharma['3D'],
                            
                            B_1_tally_unitman      :BooltoCharfunction(verified['1']),
                            B_2A_tally_unitman      :BooltoCharfunction(verified['2A']),
                            B_2B_tally_unitman      :BooltoCharfunction(verified['2B']),
                            B_3A_tally_unitman      :BooltoCharfunction(verified['3A']),
                            B_3B_tally_unitman      :BooltoCharfunction(verified['3B']),
                            B_3C_tally_unitman      :BooltoCharfunction(verified['3C']),
                            B_3D_tally_unitman      :BooltoCharfunction(verified['3D']),                            
                        }),
                    })
                )}

                // .then((result)=>{store.addNotification({
                //     title: "Success",
                //     message: "Request added successfully",
                //     type: "success",
                //     insert: "top",
                //     container: "bottom-right",
                //     animationIn: ["animate_animated", "animate_fadeIn"],
                //     animationOut: ["animate_animated", "animate_fadeOut"],
                //     dismiss: {
                //       duration: 5000,
                //       onScreen: true
                //     }
                //   });console.log("Success===:",result)})
                // .catch((error)=>{store.addNotification({
                //     title: "Failed",
                //     message: "Request could not be added",
                //     type: "danger",
                //     insert: "top",
                //     container: "bottom-right",
                //     animationIn: ["animate_animated", "animate_fadeIn"],
                //     animationOut: ["animate_animated", "animate_fadeOut"],
                //     dismiss: {
                //       duration: 5000,
                //       onScreen: true
                //     }
                //   });console.log("Error===:",error)})
            >Save As Draft</Button>
        :""}
                {/* <div style={{padding:"10px"}}>
                    <Grid container >
                        <Grid item xs={10}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Remarks"
                            style={{width:"95%"}}
                            multiline
                            rows={4}
                            // cols={12}
                            // defaultValue="Default Value"
                            placeholder="enter comments/remarks"
                            variant="outlined"
                        />
                        </Grid>
                    
                    <Grid item xs={2} style={{padding:"3.5%"}}>
                    <Button 
                    style={{padding:"10px"} }
                    variant="contained" color="primary"
                        onClick={()=>(
                            
                            console.log("********** SUBMIT ***********")
                            ,console.log(JSON.stringify({
                                code         : myvar,
                                B_1_qty      :qtySupplied['1'],
                                // B_1_remarks  :B_1_remarks,
                                B_2A_qty      :qtySupplied['2A'],
                                // B_2A_remarks  :B_2A_remarks,
                                B_2B_qty      :qtySupplied['2B'],
                                // B_2B_remarks  :B_2B_remarks,
                                B_3A_qty      :qtySupplied['3A'],
                                // B_3A_remarks  :B_3A_remarks,
                                B_3B_qty      :qtySupplied['3B'],
                                // B_3B_remarks  :B_3B_remarks,
                                B_3C_qty      :qtySupplied['3C'],
                                // B_3C_remarks  :B_3C_remarks,
                                B_3D_qty      :qtySupplied['3D'],
                                // B_3D_remarks  :B_3D_remarks, 
                                B_1_qty_rcd      :qtyRcdPharma['1'],
                                B_2A_qty_rcd      :qtyRcdPharma['2A'],
                                B_2B_qty_rcd      :qtyRcdPharma['2B'],
                                B_3A_qty_rcd      :qtyRcdPharma['3A'],
                                B_3B_qty_rcd      :qtyRcdPharma['3B'],
                                B_3C_qty_rcd      :qtyRcdPharma['3C'],
                                B_3D_qty_rcd      :qtyRcdPharma['3D'],
                            }))
                            ,fetch(SUBMIT_FORM_API,
                                {
                                    // credentials: 'include',
                                    credentials: 'omit',
                                    method:'PATCH',
                                    headers: {
                                    Accept: 'application/json',
                                    "Content-Type": 'application/json',
                                },
                                    body: JSON.stringify({
                                        code         : myvar,
                                        B_1_qty      :qtySupplied['1'],
                                        // B_1_remarks  :B_1_remarks,
                                        B_2A_qty      :qtySupplied['2A'],
                                        // B_2A_remarks  :B_2A_remarks,
                                        B_2B_qty      :qtySupplied['2B'],
                                        // B_2B_remarks  :B_2B_remarks,
                                        B_3A_qty      :qtySupplied['3A'],
                                        // B_3A_remarks  :B_3A_remarks,
                                        B_3B_qty      :qtySupplied['3B'],
                                        // B_3B_remarks  :B_3B_remarks,
                                        B_3C_qty      :qtySupplied['3C'],
                                        // B_3C_remarks  :B_3C_remarks,
                                        B_3D_qty      :qtySupplied['3D'],
                                        // B_3D_remarks  :B_3D_remarks,
                                        B_1_qty_rcd      :qtyRcdPharma['1'],
                                        B_2A_qty_rcd      :qtyRcdPharma['2A'],
                                        B_2B_qty_rcd      :qtyRcdPharma['2B'],
                                        B_3A_qty_rcd      :qtyRcdPharma['3A'],
                                        B_3B_qty_rcd      :qtyRcdPharma['3B'],
                                        B_3C_qty_rcd      :qtyRcdPharma['3C'],
                                        B_3D_qty_rcd      :qtyRcdPharma['3D'],
                                    }),
                                })
                            )}
                    
                    >Submit</Button>
                    </Grid>
                </Grid>
                </div> */}
                </div>
        
        )
    }
