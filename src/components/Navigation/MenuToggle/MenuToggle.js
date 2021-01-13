import React from 'react';
import './MenuToggle.css';

const MenuToggle = (props) => {
  const classes = ['MenuToggle', 'fa'];

  if (props.isMenuOpen) {
    classes.push(`fa-times`, `open`);
  } else {
    classes.push(`fa-bars`);
  }
  
  return (
    <i 
      className={classes.join(` `)}
      onClick={props.toggleClickHandler}
    />
  )
}

export default MenuToggle;