"use strict";

import { Model } from "./model/registerModel.js";
import { View } from "./view/registerView.js";

const Controller = {
  init() {
    this.bindEvents();
    this.resetOnLoad();
  },

  bindEvents() {
    // Prevent letters in phone field
    Model.inputFields.phone.addEventListener("input", () => {
      Model.inputFields.phone.value = Model.inputFields.phone.value.replace(
        /[^0-9+]/g,
        ""
      );
    });

    // Toggle password visibility
    View.togglePasswordButtons.forEach((button) =>
      button.addEventListener("click", () =>
        View.togglePasswordVisibility(button)
      )
    );

    // Validate input fields
    for (const key in Model.inputFields) {
      const input = Model.inputFields[key];
      input.addEventListener("input", () => this.validateField(key));
    }

    // Confirm password validation
    Model.inputFields.confirmPassword.addEventListener(
      "input",
      this.validateConfirmPassword.bind(this)
    );

    // Submit form
    View.submitButton.addEventListener("click", (e) => this.handleSubmit(e));
  },

  validateField(field) {
    const input = Model.inputFields[field];
    const value = input.value;
    const { valid, message } = Model.validateField(field, value);

    View.updateStatus(
      Model.inputStatus[field],
      valid ? "valid" : "error",
      message
    );
  },

  validateConfirmPassword() {
    const password = Model.inputFields.password.value;
    const confirmPassword = Model.inputFields.confirmPassword.value;

    if (!confirmPassword) {
      View.updateStatus(Model.inputStatus.confirmPassword, "reset");
      return;
    }

    if (password === confirmPassword) {
      View.updateStatus(Model.inputStatus.confirmPassword, "valid");
    } else {
      View.updateStatus(
        Model.inputStatus.confirmPassword,
        "error",
        "Passwords do not match"
      );
    }
  },

  handleSubmit(event) {
    event.preventDefault();
    let isValid = true;

    // Validate all fields
    for (const key in Model.inputFields) {
      const input = Model.inputFields[key];
      const parent = input.closest(".input-group");

      if (!input.value || parent.classList.contains("error")) {
        isValid = false;
        this.validateField(key);
      }
    }

    // Validate confirm password
    this.validateConfirmPassword();

    // Check if all fields are valid
    if (isValid) this.successLogin();
  },

  successLogin() {
    const userData = Object.keys(Model.inputFields).reduce((data, key) => {
      data[key] = Model.inputFields[key].value;
      return data;
    }, {});

    console.log(userData);
    // Redirect to another page if needed
    // window.location.href = "index.html";
  },

  resetOnLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      View.resetForm(Model.inputFields, Model.inputStatus);
    });
  },
};

Controller.init();
