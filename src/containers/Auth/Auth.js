import {React, Component} from 'react';
import './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';

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

export default Auth;