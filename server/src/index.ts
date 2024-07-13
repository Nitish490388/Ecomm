import express, { Request, Response } from 'express';
import authRouter from "./routes/authRoutes";
import morgan from "morgan";
import dotenv from "dotenv";


dotenv.config({
  path: "./.env"
});
const PORT = process.env.PORT || 8001;

const app = express();
const port = process.env.PORT || 3000;

// middlewares
// app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use("/api/v1/user", authRouter);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});