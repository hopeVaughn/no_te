import React, { useEffect, useState } from 'react';
import { Camera as CameraType, AlertType } from '../../types';
import { cameraEventSystem, CameraEventDetail } from '../../utils/eventSystem';

interface CameraProps {
  camera: CameraType;
}

interface Alert {
  eventType: AlertType;
  detectedAt: Date;
}

const Camera: React.FC<CameraProps> = ({ camera }) => {
  const [latestAlert, setLatestAlert] = useState<Alert | null>(null);

  useEffect(() => {
    const handleCameraEvent: EventListenerOrEventListenerObject = (event) => {
      const customEvent = event as CustomEvent<CameraEventDetail>;
      if (customEvent.detail.cameraId === camera.id) {
        setLatestAlert({
          eventType: customEvent.detail.eventType,
          detectedAt: new Date(customEvent.detail.detectedAt),
        });
      }
    };

    cameraEventSystem.addEventListener('cameraEvent', handleCameraEvent);

    return () => {
      cameraEventSystem.removeEventListener('cameraEvent', handleCameraEvent);
    };
  }, [camera.id]);


  return (
    <div>
      <h2>{camera.name}</h2>
      <p>Location: {camera.location}</p>
      <p>Status: {camera.status}</p>
      <p>Video URL: {camera.videoUrl}</p>
      {latestAlert && (
        <div>
          <p>
            Latest Alert: {latestAlert.eventType} detected at{' '}
            {latestAlert.detectedAt.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Camera;