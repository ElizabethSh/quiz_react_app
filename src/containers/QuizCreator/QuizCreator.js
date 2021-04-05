import { Fragment, PureComponent, React } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { createControl, validateControl, validateForm } from '../../form/FormFramework/FormFramework';
import { addQuestion, addQuiz } from '../../store/actions/add-quiz-action-creator';
import './QuizCreator.css';

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
    // 1. В этом компоненте будет использоваться
    // и локальный и глобальный state, поэтому
    // переносим только quiz в редьюсер createQuizReducer
    correctAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls(),
  }

  submitHandler = (e) => {
    e.preventDefault();
  }

  addQuestionHandler = () => {
    const {question, option1, option2, option3, option4} = this.state.formControls;

    const questionItem = {
      id: this.props.quiz.length + 1, // оптимизируем код при пом. props
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

    // 9. Здесь у нас появляется объект вопроса,
    // который нужно добавить в массив quiz,
    // который находится в глобальном state,
    // поэтому передаем объект созданного вопроса 
    // в actionCreator - addQuestion
    this.props.addQuestion(questionItem)

    // 10. quiz убираем, остальное оставляем для изменения
    // локального state
    this.setState({
      correctAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls(),
    })
  }

  addQuizHandler = e => {
    e.preventDefault();

      this.setState({
        correctAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls(),
      })

    // 13. взаимодействие со state.quiz и обращение к серверу
    // переносим в actionCreator - addQuiz()
    // и здесь остается только его вызвать
      this.props.addQuiz();
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
              disabled={this.props.quiz.length === 0}
            >Add quiz</Button>
          </form>
        </div>
      </div>
    )
  }
}

// 7. Добываем пропс quiz из глобального state
const mapStateToProps = (state) => {
  return {
    quiz: state.createQuizReducer.quiz,
  }
}

// 8. Добавляем сюда методы, которые будут использоваться при взаимодействии
// с глобальным state
const mapDispatchToProps = (dispatch) => {
  return {

    // 9. передаем объект созданного вопроса 
    // в actionCreator - addQuestion
    addQuestion: (questionItem) => dispatch(addQuestion(questionItem)), // метод для создания вопроса
    addQuiz: () => dispatch(addQuiz()), // метод для добавления опроса
  }
}

// 5. Связываем компонент с редаксом
export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);