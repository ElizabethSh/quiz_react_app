import {React, Component} from 'react';
import './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        type: 'email',
        value: '',
        label: 'E-mail',
        errorMessage: 'Insert correct e-mail',
        valid: false,
        isTouched: false,
        validation: {
          required: true,
          email: true
        },
      },
      password: {
        type: 'password',
        value: '',
        label: 'Password',
        errorMessage: 'Insert correct password',
        valid: false,
        isTouched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      }
    }
  }

  loginHandler = () => {
    // 3. Вызываем метод this.props.auth и передаем в него
    // значения из объекта authData, а сам объект за
    // ненадобностью удаляем.
    // В качестве аргумента isLogin передаем true!
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )

    // 7 Переносим логику в функцию auth в actions.auth.js
  }

  registrHandler = () => {
    // 4. Вызываем метод this.props.auth и передаем в него
    // значения из объекта authData, а сам объект за
    // ненадобностью удаляем.
    // В качестве аргумента isLogin передаем false!
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
    
    // 16. Вся логика теперь в редаксе
  }

  submitHandler = (e) => {
    e.preventDefault();
  }

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== `` && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  changeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls};

    const control = {...formControls[controlName]};

    control.value = e.target.value;
    control.isTouched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    
    Object.values(formControls).forEach((controlName) => {
      isFormValid = controlName.valid && isFormValid;
    })

    this.setState({formControls, isFormValid});
  }

  renderInputs = () => {
    const inputs = Object.keys(this.state.formControls);

    return inputs.map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          label={control.label}
          value={control.value}
          valid={control.valid}
          isTouched={control.isTouched}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
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
              disabled={!this.state.isFormValid}
            >Log in</Button>

            <Button 
              type='primary' 
              onClick={this.registrHandler}
              disabled={!this.state.isFormValid}
            >Register</Button>
          </form>
        </div>
      </div>
    )
  }
}

// 2. Создаем функцию mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
  return {
    // 2.1 которая будет возвращать функцию auth, принимающую 3 параметра,
    // которая будет диспатчить функцию auth, принимающую эти же параметры
    // isLogin определяет залогинен пользователь или нет
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

// 1. Подключаем компонент к редаксу и передаем в нее только функцию
// mapDispatchToProps, т.к. мы не используем state из редьюсера,
// поэтому вместо первого параметра передаем null
export default connect(null, mapDispatchToProps)(Auth);