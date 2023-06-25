import { Router } from "express";
import { logout } from '../controllers/blogs.js';

const router = Router();
router.route('/logout').post(logout)
export default router;