import { Component } from "react";
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    answerState: null, // состояние ответа, будет объект типа {[answerId]: `success` or `error`}
    quiz: [
      {
        id: `01`,
        question: `What color is the grass?`,
        correctAnswer: `3`,
        answers: [
          {text: `Black`, id: `1`},
          {text: `Yellow`, id: `2`},
          {text: `Green`, id: `3`},
          {text: `Blue`, id: `4`},
        ]
      },
      {
        id: `02`,
        question: `What time of year is it now?`,
        correctAnswer: `1`,
        answers: [
          {text: `Winter`, id: `1`},
          {text: `Spring`, id: `2`},
          {text: `Summer`, id: `3`},
          {text: `Autumn`, id: `4`},
        ]
      },
    ]
  }
  

  // СТРЕЛОЧНАЯ функция! - контекст не будет теряться!!!
  // Если завести обычную - то нужно биндить в конструкторе!
  answerClickHandler = (answerId) => {
    const question = this.state.quiz[this.state.currentQuestion]; // получаем объект текущего вопроса

    // проверка правильности ответа
    if (question.correctAnswer === answerId) {
      // если ответ правильный

      // состояние ответа будет {[answerId]: `success`}
      // и будет добавлен соответствующий класс
      this.setState({
        answerState: {[answerId]: `success`}
      })

      // устанавливаем таймаут чтобы результат ответа показывался с задержкой
      const timeout = window.setTimeout(() => {

        // проверка, кончились ли вопросы
        if (this.isQuizFinished()) {
          console.log(`finished`);
        } else {
          this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout); // удаление таймаута
      }, 1000)
    } else {
      // если ответ неправильный, то состояние ответа будет
      // {[answerId]: `error`} и будет добавлен соответствующий класс
      this.setState({
        answerState: {[answerId]: `error`}
      })
    }
  }

  // проверяет, есть ли еще вопросы в опроснике
  isQuizFinished() {
    return this.state.currentQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className='Quiz'>
        <div className="Quiz__wrapper">
          <h1>Answer the questions</h1>
          <ActiveQuiz 
            answers={this.state.quiz[this.state.currentQuestion].answers}
            question={this.state.quiz[this.state.currentQuestion].question}
            answerClickHandler={this.answerClickHandler}
            questionAmount={this.state.quiz.length}
            currentQuestion={this.state.currentQuestion + 1}
            answerState={this.state.answerState}
          />
        </div>
      </div>
    )
  }
}

export default Quiz;