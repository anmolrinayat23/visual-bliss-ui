const Vision = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-vision-bg to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground animate-fade-in">
          Our Vision
        </h2>
        
        <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border border-primary/10">
          <p className="text-center text-foreground/80 text-lg leading-relaxed mb-8 animate-fade-in [animation-delay:0.2s]">
            At Educate Me, our vision is to create a truly student-centric ecosystem, where every student
            has access to quality education and personalized guidance. We strive to empower students to
            unlock their full potential and achieve their academic and career aspirations.
          </p>

          <div className="relative">
            <div className="absolute -left-4 top-0 text-6xl text-primary/20">"</div>
            <p className="text-center text-primary text-xl md:text-2xl font-semibold italic animate-fade-in [animation-delay:0.4s] px-8">
              Opening doors to quality education for every deserving student.
            </p>
            <div className="absolute -right-4 bottom-0 text-6xl text-primary/20">"</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
