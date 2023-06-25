import { Router } from "express";
import { logout, profile } from '../controllers/blogs.js';

const router = Router();

router.route('/profile').get(profile);
router.route('/logout').post(logout)

export default router;