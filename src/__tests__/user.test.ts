import { Request, Response } from 'express';
import prisma from '../db';
import { getAllUsers, getUserById } from '../handlers/user';

// Mock the Prisma client
jest.mock('../db', () => ({
  __esModule: true,
  default: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

const next = jest.fn();

describe('getAllUsers', () => {
  jest.spyOn(console, 'error').mockImplementation(() => { });

  const req = {} as Request;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const mockUsers = [{ id: 'testuser-id', username: 'testuser', password: 'password1', email: 'testuser@test.com', firstName: 'Test', lastName: 'User', role: 'OPERATOR', },];

    // Mock the Prisma client's `findMany` method to return the mock data
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    await getAllUsers(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should return empty array when no users found', async () => {
    // Mock the Prisma client's `findMany` method to return an empty array
    (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

    await getAllUsers(req, res, next);

    expect(res.json).toHaveBeenCalledWith([]);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error fetching users';
    (prisma.user.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await getAllUsers(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getUserById', () => {
  jest.spyOn(console, 'error').mockImplementation(() => { });

  const req = {
    params: {
      id: 'testuser-id',
    },
  } as unknown as Request;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the specified user', async () => {
    const mockUser = {
      id: 'testuser-id',
      username: 'testuser',
      password: 'password1',
      email: 'testuser@test.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'OPERATOR',
    };

    // Mock the Prisma client's `findUnique` method to return
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    await getUserById(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: 'testuser-id',
      },
    });
  });

  it('should handle invalid request data', async () => {
    const invalidReq = {
      params: {},
    } as Request;

    await getUserById(invalidReq, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid request data',
    });
  });
  it('should handle user not found', async () => {
    // Mock the Prisma client's findUnique method to return null
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    await getUserById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

});
