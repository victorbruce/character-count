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

const characterCountElement = document.querySelector(
  ".cards__card--characters .card__count"
);

function textareaInput() {
  // get the textarea input field
  const textarea = document.getElementById("textareaField");
  textarea.addEventListener("input", () => {
    const characterCount = textarea.value.length;

    characterCountElement.textContent =
      characterCount === 0 ? "00" : characterCount;
  });
}


textareaInput();
