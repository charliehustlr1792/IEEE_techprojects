import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "./routes/user.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(function(req,res,next){
  res.header("Acess-Control-Allow-Origin","*");
  res.header("Acess-Control-Allow-Origin","Origin,X-Requested-With,Content-Type,Accept");
  next();
})
app.use(cookieParser());
app.use("/auth", UserRouter);
mongoose.connect("mongodb://127.0.0.1:27017/authentication");

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});
