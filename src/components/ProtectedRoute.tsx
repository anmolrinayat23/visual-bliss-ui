import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Auth');
    }
  }, [navigate]);

  const token = localStorage.getItem('token');
  if (!token) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
