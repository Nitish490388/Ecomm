// import axiosClient from "@/utills/axiosClient";
import { PaginatedProductsQuery } from "@/store/adminAppState";
import { useRecoilValueLoadable } from "recoil";
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
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {  useState } from "react";

const AdminProducts = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 3; 
  
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const productsLoadable =  useRecoilValueLoadable(PaginatedProductsQuery({ page: currentPage, limit }));
  
  
  if(productsLoadable.state == "hasValue") {
    // console.log(productsLoadable.contents);
    // setCurrentPage(productsLoadable.contents.meta.currentPage);
    // setTotalPage(productsLoadable.contents.meta.totalPages);
  }
  // const productsLoadable = useRecoilValueLoadable(allProductsQuerry);

  if (productsLoadable.state == "loading") return <div>Loading...</div>;

  if (productsLoadable.state === "hasError") {
    return <div>Error loading products</div>;
  }

  const products: ProductTypes[] = productsLoadable.contents.data;

  const columns: ColumnDef<ProductTypes>[] = [
    {
      accessorKey: "productImage",
      header: "Product Image",
      cell: ({ row }) => {
        // @ts-ignore
        const imageUrl = row.original.picture[0].url;
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
        );
      },
    },
    // {
    //   accessorKey: "basePrice",
    //   header: "BasePrice"
    // },
    {
      accessorKey: "basePrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Base Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      sortingFn: (rowA, rowB, columnId) => {
        const priceA = parseFloat(rowA.getValue(columnId)) || 0;
        const priceB = parseFloat(rowB.getValue(columnId)) || 0;
        return priceA - priceB;
      },
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
        const products = row.original;

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
        );
      },
    },
  ];
  return (
    <div className="bg-background text-foreground">
      <h1 className="font-bold bg-accent text-2xl text-accent-foreground p-4">
        Products
      </h1>
      <div>
        <DataTable columns={columns} data={products} />
      </div>
      <div className="w-full flex justify-end ">
      <div className="w-[350px] flex items-center justify-between mr-24 mt-2">
        <Button variant="outline" onClick={handlePrev} disabled={currentPage === 1}>prev</Button>
        <span>Page: {currentPage}</span>
        <Button variant="outline" onClick={handleNext} disabled={products.length < limit}>next</Button>
        <div>Total Pages:{productsLoadable.contents.meta.totalPages}</div>
      </div>
      </div>
      <div className="h-[300px]"></div>
    </div>
  );
};


export default AdminProducts;
