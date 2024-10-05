import Sidebar from "./Sidebar";

const DashboardContent = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className="w-full h-full flex ">
      <div className=" w-[200px]">
        <Sidebar />
      </div>
      <div className="flex-grow overflow-scroll">
        {children}
      </div>

    </div>
  );
};

export default DashboardContent;
