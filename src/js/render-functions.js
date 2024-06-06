import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


export function renderPictures(images) {
    const htmlFragment = document.createDocumentFragment();
    const gallery = document.querySelector('ul.gallery');

    images.hits.forEach(el => {
        htmlFragment.appendChild(createGalleryItem(el.webformatURL, el.largeImageURL, el.tags, el.likes, el.views, el.comments, el.downloads));
    });

    gallery.appendChild(htmlFragment);

    var lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionDelay: 250,
      captionsData: 'alt'
    });

    lightbox.refresh();
}

export function clearGallery() {
    const gallery = document.querySelector('ul.gallery');
    gallery.innerHTML = '';
}

function createGalleryItem(smallImg, largeImg, description, likes, views, comments, downloads) {
    const liElement = document.createElement('li');
    liElement.className = 'gallery-item';

    const divUp = document.createElement('div');
    divUp.className = 'gallery-div-up';

    const aElement = document.createElement('a');
    aElement.className = 'gallery-link';
    aElement.href = largeImg;

    const imgElement = document.createElement('img');
    imgElement.className = 'gallery-image';
    imgElement.src = smallImg;
    imgElement.alt = description;
    aElement.appendChild(imgElement);

    divUp.appendChild(aElement);

    const divBottom = document.createElement('div');
    divBottom.className = 'gallery-likes';
    divBottom.innerHTML = `
    <ul>
        <li>Likes<br><span class="counter">${likes}</span></li>
        <li>Views<br><span class="counter">${views}</span></li>
        <li>Comments<br><span class="counter">${comments}</span></li>
        <li>Downloads<br><span class="counter">${downloads}</span></li>
    </ul>
    `;

    liElement.appendChild(divUp);
    liElement.appendChild(divBottom);

    return liElement;
}
