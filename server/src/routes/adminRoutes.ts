import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllOrders,
  markDelivered
} from "../controller/adminController";

const router = express.Router();

router.post("/addProduct", addProduct);
router.post("/markDelivered/:id", markDelivered);
router.post("/updateProduct", updateProduct);
router.post("/deleteproduct", deleteProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getAllOrders", getAllOrders);

export default router;