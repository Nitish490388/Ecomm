import express, { Request, Response } from 'express';
import authRouter from "./routes/authRoutes";
import morgan from "morgan";
import dotenv from "dotenv";
import adminRouter from "./routes/adminRoutes";
import appRouter from "./routes/appRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

import "./config/cloudinaryConfig";


dotenv.config({
  path: "./.env"
});
const PORT = process.env.PORT || 8001;

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || 'default_cookie_key'], // Secret keys for signing cookies
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: "lax",
    httpOnly: true,
  })
);

app.use(cookieParser());

app.use(cors({ origin: process.env.CORS_URL, credentials: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use("/api/v1/user", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/app", appRouter);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});