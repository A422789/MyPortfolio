import React from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '../../hooks/use3DTilt';

/**
 * Reusable GPU-accelerated 3D Tilt Card wrapper.
 */
const TiltCard = ({ children, className = '', maxTilt = 15 }) => {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt({ maxTilt });

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full bg-white/5 rounded-4xl backdrop-blur-3xl p-6 flex flex-col gap-4 transform-gpu border border-white/10 hover:border-[#cea605]/30 transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
