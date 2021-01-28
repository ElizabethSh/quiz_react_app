import { Component } from "react";
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from "react-redux";
import {fetchQuizAction} from '../../store/actions/quiz-action-creator';

class Quiz extends Component {
  answerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];

      if(this.state.answerState[key] === `success`) {
        return;
      }
    }

    const question = this.state.quiz[this.state.currentQuestion];
    const results = this.state.results;

    if (question.correctAnswer === answerId) {
      if (!results[question.id]) {
        results[question.id] = `success`;
      }
      this.setState({
        answerState: {[answerId]: `success`},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({isQuizFinished: true})
        } else {
          this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout);
      }, 1000)
    } else {
      results[question.id] = `error`;
      this.setState({
        answerState: {[answerId]: `error`},
        results
      })
    }
  }

  restartHandler = () => {
    this.setState({
      isQuizFinished: false,
      currentQuestion: 0,
      answerState: null,
      results: {},
    });
  }

  isQuizFinished() {
    return this.props.currentQuestion + 1 === this.props.quiz.length;
  }

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  renderScreen() {
    return (
      this.props.isQuizFinished
        ? <FinishedQuiz
          quiz={this.props.quiz}
          results={this.props.results}
          restartHandler={this.restartHandler}
        />
        : <ActiveQuiz
          answers={this.props.quiz[this.props.currentQuestion].answers}
          question={this.props.quiz[this.props.currentQuestion].question}
          answerClickHandler={this.answerClickHandler}
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
    fetchQuizById: (id) => dispatch(fetchQuizAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);