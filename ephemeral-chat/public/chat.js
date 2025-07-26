document.addEventListener("DOMContentLoaded", () => {
  const storedUsername = localStorage.getItem("username");

  if (!storedUsername) {
    window.location.href = "index.html";
    return;
  }

  fetch("http://localhost:3000/api/active-users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: storedUsername }),
  });

  window.addEventListener("beforeunload", () => {
    navigator.sendBeacon(
      "http://localhost:3000/api/active-users/remove",
      new Blob([JSON.stringify({ username: storedUsername })], {
        type: "application/json",
      })
    );
    localStorage.removeItem("username");
  });

  const quitButton = document.querySelector(".quit-btn");
  if (quitButton) {
    quitButton.addEventListener("click", () => {
      fetch("http://localhost:3000/api/active-users/remove", {
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

  const container = document.querySelector(".request-container");
  const requestBtn = document.querySelector(".request-btn");

  requestBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    container.classList.add("active");
    requestInput.focus();
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove("active");
      requestInput.value = "";
    }
  });

  requestInput.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  requestInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const typedUsername = requestInput.value.trim();
      if (typedUsername.length > 0) {
        console.log("Send chat request to:", typedUsername);
        // You can send request to backend here
        container.classList.remove("active");
        requestInput.value = "";
      }
    }
  });
});
