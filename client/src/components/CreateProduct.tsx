import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import axiosClient from "../utills/axiosClient";
// import axios from "axios";

interface FormDataType {
  title: string;
  description: string;
  category: string;
  baseprice: number;
  discount?: number;
  stock: number;
}

const CreateProduct = () => {

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    category: "",
    baseprice: 0,
    discount: 0,
    stock: 1
  });

  const [images, setImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const data = {
      ...formData,
      images
    };
    console.log(data);
    try {
      const respond = await axiosClient.post("/api/v1/admin/addProduct", data);
      // const respond = await axios.post("http://localhost:8000/api/v1/admin/addProduct");
      console.log(respond);
    } catch (error) {
      console.log(error);

    }

  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages([]);
    const files = Array.from(e.target.files || []); // Ensure files is an array
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldImages) => [...oldImages, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="w-ful overflow-auto">
      <Card className="w-full md:w-[60%] mx-auto mt-3">
        <CardHeader>
          <CardTitle>Add a Product</CardTitle>
          <CardDescription>Submit the form to add a new product.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" type="text" placeholder="Enter title"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Label htmlFor="description">Description</Label>
              <Input type="text" name="description" id="description" placeholder="Write something about product" onChange={handleChange} />
            </div>
            <div className="md:flex md:justify-between md:items-center md:gap-2 mt-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" onValueChange={handleSelectChange} >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem onChange={handleChange} value="homedecor">Home Decor</SelectItem>
                      <SelectItem onChange={handleChange} value="traditional">Traditional</SelectItem>
                      <SelectItem onChange={handleChange} value="triad">Triad</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="baseprice">Base price</Label>
                <Input onChange={handleChange} type="number" name="baseprice" id="baseprice" placeholder="INR 00.00" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="discount">Discount</Label>
                <Input onChange={handleChange} type="number" name="discount" id="discount" placeholder="00%" />
              </div>
            </div>
            <div className="md:flex md:justify-between md:items-center md:gap-2 mt-2">
              <div className="flex flex-col gap-2 mt-2">
                <Label htmlFor="stock">Stock</Label>
                <Input type="number" name="stock" id="stock" placeholder="00" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Label htmlFor="images">Select images</Label>
                <Input
                  onChange={handleImageChange}
                  type="file"
                  name="images"
                  id="images"
                  accept="image/jpeg, image/png, image/gif"
                  multiple
                />
              </div>
            </div>
            <div className="md:flex md:justify-between md:items-center md:gap-2 mt-2">
              <Button type="submit" className="w-[150px]">Submit</Button>
              {
                images.length > 0 ? <>
                  <div className="w-[400px] h-[100px] flex items-center gap-2 overflow-x-scroll border-2 border-primary rounded-md p-2">
                    {
                      images?.map((image, i) => {
                        return (
                          <div key={i} className="h-full aspect-square">
                            <img src={image} alt="product image" className="h-full" />
                          </div>
                        );
                      })
                    }
                  </div>
                </>
                  :
                  <></>}
            </div>
          </form>
          {/* <div className="h-[100px]"></div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProduct;
