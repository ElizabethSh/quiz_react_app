import React from 'react';
import './Button.css';

const Button = props => {
  const classes = [`Button`,
  props.type
  ];

  return (
    <button 
      className={classes.join(` `)}
      onClick={props.onClick}
      disabled={props.disabled}
    >{props.children}</button>
  );
}

export default Button;