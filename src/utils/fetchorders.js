import { getCachedToken } from './authApi';
const baseUrl = process.env.REACT_APP_API_URL;


async function ensureToken() {
  const token = await getCachedToken();
  if (!token) {
    console.warn("No token found. Please log in.");
    throw new Error("Authentication required");
  }
  return token;
}
async function getHeaders() {
  const token = await ensureToken();
  return {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json',
  };
}
async function fetchJson(url, options = {}) {
  try {
    const headers = await getHeaders();
    const cacheKey = new URL(url).toString();
    const response = await fetch(url, {
      ...options,
      headers,
    });
    const data = await response.json();
    console.log({ newData: data });
    if ('caches' in window) {
      const cache = await caches.open('api-cache');
      await cache.put(cacheKey, new Response(JSON.stringify(data)));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}
export const fetchOrders = async () => {
  try {
    const result = await fetchJson(`${baseUrl}orders/`);
    if (!Array.isArray(result)) {
      console.error('fetchOrders error: Result is not an array', result);
      throw new Error('API response is not an array');
    }
    return result;
  } catch (error) {
    console.error('fetchOrders error:', error);
    throw new Error(error.message ?? 'An error occurred while fetching orders');
  }
};