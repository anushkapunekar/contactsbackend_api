const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
//@desc register the user
//@routes GET /api/user/register
//@access public

const registerUser = asyncHandler(async(req, res)=> {
    const {username, email , password } = req.body;
    if(!username || !email || ! password){
        res.status(400);
        throw new Error ("all fields are mandatory");
    }
    const userAvailable = await User.findOne({email});

    if (userAvailable){
        res.status(400);
        throw new Error("already exists");
    }
    // hash password
    const hashedPassword= await bcrypt.hash(password, 10);
    console.log("hashed password:", hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`user has been created ${user}`);
    if(user){
        res.status(201).json({_id:user.id , email: user.email});
    }else{
        res.status(400);
        throw new Error("user data not valid");
    }
    res.json({message:"register the user"});
});

//@desc login the user
//@routes GET /api/user/login
//@access public

const loginUser = asyncHandler(async(req, res)=> {
    const {email, password} =req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error(" all fields are mandatory");
    }
    const user = await User.findOne({email});
    // compare the password with hashed password
    if(user && (await bcrypt.compare(password , user.password))){
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email: user.email,
                id: user.id,
            },
        },
    process.env.ACCESS_SECRET_TOKEN,
    {expiresIn: "15m"}
     );
        res.status(200).json({accessToken});
    } else{
        res.status(401);
        throw new Error("invalid credentials");
    }
    // res.json({message:"login the user"}); no need 
});

//@desc current user information
//@routes GET /api/user/current
//@access private

const currentUser = asyncHandler(async(req, res)=> {
    res.json(req.user);
});
module.exports = {registerUser , loginUser , currentUser};