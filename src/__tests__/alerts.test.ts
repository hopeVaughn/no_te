import request from 'supertest';
import { Request, Response, NextFunction } from 'express';
import prisma from '../db';
import { processCameraAlert } from '../handlers/alerts';
import { CameraAlert } from '../handlers/alerts'
import { CameraStatus } from '@prisma/client';

// Tests for the processCameraAlert handler function
describe('processCameraAlert', () => {
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  // Reset all mocked functions after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test invalid request data
  it('should return a 400 response with invalid request data', async () => {
    const invalidReq: Request = {
      body: {},
    } as Request;
    const invalidRes: Response = {
      ...res,
    } as Response;

    // Call the processCameraAlert function with invalid request data
    await processCameraAlert(invalidReq, invalidRes, next);

    // Check that the response has status 400 and the correct error message
    expect(invalidRes.status).toHaveBeenCalledWith(400);
    expect(invalidRes.json).toHaveBeenCalledWith({ message: 'Invalid request data' });
  });

  // Test non-existent camera ID
  it('should return a 404 response with a non-existent camera ID', async () => {
    const invalidCameraId: CameraAlert = {
      cameraId: 'non-existent-camera-id',
      alertType: 'MOTION',
      detectedAt: new Date(),
    };
    const invalidReq: Request = {
      body: invalidCameraId,
    } as Request;
    const invalidRes: Response = {
      ...res,
    } as Response;

    // Mock the camera findUnique function to return null
    jest.spyOn(prisma.camera, 'findUnique').mockResolvedValue(null);

    // Call the processCameraAlert function with non-existent camera ID
    await processCameraAlert(invalidReq, invalidRes, next);

    // Check that the response has status 404 and the correct error message
    expect(invalidRes.status).toHaveBeenCalledWith(404);
    expect(invalidRes.json).toHaveBeenCalledWith({ message: 'Camera not found' });
  });

  // Test creating a new alert
  it('should create a new alert and return it', async () => {
    const validCameraId: CameraAlert = {
      cameraId: 'valid-camera-id',
      alertType: 'MOTION',
      detectedAt: new Date(),
    };
    const validReq: Request = {
      body: validCameraId,
    } as Request;
    const validRes: Response = {
      ...res,
    } as Response;

    // Mock the camera findUnique function to return a valid camera
    jest.spyOn(prisma.camera, 'findUnique').mockResolvedValue({
      id: 'valid-camera-id',
      name: 'Living Room Camera',
      location: 'Living Room',
      status: CameraStatus.ONLINE,
      videoUrl: 'http://example.com/live/living-room',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Mock the alert create function to return a valid alert
    jest.spyOn(prisma.alert, 'create').mockResolvedValue({
      id: 'valid-alert-id',
      ...validCameraId,
      acknowledged: false,
      userId: null,
      acknowledgedAt: null,
    });

    // Call the processCameraAlert function with valid camera ID
    await processCameraAlert(validReq, validRes, next);

    expect(validRes.status).toHaveBeenCalledWith(201);
    expect(validRes.json).toHaveBeenCalledWith({
      id: 'valid-alert-id',
      ...validCameraId,
      acknowledged: false,
      acknowledgedAt: null,
      userId: null
    });
  });
});