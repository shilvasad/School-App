import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

const authorize = (...roles)=>{
  return (req, res, next)=>{
    if(!roles.includes(req.user.role)){
      res.status(403)
      throw new Error(`Role ${req.user.role} is not authorized to access this route. `)
    }
    next()
  }
}

export { protect, authorize };
