import { Router } from "express";
import { protect } from './modules/auth';
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

const router = Router();

/*
 * Users
 */
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

/*
 * Cameras
 */
router.get('/cameras', getAllCameras);
router.post('/cameras', addCamera);
router.get('/cameras/:id', getCameraById);
router.put('/cameras/:id', updateCamera);
router.delete('/cameras/:id', deleteCamera);

/*
 * Alerts
 */
router.get('/alerts', protect, getAllAlerts);
router.post('/alerts', protect, processCameraAlert);
router.get('/alerts/:id', protect, getAlertById);
router.put('/alerts/:id/acknowledge', protect, acknowledgeAlert);

export default router;
