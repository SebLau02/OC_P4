function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", launchModal);

// launch modal form
function launchModal() {
  modalbg.classList.toggle("active");
}

formData.forEach((element) => {
  const input = Array.from(element.children).find(
    (child) => child.tagName === "INPUT"
  );
  input.addEventListener("blur", (e) => validateInput(e, element));
});

const messages = {
  last: {
    condition: (value) => value.trim() === "",
    error: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  },
  first: {
    condition: (value) => value.trim() === "",
    error: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  },
  email: {
    condition: (value) => {
      if (value.trim() === "") {
        return true;
      } else {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return !regex.test(value);
      }
    },
    error: "Le format de l'email n'est pas valide",
  },
  birthdate: {
    condition: (value) => value.trim() === "",
    error: "Vous devez entrer votre date de naissance.",
  },
  quantity: {
    condition: (value) => value.trim() === "",
    error: "Entrez au moins un nombre",
  },
  location: {
    condition: (value) => value.trim() === "",
    error: "Choisissez une localisation",
  },
  checkbox1: {
    condition: (value) => !value,
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
  const isErrorMessagePresent = Array.from(c.children).find(
    (child) => child.className === "error-message"
  );
  const value = e.target.value;
  if (
    e.target.name === key &&
    !isErrorMessagePresent &&
    messages[key].condition(value)
  ) {
    createMessage(e, c);
  } else if (isErrorMessagePresent && !messages[key].condition(value)) {
    removeErrorMessage(c);
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

const validate = () => {
  if (isSomeFieldEmpty()) {
    formData.forEach((element) => {
      const input = Array.from(element.children).find(
        (child) => child.tagName === "INPUT"
      );

      if (input.name === "location") {
        const location = Array.from(element.children).filter(
          (child) => child.tagName === "INPUT"
        );

        if (
          !location.some((value) => value.checked) &&
          !Array.from(element.children).find(
            (child) => child.className === "error-message"
          )
        ) {
          createMessage({ target: { name: "location" } }, element);
        } else {
          removeErrorMessage(element);
        }
      } else if (input.id === "checkbox1") {
        validateInput(
          { target: { name: "checkbox1", value: input.checked } },
          element
        );
      } else {
        validateInput(
          { target: { name: input.name, value: input.value } },
          element
        );
      }
    });
    return false;
  } else {
    alert("Nous avons bien reçu votre inscription");
    return true;
  }
};

function removeErrorMessage(container) {
  const child = Array.from(container.children).find(
    (child) => child.className === "error-message"
  );
  if (child) {
    container.removeChild(child);
  }
}

function isSomeFieldEmpty() {
  return Array.from(formData).some((element) => {
    const input = Array.from(element.children).find(
      (child) => child.tagName === "INPUT"
    );

    if (input.name === "location") {
      const inputs = Array.from(element.children).filter(
        (c) => c.tagName === "INPUT"
      );
      return !inputs.some((input) => input.checked);
    } else if (input.id === "checkbox1") {
      return !input.checked;
    } else {
      return input.value === "";
    }
  });
}
