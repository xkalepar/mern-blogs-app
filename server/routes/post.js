import {Router} from "express";

const  router = Router();

import {createPost, deletePost, getPost, updatePost} from '../controllers/post.js';

router.route('/post').post(createPost);
router.route('/post/:id').get(getPost).patch(updatePost).delete(deletePost)

export default router;