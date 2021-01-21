import React from 'react';
import './Input.css';

const isInvalid = (props) => {
  const {valid, isTouched, shouldValidate} = props;

  // если контрол не валидирован и если он должен быть валирован
  // и если мы его уже трогали, то это означает что он не валидный
  return !valid && shouldValidate && isTouched;
}

const Input = props => {
  const {
    type, 
    value, 
    label, 
    errorMessage, 
    onChange
  } = props;
  
  const inputType = type || `text`;
  const classes = [`Input`]
  const htmlFor = `${inputType}- ${Math.random()}`;

  if(isInvalid(props)) {
    classes.push(`invalid`)
  }
  
  return (
    <div className={classes.join(` `)}>
      <label htmlFor={htmlFor}>{label}</label>
      <input 
        type={inputType}
        id={htmlFor}
        value={value}
        onChange={onChange}
      /> 
      {isInvalid(props) 
        ? <span>{errorMessage || `Fill the field`}</span> 
        : null}
    </div>
  )
}

export default Input;