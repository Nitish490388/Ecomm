import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden first-letter:select-none bg-background text-foreground flex flex-col ">
      <Helmet>
        <title>Admin-Dashboard</title>
      </Helmet>
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
