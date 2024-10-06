import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trial from "./pages/Trial";
import HomeLayouts from "./components/HomeLayouts";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import DashboardLayout from "./components/DashboardLayout";
import CreateProduct from "./components/CreateProduct";
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/Dashboard";
import AdminAllProducts from "./pages/AdminAllProducts";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import RestrictedUser from "./components/RestrictedUser";
import Profile from "./pages/Profile";
import RestrictAdmin from "./components/RestrictAdmin";
import UserComponent from "./components/userComponent";
import AdminAllOrders from "./pages/AdminAllOrders";
import MyOrders from "./pages/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/try" element={<Trial />} />
        <Route element={<HomeLayouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/viewcart" element={<CartPage />} />
          <Route element={<RestrictedUser />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Route>
        </Route>

        <Route element={<RestrictedUser />}>
        <Route element={<RestrictAdmin />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/create-product" element={<CreateProduct />} />
            <Route path="/admin/allProducts" element={<AdminAllProducts />} />
            <Route path="/admin/allOrders" element={<AdminAllOrders />} />
          </Route>
        </Route>
        </Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </>
  );
}

export default App;
