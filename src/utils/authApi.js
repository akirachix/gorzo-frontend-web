const baseUrl = process.env.REACT_APP_API_URL;
const TOKEN_CACHE_KEY = `${baseUrl}login/:auth`;


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
    const data = await response.json();
    const token = data.token;
    if (!token) throw new Error("No token received");
    localStorage.setItem('authToken', token);
    if ('caches' in window) {
      const cache = await caches.open('api-cache');
      const responseToCache = new Response(JSON.stringify({ token }), {
        headers: { 'Content-Type': 'application/json' },
      });
      await cache.put(TOKEN_CACHE_KEY, responseToCache);
    }
    return token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


export const getCachedToken = async () => {
  let token = localStorage.getItem('authToken');
  if (!token && 'caches' in window) {
    const cache = await caches.open('api-cache');
    const cachedResponse = await cache.match(TOKEN_CACHE_KEY);
    if (cachedResponse) {
      const data = await cachedResponse.json();
      token = data.token;
      if (token) {
        localStorage.setItem('authToken', token);
      }
    }
  }
  return token;
};


export const logout = async () => {
  localStorage.removeItem('authToken');
  if ('caches' in window) {
    const cache = await caches.open('api-cache');
    await cache.delete(TOKEN_CACHE_KEY);
  }
};

export const isLoggedIn = async () => {
  const token = await getCachedToken();
  return Boolean(token);
};






