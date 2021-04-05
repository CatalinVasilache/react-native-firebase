// Imports: Dependencies
import {delay, takeEvery, takeLatest, put} from 'redux-saga/effects';
import {CounterActions, CounterTypes} from "../Reducers/counterRedux";
import {all} from "@redux-saga/core/effects";

function* increaseCounterSaga() {
    try {
        // yield delay(4000);
        yield put(CounterActions.increaseCounter())
        // console.log('INCREASE COUNTER SAGA')
    } catch (error) {
        console.log('ERROR',error);
    }
}

// Decrease Counter Async
function* decreaseCounterSaga() {
    try {
        // console.log('DECREASE COUNTER SAGA')
        yield put(CounterActions.decreaseCounter());
    } catch (error) {
        console.log('ERROR',error);
    }
}

export function* watchCounterActions() {
yield all ([
    takeLatest(CounterTypes.INCREASE_COUNTER, increaseCounterSaga),
    takeLatest(CounterTypes.DECREASE_COUNTER, decreaseCounterSaga)
])
}