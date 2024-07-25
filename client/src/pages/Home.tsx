
import { useRecoilValueLoadable } from "recoil";
import { appProductsQuerry } from "@/store/appState";
import { ProductCard } from "@/components/ProductCard";
import { useNavigate } from "react-router-dom";

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

const Home = () => {
  const navigate = useNavigate();


  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  }

  const productsLoadable = useRecoilValueLoadable(appProductsQuerry);

  if (productsLoadable.state == "loading")
    return (
      <div>Loading...</div>
    );

  if (productsLoadable.state === "hasError") {
    return <div>Error loading products</div>;
  }

  const products: productType[] = productsLoadable.contents.data;

  return (
    <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {products.map((product, index) => (
        <div key={index} onClick={() => handleProductClick(product.id)}>
          <ProductCard product={product} />
        </div>
      ))}
    </section>
  );

};

export default Home;



