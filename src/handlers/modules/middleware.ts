import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';

// `handleInputErrors` is a middleware function that checks for validation errors in the request.
export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
  // Call `validationResult` to get any validation errors from the request.
  const errors: Result<ValidationError> = validationResult(req);

  // If there are any validation errors, send a response with a 400 status code and include the errors.
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    // If there are no validation errors, call the `next` function to move to the next middleware or route handler.
    next();
  }
};
