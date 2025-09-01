import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  
  ${props => {
    switch (props.position) {
      case 'top-right':
        return `
          top: 20px;
          right: 20px;
        `;
      case 'top-left':
        return `
          top: 20px;
          left: 20px;
        `;
      case 'bottom-right':
        return `
          bottom: 20px;
          right: 20px;
        `;
      case 'bottom-left':
        return `
          bottom: 20px;
          left: 20px;
        `;
      default:
        return `
          top: 20px;
          right: 20px;
        `;
    }
  }}

  @media (max-width: 480px) {
    ${props => {
      if (props.position.includes('top')) {
        return 'top: 10px;';
      } else {
        return 'bottom: 10px;';
      }
    }}
  }
`;
