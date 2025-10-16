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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-hero-dark via-primary/20 to-hero-dark animate-fade-in">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Spinning logo animation */}
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse shadow-glow" />
          </div>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-background rounded-full" />
          </div>
        </div>

        {/* Brand text with gradient */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            Educate Me
          </h2>
          <p className="text-sm text-white/70 animate-fade-in">Loading your journey to success...</p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
