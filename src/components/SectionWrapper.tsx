import { ReactNode } from 'react';
import { useSectionParallax } from '@/hooks/useSectionParallax';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  parallaxSpeed?: number;
  enableScale?: boolean;
  enableFade?: boolean;
}

export const SectionWrapper = ({
  children,
  id,
  className,
  parallaxSpeed = 0.08,
  enableScale = true,
  enableFade = true,
}: SectionWrapperProps) => {
  const { ref, style, isInView } = useSectionParallax({
    speed: parallaxSpeed,
    scale: enableScale,
    fade: enableFade,
  });

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={cn('relative', className)}
      style={style}
      data-in-view={isInView}
    >
      {/* Section transition gradient - top */}
      <div 
        className="absolute inset-x-0 top-0 h-24 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)), transparent)',
        }}
      />
      
      {children}
      
      {/* Section transition gradient - bottom */}
      <div 
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to top, hsl(var(--background)), transparent)',
        }}
      />
    </section>
  );
};
