import React, { useState, useCallback } from 'react';
import Toast from './Toast';
import { Container } from './styles/ToastContainerStyles';

const ToastContainer = ({ position = 'top-right' }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message, duration) => {
    return addToast({ message, type: 'success', duration });
  }, [addToast]);

  const showError = useCallback((message, duration) => {
    return addToast({ message, type: 'error', duration });
  }, [addToast]);

  const showWarning = useCallback((message, duration) => {
    return addToast({ message, type: 'warning', duration });
  }, [addToast]);

  const showInfo = useCallback((message, duration) => {
    return addToast({ message, type: 'info', duration });
  }, [addToast]);

  const showLogin = useCallback((message, duration) => {
    return addToast({ message, type: 'login', duration });
  }, [addToast]);

  const showSignup = useCallback((message, duration) => {
    return addToast({ message, type: 'signup', duration });
  }, [addToast]);

  const showLogout = useCallback((message, duration) => {
    return addToast({ message, type: 'logout', duration });
  }, [addToast]);

  const showAuth = useCallback((message, duration) => {
    return addToast({ message, type: 'auth', duration });
  }, [addToast]);

  // Expose methods globally for easy access
  React.useEffect(() => {
    window.toast = {
      success: showSuccess,
      error: showError,
      warning: showWarning,
      info: showInfo,
      login: showLogin,
      signup: showSignup,
      logout: showLogout,
      auth: showAuth,
      add: addToast,
      remove: removeToast
    };
  }, [showSuccess, showError, showWarning, showInfo, showLogin, showSignup, showLogout, showAuth, addToast, removeToast]);

  return (
    <Container position={position}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={position}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
