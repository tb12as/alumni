document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');

  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      alert('Login successful!');
      window.location.href = 'index.html'; // Redirect to the homepage
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });
});
