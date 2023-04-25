// Import necessary modules and functions
import { Router, Request, Response, NextFunction } from "express";
import { ensureAdmin } from './handlers/modules/auth';
import {
  getAllUsers,
  getUserById,
  getAllCameras,
  addCamera,
  getCameraById,
  updateCamera,
  deleteCamera,
  getAllAlerts,
  processCameraAlert,
  getAlertById,
  acknowledgeAlert
} from './handlers/index';
import { body, param } from 'express-validator';
import { handleInputErrors } from './handlers/modules/middleware';

// Create a new Express Router instance
const router = Router();

/*
 * Users routes
 */
// Route to get all users (accessible only to admin users)
router.get('/users', ensureAdmin, getAllUsers);

// Route to get a user by their ID (accessible only to admin users)
router.get('/users/:id', ensureAdmin, param('id').isUUID(), handleInputErrors, getUserById);

/*
 * Cameras routes
 */
// Route to get all cameras
router.get('/cameras', getAllCameras);

// Route to add a new camera (accessible only to admin users)
router.post('/cameras', ensureAdmin,
  body('name').isString(),
  body('location').isString(),
  body('videoURL').isString(),
  body('status').isIn(['ONLINE', 'OFFLINE']),
  handleInputErrors,
  addCamera);

// Route to get a camera by its ID
router.get('/cameras/:id', param('id').isUUID(), handleInputErrors, getCameraById);

// Route to update a camera by its ID (accessible only to admin users)
router.put('/cameras/:id', ensureAdmin,
  param('id').isUUID(),
  body('name').isString().optional(),
  body('location').isString().optional(),
  body('videoURL').isString().optional(),
  body('status').isIn(['ONLINE', 'OFFLINE']).optional(),
  handleInputErrors,
  updateCamera);

// Route to delete a camera by its ID (accessible only to admin users)
router.delete('/cameras/:id', ensureAdmin, param('id').isUUID(), handleInputErrors, deleteCamera);

/*
 * Alerts routes
 */
// Route to get all alerts
router.get('/alerts', getAllAlerts);

// Route to process a new camera alert
router.post('/alerts',
  body('cameraId').isUUID(),
  body('detectedAt').isISO8601(),
  body('alertType').isIn(['MOTION', 'SOUND']),
  handleInputErrors,
  processCameraAlert);

// Route to get an alert by its ID
router.get('/alerts/:id', param('id').isUUID(), handleInputErrors, getAlertById);

// Route to acknowledge an alert by its ID
router.put('/alerts/:id/acknowledge', param('id').isUUID(), handleInputErrors, acknowledgeAlert);

// Error handling middleware
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // If the error type is 'auth', respond with a 401 status and an 'Invalid User' message
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Invalid User' });
  }
  // If the error type is 'input', respond with a 400 status and an 'Invalid Input' message
  else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid Input' });
  }
  // For all other error types, respond with a 500 status and a 'Server Error' message
  else {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Export the router to be used in other parts of the application
export default router;
