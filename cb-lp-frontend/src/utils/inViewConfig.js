import { useInView } from 'framer-motion';

export const inViewOptions = {
  threshold: 0.2,
  triggerOnce: true,
  rootMargin: '-50px 0px',
};

export const useInViewAnimation = (animationVariants) => {
  const [ref, inView] = useInView(inViewOptions);

  const animate = inView ? 'visible' : 'hidden';

  return { ref, animate, animationVariants };
};
