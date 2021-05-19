import React, {Component,useState,useEffect} from "react";
// import {Row} from "simple-flexbox";
import {useHistory } from "react-router-dom";
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
import Checkbox from '@material-ui/core/Checkbox';
import { myvar } from '../user/user.js';

const history = createBrowserHistory({forceRefresh:true});

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

function BooltoCharfunction(var1){
    if(var1){
        return "T";
    }
    else{
        return "F";
    }
}

export default function ReturnedFormA(props) {
    let history2 = useHistory();
    const SUBMIT_FORM_API = 'http://127.0.0.1:8000/api/update-cardiac-supplied-forma/'+props.docnumber;
    const GET_COMBINED_API = "http://127.0.0.1:8000/api/combined-form/"+props.docnumber;
    const GET_REQUEST_DATA_API = 'http://127.0.0.1:8000/api/get-request-table/'+props.docnumber;
    const pink = {
        backgroundColor: 'pink'
    }
        
    const blue ={
        backgroundColor: 'blue'
    }

    // const handleCheckboxToggle = async => (event) => {
    //     console.log("handle Checkbox TOggle",id);
    //     var ok = setTallyNurse(tallyNurse => (
    //         {...tallyNurse,[row.id]:event.target.checked}
    //     ));
    //     if(){
    //         console.log("ALL CHECKED!!!!!!!!!!!!!!!!!!!!!!!!!!");
    //         setBoolAllDone(true);
    //     }
    //     else{
    //         console.log("waiting............")
    //         setBoolAllDone(false);
    //     }
    // }
    const handleSaveasDraft = () => {
        var temppp = tallyNurse['1'] && tallyNurse['2A'] && tallyNurse['2B'] && tallyNurse['3A'] && tallyNurse['3B'];
        if(temppp){
            console.log("alllllllllllllllllllllllllllllllllllllll");
        }
        else{
            console.log("ooooooooooooooooooooooooooooooooooo");
        }
        setBoolAllDone(tallyNurse['1'] && tallyNurse['2A'] && tallyNurse['2B'] && tallyNurse['3A'] && tallyNurse['3B']);

    }

    const [rows, setRows] = React.useState([]);
    
    const [boolConfirmed,setBoolConfirmed]=React.useState(false);
    const [qtyRcdPharma, setQtyRcdPharma] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    const [qtySupplied, setQtySupplied] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    const [qtyConsumed, setQtyConsumed] = useState({'1':0,'2A':0,'2B':0,'3A':0,'3B':0,'3C':0,'3D':0});
    const [tallyNurse, setTallyNurse] = useState({'1':false,'2A':false,'2B':false,'3A':false,'3B':false,'3C':false,'3D':false});
    const [boolAllDone,setBoolAllDone]=React.useState();

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
            
            var col5 = "A_"+ids[x]+"_tally_nurse";
            var col6 = "A_"+ids[x]+"_consumed";
            var col7 = "A_"+ids[x]+"_qty_rcd";
            var id = ids[x];
            var name = form["**Requested**"][0][col1];
            var descr = form["**Requested**"][0][col2];
            var brand = form["**Requested**"][0][col3];
            var qty_requested= form["**Requested**"][0][col4];
            var qty_received = form["**Supplied**"][0][col4];
            var qty_consumed = form["**Supplied**"][0][col6];
            var qty_from_pharma = form["**Supplied**"][0][col7];
            if (form["**Supplied**"][0][col5]=='T'){
                setTallyNurse(tallyNurse => (
                    {...tallyNurse,[id]:true}
                ));
            }

            var difference=qty_received-qty_requested;
            setQtySupplied(qtySupplied => (
                {...qtySupplied, [id]: qty_received}
            ));
            setQtyConsumed(qtyConsumed => (
                {...qtyConsumed, [id]: qty_consumed}
            ));
            setQtyRcdPharma(qtyRcdPharma => (
                {...qtyRcdPharma, [id]: qty_from_pharma}
            ));
            temp.push({id,name,descr,brand,qty_requested,qty_received,difference});
            console.log("id = ",id,"  qty_requested = ",qty_requested, "qty_received=",qty_received)
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

    var temp2;
    const onClickChangeStatetoReady = async () => {
        console.log("function called")
        temp2 = await axios.get(GET_REQUEST_DATA_API);
        temp2.data.state = 'Ready';
        await axios.put(GET_REQUEST_DATA_API,temp2.data);
    }
    
    const onClickChangeStatetoOperationDone = async () => {
        console.log("function called")
        temp2 = await axios.get(GET_REQUEST_DATA_API);
        temp2.data.state = 'OperationDone';
        await axios.put(GET_REQUEST_DATA_API,temp2.data);
    }

    const onClickChangeStatetoCompleted = async () => {
        console.log("function called")
        temp2 = await axios.get(GET_REQUEST_DATA_API);
        temp2.data.state = 'Completed';
        await axios.put(GET_REQUEST_DATA_API,temp2.data);
    }

    return(
        <div>
        {
        props.stage == 'Approved' || props.stage=="SentToPharma" || props.stage == 'Pending' || props.stage=='ReceivedFromPharma'?
        
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
                        disabled
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
            </Grid>
            </div>
            </div>

        :
        
        props.stage =="ReceivedByNurse"?
        
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
                            Quantity forwarded for surgery
                        </TableCell> */}
                        <TableCell style={{color:"black"}}>
                            Item received and forwarded?
                        </TableCell>
                        {/* <TableCell style={{color:"black"}}>
                            Remarks
                        </TableCell> */}
                    </TableRow>
                </TableHead>
                {/* {boolAllDone?"ALL DONE":"PENDING"} */}
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
                                    <input disabled type="number" min="0" value={row.qty_received}/>
                                </TableCell>
                                <TableCell>
                                    <Checkbox 
                                        checked={tallyNurse[row.id]}
                                        onChange={(event)=>{
                                        
                                            setTallyNurse(tallyNurse => (
                                                {...tallyNurse,[row.id]:event.target.checked}
                                            ));
                                            
                                            console.log("row.id",row.id,event.target.checked,tallyNurse[row.id]);
                                        }}
                                    />
                                    {/* {tallyNurse[row.id]?"true":"false"} */}
                                </TableCell>
                            
                            </TableRow>
                        ))
                    : ""}

                        
                </TableBody>
            </Table>
            <div style={{padding:"10px"}}>
                <Grid container >
                    <Grid item xs={10}>
                        <Button variant="contained" color="primary"
                            onClick={()=>(
                                console.log("******submitting*********")
                                , handleSaveasDraft()
                                // ,setTallyNurse(tallyNurse['1'] && tallyNurse['2A'] && tallyNurse['2B'] && tallyNurse['3A'] && tallyNurse['3B'])
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
                                    A_1_qty       :qtySupplied['1' ],
                                    A_2A_qty      :qtySupplied['2A'],
                                    A_2B_qty      :qtySupplied['2B'],
                                    A_3A_qty      :qtySupplied['3A'],
                                    A_3B_qty      :qtySupplied['3B'],
                                    A_1_consumed       :qtyConsumed['1' ],
                                    A_2A_consumed      :qtyConsumed['2A'],
                                    A_2B_consumed      :qtyConsumed['2B'],
                                    A_3A_consumed      :qtyConsumed['3A'],
                                    A_3B_consumed      :qtyConsumed['3B'],
                                    A_1_tally_nurse      :BooltoCharfunction(tallyNurse['1']),
                                    A_2A_tally_nurse      :BooltoCharfunction(tallyNurse['2A']),
                                    A_2B_tally_nurse     :BooltoCharfunction(tallyNurse['2B']),
                                    A_3A_tally_nurse      :BooltoCharfunction(tallyNurse['3A']),
                                    A_3B_tally_nurse      :BooltoCharfunction(tallyNurse['3B']),
                                }),
                                })
                            )}
                        >Save As Draft</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    {
                        boolAllDone==true?
                            <Grid item>
                            <Checkbox 
                                value={boolConfirmed}
                                onChange={(event)=>{
                                    setBoolConfirmed(event.target.checked);
                                }}
                            />
                            I have done thorough checking of the inventory and EITHER forwarded the same to the concerned person OR deposited it to department for the surgery.
                            </Grid>
                        :
                            <Grid item>
                            <Checkbox disabled/>
                            I have done thorough checking of the inventory and EITHER forwarded the same to the concerned person OR deposited it to department for the surgery.
                            </Grid>
                    }
                    {
                        boolConfirmed==true?
                        <Grid item xs={10} align='center'>
                            <Button variant="contained" color="secondary"
                                onClick={()=>{
                                    console.log("******submitting*********");
                                    if (window.confirm('Are you sure you want to proceed?')){
                                        console.log("pakaa"); 
                                        onClickChangeStatetoReady(); 
                                        history2.goBack();
                                    }
                                }}
                            >SUBMIT</Button>
                        </Grid>
                    :
                        <Grid item xs={10} align='center'>
                         <Button disabled variant="contained" color="secondary">SUBMIT</Button>
                        </Grid>
                    }
                </Grid>
            </div>
        </div>
        :

        props.stage =="Ready"?
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
                                        {...qtySupplied, [row.id]: event.target.value}
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
                        <Grid item xs={10} align='center'>
                            <Button  
                                variant="contained" color="primary"
                                onClick={()=>{
                                    console.log("******submitting*********");
                                    if (window.confirm('Once done you will be able update consumption of inventory. Are you sure operation is done? ')){
                                        console.log("pakaa"); 
                                        onClickChangeStatetoOperationDone(); 
                                        history2.goBack();
                                    }
                                }}
                        >Operation Done</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        :
        props.stage == 'OperationDone'?
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
                            <TableCell>{row.qty_received}</TableCell>   
                            <TableCell>
                                <input 
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
                            
                            { row.qty_received -qtyConsumed[row.id]< 0?
                            <TableCell style={{background:"#fc6456"}}>{row.qty_received -qtyConsumed[row.id]}</TableCell>
                            :""}
                            {row.qty_received -qtyConsumed[row.id] > 0?
                            <TableCell style={{background:"yellow"}}>{row.qty_received -qtyConsumed[row.id]}</TableCell>
                            :""}
                            {row.qty_received -qtyConsumed[row.id] == 0?
                            <TableCell style={{background:"#23ff4f"}}>{row.qty_received -qtyConsumed[row.id]}</TableCell>
                            :""}

                            {/* <TableCell></TableCell> */}
                            </TableRow>
                        ))
                    : ""}

                        
                    </TableBody>
                </Table>
                <div style={{padding:"10px"}}>
                    <Grid container >
                        <Grid item xs={10} style={{padding:"1%"}}>
                            <Button  
                                variant="contained" color="primary"
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
                                            A_1_consumed      :qtyConsumed['1'],
                                            // A_1_remarks  :A_1_remarks,
                                            A_2A_consumed      :qtyConsumed['2A'],
                                            // A_2A_remarks  :A_2A_remarks,
                                            A_2B_consumed      :qtyConsumed['2B'],
                                            // A_2B_remarks  :A_2B_remarks,
                                            A_3A_consumed   :qtyConsumed['3A'],
                                            // A_3A_remarks  :A_3A_remarks,
                                            A_3B_consumed      :qtyConsumed['3B'],
                                            // A_3B_remarks  :A_3B_remarks, 
                                            A_1_qty       :qtySupplied['1' ],
                                            A_2A_qty      :qtySupplied['2A'],
                                            A_2B_qty      :qtySupplied['2B'],
                                            A_3A_qty      :qtySupplied['3A'],
                                            A_3B_qty      :qtySupplied['3B'],
                                        }),
                                    })
                                )}

                            >Save as Draft</Button>
                        </Grid>
                    </Grid>
                    <Grid container>
                    {
                        
                        <Grid item>
                        <Checkbox 
                            value={boolConfirmed}
                            onChange={(event)=>{
                                setBoolConfirmed(event.target.checked);
                            }}
                        />
                        I have thorough checked the consumption of each and every item related to this surgery/Operation.
                        </Grid>
                    }
                    {
                        boolConfirmed==true?
                        <Grid item xs={10} align='center'>
                            <Button variant="contained" color="secondary"
                                onClick={()=>{
                                    console.log("******submitting*********");
                                    if (window.confirm("Are you sure you want to Mark as Complete? NOTE: YOU WON'T BE ABLE TO CHANGE THIS LATER.")){
                                        console.log("pakaa"); 
                                        onClickChangeStatetoCompleted(); 
                                        history2.goBack();
                                    }
                                }}
                            >Mark Complete</Button>
                        </Grid>
                    :
                        <Grid item xs={10} align='center'>
                         <Button disabled variant="contained" color="secondary">Mark Complete</Button>
                        </Grid>
                    }
                </Grid>
            </div>
            </div>
        :
        props.stage == 'Completed'?
        
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
        
        }
    
    </div>
    )
}