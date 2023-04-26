import apiClient from './apiClient';
import { Alert } from '../types';

export const updateAlert = async (alertId: string, data: Partial<Alert>, userId: string) => {
  try {
    const response = await apiClient.put(`/api/alerts/${alertId}`, { ...data, userId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
