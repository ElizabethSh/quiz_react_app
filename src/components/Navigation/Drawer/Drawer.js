import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
  {to: '/', label: 'Quiz list', exact: true},
  {to: '/auth', label: 'Autorisation', exact: false},
  {to: '/quiz-creator', label: 'Create Quiz', exact: false},
];

class Drawer extends Component {
  renderLinks() {
    return (
      links.map((link, index) => {
        return (
          <li key={index}>
            <NavLink to={link.to} 
              exact={link.exact} 
              activeClassName={`active`}
              onClick={this.props.toggleClickHandler}
            >
              {link.label}
            </NavLink>
          </li>
        )
      }) 
    )
  }

  render() {
    const classes = [`Drawer`]

    if (!this.props.isMenuOpen) {
      classes.push(`close`)
    }

    return (
      <React.Fragment>
        <nav className={classes.join(` `)}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isMenuOpen 
          ? <Backdrop onClick={this.props.toggleClickHandler}/>
          : null
        }
      </React.Fragment>
    )
  }
}

export default Drawer;