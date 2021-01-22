import {React, Component} from 'react';
import {NavLink} from 'react-router-dom';
import './QuizList.css';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

// опросы лежат в папке quizes на сервере
const URL = `https://react-quiz-11101-default-rtdb.europe-west1.firebasedatabase.app/quizes.json`;

class QuizList extends Component {

  state = {
    quizes: [],
    isLoading: true,
  }

  // рендерит элементы списка с ссылками на опросы
  renderQuizes() {
    return (
      this.state.quizes.map((quiz) => { // вместо моковых данных используем данные с сервера
        return (
          <li key={quiz.id}>
            <NavLink
              to={'/quiz/' + quiz.id} // динамический адрес - например /quiz/id, по id заберем нужный опрос
            >{quiz.name}</NavLink>
          </li>
        )
      })
    )
  }

  async componentDidMount() {
    try {
      const response = await axios.get(URL);
      const quizes = []; // создаем локальную переменную quizes

      // преобразовываем полученные данные в мапу quizes с теми данными,
      // которые нам необходимы для использования в реакт-компонентах
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,  // это криптоключ, который присвоен этому опросу на сервере
          name: `Quiz №${index + 1}`  // название опроса, которое выведется в списке опросов
        })
      })

      this.setState({
        quizes,
        isLoading: false
      });
    }
    catch(err) {
      console.log(err);
    }

  }

  render() {
    return(
      <div className='QuizList'>
        <div>
          <h1>Quiz List</h1>
          <ul>
            {this.state.isLoading
              ? <Loader />
              : this.renderQuizes()
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default QuizList;