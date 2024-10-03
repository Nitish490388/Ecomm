import {useEffect} from 'react'
import { Outlet, useNavigate } from "react-router-dom";



const RestrictedUser = () => {
    const navigate = useNavigate();
    const token = document.cookie.split("=")[1];
    
    
    useEffect(() => {
      
        if (!token) {
          navigate("/signin");
        }
        
      }, [token]);
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default RestrictedUser