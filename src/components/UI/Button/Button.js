import React from 'react';
import './Button.css';

const Button = props => {
  const classes = [`Button`,
  props.type  // в зависимости от переданного названия типа кнопки добавляем класс
  ]

  return (
    <button 
      className={classes.join(` `)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}  {/*чтобы передавать произвольный текст кнопки */}
    </button>
  )
}

export default Button;