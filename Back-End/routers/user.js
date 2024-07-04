import express from 'express' ;
const router = express.Router();
import signUp from '../controllers/signUp.js'
import home from '../controllers/home.js';
import { sendOtp } from '../controllers/otp.js';

router.get('/',home);
router.post('/signUp',signUp);
router.post('/sendOtp',sendOtp);




export default router;