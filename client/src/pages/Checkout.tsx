import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRecoilValue, useRecoilSnapshot } from "recoil";
import {
  cartAtom,
  checkoutPrice,
  quantityCounterFamily,
} from "@/store/appState";
import CartItem from "@/components/CartItem";
import { AddressInput, AddressInputType } from "@/zod/types";
import axiosClient from "@/utills/axiosClient";
import { useUser } from "@/hooks/useUser";
import { Card } from "@/components/ui/card";
import ErrorMSG from "@/components/ErrorMSG";
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

interface checkoutData extends productType {
  quantity: number;
}

interface checkoutPriceType {
  totalBasePrice: number;
  totalDiscount: number;
  totalAmount: number;
}

const Checkout = () => {
  const cartItems: productType[] = useRecoilValue(cartAtom);
  const checkout: checkoutPriceType = useRecoilValue(checkoutPrice);
  const { user, loading, error } = useUser();
  const [address, setAddress] = useState<AddressInputType>({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    district: "",
    address: "",
    state: "",
    landmark: "",
    altPhone: "",
  });

  const [errorMSG, setErrorMSG] = useState<string | null>("");

  const snapshot = useRecoilSnapshot();

  const handlePlaceOrder = async () => {

    
    
    const data: checkoutData[] = [];
    cartItems.forEach((item) => {
      const loadable = snapshot.getLoadable(quantityCounterFamily(item.id));
      if (loadable.state === "hasValue") {
        data.push({
          ...item,
          quantity: loadable.contents,
        });
      }
    });

    const result = AddressInput.safeParse(address);
    if (result.success) {
      setErrorMSG(null); 

      const payload = {
        items: data,
        address: address
      }
    await axiosClient.post("/api/v1/app/placeorder", payload);
      toast.success("Order is placed!");
    } else {
    
      
      const errorMessage = result.error.errors.map((err) => err.message).join(", ");
      setErrorMSG(errorMessage);

    }

    
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress((ad) => ({
      ...ad,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user details</div>;
  }

  return (
    <div>
      <div className="w-full min-h-[400px] flex flex-col lg:flex-row gap-5 p-3">
        <div className="flex-1">
          <section className="w-full mb-4">
           
            <h2 className="text-lg font-semibold mt-6 mb-3">
              1. Login
            </h2>
            <Card className="bg-inherit p-4">
            {user && (
                <div className="">
                  <p>
                    Hello <span className="font-bold text-2xl text-primary">{user.name} !!</span>
                  </p>
                  <p>
                    Your email is <span className="font-bold text-2xl">{user.email} </span>
                  </p>
                </div>
              )}
            </Card>
            
          </section>

          <section>
            <h2 className="text-lg font-semibold mt-6 mb-3">3. Order Summary</h2>
            <div className="flex-1 flex flex-col ">
              {cartItems.map((item, index) => (
                <div key={index}>
                  <CartItem product={item} />
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold mt-6 mb-3">2. Delivery Address</h2>
            <div>
              <form action="" onSubmit={handlePlaceOrder}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] mb-4">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    onChange={handleChangeInput}
                  />
                  <Input
                    name="phone"
                    type="text"
                    placeholder="10-digit mobile number"
                    required
                    onChange={handleChangeInput}
                  />
                  <Input
                    name="pincode"
                    type="text"
                    placeholder="Pincode"
                    required
                    onChange={handleChangeInput}
                  />
                  <Input
                    name="locality"
                    type="text"
                    placeholder="Locality"
                    required
                    onChange={handleChangeInput}
                  />
                </div>
                <Textarea
                  name="address"
                  placeholder="Address (Area and Street)"
                  className="mb-4"
                  onChange={handleTextAreaChange}
                />{" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] mb-4">
                  <Input
                    name="district"
                    type="text"
                    placeholder="District/District/Town"
                    required
                    onChange={handleChangeInput}
                  />
                  <Input
                    name="state"
                    type="text"
                    placeholder="State"
                    required
                    onChange={handleChangeInput}
                  />
                  <Input
                    name="landmark"
                    type="text"
                    placeholder="Landmark"
                    required
                    onChange={handleChangeInput}
                  />
                  <Input
                    name="altPhone"
                    type="text"
                    placeholder="Alternative Phone (Optional)"
                    onChange={handleChangeInput}
                  />
                </div>
              </form>
            </div>
          </section>
          {errorMSG && <ErrorMSG msg={errorMSG}/>}
        </div>
        <div>
          <div className=" w-full h-[300px] md:w-[300px] p-4 flex flex-col justify-center gap-2 md:gap-y-3 bg-inherit text-inherit rounded shadow-md max-w-sm mx-auto">
            <h2 className="text-lg font-semibold ">PRICE DETAILS</h2>
            <div className="flex justify-between  border-b">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{checkout.totalBasePrice}</span>
            </div>
            <div className="flex justify-between  border-b">
              <span>Discount</span>
              <span className="text-green-600">
                – ₹{checkout.totalDiscount}
              </span>
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
              {/* You will save ₹9,300 on this order */}
              {/* <Button
                onClick={async () => {
                  const response = await axiosClient.get("/api/v1/app/getUser");
                  console.log(response);
                }}
              >
                click
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-300">
        <Button className="block mx-auto" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
