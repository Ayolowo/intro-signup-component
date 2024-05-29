document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('form');
  const button = document.getElementById('button');
  const firstName = document.querySelector('.firstName');
  const lastName = document.querySelector('.lastName');
  const email = document.querySelector('.email');
  const password = document.querySelector('.password');
  const togglePassword = document.querySelector("#togglePassword");

  console.log(firstName);

  togglePassword.addEventListener("click", function() {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("bi-eye");
    this.classList.toggle("bi-eye-slash");
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fName = firstName.value;
    const lName = lastName.value;
    const emailVal = email.value;
    const passwordVal = password.value;
    console.log(fName, lName, emailVal, passwordVal);

    // Check first name
    if (fName === '') {
      showError(firstName, "First Name cannot be empty");
    } else {
      hideError(firstName);
    }

    // Check last name
    if (lName === '') {
      showError(lastName, "Last Name cannot be empty");
    } else {
      hideError(lastName);
    }

    // Check email
    if (!validateEmail(emailVal) || emailVal === '') {
      showError(email, "Looks like this is not an email");
    } else {
      hideError(email);
    }

    // Check password
    if (passwordVal === '') {
      showError(password, "Password cannot be empty");
    } else {
      hideError(password);
    }
  });

  // Function to show error
  function showError(input, message, isEmail = false) {
    let errorElement = input.nextElementSibling;
    
    // Check if the next sibling is an error message element
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      // Create the error element if it doesn't exist
      errorElement = document.createElement('small');
      errorElement.className = 'error-message';
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }

    errorElement.textContent = message;
    errorElement.classList.add("visible");

    if (isEmail) {
      input.value = '';
      input.placeholder = message;
    }

    input.classList.add("error");
  }

  // Function to hide error
  function hideError(input) {
    if (input === email) {
      input.placeholder = "Email";
    }

    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = "";
      errorElement.classList.remove("visible");
    }

    input.classList.remove("error");
  }

  // Validate email
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
