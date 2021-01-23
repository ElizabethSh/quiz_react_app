import {React, PureComponent, Fragment} from 'react';
import './QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import {createControl, validateControl, validateForm} from '../../form/FormFramework/FormFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import axios from '../../axios-quiz/axios-quiz';

const createOptionControl = (number) => createControl(
  {
    id: number,
    label: `Option ${number}`,
    errorMessage: 'Insert the option',
    value: ``,
  }, 
  {required: true}
);

const createFormControls = () => {
  return {
    question: createControl({
      label: 'Insert the question',
      errorMessage: 'Fill the field',
      value: ``,
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
    const quiz = this.state.quiz.concat();
    const index = this.state.quiz.length + 1;

    const {question, option1, option2, option3, option4} = this.state.formControls;

    const questionItem = {
      id: index,
      question: question.value,
      correctAnswer: this.state.correctAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ]
    }

    quiz.push(questionItem);

    this.setState({
      quiz,
      correctAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls(),
    })
  }

  // 1 способ отправить созданный опрос
  // addQuizHandler = (e) => {
  //   e.preventDefault();

  //  axios вернет промис, который можно обработать с помощью
  //  метода .then и вывести ответ в консоль
  //  в случае ошибки сработает .catch и ошибку можно вывести в консоль
  //  axios.post(postURL, this.state.quiz)
  //    .then(response => console.log(response))
  //    .catch(error => console.log(error))
  // }


  // 2 способ отправить созданный опрос - асинхронный запрос
  addQuizHandler = async e => {
    e.preventDefault();

    try {
      // axios вернет промис, оператор await распарсит этот промис
      // и результат положит в переменную response
      await axios.post(`/quizes.json`, this.state.quiz) // используем конфиг axios-quiz - полный путь можно не указывать

      // обнуляем state до изначального, чтобы форма создания опроса
      // возвращалась в изначальное состояние
      this.setState({
        quiz: [],
        correctAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls(),
      })
    }
    // в случае ошибки сработает .catch и ошибку можно вывести в консоль
    catch(error) {
      console.log(error);
    }
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
    const select = <Select 
      label='Выберите правильный ответ'
      value={this.state.correctAnswerId}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
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