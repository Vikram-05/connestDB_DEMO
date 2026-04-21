import express from 'express';  
import {registerUser,getUsers,deleteUser,updateUser} from '../controllers/user.controller.js';


const router = express.Router();

router.post('/register',registerUser);
router.get('/',getUsers);
router.put('/:email',updateUser);
router.delete('/:email',deleteUser);

export default router;