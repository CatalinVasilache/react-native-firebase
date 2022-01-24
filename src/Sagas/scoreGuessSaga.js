// Imports: Dependencies
import {delay, takeEvery, takeLatest, put} from 'redux-saga/effects';
import {ScoreGuessActions, ScoreGuessTypes} from "../Reducers/scoreGuessRedux";
import {all} from "@redux-saga/core/effects";

function* submitScoreGuessSaga() {
    try {
        // yield delay(4000);
        // yield put(CounterActions.increaseCounter())
        console.log('Submit score guess')
    } catch (error) {
        console.log('ERROR',error);
    }
}

export function* watchScoreGuessActions() {
    yield all ([
        takeLatest(ScoreGuessTypes.SUBMIT_SCORE_GUESS, submitScoreGuessSaga),
    ])
}