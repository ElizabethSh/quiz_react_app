import {QUIZES_FETCH, QUIZ_FETCH_SUCCESS} from '../actions/actionTypes';

// переносим state из QuizList в initialState
const initialState = {
  quizes: [],
  isLoading: false, // меняем начальное состояние на false!!!
  error: null,
  results: {},
  isQuizFinished: false,
  currentQuestion: 0,
  answerState: null,
  quiz: null, // меняем на null, чтобы вначале quiz был не оределен
}

const quizReducer = (state = initialState, action) => {
  switch(action.type) {

    // если началась загрузка меняем isLoading=true
    // что позволит отображать компонент Loader
    // пока данные не будут загружены
    case QUIZES_FETCH.START:
      return ({...state, isLoading: true});

    // если данные успешно получены, меняем isLoading=false
    // чтобы скрыть Loader и отображать список опросов
    // а в quizes передаем полученные данные
    case QUIZES_FETCH.SUCCESS:
      return ({...state, isLoading: false, quizes: action.payload});
    
    // 8. Описываем новый case
    // при успешной загрузке опроса загрузка окончена
    // а quiz равен payload, который содержит загруженный quiz
    case QUIZ_FETCH_SUCCESS:
      return ({...state, isLoading: false, quiz: action.payload})
    
    // если произошла ошибка, меняем isLoading=false
    // что означает что загрузка окончена
    // а в error передаем полученную ошибку
    case QUIZES_FETCH.ERROR:
      return ({...state, isLoading: false, error: action.payload});
    
    default:
      return state;
  }
}

export default quizReducer;