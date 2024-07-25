import { selector } from "recoil";
import axiosClient from "@/utills/axiosClient";

export const allProductsQuerry = selector({
  key: 'allProducts',
  get: async () => {
    const response = await axiosClient.get("/api/v1/admin/getAllProducts");
    return response.data.result;
  },
});