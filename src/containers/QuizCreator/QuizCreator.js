import {React, Component} from 'react';
import './QuizCreator.css';
import Button from '../../components/UI/Button/Button';

class QuizCreator extends Component {
  submitHandler = (e) => {
    e.preventDefault();
  }

  addQuestionHandler = () => {

  }

  addQuizHandler = () => {

  }

  render() {
    return(
      <div className={'QuizCreator'}>
        <div>
          <h1>Add Quiz</h1>
          <form onSubmit={this.submitHandler}>
            <input />
            <hr />
            <input />
            <input />
            <input />
            <input />

            <select />

          <Button 
            type='primary' 
            onClick={this.addQuestionHandler}
          >Add question</Button>

          <Button 
            type='success' 
            onClick={this.addQuizHandler}
          >Add quiz</Button>

          </form>

        </div>
      </div>
    )
  }
}

export default QuizCreator;