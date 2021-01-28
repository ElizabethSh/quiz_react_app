import {React, Component} from 'react';
import {NavLink} from 'react-router-dom';
import './QuizList.css';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {fetchQuizesAction} from '../../store/actions/quiz-action-creator';

class QuizList extends Component {
  // удаляем более не нужный state
  // теперь он находится в редьюсере quizReducer
  renderQuizes() {
    return (
      // обращаемся не к state а к props
      this.props.quizes.map((quiz) => {
        return (
          <li key={quiz.id}>
            <NavLink
              to={'/quiz/' + quiz.id}
            >{quiz.name}</NavLink>
          </li>
        )
      })
    )
  }

  componentDidMount() {
    // теперь загрузка данных не происходит в react компоненте
    // т.о. бизнес-логика отделена от отображения
    this.props.fetchQuizes();
  }

  render() {
    return(
      <div className='QuizList'>
        <div>
          <h1>Quiz List</h1>
          <ul>
          {/* обращаемся не к state а к props и добавляем доп.условие*/}
            {this.props.isLoading && this.props.quizes.length !== 0
              ? <Loader />
              : this.renderQuizes()
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quizes: state.quizReducer.quizes,
    isLoading: state.quizReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // создаем функцию fetchQuizes, которая в методе componentDidMount
    // будет диспатчить функцию, которая в зависимости от ситуации
    // будет вызывать соответствующие actionCreatorы
    fetchQuizes: () => dispatch(fetchQuizesAction()),
  }
}

// связываем компонент с redux
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);