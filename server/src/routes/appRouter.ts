import express from "express";
import {
  getAllProducts,
  getFilteredProducts,
  getSingleProduct,
  placeorder
} from "../controller/appController";

const routes = express.Router();

routes.get("/getAllPRoducts", getAllProducts);
routes.get("/getSingleProduct/:id", getSingleProduct);
routes.post("/placeorder", placeorder);

export default routes;