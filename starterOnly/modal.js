import {
  formContainer,
  handleResetForm,
  openModal,
  resetModalBtns,
  signupForm,
  toggleErrorMessage,
  validateRadioButtons,
} from "./utils.js";

// DOM Elements
const modalBtns = document.querySelectorAll(".modal-btn");
const formDataElements = document.querySelectorAll(".formData");

// open modal event
modalBtns.forEach((btn) => btn.addEventListener("click", openModal));

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

  // Valide chaque champ du formulaire
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

  // Si tous les champs sont valides, affiche le message de confirmation
  if (
    Array.from(formDataElements).every(
      (element) => element.dataset.errorVisible === "false"
    )
  ) {
    // Fetch data
    // display if res.status === 200
    formContainer.classList.add("hidden");
    resetModalBtns.forEach((btn) =>
      btn.addEventListener("click", handleResetForm)
    );
  }
});
