import axios from '../../axios-quiz/axios-quiz';
import {QUIZES_FETCH, QUIZ} from './actionTypes';

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

// функция, которая определяет закончились ли вопросы в опросе
// при вызове будет передаваться state
const isQuizFinished = (state) => {
  return state.currentQuestion + 1 === state.quiz.length;
}

// функция, которая возвращает другую функцию,
// проверяющую правильность ответов
const checkAnswer = (answerId) => {
  // функция, которая проверяет правильность ответа
  // предедаем в качестве параметров функции dispatch
  // и getState из функции mapDispatchToProps компонента Quiz!
  return (dispatch, getState) => {

    // внутри функции нужно также работать со state,
    // поэтому определяем текущий state.
    // не забываем указать из какого редьюсера
    // нужно взять state (quizReducer!)
    const state = getState().quizReducer;
 
    // теперь можно обращаться к переменной state
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];

      if(state.answerState[key] === `success`) {
        return;
      }
    }

    const question = state.quiz[state.currentQuestion];
    const results = state.results;

    if (question.correctAnswer === answerId) {
      if (!results[question.id]) {
        results[question.id] = `success`;
      }

      dispatch(answerSetState({[answerId]: `success`}, results))

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {

          // если вопросы кончились диспатчим finishQuiz
          // это позволит показать экран результатов
          dispatch(finishQuiz());
        } else {

          // если вопросы остались, диспатчим getCurrentQuestion
          // который позволит показать следующий экран
          dispatch(getCurrentQuestion(state.currentQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000)
    } else {
        results[question.id] = `error`;
        dispatch(answerSetState({[answerId]: `error`}, results))
    }
  }
}

// actionCreator
// для переключения экранов с вопросами
// currentQuestion равен номеру вопроса
const getCurrentQuestion = (currentQuestion) => {
  return {
    type: QUIZ.CURRENT_QUESTION,
    currentQuestion
  }
}

// Будет использован независимо от того, правильно отвечен
// вопрос или нет, просто будет запоминать разные статусы ответов
const answerSetState = (answerState, results) => {
  return {
    type: QUIZ.SET_STATE,
    answerState, // будет передаваться объект с номером ответа и статусом (success или error)
    results,
  }
}

// actionCreator
// для отображения экрана результатов опроса
const finishQuiz = () => {
  return {
    type: QUIZ.FINISHED,
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
    type: QUIZ.FETCH_SUCCESS,
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

// actionCreator
// чтобы пройти опрос заново и чтобы сбросить результаты
// при переходе на другие экраны
const restartQuiz = () => {
  return {
    type: QUIZ.RESTART,
  }
}

export {
  fetchQuizesAction,
  fetchQuizAction,
  restartQuiz,
  checkAnswer,
};