import axiosClient from "@/utills/axiosClient";
import { selector } from "recoil";


export const getMyOrdersQuerry = selector({
    key: 'getMyOrders',
    get: async () => {
      const response = await axiosClient.get("/api/v1/app/getMyOrders");
      return response.data.result;
    },
  });