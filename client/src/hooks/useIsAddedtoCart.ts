import { useRecoilValue } from 'recoil';
import { cartAtom } from '@/store/appState';

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

const useIsAddedToCart = (prod: productType): boolean => {
  const cartItem: productType[] = useRecoilValue(cartAtom);
  return cartItem.some((item) => item.id === prod.id);
}

export default useIsAddedToCart;