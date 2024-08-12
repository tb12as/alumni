document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleLinks');
  toggle.onclick = (e) => {
    e.preventDefault();
    // alert('aowk');
    const links = document.querySelector('.navbar .links');
    links.classList.toggle('mobile-hidden');
    if (!links.classList.contains('mobile-hidden')) {
      toggle.innerHTML = '&times;';
    } else {
      toggle.innerHTML = '&#9776;';
    }
  };

  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');

  // Function to check if user is logged in
  function checkLoginStatus() {
    // For example, use localStorage to store login status
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (isLoggedIn) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline';
    } else {
      loginBtn.style.display = 'inline';
      logoutBtn.style.display = 'none';
    }
  }

  // Function to handle logout
  function handleLogout() {
    localStorage.setItem('loggedIn', 'false');
    checkLoginStatus();
    // Redirect to homepage or login page
    window.location.href = 'index.html';
  }

  // Check login status on page load
  checkLoginStatus();

  // Add event listener to logout button
  logoutBtn.addEventListener('click', handleLogout);
});

// document.addEventListener('DOMContentLoaded', () => {

// });
