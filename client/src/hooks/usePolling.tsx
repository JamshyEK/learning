import { useEffect, useState } from 'react';
import axios from 'axios';

export const useServerHealth = (url: string, interval = 5000) => {
  const [status, setStatus] = useState<'online' | 'offline'>('offline');

  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      try {
        const res = await axios.get(url, { timeout: 3000 });
        console.log('Response:', res);
        if (isMounted) {
          setStatus(res.status === 200 ? 'online' : 'offline');
        }
      } catch (error) {
        console.error('Error:', error);
        if (isMounted) {
          setStatus('offline');
        }
      }
    };

    check();
    const timer = setInterval(check, interval);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [url, interval]);

  return status;
};
