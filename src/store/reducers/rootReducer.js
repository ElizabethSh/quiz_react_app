import {combineReducers} from 'redux';
import quizReducer from './quiz-reducer';
import createQuizReducer from './create-quiz-reducer';

export default combineReducers({
  quizReducer,
  createQuizReducer // 4. Добавляем редьюсер добавления нового вопроса и опроса (из шага 2)
});