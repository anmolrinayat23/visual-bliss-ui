import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Compass, Award, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Services = ({ showFooter = true }) => {
  const services = [
    {
      icon: Lightbulb,
      title: "Student Counselling",
      description: "Personalized one-on-one sessions to address academic pressures, personal challenges, and career uncertainties.",
      button: "Book Session",
      buttonVariant: "default" as const,
    },
    {
      icon: Compass,
      title: "Student Guidance",
      description: "Expert advice on course selection, trending career paths, and creating your success roadmap.",
      button: "Get Guidance",
      buttonVariant: "outline" as const,
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Boost your resume with industry-recognized certifications to enhance your skills and career prospects.",
      button: "Explore",
      buttonVariant: "outline" as const,
    },
    {
      icon: GraduationCap,
      title: "Admissions",
      description: "Navigate admissions with expert assistance from application strategies to interview preparation.",
      button: "Apply Now",
      buttonVariant: "default" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="pt-16">
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Our Services
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive support for every stage of your educational journey.
                Achieve your academic and career goals with our expert guidance.
              </p>
            </motion.div>

            {/* Service Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group hover:scale-105">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                        <service.icon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant={service.buttonVariant}
                      className="w-full mt-4 group-hover:shadow-md transition-all duration-300"
                      size="lg"
                    >
                      {service.button}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Services;