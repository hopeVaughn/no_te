import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  getAllCameras,
  addCamera,
  getCameraById,
  updateCamera,
  deleteCamera,
  getAllAlerts,
  addAlert,
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
router.get('/alerts', getAllAlerts);
router.post('/alerts', addAlert);
router.get('/alerts/:id', getAlertById);
router.put('/alerts/:id/acknowledge', acknowledgeAlert);

export default router;
