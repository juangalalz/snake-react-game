import {
  GET_HIGHEST_SCORE,
  SET_HIGHEST_SCORE,
} from '../action-types'

const initialState = {
  highestScore: false,
}

const score = (state = initialState, action) => {
  switch (action.type) {

    case SET_HIGHEST_SCORE: {
      return {
        ...state,
        highestScore: action.score
      }
    }

    case GET_HIGHEST_SCORE: {
      return {
        ...state,
        highestScore: action.score
      }
    }

    default:
      return state
  }
}

export default score
