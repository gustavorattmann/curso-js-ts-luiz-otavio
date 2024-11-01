import validator from "validator"

const SHOW_ERROR_MESSAGE = "show-error-message"

const form = document.querySelector("#form") as HTMLFormElement
const username = document.querySelector("#username") as HTMLInputElement
const email = document.querySelector("#email") as HTMLInputElement
const password = document.querySelector("#password") as HTMLInputElement
const password2 = document.querySelector("#password2") as HTMLInputElement

form?.addEventListener("submit", function (event: Event) {
  event.preventDefault()
  hideErrorMessages(this)
  if (fieldsValidation(username, email, password, password2)) {
    alert("Cadastro realizado com sucesso!")
    return true
  }
})

function checkEmail(): boolean {
  if (!validator.isEmail(email.value)) {
    showErrorMessage(email, "Email inválido!")
    return false
  }

  return true
}

function checkPassword(): boolean {
  if (!validator.isStrongPassword(password.value)) {
    showErrorMessage(password, "Necessário utilizar uma senha mais forte!")
    return false
  }

  return true
}

function checkRepeatPassword(): boolean {
  if (!validator.equals(password.value, password2.value)) {
    showErrorMessage(password2, "Necessário que as senhas sejam iguais!")
    return false
  }

  return true
}

function fieldsValidation(...inputs: HTMLInputElement[]): boolean {
  let isFieldsSuccessful = true

  for (const input of inputs) {
    if (!input.value) {
      showErrorMessage(input, "Este campo não pode ficar vazio!")
      isFieldsSuccessful = false
    } else {
      switch (input) {
        case email:
          if (!checkEmail()) isFieldsSuccessful = false
          break
        case password:
          if (!checkPassword()) isFieldsSuccessful = false
          break
        case password2:
          if (!checkRepeatPassword()) isFieldsSuccessful = false
          break
      }
    }
  }

  return isFieldsSuccessful
}

function hideErrorMessages(form: HTMLFormElement): void {
  form
    .querySelectorAll(`.${SHOW_ERROR_MESSAGE}`)
    .forEach(item => item.classList.remove(SHOW_ERROR_MESSAGE))
}

function showErrorMessage(input: HTMLInputElement, message: string): void {
  const formFields = input.parentElement as HTMLDivElement
  const errorMessage = formFields.querySelector(
    ".error-message",
  ) as HTMLSpanElement
  errorMessage.innerText = message
  formFields.classList.add(SHOW_ERROR_MESSAGE)
}
