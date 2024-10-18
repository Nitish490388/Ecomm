import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import axiosClient from "@/utills/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useLogout from "@/hooks/useLogout";
import { useUser } from "@/hooks/useUser";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await axiosClient.post("/api/v1/user/signout");
      logout();
      navigate("/");
      toast.success("You are logged out");
    } catch (error) {
      console.log("Error durinng logout" + error);
    }
  };

  
  const {user, loading, error} = useUser();

  if(loading) {
    return <div>Loading..</div>
  }
  if(error) {
    return <div>error-..</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      {user && (
        <div className="bg-white shadow-md rounded p-4 space-y-3">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <Button variant={"outline"} onClick={handleLogout}>
            logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
