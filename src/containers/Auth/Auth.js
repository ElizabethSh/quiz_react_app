import {React, Component} from 'react';
import './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

// функция проверяет корректность введенного email
const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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

  validateControl(value, validation) {

    // если набор параметров validation не передан, то сравнивать не с чем
    // и контрол валидировать не нужно
    if (!validation) {
      return true;
    }

    let isValid = true;

    // далее в ifах будем переопределять значение isValid:
    // 1. Проверка что в инпуте что-то есть
    if (validation.required) {
      isValid = value.trim() !== `` && isValid; // trim() - удалит пробелы
    }

    // 2. проверка валидности введенного email
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    // 3. Проверка минимального кол-ва введенных символов
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  changeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls};  // чтобы не мутировать объект state.formControls сделаем его копию

    const control = {...formControls[controlName]};  // получаем копию объекта текущего контрола

    control.value = e.target.value;
    control.isTouched = true; // если сработал обработчик значит был произведен ввод в инпут!
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({formControls});
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