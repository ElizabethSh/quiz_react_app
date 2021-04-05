import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

class Drawer extends Component {
  //  9. Получившийся набор ссылок передадим в метод renderLinks
  renderLinks(links) {
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

    // 8. После получения в Drawer параметра isAuthenticated
    // можно на его основании сгенерировать набор ссылок,
    // которые нужно показывать в зависимости от авторизации
    // пользователя.
    const links = [
      {to: '/', label: 'Quiz list', exact: true}, // ссылка, которая будет в обоих случаях
    ];

    // 8.1 Если пользователь авторизован добавляем след. ссылки в массив
    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Create Quiz', exact: false});
      links.push({to: '/logout', label: 'Quit', exact: false});

      // 8.2 Иначе добавляем вот эти ссылки:
    } else {
      links.push(
        {to: '/auth', label: 'Autorisation', exact: false},
      )
    }

    return (
      <React.Fragment>
        <nav className={classes.join(` `)}>
          <ul>
    {/* 9. Получившийся набор ссылок передадимв метод renderLinks */}
            {this.renderLinks(links)}
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