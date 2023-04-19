import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, RequestHandler } from 'express';

export interface User {
  id: string | number;
  username: string;
  email: string;
  password: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

// Compare the given plaintext password with the stored hashed password
export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Hash the given plaintext password using bcrypt with a salt round of 5
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};

// Create a JWT token for the user, including user ID and username as the payload
export const createJWT = (user: User): string => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as Secret
  );
  return token;
};

// Middleware function to protect routes that require authentication
export const protect: RequestHandler = (req: AuthenticatedRequest, res, next) => {
  // Get the authorization header from the request
  const bearer = req.headers.authorization;

  // If the authorization header is not present, return an unauthorized error
  if (!bearer) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  // Extract the token from the authorization header
  const [, token] = bearer.split(' ');

  // If the token is not present, return an unauthorized error
  if (!token) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  try {
    // Verify the token using the secret key and add the decoded user to the request object
    const user = jwt.verify(token, process.env.JWT_SECRET as Secret) as User;
    req.user = user;
    // Proceed to the next middleware or route handler
    next();
  } catch (e) {
    // If an error occurs during token verification, return an unauthorized error
    console.error(e.message);
    res.status(401);
    res.json({ message: 'not valid token' });
    return;
  }
};
