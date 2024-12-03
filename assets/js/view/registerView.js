"use strict";

export const View = {
  togglePasswordButtons: document.querySelectorAll(".toggle-password"),
  submitButton: document.getElementById("submit-btn"),
  form: document.querySelector(".register-data"),

  updateStatus(rules, status) {
    const parent = status.closest(".input-group");
    let valid = true;
    rules.forEach((rule) => {
      valid = valid && rule.valid;
      const statusField = status.querySelector(`#${rule.id}`);
      statusField.classList = rule.valid ? ["valid"] : ["invalid"];
    });
    if (valid) {
      parent.classList.remove("invalid");
      parent.classList.add("valid");
    } else {
      parent.classList.remove("valid");
      parent.classList.add("invalid");
    }
  },

  showStatus(key, status) {
    for (const elementKey in status) {
      status[elementKey].classList.remove("visible");
    }
    status[key].classList.add("visible");
  },

  confirmPasswordStatus(confirmed, inputField, statusDiv) {
    const parent = inputField.closest(".input-group");
    const statusField = statusDiv.querySelector("p");
    statusField.classList = confirmed ? ["valid"] : ["invalid"];
    if (confirmed) {
      parent.classList.remove("invalid");
      parent.classList.add("valid");
    } else {
      parent.classList.remove("valid");
      parent.classList.add("invalid");
    }
  },

  resetForm(inputFields) {
    for (const key in inputFields) {
      inputFields[key].value = "";
      console.log(key);
    }
  },

  togglePasswordVisibility(button) {
    const input = button.closest(".input-group").querySelector("input");
    const isPasswordVisible = input.type === "password";
    input.type = isPasswordVisible ? "text" : "password";
    button.classList.toggle("fa-eye-slash", isPasswordVisible);
    button.classList.toggle("fa-eye");
  },
};
