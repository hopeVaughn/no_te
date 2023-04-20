import { RequestHandler } from 'express';
import prisma from '../db';
import { AuthenticatedRequest } from '../modules/auth'; // Add this import
import { Alert, AlertType, Camera } from '@prisma/client';

interface CameraAlert {
  cameraId: Camera['id'];
  alertType: AlertType;
  detectedAt: Alert['detectedAt']
}

// This handler expects a POST request containing a JSON object with `cameraId`, `alertType`, and `detectedAt` properties.
export const processCameraAlert: RequestHandler = async (req, res) => {
  const { cameraId, alertType, detectedAt }: CameraAlert = req.body;

  // Validate the request data
  if (!cameraId || !alertType || !detectedAt) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Check if the camera exists
  const camera = await prisma.camera.findUnique({
    where: { id: cameraId },
  });

  if (!camera) {
    res.status(404);
    res.json({ message: 'Camera not found' });
    return;
  }

  // Create a new alert record in the database
  const newAlert = await prisma.alert.create({
    data: {
      cameraId,
      alertType,
      detectedAt: new Date(detectedAt),
      acknowledged: false,
    },
  });

  // Return the created alert record
  res.status(201);
  res.json(newAlert);
};


export const acknowledgeAlert: RequestHandler = async (req: AuthenticatedRequest, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Check if the alert exists
  const alert = await prisma.alert.findUnique({
    where: { id },
  });

  if (!alert) {
    res.status(404);
    res.json({ message: 'Alert not found' });
    return;
  }

  // Check if the alert has already been acknowledged
  if (alert.acknowledged) {
    res.status(400);
    res.json({ message: 'Alert already acknowledged' });
    return;
  }

  // Update the alert record in the database
  const updatedAlert = await prisma.alert.update({
    where: { id },
    data: {
      acknowledged: true,
      acknowledgedBy: { connect: { id: req.user.id } },
      acknowledgedAt: new Date(),
    },
  });

  // Return the updated alert record
  res.status(200);
  res.json(updatedAlert);
};

export const getAllAlerts: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const alerts = await prisma.alert.findMany({
      include: {
        camera: true,
        acknowledgedBy: true,
      },
    });

    res.status(200).json(alerts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching alerts' });
  }
};

export const getAlertById: RequestHandler = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Find the alert by its ID, and include the related camera and the user who acknowledged the alert (if any)
  const alert = await prisma.alert.findUnique({
    where: { id },
    include: {
      camera: true,
      acknowledgedBy: true,
    },
  });

  if (!alert) {
    res.status(404);
    res.json({ message: 'Alert not found' });
    return;
  }

  res.status(200);
  res.json(alert);
};