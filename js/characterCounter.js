import {
  countCharacters,
  getWordCount,
  getSentenceCount,
  estimateReadingTime,
  applyTheme,
} from "./utils.js";

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
const characterCountElement = document.getElementById("character-count");
const wordCountElement = document.getElementById("word-count");
const sentenceCountElement = document.getElementById("sentence-count");
const warningMessage = document.getElementById("warning-msg");
const emptyMessage = document.getElementById("empty-message");
const letterDensityContainer = document.getElementById(
  "letter-density-container"
);
const collapseBtn = document.getElementById("collapse-btn");

const textarea = document.getElementById("textareaField");
const exludesSpacesCheckBox = document.getElementById("exclude-spaces");
const characterLimitCheckBox = document.getElementById("character-limit");
const characterLimitInput = document.querySelector(".limit-input");

// function to calculate the characters counted
function characterCount() {
  let text = textarea.value;
  const excludeSpaces = exludesSpacesCheckBox.checked;
  const count = countCharacters(text, excludeSpaces);

  characterCountElement.textContent = count < 10 ? `0${count}` : count;
  checkCharacterLimit(count);
}

function wordCount() {
  const count = getWordCount(textarea.value);

  wordCountElement.textContent = count < 10 ? `0${count}` : count;
}

function sentenceCount() {
  const count = getSentenceCount(textarea.value);
  sentenceCountElement.textContent = count < 10 ? `0${count}` : count;
}

function toggleCharacterLimitField() {
  if (characterLimitCheckBox.checked) {
    characterLimitInput.classList.add("limit-input-active");
    characterLimitInput.value = 0;
    characterLimitInput.disabled = false;
    warningMessage.classList.remove("form-area__warning-msg-active");
    textarea.classList.remove("form-area__textarea-limit-exceeded");
  } else {
    characterLimitInput.classList.remove("limit-input-active");
    characterLimitInput.disabled = true;
    warningMessage.classList.remove("form-area__warning-msg-active");
    textarea.classList.remove("form-area__textarea-limit-exceeded");
  }

  characterCount();
}

function toggleEmptyMessage() {
  const isEmpty = textarea.value.trim().length === 0;

  if (isEmpty) {
    emptyMessage.classList.remove("is-hidden");
    letterDensityContainer.classList.add("is-hidden");
    collapseBtn.classList.add("is-hidden");
  } else {
    emptyMessage.classList.add("is-hidden");
    letterDensityContainer.classList.remove("is-hidden");
    collapseBtn.classList.remove("is-hidden");
  }
}

function checkCharacterLimit(currentCount) {
  const limitActive = characterLimitCheckBox.checked;
  const limitValue = parseInt(characterLimitInput.value);

  if (!limitActive || isNaN(limitValue) || limitValue === 0) {
    warningMessage.classList.remove("form-area__warning-msg-active");
    textarea.classList.remove("form-area__textarea-limit-exceeded");
    return;
  }

  if (currentCount > limitValue) {
    warningMessage.classList.add("form-area__warning-msg-active");
    textarea.classList.add("form-area__textarea-limit-exceeded");

    warningMessage.innerHTML = `<img src="/assets/images/icon-info.svg" alt="warning" class="form-area__warning-icon" /> Limit reached! Your text exceeds ${limitValue} characters.`;
  } else {
    warningMessage.classList.remove("form-area__warning-msg-active");
    textarea.classList.remove("form-area__textarea-limit-exceeded");
  }
}

function updateReadingTime() {
  const readingTime = estimateReadingTime(textarea.value);

  const readingTimeElement = document.getElementById("reading-time");
  readingTimeElement.textContent = `Approx. reading time: <${readingTime} minute${
    readingTime > 1 ? "s" : ""
  }`;
}

function renderLetterDensity() {
  const text = textarea.value.toUpperCase().replace(/[^A-Z]/g, "");
  const totalLetters = text.length;
  letterDensityContainer.innerHTML = "";

  if (totalLetters === 0) {
    letterDensityContainer.classList.add("is-hidden");
    return;
  }

  const letterCounts = {};
  for (let char of text) {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }

  const sortedLetters = Object.entries(letterCounts).sort(
    (a, b) => b[1] - a[1]
  );

  sortedLetters.forEach(([letter, count], index) => {
    const percent = ((count / totalLetters) * 100).toFixed(2);

    const item = document.createElement("div");
    item.classList.add("letter-density__item");

    if (index >= 5) {
      item.classList.add("is-collapsed");
      item.style.display = "none";
    }

    item.innerHTML = `
      <span class="letter-density__letter">${letter}</span>
      <div class="letter-density__bar">
        <div class="letter-density__fill" style="width: ${percent}%"></div>
      </div>
      <span class="letter-density__count">${count} (${percent}%)</span>
    `;
    letterDensityContainer.appendChild(item);
  });

  letterDensityContainer.classList.remove("is-hidden");

  if (sortedLetters.length > 5) {
    collapseBtn.classList.remove("is-hidden");
    collapseBtn.innerHTML = `<span>See more <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z" fill="currentColor"/>
</svg></span>`;
  }
}

// Listeners
textarea.addEventListener("input", () => {
  characterCount();
  wordCount();
  sentenceCount();
  updateReadingTime();
  toggleEmptyMessage();
  renderLetterDensity();
});
characterLimitInput.addEventListener("input", characterCount);
exludesSpacesCheckBox.addEventListener("change", characterCount);
characterLimitCheckBox.addEventListener("change", toggleCharacterLimitField);

collapseBtn.addEventListener("click", () => {
  const hiddenItems = letterDensityContainer.querySelectorAll(
    ".letter-density__item.is-collapsed"
  );

  const isExpanded =
    collapseBtn.querySelector("span") &&
    collapseBtn.querySelector("span").textContent.trim() === "See less";

  hiddenItems.forEach((item) => {
    item.style.display = isExpanded ? "none" : "flex";
  });

  const span = collapseBtn.querySelector("span");

  if (isExpanded) {
    span.innerHTML = `See more <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z" fill="currentColor"/>
</svg>`;
  } else {
    span.innerHTML = `See less <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.28125 0.625L10.9062 5.21875C11.0625 5.34375 11.0625 5.59375 10.9062 5.75L10.2812 6.34375C10.125 6.5 9.90625 6.5 9.75 6.34375L6 2.65625L2.28125 6.34375C2.125 6.5 1.875 6.5 1.75 6.34375L1.125 5.75C0.96875 5.59375 0.96875 5.34375 1.125 5.21875L5.75 0.625C5.90625 0.46875 6.125 0.46875 6.28125 0.625Z" fill="currentColor"/>
</svg>
`;
  }
});
