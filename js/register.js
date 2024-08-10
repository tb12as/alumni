document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const url = '/database/alumni-2020.json'; // Adjusted path for JSON file

  // Load NIM data from JSON file
  async function loadNimData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to load NIM data');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Check if NIM exists in the data
  async function isNimValid(nim) {
    const data = await loadNimData();
    return data.some((person) => person.nim.toString() === nim.toString());
  }

  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const nim = document.getElementById('nim').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !nim || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (await isNimValid(nim)) {
      localStorage.setItem('username', username);
      localStorage.setItem('nim', nim);
      localStorage.setItem('password', password); // Save password in localStorage
      alert('Registration successful!');
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      alert('Invalid NIM. Please check the NIM and try again.');
    }
  });
});
