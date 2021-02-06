import { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import { connect } from 'react-redux';
import Logout from './containers/Logout/Logout';

class App extends Component {
  render() {

    // 4. На основе параметра isAuthenticated определим
    // какие параметры показывать, а какие нет
    // т.е. сформируем условный jsx
    let routs = ( // роуты по умолчанию
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
        <Redirect to='/' />
      </Switch>
    );

    // 4.1 Если пользователь авторизован, то используем
    // следующие роуты:
    if (this.props.isAuthenticated) {
      routs = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/logout' component={Logout} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/' exact component={QuizList} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
        <Layout>
          {/* 4.2 Передаем переменную с получившимися роутами */}
          {routs}
        </Layout>
    );
  }
}

// 3. Создаем функцию mapStateToProps, которая будет возвращать
// props - isAutentificated, который позволяет определить авторизован
// сейчас пользователь или нет
const mapStateToProps = (state) => {
  return {
    // `!!` приведут к булевому значению, т.о. если токен есть
    // то значение будет равно true
    isAuthenticated: !!state.authReducer.token
  }
}

// 2. Связываем компонент App со store
export default connect(mapStateToProps)(App);
