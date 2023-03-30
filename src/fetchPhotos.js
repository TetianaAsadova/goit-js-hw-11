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
    // return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}${queryParams}`)
    //     .then((response) => {
    //         console.log(`response`, response);
    //         if (!response.ok) {
    //             throw new Error(response.status);                 
    //         }
    //         return response.json();    
    //     });

// export default class NewApiService {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetchArticles() {
//         const BASE_URL = 'https://pixabay.com/api/';
//         const API_KEY = '34821518-f662f92316867637fb490ee01';
//         const searchParams = {
//             key: API_KEY,
//             q: this.searchQuery,
//             image_type: 'photo',
//             orientation: 'horizontal',
//             safesearch: 'true',
//             page: this.page,
//             per_page: 40,
//         } 
//         const url = `${BASE_URL}?${searchParams}`;

//         fetch(url)
//             .then(r => r.json())
//             .then(data => {
//                 Notiflix.Notify.info(`"Hooray! We found ${data.totalHits} images."`);
//                 this.incrementPage();

//             });    
//     }

//     incrementPage() {
//         this.page += 1;
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
// }



