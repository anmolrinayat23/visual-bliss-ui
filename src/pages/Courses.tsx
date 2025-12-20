"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [sequenceMode, setSequenceMode] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [sequenceCourses, setSequenceCourses] = useState([]);
  const navigate = useNavigate();

  const courses = [
    {
      title: "MBA",
      description:
        "Master of Business Administration for strategic leadership and advanced management skills.",
      buttonText: "Apply Now",
      category: "Management",
      image: "/mba_new.jpeg"
    },
    {
      title: "PGDM",
      description:
        "Management program bridging theory with practice through case-based learning and leadership workshops.",
      buttonText: "Apply Now",
      category: "Management",
      image: "/pgdm_new.jpeg"
    },
    {
      title: "BBA",
      description:
        "Business administration program focusing on global markets, management strategies, and entrepreneurship.",
      buttonText: "Apply Now",
      category: "Management",
      image: "/bba_new.jpeg"
    },
    {
      title: "BA-LLB",
      description:
        "A comprehensive five-year integrated course combining liberal arts with legal studies to build skilled advocates with strong analytical foundations.",
      buttonText: "Apply Now",
      category: "LAW",
      image: "/bb.jpg"
    },
    {
      title: "BBA-LLB",
      description:
        "A dynamic legal program blending business acumen with legal expertise, preparing students for corporate, litigation, and policy careers.",
      buttonText: "Apply Now",
      category: "LAW",
      image: "/bba.jpg"
    },
    {
      title: "LLM",
      description:
        "Advanced legal education designed for graduates seeking specialization, research depth, and professional excellence in the legal domain.",
      buttonText: "Apply Now",
      category: "LAW",
      image: "/llm.jpg"
    },
    {
      title: "BA LIBERAL ARTS",
      description:
        "An interdisciplinary program that encourages intellectual curiosity, critical inquiry, and holistic development across humanities, social sciences, and modern disciplines.",
      buttonText: "Apply Now",
      category: "LIBERAL ARTS",
      image: "/art-law.png"
    },
    {
      title: "B.Com",
      description:
        "Commerce degree for accounting, finance, taxation, and business analytics careers.",
      buttonText: "Apply Now",
      category: "Commerce",
      image: "/bcom_new.jpeg"
    },
    {
      title: "Designing",
      description:
        "Creative program for fashion, interior, and graphic design with focus on visual communication.",
      buttonText: "Apply Now",
      category: "Design",
      image: "/bdesign_new.jpeg"
    },     
    {
      title: "M Design",
      description:
        "A postgraduate design pathway for innovators ready to push boundaries, explore emerging technologies, and shape tomorrow's user experiences.",
      buttonText: "Apply Now",
      category: "Design",
      image: "/m-d.jpg"
    },
    {
      title: "B.Tech",
      description:
        "Engineering program with hands-on learning in AI, data science, electronics, and mechanical systems.",
      buttonText: "Apply Now",
      category: "Engineering",
      image: "/btech_new.jpeg"
    },
    {
      title: "BA",
      description:
        "Arts program nurturing analytical thinking and communication skills for media, education, and civil services.",
      buttonText: "Apply Now",
      category: "Arts",
      image: "/ba_new.jpeg"
    },
    {
      title: "B.Sc",
      description:
        "Science program fostering scientific temperament through physics, chemistry, biology, and computer science.",
      buttonText: "Apply Now",
      category: "Sciences",
      image: "/BSC.png"
    },
    {
      title: "M.Sc",
      description:
        "A postgraduate science program focused on analytical skills, research excellence, and advanced scientific knowledge across specialized domains.",
      buttonText: "Apply Now",
      category: "Sciences",
      image: "/msc.jpg"
    },
    {
      title: "BCA",
      description:
        "IT program developing expertise in programming, software design, and database management.",
      buttonText: "Apply Now",
      category: "Computing",
      image: "/bca_new.jpeg"
    },
    {
      title: "MCA",
      description:
        "Advanced computing program with AI, machine learning, cybersecurity, and full-stack development.",
      buttonText: "Apply Now",
      category: "Computing",
      image: "/mca_new.jpeg"
    },
    {
      title: "MA",
      description:
        "Advanced arts program emphasizing research and critical thinking for academic and creative professions.",
      buttonText: "Apply Now",
      category: "Arts",
      image: "/ma_new.jpeg"
    },
    {
      title: "M.Tech",
      description:
        "Advanced engineering training with specialized coursework and research projects for technological innovation.",
      buttonText: "Apply Now",
      category: "Engineering",
      image: "/mtech_new.jpeg"
    },
    {
      title: "Architecture",
      description:
        "Program integrating creativity, technology, and sustainability for urban planning and environmental design.",
      buttonText: "Apply Now",
      category: "Design",
      image: "/barch_new.jpeg"
    },
    {
      title: "BMS",
      description:
        "Management studies foundation for organizational behavior, marketing, and strategic management.",
      buttonText: "Apply Now",
      category: "Management",
      image: "/bms_new.jpeg"
    },
    {
      title: "BPT",
      description:
        "Physiotherapy program focusing on movement science, rehabilitation, and therapeutic practices.",
      buttonText: "Apply Now",
      category: "Medical Science",
      image: "/bpt_new.jpeg"
    },
    {
      title: "BSc Nursing",
      description:
        "Undergraduate nursing program focusing on clinical skills, patient care, and healthcare practices.",
      buttonText: "Apply Now",
      category: "Medical Science",
      image: "/bscnursing_new.jpeg"
    },
  ];

  // Get unique categories for filtering
  const categories = ["All", ...new Set(courses.map((course) => course.category))];

  // Filter courses based on selected category
  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  // Handle title click for sequence mode
  const handleTitleClick = (course) => {
    if (sequenceMode) {
      // Add course to sequence if not already present
      if (!sequenceCourses.some(seqCourse => seqCourse.title === course.title)) {
        setSequenceCourses([...sequenceCourses, course]);
      }
    }
  };

  // Start sequence mode
  const startSequenceMode = () => {
    setSequenceMode(true);
    setSequenceCourses([]);
    setCurrentSequenceIndex(0);
  };

  // Exit sequence mode
  const exitSequenceMode = () => {
    setSequenceMode(false);
    setSequenceCourses([]);
    setCurrentSequenceIndex(0);
  };

  // Navigate to next course in sequence
  const nextCourse = () => {
    if (currentSequenceIndex < sequenceCourses.length - 1) {
      setCurrentSequenceIndex(currentSequenceIndex + 1);
    }
  };

  // Navigate to previous course in sequence
  const prevCourse = () => {
    if (currentSequenceIndex > 0) {
      setCurrentSequenceIndex(currentSequenceIndex - 1);
    }
  };

  // Display courses based on mode
  const displayCourses = sequenceMode && sequenceCourses.length > 0 
    ? [sequenceCourses[currentSequenceIndex]] 
    : filteredCourses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AnnouncementPopup />
      <Header />
      <main>
        <section className="py-12 mt-10 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl mt-8 md:text-5xl font-bold text-gray-900">
                  Courses Offered
                </h1>
                
                {/* Settings Button */}
                {/* <div className="relative">
                  <Button
                    onClick={sequenceMode ? exitSequenceMode : startSequenceMode}
                    className={`${
                      sequenceMode 
                        ? "bg-red-500 hover:bg-red-600" 
                        : "bg-gray-600 hover:bg-gray-700"
                    } text-white font-medium transition-all duration-300`}
                  >
                    {sequenceMode ? "Exit Sequence" : "Sequence Mode"}
                  </Button>
                  
                  {sequenceMode && (
                    <div className="absolute top-full right-0 mt-2 bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-10 min-w-48">
                      <p className="text-sm text-gray-600 mb-2">
                        Click on course titles to add them to sequence
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={prevCourse}
                          disabled={currentSequenceIndex === 0}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
                        >
                          Previous
                        </Button>
                        <Button
                          size="sm"
                          onClick={nextCourse}
                          disabled={currentSequenceIndex === sequenceCourses.length - 1}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
                        >
                          Next
                        </Button>
                      </div>
                      {sequenceCourses.length > 0 && (
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          {currentSequenceIndex + 1} of {sequenceCourses.length}
                        </p>
                      )}
                    </div>
                  )}
                </div> */}
              </div>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Discover your path to success with our comprehensive range of undergraduate and postgraduate programs.
              </p>

              {/* Sequence Mode Indicator */}
              {sequenceMode && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 font-medium">
                    Sequence Mode Active {sequenceCourses.length > 0 && `- ${sequenceCourses.length} course(s) in sequence`}
                  </p>
                  {sequenceCourses.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 justify-center">
                      {sequenceCourses.map((course, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded ${
                            index === currentSequenceIndex
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {course.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Category Filters - Hidden in sequence mode when courses are selected */}
              {!(sequenceMode && sequenceCourses.length > 0) && (
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
              )}
            </div>

            {/* Courses Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayCourses.map((course, index) => (
                <AnimatedCard key={index} delay={index * 100}>
                  <Card className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 group hover:shadow-lg h-full flex flex-col cursor-pointer overflow-hidden">
                    {/* Full Width Top Image */}
                    <div className="w-full h-22 bg-gray-200 overflow-hidden relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-48 ml-12 h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // If image fails to load, show gradient fallback
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {/* Fallback Gradient Background */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center"
                        style={{ display: course.image ? 'none' : 'flex' }}
                      >
                        <span className="text-4xl font-bold text-white">
                          {course.title.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Course Category */}
                      <div className="mb-3 text-center">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {course.category}
                        </span>
                      </div>

                      {/* Course Title - Clickable in sequence mode */}
                      <h3 
                        className={`text-lg font-bold mb-3 text-center group-hover:text-blue-600 transition-colors duration-300 ${
                          sequenceMode 
                            ? "cursor-pointer text-blue-700 hover:text-blue-800 underline" 
                            : "text-gray-900"
                        }`}
                        onClick={() => handleTitleClick(course)}
                      >
                        {course.title}
                        {sequenceMode && (
                          <span className="ml-2 text-xs text-green-600">
                            {sequenceCourses.some(seqCourse => seqCourse.title === course.title) 
                              ? "✓ Added" 
                              : "+ Click to add"}
                          </span>
                        )}
                      </h3>

                      {/* Course Description */}
                      <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow text-center">
                        {course.description}
                      </p>

                      {/* Action Button */}
                      <div className="mt-auto">
                        <Button
                          size="sm"
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                          onClick={() => navigate("/em-mat")}
                        >
                          {course.buttonText}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              ))}
            </div>

            {/* No courses found */}
            {displayCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {sequenceMode 
                    ? "Click on course titles to add them to your sequence" 
                    : "No courses found in this category."
                  }
                </p>
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