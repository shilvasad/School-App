import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";



// Helper function to generate token 
const generateToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

/* 

    @desc   Register a new user
    @route  POST /api/users/register
    @access Public

*/

const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password, role } = req.body;
  // Check users with duplicate numbers.
  const userExists = await User.findOne({ phone });
  if (userExists) {
    res.status(400);
    throw new Error(`User with this ${phone} number already exists.`);
  }
  // Salting the password then hashing for more encryption.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create  the user to  the database.
  const user = await User.create({
    name,
    phone,
    password: hashedPassword,
    role: role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});





/*
@desc   Authenticate user & get token. 
@route  POST /api/users/login
@access Public

*/

const loginUser = asyncHandler(async(req, res)=>{
  const {phone, password}=req.body

  // Find the user using phone 
  const user = await  User.findOne({phone})

  if(user &&(await bcrypt.compare(password, user.password))){
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id)
    })
  }
  else{
    res.status(401)
    throw new Error('Invalid phone number or password.')
  }
})



export { registerUser, loginUser };
