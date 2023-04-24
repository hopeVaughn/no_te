import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // Add this line to allow sending cookies
});

export const authenticate = async (
  endpoint: string,
  data: Record<string, string>
) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Unhandled error: ', error);

  }
};
