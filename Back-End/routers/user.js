import express from 'express' ;
const router = express.Router();
import signUp from '../controllers/signUp.js'
import home from '../controllers/home.js';
import { sendOtp,otpVerified } from '../controllers/otp.js';
import resetPassword from '../controllers/resetPassword.js';
import login from '../controllers/login.js';
import jwtVerify from '../middleware/jwtVerify.js'
import { contentPost, deletePost, ownPosts } from '../controllers/posts.js';

router.get('/',home);
router.post('/signUp',signUp);
router.post('/sendOtp',sendOtp);
router.post('/Otpverified',otpVerified);
router.post('/resetPassword',resetPassword);
router.post('/login',login);
router.post('/contentPost',jwtVerify,contentPost);
router.delete('/deletePost/:id',jwtVerify,deletePost);


router.get('/myPosts',jwtVerify,ownPosts);









export default router;