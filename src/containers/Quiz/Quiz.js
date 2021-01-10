import { Component } from "react";
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    currentQuestion: 0,
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
    console.log(`Clicked answer`, answerId);
    console.log(this.state);

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })
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
          />
        </div>
      </div>
    )
  }
}

export default Quiz;