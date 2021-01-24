import {React, Component} from 'react';
import './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios'; // импорт из библиотеки т.к. нам не нужен baseURL

// функция проверяет корректность введенного email
const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {

  // state c контролами формы
  state = {
    isFormValid: false,
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

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }

    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCVlUm9l1LKdRU0M7SIpTipojZMdnt2u0`, authData);
      console.log(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  registrHandler = async() => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }

    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCVlUm9l1LKdRU0M7SIpTipojZMdnt2u0`, authData);
      console.log(response.data);
    } catch(err) {
      console.log(err);
    }
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

    
    let isFormValid = true; // заводим локальную переменную isFormValid = true
    
    // получаем объекты контролов ИЗ КОПИИ this.state.formControls!!!
    // и в цикле проверяем правильно ли заполнены поля ввода
    // если правильно то isFormValid = true, иначе - false
    // если хоть одно поле заполнено не правильно,  isFormValid будет false!!!
    Object.values(formControls).forEach((controlName) => {
      isFormValid = controlName.valid && isFormValid;
    })

    // Object.keys(formControls).forEach((controlName) => {
    //   isFormValid = formControls[controlName].valid && isFormValid;
    // })

    this.setState({formControls, isFormValid});
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
              disabled={!this.state.isFormValid}  // если state.isFormValid: false кнопка будет заблокирована 
            >Log in</Button>

            <Button 
              type='primary' 
              onClick={this.registrHandler}
              disabled={!this.state.isFormValid} // если state.isFormValid: false кнопка будет заблокирована
            >Register</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth;