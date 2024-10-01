import { Response, Request } from "express";
import { error, success } from "../utils/responseWrapper";
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client'
import { currentPrice } from "../utils/calculation";
import { create } from "domain";

const prisma = new PrismaClient();
interface pic {
  productId: string;
  publicId: string;
  url: string;
}

interface productType {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  categoryName: string;
  basePrice: number;
  discountPercentage: number;
  stock: number;
  picture: pic[];
}

interface checkoutData extends productType {
  quantity: number
}

const getUserDetails  = async (req:Request, res: Response) => {
  try {

    return res.send(success(200, { data: "data" }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "Error Happend"));
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const data = await prisma.product.findMany({
      include: {
        picture: true
      }
    });
    return res.send(success(200, { data }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "Error Happend"));
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: productId
      },
      include: {
        picture: true
      }
    });
    return res.send(success(200, { data: product }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "Error Happend"));
  }
}

const getFilteredProducts = async (req: Request, res: Response) => {
  try {

    return res.send(success(200, { data: "data" }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "Error Happend"));
  }
}

const placeorder = async (req: Request, res: Response) => {
  try {
    const data: checkoutData[] = req.body;
    const addressData = {
      userId: "dsd",
      name: "John Doe",
      phone: "1234567890",
      address: "123 Main St",
      district: "Downtown",
      state: "California",
      landmark: "Near Park",
      altPhone: "0987654321"
    };
    data.forEach(async (item) => {
      const price = currentPrice(item.basePrice, item.discountPercentage);
      const purchase = await prisma.purchase.create({
        data: {
          userId: "ewe",
          productId: item.id,
          quantity: item.quantity,
          totalPrice: price,
          address: {
            create: {
              ...addressData
            }
          },
        }
      });
    });
    return res.send(success(200, { data }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "Error Happend"));
  }
}

export {
  getUserDetails,
  getAllProducts,
  getSingleProduct,
  getFilteredProducts,
  placeorder,
}