import { Button } from "./ui/button";
import { useRecoilValue } from "recoil";
import { checkoutPrice, cartAtom } from "@/store/appState";
import { useNavigate } from "react-router-dom";

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

interface checkoutPriceType {
  totalBasePrice: number
  totalDiscount: number
  totalAmount: number;
}

const PriceDistribution = () => {
  const checkout: checkoutPriceType = useRecoilValue(checkoutPrice);
  const cartItems: productType[] = useRecoilValue(cartAtom);
  const navigate = useNavigate();

  const gotoCheckout = () => {
    navigate("/checkout");
  }

  return (
    <div className=" w-full h-[300px] md:w-[300px] p-4 flex flex-col justify-center gap-2 md:gap-y-3 bg-inherit text-inherit rounded shadow-md max-w-sm mx-auto">
      <h2 className="text-lg font-semibold ">PRICE DETAILS</h2>
      <div className="flex justify-between  border-b">
        <span>Price ({cartItems.length} items)</span>
        <span>₹{checkout.totalBasePrice}</span>
      </div>
      <div className="flex justify-between  border-b">
        <span>Discount</span>
        <span className="text-green-600">– ₹{checkout.totalDiscount}</span>
      </div>
      <div className="flex justify-between border-b">
        <span>Delivery Charges</span>
        <span className="line-through text-gray-500">₹80</span>
        <span className="text-green-600">Free</span>
      </div>
      <div className="flex justify-between  border-t">
        <span className="font-semibold">Total Amount</span>
        <span className="font-semibold">₹{checkout.totalAmount}</span>
      </div>
      <div className="text-green-600 ">
        You will save ₹9,300 on this order
      </div>
      <Button className="mt-2" onClick={gotoCheckout}>Checkout</Button>
    </div>
  );
};

export default PriceDistribution;
