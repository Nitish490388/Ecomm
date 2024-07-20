import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import HomeLayouts from "./components/HomeLayouts"
import Trial from "./pages/Trial";
import Dashboard from "./pages/Dashboard"
import CreateProduct from "./components/CreateProduct"
import DashboardLayout from "./components/DashboardLayout"
import AdminAllProducts from "./pages/AdminAllProducts"

function App() {

  return (
    <>
      <Routes>
        <Route path="/try" element={<Trial />} />
        <Route element={<HomeLayouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />


        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/allProducts" element={<AdminAllProducts />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
