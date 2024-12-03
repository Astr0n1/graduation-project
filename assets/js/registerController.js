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

    // show status on focus
    for (const key in Model.inputFields) {
      const input = Model.inputFields[key];
      input.addEventListener("focus", () => {
        View.showStatus(key, Model.inputStatus);
      });
    }

    // Validate input fields
    for (const key in Model.inputFields) {
      const input = Model.inputFields[key];
      if (key !== "confirmPassword") {
        input.addEventListener("input", () => this.validateField(key));
      }
    }

    // Confirm password validation
    Model.inputFields.password.addEventListener(
      "input",
      this.validateConfirmPassword.bind(this)
    );
    Model.inputFields.confirmPassword.addEventListener(
      "input",
      this.validateConfirmPassword.bind(this)
    );

    // Submit form
    View.submitButton.addEventListener("click", (e) => this.handleSubmit(e));
  },

  validateField(key) {
    const input = Model.inputFields[key];
    const value = input.value;
    Model.validateField(key, value);

    View.updateStatus(Model.inputRules[key], Model.inputStatus[key]);
  },

  validateConfirmPassword() {
    const password = Model.inputFields.password.value;
    const confirmPassword = Model.inputFields.confirmPassword.value;

    if (!confirmPassword || password !== confirmPassword) {
      View.confirmPasswordStatus(
        false,
        Model.inputFields.confirmPassword,
        Model.inputStatus.confirmPassword
      );
      return;
    }

    if (password === confirmPassword) {
      View.confirmPasswordStatus(
        true,
        Model.inputFields.confirmPassword,
        Model.inputStatus.confirmPassword
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

      if (!input.value || parent.classList.contains("invalid")) {
        isValid = false;
        // this.validateField(key);
        // TODO sweet alert failute
        swal({
          title: "Register Failure",
          text: "Make sure all input fields match the validations",
          icon: "error",
          button: "Retry",
          customClass: {
            footer: "error", // Applies the centering style
          },
        });

        console.log(`failure in input ${key}`);
      }
    }

    // Check if all fields are valid
    if (isValid) this.successLogin();
  },

  async successLogin() {
    const userData = Object.keys(Model.inputFields).reduce((data, key) => {
      data[key] = Model.inputFields[key].value;
      return data;
    }, {});

    // TODO sweet alert success + time out redirect OTP
    try {
      await swal({
        title: "Register data is valid continue to OTP step",
        icon: "success",
        button: "Go to OTP",
      });

      console.log(userData);
      window.location.href = "otp.html";
    } catch (error) {
      console.log(error);
    }
  },

  resetOnLoad() {
    document.addEventListener("DOMContentLoaded", () => {
      View.resetForm(Model.inputFields, Model.inputStatus);
    });
  },
};

Controller.init();
