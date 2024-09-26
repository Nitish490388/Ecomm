import CartItem from "@/components/CartItem";
import { useRecoilValue } from "recoil";
import { cartAtom } from "@/store/appState";
import PriceDistribution from "@/components/PriceDistribution";

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

const CartPage = () => {
  const cartItems: productType[] = useRecoilValue(cartAtom);


  if (cartItems.length <= 0) {
    return (
      <div>
        Cart is Empty!
      </div>
    );
  }
  return (
    <div className="w-full md:px-10 mt-5">
      <div className="w-full bg-inherit flex flex-col md:flex-row md:justify-center md:gap-10">
        <div className="flex-1 flex flex-col ">
          {
            cartItems.map((item, index) => (
              <div key={index}>
                <CartItem product={item} />
              </div>
            ))
          }
        </div>
        <PriceDistribution />
      </div >
    </div>
  );
};

export default CartPage;
