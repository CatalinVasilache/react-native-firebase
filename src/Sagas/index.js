// Imports: Dependencies
import {all, fork} from 'redux-saga/effects';

// Imports: Redux Sagas
import {watchCounterActions} from './counterSaga';
import {watchAuthActions} from "./authSaga";

// Redux Saga: Root Saga
export default function* rootSaga() {
    yield all([
        watchCounterActions(),
        watchAuthActions()
    ]);
}