import './AnswerList.css';
import AnswerItem from '../AnswerItem/AnswerItem';

const AnswerList = props => {
  return (
    <ul className="AnswerList">
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem 
            key={index}
            answer={answer}
            answerClickHandler={props.answerClickHandler}
            state={props.state ? props.state[answer.id] : null}
          />
        )}
      )}
    </ul>
  );
}

export default AnswerList;