const createControl = (config, validation) => {
  return {
    ...config,
    validation,
    valid: !validation,
  }
}

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

const validateForm = (formControls) => {
  let isFormValid = true;

  Object.keys(formControls).forEach((control) => {
    isFormValid = formControls[control].valid && isFormValid
  })

  return isFormValid;
}

export {createControl, validateControl, validateForm};