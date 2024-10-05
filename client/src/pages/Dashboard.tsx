
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-primary text-[60px] font-bold">Welcome to Dashboard!!</h1>
      </div>
    </>
  );
};

export default Dashboard;
