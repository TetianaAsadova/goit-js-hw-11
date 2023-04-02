import axios from "axios";

export default async function fetchPhotos(searchQuery, pageNumber) {
    const BASE_URL = 'https://pixabay.com/api/';
    
    const API_KEY = '34821518-f662f92316867637fb490ee01';
    
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pageNumber,
        per_page: 40,
    });
    try {
        const data = await axios.get(`${BASE_URL}?${searchParams}`).then(({ data }) => data);
        console.log(`data`, data);
        return data;
    } catch (error) {
        console.error(error);
    }
}
