
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("access_token");
  // Prepend API_BASE_URL if url is relative
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  return fetch(fullUrl, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
