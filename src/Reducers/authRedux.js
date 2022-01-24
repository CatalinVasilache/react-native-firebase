import Immutable from "seamless-immutable";
import {createActions, createReducer} from "reduxsauce";

//Types and Action Creators
const {Types: AuthTypes, Creators: AuthActions} = createActions({
    logInAttempt: [''],
    logInSuccess: ['email', 'password'],
    logInError: [''],

    signInAttempt: [''],
    signOutAttempt: [''],
    setUser: [''],
    setEmail: ['email'],
    setPassword: ['password']
})
//Initial state
export {AuthActions, AuthTypes}

export const INITIAL_STATE = Immutable({
    userData: null,
    loading: false,
    email: '',
    password: ''
})

//Selectors
export const AuthSelectors = {
    selectUser: state => state.authReducer.user,
    selectEmail: state => state.authReducer.email,
    selectPassword: state => state.authReducer.password
}

//Reducers
export const logInAttempt = (state) => {
    console.log('login redux attempt')
    return state.merge({
        loading: true,
    })
}

export const logInSuccess = (state, {payload}) => {
    console.log('login redux success')
    return state.merge({
        loading: false,
        userData: payload
    })
}

export const logInError = (state) => {
    console.log('login redux error')
    return state.merge({
        loading: false,
    })
}

export const signInAttempt = (state) => state.merge({
    loading: false
})

export const signOutAttempt = (state) => state.merge({
    loading: false
})

export const setUser = (state) => state.merge({
    user: state.user
})

export const setEmail = (state, {email}) => state.merge({
    email: email
})

export const setPassword = (state, {password}) => state.merge({
    password: password
})

//Reducers to Types
export const authReducer = createReducer(INITIAL_STATE, {
    [AuthTypes.LOG_IN_ATTEMPT]: logInAttempt,
    [AuthTypes.SIGN_IN_ATTEMPT]: signInAttempt,
    [AuthTypes.SIGN_OUT_ATTEMPT]: signOutAttempt,
    [AuthTypes.SET_USER]: setUser,
    [AuthTypes.SET_EMAIL]: setEmail,
    [AuthTypes.SET_PASSWORD]: setPassword,
})