import axios from "axios";
export { fetchAnimal }


const API_URL = 'https://pixabay.com/api/'


axios.defaults.params = {
    page: 1,
    key: '38889888-f93d23a01a33db07a0e444aa5',
    image_type: 'photo',
    orientation: 'horizonal',
    safesearch: true,
    per_page: 40,

}



async function fetchAnimal(query, page, limit) {
    axios.defaults.params.q = query
    return await axios.get(API_URL).then((responce) => {
        return responce.data
    })
}
