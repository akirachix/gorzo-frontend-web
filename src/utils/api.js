
const baseUrl = process.env.REACT_APP_BASE_URL;
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}/users`);
    if (!response.ok) {
      throw new Error(`Failed to fetch users ${response.status}`);
    }
    const result = await response.json();
    return result?.users;
  } catch (error) {
 throw new Error(error.message ?? "An error Ocuured I dont know why ")
  }
};
