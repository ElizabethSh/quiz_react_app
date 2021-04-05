import { Component } from "react";
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from "react-redux";
import {
  fetchQuizAction,
  restartQuiz,
  checkAnswer,
} from '../../store/actions/quiz-action-creator';

class Quiz extends Component {
  // переносим логику обработчиков в файл quiz-action-creator.js
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  // функция, которая будет вызывать action,
  // в результате которого будет сброс
  // состояния опроса в изначальное состояние
  componentWillUnmount() {
    this.props.resetQuiz();
  }

  renderScreen() {
    return (
      this.props.isQuizFinished
        ? <FinishedQuiz
          quiz={this.props.quiz}
          results={this.props.results}
          restartHandler={this.props.restartQuiz} 
        />
        : <ActiveQuiz
          answers={this.props.quiz[this.props.currentQuestion].answers}
          question={this.props.quiz[this.props.currentQuestion].question}
          answerClickHandler={this.props.checkAnswer}
          questionAmount={this.props.quiz.length}
          currentQuestion={this.props.currentQuestion + 1}
          answerState={this.props.answerState}
        />
    )
  }

  render() {
    return (
      <div className='Quiz'>
        <div className="Quiz__wrapper">
          <h1>Answer the questions</h1>

          {this.props.isLoading || !this.props.quiz
            ? <Loader />
            : this.renderScreen()
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.quizReducer.results,
    isQuizFinished: state.quizReducer.isQuizFinished,
    currentQuestion: state.quizReducer.currentQuestion,
    answerState: state.quizReducer.answerState,
    quiz: state.quizReducer.quiz,
    isLoading: state.quizReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizAction(id)),

    // переносим обработчики в пропсы
    checkAnswer: (answerId) => dispatch(checkAnswer(answerId)),
    restartQuiz: () => dispatch(restartQuiz()), // пройти опрос заново
    resetQuiz: () => dispatch(restartQuiz()), // сбросить результаты при переключении опросов или экранов. Используется restartQuiz!
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);