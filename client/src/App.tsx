import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Trial from "./pages/Trial";
import HomeLayouts from "./components/HomeLayouts";
import { LogIn } from "lucide-react";
import Signup from "./pages/Signup";
import DashboardLayout from "./components/DashboardLayout";
import CreateProduct from "./components/CreateProduct";
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/Dashboard";
import AdminAllProducts from "./pages/AdminAllProducts";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/try" element={<Trial />} />
        <Route element={<HomeLayouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<LogIn />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/viewcart" element={<CartPage />} />

        </Route>
        <Route element={<DashboardLayout />}>

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/allProducts" element={<AdminAllProducts />} />

        </Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </>
  )
}

export default App
