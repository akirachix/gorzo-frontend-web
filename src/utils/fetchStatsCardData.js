import { getCachedToken } from './authApi';
const habaURL = process.env.REACT_APP_API_URL;
function handleFetchError(error, fallback = []) {
  console.error('Fetch error:', error.message);
  return fallback;
}
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
    if ('caches' in window) {
      const cache = await caches.open('api-cache');
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        console.log('Returning cached response for:', url);
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
export const fetchVendors = async () => {
  try {
    const data = await fetchJson(`${habaURL}users/`);
    return data.filter(user => user.role === 'vendor');
  } catch (error) {
    return handleFetchError(error);
  }
};
export const fetchCustomers = async () => {
  try {
    const data = await fetchJson(`${habaURL}users/`);
    return data.filter(user => user.role === 'customer');
  } catch (error) {
    return handleFetchError(error);
  }
};
export const fetchLiveGroups = async () => {
  try {
    return await fetchJson(`${habaURL}LiveGroup/`);
  } catch (error) {
    return handleFetchError(error);
  }
};









