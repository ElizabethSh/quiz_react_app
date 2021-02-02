import axios from 'axios';
import { AUTH } from './actionTypes';

// 8. Создаем функцию auth, которая диспатчиться в mapDispatchToProps
// компонента Auth.js
const auth = (email, password, isLogin) => {
  // 8.1 возвращаем асинхронный dispatch, т.к. мы будем делать запрос к серверу
  return async (dispatch) => {
    
    // 8.2 Формируем authData, который будем использовать при запросе на серверб
    // и передаем в него полученные в функцию параметры
    // email и password, а параметр returnSecureToken 
    // всегда должен быть true
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    // 8.3 Определяем какой именно запрос нужно делать:
    // на авторизацию или регистрацию:
    // заведем переменную url, которая по умолчанию будет
    // равна урлу на регистрацию (signUp в урле)
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCVlUm9l1LKdRU0M7SIpTipojZMdnt2u0`;

    // 8.4 Если переданный в функцию параметр isLogin равен true
    // то используем url для авторизации (SignIn в урле)
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCVlUm9l1LKdRU0M7SIpTipojZMdnt2u0`
    }

    // 8.5 Делаем запрос на сервер по одному из урлов и передавая
    // параметр authData, сформированный на шаге 8.2
    // результат запроса сохраняем в переменную response
    const response = await axios.post(url, authData);
    const data = response.data;

    // 8.6 Авторизуемся в форме авторизации! Выводим для наглядности
    // в консоль результат запроса.
    // Нас будут интересовать несколько параметров:
    //  - idToken позволяет держать сессию,
    //  - localId нужен для определения пользователя,
    //  - expiresIn позволит определить когда именно закончится сессия
    console.log(data);

    

    // 8.9 Обычно токены выдаются на час (3600 сек), поэтому нам нужно
    // проверять закончилась ли сессия и нужно ли получать новый токен
    // т.е. заново авторизироваться
    // Для этого используем конструктор new Date,
    // внутри которого получаем текущий таймштамп (new Date().getTime()),
    // и прибавить к нему параметр data.expiresIn, умноженный на 1000
    // (т.к. data.expiresIn равен 3600 МИЛИсекунд!)
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    // 8.7 Чтобы поддерживать сессию в реакт-приложении
    // нужно токен, полученный с сервера, положить в localStorage,
    // чтобы иметь к нему доступ
    localStorage.setItem(`token`, data.idToken);

    
    // 8.8 Заносим в localStorage локальный id пользователя
    // равен уник.идентификатору пользователя в Firebase.
    localStorage.setItem(`userId`, data.localId);

    // 8.10 Полученную на прошлом шаге переменную тоже складываем
    // в localStorage
    localStorage.setItem(`expirationDate`, expirationDate);

    // 8.11 Диспатчим новое событие authSuccess, 
    // куда передадим параметр токена, чтобы поддерживать данную сессию
    dispatch(authSuccess(data.idToken));
    
    // 11. Мы знаем что через час сессия должна закончится,
    // поэтому диспатчим метод, который будет устанавливать таймер
    // на время, переданное в параметре (data.expiresIn)
    dispatch(autoLogout(data.expiresIn));
  }
}

// 9. Создадим actionCreator
// при успешной авторизации передаем токен в actionCreator
// который будет передан в редьюсер authReducer
const authSuccess = (token) => {
  return {
    type: AUTH.SUCCESS,
    token
  }
}

// 12. Описываем функцию autoLogout, которая по прошествии часа
// будет диспатчить actionCreator, который будет разлогинивать 
const autoLogout = (time) => {

  // 15. при разлогинивании очищаем localStorage
  localStorage.removeItem(`token`);
  localStorage.removeItem(`userId`);
  localStorage.removeItem(`expirationDate`);

  // 12.1 Через переданное в параметр время будет диспатчиться
  // actionCreator authLogout, в результате которого
  // токен в редьюсере authReducer будет обнулен
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, time * 1000)
  }
}

// 13 Реализуем actionCreator
const authLogout = () => {
  return {
    type: AUTH.LOGOUT
  }
}

export {auth};