import React, { useState, useEffect } from 'react';
import { Alert, Camera } from '../../types';
import { updateAlert } from '../../services/alert';

interface AlertModalProps {
  camera: Camera;
  alerts: Alert[];
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ camera, alerts, onClose }) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const userId = localStorage.getItem('user');
  useEffect(() => {
    // Reset the selected alert when the modal is closed
    if (!selectedAlert) {
      setSelectedAlert(null);
    }
  }, [selectedAlert]);

  const handleAcknowledged = async (alert: Alert) => {
    // Update the alert as acknowledged
    await updateAlert(alert.id, { acknowledged: true }, userId as string);
    // Remove the acknowledged alert from the state
    setSelectedAlert(null);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xl w-full">
        <h2 className="text-lg font-medium mb-4">Alerts for {camera.name}</h2>
        {alerts.length === 0 ? (
          <p>No alerts for this camera.</p>
        ) : (
          <div className="overflow-auto" style={{ maxHeight: '300px' }}>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-2 mb-2 border-l-4 ${alert === selectedAlert ? 'border-red-600 bg-red-100' : 'border-gray-300'
                  }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <p className="text-sm">{alert.alertType} detected at {alert.detectedAt.toLocaleString()}</p>
                {alert.acknowledged && (
                  <p className="text-xs mt-1 text-gray-500">Acknowledged by {alert.acknowledgedBy?.username}</p>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Close
          </button>
          {selectedAlert && !selectedAlert.acknowledged && (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => handleAcknowledged(selectedAlert)}
            >
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
