import React from 'react';
import {Link} from 'react-router-dom';
import './FinishedQuiz.css';
import Button from '../UI/Button/Button';

const FinishedQuiz = props => {
  const {results, restartHandler, quiz} = props;

  const answers = Object.values(results);
  const correctAnswers = answers.reduce((acc, answer) => {
    if (answer === `success`) {
      acc ++;
    }
    return acc;
  }, 0)

  return (
    <div className='FinishedQuiz'>
      <ul>
        {quiz.map((quizItem, index) => {

          // формируем имя класса для отображения и оформления иконок
          const classes = [`fa`,  // обязательный префикс
          results[quizItem.id] === `error` ? `fa-times` : `fa-check`, // крестик или галка
          results[quizItem.id]  // добавление класса success или error
          ];

          return (
            <li key={index}>
              <b>{index + 1}</b>.&nbsp;
              {quizItem.question}
              <i className={classes.join(` `)}/>
            </li>
          )
        })}
      </ul>
      <p>Correct answers are {correctAnswers} out of {quiz.length}</p>
      <Button type='primary'
        onClick={restartHandler}
      >Restart</Button>

      {/* добавляем кнопке функционал перехода на страницу со списком опросов */}
      <Link to='/'>
        <Button type='success'>Go to the list of quizes</Button>
      </Link>
    </div>
  )
}

export default FinishedQuiz;