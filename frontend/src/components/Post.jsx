const BASE_URL = 'http://localhost:8898/posts';

export const fetchFeed = async (page, size = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/feed?page=${page}&size=${size}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    console.error('Error fetching feed:', error);
    throw error;
  }
};

export const likePost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/like/${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json(); // Ensure response is handled properly
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const addComment = async (postId, text) => {
  try {
    const response = await fetch(`${BASE_URL}/comment/${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // Correct header for form data
      body: new URLSearchParams({ text }).toString(), // Format body as URLSearchParams
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json(); // Ensure response is handled properly
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
