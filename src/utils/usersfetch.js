
import { getCachedToken } from "./authApi";
const habaURL = process.env.REACT_APP_API_URL;
async function getHeaders() {
  const token = await getCachedToken();
  if (!token) {
    throw new Error("Authentication required");
  }
  return {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json',
  };
}
async function fetchJson(url, options = {}) {
  try {
    const headers = await getHeaders();
    if ('caches' in window) {
      const cache = await caches.open('api-cache');
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        return await cachedResponse.json();
      }
    }
    const response = await fetch(url, {
      ...options,
      headers,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || response.statusText);
    }
    const data = await response.json();
    if ('caches' in window) {
      const cache = await caches.open('api-cache');
      await cache.put(url, new Response(JSON.stringify(data)));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}
export const fetchUsers = async () => {
  try {
    const result = await fetchJson(`${habaURL}users/`);
    if (!Array.isArray(result)) {
      console.error('fetchUsers error: Result is not an array', result);
      throw new Error('API response is not an array');
    }
    return result;
  } catch (error) {
    throw new Error(error.message ?? 'An error occurred while fetching users');
  }
};