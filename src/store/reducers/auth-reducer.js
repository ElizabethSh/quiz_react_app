import { AUTH } from "../actions/actionTypes";

const initialState = {
  token: null,
}

// 5. Создаем редьюсер и передаем в него initialState,
// который содержит некий токен, по умолчанию равный null
const authReducer = (state = initialState, action) => {
  switch(action.type) {

    // 10. Описываем case, где мы будем возвращать измененный state
    // и изменяем state.token на переданный токен в action
    case AUTH.SUCCESS:
      return {
        ...state,
        token: action.token
      }

    // 14. Описываем case, котрый будет обнулять токен
    case AUTH.LOGOUT:
      return {
        ...state,
        token: null // обнуляем токен
      }
    
    default:
      return state;
  }
}

export default authReducer;