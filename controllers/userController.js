const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(401);
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
        });
    }
    else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({ email });
    // compare password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.status(200).json({
            accessToken,
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { register,login,getCurrentUser };
