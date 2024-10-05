import { Response, Request } from "express";
import { error, success } from "../utils/responseWrapper";
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface AddProductInputDataType {
  title: string;
  description: string;
  category: string;
  baseprice: number;
  discount?: number;
  stock: number;
  images: string[]
}

const markDelivered = async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    const purchase = await prisma.purchase.findUnique({
      where: {
        id: purchaseId,
      }
    });
    console.log(purchaseId);
    

    if(purchase?.status === "CANCELLED") {
      return res.send(error(404, "cant be marked "));
    }

    const updatedPurchase = await prisma.purchase.update({
      where: {
        id: purchaseId, 
      },
      data: {
        status: "COMPLETED", 
      },
    });
    return res.send(success(200, {data: purchaseId}));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "Error Happend"));
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await prisma.purchase.findMany({
      select: {
        id: true,
        quantity: true,
        totalPrice: true,
        status: true,
        user: {
          select: {
            email: true,
          },
        },
        product: {
          select: {
            picture: {
              select: {
                url: true, 
              },
            },
          },
        },
        address: {
          select: {
            address: true,
          },
        },
      },
    });
    
    const simplifiedOrders = allOrders.map(order => ({
      purchaseId: order.id,
      productImage: order.product.picture.length > 0 ? order.product.picture[0].url : null, // assumes one image per product
      userEmail: order.user.email,
      totalPrice: order.totalPrice,
      quantity: order.quantity,
      userAddress: order.address.address,
      status: order.status
    }));

    return res.send(success(200, { data: simplifiedOrders }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "Error Happened"));
  }
};


const addProduct = async (req: Request, res: Response) => {
  try {
    const data: AddProductInputDataType = req.body;

    let cat = await prisma.category.findUnique({
      where: {
        name: data.category
      }
    });

    if (!cat) {
      cat = await prisma.category.create({
        data: {
          name: data.category
        }
      });
    }

    // Handle image uploads
    const productImages = data.images;
    const imgObjArr = await Promise.all(productImages.map(async (img) => {
      const result = await cloudinary.uploader.upload(img, {
        folder: "Images"
      });
      return {
        publicId: result.public_id,
        url: result.url,
      };
    }));

    // Create new product
    const newProduct = await prisma.product.create({
      data: {
        name: data.title,
        description: data.description,
        basePrice: Number(data.baseprice),
        discountPercentage: Number(data.discount),
        stock: Number(data.stock),
        picture: {
          create: imgObjArr.map(pic => ({
            publicId: pic.publicId,
            url: pic.url,
          })),
        },
        category: {
          connect: { id: cat.id }
        }
      }
    });

    return res.send(success(200, { data: newProduct }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "Error Happend"));
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    return res.send(success(200, { data: "OK from update" }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, "Error Happend"));
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    return res.send(success(200, { data: "OK from delete" }));
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

export {
  markDelivered,
  getAllOrders,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
}