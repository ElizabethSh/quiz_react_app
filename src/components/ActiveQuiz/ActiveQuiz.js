import './ActiveQuiz.css';
import AnswerList from '../AnswerList/AnswerList';

const ActiveQuiz = props => {
  return (
    <div className="ActiveQuiz">
      <p>
      <span>
        <b>1.</b>&nbsp;
        {props.question}
      </span>
      <small>4 из 12</small>
        
      </p>
      <AnswerList 
        answers={props.answers}
        answerClickHandler={props.answerClickHandler}
      />
    </div>
  )
}

export default ActiveQuiz;