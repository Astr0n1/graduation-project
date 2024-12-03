"use strict";

export const View = {
  togglePasswordButtons: document.querySelectorAll(".toggle-password"),
  submitButton: document.getElementById("submit-btn"),
  form: document.querySelector(".register-data"),

  updateStatus(element, status, message = "") {
    const parent = element.closest(".input-group");
    if (status === "valid") {
      parent.classList.remove("error");
      parent.classList.add("valid");
      element.textContent = "";
    } else if (status === "error") {
      parent.classList.add("error");
      parent.classList.remove("valid");
      element.textContent = message;
    } else {
      parent.classList.remove("error", "valid");
      element.textContent = "";
    }
  },

  resetForm(inputFields, inputStatus) {
    for (const key in inputFields) {
      inputFields[key].value = "";
      this.updateStatus(inputStatus[key], "reset");
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
