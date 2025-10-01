import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../api';

const Logout = () => {
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    const logout = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.token) {
          await axiosInstance.post(
            '/api/auth/logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
        }
      } catch (err) {
        console.error('Logout API failed:', err);
      }

      localStorage.removeItem('user');
      localStorage.removeItem('jobs');
      localStorage.removeItem('search');
      toast.success('You have been logged out');
      navigate('login'); // ✅ Changed to relative path
    };

    if (!hasLoggedOut.current) {
      logout();
      hasLoggedOut.current = true;
    }
  }, [navigate]);

  return null;
};

export default Logout;