function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const isInputElement = (element) => {
  return element.tagName === "INPUT";
};
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const inputsContainer = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", toggleModal));
closeBtn.addEventListener("click", toggleModal);

// toggle modal form
function toggleModal() {
  modalbg.classList.toggle("active");
}

/**
 * check each input element if value is valid
 */
inputsContainer.forEach((element) => {
  const input = Array.from(element.children).find((child) =>
    isInputElement(child)
  );
  input.addEventListener("blur", (e) => validateInput(e, element));
});

/**
 * messages for each input with validation conditions
 */
const messages = {
  last: {
    action: (element, container) => {
      validateInput(element, container);
    },
    condition: (params) => params.value.trim() === "",
    error: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  },
  first: {
    action: (element, container) => {
      validateInput(element, container);
    },
    condition: (params) => params.value.trim() === "",
    error: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  },
  email: {
    action: (element, container) => {
      validateInput(element, container);
    },
    condition: (params) => {
      if (params.value.trim() === "") {
        return true;
      } else {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return !regex.test(params.value);
      }
    },
    error: "Le format de l'email n'est pas valide",
  },
  birthdate: {
    action: (element, container) => {
      validateInput(element, container);
    },
    condition: (params) => params.value.trim() === "",
    error: "Vous devez entrer votre date de naissance.",
  },
  quantity: {
    action: (element, container) => {
      validateInput(element, container);
    },
    condition: (params) => params.value.trim() === "",
    error: "Entrez au moins un nombre",
  },
  location: {
    action: (_, c) => {
      const isCheckedLocation = Array.from(c.children)
        .filter((child) => isInputElement(child))
        .some((value) => value.checked);

      const errorMessage = Array.from(c.children).find(
        (child) => child.className === "error-message"
      );

      if (!isCheckedLocation && !errorMessage) {
        createMessage({ target: { name: "location" } }, c);
      }
      if (isCheckedLocation && errorMessage) {
        removeErrorMessage(c, errorMessage);
      }
    },
    condition: (params) => {
      return !params.radios.some((input) => input.checked);
    },
    error: "Choisissez une localisation",
  },
  checkbox1: {
    action: (element, container) => {
      validateInput(element, container);
    },
    condition: (params) => !params.checkbox,
    error: "Vous devez accepter les CGU",
  },
};
/**
 * Validates the input field and creates an error message if the field is empty.
 *
 * @param {Event} e - The blur event object triggered when the input loses focus.
 * @param {HTMLElement} c - The parent container element of the input field.
 * @returns {void} This function doesn't return a value; it creates an error message if needed.
 */
function validateInput(e, c) {
  const key = e.target.name;
  const errorMessage = Array.from(c.children).find(
    (child) => child.className === "error-message"
  );
  const value = e.target.value;

  if (!errorMessage && messages[key].condition({ value: value })) {
    createMessage(e, c);
  }
  if (errorMessage && !messages[key].condition({ value: value })) {
    removeErrorMessage(c, errorMessage);
    return;
  }
}

const createMessage = (e, c) => {
  const container = c;
  const name = e.target.name;
  const message = document.createElement("span");

  message.innerText = messages[name].error;
  message.setAttribute("class", "error-message");
  if (name === "checkbox1") {
    container.insertBefore(message, container.children[2]);
  } else {
    container.appendChild(message);
  }
};

/**
 * check if all inputs are valid
 * @returns boolean
 */
const validate = () => {
  let isSomeFieldEmpty = true;
  Array.from(inputsContainer).forEach((element) => {
    const children = Array.from(element.children);
    const input = children.find((child) => isInputElement(child));
    const inputName = input.name || input.id;
    const inputCondition = messages[inputName].condition;
    const inputAction = messages[inputName].action;
    const params = {
      radios: children,
      value: input.value,
      checkbox: input.checked,
    };
    if (inputCondition(params)) {
      isSomeFieldEmpty = !inputCondition(params);
      inputAction(
        {
          target: {
            name: inputName,
            value: inputName === "checkbox1" ? input.checked : input.value,
          },
        },
        element
      );
    }
  });

  if (isSomeFieldEmpty) {
    alert("Nous avons bien reçu votre inscription");
  }
  return isSomeFieldEmpty;
};

/**
 * remove error message if input is valid and error message is present
 * @param {input} container HTML input element
 */
function removeErrorMessage(container, errorMsg) {
  container.removeChild(errorMsg);
}

/**
 * Checks if any field in the form is empty or unchecked.
 *
 * This function iterates through all form data elements and checks for empty or unchecked inputs.
 * It handles different types of inputs:
 * - For 'location' inputs, it checks if any radio button is checked.
 * - For 'checkbox1', it checks if the checkbox is checked.
 * - For all other inputs, it checks if the value is empty.
 *
 * @returns {boolean} Returns true if any field is empty or unchecked, false otherwise.
 */
function isSomeFieldEmpty() {
  return Array.from(inputsContainer).some((element) => {
    const children = Array.from(element.children);
    const input = children.find((child) => isInputElement(child));
    const inputName = input.name || input.id;

    const inputCondition = messages[inputName].condition;
    const params = {
      radios: children,
      value: input.value,
      checkbox: input.checked,
    };
    return inputCondition(params);
  });
}
