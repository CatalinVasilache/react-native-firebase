// import {createActions, createReducer} from 'reduxsauce'
// import Immutable from 'seamless-immutable'
//
// //Types and Action Creators
// const {Types: AppTypes, Creators: AppActions} = createActions({
//     addNewEntityAttempt: [''],
//     addNewEntitySuccess: ['payload'],
//     addNewEntityError: ['error']
// })
//
// export {AppActions, AppTypes}
//
// //Initial State
// export const INITIAL_STATE = Immutable({
//     entityText: '',
//     loading: false
// })
//
// //Selectors
// export const AppSelectors = {
//     selectEntityText: state => state.app.entityText,
//     selectLoading: state => state.app.loading
// }
//
// //Reducers
// export const addNewEntityAttempt = (state) => state.merge({
//     loading: true
// })
//
// export const addNewEntitySuccess = (state, {payload}) => state.merge({
//     loading: false,
//     entityText: payload.entityText,
//     error: null
// })
//
// export const addNewEntityError = (state, {error}) => state.merge({
//     loading: false,
//     error: error
// })
//
// //Reducers to Types
// export const appReducer = createReducer(INITIAL_STATE, {
//     [AppTypes.ADD_NEW_ENTITY_ATTEMPT]: addNewEntityAttempt,
//     [AppTypes.ADD_NEW_ENTITY_SUCCESS]: addNewEntitySuccess,
//     [AppTypes.ADD_NEW_ENTITY_ERROR]: addNewEntityError
// })
