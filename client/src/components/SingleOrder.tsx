import axiosClient from "@/utills/axiosClient";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

function SingleOrder({
  id,
  imageUrl,
  price,
  productName,
  quantity,
  status,
}: {
  id: string;
  imageUrl: string;
  price: number;
  productName: string;
  quantity: number;
  status: string;
}) {
  const [orderStatus, setOrderStatus] = useState(status);

  const handleCancelOrder = async() => {
    const response = await axiosClient.post(`api/v1/app/cancelOrder/${id}`);

    console.log(response.data);  
    setOrderStatus("CANCELLED");
  }

  return (
    <Card className="w-full h-[200px] flex items-center gap-6 bg-neutral-200">
      <div className="h-full ">
        <img src={imageUrl} alt="image" className="h-full object-contain"/>
      </div>
      <div className="flex flex-col items-center gap-2 p-6">
        <span>{productName}</span>
        <span>{quantity}</span>
        
        <span>INR: {price}</span>
        <span className={`${orderStatus === 'CANCELLED' ? 'text-gray-600' : orderStatus === 'COMPLETED' ? 'text-green-500' : ''} font-bold`}>{orderStatus}</span>
        {
          orderStatus === "PENDING" && <Button variant="link" onClick={handleCancelOrder}>Cancel order</Button>
        }
        
      </div>
    </Card>
  );
}

export default SingleOrder;
