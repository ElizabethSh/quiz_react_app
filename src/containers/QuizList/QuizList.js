import {React, Component} from 'react';
import {NavLink} from 'react-router-dom';
import './QuizList.css';
import axios from 'axios';

const quizList = [1, 2, 3];
const URL = `https://react-quiz-11101-default-rtdb.europe-west1.firebasedatabase.app/quiz.json`;

class QuizList extends Component {

  // рендерит элементы списка с ссылками на опросы
  renderQuizes() {
    return (
      quizList.map((quizItem, index) => {
        return (
          <li key={index}>
            <NavLink
              to={'/quiz/' + quizItem} // динамический адрес - например /quiz/1
            >Quiz {quizItem}</NavLink>
          </li>
        )
      })
    )
  }

  componentDidMount() {
    axios.get(URL).then(responce => {
      console.log(responce);
    })
  }

  render() {
    return(
      <div className='QuizList'>
        <div>
          <h1>Quiz List</h1>
          <ul>
            {this.renderQuizes()}
          </ul>
        </div>
      </div>
    )
  }
}

export default QuizList;