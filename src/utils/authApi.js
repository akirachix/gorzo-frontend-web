
const baseUrl= process.env.REACT_APP_API_URL
const setToken = (token) => {
  localStorage.setItem('authToken', token);
};
const getToken = () => {
  return localStorage.getItem('authToken');
};
const clearToken = () => {
  localStorage.removeItem('authToken');
};
async function ensureToken() {
  const token = getToken();
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
    let response;
    if ('caches' in window) {
      const cache = await caches.open('api-cache');
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        console.log('Returning cached response for:', url);
        return await cachedResponse.json();
      }
    }
    response = await fetch(url, {
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
console.log('Login request URL:', `${baseUrl}login/`);
export const login = async (phone, pin) => {
  const url = `${baseUrl}login/`; 

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone_number: phone, pin }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};