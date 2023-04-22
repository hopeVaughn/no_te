import { Request, Response } from 'express';
import prisma from '../db';
import { getCameraById } from '../handlers/camera';
import { CameraStatus } from '@prisma/client';

const next = jest.fn();

describe('getCameraById', () => {
  const req = {
    params: {
      id: 'valid-camera-id',
    },
  } as unknown as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 400 response with invalid request data', async () => {
    const invalidReq: Request = {
      params: {},
    } as Request;

    await getCameraById(invalidReq, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid request data' });
  });

  it('should return a 404 response with a non-existent camera ID', async () => {
    jest.spyOn(prisma.camera, 'findUnique').mockResolvedValue(null);

    await getCameraById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Camera not found' });
  });

  it('should return a 200 response with the camera object', async () => {
    const mockCamera = {
      id: 'valid-camera-id',
      name: 'Living Room Camera',
      location: 'Living Room',
      status: CameraStatus.ONLINE,
      videoUrl: 'http://example.com/live/living-room',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prisma.camera, 'findUnique').mockResolvedValue(mockCamera);

    const req = {
      params: {
        id: 'valid-camera-id',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getCameraById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCamera);
  })
});
