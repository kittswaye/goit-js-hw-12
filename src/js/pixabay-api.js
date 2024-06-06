export default function searchPicture(keyword) {
    const API_KEY = '44204846-4ec433e2c1cc73895dee1a984';
    const API_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: keyword,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    });

    return fetch(`${API_URL}?${searchParams}`
    )
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}
