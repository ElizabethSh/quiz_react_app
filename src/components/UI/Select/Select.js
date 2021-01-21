import React from 'react';
import './Select.css';

const Select = props => {
  const {
    label,
    value,
    options,
    onChange
  } = props;
  const htmlFor = `${label}-${Math.random()}`;

  return (
    <div className='Select'>
      <label htmlFor={htmlFor}>{label}</label>
      <select id={htmlFor}
        value={value}
        onChange={onChange}>
        
        {options.map((option, index) => {
          return (
            <option 
              key={option.value + index} 
              value={option.value}
            >
              {option.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select;