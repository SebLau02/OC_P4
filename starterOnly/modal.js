// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtns = document.querySelectorAll(".toggle-modal-btn");

// launch modal event
modalBtns.forEach((btn) => btn.addEventListener("click", toggleModal));

// launch modal form
function toggleModal() {
  modalbg.classList.toggle("active");
}
