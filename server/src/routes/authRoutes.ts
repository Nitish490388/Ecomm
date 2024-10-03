import express from "express";
import {
  signinController,
  signupController,
  logoutController,
  createAdmin
} from "../controller/authController";

const route = express.Router();

route.post("/createAdmin", createAdmin);
route.post("/signin", signinController);
route.post("/signup", signupController);
route.post("/signout", logoutController);

export default route;