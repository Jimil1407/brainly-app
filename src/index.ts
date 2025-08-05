import express from "express";
import jsonwebtoken from "jsonwebtoken";
import connectDB ,{ users, links, contents, tags } from "./db";
import { z } from "zod";
import verifyToken from "../middleware/verfy";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  try {
    const signupSchema = z.object({
      username: z.string().min(3).max(20),
      password: z.string().min(8)
    });

    if(!await connectDB()) {
      return res.status(500).json({ message: "Error connecting to database" });
    }

    const { success, data, error } = signupSchema.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ message: "Error in inputs", error: JSON.stringify(error.issues) });
    }

    if (await users.findOne({ username: data.username })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new users({ username: data.username, password: await bcrypt.hash(data.password, 10) });
    await user.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    if(!await connectDB()) {
      return res.status(500).json({ message: "Error connecting to database" });
    }

    const { username, password } = req.body;

    const user = await users.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    const token = jsonwebtoken.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({ message: "User signed in successfully", token });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/content", verifyToken, async (req: any, res) => {
  try {
    if(!await connectDB()) {
      return res.status(500).json({ message: "Error connecting to database" });
    }

    const { link, type, title, tags } = req.body;
    const userId = req.userId; 
    
    const user = await users.findOne({ _id: new mongoose.Types.ObjectId(userId) });
    if(!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const content = new contents({ link, type, title, tags, userId });
    await content.save();
    res.status(200).json({ message: "Content created successfully" });
  } catch (error) {
    console.error("Content creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/content", verifyToken, async (req: any, res) => {
  try {
    if(!await connectDB()) {
      return res.status(500).json({ message: "Error connecting to database" });
    }

    const userId = req.userId;
    const userContents = await contents.find({ userId });
    res.status(200).json({ contents: userContents });
  } catch (error) {
    console.error("Get content error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/v1/content", verifyToken, async (req: any, res) => {

  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("http://localhost:3000");
});