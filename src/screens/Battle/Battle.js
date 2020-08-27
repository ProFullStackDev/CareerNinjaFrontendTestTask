import React,{useEffect,useState} from "react";
import { RiSkull2Line } from "react-icons/ri";
import { FaHeartbeat } from "react-icons/fa";
import { GiSnowflake1 } from "react-icons/gi";
import "./Battle.scss";
import BattleData from "../../components/BattleData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Modal,Button} from 'react-bootstrap';
import {searchBattle_action } from "../../redux/actions/BattleAction";
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";
const queryString = require("query-string");
const Battle = (props) => {
  const { handle } = props.match.params;
  const parsed = queryString.parse(handle);
  const [show, setShow] = useState(false);
  const [battleName,setbattleName]=useState('');
  const [win,setWin]=useState('')
  const [attSize,setAttSize]=useState('')
  const [deffSize,setDeffSize]=useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setTimeout(()=>{setShow(true)},1000) ;
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 40%;
`;
useEffect(()=>{
  const callback=()=>{

  }
  if(parsed.name!==undefined){
  props.searchBattle_action({name:parsed.name},'enter',callback)}else{
    props.searchBattle_action({location:parsed.location,},'enter',callback)
  }
},[parsed.name])
useEffect(()=>{
  BattleData.map((data)=>{
  props.search_data&&props.search_data.map((e)=>{
    setbattleName(e.name)
    setWin(e.attacker_outcome)
    setAttSize(e.attacker_size)
    setDeffSize(e.defender_size)
    console.log(e.attacker_size)
    if(e.defender_king===data.king){
      e.img2=data.img
    }
    if(e.attacker_king===data.king){
      e.img1=data.img
    }
  })
})
  
},[props.search_data])

  return (
    <div style={{ backgroundColor: " #141520" }} className="main-container">
        <MoonLoader
          css={override}
          size={50}
          color={"#ffff"}
          loading={props.loading}
        />
      <div className="container sub-container">
        <div className="heading">
          <h6>TONIGHT'S</h6>
          <h3>{parsed.name||battleName}</h3>
        </div>
        <div className="row row-container">
          {props.search_data&&props.search_data.map(
            (e,i) =>i===0&&
            (
                <>
                  <div
                    className="col background-img"
                    style={{ backgroundImage: `url(${e.img1})` }}
                  >
                    <div className="character-name">
                    <h4>Attacker</h4>
                      <div>
                        <img
                          className="image-box"
                          src={e.img1}
                          alt=""
                        />
                      </div>
                      <h5>{e.attacker_king}</h5>
                      <div className="divider"></div>
                      <p>Alias: &nbsp;{e.attacker_1}
                      {e.attacker_2}
                      {e.attacker_3}
                      {e.attacker_4}</p>
                      <div className="col-6 power-details poster">
                        <img
                          src="../stark.jpg"
                          className="house-logo"
                          alt={e.attacker_1}
                        />
                        <span>
                          <RiSkull2Line />
                          {e.attacker_size}
                        </span>
                        <span>
                          <FaHeartbeat />
                          99
                        </span>
                        <span>
                          <GiSnowflake1 />
                          89%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col background-img"
                    style={{ backgroundImage: `url(${e.img2})`}}
                  >
                    <div className="character-name">
                    <h4>Defender</h4>
                      <div>
                        <img
                          className="image-box"
                          src={e.img2}
                          alt=""
                        />
                      </div>
                      <h5>{e.defender_king}</h5>
                      <div className="divider"></div>
                      <p>Allies:  &nbsp;{e.defender_1}
                      {e.defender_2}
                      {e.defender_3}
                      {e.defender_4}</p>
                      <div className="col-6 power-details poster">
                        <img src="../stark.jpg" className="house-logo" alt="" />
                        <span>
                          <RiSkull2Line />
                          {e.defender_size}
                        </span>
                        <span>
                          <FaHeartbeat />
                          99
                        </span>
                        <span>
                          <GiSnowflake1 />
                          89%
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )
          )}
        </div>
        <div className="row power-footer">
          <div className="col-6 power-details footer">
            <img src="../stark.jpg" className="house-logo" alt="logo" />
            <span>
              <RiSkull2Line />
              {attSize}
            </span>
            <span>
              <FaHeartbeat />
              99
            </span>
            <span>
              <GiSnowflake1 />
              89%
            </span>
          </div>
          <div
            className="col-6 power-details footer"
            style={{ justifyContent: "flex-end" }}
          >
            <span>
              <RiSkull2Line />
              {deffSize}
            </span>
            <span>
              <FaHeartbeat />
              99
            </span>
            <span>
              <GiSnowflake1 />
              89%
            </span>
            <img src="../bolton.jpg" className="house-logo" alt="logo" />
          </div>
        </div>{" "}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Title style={{textAlign:'center'}}>{parsed.name||battleName}</Modal.Title>
        <Modal.Body style={{textAlign:'center'}}>Attacker {win}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>        
      <button onClick={handleShow} className="fight-btn">START FIGHT</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  search_data:state.battleReducer.search_data,
  loading:state.loadingReducer.loading
});
const mapDispatchToProps = (dispatch) => ({
  searchBattle_action: bindActionCreators(searchBattle_action, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Battle);