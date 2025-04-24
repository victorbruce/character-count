const { getWordCount } = require("../js/utils.js");

describe("Letter analysis utilties", () => {
  describe("getWordCount()", () => {
    test("returns 2 for 'Hello world'", () => {
      expect(getWordCount("Hello world")).toBe(2);
    });

    test("returns 0 for empty string", () => {
      expect(getWordCount("")).toBe(0);
    });

    test("trims extra spaces", () => {
      expect(getWordCount("  one  two  three  ")).toBe(3);
    });
  });
});
