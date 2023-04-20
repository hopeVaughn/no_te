import { Router } from "express";
import { ensureAdmin } from './modules/auth';
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
router.get('/users', ensureAdmin, getAllUsers);
router.get('/users/:id', ensureAdmin, getUserById);

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
router.get('/alerts', getAllAlerts);
router.post('/alerts', processCameraAlert);
router.get('/alerts/:id', getAlertById);
router.put('/alerts/:id/acknowledge', acknowledgeAlert);

export default router;
