import express from 'express';
import { createPost, getPosts, updatePost, deletePost, likePost } from '../controllers/posts.js'
import authMiddleWare from '../middleware/authMIddleware.js';

const router = express.Router();

// CREATE POST ROUTES (CRUD)
router.get('/', getPosts);
router.post('/', authMiddleWare, createPost);
router.patch('/:id', authMiddleWare, updatePost);
router.delete('/:id', authMiddleWare, deletePost);

// OTHER ROUTES
router.patch('/:id/likePost', authMiddleWare, likePost); //Like Post






export default router;







