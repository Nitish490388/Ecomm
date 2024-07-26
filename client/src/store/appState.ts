import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'
import axiosClient from "@/utills/axiosClient";

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // this key is using to store data in local storage
  storage: localStorage, // configure which storage will be used to store the data
  converter: JSON // configure how values will be serialized/deserialized in storage
})

export const cartAtom = atom({
  key: "cart",
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const appProductsQuerry = selector({
  key: 'appProducts',
  get: async () => {
    const response = await axiosClient.get("/api/v1/app/getAllProducts");
    return response.data.result;
  },
});

export const productIdAtom = atom({
  key: "productId",
  default: ""
})

export const imgUrlAtom = atom({
  key: "imgURL",
  default: ""
})

export const appSingleProductQuery = selector({
  key: "appSingleProduct",
  get: async ({ get }) => {
    const id = get(productIdAtom);
    if (!id) return null;
    const response = await axiosClient.get(`/api/v1/app/getSingleProduct/${id}`);
    return response.data.result;
  }
})

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

function isEqual(id: string, objs: productType[]): boolean {
  return objs.some(item => item.id === id);
}

export const isAddedToCart = selector({
  key: "isAddedToCartAtom",
  get: ({ get }) => {
    const id = get(productIdAtom);
    const cartItems = get(cartAtom);
    const is = isEqual(id, cartItems);
    return is;
  }
})
