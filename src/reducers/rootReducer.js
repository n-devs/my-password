import authReducer from './authReducer';
import PINReducer from './PINReducer';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    auth: authReducer,
    PIN: PINReducer
})

export default rootReducer