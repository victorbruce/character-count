export function getWordCount(text) {
  const trimmedText = text.trim();
  if (trimmedText === "") return 0;
  return trimmedText.split(/\s+/).length;
}

export function getSentenceCount(text) {
  const trimmedText = text.trim();

  if (trimmedText === "") return 0;

  const sentences = trimmedText
    .split(/[\.\!\?]+(?:\s|$)/)
    .filter((sentence) => sentence.trim().length > 0);

  return sentences.length;
}

export function countCharacters(text, excludeSpaces = false) {
  return excludeSpaces ? text.replace(/\s/g, "").length : text.length;
}

export function estimateReadingTime(text) {
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}
