import { useRecoilValueLoadable, useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { productIdAtom, appSingleProductQuery, cartAtom, isAddedToCart } from "@/store/appState";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageGallery from "@/components/ImageGallery";
import ImageGalleryMobile from "@/components/ImageGalleryMobile";
import { currentPrice } from "@/utills/calculation";
import { Button } from "@/components/ui/button";
import ServiceImages from "@/components/ServiceImages";
import { toast } from "react-toastify";

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

const SingleProductPage = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const setProductId2 = useSetRecoilState(productIdAtom);
  const productLoadable = useRecoilValueLoadable(appSingleProductQuery);
  const [cartItem, setCartItem] = useRecoilState(cartAtom);
  const inCart = useRecoilValue(isAddedToCart);

  useEffect(() => {
    if (id) {
      setProductId2(id);
    }
  }, [id, setProductId2]);

  const imgArray: string[] = [];
  let price;
  const productData: productType = productLoadable.contents.data;
  if (productLoadable.state === "hasValue") {
    productData.picture.map((pic) => {
      imgArray.push(pic.url);
    })
    price = currentPrice(productData.basePrice, productData.discountPercentage);
  }

  function addItemToCart(product: productType) {
    const oldCartItem = [...cartItem];
    const newCartItem = [product, ...oldCartItem];
    setCartItem(newCartItem);
  }

  const handleAddtoCart = () => {
    if (productLoadable.state === "hasValue")
      addItemToCart(productLoadable.contents.data);
    toast.success("Added to cart!")
  }

  if (productLoadable.state === "loading") {
    return <div>Loading...</div>
  }

  if (productLoadable.state === "hasError") {
    return <div>Error in getting product. Please Reload this page!</div>
  }


  return (
    <div className=" w-full relative bg-background text-foreground">
      <div className="w-full flex flex-col md:flex-row gap-5">
        <div className="bg-card md:hidden">
          <ImageGalleryMobile images={imgArray} />
        </div>
        <div className="bg-card hidden md:h-[450px] md:aspect-[4/3] md:flex md:items-center md:justify-cente">
          <ImageGallery images={imgArray} />
        </div>
        <div className="poppins-regular flex-1 bg-background text-foregroun flex flex-col gap-1 p-5">
          <span className="text-neutral-500 tracking-wider text-sm  poppins-bold ">{productData.categoryName}</span>
          <h2 className="poppins-regular text-xl  ">{productData.name}</h2>
          <div className="roboto-medium tracking-wider text-xs text-green-600 pt-3">Special Price</div>
          <div><h3 className="text-2xl font-bold inline">₹{price}</h3>
            <del className="text-gray-500"><span className="text-gray-500 font-normal text-[18px] pl-6">₹{productData.basePrice}</span></del> <span className="text-green-600 font-normal text-[18px] pl-6">{productData.discountPercentage}% off</span></div>
          <div className="pt-4">Size : Large</div>
          <div>Dimensions : H: 24 (in) by W: 36 (in)</div>
          <div className=" md:pb-10">Medium : Natural Colors on Canvas</div>
          <div className="hidden w-full md:w-[300px] md:flex flex-col gap-4 bottom-1">

            {
              inCart ?
                <>
                  <Button onClick={() => {
                    navigate("/viewcart")
                  }} variant="outline">Go to cart</Button>
                </>
                :
                <>
                  <Button onClick={handleAddtoCart}>Add to Cart</Button>
                </>
            }
            <Button variant="secondary">Talk to our Art Expert</Button>
          </div>
          <div className="w-full mt-5">
            <ServiceImages />
          </div>
          <div className="w-full h-[70px] md:hidden bg-inherit">

          </div>
        </div>
        <div className="fixed w-full bottom-1 md:hidden px-3">
          <div className=" w-full flex flex-col ">
            {
              inCart ?
                <>
                  <Button onClick={() => {
                    navigate("/viewcart")
                  }} variant="outline">Go to cart</Button>
                </>
                :
                <>
                  <Button onClick={handleAddtoCart}>Add to Cart</Button>
                </>
            }
            <Button variant="secondary">Talk to our Art Expert</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
