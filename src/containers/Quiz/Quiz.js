import { Component } from "react";
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state={
    quiz: []
  }

  render() {
    return (
      <div className='Quiz'>
        <div className="Quiz__wrapper">
          <h1>Quiz</h1>
          <ActiveQuiz />
        </div>
      </div>
    )
  }
}

export default Quiz;