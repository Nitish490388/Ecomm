import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { getUserQuerry, userAtom } from "@/store/appState";
import useSetUser from "@/hooks/useSetUser";


const RestrictAdmin = () => {
  const navigate = useNavigate();

  const isUserLoaded = useSetUser();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if(isUserLoaded) {
      if (user?.role !== "ADMIN") {
        navigate("/signin");
      }
    }

  }, [ isUserLoaded, user, navigate]); 
  

  if (!user) {
    return <div>Error loading user details</div>;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default RestrictAdmin;
