import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { currentPrice } from "@/utills/calculation";
import { cartAtom, quantityCounterFamily } from "@/store/appState";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
const CartItem = ({ product }: { product: productType }) => {
  const price = currentPrice(product.basePrice, product.discountPercentage);
  const setcounter = useSetRecoilState(quantityCounterFamily(product.id));
  const counter = useRecoilValue(quantityCounterFamily(product.id));
  const cartItems: productType[] = useRecoilValue(cartAtom);
  const setCartItem = useSetRecoilState(cartAtom);

  const handleIncrease = () => {
    setcounter(counter + 1);
  }

  const handleDecrease = () => {
    if (counter > 1)
      setcounter(counter - 1);
  }

  const handleRemove = () => {
    setCartItem(cartItems.filter((item) => item.id != product.id));
  }

  return (
    <div className="w-full">
      <Card className="h-[150px] shadow-sm hover:drop-shadow-lg transition-shadow flex gap-5">
        <div className="h-[80%] md:h-full aspect-square ">
          <img
            src={product.picture[0].url} // Replace with the path to your image
            alt="Kandel London Hard Sided PP 4 Wheel Spinners"
            className="h-full w-full object-contain"
          />
        </div>
        <div className=" flex-1 flex flex-col justify-between p-4 md:px-20 ">
          <h2 className="text-xs md:text-xl">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 line-through">₹{product.basePrice}</p>
            <p className="text-2xl font-bold text-green-600">₹{price}</p>
            <p className="text-sm text-green-600 ml-2">{product.discountPercentage}% Off</p>
          </div>
          <div className="flex items-center justify-evenly md:justify-start md:gap-3">
            <div className="flex items-center">
              <Button variant="outline" className="rounded-full flex justify-center items-center" onClick={handleDecrease}>-</Button>
              <span className="p-4">{counter}</span>
              <Button variant="outline" className="rounded-full flex justify-center items-center" onClick={handleIncrease}>+</Button>
            </div>
            <div className="flex md:mt-0">
              <Button variant="link" className="text-destructive" onClick={handleRemove}>REMOVE</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartItem;
