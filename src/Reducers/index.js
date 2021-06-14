// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import {counterReducer} from './counterRedux';
import {authReducer} from './authRedux'
import {scoreGuessReducer} from "./scoreGuessRedux";
// Redux: Root Reducer
export const rootReducer = combineReducers({
    counter: counterReducer,
    scoreGuess: scoreGuessReducer,
    authReducer: authReducer
});