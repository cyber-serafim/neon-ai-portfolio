import { useEffect, useState } from 'react';

export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParallaxStyle = (speed: number = 0.5, direction: 'up' | 'down' = 'up') => {
    const offset = direction === 'up' ? -scrollY * speed : scrollY * speed;
    return {
      transform: `translateY(${offset}px)`,
    };
  };

  return { scrollY, getParallaxStyle };
};
