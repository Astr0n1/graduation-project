"use strict";

const form = document.querySelector(".register-data");
const submitButton = document.getElementById("submit-btn");
const togglePassword = document.querySelectorAll(".toggle-password");

// inputs
const inputFields = {
  username: document.querySelector("input#username"),
  email: document.querySelector("input#email"),
  phone: document.querySelector("input#phone"),
  password: document.querySelector("input#password"),
};
const confirmInput = document.querySelector("input#confirm_password");

// status messages
const inputStatus = {
  username: document.querySelector("p#username"),
  email: document.querySelector("p#email"),
  phone: document.querySelector("p#phone"),
  password: document.querySelector("p#password"),
};
const confirmStatus = document.querySelector("p#confirm_password");

// rules
const inputRules = {
  username: [
    {
      regex: /^[A-Za-z]/,
      message: "User name must start with a letter",
    },
    {
      regex: /^[A-Za-z0-9_ ]+$/,
      message: "Only letters,numbers,whitespaces or _ sympol allowed",
    },
  ],
  email: [
    {
      regex: /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/,
      message: "Only Gmail , outlook emails allowed",
    },
  ],
  phone: [
    {
      regex: /^\d{11,}$/,
      message: "enter a valid mobile number",
    },
  ],
  password: [
    {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      message: "* Password must include at least least 1 special character",
    },
    { regex: /\d/, message: "* Password must include at least 1 number" },

    {
      regex: /[a-z]/,
      message: "* Password must include at least 1 lowercase letter",
    },
    {
      regex: /[A-Z]/,
      message: "* Password must include at least 1 uppercase letter",
    },
    {
      regex: /.{8,}/,
      message: "* Password must include at least 8 characters",
    },
  ],
};

// Prevent letters in the phone number input
inputFields.phone.addEventListener("input", () => {
  inputFields.phone.value = inputFields.phone.value.replace(/[^0-9+]/g, "");
});

// Toggle password visibility
togglePassword.forEach((button) => {
  button.addEventListener("click", (e) => {
    const target = e.target.closest(".input-group").querySelector("input");
    const isPasswordVisible = target.type === "password";
    target.type = isPasswordVisible ? "text" : "password";
    e.target.classList.toggle("fa-eye-slash", isPasswordVisible);
    e.target.classList.toggle("fa-eye");
  });
});

// Validate fields
for (let key in inputFields) {
  const input = inputFields[key];
  input.addEventListener("input", (event) => {
    const data = input.value;
    if (!data) {
      input.closest(".input-group").classList = ["input-group"];
      inputStatus[key].textContent = "";
      return;
    }

    let isValid = true;
    let errorMessage = "";

    inputRules[key].forEach((rule) => {
      if (!rule.regex.test(data)) {
        isValid = false;
        errorMessage = rule.message;
      }
    });

    if (isValid) {
      inputStatus[key].textContent = "";
      inputStatus[key].closest(".input-group").classList.remove("error");
      inputStatus[key].closest(".input-group").classList.add("valid");
    } else {
      inputStatus[key].textContent = errorMessage;
      inputStatus[key].closest(".input-group").classList.add("error");
      inputStatus[key].closest(".input-group").classList.remove("valid");
    }
  });
}

confirmInput.addEventListener("input", () => {
  const password = inputFields.password.value;
  const confirmPassword = confirmInput.value;

  if (!confirmPassword) {
    confirmInput.closest(".input-group").classList = ["input-group"];
    confirmStatus.textContent = "";
    return;
  }

  if (password === confirmPassword) {
    confirmStatus.textContent = "";
    confirmStatus.closest(".input-group").classList.remove("error");
    confirmStatus.closest(".input-group").classList.add("valid");
  } else {
    confirmStatus.textContent = "Passwords do not match";
    confirmStatus.closest(".input-group").classList.add("error");
    confirmStatus.closest(".input-group").classList.remove("valid");
  }
});

// Reset form on page load
document.addEventListener("DOMContentLoaded", () => {
  for (let key in inputFields) {
    inputFields[key].value = "";
    inputStatus[key].textContent = "";
    inputStatus[key].classList.remove("error");
  }
});

// submit form
submitButton.addEventListener("click", (e) => {
  let validData = true;
  e.preventDefault();
  for (let key in inputFields) {
    const input = inputFields[key];
    const parent = input.closest(".input-group");
    // check empty fields
    if (!input.value) {
      parent.classList.add("error");
      inputStatus[key].textContent = "This field is required";
      validData = false;
    }
    // check for invalid field
    if (parent.classList.contains("error")) {
      validData = false;
    }
  }
  const parent = confirmInput.closest(".input-group");
  if (!confirmInput.value) {
    parent.classList.add("error");
    confirmStatus.textContent = "This field is required";
    validData = false;
  }
  if (parent.classList.contains("error")) {
    validData = false;
  }
  if (validData) successLogin();
});

// parse login data
function successLogin() {
  const userData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
  };

  console.log(userData);
  // window.location.href = "index.html";
}
