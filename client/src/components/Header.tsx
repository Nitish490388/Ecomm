import { CiMenuBurger } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiBag1 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";
import Drawer from "./Drawer";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="w-screen flex items-center justify-between px-4 bg-secondary">
      <CiMenuBurger className="text-3xl" onClick={handleDrawerToggle} />
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerToggle} />
      <h3>Logo</h3>
      <div className="flex items-center gap-4 text-2xl md:text-3xl font-thin py-3 md:py-5">
        <CiUser onClick={() => {
          navigate("/profile");
        }}/>
        <CiSearch />
        <CiHeart />
        <CiBag1 onClick={() => {
          navigate("/viewcart");
        }} />
        {/* <ShoppingCart /> */}
      </div>

    </nav>
  );
};

export default Header;
