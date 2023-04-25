import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const authenticate = async (
  endpoint: string,
  data: Record<string, string>
) => {
  try {
    const response = await apiClient.post(endpoint, data);

    // Set the Authorization header with the token value from the response
    if (response.data.token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Unhandled error: ', error);
  }
};
