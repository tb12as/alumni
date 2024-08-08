const profileGrid = document.getElementById('profile-grid');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageButtons = document.querySelectorAll('.page-btn');

const profilesPerPage = 6;
let currentPage = 1;

// Sample data (replace with your actual data)
const profiles = [
  { name: 'John Doe', nim: '12345', avatar: 'male-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'raykal', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },
  { name: 'Jane Smith', nim: '23456', avatar: 'female-avatar.png' },

  // Add more profiles here...
];

function displayProfiles(page) {
  const startIndex = (page - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const pageProfiles = profiles.slice(startIndex, endIndex);

  profileGrid.innerHTML = '';

  pageProfiles.forEach((profile) => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
            <img src="${profile.avatar}" alt="${profile.name}">
            <p class="name">${profile.name}</p>
            <p class="nim">${profile.nim}</p>
        `;
    profileGrid.appendChild(card);
  });
}

function updatePagination() {
  pageButtons.forEach((btn) => {
    btn.classList.toggle('active', parseInt(btn.dataset.page) === currentPage);
  });
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled =
    currentPage === Math.ceil(profiles.length / profilesPerPage);
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayProfiles(currentPage);
    updatePagination();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < Math.ceil(profiles.length / profilesPerPage)) {
    currentPage++;
    displayProfiles(currentPage);
    updatePagination();
  }
});

pageButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentPage = parseInt(btn.dataset.page);
    displayProfiles(currentPage);
    updatePagination();
  });
});

// Initial display
displayProfiles(currentPage);
updatePagination();
