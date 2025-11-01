"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Compass, Award, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ import navigation

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Services = ({ showFooter = true }) => {
  const navigate = useNavigate(); 

  const services = [
    {
      icon: Lightbulb,
      title: "Expert feedback",
      description:
        "Educate-Me offers students exclusive access to an extensive network of distinguished guest faculty, comprising doctoral experts from renowned institutions Pan India",
      button: "Apply link",
      buttonVariant: "default" as const,
      link: "/em-mat", // ✅ navigate here on click
    },
    {
      icon: Compass,
      title: "Student Couselling",
      description:
        "At EducateMe, students get 1-on-1 mentorship, expert course guidance, and career counseling to make informed academic and career choices.",
      button: "Get Guidance",
      buttonVariant: "outline" as const,
      link: "/session", // optional — you can leave null if not needed
    },
    {
      icon: Award,
      title: "Certifications",
      description:
        "Earn essential certificates to master the basics, gain program-specific skills, and boost your resume—all while preparing to excel in your chosen domain from admissions itself.",
      button: "Explore",
      buttonVariant: "outline" as const,
      link: "/em-mat",
    },
    {
      icon: GraduationCap,
      title: "Admissions",
      description:
        "EM MAT by EducateMe is a specialized test assessing students for ideal course and career choices, offering access to top institutions, scholarships, mentorship, campus guidance, and personalized insights.",
      button: "Apply Now",
      buttonVariant: "default" as const,
      link: "/em-mat",
    },
  ];

  return (
    <div className="min-h-100 bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="pt-10">
        <section className="py-12 md:py-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-gray-900">
                Our Services
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6"
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-4 sm:p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group hover:scale-105">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                        <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant={service.buttonVariant}
                      className="w-full mt-3 sm:mt-4 group-hover:shadow-md transition-all duration-300 text-sm sm:text-base"
                      size="sm"
                      onClick={() => navigate(service.link)} // ✅ navigate on click
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
