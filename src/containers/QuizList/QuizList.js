import {React, Component} from 'react';
import {NavLink} from 'react-router-dom';
import './QuizList.css';

const quizList = [1, 2, 3];

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