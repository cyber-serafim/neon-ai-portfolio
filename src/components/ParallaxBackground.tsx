import { useParallax } from '@/hooks/useParallax';

const ParallaxBackground = () => {
  const { getParallaxStyle } = useParallax();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Large floating orbs */}
      <div 
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-neon-cyan/5 blur-[120px]"
        style={getParallaxStyle(0.15)}
      />
      <div 
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-neon-magenta/5 blur-[150px]"
        style={getParallaxStyle(0.2)}
      />
      <div 
        className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-neon-green/5 blur-[100px]"
        style={getParallaxStyle(0.25)}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-cyan/3 blur-[130px]"
        style={getParallaxStyle(0.1)}
      />

      {/* Floating geometric shapes */}
      <div 
        className="absolute top-[15%] left-[10%] w-4 h-4 border border-neon-cyan/20 rotate-45"
        style={getParallaxStyle(0.4)}
      />
      <div 
        className="absolute top-[25%] right-[15%] w-6 h-6 border border-neon-magenta/20 rotate-12"
        style={getParallaxStyle(0.35)}
      />
      <div 
        className="absolute top-[45%] left-[5%] w-3 h-3 bg-neon-cyan/10 rotate-45"
        style={getParallaxStyle(0.5)}
      />
      <div 
        className="absolute top-[55%] right-[8%] w-5 h-5 border border-neon-green/20 rounded-full"
        style={getParallaxStyle(0.3)}
      />
      <div 
        className="absolute top-[70%] left-[12%] w-4 h-4 border border-neon-magenta/15 rotate-45"
        style={getParallaxStyle(0.45)}
      />
      <div 
        className="absolute top-[80%] right-[20%] w-6 h-6 border border-neon-cyan/15"
        style={getParallaxStyle(0.25)}
      />

      {/* Floating lines */}
      <div 
        className="absolute top-[20%] left-[25%] w-24 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
        style={getParallaxStyle(0.3)}
      />
      <div 
        className="absolute top-[40%] right-[30%] w-32 h-px bg-gradient-to-r from-transparent via-neon-magenta/15 to-transparent rotate-45"
        style={getParallaxStyle(0.35)}
      />
      <div 
        className="absolute top-[60%] left-[35%] w-20 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent -rotate-12"
        style={getParallaxStyle(0.4)}
      />
      <div 
        className="absolute top-[75%] right-[25%] w-28 h-px bg-gradient-to-r from-transparent via-neon-cyan/15 to-transparent rotate-6"
        style={getParallaxStyle(0.28)}
      />

      {/* Floating dots cluster */}
      <div style={getParallaxStyle(0.5)}>
        <div className="absolute top-[30%] right-[40%] w-1.5 h-1.5 bg-neon-cyan/30 rounded-full" />
        <div className="absolute top-[31%] right-[41%] w-1 h-1 bg-neon-cyan/20 rounded-full" />
        <div className="absolute top-[29%] right-[39%] w-1 h-1 bg-neon-cyan/25 rounded-full" />
      </div>
      <div style={getParallaxStyle(0.45)}>
        <div className="absolute top-[65%] left-[45%] w-1.5 h-1.5 bg-neon-magenta/30 rounded-full" />
        <div className="absolute top-[66%] left-[46%] w-1 h-1 bg-neon-magenta/20 rounded-full" />
        <div className="absolute top-[64%] left-[44%] w-1 h-1 bg-neon-magenta/25 rounded-full" />
      </div>

      {/* Corner accents */}
      <div 
        className="absolute top-10 left-10 w-32 h-32 border-l border-t border-neon-cyan/10"
        style={getParallaxStyle(0.1)}
      />
      <div 
        className="absolute top-10 right-10 w-32 h-32 border-r border-t border-neon-magenta/10"
        style={getParallaxStyle(0.12)}
      />
      <div 
        className="absolute bottom-10 left-10 w-32 h-32 border-l border-b border-neon-magenta/10"
        style={getParallaxStyle(0.08, 'down')}
      />
      <div 
        className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-neon-cyan/10"
        style={getParallaxStyle(0.1, 'down')}
      />
    </div>
  );
};

export default ParallaxBackground;
