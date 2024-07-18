import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
} from "../controller/adminController";

const router = express.Router();

router.post("/addProduct", addProduct);
router.post("/updateProduct", updateProduct);
router.post("/deleteproduct", deleteProduct);
router.get("/getAllProducts", getAllProducts);

export default router;