import axios from 'axios';

export default function fetchImages(searchText) {
  const options = {
    params: {
      key: '48865963-fbfcf9b8c01c5dc3c8a4e0c4b',
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  return axios.get('https://pixabay.com/api/', options);
}