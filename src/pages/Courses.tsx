import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Courses = ({showFooter=true}) => {
  const courses = [
    {
      title: "B.Tech",
      description: "Engineering principles and technological innovation.",
      buttonText: "Learn More"
    },
    {
      title: "BBA",
      description: "Fundamentals of business management and leadership.",
      buttonText: "Learn More"
    },
    {
      title: "BA",
      description: "Exploration of humanities, arts, and social sciences.",
      buttonText: "Learn More"
    },
    {
      title: "Liberal Arts",
      description: "Interdisciplinary studies for critical thinking.",
      buttonText: "Learn More"
    },
    {
      title: "Law",
      description: "Legal studies for justice and advocacy.",
      buttonText: "Learn More"
    },
    {
      title: "B.Com",
      description: "Commerce, finance, and accounting expertise.",
      buttonText: "Learn More"
    },
    {
      title: "B.Sc",
      description: "Scientific inquiry and research foundation.",
      buttonText: "Learn More"
    },
    {
      title: "BCA",
      description: "Computer applications and software development.",
      buttonText: "Learn More"
    },
    {
      title: "MCA",
      description: "Advanced concepts in computer applications.",
      buttonText: "Apply Now"
    },
    {
      title: "PGDM",
      description: "Postgraduate diploma in management studies.",
      buttonText: "Apply Now"
    },
    {
      title: "MA",
      description: "Master of Arts in various specializations.",
      buttonText: "Apply Now"
    },
    {
      title: "M.Tech",
      description: "Master of Technology for advanced engineering.",
      buttonText: "Apply Now"
    },
    {
      title: "Designing",
      description: "Creative design in fashion, graphics, and more.",
      buttonText: "Learn More"
    },
    {
      title: "Architecture",
      description: "Designing buildings and structural systems.",
      buttonText: "Learn More"
    },
    {
      title: "BMS",
      description: "Bachelor of Management Studies.",
      buttonText: "Learn More"
    },
    {
      title: "BPT",
      description: "Bachelor of Physiotherapy program.",
      buttonText: "Learn More"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-vision-bg to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <Header />
      <main className="pt-16 relative z-10">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Courses Offered
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover your path to success. We offer a wide range of undergraduate and postgraduate programs designed to nurture your talents and prepare you for the future.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <Card 
                  key={index} 
                  className="p-6 bg-background text-center flex flex-col justify-between group hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-border hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <span className="text-2xl font-bold text-primary">
                        {course.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">{course.description}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-fit mx-auto hover:scale-110 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    {course.buttonText}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
     {showFooter && <Footer />}
    </div>
  );
};

export default Courses;
