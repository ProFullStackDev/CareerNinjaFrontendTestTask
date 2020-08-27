import * as types from '../types';

import createReducer from './createReducer';
const initialState = {
  battle_data: [],
  search_data: [],
  battle_count: '',
  isLoading: true,
};

export const battleReducer = createReducer(initialState, {
  [types.BATTLE_DATA](state, action) {
    return {
      ...state,
      battle_data: action.data,
    };
  },

  [types.SEARCH_DATA](state, action) {
    return {
      ...state,
      search_data: action.data,
    };
  },
  [types.BATTLE_COUNT](state, action) {
    return {
      ...state,
      battle_count: action.data,
    };
  },
});
