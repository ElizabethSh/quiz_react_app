import {QUIZES_FETCH, QUIZ} from '../actions/actionTypes';

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
    
    case QUIZ.FETCH_SUCCESS:
      return ({...state, isLoading: false, quiz: action.payload});

    case QUIZ.RESTART:
      return {...state,
        isQuizFinished: false,
        currentQuestion: 0,
        answerState: null,
        results: {},
      }

    case QUIZ.SET_STATE:
      return {...state,
        results: action.results,
        answerState: action.answerState,
      }

    case QUIZ.FINISHED:
      return {...state,
        isQuizFinished: true, // если вопросы кочились, то isQuizFinished = true
      }

    case QUIZ.CURRENT_QUESTION:
      return {...state,
        currentQuestion: action.currentQuestion,
        answerState: null,
      }
    
    case QUIZES_FETCH.ERROR:
      return ({...state, isLoading: false, error: action.payload});
    
    default:
      return state;
  }
}

export default quizReducer;