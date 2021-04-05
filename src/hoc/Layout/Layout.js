import React, { Component } from 'react';
import './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    isMenuOpen: false,
  }

  toggleClickHandler = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    })
  }

  menuCloseHandler = () => {
    this.setState({
      isMenuOpen: false,
    })
  }

  render() {
    return (
        <div className="Layout">
          <Drawer
            isMenuOpen={this.state.isMenuOpen}
            toggleClickHandler={this.toggleClickHandler}

            // 7. Передаем параметр isAuthenticated
            // в Drawer
            isAuthenticated={this.props.isAuthenticated}
          />

          <MenuToggle
            isMenuOpen={this.state.isMenuOpen}
            toggleClickHandler={this.toggleClickHandler}
          />

          <main>
            {this.props.children}
          </main>
        </div>
    )
  }
}

// 6. Создаем функцию mapStateToProps, которая будет возвращать
// props - isAutentificated, который позволяет определить авторизован
// сейчас пользователь или нет
const mapStateToProps = (state) => {
  return {
    // `!!` приведут к булевому значению, т.о. если токен есть
    // то значение будет равно true
    isAuthenticated: !!state.authReducer.token
  }
};

// 5. Соединяем компонент Layout со store
export default connect(mapStateToProps)(Layout);