import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Compass, Award, GraduationCap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Lightbulb,
      title: "Student Counselling",
      description: "Personalized one-on-one sessions to address academic pressures, personal challenges, and career uncertainties, ensuring your well-being.",
      button: "Book a Counselling Session",
      buttonVariant: "default" as const,
      tags: []
    },
    {
      icon: Compass,
      title: "Student Guidance",
      description: "Get expert advice on course selection, trending career paths, and creating a roadmap for your future academic and professional success.",
      button: null,
      buttonVariant: "outline" as const,
      tags: ["Course Guide", "Trending", "Career"]
    },
    {
      icon: Award,
      title: "Important Certifications",
      description: "Boost your resume with industry-recognized certifications. We guide you to the most valuable credentials to enhance your skills and career prospects.",
      button: "Explore Certifications",
      buttonVariant: "outline" as const,
      tags: []
    },
    {
      icon: GraduationCap,
      title: "Student Admissions",
      description: "Navigate the complex admissions process with our expert assistance. From application strategies to interview prep, we're with you until you're accepted.",
      button: "Fill EM-MAT Form",
      buttonVariant: "default" as const,
      tags: []
    }
  ];

  return (
    <div className="min-h-screen bg-vision-bg">
      <Header />
      <main className="pt-16">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive suite of services designed to support students at every stage of their educational journey. From personalized counselling to expert guidance, we're here to help you achieve your academic and career goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="p-8 bg-background">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                  </div>
                  
                  {service.tags.length > 0 && (
                    <div className="flex gap-4 mb-6">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="text-sm font-medium text-foreground">{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  {service.button && (
                    <Button 
                      variant={service.buttonVariant} 
                      className="w-full"
                      size="lg"
                    >
                      {service.button}
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
