import axios from "../../axios-quiz/axios-quiz";
import { ADD_QUIZ, CREATE_QUESTION } from "./actionTypes";


// 11. Добавляем actionCreator который будет возвращать
// action для добавления нового вопроса
// В качестве параметра принимает созданный объект вопроса
// и передает его в редьюсер createQuizReducer
const addQuestion = (questionItem) => {
  return {
    type: CREATE_QUESTION,
    questionItem
  }
}

// 14. Добавляем метод который будет добавлять на сервер опрос
// и диспатчить 
const addQuiz = () => {

  // 14.1 Поскольку нам нужно получить доступ к глобальному State
  // поэтому в параметрах получаем также метод getState
  return async (dispatch, getState) => {
    // 14.2 а здесь его используем: получаем quiz из глобального state
    // чтобы отправить этот массив с вопросами на сервер
    await axios.post(`/quizes.json`, getState().createQuizReducer.quiz);

    // 14.3 После этого массив quiz нужно обнулить, чтобы
    // можно было заново создавать новый тест
    // поэтому здесь диспатчим actionCreator - finishQuizCreation,
    dispatch(finishQuizCreation())
  }
}

// 15. Описываем actionCreator, который будет
// возвращать action, который в редьюсере будет обнулять
// массив quiz из глобального State
const finishQuizCreation = () => {
  return {
    type: ADD_QUIZ,
  }
}

export {addQuestion, addQuiz};