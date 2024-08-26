"use strict";

// selecting Elements
const formElement = document.getElementById("form");
const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const passwordElement2 = document.getElementById("password_2");
const buttonELement = document.getElementById("formBtn");

// FUNCTIONS
// showing a success state
const showSuccess = function (inputEl) {
  const formControl = inputEl.parentElement;
  formControl.setAttribute("class", "form-control success");
};

// showing an error state
const showError = function (inputEl, message) {
  const formControl = inputEl.parentElement;
  formControl.setAttribute("class", "form-control error");
  const warningMessage = formControl.querySelector(".warning-message");
  warningMessage.textContent = message;
};

// checking whether there is any input or not and then responding it accordingly.
const checkIsRequired = function (inputArr) {
  let isRequired = false;
  inputArr.forEach(inputEl => {
    if (inputEl.value.trim() === "") {
      showError(inputEl, `${getFieldName(inputEl)} is required`);
      isRequired = true;
    } else {
      showSuccess(inputEl);
    }
  });

  return isRequired;
};

// check the length of the inputs
const checkingLength = function (inputEl, min, max) {
  if (inputEl.value.trim().length < min) {
    showError(
      inputEl,
      `${getFieldName(inputEl)} must be at least ${min} characters`
    );
  } else if (inputEl.value.trim().length > max) {
    showError(
      inputEl,
      `${getFieldName(inputEl)} must be less than ${max} characters`
    );
  } else {
    showSuccess(inputEl);
  }
};

// checking Email
const checkEmail = function (inputEL) {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (pattern.test(inputEL.value.trim())) {
    showSuccess(inputEL);
  } else {
    showError(inputEL, "email is not valid");
  }
};

// checking whether passwords match each other or not
const checkPasswordMatch = function (pass1, pass2) {
  if (pass1.value.trim() !== pass2.value.trim()) {
    showError(pass2, "Password do not match");
  }
};

// get fieldname
const getFieldName = function (inputEl) {
  return inputEl.id.charAt(0).toUpperCase() + inputEl.id.slice(1);
};

// Event Listener
formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  if (
    checkIsRequired([
      usernameElement,
      emailElement,
      passwordElement,
      passwordElement2,
    ])
  ) {
    checkingLength(usernameElement, 3, 15);
    checkingLength(passwordElement, 3, 12);
    checkEmail(emailElement);
    checkPasswordMatch(passwordElement, passwordElement2);
  }
});
