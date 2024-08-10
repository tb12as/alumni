const profileGrid = document.getElementById('profile-grid');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageButtons = document.querySelectorAll('.page-btn');

let profilesPerPage = 16;
let currentPage = 1;
let profiles = [];
let searchVal = '';

function loadData() {
  fetch('/database/alumni-2020.json', {
    method: 'GET',
  })
    .then((response) => {
      response.json().then((jsonResponse) => {
        // console.log(jsonResponse);
        profiles = jsonResponse;
        if (searchVal && searchVal !== '') {
          profiles = profiles.filter((el) => {
            const c1 = el.name.toLocaleLowerCase().includes(searchVal);
            const nim = el.nim.toString().includes(searchVal);
            const year = el.angkatan + 3 == searchVal;

            return c1 || nim || year;
          });
        }
        displayProfiles(currentPage);
        updatePagination();
      });
      // assuming your json object is wrapped in an array
      response.json().then((i) => i.forEach((i) => console.log(i.name)));
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

const form = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchQuery');
form.onsubmit = (e) => {
  e.preventDefault();
  const val = searchInput.value;
  searchVal = val;

  loadData();
};

function displayProfiles(page) {
  const startIndex = (page - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const pageProfiles = profiles.slice(startIndex, endIndex);

  profileGrid.innerHTML = '';

  pageProfiles.forEach((profile) => {
    const card = document.createElement('div');
    let img = profile.image;
    if (!img.includes('.')) {
      img += '.png';
    }

    let angkatan = profile.angkatan + 3;
    card.className = 'profile-card';
    card.innerHTML = `
            <img src="img/alumni/${img}" alt="${profile.name}">
            <p class="name">${profile.name}</p>
            <p class="nim">${profile.nim}</p>
            <p class="angkatan">Lulus tahun ${angkatan}</p>
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

loadData();
