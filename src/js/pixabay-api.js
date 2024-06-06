import axios from 'axios';


export default async function searchPicture(keyword, page=1, per_page=15) {
    const API_KEY = '44204846-4ec433e2c1cc73895dee1a984';
    const API_URL = 'https://pixabay.com/api/';

    const response = await axios.get(API_URL, {
        params: {
            key: API_KEY,
            q: keyword,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: per_page,
            page: page
        }
    });

    return response.data;
}
