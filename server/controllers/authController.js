const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All feilds Required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(200).json({
            message: "User Register Successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try{
            const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "All feilds are required"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User Not Found or invalid credentials"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );
    res.json({
        message: "Login Successfull",
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email
        },
    });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};