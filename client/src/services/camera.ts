import axios from 'axios';
import { AlertType } from '../types'
import { CameraEventDetail, cameraEventSystem } from '../utils/eventSystem';

export async function simulateDetection(cameraId: string) {
  const randomInterval = Math.floor(Math.random() * 10000) + 5000;

  setTimeout(async () => {
    const eventType = Math.random() > 0.5 ? AlertType.MOTION : AlertType.SOUND;
    const detectedAt = new Date();

    const eventDetail: CameraEventDetail = {
      cameraId,
      eventType,
      detectedAt,
    };

    // Use the imported cameraEventSystem
    cameraEventSystem.dispatchEvent(new CustomEvent('cameraEvent', { detail: eventDetail }));

    // Send the event to the backend to log it in the database
    await axios.post('/api/alerts', {
      cameraId,
      alertType: eventType,
      detectedAt: detectedAt.toISOString(),
    });

    // Continue simulating events
    simulateDetection(cameraId);
  }, randomInterval);
}
