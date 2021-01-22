import { Component } from "react";
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
  state = {
    results: {},
    isQuizFinished: false,
    currentQuestion: 0,
    answerState: null,
    quiz: [
      {
        id: 1,
        question: `What color is the grass?`,
        correctAnswer: 3,
        answers: [
          {text: `Black`, id: 1},
          {text: `Yellow`, id: 2},
          {text: `Green`, id: 3},
          {text: `Blue`, id: 4},
        ]
      },
      {
        id: 2,
        question: `What time of year is it now?`,
        correctAnswer: 1,
        answers: [
          {text: `Winter`, id: 1},
          {text: `Spring`, id: 2},
          {text: `Summer`, id: 3},
          {text: `Autumn`, id: 4},
        ]
      },
    ]
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

  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    return (
      <div className='Quiz'>
        <div className="Quiz__wrapper">
          <h1>Answer the questions</h1>
          {this.state.isQuizFinished
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
          }
        </div>
      </div>
    )
  }
}

export default Quiz;