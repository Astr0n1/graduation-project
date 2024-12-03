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
    username: document.querySelector("div.status-messages#username"),
    email: document.querySelector("div.status-messages#email"),
    phone: document.querySelector("div.status-messages#phone"),
    password: document.querySelector("div.status-messages#password"),
    confirmPassword: document.querySelector(
      "div.status-messages#confirm_password"
    ),
  },

  inputRules: {
    username: [
      { regex: /^[A-Za-z]/, id: "start", valid: false },
      {
        regex: /^[A-Za-z0-9_ ]+$/,
        id: "letters",
        valid: false,
      },
    ],
    email: [
      {
        regex: /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|icloud\.com)$/,
        id: "email",
        valid: false,
      },
    ],
    phone: [{ regex: /^\d{10,}$/, id: "phone", valid: false }],
    password: [
      { regex: /[!@#$%^&*(),.?":{}|<>]/, id: "special", valid: false },
      { regex: /\d/, id: "number", valid: false },
      { regex: /[a-z]/, id: "lower", valid: false },
      { regex: /[A-Z]/, id: "upper", valid: false },
      { regex: /.{8,}/, id: "eight_letters", valid: false },
    ],
  },

  validateField(key, value) {
    const rules = this.inputRules[key] || [];
    if (!value) {
      for (const rule of rules) {
        rule.valid = false;
      }
      return;
    }
    for (const rule of rules) {
      if (rule.regex.test(value)) rule.valid = true;
      else rule.valid = false;
    }
  },
};
