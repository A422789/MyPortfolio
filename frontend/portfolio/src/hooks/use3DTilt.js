import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Custom hook for smooth GPU-accelerated 3D Card Tilt physics.
 * Eliminates duplicate calculations across project & certificate cards.
 */
export const use3DTilt = ({ maxTilt = 15, stiffness = 300, damping = 20 } = {}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness, damping });
  const mouseYSpring = useSpring(y, { stiffness, damping });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
  };
};
