import { Component } from "react";
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from "react-redux";
import {fetchQuizAction} from '../../store/actions/quiz-action-creator';

class Quiz extends Component {
  // 1. Переносим поля state в initialState в файле quiz-reduser.js
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
    // 5. Вызываем функцию загрузки данных и передаем в нее id опроса
    // который нужно загрузить
    this.props.fetchQuizById(this.props.match.params.id);
  }

  renderScreen() {
    // 9. Теперь обращаемся к props, а не state
    // а здесь quiz уже чему-то равен, если загрузка прошла успешно!!!
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

          {/* 9. Теперь обращаемся к props, а не state.
              Добавляем доп. условие:
                Если сейчас происходит загрузка ИЛИ нет параметра quiz
              то загружаем Loader.
                Если  какое то из условий не выполняется
              то рендерим экран с вопросом
              перед загрузкой quiz равен null!!!
              */}
          {this.props.isLoading || !this.props.quiz
            ? <Loader />
            : this.renderScreen()
          }
        </div>
      </div>
    )
  }
}

// 3. Достаем props из редьюсера
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
    // 4. Создаем функцию, которая будет вызывать
    // загрузку опроса по его id
    fetchQuizById: (id) => dispatch(fetchQuizAction(id))
  }
}

// 2. связываем компонент с редьюсером
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);