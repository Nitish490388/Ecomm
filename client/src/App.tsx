import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import HomeLayouts from "./components/HomeLayouts"
import Trial from "./pages/Trial";
import Dashboard from "./pages/Dashboard"
import CreateProduct from "./components/CreateProduct"

function App() {

  return (
    <>
      <Routes>
        <Route path="/try" element={<Trial />} />
        <Route element={<HomeLayouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product/create" element={<CreateProduct />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
