import './ActiveQuiz.css';
import AnswerList from '../AnswerList/AnswerList';

const ActiveQuiz = props => {
  return (
    <div className="ActiveQuiz">
      <p>
      <span>
        <b>1.</b>&nbsp;
        Как дела?
      </span>
      <small>4 из 12</small>
        
      </p>
      <AnswerList 
        answers={props.answers}
      />
    </div>
  )
}

export default ActiveQuiz;