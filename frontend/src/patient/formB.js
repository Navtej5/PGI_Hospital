import React, {Component,useState} from "react";
import {Row} from "simple-flexbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from 'styled-components';
import { useLocation } from "react-router";
import Checkbox from "@material-ui/core/Checkbox";
import {myvar} from '../user/user.js';

const SUBMIT_FORM_API = 'http://127.0.0.1:8000/api/update-cardiac-form/'

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



export default function FormB() {

    

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
    }

    const [B_1_remarks,setB_1_remarks]=React.useState("")
    const [B_1_qty,setB_1_qty]=React.useState("")
    const [B_2A_remarks,setB_2A_remarks]=React.useState("")
    const [B_2A_qty,setB_2A_qty]=React.useState("")
    const [B_2B_remarks,setB_2B_remarks]=React.useState("")
    const [B_2B_qty,setB_2B_qty]=React.useState("")
    const [B_3A_remarks,setB_3A_remarks]=React.useState("")
    const [B_3A_qty,setB_3A_qty]=React.useState("")
    const [B_3B_remarks,setB_3B_remarks]=React.useState("")
    const [B_3B_qty,setB_3B_qty]=React.useState("")
    const [B_3C_remarks,setB_3C_remarks]=React.useState("")
    const [B_3C_qty,setB_3C_qty]=React.useState("")
    const [B_3D_remarks,setB_3D_remarks]=React.useState("")
    const [B_3D_qty,setB_3D_qty]=React.useState("")


    const [B_1_spec,setB_1_spec] = useState({"14G(Code:20014)": false ,"16G(Code:20016)": false ,other:false,otherval:''})
    const B_1_spec_options = ["14G(Code:20014)","16G(Code:20016)"]
    const handleChangeA1descr = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_1_spec({...B_1_spec,[event.target.name]:event.target.checked});
    }

    const [B_1_brand,setB_1_brand] = useState({"Medtronic": false ,"Edward": false,"Sarns":false ,other:false,otherval:''})
    const B_1_brand_options = ["Medtronic","Edward","Sarns"]
    const handleChangeA1brand = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_1_brand({...B_1_brand,[event.target.name]:event.target.checked});
    }

    const [B_2A_descr,setB_2A_descr] = useState({"20Fr": false ,"22Fr": false ,other:false,otherval:''})
    const B_2A_descr_options = ["20Fr","22Fr"]
    const handleChangeA2Adescr = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_2A_descr({...B_2A_descr,[event.target.name]:event.target.checked});
    }

    const [B_2A_brand,setB_2A_brand] = useState({"Medtronic": false ,"Edward": false,"Sarns":false ,other:false,otherval:''})
    const B_2A_brand_options = ["Medtronic","Edward","Sarns"]
    const handleChangeA2Abrand = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_2A_brand({...B_2A_brand,[event.target.name]:event.target.checked});
    }

    const [B_2B_descr,setB_2B_descr] = useState({"6Fr": false , "8Fr": false , "10Fr": false , "12Fr": false , "14Fr": false , '16fr': false , '18Fr': false , "20Fr": false ,other:false,otherval:''})
    const B_2B_descr_options = ["6Fr", "8Fr", "10Fr", "12Fr", "14Fr", '16fr', '18Fr', "20Fr"]
    const handleChangeA2Bdescr = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_2B_descr({...B_2B_descr,[event.target.name]:event.target.checked});
    }

    const [B_2B_brand,setB_2B_brand] = useState({"Medtronic": false ,"Edward": false,"Sarns":false ,other:false,otherval:''})
    const B_2B_brand_options = ["Medtronic","Edward","Sarns"]
    const handleChangeA2Bbrand = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_2B_brand({...B_2B_brand,[event.target.name]:event.target.checked});
    }

    const [B_3A_descr,setB_3A_descr] = useState({"for Adult CPB circuit": false ,other:false,otherval:''})
    const B_3A_descr_options = ["for Adult CPB circuit"]
    const handleChangeA3Adescr = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_3A_descr({...B_3A_descr,[event.target.name]:event.target.checked});
    }

    const [B_3A_brand,setB_3A_brand] = useState({"BL Lifesciences":false,"Dideco":false,"Life line":false ,other:false,otherval:''})
    const B_3A_brand_options = ["BL Lifesciences","Dideco","Life line"]
    const handleChangeA3Abrand = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_3A_brand({...B_3A_brand,[event.target.name]:event.target.checked});
    }

    const [B_3B_descr,setB_3B_descr] = useState({"for pediatric CPB": false ,other:false,otherval:''})
    const B_3B_descr_options = ["for pediatric CPB"]
    const handleChangeA3Bdescr = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_3B_descr({...B_3B_descr,[event.target.name]:event.target.checked});
    }

    const [B_3B_brand,setB_3B_brand] = useState({"BL Lifesciences":false,"Dideco":false,"Life line":false ,other:false,otherval:''})
    const B_3B_brand_options = ["BL Lifesciences","Dideco","Life line"]
    const handleChangeA3Bbrand = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_3B_brand({...B_3B_brand,[event.target.name]:event.target.checked});
    }

    const [B_3C_descr,setB_3C_descr] = useState({"Neonate or infant for 3-10kg": false ,other:false,otherval:''})
    const B_3C_descr_options = ["Neonate or infant for 3-10kg"]
    const handleChangeA3Cdescr = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_3C_descr({...B_3C_descr,[event.target.name]:event.target.checked});
    }

    const [B_3C_brand,setB_3C_brand] = useState({"BL Lifesciences":false,"Dideco":false,"Life line":false ,other:false,otherval:''})
    const B_3C_brand_options = ["BL Lifesciences","Dideco","Life line"]
    const handleChangeA3Cbrand = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_3C_brand({...B_3C_brand,[event.target.name]:event.target.checked});
    }

    const [B_3D_descr,setB_3D_descr] = useState({"Neonate with less than 3kg": false ,other:false,otherval:''})
    const B_3D_descr_options = ["Neonate with less than 3kg"]
    const handleChangeA3Ddescr = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_3D_descr({...B_3D_descr,[event.target.name]:event.target.checked});
    }

    const [B_3D_brand,setB_3D_brand] = useState({"Pall":false ,other:false,otherval:''})
    const B_3D_brand_options = ["Pall"]
    const handleChangeA3Dbrand = async (event)=>{
        console.log(event.target.name,event.target.checked);
        setB_3D_brand({...B_3D_brand,[event.target.name]:event.target.checked});
    }
        // const [dateofbirth,setdateofbirth] = useState(null);
        return(
            <div>
                
            <Table> {//style={{marginTop:"-350px",marginLeft:"400px",width:"650px",color:"white"}}>}
        }
                <TableHead>
                    <TableRow>
                        <TableCell style={{color:"white"}}>
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
                            Remarks
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow style={{padding:"0px"}}>
                        <TableCell >1</TableCell>
                        <TableCell >Antegrade cardioplegia Cannula, with vent</TableCell>
                        <TableCell >
                                {
                                    B_1_spec_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} name={c} checked={B_1_spec.c} onChange={handleChangeA1descr}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A1descr').disabled = !(event.target.checked),setB_1_spec({...B_1_spec,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A1descr" disabled onChange={(event) => setB_1_spec({...B_1_spec,['otherval']:event.target.value})}></input>
                                </div>
                            {/* <select onChange={(event)=>(setA1_1(event.target.value))}>     
                                <option value="14 G(Code:20014)">14 G(Code:20014)</option>
                                <option value="16 G(Code:20016)">16 G(Code:20016)</option>
                                <option value="other">other</option>
                            </select>  */}
                        </TableCell>
                        <TableCell >
                                {
                                    B_1_brand_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} type="checkbox" name={c} checked={B_1_brand.c} onChange={handleChangeA1brand}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A1brand').disabled = !(event.target.checked),setB_1_brand({...B_1_brand,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A1brand" disabled onChange={(event) => setB_1_brand({...B_1_brand,['otherval']:event.target.value})}></input>
                                </div>
                            {/* <select onChange={(event)=>(setA1_2(event.target.value))}>     
                                <option value="Medtronic">Medtronic</option>
                                <option value="Edward">Edward</option>
                                <option value="Sarns">Sarns</option>
                                <option value="other">other</option>
                            </select>  */}
                        </TableCell>
                        <TableCell >
                            {/* <input
                            val={B_1_qty}
                            onchange={(event)=>(setB_1_qty(event.target.value))}
                            ></input>     */}
                            <select onChange={(event)=>(setB_1_qty(event.target.value))}>     
                            <option value="10">10</option>
                            {/* <option value="Beaumount Texas">Beaumount Texas</option> */}
                            <option value="other">other</option>
                        </select> 
                        </TableCell>
                        <TableCell >
                            <input val={B_1_remarks} onchange={(event)=>(setB_1_remarks(event.target.value))}></input>
                            {/* <select onChange={(event)=>(setB_1_remarks(event.target.value))}>     
                            <option value="Helena Lab">Helena Lab</option>
                            <option value="Beaumount Texas">Beaumount Texas</option>
                            <option value="other">other</option>
                            </select>  */}
                        </TableCell>
                    </TableRow>
                    <TableRow style={{marginTop:"0px"}}>
                        <TableCell >2A</TableCell>
                        <TableCell >Aortic perfusion cannula, wire reinforced, Angled</TableCell>
                        <TableCell >
                                {
                                    B_2A_descr_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} name={c} checked={B_2A_descr.c} onChange={handleChangeA2Adescr}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A2Adescr').disabled = !(event.target.checked),setB_2A_descr({...B_2A_descr,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A2Adescr" disabled onChange={(event) => setB_2A_descr({...B_2A_descr,['otherval']:event.target.value})}></input>
                                </div>

                            {/* <select onChange={(event)=>(setA2B_1(event.target.value))}>     
                                <option value="20 Fr">20 Fr</option>
                                <option value="22 Fr">22 Fr</option>
                                <option value="other">other</option>
                            </select>  */}
                        </TableCell>
                        <TableCell >
                                {
                                    B_2A_brand_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} type="checkbox" name={c} checked={B_2A_brand.c} onChange={handleChangeA2Abrand}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A2Abrand').disabled = !(event.target.checked),setB_2A_brand({...B_2A_brand,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A2Abrand" disabled onChange={(event) => setB_2A_brand({...B_2A_brand,['otherval']:event.target.value})}></input>
                                </div>
                            {/* <select onChange={(event)=>(setA2A_2(event.target.value))}> 
                                <option value="Medtronic">Medtronic</option>
                                <option value="Edward">Edward</option>
                                <option value="Sarns">Sarns</option>
                                <option value="other">other</option>
                            </select>  */}
                        </TableCell>
                        <TableCell >
                            <select onChange={(event)=>(setB_2A_qty(event.target.value))}>     
                                <option value="1">1</option>
                                <option value="other">other</option>
                            </select> 
                        </TableCell>
                        <TableCell >
                            <input></input>
                        </TableCell>
                    </TableRow>
                    <TableRow style={{marginTop:"0px"}}>
                        <TableCell >2B</TableCell>
                        <TableCell >Aortic perfusion cannula, wire reinforced, straight</TableCell>
                        <TableCell >
                                {
                                    B_2B_descr_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} name={c} checked={B_2B_descr.c} onChange={handleChangeA2Bdescr}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" 
                                onChange={(event)=>(
                                    document.getElementById('text_A2Bdescr').disabled = !(event.target.checked),
                                    setB_2B_descr({...B_2B_descr,['other']:event.target.checked})
                                )}/>other</label>
                                <input placeholder="" id="text_A2Bdescr" disabled onChange={(event)=>setB_2B_descr({...B_2B_descr,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                                {
                                    B_2B_brand_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} type="checkbox" name={c} checked={B_2B_brand.c} onChange={handleChangeA2Bbrand}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A2Bbrand').disabled = !(event.target.checked),setB_2B_brand({...B_2B_brand,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A2Bbrand" disabled onChange={(event) => setB_2B_brand({...B_2B_brand,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                        {/* <input></input>     */}
                            <select onChange={(event)=>(setB_2B_qty(event.target.value))}>     
                                <option value="1">1</option>
                                <option value="other">other</option>
                            </select> 
                        </TableCell>
                        <TableCell >
                            <input></input>
                        </TableCell>
                    </TableRow>
                    <TableRow style={{marginTop:"0px"}}>
                        <TableCell >3A</TableCell>
                        <TableCell >Autovent cum Filter, adult</TableCell>
                        <TableCell >
                                {
                                    B_3A_descr_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} name={c} checked={B_3A_descr.c} onChange={handleChangeA3Adescr}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A3Adescr').disabled = !(event.target.checked),setB_3A_descr({...B_3A_descr,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A3Adescr" disabled onChange={(event) => setB_3A_descr({...B_3A_descr,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                                {
                                    B_3A_brand_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} type="checkbox" name={c} checked={B_3A_brand.c} onChange={handleChangeA3Abrand}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A3Abrand').disabled = !(event.target.checked),setB_3A_brand({...B_3A_brand,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A3Abrand" disabled onChange={(event) => setB_3A_brand({...B_3A_brand,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                        {/* <input></input>     */}
                        <select onChange={(event)=>(setB_3A_qty(event.target.value))}>     
                            <option value="1">1</option>
                            <option value="other">other</option>
                        </select> 
                        </TableCell>
                        <TableCell >
                        <input onChange={(event)=>(setB_3A_remarks(event.target.value))}></input>
                        </TableCell>
                    </TableRow>
                    

                    <TableRow style={{marginTop:"0px"}}>
                        <TableCell >3B</TableCell>
                        <TableCell >Autovent cum Filter, Pediatric</TableCell>
                        <TableCell >
                                {
                                    B_3B_descr_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} name={c} checked={B_3B_descr.c} onChange={handleChangeA3Bdescr}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A3Bdescr').disabled = !(event.target.checked),setB_3B_descr({...B_3B_descr,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A3Bdescr" disabled onChange={(event) => setB_3B_descr({...B_3B_descr,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                            {
                                    B_3B_brand_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} type="checkbox" name={c} checked={B_3B_brand.c} onChange={handleChangeA3Bbrand}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A3Bbrand').disabled = !(event.target.checked),setB_3B_brand({...B_3B_brand,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A3Bbrand" disabled onChange={(event) => setB_3B_brand({...B_3B_brand,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                        {/* <input></input>     */}
                        <select onChange={(event)=>(setB_3B_qty(event.target.value))}>     
                            <option value="1">1</option>
                            <option value="other">other</option>
                        </select> 
                        </TableCell>
                        <TableCell >
                        <input onChange={(event)=>(setB_3B_remarks(event.target.value))}></input>
                        </TableCell>
                    </TableRow>
                    
                    <TableRow style={{marginTop:"0px"}}>
                        <TableCell >3C</TableCell>
                        <TableCell >Autovent cum Filter, Neonate & infant</TableCell>
                        <TableCell >
                                {
                                    B_3C_descr_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} name={c} checked={B_3C_descr.c} onChange={handleChangeA3Cdescr}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A3Cdescr').disabled = !(event.target.checked),setB_3C_descr({...B_3C_descr,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A3Cdescr" disabled onChange={(event) => setB_3C_descr({...B_3C_descr,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                            {
                                    B_3C_brand_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} type="checkbox" name={c} checked={B_3C_brand.c} onChange={handleChangeA3Cbrand}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A3Cbrand').disabled = !(event.target.checked),setB_3C_brand({...B_3C_brand,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A3Cbrand" disabled onChange={(event) => setB_3C_brand({...B_3C_brand,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                        <select onChange={(event)=>(setB_3C_qty(event.target.value))}>     
                            <option value="1">1</option>
                            <option value="other">other</option>
                        </select> 
                        </TableCell>
                        <TableCell >
                        <input onChange={(event)=>(setB_3C_remarks(event.target.value))}></input>
                        </TableCell>
                    </TableRow>
                    
                    <TableRow style={{marginTop:"0px"}}>
                        <TableCell >3D</TableCell>
                        <TableCell >Autovent cum Filter, Neonate</TableCell>
                        <TableCell >
                                {
                                    B_3D_descr_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} name={c} checked={B_3D_descr.c} onChange={handleChangeA3Ddescr}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A3Ddescr').disabled = !(event.target.checked),setB_3D_descr({...B_3D_descr,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A3Ddescr" disabled onChange={(event) => setB_3D_descr({...B_3D_descr,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                            {
                                    B_3D_brand_options.map(
                                        (c,i)=><div><label key={c}><Checkbox style={{height:"11px"}} type="checkbox" name={c} checked={B_3D_brand.c} onChange={handleChangeA3Dbrand}/>{c}</label></div>
                                    )
                                }    
                                <div><label><Checkbox style={{height:"11px"}} type="checkbox" onChange={(event)=>(document.getElementById('text_A3Dbrand').disabled = !(event.target.checked),setB_3D_brand({...B_3D_brand,['other']:event.target.checked}))}/>other</label>
                                <input placeholder="" id="text_A3Dbrand" disabled onChange={(event) => setB_3D_brand({...B_3D_brand,['otherval']:event.target.value})}></input>
                                </div>
                        </TableCell>
                        <TableCell >
                        <select onChange={(event)=>(setB_3D_qty(event.target.value))}>     
                            <option value="1">1</option>
                            <option value="other">other</option>
                        </select> 
                        </TableCell>
                        <TableCell >
                        <input onChange={(event)=>(setB_3D_remarks(event.target.value))}></input>
                        </TableCell>
                    </TableRow>
                    
                    </TableBody>
                </Table>
            <button     
                onClick={()=>(
                    // console.log('values====>\ncompany_name:',B_3A_brand,'\nQty_required:',B_3A_qty,'\nSpecification:',B_3A_descr,'\nRemarks:',B_3A_remarks)
                    // ,testhandle(B_2A_brand)
                    fetch(SUBMIT_FORM_API+myvar,
                        {
                        credentials: 'include',
                        method:'PATCH',
                        headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                        },
                        body: JSON.stringify({
                            code         : myvar,
                            'B_1_descr'     :testhandle(B_1_spec),
                            'B_1_brand'     :testhandle(B_1_brand),
                            B_1_qty      :B_1_qty,
                            B_1_remarks  :B_1_remarks,
                            B_2A_descr     :testhandle(B_2A_descr),           
                            B_2A_brand     :testhandle(B_2A_brand),
                            B_2A_qty      :B_2A_qty,
                            B_2A_remarks  :B_2A_remarks,
                            B_2B_descr     :testhandle(B_2B_descr),           
                            B_2B_brand     :testhandle(B_2B_brand),
                            B_2B_qty      :B_2B_qty,
                            B_2B_remarks  :B_2B_remarks,
                            B_3A_descr     :testhandle(B_3A_descr),
                            B_3A_brand     :testhandle(B_3A_brand),
                            B_3A_qty      :B_3A_qty,
                            B_3A_remarks  :B_3A_remarks,
                            B_3B_descr     :testhandle(B_3B_descr),
                            B_3B_brand     :testhandle(B_3B_brand),
                            B_3B_qty      :B_3B_qty,
                            B_3B_remarks  :B_3B_remarks, 
                            B_3C_descr     :testhandle(B_3C_descr),
                            B_3C_brand     :testhandle(B_3C_brand),
                            B_3C_qty      :B_3C_qty,
                            B_3C_remarks  :B_3C_remarks,
                            B_3D_descr     :testhandle(B_3D_descr),
                            B_3D_brand     :testhandle(B_3D_brand),
                            B_3D_qty      :B_3D_qty,
                            B_3D_remarks  :B_3D_remarks, 
                        }),
                    })
                )}
            
            >Submit</button>
            </div>
        )
    }
