// Redirect if username is not set
if (!localStorage.getItem("username")) {
  window.location.href = "index.html";
}

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("username");
});

document.addEventListener("DOMContentLoaded", () => {
  const usernameDiv = document.querySelector(".username");
  const storedUsername = localStorage.getItem("username");

  if (storedUsername && usernameDiv) {
    usernameDiv.textContent = storedUsername;
  }

  const quitButton = document.querySelector(".quit-btn");
  quitButton.addEventListener("click", () => {
    localStorage.removeItem("username");

    window.open('', '_self', '');
    window.close();

    setTimeout(() => {
      alert("Please close this tab manually.");
    }, 300);
  });
});

window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", function () {
  window.history.pushState(null, "", window.location.href);
});

const searchBtn = document.querySelector('.actions button'); // first button = search
const searchOverlay = document.getElementById('searchOverlay');

let expanded = false;

searchBtn.addEventListener('click', () => {
  expanded = !expanded;
  if (expanded) {
    searchOverlay.style.height = "400px";
    searchOverlay.style.opacity = "1";
    searchOverlay.style.pointerEvents = "auto";
  } else {
    searchOverlay.style.height = "0";
    searchOverlay.style.opacity = "0";
    searchOverlay.style.pointerEvents = "none";
  }
});

const closeBtn = document.getElementById("closeSearch");

closeBtn.addEventListener("click", () => {
  expanded = false;
  searchOverlay.style.height = "0";
  searchOverlay.style.opacity = "0";
  searchOverlay.style.pointerEvents = "none";
});

// I just realised my