import fetchImages from './js/pixabay-api';
import { hideLoader, renderImages, showLoader, showMessage } from './js/render-functions';

const form = document.querySelector('form');
const input = document.querySelector('#search-text');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

let searchText = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSubmit(e) {
  e.preventDefault();
  searchText = input.value.trim();
  if (!searchText) return;

  input.value = '';
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMore();
  showLoader();

  try {
    const data = await fetchImages(searchText, currentPage);
    totalHits = data.totalHits;
    handleSearchResults(data.hits);
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function loadMoreImages() {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(searchText, currentPage);
    handleSearchResults(data.hits);
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

function handleSearchResults(images) {
  if (!images.length) {
    showMessage('Sorry, there are no images matching your search query.');
    hideLoadMore();
    return;
  }

  renderImages(images);
  if (gallery.children.length >= totalHits) {
    showMessage("We're sorry, but you've reached the end of search results.");
    hideLoadMore();
  } else {
    showLoadMore();
    smoothScroll();
  }
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMore() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMore() {
  loadMoreBtn.classList.add('is-hidden');
}

function smoothScroll() {
  const { height } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}