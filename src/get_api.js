import axios from "axios";
export { fetchAnimal }


axios.defaults.baseURL = 'https://pixabay.com/api/'

axios.defaults.params = {
    page: 1,
    key: '38889888-f93d23a01a33db07a0e444aa5',
    image_type: 'photo',
    orientation: 'horizonal',
    safesearch: true,
    per_page: 40,


}



async function fetchAnimal(query, page) {
    axios.defaults.params.q = query
    axios.defaults.params.page = page
    const { data } = await axios.get('')
    return data
}
