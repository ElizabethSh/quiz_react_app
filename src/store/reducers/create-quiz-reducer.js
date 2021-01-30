import { ADD_QUIZ, CREATE_QUESTION } from "../actions/actionTypes";

// 3. Сюда переносим quiz из компонента QuizCreator
const initialState = {
  quiz: []
}

// 2. Создаем редьюсер для добавления нового вопроса
// и опроса
const createQuizReducer = (state = initialState, action) => {
  switch(action.type) {

    // 12. Описываем case добавления нового вопроса
    case CREATE_QUESTION:
      return {
        ...state,

        // 12.1 Нам нужно добавить в массив quiz объект нового вопроса - questionItem
        // который мы передаем в редьюсер из actionCreator - addQuestion.
        // При этом НЕЛЬЗЯ МУТИРОВАТЬ МАССИВ В STATE!
        // Поэтому в качестве параметра quiz мы будем получать новый массив:
        // развернем массив quiz с помощью spread-оператора (...state.quiz),
        // и добавим к нему объект нового вопроса questionItem из action
        quiz: [...state.quiz, action.questionItem]
      }

    case ADD_QUIZ:
      return {
        ...state,
        quiz: []
      }
    default:
      return state;
  }
}

export default createQuizReducer;