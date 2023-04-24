import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Add this line to allow sending cookies
});

export const getAllCameras = async (status?: string) => {
  const { data } = await apiClient.get('/cameras', {
    params: status ? { status } : {},
  });
  return data;
};


