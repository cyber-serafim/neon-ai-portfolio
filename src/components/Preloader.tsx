import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onComplete: () => void;
  minDuration?: number;
}

const Preloader = ({ onComplete, minDuration = 2000 }: PreloaderProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, minDuration);

    return () => clearTimeout(timer);
  }, [onComplete, minDuration]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500",
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-neon-cyan/20 blur-[100px] animate-pulse" />
      <div className="absolute w-64 h-64 rounded-full bg-neon-magenta/20 blur-[80px] animate-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Logo container */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Spinning ring */}
        <div className="absolute w-48 h-48 rounded-full border-2 border-neon-cyan/30 animate-spin" style={{ animationDuration: '3s' }} />
        <div className="absolute w-44 h-44 rounded-full border border-neon-magenta/20 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
        
        {/* Logo text with neon effect */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <span 
              className="text-6xl md:text-7xl font-orbitron font-bold tracking-wider"
              style={{
                color: 'hsl(var(--neon-cyan))',
                textShadow: `
                  0 0 10px hsl(var(--neon-cyan)),
                  0 0 20px hsl(var(--neon-cyan)),
                  0 0 40px hsl(var(--neon-cyan)),
                  0 0 80px hsl(var(--neon-cyan))
                `,
                animation: 'neon-flicker 2s ease-in-out infinite'
              }}
            >
              AP
            </span>
            
            {/* Glitch effect layers */}
            <span 
              className="absolute inset-0 text-6xl md:text-7xl font-orbitron font-bold tracking-wider opacity-0"
              style={{
                color: 'hsl(var(--neon-magenta))',
                textShadow: `0 0 20px hsl(var(--neon-magenta))`,
                animation: 'glitch-1 0.3s ease-in-out infinite'
              }}
            >
              AP
            </span>
            <span 
              className="absolute inset-0 text-6xl md:text-7xl font-orbitron font-bold tracking-wider opacity-0"
              style={{
                color: 'hsl(var(--neon-green))',
                textShadow: `0 0 20px hsl(var(--neon-green))`,
                animation: 'glitch-2 0.3s ease-in-out infinite'
              }}
            >
              AP
            </span>
          </div>

          {/* Loading bar */}
          <div className="mt-8 w-48 h-1 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)), hsl(var(--neon-green)))',
                animation: 'loading-bar 2s ease-out forwards'
              }}
            />
          </div>

          {/* Loading text */}
          <p 
            className="mt-4 text-sm font-rajdhani tracking-[0.3em] uppercase text-muted-foreground"
            style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
          >
            Initializing...
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-neon-cyan/50" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-neon-magenta/50" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-neon-magenta/50" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-neon-cyan/50" />

      <style>{`
        @keyframes neon-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          96% { opacity: 0.9; }
          97% { opacity: 1; }
        }

        @keyframes glitch-1 {
          0%, 90%, 100% { opacity: 0; transform: translate(0); }
          91% { opacity: 0.8; transform: translate(-2px, 1px); }
          93% { opacity: 0; transform: translate(0); }
        }

        @keyframes glitch-2 {
          0%, 94%, 100% { opacity: 0; transform: translate(0); }
          95% { opacity: 0.8; transform: translate(2px, -1px); }
          97% { opacity: 0; transform: translate(0); }
        }

        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
