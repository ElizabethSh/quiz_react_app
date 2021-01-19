import {React, Component} from 'react';
import './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

class Auth extends Component {
  loginHandler = () => {

  }

  registrHandler = () => {

  }

  submitHandler = (e) => {
    e.preventDefault();
  }

  render() {
    return(
      <div className={`Auth`}>
        <div>
          <h1>Authorization</h1>
          <form className={`AuthForm`} onSubmit={this.submitHandler}>
            <Input 
              label='E-mail'
            />
            <Input 
              label='Password'
            />

            <Button 
              type='success' 
              onClick={this.loginHandler}
            >Log in</Button>

            <Button 
              type='primary' 
              onClick={this.registrHandler}
            >Register</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth;