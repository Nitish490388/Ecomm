import express from "express";
import {
  getAllProducts,
  getFilteredProducts,
  getSingleProduct,
  getUserDetails,
  placeorder
} from "../controller/appController";
import verifyToken from "../middlewares/verifyUser";

const routes = express.Router();

routes.get("/getUser", verifyToken, getUserDetails);
routes.get("/getAllPRoducts", getAllProducts);
routes.get("/getSingleProduct/:id", getSingleProduct);
routes.post("/placeorder", verifyToken, placeorder);

export default routes;