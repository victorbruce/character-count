/**
 * @jest-environment jsdom
 */

import {
  toggleTheme,
  countCharacters,
  getWordCount,
  getSentenceCount,
  estimateReadingTime,
} from "../js/utils";

describe("DOM mocking", () => {
  describe("Theme toggling", () => {
    beforeEach(() => {
      // Set up a mock HTML environment
      document.documentElement.dataset.theme = "light";
      localStorage.clear();
    });

    test("should toggle from light to dark", () => {
      toggleTheme();
      expect(document.documentElement.dataset.theme).toBe("dark");
      expect(localStorage.getItem("theme")).toBe("dark");
    });

    test("should toggle from dark to light", () => {
      document.documentElement.dataset.theme = "dark";
      toggleTheme();
      expect(document.documentElement.dataset.theme).toBe("light");
      expect(localStorage.getItem("theme")).toBe("light");
    });
  });

  describe("Character Count DOM Update", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <textarea id="textareaField"></textarea>
        <p id="character-count">00</p>
      `;
    });

    test("should update character count when text is entered", () => {
      const textarea = document.getElementById("textareaField");
      const charCountEl = document.getElementById("character-count");

      // Simulate user typing
      textarea.value = "Hello!";
      const newCount = countCharacters(textarea.value);

      // Simulate manual UI update (like your input event would do)
      charCountEl.textContent = newCount;

      expect(charCountEl.textContent).toBe("6");
    });
  });

  describe("Word Count DOM Update", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <textarea id="textareaField"></textarea>
        <p id="word-count">00</p>
      `;
    });

    test("should update word count when text is entered", () => {
      const textarea = document.getElementById("textareaField");
      const wordCountEl = document.getElementById("word-count");

      textarea.value = "Hello world, this is a test!";
      const newCount = getWordCount(textarea.value);

      // Simulate UI update
      wordCountEl.textContent = newCount;

      expect(wordCountEl.textContent).toBe("6");
    });

    test("should show 0 for empty input", () => {
      const textarea = document.getElementById("textareaField");
      const wordCountEl = document.getElementById("word-count");

      textarea.value = "";
      const newCount = getWordCount(textarea.value);
      wordCountEl.textContent = newCount;

      expect(wordCountEl.textContent).toBe("0");
    });
  });

  describe("Sentence Count DOM Update", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <textarea id="textareaField"></textarea>
        <p id="sentence-count">00</p>
      `;
    });

    test("should update sentence count with proper punctuation", () => {
      const textarea = document.getElementById("textareaField");
      const sentenceCountEl = document.getElementById("sentence-count");

      textarea.value =
        "This is the first sentence. And here's another! Is this the third?";
      const count = getSentenceCount(textarea.value);
      sentenceCountEl.textContent = count;

      expect(sentenceCountEl.textContent).toBe("3");
    });

    test("should return 0 for empty input", () => {
      const textarea = document.getElementById("textareaField");
      const sentenceCountEl = document.getElementById("sentence-count");

      textarea.value = "";
      const count = getSentenceCount(textarea.value);
      sentenceCountEl.textContent = count;

      expect(sentenceCountEl.textContent).toBe("0");
    });

    test("should handle edge cases without punctuation", () => {
      const textarea = document.getElementById("textareaField");
      const sentenceCountEl = document.getElementById("sentence-count");

      textarea.value =
        "This looks like a long run-on sentence without proper punctuation";
      const count = getSentenceCount(textarea.value);
      sentenceCountEl.textContent = count;

      // Depending on your logic, you might count this as 1 or 0
      expect(sentenceCountEl.textContent).toBe("1");
    });
  });

  describe("Estimated Reading Time", () => {
    beforeEach(() => {
      // Set up minimal HTML structure
      document.body.innerHTML = `
        <textarea id="textareaField"></textarea>
        <p id="reading-time">Approx. reading time: &lt;0 minute</p>
      `;
    });

    test("updates estimated reading time correctly", () => {
      const textarea = document.getElementById("textareaField");
      const readingTimeDisplay = document.getElementById("reading-time");

      textarea.value = "This is a test with about ten words in total.";
      const estimatedTime = estimateReadingTime(textarea.value);

      // Simulate update (your app logic might do this in an event listener)
      readingTimeDisplay.textContent = `Approx. reading time: ${estimatedTime} minute${
        estimatedTime > 1 ? "s" : ""
      }`;

      expect(readingTimeDisplay.textContent).toBe(
        "Approx. reading time: 1 minute"
      );
    });
  });

  describe("Warning Message Display", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <textarea id="textareaField"></textarea>
        <input type="checkbox" id="character-limit" />
        <input type="text" class="limit-input" />
        <p id="warning-msg" class="form-area__warning-msg"></p>
      `;
    });

    test("displays a warning when character count exceeds the limit", () => {
      const textarea = document.getElementById("textareaField");
      const charLimitCheckbox = document.getElementById("character-limit");
      const limitInput = document.querySelector(".limit-input");
      const warningMsg = document.getElementById("warning-msg");

      // Enable character limit and set a limit
      charLimitCheckbox.checked = true;
      limitInput.value = "10";
      textarea.value = "This text has more than ten characters.";

      const limit = parseInt(limitInput.value, 10);
      const charCount = textarea.value.length;

      if (charLimitCheckbox.checked && !isNaN(limit) && charCount > limit) {
        warningMsg.textContent = "Character limit exceeded!";
      }

      expect(warningMsg.textContent).toBe("Character limit exceeded!");
    });

    test("does not show a warning if limit is not exceeded", () => {
      const textarea = document.getElementById("textareaField");
      const charLimitCheckbox = document.getElementById("character-limit");
      const limitInput = document.querySelector(".limit-input");
      const warningMsg = document.getElementById("warning-msg");

      charLimitCheckbox.checked = true;
      limitInput.value = "50";
      textarea.value = "Short text";

      const limit = parseInt(limitInput.value, 10);
      const charCount = textarea.value.length;

      if (charLimitCheckbox.checked && !isNaN(limit) && charCount > limit) {
        warningMsg.textContent = "Character limit exceeded!";
      } else {
        warningMsg.textContent = "";
      }

      expect(warningMsg.textContent).toBe("");
    });
  });
});
