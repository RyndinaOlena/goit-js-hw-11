// Описаний в документації
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix'
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchAnimal } from "./get_api";
import { createMarcup } from './marcup';

const galleryEl = document.querySelector('.gallery')

const lightbox = new SimpleLightbox('.galleryLink', { captions: true, captionSelector: 'img', captionsData: 'alt', captionDelay: 250 });


const btn = document.querySelector('.load-more')
let query = ''
let page = 1;


const searchForm = document.querySelector('.search-form')


searchForm.addEventListener('submit', handleSubmit)


async function handleSubmit(evt) {

    try {
        evt.preventDefault()
        query = evt.target.elements.searchQuery.value.trim()

        if (query === '') {
            return
        }
        btn.classList.add('is-hidden')
        page = 1;

        const { hits, totalHits } = await fetchAnimal(query)
        Notiflix.Notify.info(`"Hooray! We found ${totalHits} images."

`)
        if (hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return
        }
        if (hits.length === 40 && totalHits > 40) {
            btn.classList.remove('is-hidden')
        }
        clearGallary()
        createMarcup(hits, galleryEl);
        lightbox.refresh()
        searchForm.reset()
    } catch (error) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }

}


btn.addEventListener('click', getMore)
async function getMore(evt) {
    try {
        page += 1
        const { hits, totalHits } = await fetchAnimal(query, page)
        createMarcup(hits, galleryEl)
        lightbox.refresh()
        onScroll()
        if (page * 40 >= totalHits) {
            btn.classList.add('is-hidden')
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
        }
    } catch (error) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
}
function clearGallary() {
    galleryEl.innerHTML = ''
}

function onScroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}
