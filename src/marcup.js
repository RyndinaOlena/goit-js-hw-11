export function createMarcup(data, galleryEl) {
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

    galleryEl.insertAdjacentHTML('beforeend', markup)

}