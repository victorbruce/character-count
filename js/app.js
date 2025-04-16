// apply saved theme
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

// apply theme from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});

// toggle theme
document.getElementById("theme-toggle").addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
});

// global variables
const textarea = document.getElementById("textareaField");
const characterCountElement = document.querySelector(
  ".cards__card--characters .card__count"
);
const exludesSpacesCheckBox = document.getElementById("exclude-spaces");

function characterCount() {
  let text = textarea.value;
  const excludeSpaces = exludesSpacesCheckBox.checked;

  // is excludeSpaces checkbox checked?
  if (excludeSpaces) {
    text = text.replace(/\s/g, ""); // remove spaces
  }

  // get text length and update count element
  const count = text.length;
  characterCountElement.textContent = count;
}

textarea.addEventListener("input", updateCharacterCount);
exludesSpacesCheckBox.addEventListener("change", updateCharacterCount);
