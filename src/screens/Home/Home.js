import React,{useEffect,useState} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import BattleCard from "../../components/Card/BattleCard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBattleData_action,searchBattle_action,getBattleCount_action } from "../../redux/actions/BattleAction";
import { withRouter } from "react-router-dom";
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";
import './Home.css'
const queryString = require("query-string");



const Home = (props) => {
  const { handle } = props.match.params;
  const [searchData,setSearchData]=useState([])
  const[battleData,setBattleData]=useState([])
  const parsed = queryString.parse(handle);
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 40%;
`;
  useEffect(()=>{
    props.getBattleCount_action()
    if(window.location.hash==='#/'){
      props.getBattleData_action()
    }
      else{
        const callback=(res)=>{
          // console.log(res)
        }
      props.searchBattle_action(parsed,'enter',callback)
    }
  },[])

  useEffect(()=>{
    if(window.location.hash==='#/'){
      console.log(window.location.pathname)
      setBattleData(props.battle_data)
    }else{
      console.log(window.location.hash)
      setSearchData(props.search_data)
    }
  },[props.search_data,props.battle_data,window.location.hash])
  return (
    <div className="container" style={{height: '100vh'}}>
      <SearchBar push={e=>props.history.push(e)}   parsed={parsed}/>
      <div>
        <h1>{props.counter}</h1>
      </div>
     {window.location.hash==='#/'? <div style={{margin:'20px 20px'}}>Battle Count:{props.battle_count}</div>:<div style={{margin:'20px 20px'}}>Search Result</div>}
      
     {window.location.hash==='#/'?<BattleCard
        battleData={battleData}
        name={false}
        onClick={(e) => props.history.push(`/battle/location=${e}`)}
      />:<BattleCard
      battleData={searchData}
      name={true}
      onClick={(e) =>  props.history.push(`/battle/name=${e}`)}
    />}
        <MoonLoader
          css={override}
          size={50}
          color={"#123abc"}
          loading={props.loading}
        />
    </div>
  );
};
const mapStateToProps = (state) => ({
  battle_data: state.battleReducer.battle_data,
  search_data:state.battleReducer.search_data,
  battle_count:state.battleReducer.battle_count,
  loading:state.loadingReducer.loading
});
const mapDispatchToProps = (dispatch) => ({
  getBattleData_action: bindActionCreators(getBattleData_action, dispatch),
  searchBattle_action: bindActionCreators(searchBattle_action, dispatch),
  getBattleCount_action:bindActionCreators(getBattleCount_action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
