import heroCircles from "@/assets/hero-circles.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-hero-dark to-primary/5 flex items-center justify-center overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={heroCircles} 
          alt="" 
          className="w-[600px] h-[600px] object-contain opacity-80 animate-[spin_40s_linear_infinite]"
        />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent/20 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary/40 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-accent/30 rounded-full animate-pulse"></div>
      </div>

      <div className="container relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
          Where Potential Becomes{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Progress
          </span>
        </h1>
        <p className="text-lg text-white/90 max-w-md mx-auto mb-8 animate-fade-in [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
          Empowering students to unlock their full potential through quality education and personalized guidance
        </p>
        <div className="flex gap-4 justify-center animate-fade-in [animation-delay:0.6s] opacity-0 [animation-fill-mode:forwards]">
          <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
