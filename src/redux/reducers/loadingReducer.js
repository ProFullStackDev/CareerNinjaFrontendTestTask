import * as types from '../types';

import createReducer from './createReducer';
const initialState = {
  isLoginLoading: false,
  loading: false,
};
export const loadingReducer = createReducer(initialState, {
  [types.LOADING](state, action) {
    return { ...state, loading: action.payload };
  },
});
