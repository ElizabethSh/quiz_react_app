// функция для создания контрола формы с 2мя параметрами:
// config - объект с параметрами контрола (label, type, value и т.д.)
// validation - объект с правилами валидации
const createControl = (config, validation) => {
  
  // возвращаем объект контрола
  return {
    ...config,  // в который передаем параметры контрола с пом. spread
    validation, // передаем правила валидации
    valid: !validation  // если параметр не передан (т.е. false) значит контрол валиден (не с чем проверять)
  }
}

// валидирует инпуты в форме добавления опроса
const validateControl = (value, validation = null) => {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== `` && isValid;
  }

  return isValid;
}

// валидирует форму добавления опроса
const validateForm = (formControls) => {
  let isFormValid = true;

  Object.keys(formControls).forEach((control) => {
    isFormValid = formControls[control].valid && isFormValid
  })

  return isFormValid;
}

export {createControl, validateControl, validateForm};