import axios from '../../axios-quiz/axios-quiz';
import {QUIZES_FETCH, QUIZ_FETCH_SUCCESS} from './actionTypes';

// функция, которая будет вызывать actionCreatorы
// в зависимости от ситуации
const fetchQuizesAction = () => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(`/quizes.json`);
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Quiz №${index + 1}`,
        })
      })

      dispatch(fetchQuizesSuccess(quizes));
    
    } catch(err) {
      dispatch(fetchQuizesError(err));
    }
  }
}

const fetchQuizAction = (id) => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    
    try {
      const response = await axios.get(`/quizes/${id}.json/`);
      const quiz = response.data;
  
      dispatch(fetchQuizSuccess(quiz));

    }catch(err) {
      dispatch(fetchQuizesError(err));
    }
  }
}

// actionCreator
const fetchQuizesStart = () => {
  return {
    type: QUIZES_FETCH.START,
  }
}

// actionCreator
const fetchQuizesSuccess = (quizes) => {
  return {
    type: QUIZES_FETCH.SUCCESS,
    payload: quizes
  }
}

// actionCreator
const fetchQuizSuccess = (quiz) => {
  return {
    type: QUIZ_FETCH_SUCCESS,
    payload: quiz,
  }
}

// actionCreator
const fetchQuizesError = (err) => {
  return {
    type: QUIZES_FETCH.ERROR,
    payload: err,
  }
}

export {fetchQuizesAction, fetchQuizAction};