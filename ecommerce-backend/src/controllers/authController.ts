import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import emailService = require("../services/emailService");
import crypto from "crypto";

const hashCode = (code: string): string => {
  return crypto.createHash('sha256').update(code).digest('hex');
};

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "30d",
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      // Send welcome email asynchronously without blocking the response
      emailService.sendWelcomeEmail(email, name).catch(err => console.error("Welcome email error:", err));

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login user", error });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const {email} = req.body;

  if(!email){
    return res.status(400).json({message: "Email is required "});
  }

  const message = "If that email is registered, a reset code has been sent";
  
  const user = await User.findOne({email});

  if(!user){
    return res.json({message});
  }

  const code = crypto.randomInt(100000,1000000).toString();
  user.resetCode = hashCode(code);
  user.resetCodeExpires = new Date(Date.now() + 10 * 60 *1000);
  await user.save();
  try{
    await emailService.sendResetCodeEmail(email,code);

  }catch(error){
    console.error("Failed to send reset email:",error);
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();
    return res.status(500).json({message:"Could not send reset email, try again later"});
  }

  res.json({message})
};

export const resetPassword = async (req: Request, res: Response) => {
  const {email, code, newPassword} = req.body;

  if(!email || !code || !newPassword){
    return res.status(400).json({message: "Email, code and newPassword are requied"});
  }
  const user = await User.findOne({
    email,
    resetCode: hashCode(String(code)),
    resetCodeExpires: {$gt: new Date()},
  });

  if(!user){
    return res.status(400).json({message: "Invalid or expired code"});
  }

  user.password = await bcrypt.hash(newPassword ,10);
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;
  await user.save();

  res.json({message: "Password reset successful, you can now log in"})
}
