import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import searchPicture from "./js/pixabay-api";
import { renderPictures, clearGallery } from "./js/render-functions";


const errorMessage = 'Sorry, there are no images matching your search query. Please try again!';
let page = 1;
let per_page = 15;
let searchQuery = '';

function showError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight'
    });
}

function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

function showElement(id) {
    document.getElementById(id).style.display = 'block';
}

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    hideElement('loadmore');
    searchQuery = document.getElementById('pixabay').value.trim();
    page = 1;

    if (searchQuery === '') {
        showError(errorMessage);
    } else {
        showElement('loading');
        clearGallery();
        try {
            const pictures = await searchPicture(searchQuery, page, per_page);
            if (pictures.total !== 0) {
                renderPictures(pictures);
                showElement('loadmore');
            } else {
                showError(errorMessage);
            }
            hideElement('loading');
        } catch (error) {
            showError('Error')
        }
    }
});

document.getElementById('loadmore').addEventListener('click', async () => {
    document.getElementById('loading').style.display = 'block';
    page += 1;

    function scroll() {
        let card = document.querySelector(".gallery-item");
        let rect = card.getBoundingClientRect();
        window.scrollBy({ left: 0, top: rect.height * 3.5, behavior: "smooth" });
    }

    try {
        const pictures = await searchPicture(searchQuery, page, per_page);
        renderPictures(pictures);
        scroll();
        if (page * per_page >= pictures.totalHits) {
            hideElement('loadmore');
            showError("We're sorry, but you've reached the end of search results.");
        }
        hideElement('loading');
    } catch (error) {
        showError('Error')
    }
});
