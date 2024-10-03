import { useState, useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { getUserQuerry } from '../store/appState'; // Adjust path according to your project structure

export const useUser = () => {
  const userLoadable = useRecoilValueLoadable(getUserQuerry);
  const [user, setUser] = useState<{ name: string; email: string; role:string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (userLoadable.state === 'hasValue') {
      setUser(userLoadable.contents.data);
      // console.log(user);
      
      setLoading(false);
    } else if (userLoadable.state === 'hasError') {
      setError(true);
      setLoading(false);
    }
  }, [userLoadable]);

  return { user, loading, error };
};
