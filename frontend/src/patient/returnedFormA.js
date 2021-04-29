import React, {Component,useState,useEffect} from "react";
// import {Row} from "simple-flexbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import Select from "@material-ui/core/Select";
// import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { myvar } from '../user/user.js';

const history = createBrowserHistory();

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



export default function ReturnedFormA(props) {
    const SUBMIT_FORM_API = 'http://127.0.0.1:8000/api/update-cardiac-supplied-forma/'+props.docnumber;
    const GET_COMBINED_API = "http://127.0.0.1:8000/api/combined-form/"+props.docnumber;
    const pink = {
        backgroundColor: 'pink'
    }
        
    const blue ={
        backgroundColor: 'blue'
    }
    const [rows, setRows] = React.useState([]);
    const [qtySupplied, setQtySupplied] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    

    const fetchData = async () => {
        console.log("in fetch",myvar,props.docnumber,"here");
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
            var id = ids[x];
            var name = form["**Requested**"][0][col1];
            var descr = form["**Requested**"][0][col2];
            var brand = form["**Requested**"][0][col3];
            var qty_requested= form["**Requested**"][0][col4];
            var qty_supplied = form["**Supplied**"][0][col4];
            var difference=qty_requested-qty_supplied;
            setQtySupplied(qtySupplied => (
                {...qtySupplied, [id]: qty_supplied}
            ));
            temp.push({id,name,descr,brand,qty_requested,qty_supplied,difference});
            console.log("id = ",id,"  qty_requested = ",qty_requested, "qty_supplied=",qty_supplied)
        }
        setRows(temp);
        console.log("temp==>\n",temp);
        console.log("rows===>\n",rows);
    }

    console.log("globe");
    useEffect(()=>{
        console.log("in use effect");  
        fetchData();
    },[])


    // useEffect(() => {
    //     console.log(myvar);
    // });
    // function handle(){
    //     var str1="";
    //     var str2="";
    //     if(document.getElementById('3A_ark').checked){
    //         str1+="Arkayfacory;";        
    //     }
    //     if(document.getElementById('3A_nip').checked){
    //         str1+="nipro;";        
    //     }
    //     if(document.getElementById('3A_opt').checked){
    //         str1+="optium;";        
    //     }
    //     if(document.getElementById('yourBox').checked){
    //         str1+=document.getElementById("yourText").value;        
    //     }
    //     console.log("3A_brand",str1);
    //     if(document.getElementById('3A_18G').checked){
    //         str2+="18G;";        
    //     }
    //     if(document.getElementById('3A_nip').checked){
    //         str2+="20G;";        
    //     }
    //     if(document.getElementById('yourBox2').checked){
    //         str2+=document.getElementById("yourText2").value;        
    //     }
    //     console.log("3A_spec",str2);
    // };
    
    // function testhandle(var1){
    //     var str="";
    //     for (const [key, value] of Object.entries(var1)) {
    //         if(key==='other'){
    //             str+=value;
    //             str+=";";
    //             //console.log("hello",value);
    //         }
    //         else if(value){

    //             str+=key;
    //             str+=";";
    //         }
    //       }
    //     console.log("value=>",str);
    // }
    
    // const [A_1_descr,setA_1_descr]=React.useState("_")
    // const [A_1_brand,setA_1_brand]=React.useState("_")
    // const [A_1_qty,setA_1_qty]=React.useState("0")
    // const [A_1_remarks,setA_1_remarks]=React.useState("_")

    // const [A_2A_descr,setA_2A_descr]=React.useState("_")
    // const [A_2A_brand,setA_2A_brand]=React.useState("_")
    // const [A_2A_qty,setA_2A_qty]=React.useState("0")
    // const [A_2A_remarks,setA_2A_remarks]=React.useState("_")
    
    // const [A_2B_descr,setA_2B_descr]=React.useState("_")
    // const [A_2B_brand,setA_2B_brand]=React.useState("_")
    // const [A_2B_qty,setA_2B_qty]=React.useState("0")
    // const [A_2B_remarks,setA_2B_remarks]=React.useState("_")
    
    // const [A_3A_descr,setA_3A_descr]=React.useState("_")
    // const [A_3A_brand,setA_3A_brand]=React.useState("_")
    // const [A_3A_qty,setA_3A_qty]=React.useState("0")
    // const [A_3A_remarks,setA_3A_remarks]=React.useState("_")
    
    // const [A_3B_descr,setA_3B_descr]=React.useState("_")
    // const [A_3B_brand,setA_3B_brand]=React.useState("_")
    // const [A_3B_qty,setA_3B_qty]=useState("0")
    // const [A_3B_remarks,setA_3B_remarks]=useState("_")

    // const [A_4_descr,setA_4_descr]=React.useState("_")
    // const [A_4_brand,setA_4_brand]=React.useState("_")
    // const [A_4_qty,setA_4_qty]=useState("0")
    // const [A_4_remarks,setA_4_remarks]=useState("_")

    // const brand_3A_options = [{name:'volvo',value:'volvo'},{name:"Compatible to our machine",value:"Compatible to our machine"}]
    // const brand_3A_options = ["volvo","Compatible to our machine","others"]
    // const [checkboxSelected_1,setCheckboxSelected_1] = useState({Arkay_factory: false ,Nipro: false ,optium:false,other:''})
    // const [checkboxSelected_2,setCheckboxSelected_2] = useState({"18G": false ,"20G": false,other:''})
    // const [checkboxSelected_3,setCheckboxSelected_3] = useState({"helena Lab": false ,"Beaumont Texas": false,other:''})
    // const [checkboxSelected_4,setCheckboxSelected_4] = useState({"BD": false ,"Romson": false,other:''})
    // const qty_3A_options = ['1','10','other']
    // const [qty3A,setQty3A] = useState
    
    // const checkboxOptions_1 = ['Arkay_factory','Nipro','optium']
    // const checkboxOptions_2 = ['18G','20G']
    // const checkboxOptions_3 = ['helena lab','beaumount texas']
    // const checkboxOptions_4 = ['BD','Romson']
    // const handleChange_1 = async (event)=>{
    //     console.log(event.target.name,event.target.checked);
    //     // console.log("\nbefore",checkboxSelected_1);
    //     setCheckboxSelected_1({...checkboxSelected_1,[event.target.name]:event.target.checked});
    // }
    // const handleChange_2 = async (event)=>{
    //     console.log(event.target.name,event.target.checked);
    //     // console.log("\nbefore",checkboxSelected_1);
    //     setCheckboxSelected_2({...checkboxSelected_2,[event.target.name]:event.target.checked});
    // }
    // const handleChange_3 = async (event)=>{
    //     console.log(event.target.name,event.target.checked);
    //     // console.log("\nbefore",checkboxSelected_1);
    //     setCheckboxSelected_3({...checkboxSelected_3,[event.target.name]:event.target.checked});
    // }
    // const handleChange_4 = async (event)=>{
    //     console.log(event.target.name,event.target.checked);
    //     // console.log("\nbefore",checkboxSelected_1);
    //     setCheckboxSelected_4({...checkboxSelected_4,[event.target.name]:event.target.checked});
    // }
    // function testhandle(var1){
    //     var str="";
    //     var otherflag = false;
    //     for (const [key, value] of Object.entries(var1)) {
    //         if(key==='other'){
    //             if(value){
    //                 otherflag=true;
    //             }
    //             //console.log("hello",value);
    //         }
    //         else if(key==='otherval'){
    //             if(otherflag){
    //                 str+=value;
    //                 str+="; ";
    //             }
    //         }
    //         else if(value){
    //             str+=key;
    //             str+="; ";
    //         }
    //       }
    //     if(str===""){
    //         return "_";
    //     }
    //     return str;
    //     console.log("value ",otherflag," =>",str,);
    // }

    // async function change(){
    //     setA_1_brand(testhandle(checkboxSelected_3));
    //     setA_2A_descr(testhandle(checkboxSelected_2));
    //     setA_3A_brand(testhandle(checkboxSelected_1));
    //     setA_3B_brand(testhandle(checkboxSelected_4));
    // }

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
                        <TableCell style={{color:"black"}}>
                            Quantity Supplied
                        </TableCell>
                        <TableCell style={{color:"black"}}>
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
                        
                        {row.difference > 0?
                        <TableCell style={{background:"#fc6456"}}>{row.difference}</TableCell>
                        :""}
                        {row.difference < 0?
                        <TableCell style={{background:"yellow"}}>{row.difference}</TableCell>
                        :""}
                        {row.difference == 0?
                        <TableCell style={{background:"#6bff89"}}>{row.difference}</TableCell>
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
            >Submit</Button>
            </Grid>
            </Grid>
            </div>
            </div>
        )
    }