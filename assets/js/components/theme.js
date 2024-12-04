const darkModeSwitch = document.getElementById("dark-mode-switch");

// ======= Theme Management =======

// Get theme from browser or localStorage
let theme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
setTheme(theme);

// Add event listener for theme toggle
darkModeSwitch?.addEventListener("change", toggleTheme);

function toggleTheme() {
  const selectedTheme = darkModeSwitch.checked ? "dark" : "light";
  setTheme(selectedTheme);
  localStorage.setItem("theme", selectedTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (darkModeSwitch) darkModeSwitch.checked = theme === "dark";
}
