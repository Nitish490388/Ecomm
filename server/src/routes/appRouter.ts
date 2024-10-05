import express from "express";
import {
  getAllProducts,
  getFilteredProducts,
  getSingleProduct,
  getUserDetails,
  placeorder,
  getMyOrders,
  cancelOrder
} from "../controller/appController";
import verifyToken from "../middlewares/verifyUser";

const routes = express.Router();

routes.get("/getUser", verifyToken, getUserDetails);

routes.get("/getMyOrders", verifyToken, getMyOrders);
routes.get("/getAllPRoducts", getAllProducts);
routes.get("/getSingleProduct/:id", getSingleProduct);
routes.post("/placeorder", verifyToken, placeorder);
routes.post("/cancelOrder/:id",  cancelOrder);

export default routes;