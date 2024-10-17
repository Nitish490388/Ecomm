import { selector, selectorFamily } from "recoil";
import axiosClient from "@/utills/axiosClient";


export const allOrdersQuerry = selector({
  key: 'allOrders',
  get: async () => {
    const response = await axiosClient.get("/api/v1/admin/getAllOrders");
    return response.data.result;
  },
});


export const allProductsQuerry = selector({
  key: 'allProducts',
  get: async () => {
    const response = await axiosClient.get("/api/v1/admin/getAllProducts");
    return response.data.result;
  },
});

export const PaginatedProductsQuery = selectorFamily({
  key: 'PaginatedProductsQuery',
  get: (paginationParams: { page: number; limit: number }) => async () => {
    const { page, limit } = paginationParams;
    try {
      const response = await axiosClient.get("/api/v1/admin/getPaginatedProducts", {
        params: { page, limit },
      });
      return response.data.result;
    } catch (error) {
      console.log(error);
      
    }
  },
});