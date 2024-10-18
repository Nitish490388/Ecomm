import { useEffect, useState } from 'react';
import { getUserQuerry, userAtom } from "@/store/appState";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";

const useSetUser = () => {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const userLoadable = useRecoilValueLoadable(getUserQuerry);

  useEffect(() => {
    if (userLoadable.state === "hasValue") {
      const user = userLoadable.contents.data;
      setUser({
        name: user?.name ?? '',
        email: user?.email ?? '',
        role: user?.role ?? '',
      });
      setIsUserLoaded(true);
    }
  }, [userLoadable, setUser]);

  return isUserLoaded;
};

export default useSetUser;
