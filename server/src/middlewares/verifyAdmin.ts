import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
interface JwtPayload {
  id: string; // User ID
  email: string; // User email (optional, add if needed)
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided, unauthorized." });
  }
 

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
    
    const userId = decoded.id;

    const userData = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });
    if(!userData) {
        return res.send(error(404, "user not found"));
    }
    if(userData.role !== "ADMIN") {
        return res.send(error(404, "Unautherized access"));
    }

    req.userId = userData.id; 
    next();
    
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Failed to authenticate token." });
  }
};

export default verifyToken;
