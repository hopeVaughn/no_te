import apiClient from './apiClient';

// Gets all camera's for Camera list.
export const getAllCameras = async (status?: string) => {
  const params = status ? { status } : {};
  const { data } = await apiClient.get('/api/cameras', { params });
  return data;
};


