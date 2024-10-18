import { userAtom } from "@/store/appState";
import { useSetRecoilState } from "recoil";


const useLogout = () => {
    const setUser = useSetRecoilState(userAtom);

    const logout = () => {
        setUser(null);
    }

    return logout;
}

export default useLogout;