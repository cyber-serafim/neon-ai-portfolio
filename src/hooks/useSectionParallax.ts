import { useEffect, useState, useRef, RefObject } from 'react';

interface SectionParallaxOptions {
  speed?: number;
  scale?: boolean;
  fade?: boolean;
}

interface SectionParallaxResult {
  ref: RefObject<HTMLElement>;
  style: React.CSSProperties;
  isInView: boolean;
}

export const useSectionParallax = (options: SectionParallaxOptions = {}): SectionParallaxResult => {
  const { speed = 0.1, scale = true, fade = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the viewport the element is
      // -1 when element is fully below viewport, 0 when centered, 1 when fully above
      const centerOffset = rect.top + rect.height / 2 - windowHeight / 2;
      const progress = centerOffset / (windowHeight / 2 + rect.height / 2);
      
      setScrollProgress(Math.max(-1, Math.min(1, progress)));
      
      // Check if element is in view
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsInView(inView);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Calculate parallax transform
  const translateY = scrollProgress * speed * 100;
  
  // Scale: 1 when in center, slightly smaller when entering/leaving
  const scaleValue = scale ? 1 - Math.abs(scrollProgress) * 0.03 : 1;
  
  // Opacity: 1 when in center, fade when entering/leaving
  const opacity = fade ? 1 - Math.abs(scrollProgress) * 0.3 : 1;

  const style: React.CSSProperties = {
    transform: `translateY(${translateY}px) scale(${scaleValue})`,
    opacity: Math.max(0.7, opacity),
    transition: 'opacity 0.3s ease-out',
    willChange: 'transform, opacity',
  };

  return { ref, style, isInView };
};
