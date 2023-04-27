import React, { useEffect, useState } from 'react';
import { Camera as CameraType, AlertType } from '../../types';
import { cameraEventSystem, CameraEventDetail } from '../../utils/eventSystem';
import CameraModal from '../Modal/CameraModal';
import { simulateDetection } from '../../services/camera';
import AlertModal from '../Modal/AlertModal';

// Define the types for the component props
interface CameraProps {
  camera: CameraType;
}

// Define the types for the alert state
interface Alert {
  eventType: AlertType;
  detectedAt: Date;
}

const Camera: React.FC<CameraProps> = ({ camera }) => {
  // Initialize state variables for latest alert, modal states and videoUrl
  const [latestAlert, setLatestAlert] = useState<Alert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>(camera.videoUrl);

  // UseEffect to listen for camera events
  useEffect(() => {
    // Event listener function
    const handleCameraEvent: EventListenerOrEventListenerObject = (event) => {
      const customEvent = event as CustomEvent<CameraEventDetail>;
      // Check if the event is for this camera
      if (customEvent.detail.cameraId === camera.id) {
        // Set latest alert state
        setLatestAlert({
          eventType: customEvent.detail.eventType,
          detectedAt: new Date(customEvent.detail.detectedAt),
        });
      }
    };

    // Add event listener
    cameraEventSystem.addEventListener('cameraEvent', handleCameraEvent);

    // Clean up event listener on unmount
    return () => {
      cameraEventSystem.removeEventListener('cameraEvent', handleCameraEvent);
    };
  }, [camera.id]); // Depend on camera id

  // UseEffect to simulate detection if the camera is online
  useEffect(() => {
    if (camera.status === "ONLINE") {
      simulateDetection(camera.id);
    }
  }, [camera.id, camera.status]); // Depend on camera id and status

  // Handlers for opening and closing modals
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

  // Render the component
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
      // Render modals based on modal state
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
