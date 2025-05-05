const modalbg = document.querySelector(".bground");
const closeModalBtns = document.querySelectorAll(".close-modal");

export const formContainer = document.querySelector(".content.form-container");
export const resetModalBtns = document.querySelectorAll(".reset-modal");
export const signupForm = document.getElementById("signup-form");

export const validationRules = {
  text: (input) => input.value.length >= 2,
  email: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value),
  date: (input) => !isNaN(new Date(input.value)),
  number: (input) => !isNaN(input.value) && input.value.trim() !== "",
  checkbox: (input) => input.checked,
  radio: (input) => input.checked,
};

export function toggleErrorMessage(input, formDataElement) {
  const isValid = validationRules[input.type](input);
  formDataElement.dataset.errorVisible = isValid ? "false" : "true";
}
export function validateRadioButtons(formDataElement) {
  const radios = formDataElement.querySelectorAll("input");
  radios.forEach((radio) => {
    radio.addEventListener("click", () => {
      formDataElement.dataset.errorVisible = "false";
    });
  });
}

// Close modal function
export function handleCloseModal() {
  modalbg.classList.remove("active");
  // remove close btn listener
  closeModalBtns.forEach((btn) =>
    btn.removeEventListener("click", handleCloseModal)
  );
  // remove reset btn listener
  resetModalBtns.forEach((btn) =>
    btn.removeEventListener("click", handleResetForm)
  );
}

// Open modal function
export function openModal() {
  modalbg.classList.add("active");
  // add close btn listener
  closeModalBtns.forEach((btn) =>
    btn.addEventListener("click", handleCloseModal)
  );
}

// Close and Reset form function
export const handleResetForm = () => {
  signupForm.reset();
  formContainer.classList.remove("hidden");
  handleCloseModal();
};
