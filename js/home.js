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
        let edited = [];
        if (localStorage.getItem('edited')) {
          edited = JSON.parse(localStorage.getItem('edited') || []);
        }
        // console.log(jsonResponse);
        profiles = jsonResponse;
        profiles.map((el) => {
          const edit = edited.find((eee) => eee.nim == el.nim);
          if (edit) {
            el.name = edit.name;
            el.alamat = edit.alamat;
            el.ttl = edit.ttl;
            if (edit.image) {
              el.image = edit.image;
            }
          }
        });
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
    let source = '';
    if (img && img.includes('data:image')) {
      source = img;
    } else {
      if (img && !img.includes('.')) {
        img += '.png';
      }
      source = `img/alumni/${img}`;
    }

    let angkatan = profile.angkatan + 3;
    card.className = 'profile-card';
    let html = `
            <img src="${source}" alt="${profile.name}">
            <p class="name">${profile.name}</p>
            <p class="nim">${profile.nim}</p>
            <p class="angkatan">Lulus tahun ${angkatan}</p>
        `;

    if (
      localStorage.getItem('loggedIn') == 'true' &&
      localStorage.getItem('nim') == profile.nim
    ) {
      html +=
        '<button class="edit-btn" data-id="' + profile.nim + '">Edit</button>';
    }
    card.innerHTML = html;
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

function convertImageToBase64(url, callback) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
  };
  img.src = url;
}

document.addEventListener('DOMContentLoaded', () => {
  profileGrid.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-btn')) {
      let edited = [];
      if (localStorage.getItem('edited')) {
        edited = JSON.parse(localStorage.getItem('edited') || []);
      }

      const profileId = event.target.dataset.id;
      const profile = profiles.find((p) => p.nim == profileId); // Assuming NIM is used as profile ID

      const edit = edited.find((eee) => eee.nim == profileId);

      if (profile) {
        document.getElementById('edit-name').value = profile.name;
        document.getElementById('edit-nim').value = profile.nim;

        if (edit) {
          document.getElementById('edit-alamat').value = edit.alamat;
          document.getElementById('edit-ttl').value = edit.ttl;
        }

        document.getElementById('edit-popup').style.display = 'flex';
      }
    }
  });

  document.getElementById('edit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('edit-name').value;
    const nim = document.getElementById('edit-nim').value;
    const ttl = document.getElementById('edit-ttl').value;
    const alamat = document.getElementById('edit-alamat').value;
    const foto = document.getElementById('edit-foto');
    const file = foto.files[0] || null;
    // console.log();

    let base64Image = '';
    let edited = [];
    if (localStorage.getItem('edited')) {
      edited = JSON.parse(localStorage.getItem('edited') || []);
    }

    const eee = edited.find((eee) => eee.nim == nim);
    const edit = {
      name: name,
      nim: nim,
      alamat: alamat,
      ttl: ttl,
    };
    if (eee) {
      edit.image = eee.image;
    }
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        base64Image = e.target.result; // Get the Base64 string
        edit.image = base64Image;
        const data = [edit];
        localStorage.setItem('edited', JSON.stringify(data));
      };

      reader.readAsDataURL(file); // Convert the image to a Base64 string
    } else {
      console.log('Please select a valid image file.');
      const data = [edit];
      localStorage.setItem('edited', JSON.stringify(data));
    }

    loadData();
  });

  document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('edit-popup').style.display = 'none';
  });

  document.getElementById('edit-form').addEventListener('submit', (event) => {
    event.preventDefault();
    // Handle form submission logic here
    document.getElementById('edit-popup').style.display = 'none';
  });
});

loadData();
