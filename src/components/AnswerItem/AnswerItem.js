import './AnswerItem.css';

const AnswerItem = props => {
  return (
    <li 
      className="AnswerItem"
      onClick={
        () => props.answerClickHandler(props.answer.id)
      }
    >
        {props.answer.text}
    </li>
  );
};

export default AnswerItem;