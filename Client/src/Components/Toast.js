import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  X,
  UserCheck,
  UserPlus,
  LogOut,
  Shield
} from 'lucide-react';
import {
  ToastWrapper,
  ToastContent,
  ToastIcon,
  ToastMessage,
  ToastClose,
  ToastProgress,
  ToastProgressBar
} from './styles/ToastStyles';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose, 
  position = 'top-right' 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'login':
        return <UserCheck size={20} />;
      case 'signup':
        return <UserPlus size={20} />;
      case 'logout':
        return <LogOut size={20} />;
      case 'auth':
        return <Shield size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ToastWrapper
          type={type}
          initial={{ 
            opacity: 0, 
            x: position.includes('right') ? 100 : -100,
            y: position.includes('top') ? -50 : 50,
            scale: 0.8 
          }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            y: 0, 
            scale: 1 
          }}
          exit={{ 
            opacity: 0, 
            x: position.includes('right') ? 100 : -100,
            y: position.includes('top') ? -50 : 50,
            scale: 0.8 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        >
          <ToastContent>
            <ToastIcon type={type}>
              {getIcon()}
            </ToastIcon>
            <ToastMessage>
              {message}
            </ToastMessage>
            <ToastClose 
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(), 300);
              }}
            >
              <X size={16} />
            </ToastClose>
          </ToastContent>
          <ToastProgress>
            <ToastProgressBar
              type={type}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            />
          </ToastProgress>
        </ToastWrapper>
      )}
    </AnimatePresence>
  );
};

export default Toast;
