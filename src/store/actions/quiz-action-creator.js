import axios from '../../axios-quiz/axios-quiz';
import {QUIZES_FETCH, QUIZ_FETCH_SUCCESS} from './actionTypes';

// функция, которая будет вызывать actionCreatorы
// в зависимости от ситуации
const fetchQuizesAction = () => {
  return async (dispatch) => {
    // перед загрузкой данных диспатчим 
    // actionCreator fetchQuizStart
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

      // если загрузка прошла успешно
      // диспатчим actionCreator fetchQuizSuccess
      // и передаем ему полученные данные
      dispatch(fetchQuizesSuccess(quizes));
    
    } catch(err) {
      // если произошла ошибка
      // диспатчим actionCreator fetchQuizError
      // и передаем ему ошибку
      dispatch(fetchQuizesError(err));
    }
  }
}

// 6. Описываем функцию загрузки данных и диспатча actions
const fetchQuizAction = (id) => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart()); // вначале диспатчим fetchQuizesStart, чтобы отображался Loader пока не загрузятся данные
    
    try {
      const response = await axios.get(`/quizes/${id}.json/`);
      const quiz = response.data;
  
      // при успешной загрузке диспатчим fetchQuizSuccess и
      // передаем туда загруженный опрос
      dispatch(fetchQuizSuccess(quiz));
    }
    catch(err) {
      // при ошибке диспатчим fetchQuizesError и передаем в нее ошибку
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
    payload: quizes // передаем в payload полученные данные
  }
}

// 7. Описываем actionCreator fetchQuizSuccess
// в который будем передавать загруженный quiz
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
    payload: err, // передаем в payload ошибку
  }
}

export {fetchQuizesAction, fetchQuizAction};