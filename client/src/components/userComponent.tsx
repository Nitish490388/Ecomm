import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { getUserQuerry, userAtom } from "@/store/appState"
import { Outlet } from "react-router-dom";


const UserComponent = () => {
    const fetchedUser = useRecoilValue(getUserQuerry);
    if(fetchedUser) console.log(fetchedUser);
    
    const setUserState = useSetRecoilState(userAtom);
    
    useEffect(() => {
        if (fetchedUser) {
          setUserState(fetchedUser);
        }
      }, [fetchedUser, setUserState]);
  return (
    <>
        <Outlet/>
    </>
  )
}

export default UserComponent