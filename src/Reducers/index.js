// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import {counterReducer} from './counterRedux';
import {authReducer} from './authRedux'
// Redux: Root Reducer
export const rootReducer = combineReducers({
    counter: counterReducer,
    authReducer: authReducer
});