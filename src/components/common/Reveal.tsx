import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}

export const STAGGER_STEP = 0.07;

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = '',
  as = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = as === 'li' ? motion.li : motion.div;

  return (
    <MotionComponent
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 0.9, 0.28, 1],
      }}
    >
      {children}
    </MotionComponent>
  );
};
