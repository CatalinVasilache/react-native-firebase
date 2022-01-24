import {delay, takeEvery, takeLatest, put} from 'redux-saga/effects';
import {all, call, select} from "@redux-saga/core/effects";
import {AuthActions, AuthSelectors, AuthTypes} from "../Reducers/authRedux";
import AuthService from '../Services/Auth/AuthService'
import {firebase} from "../Firebase/config";

function* logInSaga(action) {
    console.log('login saga')
    try {
        const email = yield select(AuthSelectors.selectEmail)
        const password = yield select(AuthSelectors.selectPassword)
        const response = yield call(AuthService.logIn, email, password)
        yield put(AuthActions.logInSuccess(response))
    } catch (error) {
        console.log('ERROR 1 ',error);
    }
}

function* signInSaga() {
    try {
        console.log('SIGN IN SAGA')
        // yield put(CounterActions.decreaseCounter());
    } catch (error) {
        console.log('ERROR 2 ',error);
    }
}

function* signOutSaga() {
    try {
        console.log('SIGN OUT SAGA')
        // yield put(CounterActions.decreaseCounter());
    } catch (error) {
        console.log('ERROR 3 ',error);
    }
}

function* setUserSaga() {
    try {
        console.log('SET USER SAGA')
        yield put(AuthActions.setUser());
    } catch (error) {
        console.log('ERROR 4 ',error);
    }
}
export function* watchAuthActions() {
    yield all ([
        takeLatest(AuthTypes.LOG_IN_ATTEMPT, logInSaga),
        takeLatest(AuthTypes.SIGN_IN_ATTEMPT, signInSaga),
        takeLatest(AuthTypes.SIGN_OUT_ATTEMPT, signOutSaga),
        takeLatest(AuthTypes.SET_USER, setUserSaga)
    ])
}