import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const DropdownFilter=(props)=>{


   return (<><Autocomplete
    style={{color:'white'}}
    className="inputname"
    onSelect={e=>props.onChange(e.target.value,props.label)}
    id={`combo-box-demo${props.label}`}
    options={props.options}
    value={props.input}
    getOptionLabel={(option) => option}
    renderInput={(params) => <TextField  {...params} label={props.label}variant="outlined" />}
   /></>)
}
export default DropdownFilter;