import express from 'express';
import { signIn, register } from '../controllers/users.js'


const router = express.Router();

router.post('/signIn', signIn);
router.post('/register', register);




export default router;