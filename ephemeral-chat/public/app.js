const appName = "Ephemerus";
const titleContainer = document.getElementById("title");
const line = document.querySelector(".line");
const mainContent = document.querySelector(".main-content");

// Step 1: Expand line
setTimeout(() => {
  line.style.width = "400px";
}, 100);

// Step 2: Inject letters
setTimeout(() => {
  appName.split('').forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    titleContainer.appendChild(span);

    // Animate each letter in sequence
    setTimeout(() => {
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    }, i * 150);
  });

  titleContainer.style.opacity = "1";
}, 1200);

// Step 3: After all letters are visible
setTimeout(() => {
  // Move up and fade out title
  titleContainer.style.transform = "translateY(-30px)";
  titleContainer.style.opacity = "0";

  // Contract line
  line.style.width = "0";
}, 1200 + appName.length * 150 + 3000);

// Step 4: Show main content
setTimeout(() => {
  document.querySelector(".intro").style.display = "none";
  mainContent.classList.remove("hidden");
  mainContent.classList.add("visible");
}, 1200 + appName.length * 150 + 4000);