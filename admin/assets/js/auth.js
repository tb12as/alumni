(function ($) {
  'use strict';

  const username = localStorage.getItem('admin-username');
  const name = localStorage.getItem('admin-name');
  if (!username || !name) {
    window.location = '/admin/index.html';
  }

  $('#loggedName').html(localStorage.getItem('admin-name'));

  $('#logout').on('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('admin-name');
    localStorage.removeItem('admin-username');
    window.location = '/admin/index.html';
  });
})(jQuery);
