import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {authLogout} from '../../store/actions/auth'

// ЗАДАЧА: Добавить возможность разлогиниваться из приложения
// и на основании авторизован пользователь или нет
// показывать разные пункты меню.
// Например, если пользователь не авторизован, то он не может
// создавать тест (этот пункт меню не нужно показывать).
// А если он авторизован, то у него должна быть возможность
// разлогиниться.
// -----------------------------------------------------------
// 1. Создаем компонент Logout, который позволит разлогиниться
class Logout extends Component {
  // 1.4 После рендера компонента нужно вызвать
  // функцию, которая будет диспатчить action - authLogout
  // (в результате будет обнуляться token)
  componentDidMount() {
    this.props.logout();
  }

  // 1.3 Воспользуемся хаком: в методе render вернем
  // компонент Redirect, который при выходе из системы
  // будет перенаправлять на главную страницу
  render() {
    return <Redirect to='/' />
  }
}

// 1.2 Создаем mapDispatchToProps, которая возвращает функцию,
// которая будет диспатчить action - authLogout 
// (в результате будет обнуляться token)
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {dispatch(authLogout())}
  }
}

// 1.1 Связываем компонент с редаксом. Здесь нам не нужен никакой
// state, поэтому первым параметром передаем null
export default connect(null, mapDispatchToProps)(Logout);