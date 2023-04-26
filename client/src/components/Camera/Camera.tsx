import React, { useEffect, useState } from 'react';
import { Camera as CameraType, AlertType } from '../../types';
import { cameraEventSystem, CameraEventDetail } from '../../utils/eventSystem';
import CameraModal from '../Modal/CameraModal';
import { simulateDetection } from '../../services/camera';
import AlertModal from '../Modal/AlertModal';

interface CameraProps {
  camera: CameraType;
}

interface Alert {
  eventType: AlertType;
  detectedAt: Date;
}

const Camera: React.FC<CameraProps> = ({ camera }) => {
  const [latestAlert, setLatestAlert] = useState<Alert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>(camera.videoUrl);

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

  useEffect(() => {
    if (camera.status === "ONLINE") {
      simulateDetection(camera.id);
    }
  }, [camera.id, camera.status]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewAlerts = () => {
    setIsAlertModalOpen(true);
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-hidden">
      <h2 className="text-lg font-medium mb-2">{camera.name}</h2>
      <p className="text-gray-500 mb-2">Location: {camera.location}</p>
      <p className="text-gray-500 mb-2">Status: {camera.status}</p>
      <div className="mb-2">
        <button className="text-blue-500 hover:underline mr-4" onClick={handleOpenModal}>
          View Camera Feed
        </button>
        {latestAlert && (
          <button className="text-red-500 hover:underline" onClick={handleViewAlerts}>
            View Alerts
          </button>
        )}
      </div>
      {isModalOpen && (
        <CameraModal videoUrl={videoUrl} onClose={handleCloseModal} />
      )}
      {isAlertModalOpen && (
        <AlertModal camera={camera} onClose={handleCloseAlertModal} />
      )}
    </div>
  );

};

export default Camera
