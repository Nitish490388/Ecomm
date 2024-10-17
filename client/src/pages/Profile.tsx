import React from "react";
import { Button } from "@/components/ui/button";
import axiosClient from "@/utills/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSetUser from "@/hooks/useSetUser";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "@/store/appState";
// import useResetUser from "@/hooks/useResetUser";
const ProfilePage: React.FC = () => {
  // const { user, loading, error } = useUser();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleLogout = async() => {
     await axiosClient.post("/api/v1/user/signout");
    // console.log(response);
    // useResetUser();
    setUser(
      { name: '', email: '', role: '' }
    ); 
    navigate("/");
    toast.success("You are logged out");
  }

  useSetUser();
  const user = useRecoilValue(userAtom);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading user details</div>;
  // }

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
          <Button variant={"outline"} onClick={handleLogout}>logout</Button>
        </div>
      )}
      
    </div>
  );
};

export default ProfilePage;
