import { Router, Request, Response, NextFunction } from 'express';
import { default as apiRoutes } from './api';
import { default as playRoutes } from './play-routes';

const router: Router = Router();

// Logging middleware
const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request:', req.method, req.url);
  next();
};

// Authentication middleware
const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Error handling middleware
const errorHandlingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Setup Middleware
router.use('/', loggingMiddleware);
router.use('/api', authenticationMiddleware);
router.use('/', errorHandlingMiddleware);

export default router;
