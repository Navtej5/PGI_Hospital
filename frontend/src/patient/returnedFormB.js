import React, {Component,useState,useEffect} from "react";
// import {Row} from "simple-flexbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import { useLocation } from "react-router";
// import Checkbox from "@material-ui/core/Checkbox";
import {myvar} from '../user/user.js';
import axios from 'axios';

// const myvar2 = 200;
const SUBMIT_FORM_API = 'http://127.0.0.1:8000/api/update-cardiac-supplied-formb/'+myvar;
// const GET_FORM_API = "http://127.0.0.1:8000/api/get-cardiac-request-table/"+myvar;


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



export default function ReturnedFormB(props) {

    const GET_COMBINED_API = "http://127.0.0.1:8000/api/combined-form/"+props.docnumber;
    const [rows, setRows] = React.useState([]);
    const [qtySupplied, setQtySupplied] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    
    // const [rows2,setRows2] = useState(null);
    // var rows2;
    const fetchData = async () => {
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
        var ids = ['1','2A','2B','3A','3B','3C','3D']
        for (x = 0; x < ids.length; x++){
            
            var col1 = "B_"+ids[x]+"_name";
            var col2 = "B_"+ids[x]+"_descr";
            var col3 = "B_"+ids[x]+"_brand";
            var col4 = "B_"+ids[x]+"_qty";
            var col5 = "B_"+ids[x]+"_qty";
            var id = ids[x];
            var name = form["**Requested**"][0][col1];
            var descr = form["**Requested**"][0][col2];
            var brand = form["**Requested**"][0][col3];
            var qty_requested= form["**Requested**"][0][col4];
            var qty_supplied = form["**Supplied**"][0][col5];
            var difference = qty_supplied-qty_requested;
            setQtySupplied(qtySupplied => (
                {...qtySupplied, [id]: qty_supplied}
            ));

        //     // console.log(x,val1,val2,val3,val4);
            temp.push({id,name,descr,brand,qty_requested,qty_supplied,difference});
            console.log("id = ",id,"  qty_requested = ",qty_requested, "qty_supplied=",qty_supplied)
        }
        setRows(temp);


        // setRows2(temp);
        // rows2 = createData("x",'x','x','x','x');
        
        console.log("temp==>\n",temp);
        // console.log("length => ",temp.length);
        // console.log("first object =>\n",temp[0].val0,temp[0].val1,temp[0].val2,temp[0].val3,temp[0].val4);
        console.log("rows===>\n",rows);
        // console.log("rows2===>\n",rows2);
    }

    console.log("globe");
    useEffect(()=>{
        console.log("in use effect");  
        fetchData();
      // getPatientList()
    },[])


    function testhandle(var1){
        var str_3A="";
        var otherflag = false;
        for (const [key, value] of Object.entries(var1)) {
            if(key==='other'){
                if(value){
                    otherflag=true;
                }
                //console.log("hello",value);
            }
            else if(key==='otherval'){
                if(otherflag){
                    str_3A+=value;
                    str_3A+=";";
                }
            }
            else if(value){
                str_3A+=key;
                str_3A+=";";
            }
          }
        
        console.log("value ",otherflag," =>",str_3A,);
        if(str_3A===""){
            return "_";
        }
        return str_3A;
    }

    // const [B_1_remarks,setB_1_remarks]=React.useState("_")
    // const [B_2A_remarks,setB_2A_remarks]=React.useState("_")
    // const [B_2B_remarks,setB_2B_remarks]=React.useState("_")
    // const [B_3A_remarks,setB_3A_remarks]=React.useState("_")
    // const [B_3B_remarks,setB_3B_remarks]=React.useState("_")
    // const [B_3C_remarks,setB_3C_remarks]=React.useState("_")
    // const [B_3D_remarks,setB_3D_remarks]=React.useState("_")

    return(
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
                            Quantity Supplied
                        </TableCell>
                        <TableCell>
                            Difference
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
                        <TableCell>
                            <input disabled
                            type="number" name={row.id} 
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
                        
                        {row.difference < 0?
                        <TableCell style={{background:"#fc6456"}}>{row.difference}</TableCell>
                        :""}
                        {row.difference > 0?
                        <TableCell style={{background:"yellow"}}>{row.difference}</TableCell>
                        :""}
                        {row.difference == 0?
                        <TableCell style={{background:"#23ff4f"}}>{row.difference}</TableCell>
                        :""}

                        {/* <TableCell></TableCell> */}
                        </TableRow>
                     ))
                : ""}


                </TableBody>
            </Table>
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
                    />
                    </Grid>
                
                <Grid item xs={2} style={{padding:"3.5%"}}>
                <Button 
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
                            }),
                        })
                    )}
            
            >Submit</Button>
            </Grid>
            </Grid>
            </div>
            </div>
        )
    }
