// ======= DOM Elements =======
const body = document.querySelector("body");
const darkModeSwitch = document.getElementById("dark-mode-switch");
const menuBtn = document.getElementById("menu");
const navBar = document.querySelector(".navbar");
const navOverlay = document.querySelector(".nav-overlay");
const newsContainer = document.querySelector(".news");
const newsText = document.querySelector(".news-content");

// ======= Sidebar Control =======

// Toggle sidebar visibility
menuBtn.addEventListener("click", () => {
  navBar.classList.toggle("active");
});

// Hide sidebar when clicking on the overlay
navOverlay.addEventListener("click", () => {
  navBar.classList.remove("active");
});

// ======= Active Page Marking =======
(function markActivePage() {
  let path = window.location.pathname.slice(1) || "index.html";
  console.log(path);

  document.querySelectorAll(".nav-item.active").forEach((link) => {
    link.classList.remove("active");
  });

  document.querySelectorAll(`.nav-item[href="${path}"]`).forEach((navItem) => {
    navItem.classList.add("active");
  });
})();

// ======= Theme Management =======

// Get theme from browser or localStorage
let theme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
setTheme(theme);

// Add event listener for theme toggle
darkModeSwitch.addEventListener("change", toggleTheme);

function toggleTheme() {
  const selectedTheme = darkModeSwitch.checked ? "dark" : "light";
  setTheme(selectedTheme);
  localStorage.setItem("theme", selectedTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  darkModeSwitch.checked = theme === "dark";
}

// ======= News Control =======

// Example news response
const newsResponse = {
  status: 1,
  message: "fetched successfully",
  data: [
    { id: 1, news_data: "hi there for 1 minute", news_timer: 1 },
    { id: 2, news_data: "hi there for three minutes", news_timer: 3 },
    { id: 3, news_data: "hi there for two minutes", news_timer: 3 },
  ],
};

// Handle news display
function controlNews(news) {
  if (!news.status) return;
  cycleNewsItems(news.data, 0);
}

function cycleNewsItems(newsItems, index) {
  if (index >= newsItems.length) return;

  const currentItem = newsItems[index];

  // Update DOM with current news item
  newsContainer.dataset.id = currentItem.id;
  newsContainer.dataset.time = currentItem.news_timer;
  newsText.textContent = currentItem.news_data;

  // Update text scrolling speed
  updateTextSpeed();

  // Schedule the next news item
  setTimeout(() => {
    cycleNewsItems(newsItems, index + 1);
  }, (currentItem.news_timer * 60 + 20) * 1000);
}

// Update text scroll animation duration based on text and container width
function updateTextSpeed() {
  const textWidth = newsText.offsetWidth;
  const containerWidth = newsText.parentElement.offsetWidth;
  const speed = 100; // Speed in pixels per second
  const duration = (textWidth + containerWidth) / speed;

  newsText.style.animationDuration = `${duration}s`;
}

// Start controlling news and adjust scrolling on resize
controlNews(newsResponse);
window.addEventListener("resize", updateTextSpeed);
