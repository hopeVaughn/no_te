import axios from 'axios';
import apiClient from './apiClient';

export const getAllCameras = async (status?: string) => {
  const { data } = await apiClient.get('/cameras', {
    params: status ? { status } : {},
  });
  return data;
};


