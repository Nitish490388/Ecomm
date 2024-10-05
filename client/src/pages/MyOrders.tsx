import SingleOrder from "@/components/SingleOrder";
import axiosClient from "@/utills/axiosClient";
import { useEffect, useState } from "react";
import { getMyOrdersQuerry } from "@/store/myOrderState";
import { useRecoilValueLoadable } from "recoil";

interface orderDataType {
  id: string;
  imageUrl: string;
            price: number;
            productName: string;
            quantity: number;
            status: string;
};

const MyOrders = () => {

  const myOrdersLoadbale = useRecoilValueLoadable(getMyOrdersQuerry);

  if (myOrdersLoadbale.state === "loading") return <div>Loading...</div>;

  if (myOrdersLoadbale.state === "hasError")
    return <div>Error in gettind order data...</div>;
  
  const orders: orderDataType[] = myOrdersLoadbale.contents;

  return (
    <div>
      <h1>My Orders</h1>
      <div className="w-full flex flex-col items-center justify-center gap-4 mt-10 rounded-3xl">
        {orders?.map(
          (item: orderDataType) => (
            <div className=" " key={item.id}>
              <SingleOrder
              id={item.id}
              imageUrl={item.imageUrl}
              price={item.price}
              productName={item.productName}
              quantity={item.quantity}
              status={item.status}
            />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyOrders;
