// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtns = document.querySelectorAll(".modal-btn");
const closeModalBtns = document.querySelectorAll(".close-modal");

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
