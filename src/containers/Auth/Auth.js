import {React, Component} from 'react';
import './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

class Auth extends Component {

  // state c контролами формы
  state = {
    formControls: {
      email: {
        type: 'email',
        value: '',
        label: 'E-mail',
        errorMessage: 'Insert correct e-mail',
        valid: false,
        isTouched: false, // отвечает за состояние был затронуд текущий инпут или нет
        validation: { // содержит правила, по которым нужно валидировать текущий контрол
          required: true, // обязательность заполнения поля
          email: true
        },
      },
      password: {
        type: 'password',
        value: '',
        label: 'Password',
        errorMessage: 'Insert correct password',
        valid: false,
        isTouched: false, // отвечает за состояние был затронуд текущий инпут или нет
        validation: { // содержит правила, по которым нужно валидировать текущий контрол
          required: true,// обязательность заполнения поля
          minLength: 6, // мин. количество символов в пароле
        },
      }
    }
  }

  loginHandler = () => {

  }

  registrHandler = () => {

  }

  submitHandler = (e) => {
    e.preventDefault();
  }

  changeHandler = (e, controlNameType) => {
    console.log(controlNameType, e.target.value);
  }

  // метод, который рендерит инпуты в зависимости от количества контролов
  renderInputs = () => {
    const inputs = Object.keys(this.state.formControls);  // получаем названия контролов

    return inputs.map((controlName, index) => {
      const control = this.state.formControls[controlName]; // получаем объект текущего контрола

      return (
        <Input
          key={controlName + index}
          type={control.type}
          label={control.label}
          value={control.value}
          valid={control.valid}
          isTouched={control.isTouched}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation} // !! приведут к boolean значению
          onChange={(e) => this.changeHandler(e, control.type)}
        />
      )
    })
  }

  render() {
    return(
      <div className={`Auth`}>
        <div>
          <h1>Authorization</h1>
          <form className={`AuthForm`} 
            onSubmit={this.submitHandler}>

            {this.renderInputs()}

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