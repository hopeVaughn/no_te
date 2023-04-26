import React, { useEffect, useState } from 'react';
import { Camera as CameraType, AlertType } from '../../types';
import { cameraEventSystem, CameraEventDetail } from '../../utils/eventSystem';
import CameraModal from '../Modal/CameraModal';
import { simulateDetection } from '../../services/camera'; // Import the function

interface CameraProps {
  camera: CameraType;
}

interface Alert {
  eventType: AlertType;
  detectedAt: Date;
}

const Camera: React.FC<CameraProps> = ({ camera }) => {
  const [latestAlert, setLatestAlert] = useState<Alert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-hidden">
      <h2 className="text-lg font-medium mb-2">{camera.name}</h2>
      <p className="text-gray-500 mb-2">Location: {camera.location}</p>
      <p className="text-gray-500 mb-2">Status: {camera.status}</p>
      <button className="text-blue-500 hover:underline mb-2" onClick={handleOpenModal}>
        View Camera Feed
      </button>
      {latestAlert && (
        <div className="bg-red-100 text-red-700 p-2 rounded-md mb-2">
          <p className="text-sm">
            Latest Alert: {latestAlert.eventType} detected at{' '}
            {latestAlert.detectedAt.toLocaleString()}
          </p>
        </div>
      )}
      {isModalOpen && (
        <CameraModal videoUrl={videoUrl} onClose={handleCloseModal} />
      )}

    </div>
  );
};

export default Camera;





{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ }