import { Router } from 'express';
import apiRoutes = require('./api');
import playRoutes = require('./play-routes');

const router: Router = Router();

router.use('/', playRoutes);
router.use('/api', apiRoutes);

export default router;
