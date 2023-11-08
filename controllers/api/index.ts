import { Router } from 'express';
import userRoutes from './user-routes.ts';

const router: Router = Router();

router.use('/users', userRoutes);

export default router;
