import React from 'react';
import './FinishedQuiz.css';

const FinishedQuiz = props => {
  return (
    <div className='FinishedQuiz'>
      <ul>
        <li>
          <b>1.</b>
          How are you?
          <i className={'fa fa-times error'}/>
        </li>
        <li>
          <b>2.</b>
          How are you?
          <i className={'fa fa-check success'}/>
        </li>
      </ul>
      <p>Correct answers are 4 out of 10</p>
      <button>Start again</button>
    </div>
  )
}

export default FinishedQuiz;