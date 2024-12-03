"use strict";

export const Model = {
  inputFields: {
    username: document.querySelector("input#username"),
    email: document.querySelector("input#email"),
    phone: document.querySelector("input#phone"),
    password: document.querySelector("input#password"),
    confirmPassword: document.querySelector("input#confirm_password"),
  },

  inputStatus: {
    username: document.querySelector("p#username"),
    email: document.querySelector("p#email"),
    phone: document.querySelector("p#phone"),
    password: document.querySelector("p#password"),
    confirmPassword: document.querySelector("p#confirm_password"),
  },

  inputRules: {
    username: [
      { regex: /^[A-Za-z]/, message: "User name must start with a letter" },
      {
        regex: /^[A-Za-z0-9_ ]+$/,
        message: "Only letters, numbers, or _ allowed",
      },
    ],
    email: [
      {
        regex: /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/,
        message: "Only Gmail or Outlook emails allowed",
      },
    ],
    phone: [{ regex: /^\d{11,}$/, message: "Enter a valid mobile number" }],
    password: [
      {
        regex: /[!@#$%^&*(),.?":{}|<>]/,
        message: "Include at least one special character",
      },
      { regex: /\d/, message: "Include at least one number" },
      { regex: /[a-z]/, message: "Include at least one lowercase letter" },
      { regex: /[A-Z]/, message: "Include at least one uppercase letter" },
      { regex: /.{8,}/, message: "Include at least 8 characters" },
    ],
  },

  validateField(field, value) {
    if (!value) return { valid: false, message: "This field is required" };

    const rules = this.inputRules[field] || [];
    for (const rule of rules) {
      if (!rule.regex.test(value))
        return { valid: false, message: rule.message };
    }
    return { valid: true };
  },
};
