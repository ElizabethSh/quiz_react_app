import './ActiveQuiz.css';
import AnswerList from '../AnswerList/AnswerList';

const ActiveQuiz = props => {
  return (
    <div className="ActiveQuiz">
      <p>
      <span>
        <b>{props.currentQuestion}</b>&nbsp;
        {props.question}
      </span>
      <small>{props.currentQuestion} из {props.questionAmount}</small>
        
      </p>
      <AnswerList 
        answers={props.answers}
        answerClickHandler={props.answerClickHandler}
        state={props.answerState}
      />
    </div>
  )
}

export default ActiveQuiz;