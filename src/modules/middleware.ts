import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};
