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
