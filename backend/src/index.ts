import express from "express";
import jsonwebtoken from "jsonwebtoken";
import connectDB ,{ users, links, contents, tags } from "./db";
import { z } from "zod";
import verifyToken from "../middleware/verfy";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const app = express();

// CORS middleware
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
  try {
    if(!await connectDB()) {
      return res.status(500).json({ message: "Error connecting to database" });
    }

    const { id } = req.body;
    const userId = req.userId;
    const content = await contents.findOne({ _id: new mongoose.Types.ObjectId(id), userId });
    if(!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    await content.deleteOne();
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Delete content error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/content/share", verifyToken, async (req: any, res) => {
  try {
    if(!await connectDB()) {
      return res.status(500).json({ message: "Error connecting to database" });
    }

    const { id } = req.body;
    const userId = req.userId;
    
    const content = await contents.findOne({ _id: new mongoose.Types.ObjectId(id), userId });
    if(!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    let existingLink = await links.findOne({ contentId: content._id });
    if(existingLink) {
      return res.status(200).json({ 
        message: "Shareable link already exists", 
        shareableLink: `${req.protocol}://${req.get('host')}/api/v1/content/shared/${existingLink.hash}`,
        hash: existingLink.hash
      });
    }

    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const shareableLink = new links({ 
      hash, 
      contentId: content._id, 
      userId: content.userId 
    });
    await shareableLink.save();
    
    res.status(200).json({ 
      message: "Shareable link created successfully", 
      shareableLink: `${req.protocol}://${req.get('host')}/api/v1/content/shared/${hash}`,
      hash: hash
    });
  } catch (error) {
    console.error("Share content error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Public endpoint to access shared content by hash (no authentication required)
app.get("/api/v1/content/shared/:hash", async (req, res) => {
  try {
    if(!await connectDB()) {
      return res.status(500).json({ message: "Error connecting to database" });
    }

    const { hash } = req.params;
    
    // Find the shareable link by hash
    const shareableLink = await links.findOne({ hash }).populate('contentId').populate('userId', 'username');
    if(!shareableLink) {
      return res.status(404).json({ message: "Shared content not found" });
    }

    // Type assertion to handle populated fields
    const populatedLink = shareableLink as any;

    // Return the content details
    res.status(200).json({ 
      message: "Shared content retrieved successfully",
      content: {
        id: populatedLink.contentId._id,
        link: populatedLink.contentId.link,
        type: populatedLink.contentId.type,
        title: populatedLink.contentId.title,
        tags: populatedLink.contentId.tags,
        sharedBy: populatedLink.userId.username,
        sharedAt: populatedLink.createdAt
      }
    });
  } catch (error) {
    console.error("Get shared content error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 