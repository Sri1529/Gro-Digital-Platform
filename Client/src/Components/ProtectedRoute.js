import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ValidateTokenAction } from '../store/actions/validateTokenAction';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.login);
  const { isValid, loading: tokenLoading } = useSelector((state) => state.validateToken);
  const [isChecking, setIsChecking] = useState(true);
  const hasValidatedRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    if (hasValidatedRef.current) {
      setIsChecking(false);
      return;
    }

    const checkAuth = async () => {
      if (!isMountedRef.current) return;

      if (!accessToken) {
        if (window.toast) {
          window.toast.error("Access denied! Please login to continue.", 4000);
        } else {
          alert("Access denied! Please login to continue.");
        }
        
        navigate('/login', { replace: true });
        if (isMountedRef.current) {
          setIsChecking(false);
        }
        return;
      }

      if (isValid && !tokenLoading) {
        hasValidatedRef.current = true;
        if (isMountedRef.current) {
          setIsChecking(false);
        }
        return;
      }

      try {
        await dispatch(ValidateTokenAction()).unwrap();
        if (isMountedRef.current) {
          hasValidatedRef.current = true;
          setIsChecking(false);
        }
      } catch (error) {
        if (window.toast) {
          window.toast.error("Session expired! Please login again.", 4000);
        } else {
          alert("Session expired! Please login again.");
        }
        
        localStorage.removeItem("accessToken");
        navigate('/login', { replace: true });
        if (isMountedRef.current) {
          setIsChecking(false);
        }
      }
    };

    const timer = setTimeout(checkAuth, 100);
    
    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
    };
  }, [accessToken, navigate, dispatch, isValid, tokenLoading]);

  if (isChecking || tokenLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!accessToken || !isValid) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
