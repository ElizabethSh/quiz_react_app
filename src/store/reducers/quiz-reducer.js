import {QUIZ_FETCH} from '../actions/actionTypes';

// переносим state из QuizList в initialState
const initialState = {
  quizes: [],
  isLoading: false, // меняем начальное состояние на false!!!
  error: null,
}

const quizReducer = (state = initialState, action) => {
  switch(action.type) {

    // если началась загрузка меняем isLoading=true
    // что позволит отображать компонент Loader
    // пока данные не будут загружены
    case QUIZ_FETCH.START:
      return ({...state, isLoading: true});

    // если данные успешно получены, меняем isLoading=false
    // чтобы скрыть Loader и отображать список опросов
    // а в quizes передаем полученные данные
    case QUIZ_FETCH.SUCCESS:
      return ({...state, isLoading: false, quizes: action.payload});
    
    // если произошла ошибка, меняем isLoading=false
    // что означает что загрузка окончена
    // а в error передаем полученную ошибку
    case QUIZ_FETCH.ERROR:
      return ({...state, isLoading: false, error: action.payload});
    
    default:
      return state;
  }
}

export default quizReducer;