import React from 'react';
import Button from '@/components/ui/Button';

interface FlameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const FlameButton: React.FC<FlameButtonProps> = ({ children, onClick, className }) => {
    const navigateToAtemu = () => {
    window.location.href = "https://atemu.xyz/";
  };


  return (
    <div className="flame-button-wrapper">
      <Button 
        variant="primary" 
        size="large"
        onClick={navigateToAtemu}
        className={`flame-button ${className || ''}`}
      >
        {children}
      </Button>
      
      <style jsx>{`
        .flame-button-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .flame-button-wrapper :global(.flame-button) {
          position: relative;
          overflow: hidden;
        }
        
        .flame-button-wrapper :global(.flame-button)::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 150%;
          top: 100%;
          left: -100%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 94, 0, 0.4) 35%,
            rgba(255, 154, 0, 0.6) 40%,
            rgba(255, 206, 84, 0.8) 50%,
            rgba(255, 232, 150, 0.9) 55%,
            rgba(255, 154, 0, 0.6) 60%,
            rgba(255, 94, 0, 0.4) 65%,
            transparent 70%
          );
          transform: rotate(-45deg) translate(-50%, -50%);
          transition: all 0.6s cubic-bezier(0.23, 1, 1, 1);
          opacity: 0;
          filter: blur(2);
          mix-blend-mode: screen;
        }
        
        @media (min-width: 1024px) {
          .flame-button-wrapper :global(.flame-button):hover::after {
            top: -10%;
            left: 120%;
            opacity: 1;
            filter: blur(2px);
          }
        }
      `}</style>
    </div>
  );
};

export default FlameButton;