import { useEffect, useState } from "react";

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-hero-dark via-primary/20 to-hero-dark overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-spin-slow" />
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-flow" />

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Advanced spinning logo animation */}
        <div className="relative w-32 h-32">
          {/* Outer rotating rings */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary/50 rounded-full animate-spin" />
          <div className="absolute inset-2 border-4 border-transparent border-b-accent border-l-accent/50 rounded-full animate-spin-reverse" />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-4 border-2 border-primary/30 rounded-full animate-pulse-ring" />
          
          {/* Inner glowing core */}
          <div className="absolute inset-8 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-primary rounded-full animate-glow shadow-glow" />
          </div>

          {/* Center sparkle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-background rounded-full animate-sparkle" />
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-glow" />
          </div>
          <div className="absolute inset-0 animate-spin-reverse" style={{ animationDelay: "0.5s" }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full shadow-glow" />
          </div>
        </div>

        {/* Brand text with animated gradient */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-flow">
            Educate Me
          </h2>
          <p className="text-sm text-white/80 animate-fade-in-up">Preparing your journey to success...</p>
        </div>

        {/* Enhanced loading dots with wave animation */}
        <div className="flex gap-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-wave shadow-glow" />
          <div className="w-3 h-3 bg-primary rounded-full animate-wave shadow-glow" style={{ animationDelay: "0.2s" }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-wave shadow-glow" style={{ animationDelay: "0.4s" }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-wave shadow-glow" style={{ animationDelay: "0.6s" }} />
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent animate-progress rounded-full shadow-glow" />
        </div>
      </div>
    </div>
  );
};

export default Loader;