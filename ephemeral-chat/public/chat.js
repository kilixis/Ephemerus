document.addEventListener("DOMContentLoaded", async () => {
  // Supabase setup
  const SUPABASE_URL = 'https://fxwqhjhiwifzmgwvyhwk.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4d3Foamhpd2lmem1nd3Z5aHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODM5MjEsImV4cCI6MjA2ODg1OTkyMX0.R56WWsFVoI7Bi5JitGmeLw0TT1fddFI6St-NbFDG4do';

  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const storedUsername = localStorage.getItem("username");

  // idk
  if (!storedUsername) {
    window.location.href = "index.html";
    return;
  }

  // doesnt work
  if (performance.navigation.type === 1) {
    await supabaseClient.from("active_users").delete().eq("username", storedUsername);
    localStorage.removeItem("username");
    window.location.href = "index.html";
    return;
  }

  // works 
  try {
    const { data, error } = await supabaseClient
      .from('active_users')
      .insert([{ username: storedUsername }]);

    if (error) {
      console.error('❌ Failed to insert user:', error.message);
    } else {
      console.log('✅ User inserted:', data);
    }
  } catch (err) {
    console.error('❌ Error inserting user:', err);
  }

  // works
  const usernameDiv = document.querySelector(".username");
  if (usernameDiv) {
    usernameDiv.textContent = storedUsername;
  }

  // works
  const quitButton = document.querySelector(".quit-btn");
  quitButton.addEventListener("click", async () => {
    await supabaseClient.from("active_users").delete().eq("username", storedUsername);
    localStorage.removeItem("username");

    window.open('', '_self', '');
    window.close();

    setTimeout(() => {
      alert("Please close this tab manually.");
    }, 300);
  });

  // just here, doesnt work
  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", () => {
    window.history.pushState(null, "", window.location.href);
  });

  // doesnt work(yet)
  window.addEventListener("beforeunload", async () => {
    await supabaseClient.from("active_users").delete().eq("username", storedUsername);
    localStorage.removeItem("username");
  });

  // search thing logic
  const searchBtn = document.querySelector('.actions button');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById("closeSearch");
  const searchResults = document.getElementById('searchResults');

  let expanded = false;

  searchBtn.addEventListener('click', () => {
    expanded = !expanded;
    toggleSearchOverlay(expanded);
    if (expanded) fetchActiveUsers();
  });

  closeBtn.addEventListener("click", () => {
    expanded = false;
    toggleSearchOverlay(false);
  });

  function toggleSearchOverlay(show) {
    searchOverlay.style.height = show ? "400px" : "0";
    searchOverlay.style.opacity = show ? "1" : "0";
    searchOverlay.style.pointerEvents = show ? "auto" : "none";
  }

  async function fetchActiveUsers() {
    const { data, error } = await supabaseClient
      .from('active_users')
      .select('username');

    if (error) {
      console.error('Error fetching users:', error.message);
      return;
    }

    updateSearchResults(data);
  }

  function updateSearchResults(users) {
    searchResults.innerHTML = '';
    users.forEach(user => {
      const div = document.createElement('div');
      div.textContent = user.username;
      searchResults.appendChild(div);
    });
  }
});
