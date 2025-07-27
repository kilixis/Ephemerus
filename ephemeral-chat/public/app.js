const bannedWords = [
  "fuck", "shit", "bitch", "nigger", "cunt", "asshole", "slut",
  "retard", "fag", "dick", "whore", "rape", "nigga", "admin", "mod", "creator", "owner", "superadmin", "eyp", "ephemerus"
];

const input = document.getElementById("username");
const button = document.getElementById("enter-btn");
const form = document.querySelector("form");

const isCleanText = (text) => {
  const pattern = /^[a-zA-Z0-9_]+$/;
  return pattern.test(text);
};

const containsBadWords = (text) => {
  const normalized = text.toLowerCase();
  return bannedWords.some(word => normalized.includes(word));
};

const validate = () => {
  let username = input.value.replace(/\s+/g, "");
  input.value = username;

  const validLength = username.length >= 3;
  const noBadChars = isCleanText(username);
  const noBadWords = !containsBadWords(username);

  const isValid = validLength && noBadChars && noBadWords;
  button.disabled = !isValid;
  return isValid;
};

input.addEventListener("input", validate);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validate()) {
    const username = input.value;
    localStorage.setItem("username", username);
    window.location.href = "chat.html";
  }
});

// baby im singing out tonight