// export const parentVaraints = (delay = 0.1, staggerChildren = 0.2) => ({
//   initial: { opacity: 0, y: '-100%' },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: { type: 'spring', mass: 0.1, damping: 8, when: 'beforeChildren', staggerChildren, delay },
//   },
// });
// export const childVariants = (delay = 0.1) => ({
//   initial: { opacity: 0, y: '20%' },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: { type: 'spring', mass: 0.4, damping: 8, duration: 0.1, ease: 'easeInOut', delay },
//   },
// });

export const animationVariants = {
  fadeIn: {
    parent: (duration = 0.2, delay = 0, staggerChildren = 0.2) => ({
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration, when: 'beforeChildren', staggerChildren, delay } },
      exit: { opacity: 0, transition: { duration: 0.4 } },
    }),

    child: (delay = 0.2) => ({
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.5, delay: delay * 0.1 } },
      exit: { opacity: 0, transition: { duration: 0.4 } },
    }),
  },

  fadeInUp: {
    parent: (delay = 1, staggerChildren = 2) => ({
      initial: { opacity: 0, y: 50 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
          when: 'beforeChildren',
          staggerChildren: staggerChildren * 0.1,
          delay: delay * 0.1,
        },
      },
      exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: 'easeIn' } },
    }),
    child: (delay = 1) => ({
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut', delay: delay * 0.1 } },
      exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: 'easeIn' } },
    }),
  },

  fadeInDown: {
    parent: (delay = 1, staggerChildren = 2) => ({
      initial: { opacity: 0, y: -50 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          when: 'beforeChildren',
          staggerChildren: staggerChildren * 0.1,
          delay: delay * 0.1,
        },
      },
      exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: 'easeIn' } },
    }),
    child: (delay = 1) => ({
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: delay * 0.1 } },
      exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: 'easeIn' } },
    }),
  },

  bounceInUp: {
    parent: (delay = 1, staggerChildren = 2) => ({
      initial: { opacity: 0, y: '-100%' },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          mass: 0.1,
          damping: 8,
          when: 'beforeChildren',
          staggerChildren: staggerChildren * 0.1,
          delay: delay * 0.1,
        },
      },
    }),

    child: (delay = 1) => ({
      initial: { opacity: 0, y: '20%' },
      animate: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', mass: 0.4, damping: 8, duration: 0.1, ease: 'easeInOut', delay: delay * 0.1 },
      },
    }),
  },

  bounceInDown: {
    paren: (delay = 1, staggerChildren = 2) => ({
      initial: { opacity: 0, y: -100 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 20,
          when: 'beforeChildren',
          staggerChildren: staggerChildren * 0.1,
          delay: delay * 0.1,
        },
      },
      exit: { opacity: 0, y: -100, transition: { duration: 0.6 } },
    }),
    child: (delay = 1) => ({
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 20, delay: delay * 0.1 } },
      exit: { opacity: 0, y: -100, transition: { duration: 0.6 } },
    }),
  },
  slideIn: {
    parent: (delay = 2, staggerChildren = 2) => ({
      initial: { x: '-100%' },
      animate: {
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 120,
          when: 'beforeChildren',
          staggerChildren: staggerChildren * 0.1,
          delay: delay * 0.1,
        },
      },
      exit: { x: '100%', transition: { ease: 'easeInOut' } },
    }),
    child: (delay = 1) => ({
      initial: { x: '-100%' },
      animate: { x: 0, transition: { type: 'spring', stiffness: 120, delay: delay * 0.1 } },
      exit: { x: '100%', transition: { ease: 'easeInOut' } },
    }),
  },
  slideInUp: {
    parent: (delay = 1, staggerChildren = 2) => ({
      initial: { opacity: 0, y: '100%' },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 120,
          when: 'beforeChildren',
          staggerChildren: staggerChildren * 0.1,
          delay: delay * 0.1,
        },
      },
      exit: { y: '100%', transition: { ease: 'easeInOut' } },
    }),
    child: (delay = 1) => ({
      initial: { opacity: 0, y: '100%' },
      animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, delay: delay * 0.1 } },
      exit: { y: '100%', transition: { ease: 'easeInOut' } },
    }),
  },
  slideInDown: {
    parent: (delay = 1, staggerChildren = 2) => ({
      initial: { y: '-100%' },
      animate: {
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 120,
          when: 'beforeChildren',
          staggerChildren: staggerChildren * 0.1,
          delay: delay * 0.1,
        },
      },
      exit: { y: '-100%', transition: { ease: 'easeInOut' } },
    }),
    child: (delay = 1) => ({
      initial: { y: '-100%' },
      animate: { y: 0, transition: { type: 'spring', stiffness: 120, delay: delay * 0.1 } },
      exit: { y: '-100%', transition: { ease: 'easeInOut' } },
    }),
  },
};
