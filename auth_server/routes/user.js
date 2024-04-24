import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "Registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "10h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ status: true, message: "Logged in Successfully!" });
});


router.post('/forgot-password',async (req,res)=>{
     const {email}=req.body
     try{
        const user=await User.findOne({email})
        if(!user){
            return res.json({message:"User not found"})
        }

        const token =jwt.sign({id:user._id},process.env.KEY,{expiresIn:'50m',})
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nilangshubhattacharyya1234@gmail.com',
            pass: 'naba uvxy psbv jujw'
        }
        });

        var mailOptions = {
        from: 'nilangshubhattacharyya1234@gmail.com',
        to: email,
        subject: 'Reset your password',
        text: `http://localhost:5173/resetpassword/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.json({message:"Error in sending mail"})
        } else {
            return res.json({status:true,message:"Email has been sent"});
        }
        });
      }
    catch(err){
        console.log(err)
    }
})
router.post('/reset-password/:token', async (req,res)=>{
    const{token}=req.params
    const{password}=req.body
    try{
        const decoded =await jwt.verify(token,process.env.KEY)
        const id =decoded.id
        const hashPassword=await bcrypt.hash(password,10)
        await User.findByIdAndUpdate({_id:id},{password:hashPassword})
        return res.json({status:true,message:"updated password"})
    }
    catch(err){
     return res.json("Invalid Token!")
    }
})
router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({status:true,message:"Logged Out!"})
})

export { router as UserRouter };