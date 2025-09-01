import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  overflow: hidden;
  color: white;
  font-family: 'Poppins', sans-serif;
`;

export const WelcomeCard = styled(motion.div)`
  text-align: center;
  background: rgba(255,255,255,0.1);
  padding: 30px 50px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  margin-bottom: 50px;
  position: relative;
  z-index: 2;

  .highlight {
    color: #ffd700;
    text-shadow: 0 0 10px #ffd700;
  }
`;

export const InfoCards = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

export const InfoCard = styled(motion.div)`
  width: 200px;
  height: 250px;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  .icon {
    margin-bottom: 15px;
  }

  &.gradient1 {
    background: linear-gradient(135deg, #ff416c, #ff4b2b);
  }

  &.gradient2 {
    background: linear-gradient(135deg, #f7971e, #ffd200);
  }

  &.gradient3 {
    background: linear-gradient(135deg, #00c6ff, #0072ff);
  }
`;

export const StyledButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    top: 15px;
    padding: 10px 16px;
    font-size: 13px;
  }
`;

export const LogoutButton = styled(StyledButton)`
  right: 20px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(239, 68, 68, 0.4);
  }

  @media (max-width: 768px) {
    right: 15px;
  }
`;

export const TestToastButton = styled(StyledButton)`
  right: 120px;
  background: linear-gradient(135deg, #10b981, #059669);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(16, 185, 129, 0.4);
  }

  @media (max-width: 768px) {
    right: 100px;
  }
`;

export const TokenValidationButton = styled(StyledButton)`
  right: 220px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(139, 92, 246, 0.4);
  }

  @media (max-width: 768px) {
    right: 180px;
  }
`;
