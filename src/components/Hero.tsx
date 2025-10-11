import heroCircles from "@/assets/hero-circles.png";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] bg-hero-dark flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={heroCircles} 
          alt="" 
          className="w-[600px] h-[600px] object-contain opacity-80"
        />
      </div>

      <div className="container relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Where Potential Becomes Progress
        </h1>
        <p className="text-lg text-white/80 max-w-md mx-auto">
          Brand film will play here
        </p>
      </div>
    </section>
  );
};

export default Hero;
