import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loadingReducer } from './loadingReducer';
import {battleReducer} from './battleReducer'

const rootReducer = combineReducers({
    loadingReducer: loadingReducer,
    battleReducer:battleReducer
});
  
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
  };
  
export default configureStore;
