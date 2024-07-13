import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";

const HomeLayouts = () => {
  return (
    <div className="h-screen w-screen border-2 overflow-x-hidden border-blue-600 first-letter:select-none bg-background text-foreground">
      <Header />
      <div className="w-full ">
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default HomeLayouts;
