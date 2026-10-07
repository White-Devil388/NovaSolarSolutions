import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BlurText = ({ text = '', delay = 0.04, className = '', stagger = 'word' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const items = stagger === 'word' ? text.split(' ') : text.split('');

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 15 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'inline-block', marginRight: stagger === 'word' ? '0.25em' : '0' }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
