import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import mainAPIRouter from "./routes/index.js";
import {
  notFound,
  errorHandler,
} from "./middleware/errorHandlerMiddlerware.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const host = process.env.host;
const protocol = process.env.protocol;

app.use(cors());
app.use(express.json());
app.use("/api", mainAPIRouter);

connectDB();

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`
    Server is running on PORT ${PORT}.
    Access the server on ${protocol}://${host}:${PORT}`);
});
