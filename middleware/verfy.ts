import type { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const verifyToken = (req: Request & { userId: string }, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jsonwebtoken.verify(token, JWT_SECRET);
  if (typeof decoded === "string") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.userId = decoded.userId;
  next();
};

export default verifyToken;