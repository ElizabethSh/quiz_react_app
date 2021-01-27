import {React, Component} from 'react';
import {NavLink} from 'react-router-dom';
import './QuizList.css';
import axios from '../../axios-quiz/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

class QuizList extends Component {

  state = {
    quizes: [],
    isLoading: true,
  }

  renderQuizes() {
    return (
      this.state.quizes.map((quiz) => {
        return (
          <li key={quiz.id}>
            <NavLink
              to={'/quiz/' + quiz.id}
            >{quiz.name}</NavLink>
          </li>
        )
      })
    )
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes.json`);
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Quiz №${index + 1}`,
        })
      })

      this.setState({
        quizes,
        isLoading: false,
      });
    } catch(err) {
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