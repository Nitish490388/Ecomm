import { Request, Response } from "express"
import { success, error } from "../utils/responseWrapper"
import { signinInput, signupInput } from "../zod/types";
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import z from "zod";

const prisma = new PrismaClient();

const signupController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const validation = signupInput.safeParse(body);

    if (!validation.success) {
      return res.send(error(401, "invalid user inputs"));
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    // console.log(hashedPassword);


    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword
      }
    });

    const jwt_secret: string = process.env.JWT_ACCESS_SECRET || "";
    const token = jwt.sign({ id: user.id, email: user.email }, jwt_secret, {
      expiresIn: "3d",
    });
    console.log(body);
    return res.send(success(200, { token }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "error occured"));
  }
}

const signinController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const validation = signinInput.safeParse(body);
    if (!validation.success) {
      return res.send(error(401, "invalid inputs"));
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    });

    // console.log(existingUser);

    if (!existingUser) {
      return res.send(error(402, "email not found"));
    }
    const passwordMatched = await bcrypt.compare(body.password, existingUser.password);
    // console.log(passwordMatched);

    if (!passwordMatched) {
      return res.send(error(403, "invalid credentials"));
    }

    const jwt_secret: string = process.env.JWT_ACCESS_SECRET || "";
    const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, jwt_secret, {
      expiresIn: "3d"
    });
    return res.send(success(200, { token }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "error occured"));
  }
}

const logoutController = async (req: Request, res: Response) => {
  try {
    return res.send(success(200, { msg: "ok from logout" }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "error occured"));
  }
}

export {
  signinController,
  signupController,
  logoutController
}