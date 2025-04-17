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
const characterCountElement = document.getElementById("character-count");
const wordCountElement = document.getElementById("word-count");
const sentenceCountElement = document.getElementById("sentence-count");
const warningMessage = document.getElementById("warning-msg");

const textarea = document.getElementById("textareaField");
const exludesSpacesCheckBox = document.getElementById("exclude-spaces");
const characterLimitCheckBox = document.getElementById("character-limit");
const characterLimitInput = document.querySelector(".limit-input");


// function to calculate the characters counted
function characterCount() {
  let text = textarea.value;
  const excludeSpaces = exludesSpacesCheckBox.checked;

  // is excludeSpaces checkbox checked?
  if (excludeSpaces) {
    text = text.replace(/\s/g, ""); // remove spaces
  }

  // get text length and update count element
  const count = text.length;
  characterCountElement.textContent = count < 10 ? `0${count}` : count;

  checkCharacterLimit(count);
}

// funtion to get the words count
function getWordCount(text) {
  const trimmedText = text.trim();

  if (trimmedText === "") return 0;

  const words = trimmedText.split(/\s+/);

  return words.length;
}

// function to get the sentence count
function getSentenceCount(text) {
  const trimmedText = text.trim();

  if (trimmedText === "") return 0;

  const sentences = trimmedText
    .split(/[\.\!\?]+(?:\s|$)/)
    .filter((sentence) => sentence.trim().length > 0);

  return sentences.length;
}

function wordCount() {
  const text = textarea.value;
  const count = getWordCount(text);

  wordCountElement.textContent = count;
}

function sentenceCount() {
  const text = textarea.value;
  const count = getSentenceCount(text);
  sentenceCountElement.textContent = count;
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

    warningMessage.innerHTML = `<img src="../assets/images/icon-info.svg" alt="warning" class="form-area__warning-icon" /> Limit reached! Your text exceeds ${limitValue} characters.`;
  } else {
    warningMessage.classList.remove("form-area__warning-msg-active");
    textarea.classList.remove("form-area__textarea-limit-exceeded");
  }
}

function updateReadingTime() {
  const text = textarea.value.trim();
  const wordCount = text === "" ? 0 : text.split(/\s+/).length;
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  const readingTimeElement = document.getElementById("reading-time");
  readingTimeElement.textContent = `Approx. reading time: > ${readingTime} minutes;`;
}

// Listeners
textarea.addEventListener("input", () => {
  characterCount();
  wordCount();
  sentenceCount();
  updateReadingTime();
});
characterLimitInput.addEventListener("input", characterCount);
exludesSpacesCheckBox.addEventListener("change", characterCount);
characterLimitCheckBox.addEventListener("change", toggleCharacterLimitField);
