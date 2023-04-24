import axios from 'axios';

export async function getAllCameras() {
  const response = await axios.get('/api/cameras?status=ONLINE');
  return response.data;
}
