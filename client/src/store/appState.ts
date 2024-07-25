import { atom, selector } from "recoil";
import axiosClient from "@/utills/axiosClient";

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