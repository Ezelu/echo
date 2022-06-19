import express from 'express';
import { createPost, getPosts, updatePost, deletePost, likePost } from '../controllers/posts.js'


const router = express.Router();

// CREATE POST ROUTES (CRUD)
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

// OTHER ROUTES
router.patch('/:id/likePost', likePost); //Like Post






export default router;