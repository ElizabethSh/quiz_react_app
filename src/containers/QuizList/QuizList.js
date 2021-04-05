import {React, Component} from 'react';
import {NavLink} from 'react-router-dom';
import './QuizList.css';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {fetchQuizesAction} from '../../store/actions/quiz-action-creator';

class QuizList extends Component {
  renderQuizes() {
    return (
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
    this.props.fetchQuizes();
  }

  render() {
    return(
      <div className='QuizList'>
        <div>
          <h1>Quiz List</h1>
          <ul>
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
    fetchQuizes: () => dispatch(fetchQuizesAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);