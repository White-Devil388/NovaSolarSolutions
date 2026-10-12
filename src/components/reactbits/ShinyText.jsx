import React from 'react';
import { motion } from 'framer-motion';

const ShinyText = ({ text, disabled = false, speed = 3, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        '--shiny-animation-duration': animationDuration,
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        display: 'inline-block',
        animation: disabled ? 'none' : `shine var(--shiny-animation-duration) linear infinite`,
      }}
    >
      <style>
        {`
          @keyframes shine {
            0% {
              background-position: 100% 50%;
            }
            100% {
              background-position: -100% 50%;
            }
          }
          .shiny-text.disabled {
            background-image: none;
            color: inherit;
          }
        `}
      </style>
      {text}
    </div>
  );
};

export default ShinyText;
