import axios from 'axios';

const API_KEY = '18773042-c85a376c8239f0d185771db9c';
const baseUrl = 'https://pixabay.com/api/';

const fetchImages = async ({ query = '', page = 1, pageSize = 12 }) => {
  return await axios
    .get(
      `${baseUrl}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
    )
    .then(response => response.data.hits);
};

export default fetchImages;
