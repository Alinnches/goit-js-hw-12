import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '/css/simple-lightbox.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '/css/izitoast.css';
import iconNoResults from '../img/error-icon.svg';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

export function renderImages(images) {
  const galleryHtml = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
      `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <figure class="thumb-container">
            <img class="thumb-image" src="${webformatURL}" alt="${tags}" />
            <figcaption class="thumb-data">
              <dl class="thumb-data-list">
                <div class="thumb-data-item">
                  <dt>Likes</dt><dd>${likes}</dd>
                </div>
                <div class="thumb-data-item">
                  <dt>Views</dt><dd>${views}</dd>
                </div>
                <div class="thumb-data-item">
                  <dt>Comments</dt><dd>${comments}</dd>
                </div>
                <div class="thumb-data-item">
                  <dt>Downloads</dt><dd>${downloads}</dd>
                </div>
              </dl>
            </figcaption>
          </figure>
        </a>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryHtml);
  lightbox.refresh();
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showMessage(message) {
  iziToast.show({
    position: 'topRight',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    messageSize: '16px',
    messageLineHeight: '24px',
    messageColor: 'white',
    iconUrl: iconNoResults,
    maxWidth: '432px',
    backgroundColor: '#EF4040',
  });
}
