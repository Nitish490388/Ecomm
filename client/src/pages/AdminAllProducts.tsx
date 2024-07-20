import { useEffect } from "react";
import axiosClient from "@/utills/axiosClient";

const AdminProducts = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/api/v1/admin/getAllProducts");
        console.log(response.data.result);

        // Handle the response here
      } catch (error) {
        // Handle the error here
      }
    };

    fetchData();
  }, []);

  return (
    <div className="border border-red-600 h-screen bg-background text-foreground">
      <h1 className="font-bold bg-accent text-2xl text-accent-foreground p-4">
        Products
      </h1>
      <div>
        AllPRoduct tables
      </div>
    </div>
  );
};

export default AdminProducts;
