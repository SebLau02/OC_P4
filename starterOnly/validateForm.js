const signupForm = document.getElementById("signup-form");
const formDataElements = document.querySelectorAll(".formData");

const validationRules = {
  text: (input) => input.value.length >= 2,
  email: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value),
  date: (input) => !isNaN(new Date(input.value)),
  number: (input) => !isNaN(input.value) && input.value.trim() !== "",
  checkbox: (input) => input.checked,
  radio: (input) => input.checked,
};

function toggleErrorMessage(input, formDataElement) {
  const isValid = validationRules[input.type](input);
  formDataElement.dataset.errorVisible = isValid ? "false" : "true";
}

function validateRadioButtons(formDataElement) {
  const radios = formDataElement.querySelectorAll("input");
  radios.forEach((radio) => {
    radio.addEventListener("click", () => {
      formDataElement.dataset.errorVisible = "false";
    });
  });
}

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
    !Array.from(formDataElements).some(
      (element) => element.dataset.errorVisible === "true"
    )
  )
    document.querySelector(".modal-body form").classList.add("active");
});
