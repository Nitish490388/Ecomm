import { useSetRecoilState } from "recoil";
import { userAtom } from "@/store/appState";

const useResetUser = () => {
  const setUser = useSetRecoilState(userAtom);

  const resetUser = () => {
    setUser(
        { name: '', email: '', role: '' }
    ); 
  };

  return resetUser;
};

export default useResetUser;