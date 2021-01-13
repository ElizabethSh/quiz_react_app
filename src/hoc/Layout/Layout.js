import React, { Component } from 'react';
import './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

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
      isMenuOpen: false,  // при закрытии нужно изменить state isMenuOpen на false
    })
  }

  render() {
    return (
        <div className="Layout">
          <Drawer isMenuOpen={this.state.isMenuOpen} toggleClickHandler={this.toggleClickHandler}/>

          <MenuToggle 
            isMenuOpen={this.state.isMenuOpen}
            toggleClickHandler={this.toggleClickHandler}
          />

          <main >
            {this.props.children}
          </main>
        </div>
    )
  }
}

export default Layout;