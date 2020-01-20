import {
  GET_HIGHEST_SCORE,
  SET_HIGHEST_SCORE,
} from '../action-types'

export const setScore = (score) => {
  let now = Date.now()
  let scoreRecord = {
    scoreDate: now,
    score: score
  }
  localStorage.setItem('scoreRecord', JSON.stringify(scoreRecord));
  return dispatch => {
    dispatch(success(scoreRecord));
  }
  function success(score) { return { type: SET_HIGHEST_SCORE, score }  }
}

export const getScore = () => {
  let score = JSON.parse(localStorage.getItem('scoreRecord'));
  return dispatch => {
    dispatch(success(score));
  }
  function success(score) { return { type: GET_HIGHEST_SCORE, score } }
}
