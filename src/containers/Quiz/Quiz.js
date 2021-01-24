import { Component } from "react";
import axios from '../../axios-quiz/axios-quiz';  // импортируем axios из конфига!
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
  state = {
    results: {},
    isQuizFinished: false,
    currentQuestion: 0,
    answerState: null,
    quiz: [],  // удаляем моковые данные опросаб
    isLoading: true // заводим state для отображения loadera
  }

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

  // сбрасывает стейт до изначального
  // таким образом опрос начинается заново
  restartHandler = () => {
    this.setState({
      isQuizFinished: false,
      currentQuestion: 0,
      answerState: null,
      results: {},
    });
  }

  // проверяет, есть ли еще вопросы в опроснике
  isQuizFinished() {
    return this.state.currentQuestion + 1 === this.state.quiz.length;
  }

  async componentDidMount() {
    try {
      // получаем объект запроса по конкретному id опроса (хэшу опроса на сервере)
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json/`);

      // создаем переменную и кладем в нее полученный объект с опросом
      const quiz = response.data;

      // обновляем state: добавляем туда объект опроса и меняем флаг что данные получены
      this.setState({
        quiz,
        isLoading: false
      })
    }
    catch(err) {
      console.log(err);
    }
  }

  // метод который отображает либо экран с вопросом либо финальный экран с результатами ответов
  renderScreen() {
    return (
      this.state.isQuizFinished
        ? <FinishedQuiz
          quiz={this.state.quiz}
          results={this.state.results}
          restartHandler={this.restartHandler}
        />
        : <ActiveQuiz
          answers={this.state.quiz[this.state.currentQuestion].answers}
          question={this.state.quiz[this.state.currentQuestion].question}
          answerClickHandler={this.answerClickHandler}
          questionAmount={this.state.quiz.length}
          currentQuestion={this.state.currentQuestion + 1}
          answerState={this.state.answerState}
        />
    )
  }

  render() {
    return (
      <div className='Quiz'>
        <div className="Quiz__wrapper">
          <h1>Answer the questions</h1>

          {/* в зависимости от того, загрузились ли данные рендерим либо Loader либо какой-то из экранов */}
          {this.state.isLoading
            ? <Loader />
            : this.renderScreen()
          }
        </div>
      </div>
    )
  }
}

export default Quiz;