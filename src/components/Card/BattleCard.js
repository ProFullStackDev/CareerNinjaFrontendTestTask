import React from 'react';
import { GiPointySword } from 'react-icons/gi';
const BattleCard = (props) => {
  console.log(props);
  return (
    <div className="row">
      {props.battleData &&
        props.battleData.map((e, i) => (
          <div
            key={`key${i}`}
            onClick={() => props.onClick(e.name || e)}
            className="col-xl-6 col-lg-6 col-sm-6 col-12"
            style={{ marginBottom: 10 }}
          >
            <div className="list">
              <div style={{ paddingRight: 8 }}>{e && <GiPointySword />}</div>
              <div>{e.name || e}</div>
            </div>
          </div>
        ))}

      <style>
        {`

        .list{
          display:flex;
          cursor:pointer;
          text-align: start;
        }
        .list:hover{
          color:gray;
        }
        
        `}
      </style>
    </div>
  );
};

export default BattleCard;
