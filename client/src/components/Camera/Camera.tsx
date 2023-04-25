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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-hidden">
      <h2 className="text-lg font-medium mb-2">{camera.name}</h2>
      <p className="text-gray-500 mb-2">Location: {camera.location}</p>
      <p className="text-gray-500 mb-2">Status: {camera.status}</p>
      <p className="text-gray-500 mb-2">Video URL: {camera.videoUrl}</p>
      {latestAlert && (
        <div className="bg-red-100 text-red-700 p-2 rounded-md mb-2">
          <p className="text-sm">
            Latest Alert: {latestAlert.eventType} detected at{' '}
            {latestAlert.detectedAt.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Camera;