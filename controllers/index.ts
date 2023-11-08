import { Router, Request, Response, NextFunction } from 'express';
import { default as apiRoutes } from './api';
import { default as playRoutes } from './play-routes';

const router: Router = Router();

// Setup Middleware
router.use('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('Request:', req.method, req.url);
  next();
});

// Logging
router.use('/api', (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Error Handling
router.use('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
