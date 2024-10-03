import { Link, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { Button } from "./ui/button";
import axiosClient from "@/utills/axiosClient";
import { useUser } from "@/hooks/useUser";

function Drawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed z-10 top-0 left-0 h-full w-full md:w-[300px] bg-secondary text-foreground transition-transform duration-300 transform ${
        isOpen ? "translate-x-0 " : "translate-x-full md:translate-x-[-300px]"
      }`}
    >
      <div className="absolute right-7 top-4 h-10 w-10  rounded-full flex items-center justify-center hover:scale-125 ease-out transition-transform">
        <div></div>
        <button className=" " onClick={onClose}>
          <RxCross1 className="text-foreground font-bold" />
        </button>
      </div>
      <div className="w-full h-full">
        <ul className="flex  flex-col gap-3 items-start pl-10 justify-center w-full  mt-20">
          <li className="btn-primary text-xl list-item ">
            <Link to="/signup" onClick={onClose}>
              Signup
            </Link>
          </li>
          <li className="btn-primary text-xl list-item">
            <Link to="/signin" onClick={onClose}>
              Signin
            </Link>
          </li>

          <li className="btn-primary text-xl list-item">
            <Link to="/">Contact</Link>
          </li>
          <li className="btn-primary text-xl list-item">
            <Link to="/">Projects</Link>
          </li>

          <div>
            <Button
              variant={"outline"}
              onClick={async () => {
                onClose();
              }}
            >
              Logout
            </Button>
          </div>

          {/* Add other navigation links */}
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
