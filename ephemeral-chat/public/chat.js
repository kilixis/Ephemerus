document.addEventListener("DOMContentLoaded", () => {
  const storedUsername = localStorage.getItem("username");

  if (!storedUsername) {
    window.location.href = "index.html";
    return;
  }

  fetch("http://localhost:3000/add-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: storedUsername }),
  });

  window.addEventListener("beforeunload", () => {
    navigator.sendBeacon(
      "http://localhost:3000/remove-user",
      new Blob([JSON.stringify({ username: storedUsername })], {
        type: "application/json",
      })
    );
    localStorage.removeItem("username");
  });

  const quitButton = document.querySelector(".quit-btn");
  if (quitButton) {
    quitButton.addEventListener("click", () => {
      fetch("http://localhost:3000/remove-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: storedUsername }),
      });
      localStorage.removeItem("username");
      window.open("", "_self");
      window.close();
    });
  }

  const usernameDiv = document.querySelector(".username");
  if (usernameDiv) usernameDiv.textContent = storedUsername;

  const requestInput = document.querySelector(".request-input");
  const requestButton = document.querySelector(".request-btn");

  if (requestButton && requestInput) {
    requestButton.addEventListener("click", () => {
      const target = requestInput.value.trim();
      if (!target) return;
      alert(`Sending request to ${target}...`);
    });

    requestInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        requestButton.click();
      }
    });
  }
});
