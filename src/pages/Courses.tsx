import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

// Animation wrapper component
const AnimatedCard = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Courses = ({ showFooter = true }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const courses = [
    {
      title: "MBA",
      description: "Master of Business Administration for strategic leadership and advanced management skills.",
      buttonText: "Apply Now",
      category: "Management",
    },
    {
      title: "B.Tech",
      description: "Engineering program with hands-on learning in AI, data science, electronics, and mechanical systems.",
      buttonText: "Apply Now",
      category: "Engineering",
    },
    {
      title: "BBA",
      description: "Business administration program focusing on global markets, management strategies, and entrepreneurship.",
      buttonText: "Apply Now",
      category: "Management",
    },
    {
      title: "BA",
      description: "Arts program nurturing analytical thinking and communication skills for media, education, and civil services.",
      buttonText: "Apply Now",
      category: "Arts",
    },
    {
      title: "Liberal Arts",
      description: "Interdisciplinary program integrating philosophy, literature, sociology, and science for creative thinkers.",
      buttonText: "Apply Now",
      category: "Arts",
    },
    {
      title: "Law",
      description: "Legal studies program with moot courts and internships for constitutional, civil, and corporate law.",
      buttonText: "Apply Now",
      category: "Law",
    },
    {
      title: "B.Com",
      description: "Commerce degree for accounting, finance, taxation, and business analytics careers.",
      buttonText: "Apply Now",
      category: "Commerce",
    },
    {
      title: "B.Sc",
      description: "Science program fostering scientific temperament through physics, chemistry, biology, and computer science.",
      buttonText: "Apply Now",
      category: "Science",
    },
    {
      title: "BCA",
      description: "IT program developing expertise in programming, software design, and database management.",
      buttonText: "Apply Now",
      category: "Computer",
    },
    {
      title: "MCA",
      description: "Advanced computing program with AI, machine learning, cybersecurity, and full-stack development.",
      buttonText: "Apply Now",
      category: "Computer",
    },
    {
      title: "PGDM",
      description: "Management program bridging theory with practice through case-based learning and leadership workshops.",
      buttonText: "Apply Now",
      category: "Management",
    },
    {
      title: "MA",
      description: "Advanced arts program emphasizing research and critical thinking for academic and creative professions.",
      buttonText: "Apply Now",
      category: "Arts",
    },
    {
      title: "M.Tech",
      description: "Advanced engineering training with specialized coursework and research projects for technological innovation.",
      buttonText: "Apply Now",
      category: "Engineering",
    },
    {
      title: "Designing",
      description: "Creative program for fashion, interior, and graphic design with focus on visual communication.",
      buttonText: "Apply Now",
      category: "Design",
    },
    {
      title: "Architecture",
      description: "Program integrating creativity, technology, and sustainability for urban planning and environmental design.",
      buttonText: "Apply Now",
      category: "Design",
    },
    {
      title: "BMS",
      description: "Management studies foundation for organizational behavior, marketing, and strategic management.",
      buttonText: "Apply Now",
      category: "Management",
    },
    {
      title: "BPT",
      description: "Physiotherapy program focusing on movement science, rehabilitation, and therapeutic practices.",
      buttonText: "Apply Now",
      category: "Medical",
    },
  ];

  // Get unique categories for filtering
  const categories = ["All", ...new Set(courses.map(course => course.category))];

  // Filter courses based on selected category
  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="">
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Courses Offered
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Discover your path to success with our comprehensive range of undergraduate and postgraduate programs.
              </p>
              
              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course, index) => (
                <AnimatedCard key={index} delay={index * 100}>
                  <Card className="p-6 bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 group hover:shadow-lg h-full flex flex-col cursor-pointer">
                    {/* Course Icon - Centered */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-xl font-bold text-orange-500">
                          {course.title.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Course Category */}
                    <div className="mb-3 text-center">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 text-center group-hover:text-blue-600 transition-colors duration-300">
                      {course.title}
                    </h3>

                    {/* Course Description */}
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow text-center">
                      {course.description}
                    </p>

                    {/* Action Button - Orange Only */}
                    <div className="mt-auto">
                      <Button
                        size="sm"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        {course.buttonText}
                      </Button>


                    </div>

                    
                  </Card>
                </AnimatedCard>
              ))}
            </div>

            {/* Show message if no courses found */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No courses found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Courses;