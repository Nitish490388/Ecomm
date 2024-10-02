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

interface AddressDataType {
  userId: string;
  name: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  landmark: string;
  altPhone: string;
}

const getUserDetails  = async (req:Request, res: Response) => {
  try {
    const id = req.userId;
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    })
    return res.send(success(200, { data: user }));
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
    const items: checkoutData[] = req.body.items;
    const addressData: AddressDataType = req.body.address;
    const userId: string = req.userId as string;

    const createdAddress = await prisma.address.create({
      data: {
        userId,
        name: addressData.name,
        phone: addressData.phone,
        address: addressData.address,
        district: addressData.district,
        state: addressData.state,
        landmark: addressData.landmark,
        altPhone: addressData.altPhone,
      },
    });

    items.forEach(async (item) => {
      const price = currentPrice(item.basePrice, item.discountPercentage);
      const purchase = await prisma.purchase.create({
        data: {
          userId,
          productId: item.id,
          quantity: item.quantity,
          totalPrice: price,
          addressId: createdAddress.id, 
        },
      });
    });
    return res.send(success(200, {result: "Order placed"}));
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