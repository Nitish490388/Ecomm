import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

const RestrictAdmin = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useUser();

  useEffect(() => {
    // Redirect if the user is not an admin and after loading
    if (!loading && user && user.role !== "ADMIN") {
      navigate("/signin");
    }
  }, [user, loading, navigate]); // Dependency array ensures effect runs when these values change

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user details</div>;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default RestrictAdmin;
