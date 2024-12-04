import Model from "./model/otpModel.js";
import View from "./view/otpView.js";

const Controller = ((model, view) => {
  const { elements } = view;

  const handleResendOTP = () => {
    if (model.state.canResend) {
      view.showAlert(
        "Success",
        "The new OTP code has been sent successfully!",
        "success"
      );
      model.setResendTimer(120);
      view.disableResendLink(true);
      view.clearInputs();
      clearInterval(model.state.timerId);
      startTimer();
    } else {
      alert("Cannot resend code. Time has expired.");
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = Array.from(elements.inputs)
      .map((input) => input.value)
      .join("");
    if (enteredOTP.length === 4) {
      if (enteredOTP === model.state.otpResponse) {
        view.showAlert(
          "Joined successfully",
          "The OTP is correct! Welcome to our website. Have fun!",
          "success"
        );
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      } else {
        view.showAlert("Error", "Wrong OTP", "error");
        view.clearInputs();
      }
    } else {
      view.showAlert("Error", "Please enter a 4-digit OTP", "error");
    }
  };

  const handleInput = (e, index) => {
    const input = e.target;
    if (input.value.length > 1) input.value = input.value.slice(0, 1);
    if (input.value.length === 1 && index < elements.inputs.length - 1) {
      elements.inputs[index + 1].focus();
    }
    setTimeout(checkFullOTP, 0);
  };

  const handleInputKeydown = (e, index) => {
    const input = e.target;
    if (e.key === "Backspace" && !input.value && index > 0) {
      elements.inputs[index - 1].focus();
    }
    if (e.key === "e") e.preventDefault();
  };

  const checkFullOTP = () => {
    const enteredOTP = Array.from(elements.inputs)
      .map((input) => input.value)
      .join("");
    if (enteredOTP.length === 4) setTimeout(handleVerifyOTP, 0);
  };

  const startTimer = () => {
    const updateTimerDisplay = () => {
      if (model.state.resendTimer <= 0) {
        clearInterval(model.state.timerId);
        view.updateTimerDisplay(0);
        view.disableResendLink(false);
        model.setCanResend(true);
      } else {
        view.updateTimerDisplay(model.state.resendTimer);
        model.setResendTimer(model.state.resendTimer - 1);
      }
    };

    model.setTimerId(setInterval(updateTimerDisplay, 1000));
  };

  const init = () => {
    startTimer();
    elements.resendLink.addEventListener("click", handleResendOTP);
    elements.verifyBtn.addEventListener("click", handleVerifyOTP);
    elements.inputs.forEach((input, index) => {
      input.addEventListener("input", (e) => handleInput(e, index));
      input.addEventListener("keydown", (e) => handleInputKeydown(e, index));
    });
  };

  return {
    init,
  };
})(Model, View);

Controller.init();
