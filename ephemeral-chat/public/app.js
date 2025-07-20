const bannedWords = [
  "fuck", "shit", "bitch", "nigger", "cunt", "asshole", "slut",
  "retard", "fag", "dick", "whore", "rape", "nigga"
];

const input = document.getElementById("username");
const button = document.getElementById("enter-btn");

const isCleanText = (text) => {
  const pattern = /^[a-zA-Z0-9_]+$/;
  return pattern.test(text);
};

const containsBadWords = (text) => {
  const normalized = text.toLowerCase();
  return bannedWords.some(word => normalized.includes(word));
};

const validate = () => {
  const username = input.value.trim();
  const validLength = username.length >= 3;
  const noBadChars = isCleanText(username);
  const noBadWords = !containsBadWords(username);

  if (validLength && noBadChars && noBadWords) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};

input.addEventListener("input", validate);
