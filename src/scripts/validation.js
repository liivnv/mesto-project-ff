//функция для отображения ошибки валидации
function showInputError(form, input, errorMessage, validationConfig) {
  const InputError = form.querySelector(`.${input.id}-error`);

  input.classList.add(`${validationConfig.inputErrorClass}`);

  InputError.textContent = errorMessage;
  InputError.classList.add(`${validationConfig.errorClass}`);

};

//функция для скрытия ошибки валидации
function hideInputError(form, input, validationConfig) {
  const InputError = form.querySelector(`.${input.id}-error`);

  input.classList.remove(`${validationConfig.inputErrorClass}`);

  InputError.textContent = '';
  InputError.classList.remove(`${validationConfig.errorClass}`);
};

//функция для проверки на валидность (регулярные выражения, показ ошибки)
function isValid(form, input, validationConfig) {
  //проверка на соответствие поля регулярному выражению
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  }
  else {
    input.setCustomValidity("");
  }

  //проверка на валидность поля
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationConfig);
  }
  else {
    hideInputError(form, input, validationConfig);
  }
};

//функция для проверки на валидность
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

//функция для показа и скрытия кнопки сохранения
function toggleButtonState(inputList, button, validationConfig) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(`${validationConfig.inactiveButtonClass}`);
  }
  else {
    button.disabled = false;
    button.classList.remove(`${validationConfig.inactiveButtonClass}`);
  }
};

//функция для добавления слушателей на все инпуты формы
function setEventListeners(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(`${validationConfig.inputSelector}`));

  const button = form.querySelector(`${validationConfig.submitButtonSelector}`);
  toggleButtonState(inputList, button, validationConfig);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, validationConfig);
      toggleButtonState(inputList, button, validationConfig);
    });
  });
};

//включение валидации 
function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));

  formList.forEach((form) => {
    setEventListeners(form, validationConfig);
  });
};

//функция для очистки ошибок валидации
function clearValidation(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(`${validationConfig.inputSelector}`));
  const button = form.querySelector(`${validationConfig.submitButtonSelector}`)

  inputList.forEach((input) => {
    input.setCustomValidity("");
    hideInputError(form, input, validationConfig);
    toggleButtonState(inputList, button, validationConfig);
  });
};

export {
  enableValidation,
  clearValidation
};