import axios from 'axios';

const BASE_URL = 'http://localhost:8898/posts';

export const fetchFeed = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/feed`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching feed:', error);
    throw error;
  }
};
