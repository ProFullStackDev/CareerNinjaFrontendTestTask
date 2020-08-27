import React,{useState, useEffect} from 'react';
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {searchBattle_action} from '../../redux/actions/BattleAction';
import Dropdown from './Dropdown';
import "./SearchBar.scss"
const SearchBar=(props)=> {
  const parsed=props.parsed
  const [searchData,setSearchData]=useState([])
  const [input, setInput]=useState({name:parsed.name||'',king:parsed.king||'',type:parsed.type||'',location:parsed.location||''})
  let name_arr=[]
let king_arr=[];
let type_arr=[];
let location_arr=[];

const handleSearch=()=>{
  const callback=(data)=>{
    if(data.length!==0){
    setSearchData(data)}
  }
  let str=input.king&&input.king.replace('/', '$'); 
  props.searchBattle_action(input,'enter',callback)
  props.push(`/search/name=${input.name}&location=${input.location}&king=${str}&type=${input.type}`)
}

useEffect(()=>{
  const callback=(data)=>{
    if(data.length!==0){
  return  setSearchData(data)}
  }
 return props.searchBattle_action(input,'search',callback)
},[input])
const handleChange=(e,type)=>{
  switch (type) {
    case "Name":
      setInput({...input,name:e})
    break;
    case 'King':
      setInput({...input,king :e})
      break;
      case 'Type':
        setInput({...input,type:e})
        break;
        case 'Location':
          setInput({...input,location:e})
          break;
  
    default:
      break;
  }
}
  if(searchData.length!==0){
        searchData.map((e,i)=>{
          name_arr.push(e.name)
         king_arr.push(e.attacker_king)
         location_arr.push(e.location)
   type_arr.push(e.battle_type)

   name_arr = name_arr.filter(function(item, pos, self) {
        return self.indexOf(item) === pos;})
        king_arr = king_arr.filter(function(item, pos, self) {
          return self.indexOf(item) === pos;})
          location_arr = location_arr.filter(function(item, pos, self) {
            return self.indexOf(item) === pos;})
            type_arr = type_arr.filter(function(item, pos, self) {
              return self.indexOf(item) === pos;})

        })
  }

const searchButton=()=>{
  return <Button style={{borderRadius: 0}} onClick={(e)=>handleSearch(e)}>Search</Button>
}
  return (
    <div className="search-container">
      <div className="search-box search-desktop">
<div className="search-bar"><Dropdown  
 label="Name"
 input={input.name}
onChange={handleChange}
options={name_arr}/></div>
       <Dropdown  
 label="King"
 input={input.king}
onChange={handleChange}
options={king_arr}/>
 <Dropdown  
 label="Location"
 input={input.location}
onChange={handleChange}
options={location_arr}/>

<Dropdown  
label="Type"
      input={input.type}
    onChange={ handleChange}
    options={type_arr}/>
      <>{searchButton()}</>


      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  battle_data: state.battleReducer.battle_data,
  search_data:state.battleReducer.search_data,
});
const mapDispatchToProps = (dispatch) => ({
  searchBattle_action: bindActionCreators(searchBattle_action, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
