import axios from '../../axios-quiz/axios-quiz';
import {QUIZ_FETCH} from './actionTypes';

// функция, которая будет вызывать actionCreatorы
// в зависимости от ситуации
const fetchQuizAction = () => {
  return async (dispatch) => {
    // перед загрузкой данных диспатчим 
    // actionCreator fetchQuizStart
    dispatch(fetchQuizStart())
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
      dispatch(fetchQuizSuccess(quizes));
    
    } catch(err) {
      // если произошла ошибка
      // диспатчим actionCreator fetchQuizError
      // и передаем ему ошибку
      dispatch(fetchQuizError(err));
    }
  }
}

// actionCreator
const fetchQuizStart = () => {
  return {
    type: QUIZ_FETCH.START,
  }
}

// actionCreator
const fetchQuizSuccess = (quizes) => {
  return {
    type: QUIZ_FETCH.SUCCESS,
    payload: quizes // передаем в payload полученные данные
  }
}

// actionCreator
const fetchQuizError = (err) => {
  return {
    type: QUIZ_FETCH.ERROR,
    payload: err, // передаем в payload ошибку
  }
}

export default fetchQuizAction;