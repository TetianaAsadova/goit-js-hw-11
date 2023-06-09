import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
import fetchPhotos from './fetchPhotos';


const ref = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('button[type="submit"]'),
  // moreBtn: document.querySelector('button[type="button"]'),
  moreBtn: document.querySelector('.load-more__btn'),
  largePhoto: document.querySelector('.gallery .gallery__image'),
};

let pageNumber = 1;
let searchQuery = '';

ref.form.addEventListener('submit', onSearch.bind());
ref.moreBtn.addEventListener('click', onLoadMore.bind());

async function onSearch(e) {
  e.preventDefault();

  ref.gallery.innerHTML = '';
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  hiddenAgain();
  console.log(`searchQuery`, searchQuery);
  pageNumber = 1;

  try {
    if (searchQuery !== '') {
      const photos = await fetchPhotos(searchQuery, pageNumber);
      
      ref.gallery.innerHTML = '';
      if (photos.totalHits > 0) {
        Notiflix.Notify.info(`"Hooray! We found ${photos.totalHits} images."`);
      } else {
        Notiflix.Notify.info(`"Sorry, there are no images matching your search query. Please try again.`)
      }
      
      viewImg(photos.hits);
      
      toggleMoreBtn(photos.totalHits);
      
      pageNumber += 1;
    }
  } catch(error) {
      Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
      console.log(error);
    } 
};



function viewImg(photos) {
  ref.moreBtn.removeAttribute('disabled', true);
  const markup = photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery__item" href="${largeImageURL}">
          <div class="photo-card">
            <img class="gallery__image"
              src="${webformatURL}" 
              alt="${tags}" 
              loading="lazy">
            <div class="info">
              <p class="info-item">
                <b>Likes <br>${likes}</b>
              </p>
              <p class="info-item">
                <b>Views <br>${views}</b>
              </p>
              <p class="info-item">
                <b>Comments <br>${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads <br>${downloads}</b>
              </p>
            </div>
          </div>
        </a>`;
      }
    )
    .join('');
  ref.gallery.insertAdjacentHTML('beforeend', markup);
  var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, }).refresh(); 
};

function toggleMoreBtn(photosNumber) {
  if (photosNumber > 0) {
    ref.moreBtn.classList.add("visible"); 
    ref.moreBtn.classList.remove("load-more__btn"); 
  } 
  if ((photosNumber < 40) && (photosNumber > 0)){
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      hiddenAgain();
  }
};

async function onLoadMore() {
  // ref.moreBtn.classList.add('load-more__btn_loading');
  // ref.moreBtn.disabled = true;

  // ref.moreBtn.setAttribute('disabled', true);
    // ref.moreBtn.removeAttribute('disabled', true);
  try {
    const photos = await fetchPhotos(searchQuery, pageNumber);
    viewImg(photos.hits);
    pageNumber += 1;
    if ((photos.totalHits / 40) < pageNumber) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      hiddenAgain();
    }
    
  } catch (error) {
    console.log(error);
  }
};

function hiddenAgain() {
  ref.moreBtn.classList.remove("visible"); 
  ref.moreBtn.classList.add("load-more__btn"); 
}

// function onLargePhoto(e) {
//     e.preventDefault();
//    console.log(`e`, e);
//     const isGalleryItem = e.target.classList.contains('gallery__image');

//     if (!isGalleryItem) {
//       return;
//     }

//     var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, }).refresh(); 
// };