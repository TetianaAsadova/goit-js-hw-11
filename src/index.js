import Notiflix from 'notiflix';
import './css/styles.css';
import fetchPhotos from './fetchPhotos';

const ref = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('button[type="submit"]'),
  moreBtn: document.querySelector('button[type="button"]'),
};

let searchQuery = '';

ref.form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  searchQuery = e.currentTarget.elements.searchQuery.value;
  console.log(`searchQuery`, searchQuery);
  if (searchQuery !== '') {
    fetchPhotos(searchQuery).then((photos) => {
      ref.gallery.innerHTML = '';
      Notiflix.Notify.info(`"Hooray! We found ${photos.totalHits} images."`);
      console.log(`photos`, photos);
      console.log(`photos.hits`, photos.hits);
      viewImg(photos.hits);
    }).catch(error => {
      Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
      console.log(error);
    })     
  }  
});

function viewImg(photos) {
  const markup = photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return
    `<a class="gallery__item" href="${largeImageURL}">
    <div class="photo-card">
          <img
            src="${webformatURL}" 
            alt="${tags}" 
            width="30"
            high="20"
            loading="lazy">
          <div class="info">
            <p class="info-item">
              <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
              <b>Views ${views}</b>
            </p>
            <p class="info-item">
              <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads ${downloads}</b>
            </p>
          </div>
        </div>
        </a>`
  })
  .join('');
  ref.gallery.insertAdjacentHTML('beforeend', markup);
}
