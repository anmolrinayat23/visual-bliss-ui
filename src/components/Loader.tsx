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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with enhanced animation */}
        <div className="relative">
          {/* Rotating border */}
          <div className="absolute -inset-4 border-4 border-transparent border-t-orange-500 border-r-blue-500 rounded-full animate-spin" />
          <div className="absolute -inset-6 border-4 border-transparent border-b-orange-400 border-l-blue-400 rounded-full animate-spin-reverse" />
          
          {/* Logo container */}
          <div className="relative rounded-full  w-32 h-32 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center p-4 border border-white/50">
            <img 
              src="/logo.png" 
              alt="Educate Me Logo" 
              className="w-full h-full object-contain animate-scale-pulse"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const nextSibling = target.nextSibling as HTMLElement;
                if (nextSibling) {
                  target.style.display = 'none';
                  nextSibling.style.display = 'block';
                }
              }}
            />
            {/* Fallback text if logo doesn't load */}
            <div className="hidden text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                EM
              </div>
              <div className="text-xs text-gray-600 mt-1">Educate Me</div>
            </div>
          </div>

          {/* Floating dots around logo */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full animate-bounce shadow-lg" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-orange-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Brand text with enhanced animation */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-flow">
            Educate Me
          </h2>
          <p className="text-sm text-gray-600 font-medium animate-fade-in-up">
            Preparing your journey to success...
          </p>
        </div>

        {/* Enhanced loading bar */}
        <div className="w-80 bg-white/50 backdrop-blur-sm rounded-full p-1 border border-white/30 shadow-lg">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-orange-500 animate-progress rounded-full shadow-md" />
          </div>
        </div>

        {/* Percentage counter */}
        <div className="text-sm text-gray-500 font-medium animate-pulse">
          Loading... <span className="text-orange-500 font-bold">100%</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;