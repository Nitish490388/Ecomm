import { allOrdersQuerry } from "@/store/adminAppState";
import {
  useRecoilValueLoadable
} from "recoil";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import axiosClient from "@/utills/axiosClient";

interface tableDataType {
  productImage: string;
  purchaseId: string;
  quantity: number;
  totalPrice: string;
  userAddress: string;
  userEmail: string;
  status: string;
}


const AdminProducts = () => {
  const ordersLoadable = useRecoilValueLoadable(allOrdersQuerry);

  const handleMarkAsDelivered =  async (id: string) => {
    const response = await axiosClient.post(`/api/v1/admin/markDelivered/${id}`);
    console.log(response?.data);
    
  }

  if (ordersLoadable.state == "loading")
    return (
      <div>Loading...</div>
    );

  if (ordersLoadable.state === "hasError") {
    return <div>Error loading products</div>;
  }
  
  const orders: tableDataType[] = ordersLoadable.contents.data;

  
  const columns: ColumnDef<tableDataType>[] = [
    {
      accessorKey: "purchaseId",
      header: "Id",
    },
    {
      accessorKey: "productImage",
      header: "Product Image",
      cell: ({ row }) => {
       
        const imageUrl = row.original.productImage; 
        return (
          <img
            src={imageUrl}
            alt="Product Image"
            className="h-12 w-12 object-cover"
          />
        );
      },
    },
    
    {
      accessorKey: "userEmail",
      header: "Email",
    },
    {
      accessorKey: "totalPrice",
      header: "price",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },

    {
      accessorKey: "status",
      header: "Status",
    },


    // {
    //   accessorKey: "userName",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         User Name
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    // },
    {
      accessorKey: "userAddress",
      header: "Address",
    },
    
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleMarkAsDelivered(order.purchaseId)}
              >
                Mark as delivered.
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Edit Order</DropdownMenuItem> */}
              {/* <DropdownMenuItem>Delete Order</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="border border-red-600 h-screen bg-background text-foreground">
      <h1 className="font-bold bg-accent text-2xl text-accent-foreground p-4">
        Purchases
      </h1>
      <div>
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default AdminProducts;
