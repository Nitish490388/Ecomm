import express from "express";
import {
  getAllProducts,
  getFilteredProducts,
  getSingleProduct
} from "../controller/appController";

const routes = express.Router();

routes.get("/getAllPRoducts", getAllProducts);
routes.get("/getSingleProduct/:id", getSingleProduct);

export default routes;