import {Router} from "express";

const  router = Router();

import {
    register,
    login
} from '../controllers/blogs.js'
import { getPosts } from "../controllers/post.js";

router.route('/blogs').get(getPosts);
router.route('/register').post(register)
router.route('/login').post(login)

export default router;