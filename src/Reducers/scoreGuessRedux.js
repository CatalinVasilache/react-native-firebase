import Immutable from "seamless-immutable";
import {createActions, createReducer} from "reduxsauce";

//Types and Action Creators
const {Types: ScoreGuessTypes, Creators: ScoreGuessActions} = createActions({
    increaseHomeGoals: [''],
    decreaseHomeGoals: [''],
    increaseAwayGoals: [''],
    decreaseAwayGoals: [''],
    submitScoreGuess: ['']
})
//Initial state
export {ScoreGuessTypes, ScoreGuessActions}

export const INITIAL_STATE = Immutable({
    homeGoals: 0,
    awayGoals: 0,
    currentScoreGuess: {
        currentHomeGoals: 0,
        currentAwayGoals: 0
    }
})

//Selectors
export const ScoreGuessSelectors = {
    selectHomeGoals: state => state.scoreGuess.homeGoals,
    selectAwayGoals: state => state.scoreGuess.awayGoals
}

//Reducers
export const increaseHomeGoals = (state) => {
    if (state.homeGoals < 16) {
        return state.merge({
            homeGoals: state.homeGoals + 1
        })
    }
    return state.merge({
        homeGoals: 16
    })
}

export const decreaseHomeGoals = (state) => {
    if (state.homeGoals > 0) {
        return state.merge({
            homeGoals: state.homeGoals - 1
        })
    }
    return state.merge({
        homeGoals: 0
    })
}

export const increaseAwayGoals = (state) => {
    if (state.awayGoals < 16) {
        return state.merge({
            awayGoals: state.awayGoals + 1
        })
    }
    return state.merge({
        awayGoals: 16
    })
}

export const decreaseAwayGoals = (state) => {
    if (state.awayGoals > 0) {
        return state.merge({
            awayGoals: state.awayGoals - 1
        })
    }
    return state.merge({
        awayGoals: 0
    })
}

export const submitScoreGuess = (state) => state.merge({
    currentScoreGuess: {currentHomeGoals: state.homeGoals, currentAwayGoals: state.awayGoals}
})

//Reducers to Types
export const scoreGuessReducer = createReducer(INITIAL_STATE, {
    [ScoreGuessTypes.INCREASE_HOME_GOALS]: increaseHomeGoals,
    [ScoreGuessTypes.DECREASE_HOME_GOALS]: decreaseHomeGoals,
    [ScoreGuessTypes.INCREASE_AWAY_GOALS]: increaseAwayGoals,
    [ScoreGuessTypes.DECREASE_AWAY_GOALS]: decreaseAwayGoals,
    [ScoreGuessTypes.SUBMIT_SCORE_GUESS]: submitScoreGuess
})