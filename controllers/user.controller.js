import User from '../models/User.model.js';


export const registerUser = async (req, res) => {
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
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const {email} = req.params;
    try{
        const isUSerExist = await User.findOne({email});
        if(!isUSerExist){
            return res.status(404).json({message: 'User not found'});
        }
        const deletedUser =await User.deleteOne({email});
        res.status(200).json({message: 'User deleted successfully',deletedUser});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message }); 
    }
};  

export const updateUser = async (req, res) => {
    const {email} = req.params;
    const {name,password} = req.body;
    try{
        const isUSerExist = await User.findOne({email});
        if(!isUSerExist){
            return res.status(404).json({message: 'User not found'});
        }
        const updatedUser = await User.findOneAndUpdate({email}, {name,password}, {new: true});
        res.status(200).json({message: 'User updated successfully',updatedUser});
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message }); 
    }
};