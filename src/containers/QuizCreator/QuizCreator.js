import {React, PureComponent, Fragment} from 'react';
import './QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import {createControl, validateControl, validateForm} from '../../form/FormFramework/FormFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

const createOptionControl = (number) => createControl(
  {
    id: number,
    label: `Option ${number}`,
    errorMessage: 'Insert the option',
    value: `` // исправление warning: A component is changing an uncontrolled input to be controlled
  }, 
  {required: true}
);

// функция будет создавать объект state.formControls заново
const createFormControls = () => {
  return {
    question: createControl({
      label: 'Insert the question',
      errorMessage: 'Fill the field',
      value: `` // исправление warning: A component is changing an uncontrolled input to be controlled
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends PureComponent {
  state = {
    quiz: [],
    correctAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls(),
  }

  submitHandler = (e) => {
    e.preventDefault();
  }

  addQuestionHandler = () => {

  }

  addQuizHandler = () => {

  }

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]};

    control.isTouched = true;
    control.value = value;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;
    this.setState({
      formControls, 
      isFormValid: validateForm(formControls),
    })
  }

  selectChangeHandler = (e) => {
    this.setState({
      correctAnswerId: +e.target.value
    })
  }

  renderInputs() {
    return (
      Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName];

        return (
          <Fragment key={controlName + index}>
            <Input
              label={control.label}
              value={control.value}
              valid={control.valid}
              shouldValidate={!!control.validation}
              isTouched={control.isTouched}
              errorMessage={control.errorMessage}
              onChange={(e) => this.changeHandler(e.target.value, controlName)}
            />
            {index === 0 ? < hr/> : null}
          </Fragment>
        )
      })
    )
  }

  render() {

    // создали переменную, чтобы код jsx в return было удобнее читать
    const select = <Select 
      label='Выберите правильный ответ'

      // value - необязательный атрибут, 
          // но если его задать, то при выборе вариантов
          // в поле селекта текущий вариант не будет изменяться!
          // Для изменения варианта изменяем state
          // в обработчике selectChangeHandler
      value={this.state.correctAnswerId} 
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
      onChange={this.selectChangeHandler}
    />

    return(
      <div className={'QuizCreator'}>
        <div>
          <h1>Add Quiz</h1>
          <form onSubmit={this.submitHandler}>

            {this.renderInputs()}

            {select}

          <Button 
            type='primary' 
            onClick={this.addQuestionHandler}
            disabled={!this.state.isFormValid}
          >Add question</Button>

          <Button 
            type='success' 
            onClick={this.addQuizHandler}
            disabled={this.state.quiz.length === 0}
          >Add quiz</Button>

          </form>
        </div>
      </div>
    )
  }
}

export default QuizCreator;