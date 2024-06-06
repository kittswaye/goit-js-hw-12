import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import searchPicture from "./js/pixabay-api";
import { renderPictures, clearGallery } from "./js/render-functions";


function showError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight'
    });
}

document.getElementById('search-form').addEventListener('submit', function (event) {
    const errorMessage = 'Sorry, there are no images matching your search query. Please try again!';
    event.preventDefault();
    const searchQuery = document.getElementById('pixabay').value.trim();
    if (searchQuery === '') {
        showError(errorMessage);
    } else {
        document.getElementById('loading').style.display = 'block';
        clearGallery();
        searchPicture(searchQuery)
            .then((pictures) => {
                if (pictures.total !== 0) {
                    renderPictures(pictures);
                } else {
                    showError(errorMessage);
                }
                document.getElementById('loading').style.display = 'none';
            })
            .catch((error) => showError('Error'));
    }
});
