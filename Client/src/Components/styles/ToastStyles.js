import styled from 'styled-components';
import { motion } from 'framer-motion';

// Toast Container Styles
export const ToastWrapper = styled(motion.div)`
  position: relative;
  min-width: 320px;
  max-width: 400px;
  margin-bottom: 16px;
  padding: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  pointer-events: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Border left color based on type */
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'login': return '#8b5cf6';
      case 'signup': return '#06b6d4';
      case 'logout': return '#f97316';
      case 'auth': return '#84cc16';
      default: return '#3b82f6';
    }
  }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.15),
      0 12px 24px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 480px) {
    min-width: 280px;
    max-width: calc(100vw - 40px);
    margin: 0 20px 16px 20px;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(17, 24, 39, 0.95);
    border: 1px solid rgba(55, 65, 81, 0.3);
  }
`;

export const ToastContent = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 12px;
`;

export const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  flex-shrink: 0;
  color: white;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return 'linear-gradient(135deg, #10b981, #059669)';
      case 'error': return 'linear-gradient(135deg, #ef4444, #dc2626)';
      case 'warning': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'login': return 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
      case 'signup': return 'linear-gradient(135deg, #06b6d4, #0891b2)';
      case 'logout': return 'linear-gradient(135deg, #f97316, #ea580c)';
      case 'auth': return 'linear-gradient(135deg, #84cc16, #65a30d)';
      default: return 'linear-gradient(135deg, #3b82f6, #2563eb)';
    }
  }};
`;

export const ToastMessage = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.4;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`;

export const ToastClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #374151;
    transform: scale(1.1);
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.1);
    color: #9ca3af;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: #d1d5db;
    }
  }
`;

export const ToastProgress = styled.div`
  height: 3px;
  background: rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const ToastProgressBar = styled(motion.div)`
  height: 100%;
  border-radius: 0 0 16px 16px;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return 'linear-gradient(90deg, #10b981, #059669)';
      case 'error': return 'linear-gradient(90deg, #ef4444, #dc2626)';
      case 'warning': return 'linear-gradient(90deg, #f59e0b, #d97706)';
      case 'login': return 'linear-gradient(90deg, #8b5cf6, #7c3aed)';
      case 'signup': return 'linear-gradient(90deg, #06b6d4, #0891b2)';
      case 'logout': return 'linear-gradient(90deg, #f97316, #ea580c)';
      case 'auth': return 'linear-gradient(90deg, #84cc16, #65a30d)';
      default: return 'linear-gradient(90deg, #3b82f6, #2563eb)';
    }
  }};
`;
