import { toggleErrorMessage, validateRadioButtons } from "./utils.js";

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtns = document.querySelectorAll(".modal-btn");
const closeModalBtns = document.querySelectorAll(".close-modal");
const signupForm = document.getElementById("signup-form");
const formDataElements = document.querySelectorAll(".formData");

// Close modal function
function handleCloseModal() {
  modalbg.classList.remove("active");
}

// Open modal function
function openModal() {
  modalbg.classList.add("active");
}

// open modal event
modalBtns.forEach((btn) => btn.addEventListener("click", openModal));

// close modal event
closeModalBtns.forEach((btn) =>
  btn.addEventListener("click", handleCloseModal)
);

// Attache les événements d'entrée pour valider en temps réel
formDataElements.forEach((formDataElement) => {
  const input = formDataElement.querySelector("input");
  if (input.type === "radio") {
    validateRadioButtons(formDataElement);
  } else {
    input.addEventListener("input", (e) => {
      toggleErrorMessage(e.target, formDataElement);
    });
  }
});

// Validation lors de la soumission du formulaire
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  formDataElements.forEach((formDataElement) => {
    const input = formDataElement.querySelector("input");
    if (input.type === "radio") {
      const radios = formDataElement.querySelectorAll("input");
      const isValid = Array.from(radios).some((radio) => radio.checked);
      formDataElement.dataset.errorVisible = isValid ? "false" : "true";
    } else {
      toggleErrorMessage(input, formDataElement);
    }
  });
  if (
    Array.from(formDataElements).every(
      (element) => element.dataset.errorVisible === "false"
    )
  )
    document.querySelector(".modal-body form").classList.add("active");
});
