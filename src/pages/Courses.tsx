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
    <div className="min-h-screen bg-vision-bg">
      <Header />
      <main className="pt-16">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6">Courses Offered</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover your path to success. We offer a wide range of undergraduate and postgraduate programs designed to nurture your talents and prepare you for the future.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="p-6 bg-background text-center flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{course.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-fit mx-auto">
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
