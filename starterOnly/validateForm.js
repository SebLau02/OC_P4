const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(e.target);
  formData.forEach((value, key) => {
    console.log(key, value);
  });
});
