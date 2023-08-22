// Описаний в документації
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix'
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchAnimal } from "./get_api";
const galleryEl = document.querySelector('.gallery')
const btn = document.querySelector('.load-more')
let query = ''
let page = 1;



function makeDisableDate() {
    btn.classList.replace('.load-more');
};


const searchForm = document.querySelector('.search-form')


searchForm.addEventListener('submit', handleSubmit)

async function handleSubmit(evt) {
    evt.preventDefault()
    query = document.querySelector('.query').value
    const { hits } = await fetchAnimal(query).catch((error) => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))

    createMarcup(hits);
    searchForm.reset()

}



function createMarcup(data) {
    const markup = data.reduce((acc, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        acc += `<div class="photo-card">
        <a class="galleryLink" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />  </a>
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
          
        </div>`;
        return acc;
    }, '');

    galleryEl.innerHTML = markup

    let lightbox = new SimpleLightbox(galleryEl, { captions: true, captionSelector: 'img', captionsData: 'alt', captionDelay: 250 });

}

