import Immutable from "seamless-immutable";
import {createActions, createReducer} from "reduxsauce";

//Types and Action Creators
const {Types: CounterTypes, Creators: CounterActions} = createActions({
    increaseCounter: [''],
    decreaseCounter: [''],
})
//Initial state
export {CounterActions, CounterTypes}

export const INITIAL_STATE = Immutable({
    counter: 0
})

//Selectors
export const CounterSelectors = {
    selectCounter: state => state.counter.counter,
}

//Reducers
export const increaseCounter = (state) => {
    return state.merge({
        counter: state.counter + 1
    })
}

export const decreaseCounter = (state) => state.merge({
    counter: state.counter - 1
})

//Reducers to Types
export const  counterReducer = createReducer(INITIAL_STATE, {
    [CounterTypes.INCREASE_COUNTER]: increaseCounter,
    [CounterTypes.DECREASE_COUNTER]: decreaseCounter,
})