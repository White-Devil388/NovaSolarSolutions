import React, { useEffect, useState } from 'react';

const CountUp = ({ to, from = 0, duration = 1.5, formatter, delay = 0 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrame;
    let timeout;
    
    if (to === count) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // ease-out 
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(from + (to - from) * easeOut);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    if (delay > 0) {
      timeout = setTimeout(() => {
        animationFrame = window.requestAnimationFrame(step);
      }, delay * 1000);
    } else {
      animationFrame = window.requestAnimationFrame(step);
    }

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (timeout) clearTimeout(timeout);
    };
  }, [to, from, duration, delay]);

  return <span>{formatter ? formatter(count) : Math.round(count)}</span>;
};

export default CountUp;
