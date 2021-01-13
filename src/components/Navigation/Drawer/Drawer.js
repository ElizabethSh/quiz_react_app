import React, { Component } from 'react';
import './Drawer.css';

const links = [1, 2, 3];

class Drawer extends Component {
  renderLinks() {
    return (
      links.map((link, index) => {
        return (
          <li key={index}>
            <a>Link {link}</a>
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
      <nav className={classes.join(` `)}>
        <ul>
          {this.renderLinks()}
        </ul>
      </nav>
    )
  }
}

export default Drawer;