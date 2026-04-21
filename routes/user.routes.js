import express from 'express';  
import User from '../models/User.model.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email ,password} = req.body;
    console.log("name",name,"email",email,"password",password);
    if(!name || !email || !password){
        return res.status(400).json({ message: 'Name, email and password are required' });
    }
    const isUserExist = await User.find({email});
    if(isUserExist.length > 0){
        console.log("User already exists with email:", isUserExist);
        return res.status(400).json({ message: 'User already exists' });
    } 
    try {
        const savedUser = await User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

export default router;