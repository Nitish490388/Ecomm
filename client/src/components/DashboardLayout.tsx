import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";

const DashboardLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden first-letter:select-none bg-background text-foreground flex flex-col ">
      <div className="flex-none">
        <DashboardHeader />
      </div>
      <div className="flex-grow overflow-y-scroll">
        <DashboardContent>
          <Outlet />
        </DashboardContent>
      </div>
    </div>
  );
};

export default DashboardLayout;
