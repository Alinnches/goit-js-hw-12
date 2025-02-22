import fetchImages from './js/pixabay-api';
import { hideLoader, renderImages, showLoader, showMessage } from './js/render-functions';

const form = document.querySelector('form');
const input = document.querySelector('#search-text');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const searchText = input.value.trim();

  if (!searchText) return;

  input.value = '';

  clearGallery();
  showLoader();

  fetchImages(searchText)
    .then(data => handleSearchResults(data.data.hits))
    .catch(err => console.log(err));
}

function handleSearchResults(images) {
  if (!images || images.length === 0) {
    showMessage();
    hideLoader();
    return;
  }

  renderImages(images);
}

function clearGallery() {
  gallery.innerHTML = '';
}