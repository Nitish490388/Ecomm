import { Response, Request } from "express";
import { error, success } from "../utils/responseWrapper";
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

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

export {
  getAllProducts,
  getSingleProduct,
  getFilteredProducts,

}