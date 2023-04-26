import React, { useEffect, useRef } from 'react';

interface CameraModalProps {
  videoUrl: string;
  onClose: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ videoUrl, onClose }) => {
  const outerDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === outerDivRef.current) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (outerDivRef.current) {
      outerDivRef.current.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (outerDivRef.current) {
        outerDivRef.current.removeEventListener('click', handleClickOutside);
      }
    };
  }, [onClose]);

  return (
    <div
      ref={outerDivRef}
      className="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="w-full h-full max-w-4xl max-h-screen bg-white rounded-xl p-4 flex justify-center items-center relative">
        <iframe
          className="w-full h-full border-none"
          src={videoUrl}
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
