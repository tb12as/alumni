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
});
