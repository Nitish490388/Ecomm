
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <Button onClick={() => {
          navigate("/admin/create")
        }}>Create Product</Button>
      </div>
    </>
  );
};

export default Dashboard;
