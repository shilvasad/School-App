import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const host = process.env.host;
const protocol = process.env.protocol;

// CORS middleware, allow all origins.
app.use(cors());

// Enable JSON body parsing.
app.use(express.json());

// Test route.
app.get("/", (req, res) => {
  res.send("API is running...");
});


// Connect database first 

connectDB()

// Starting server

app.listen(PORT, () => {
  console.log(`
    Server is running on PORT ${PORT}.
    Access the server on ${protocol}://${host}:${PORT}`);
});
