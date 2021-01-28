import {QUIZES_FETCH, QUIZ_FETCH_SUCCESS} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  isLoading: false,
  error: null,
  results: {},
  isQuizFinished: false,
  currentQuestion: 0,
  answerState: null,
  quiz: null,
}

const quizReducer = (state = initialState, action) => {
  switch(action.type) {
    case QUIZES_FETCH.START:
      return ({...state, isLoading: true});

    case QUIZES_FETCH.SUCCESS:
      return ({...state, isLoading: false, quizes: action.payload});
    
    case QUIZ_FETCH_SUCCESS:
      return ({...state, isLoading: false, quiz: action.payload})
    
    case QUIZES_FETCH.ERROR:
      return ({...state, isLoading: false, error: action.payload});
    
    default:
      return state;
  }
}

export default quizReducer;