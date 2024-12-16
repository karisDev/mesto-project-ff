export let SELECTOR = {
  form: ".popup__form",
  input: ".popup__input",
  submitButton: ".popup__button",
  inactiveButtonClass: "popup__button-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const toggleSubmitButtonLoader = (button, isLoading) =>
  (button.textContent = isLoading ? "Сохранение..." : "Сохранить");

export const clearValidation = (formElement) => {
  const inputElements = Array.from(
    formElement.querySelectorAll(SELECTOR.input)
  );
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!errorElement) return;

  inputElement.classList.add(SELECTOR.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(SELECTOR.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!errorElement) return;

  inputElement.classList.remove(SELECTOR.inputErrorClass);
  errorElement.classList.remove(SELECTOR.errorClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputElements) => {
  return inputElements.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputElements, buttonElement) => {
  if (hasInvalidInput(inputElements)) {
    disableButtonElement(true, buttonElement);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(SELECTOR.inactiveButtonClass);
  }
};

// Disables or enables the submit button
export const disableButtonElement = (disable, buttonElement) => {
  buttonElement.classList.toggle(SELECTOR.inactiveButtonClass, disable);
  buttonElement.disabled = disable;
};

// Checks if a single input element is valid, shows or hides the error
const validateInput = (formElement, inputElement) => {
  if (
    inputElement.validity.patternMismatch &&
    inputElement.dataset.errorMessage
  ) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Adds event listeners to inputs for real-time validation
const setEventListeners = (formElement) => {
  const inputElements = Array.from(
    formElement.querySelectorAll(SELECTOR.input)
  );
  const submitButton = formElement.querySelector(SELECTOR.submitButton);

  toggleButtonState(inputElements, submitButton);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      validateInput(formElement, inputElement);
      toggleButtonState(inputElements, submitButton);
    });
  });
};

export const enableValidation = (validationConfig = SELECTOR) => {
  if (validationConfig !== SELECTOR) {
    SELECTOR = validationConfig;
  }
  const formElements = Array.from(document.querySelectorAll(SELECTOR.form));
  formElements.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
