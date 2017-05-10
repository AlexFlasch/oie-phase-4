import { Router } from 'express';

import users from './users';
import useCases from './useCases';

var router = Router();

// Add USERS Routes
router.use(users);
router.use(useCases);

export default router;
