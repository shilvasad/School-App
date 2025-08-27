import asyncHandler from "express-async-handler";
import User from "./user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";

/* 

    @desc   Register a new user
    @route  POST /api/users/register
    @access Public

*/

/* 
  @desc   Users profiles. 

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

const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  // Find the user using phone
  const user = await User.findOne({ phone });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid phone number or password.");
  }
});

/* 
  @desc   Get user profile
  @route  GET /api/users/profile
  @access Private
*/

const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/*
  @desc   Update user profile
  @route  PUT /api/users/profile
  @access Private
*/

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    // If new name provided
    user.name = req.body.name || user.name;

    // If new password is provided, hashed and update
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// =============== Admin Only ====================
/* 
  @desc   Get all users
  @route  GET /api/users
  @access Private/Admin
*/
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/* 
  @desc   Delete a user
  @route  DELETE /api/users/:id
  @access Private/Admin
*/

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/*
  @desc   Update a user
  @route  PUT /api/users/:id
  @access Private/Admin
*/
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
};
