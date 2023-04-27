import React, { useEffect, useRef } from 'react';

// Defining the properties for the CameraModal component
interface CameraModalProps {
  videoUrl: string; // URL of the video to be displayed
  onClose: () => void; // Function to close the modal
}

// Definition of the CameraModal component
const CameraModal: React.FC<CameraModalProps> = ({ videoUrl, onClose }) => {
  const outerDivRef = useRef<HTMLDivElement>(null); // Reference to the outermost div to detect clicks outside the modal

  useEffect(() => {
    // Function to handle the 'Escape' key press
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Function to handle clicks outside the modal
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === outerDivRef.current) {
        onClose();
      }
    };

    // Add event listeners for key presses and mouse clicks
    window.addEventListener('keydown', handleKeyDown);
    if (outerDivRef.current) {
      outerDivRef.current.addEventListener('click', handleClickOutside);
    }

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (outerDivRef.current) {
        outerDivRef.current.removeEventListener('click', handleClickOutside);
      }
    };
  }, [onClose]); // Re-run the effect when onClose changes

  return (
    <div
      ref={outerDivRef}
      className="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="w-full h-full max-w-4xl max-h-screen bg-white rounded-xl p-4 flex justify-center items-center relative">
        <iframe
          className="w-full h-full border-none"
          src={`${videoUrl}?autoplay=1`}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CameraModal;
