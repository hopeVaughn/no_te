import { AlertType } from '../types'
// Defining an interface for camera event details
// This interface includes the id of the camera, the type of event that occurred, and the time the event was detected
export interface CameraEventDetail {
  cameraId: string;  // Unique identifier for the camera
  eventType: AlertType;  // Type of event that was detected (e.g., movement, noise)
  detectedAt: Date;  // The date and time the event was detected
}

// The CameraEventSystem class extends the built-in EventTarget interface
// This class is used to create a global event system for camera events
class CameraEventSystem extends EventTarget {
  // The instance property will hold the single instance of the CameraEventSystem class
  static instance: CameraEventSystem;

  constructor () {
    super();  // Call the constructor of the superclass (EventTarget)

    // Implementing the Singleton pattern
    // If an instance of the CameraEventSystem class doesn't already exist, create one
    if (!CameraEventSystem.instance) {
      CameraEventSystem.instance = this;
    }

    // Return the existing instance of the CameraEventSystem class
    // This ensures that there is only one instance of the CameraEventSystem class in the application
    return CameraEventSystem.instance;
  }
}

// Create a new instance of the CameraEventSystem class and export it
// This instance can be imported and used anywhere in the application to publish and subscribe to camera events
export const cameraEventSystem = new CameraEventSystem();
