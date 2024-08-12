const profileGrid = document.getElementById('profile-grid');
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const loggedInNim = localStorage.getItem('loggedInNim'); // The logged-in user's NIM

function loadData() {
  fetch('/database/alumni-2020.json', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((profiles) => {
      displayProfiles(profiles);
    })
    .catch((err) => console.log(`Error: ${err}`));
}

function displayProfiles(profiles) {
  profileGrid.innerHTML = '';

  profiles.forEach((profile) => {
    const card = document.createElement('div');
    card.className = 'profile-card';

    let img = profile.image;
    if (!img.includes('.')) {
      img += '.png';
    }

    card.innerHTML = `
      <img src="img/alumni/${img}" alt="${profile.name}">
      <p class="name">${profile.name}</p>
      <p class="nim">${profile.nim}</p>
      <p class="angkatan">Lulus tahun ${profile.angkatan + 3}</p>
      ${isLoggedIn && profile.nim === loggedInNim ? `<button class="edit-btn" data-nim="${profile.nim}">Edit Profile</button>` : ''}
    `;

    profileGrid.appendChild(card);

    // If the profile matches the logged-in user's NIM, make the whole card clickable
    if (isLoggedIn && profile.nim === loggedInNim) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.location.href = `edit-profile.html?nim=${profile.nim}`;
      });
    }
  });

  if (isLoggedIn) {
    document.querySelectorAll('.edit-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent triggering the card click event
        const nim = event.target.dataset.nim;
        window.location.href = `edit-profile.html?nim=${nim}`;
      });
    });
  }
}

loadData();
