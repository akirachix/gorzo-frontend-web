
const baseUrl= process.env.REACT_APP_API_URL



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