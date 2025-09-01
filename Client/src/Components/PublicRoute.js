import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.login);

  useEffect(() => {
    if (accessToken) {
      navigate(redirectTo, { replace: true });
    }
  }, [accessToken, navigate, redirectTo]);

  if (accessToken) {
    return null;
  }

  return children;
};

export default PublicRoute;
