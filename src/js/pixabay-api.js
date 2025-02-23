import axios from 'axios';

const API_KEY = '48865963-fbfcf9b8c01c5dc3c8a4e0c4b';
const BASE_URL = 'https://pixabay.com/api/';

export default async function fetchImages(searchText, page = 1) {
  const options = {
    params: {
      key: API_KEY,
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page,
    },
  };

  try {
    const response = await axios.get(BASE_URL, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}