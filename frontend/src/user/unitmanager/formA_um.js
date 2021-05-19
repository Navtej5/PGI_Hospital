import React, {Component,useState,useEffect} from "react";
// import {Row} from "simple-flexbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import {Link, useHistory } from "react-router-dom";
// import Select from "@material-ui/core/Select";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import { Multiselect } from 'multiselect-react-dropdown';
import { createBrowserHistory } from 'history';
// import { useLocation } from "react-router";
// import { store } from 'react-notifications-component';
import axios from 'axios';
import {myvar} from '../user.js';

// const history = createBrowserHistory({forceRefresh:true});

const Input = styled.input`
  border-radius: 4px;
  border: solid 1px #a8a8a8;
  background-color: #ffffff;
  margin-top: 10px;
  padding: 5px;
  &:focus{
  outline: none;
  border: solid 2px #0052cc;
  `;


// const myvar2 = 200


export default function FormA_um(props) {
    const SUBMIT_FORM_API = 'http://127.0.0.1:8000/api/update-cardiac-supplied-forma/'+props.docnumber;
    const GET_COMBINED_API = "http://127.0.0.1:8000/api/combined-form/"+props.docnumber;
    const [rows, setRows] = React.useState([]);
    const [qtySupplied, setQtySupplied] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    const [qtyRcdPharma,setQtyRcdPharma] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    const [qtyConsumed, setQtyConsumed] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    const [verified,setVerified] = useState({'1':false,'2A':false,'2B':false,'3A':false,'3B':false,'3C':false,'3D':false})
    const [remarkfc,setreamarkfc]=React.useState("_")
    let history = useHistory();

    function BooltoCharfunction(var1){
        if(var1){
            return "T";
        }
        else{
            return "F";
        }
    }

    const fetchData = async () => {
        console.log("in formA_um\nmode=",props.mode,"\nstage:",props.stage,"\nuser=",props.user)
        console.log("in fetch");
        const response = await axios.get(GET_COMBINED_API)
        const form = await response.data;
        console.log("response\n",form);
        
        var x;
        var temp = [];
        var ids = ['1','2A','2B','3A','3B']
        for (x = 0; x < ids.length; x++){    
            var col1 = "A_"+ids[x]+"_name";
            var col2 = "A_"+ids[x]+"_descr";
            var col3 = "A_"+ids[x]+"_brand";
            var col4 = "A_"+ids[x]+"_qty";
            var col5 = "A_"+ids[x]+"_qty_rcd";
            var col6 = "A_"+ids[x]+"_tally_unitman";
            var col7 = "A_"+ids[x]+"_consumed";
            var id = ids[x];
            var name = form["**Requested**"][0][col1];
            var descr = form["**Requested**"][0][col2];
            var brand = form["**Requested**"][0][col3];
            var qty_requested= form["**Requested**"][0][col4];
            var qty_received = form["**Supplied**"][0][col4];
            var qty_consumed = form["**Supplied**"][0][col7];
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
            setQtyConsumed(qtyConsumed => (
                {...qtyConsumed, [id]: qty_consumed}
            ));
            temp.push({id,name,descr,brand,qty_requested,qty_supplied,qty_from_pharma,qty_received,tallyunitman});
            console.log("id = ",id,"  qty_requested = ",qty_requested, "qty_received=",qty_received,"qty_consumed",qtyConsumed[id])
        }
        setRows(temp);
        // console.log("temp==>\n",temp);
        // console.log("rows===>\n",rows);
    }

    // console.log("globe");
    useEffect(()=>{
        // console.log("in use effect");  
        fetchData();
    },[])


    
    const SUBMIT_REQUEST_API = 'http://127.0.0.1:8000/api/update-request-remarks/'
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


    return(
        <div>
        {
        props.stage=="Completed"?
        
        <div>
        <Table>
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
                    <TableCell style={{color:"black"}}>
                        Quantity Received
                    </TableCell>
                    <TableCell style={{color:"black"}}>
                        Quantity Consumed
                    </TableCell>
                    <TableCell style={{color:"black"}}>
                        Balance (negative value indicates more than supplied used)
                    </TableCell>
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
                        <TableCell>{row.qty_received}</TableCell>   
                        <TableCell>
                            <input disabled
                            type="number" name={row.id} min="0"
                            value={qtyConsumed[row.id]}
                            default={9}
                            onChange={(event)=>{
                                setQtyConsumed(qtyConsumed => (
                                    {...qtyConsumed, [row.id]: event.target.value}
                                ));
                            }}
                            >
                            </input>
                        </TableCell>
                        
                        {row.qty_received -qtyConsumed[row.id] < 0?
                        <TableCell style={{background:"#fc6456"}}>{row.qty_received -qtyConsumed[row.id]}</TableCell>
                        :""}
                        {row.qty_received -qtyConsumed[row.id]  > 0?
                        <TableCell style={{background:"yellow"}}>{row.qty_received -qtyConsumed[row.id]}</TableCell>
                        :""}
                        {row.qty_received -qtyConsumed[row.id]  == 0?
                        <TableCell style={{background:"#23ff4f"}}>{row.qty_received -qtyConsumed[row.id]}</TableCell>
                        :""}

                        {/* <TableCell></TableCell> */}
                        </TableRow>
                    ))
                : ""}

                    
                    </TableBody>
                </Table>    
            </div>
        :

        props.mode == "view_only" && (props.stage=="ReceivedByNurse" || props.stage=="Ready" || props.stage=="OperationDone") ?
        
            <div> 
            <Table>
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
                        <TableCell style={{color:"black"}}>
                            Quantity Received
                        </TableCell>
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
                                <TableCell>{row.qty_received}</TableCell>
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
                            placeholder="enter comments/remarks"
                            variant="outlined"
                            value={remarkfc}
                            onChange={event => setreamarkfc(event.target.value)}
                        ></TextField>

                    </Grid>
                    <Grid item xs={2} style={{padding:"3.5%"}}>

                    <Button variant="contained" color="primary"
                        onClick={()=>{
                            console.log("******submitting*********");
                            if (window.confirm('Are you sure you want to send back this form for correction?')){patchreq();}
                        }}
                    >Suggest Edit</Button>
                    </Grid>
                </Grid>
            </div>
            :""}
        </div>
        
        :
        
        props.mode == "view_only" ?
        
        <div> 
            <Table>
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
                        {/* <TableCell style={{color:"black"}}>
                            Quantity Supplied
                        </TableCell> */}
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
                            placeholder="enter comments/remarks"
                            variant="outlined"
                            value={remarkfc}
                            onChange={event => setreamarkfc(event.target.value)}
                        ></TextField>

                    </Grid>
                    <Grid item xs={2} style={{padding:"3.5%"}}>

                    <Button variant="contained" color="primary"
                        onClick={()=>{
                            console.log("******submitting*********");
                            if (window.confirm('Are you sure you want to send back this form for correction?')){patchreq();}
                        }}
                    >Suggest Edit</Button>
                    </Grid>
                </Grid>
            </div>
            :""}
        </div>
    
        :
        
        props.mode == "read_write_both"?
        <div>
                        
        <Table>
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
                    <TableCell style={{color:"black"}}>
                        Quantity Received from Pharmacy
                    </TableCell>
                    <TableCell style={{color:"black"}}>
                        Quantity Supplied to Dept
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
                            type="number" name={row.id} min="0"
                            value={
                                qtyRcdPharma[row.id]
                            }
                            default={9}
                            onChange={(event)=>{
                                setQtyRcdPharma(qtyRcdPharma => (
                                    {...qtyRcdPharma, [event.target.name]: event.target.value}
                                ));
                                Input.backgroundColor = 'blue';
                            }}
                            >
                            </input>
                        </TableCell>
                    :
                        <TableCell>
                            <input disabled
                            type="number" name={row.id} min="0"
                            value={
                                qtyRcdPharma[row.id]
                            }
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

                    {props.user=="unitman"  && props.stage!="completed"?
                        <TableCell>
                            <input 
                            type="number" name={row.id} min="0"
                            value={
                                qtySupplied[row.id]
                            }
                            default={9}
                            onChange={(event)=>{
                                setQtySupplied(qtySupplied => (
                                    {...qtySupplied, [event.target.name]: event.target.value}
                                ));
                               Input.backgroundColor = 'blue';
                            }}
                            >
                            </input>
                        </TableCell>
                    :
                        <TableCell>
                            <input disabled
                            type="number" name={row.id} min="0"
                            value={
                                qtySupplied[row.id]
                            }
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
                    :""}


                    </TableRow>
                ))
            : ""}

                
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
                            A_1_qty      :qtySupplied['1'],
                            A_2A_qty      :qtySupplied['2A'],
                            A_2B_qty      :qtySupplied['2B'],
                            A_3A_qty      :qtySupplied['3A'],
                            A_3B_qty      :qtySupplied['3B'],
                            A_1_qty_rcd      :qtyRcdPharma['1'],
                            A_2A_qty_rcd      :qtyRcdPharma['2A'],
                            A_2B_qty_rcd      :qtyRcdPharma['2B'],
                            A_3A_qty_rcd      :qtyRcdPharma['3A'],
                            A_3B_qty_rcd      :qtyRcdPharma['3B'],
                            
                            A_1_tally_unitman      :BooltoCharfunction(verified['1']),
                            A_2A_tally_unitman      :BooltoCharfunction(verified['2A']),
                            A_2B_tally_unitman      :BooltoCharfunction(verified['2B']),
                            A_3A_tally_unitman      :BooltoCharfunction(verified['3A']),
                            A_3B_tally_unitman      :BooltoCharfunction(verified['3B']),
                        }),
                    })
                )}
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

                <Button variant="contained" color="primary"
                    onClick={()=>(
                        console.log("******submitting*********")
                        ,console.log(JSON.stringify({
                            code         : myvar,
                            A_1_qty      :qtySupplied['1'],
                            // A_1_remarks  :A_1_remarks,
                            A_2A_qty      :qtySupplied['2A'],
                            // A_2A_remarks  :A_2A_remarks,
                            A_2B_qty      :qtySupplied['2B'],
                            // A_2B_remarks  :A_2B_remarks,
                            A_3A_qty      :qtySupplied['3A'],
                            // A_3A_remarks  :A_3A_remarks,
                            A_3B_qty      :qtySupplied['3B'],
                            // A_3B_remarks  :A_3B_remarks, 
                            A_1_qty_rcd      :qtyRcdPharma['1'],
                            A_2A_qty_rcd      :qtyRcdPharma['2A'],
                            A_2B_qty_rcd      :qtyRcdPharma['2B'],
                            A_3A_qty_rcd      :qtyRcdPharma['3A'],
                            A_3B_qty_rcd      :qtyRcdPharma['3B'],

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
                                    A_1_qty      :qtySupplied['1'],
                                    // A_1_remarks  :A_1_remarks,
                                    A_2A_qty      :qtySupplied['2A'],
                                    // A_2A_remarks  :A_2A_remarks,
                                    A_2B_qty      :qtySupplied['2B'],
                                    // A_2B_remarks  :A_2B_remarks,
                                    A_3A_qty      :qtySupplied['3A'],
                                    // A_3A_remarks  :A_3A_remarks,
                                    A_3B_qty      :qtySupplied['3B'],
                                    // A_3B_remarks  :A_3B_remarks,
                                    A_1_qty_rcd      :qtyRcdPharma['1'],
                                    A_2A_qty_rcd      :qtyRcdPharma['2A'],
                                    A_2B_qty_rcd      :qtyRcdPharma['2B'],
                                    A_3A_qty_rcd      :qtyRcdPharma['3A'],
                                    A_3B_qty_rcd      :qtyRcdPharma['3B'],
                                }),
                            })
                        )}
                >Submit</Button>
                </Grid>
            </Grid>
        </div> */}
        </div>
        
        :
        ""}
    </div>)
}