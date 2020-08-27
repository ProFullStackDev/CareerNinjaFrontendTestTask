import * as types from '../types';
import { handleLoader } from './app/index';

import axios from 'axios';

axios.defaults.baseURL = 'https://careerninjatestbackend.herokuapp.com/';

export const getBattleData_action = (params) => {
  return (dispatch) => {
    dispatch(handleLoader(true));
    axios
      .get(`list`)
      .then(async (res) => {
        dispatch({ type: types.BATTLE_DATA, data: res.data });
        dispatch(handleLoader(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const searchBattle_action = (param, type, callback) => {
  return (dispatch) => {
    if (type === 'enter') {
      dispatch(handleLoader(true));
    }
    let str = param.king && param.king.replace('$', '/');

    axios
      .get(
        `search?name=${param.name || ''}&attacker_king=${str ||
          ''}&battle_type=${param.type || ''}&location=${param.location || ''}`
      )
      .then(async (res) => {
        callback(res.data);
        if (type === 'enter') {
          dispatch({ type: types.SEARCH_DATA, data: res.data });
          dispatch(handleLoader(false));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getBattleCount_action = (params) => {
  return (dispatch) => {
    dispatch(handleLoader(true));
    axios
      .get(`count`)
      .then(async (res) => {
        dispatch({ type: types.BATTLE_COUNT, data: res.data });
        dispatch(handleLoader(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
