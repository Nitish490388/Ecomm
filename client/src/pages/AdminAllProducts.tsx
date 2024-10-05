
// import axiosClient from "@/utills/axiosClient";
import { allProductsQuerry } from "@/store/adminAppState";
import {
  useRecoilValueLoadable
} from "recoil"
import { ProductTypes } from "@/zod/types";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

const AdminProducts = () => {
  const productsLoadable = useRecoilValueLoadable(allProductsQuerry);

  if (productsLoadable.state == "loading")
    return (
      <div>Loading...</div>
    );

  if (productsLoadable.state === "hasError") {
    return <div>Error loading products</div>;
  }

  const products: ProductTypes[] = productsLoadable.contents.data;

  const columns: ColumnDef<ProductTypes>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "basePrice",
      header: "BasePrice"
    },
    {
      accessorKey: "discountPercentage",
      header: "Discount",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "createdAt",
      header: "CreatedAt",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const products = row.original

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
                onClick={() => navigator.clipboard.writeText(products.name)}
              >
                Copy copping
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Product</DropdownMenuItem>
              <DropdownMenuItem>Delete Product</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  return (
    <div className="border border-red-600 h-screen bg-background text-foreground">
      <h1 className="font-bold bg-accent text-2xl text-accent-foreground p-4">
        Products
      </h1>
      <div>
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
};

export default AdminProducts;
