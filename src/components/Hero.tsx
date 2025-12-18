"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Hero = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation hook

  return (
    <section className="relative h-[100dvh] sm:h-screen flex items-start justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Educate Me Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50 backdrop-blur-[1px]"></div>
      </div>

      {/* Glow Circle (hidden on mobile) */}
      <div className="hidden sm:block absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center flex flex-col items-center h-full justify-center sm:justify-start pt-0 sm:pt-32">
        {/* Heading */}
        <h1 className="text-5xl xs:text-6xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold leading-tight text-white drop-shadow-md mb-5 sm:mb-6 animate-fade-in [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
          Transforming <br className="hidden sm:block" />
          <span className="text-primary">Ambition</span> Into Achievement
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-xl text-white/90 max-w-lg sm:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-in [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
          Empowering learners to grow, lead, and succeed with skills, confidence, and mindset to shape a brighter future.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in [animation-delay:0.6s] opacity-0 [animation-fill-mode:forwards]">
          <Button
            size="lg"
            onClick={() => navigate("/session")} // ✅ Navigate to /session
            className="group font-semibold text-lg mb-4 sm:text-lg px-10 py-6 sm:px-8 sm:py-4 w-full sm:w-auto shadow-lg sm:shadow-xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
          
            size="lg"
            variant="outline"
            onClick={() => navigate("/explore")} // ✅ Navigate to /explore
            className="w-full sm:w-auto font-semibold text-lg -mt-4 sm:text-lg px-10 py-4 sm:px-8 sm:py-4 border border-white/40 text-black hover:bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;