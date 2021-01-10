import { Component } from "react";
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: `What is color of gras?`,
        correctAnswer: `3`,
        answers: [
          {text: `Black`, id: `1`},
          {text: `Yellow`, id: `2`},
          {text: `Green`, id: `3`},
          {text: `Blue`, id: `4`},
        ]
      }
    ]
  }

  answerClickHandler(answerId) {
    console.log(`Clicked answer`, answerId)
  }

  render() {
    return (
      <div className='Quiz'>
        <div className="Quiz__wrapper">
          <h1>Answer the questions</h1>
          <ActiveQuiz 
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            answerClickHandler={this.answerClickHandler}
          />
        </div>
      </div>
    )
  }
}

export default Quiz;