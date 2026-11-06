import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const elements = { div: motion.div, section: motion.section, article: motion.article, header: motion.header, h1: motion.h1, h2: motion.h2, p: motion.p };

// HTML starts visible. Only offscreen elements opt into a reveal after an observer measurement.
export default function Reveal({ as = 'div', initial, animate, whileInView, viewport, ...props }) {
  const element = useRef(null);
  const [visible, setVisible] = useState(null);
  const reducedMotion = useReducedMotion();
  const amount = typeof viewport?.amount === 'number' ? viewport.amount : 0.1;
  const once = viewport?.once !== false;
  const hasInitial = Boolean(initial);
  useEffect(() => {
    if (!hasInitial || reducedMotion || !globalThis.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting && once) observer.disconnect();
    }, { threshold: amount });
    observer.observe(element.current);
    return () => observer.disconnect();
  }, [amount, once, reducedMotion, hasInitial]);

  const Element = elements[as];
  const target = visible === false && !reducedMotion ? initial : { opacity: 1, x: 0, y: 0, scale: 1, ...whileInView, ...animate };
  return <Element ref={element} initial={false} animate={target} {...props} />;
}
