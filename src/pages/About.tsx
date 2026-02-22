import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Target, Users, Award, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = ({ showFooter = true }) => {
  const navigate = useNavigate();
  
  const leadershipTeam = [
    {
      id: "nikhil-sewaramani",
      name: "Mr. Nikhil Sewaramani",
      role: "Founder & CEO",
      description: "Visionary education leader transforming career readiness through innovative mentorship and strategic enrollment growth across India.",
      achievement: "IIHM Kolkata graduate with 5+ years leadership at top universities, personally guiding thousands of students to success.",
      avatar: "NS",
      image: "/nikhil.jpg",
      highlight: "Building a movement to educate, empower, and elevate",
      fullDescription: `As the Founder and CEO of Educate Me, I am driven by a vision to revolutionize education accessibility and career readiness for students across India and beyond. With a strong foundation in educational leadership and admissions strategy, I built Educate Me as a mission-led platform empowering learners to make informed academic and career decisions through mentorship, technology, and outcome-driven guidance.`
    },
    {
      id: "dr-awanish-sinha",
      name: "Dr. Awanish Kumar Sinha",
      role: "Guest Faculty Expert - Finance",
      description: "Distinguished banking academician with two decades of BFSI leadership and expertise in financial risk management and NPAs.",
      achievement: "Ph.D. in Finance with leadership roles at Yes Bank, ABN AMRO, HDFC Bank, and publications in SCOPUS journals.",
      avatar: "AS",
      image: "/pp.jpg",
      highlight: "Thought leader shaping financial acumen and industry readiness",
      fullDescription: `Welcome Dr. Awanish Kumar Sinha, a distinguished academician and seasoned banking and financial services expert, as our esteemed guest lecturer at Educate Me. Dr. Sinha brings over two decades of rich professional experience across the BFSI sector, having held key leadership roles with reputed institutions such as Yes Bank, ABN AMRO, and HDFC Bank.`
    },
    {
      id: "dr-vaishali-arora",
      name: "Dr. Vaishali Arora",
      role: "Visiting Faculty Expert Law & Management",
      description: "Accomplished legal scholar specializing in Media Law, Women & Criminal Law with extensive research publications.",
      achievement: "Ph.D. from Indian Law Institute, UGC-NET scholar with 10+ publications and edited books with global publishers.",
      avatar: "VA",
      image: "/DR VAISHALI ARORA.PNG",
      highlight: "Empowering next-generation legal professionals with excellence",
      fullDescription: `We are privileged to welcome Dr. Vaishali Arora, an accomplished legal academic and distinguished expert in Media Law and Women & Criminal Law. A graduate of the University of Delhi in both Commerce and Law, Dr. Arora pursued her LL.M from GGSIP University and went on to achieve her Ph.D. from the prestigious Indian Law Institute, New Delhi.`
    },
    {
      id: "mrs-shilpa-vishnoi",
      name: "Mrs. Shilpa Agrawal Vishnoi",
      role: "Expert Guest Faculty - Physics & Student Advisory",
      description: "Visionary Physics educator with three decades of excellence, making science engaging and inspiring for generations.",
      achievement: "M.Sc. Physics, honored by Ministry of HRD for exceptional CBSE results and multiple teaching excellence awards.",
      avatar: "SV",
      image: "/shipla.jpg",
      highlight: "Inspiring curiosity and building confident, curious learners",
      fullDescription: `We are proud to welcome Mrs. Shilpa Agrawal Vishnoi, a visionary educator with over three decades of excellence in Physics education, as an Expert Guest Faculty at Educate Me. A dynamic mentor and lifelong learner, she has been a cornerstone of academic excellence and student empowerment since 1995.`
    },
    {
      id: "dr-deepa-kumari",
      name: "Dr. Deepa Kumari",
      role: "Expert Guest Faculty - Corporate Communication & Entrepreneurial Development",
      description: "Innovation-driven mentor with 18+ years expertise in entrepreneurship development and strategic business leadership.",
      achievement: "MBA & Ph.D., certified entrepreneurship trainer with Wadhwani Foundation, 20+ research publications.",
      avatar: "DK",
      image: "/dipali.jpg",
      highlight: "Transforming student potential into startup reality",
      fullDescription: `At Educate Me, we proudly welcome Dr. Deepa Kumari, an accomplished academic leader and innovation-driven mentor with 18+ years of expertise in entrepreneurship development, corporate communication, and strategic leadership.`
    },
    {
      id: "kajol-samtani",
      name: "Ms. Kajol Samtani",
      role: "Academic Excellence Lead",
      description: "Academic achiever with exceptional leadership skills and outstanding performance in commerce education.",
      achievement: "1st Rank in B.Com and M.Com with distinction, President of Commerce Society, fluent in French.",
      avatar: "KS",
      image: "/kajol.jpg",
      highlight: "Academic brilliance combined with organizational excellence",
      fullDescription: `Kajol Samtani is an accomplished commerce professional and academic achiever from the Institute for Excellence in Higher Education (IEHE), Bhopal, where she secured 1st Rank in both B.Com (Accounts Hons.) and M.Com (Marketing Management) with distinction.`
    },
      {
        id: "dr-esha-ahirwar",
        name: "Dr. Esha Ahirwar",
        role: "International Medical Graduate & Academic Advisor",
        description: "Internationally trained medical graduate with U.S. clinical exposure and expertise in global medical education pathways.",
        achievement: "Co-Founder of 4th Ventricle, mentored students for US licensing exams, clinical rotations in Chicago, American University of Barbados graduate.",
        avatar: "EA",
        image: "/Dr.Eashaa-ahirwar.PNG",
        highlight: "Cultivating confidence and credibility through strategic medical mentorship",
        fullDescription: `Dr. Esha Ahirwar is an internationally trained medical graduate whose academic foundation was shaped at the American University of Barbados, School of Medicine, where her education included integrated clinical rotations across multiple teaching hospitals in Chicago. This cross-border training provided her with direct exposure to the U.S. healthcare system and a nuanced understanding of global medical education pathways.\n\nHaving personally navigated U.S. licensing examinations and competitive academic transitions, she brings a clear understanding of the preparation, positioning, and discipline required for international advancement. Her perspective is informed not only by structured training, but by experience within high-performance academic environments.\n\nAs Co-Founder of 4th Ventricle, a peer-driven medical learning platform, Dr. Esha has mentored students through structured exam preparation and strategic clinical progression. Through this work, she recognized that success is rarely a matter of potential — it is often a matter of clarity, direction, and informed guidance at pivotal stages.\n\nHer advisory philosophy blends strategic precision with thoughtful mentorship. She focuses on simplifying complex processes, strengthening professional profiles, and aligning decisions with long-term academic vision. Whether guiding licensing preparation, international applications, or career planning, her commitment remains consistent: cultivating confidence through preparation and credibility through intention.`
      },

    {
      id: "anirudh-tiwari",
      name: "Mr. Anirudh Tiwari",
      role: "Assistant Manager – Admissions",
      description: "Admissions and student engagement professional with 2+ years of experience in counselling, enrollment strategy, and client relationship management.",
      achievement: "2+ years in sales & executive roles, worked with Reliance Insurance, Maxwell Trading & Techno Task, proven record of target achievement and client retention.",
      avatar: "AT",
      image: "/Anirudh_Tiwari.jpeg",
      highlight: "Driving student enrollment growth through strategic counselling and data-driven conversion.",
      fullDescription: `Anirudh Tiwari is an admissions and student engagement professional with over 2 years of experience in counselling, enrollment strategy, and client relationship management. With a strong background in sales and executive roles across organizations like Reliance Insurance, Maxwell Trading, and Techno Task, he brings a consultative and learner-focused approach to the education sector.\n\nAt Educate Me, he plays a key role in driving student enrollment growth through strategic counselling, admissions funnel management, and data-driven conversion strategies. His work emphasizes personalized guidance, career mapping, and building strong relationships with students and parents to support informed academic decisions.\n\nKey Strengths\n- Admissions Strategy & Lead Conversion\n- Student Counselling & Career Guidance\n- Learner-Centric Communication\n- CRM & Data-Driven Follow-ups\n- Stakeholder Relationship Management\n- Team Coordination & Performance Focus\n\nProfessional Experience\n• 2+ Years of Experience in Sales & Executive Roles\n• Worked with Reliance Insurance, Maxwell Trading & Techno Task\n• Proven record of target achievement and client retention.`
    },

    {
      id: "shiny-chaturvedi",
      name: "Ms. Shiny Chaturvedi",
      role: "Administrative Head",
      description: "Research-driven education administrator with strong academic and institutional coordination expertise.",
      achievement: "Research student, ISBN-indexed publication contributor, experience in social entrepreneurship and academic outreach.",
      avatar: "SC",
      image: "/shinyy_chaturvedi.png",
      highlight: "Strengthening institutional excellence and student-focused growth.",
      fullDescription: `Educate Me proudly welcomes Ms. Shiny Chaturvedi as the Administrative Head, bringing her research-driven academic perspective and strong educational administration expertise to strengthen institutional excellence and student-focused growth.\n\nMs. Shiny Chaturvedi is a research-oriented education administrator with a strong academic foundation in institutional coordination and scholarly engagement. As a research student and contributor to an ISBN-indexed publication, she brings analytical depth and academic rigor to educational administration.\n\nHer professional experience reflects a commitment to inclusive and community-centered education through social entrepreneurship initiatives and academic outreach programs. She has contributed to educational and social development projects, including institutional collaborations and inclusive learning support.\n\nAs Administrative Head, she oversees academic documentation, operational coordination, and institutional processes, ensuring efficient administration aligned with research-driven and education-focused standards.\n\nCore Competencies\n- Academic Research & Scholarly Writing\n- Educational Administration & Institutional Coordination\n- Inclusive & Community-Based Education\n- Outreach Program Management\n- Documentation & Academic Compliance\n- Leadership & Organizational Skills`
    },
    // {
    //   id: "sulekha-sarkar",
    //   name: "Ms. Sulekha Sarkar",
    //   role: "Administrative Supervisor",
    //   description: "Empathetic student counselor with over a decade of experience in academic guidance and mentorship.",
    //   achievement: "Expert in educational journey planning with strong administrative skills and personalized support.",
    //   avatar: "MS",
    //   image: "/sulekha.jpg",
    //   highlight: "Empowering students through personalized guidance",
    //   fullDescription: `Ms. Sulekha Sarkar brings over a decade of experience in student interaction, counselling, and academic administration. With extensive exposure to student support and tutoring, she has successfully guided learners through their educational journeys with patience and precision.`
    // },
// {
//   id: "sanjana-sharma",
//   name: "Mrs. Sanjana Sharma",
//   role: "Senior Educational Counsellor",
//   description: "A compassionate counsellor helping students discover their strengths and make confident academic and career choices.",
//   achievement: "Brings creative and corporate experience with a warm, student-centric counselling approach.",
//   avatar: "SS",
//   image: "/sajana.jpg",
//   highlight: "Inspiring learners with empathy, positivity, and purpose-driven guidance",
//   fullDescription: `Mrs. Sanjana Sharma is a passionate and empathetic Senior Educational Counsellor who believes that every student has a unique story waiting to unfold. With years of experience across creative and corporate fields, she brings warmth, understanding, and practical insight to every counselling session.

// Known for her friendly approach and positive energy, Sanjana helps students discover their strengths, explore their interests, and make confident choices about their education and careers. She blends creativity with guidance, turning challenges into opportunities for growth.

// At Educate Me, Sanjana’s mission is simple — to inspire learners to believe in themselves and to guide them toward a future filled with purpose, confidence, and success.`
// }

  ];

  const visionPoints = [
    { icon: <Target className="w-6 h-6" />, text: "Student-centric ecosystem for unique success paths" },
    { icon: <Rocket className="w-6 h-6" />, text: "Safe space for ideas and innovation to flourish" },
    { icon: <Users className="w-6 h-6" />, text: "Every learner thrives and succeeds uniquely" },
    { icon: <Award className="w-6 h-6" />, text: "Unlocking potential through personalized journeys" }
  ];

  const handleReadMore = (memberId) => {
    navigate(`/team/${memberId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AnnouncementPopup />
      <Header />
      <main className="pt-20">
        {/* Vision Section - Modern Grid */}
        <section className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-orange-50 to-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500"></div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900">Our Vision</h2>
                <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500"></div>
              </div>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-4">
                Creating a student-centric ecosystem where every learner discovers their unique path to success.
                We provide the safe space where ideas and innovation can flourish according to potential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {visionPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:shadow-xl hover:border-orange-200 transition-all duration-500 group">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    {point.icon}
                  </div>
                  <p className="text-base md:text-lg text-gray-700 font-medium pt-1 md:pt-2">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section - Bold Statement */}
        <section className="py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute bg-gradient-to-br from-blue-50 to-orange-50"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <Card className="p-6 md:p-12 bg-white/95 backdrop-blur-sm border-0 transform hover:scale-105 transition-transform duration-500">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-4 md:mb-6"></div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">Our Mission</h2>
              </div>
              <div className="space-y-4 md:space-y-6">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium text-center">
                  To meticulously identify and nurture <span className="text-orange-500 font-bold">100 exceptional minds</span> through rigorous selection,
                  providing them with fully/partially funded scholarships at top private universities.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 md:p-6 rounded-xl border-l-4 border-orange-500">
                  <p className="text-gray-800 font-semibold text-center text-sm md:text-base">
                    Beyond placement, we mentor holistically guiding each student to courses that align with their strengths,
                    aspirations, and potential for long term impact.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Leadership Team - Modern Cards */}
        <section className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto max-w-8xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">The Visionaries</h2>
              <p className="text-lg md:text-xl text-gray-600">Meet the leaders shaping the future of education</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {leadershipTeam.map((member, index) => (
                <Card key={index} className="group bg-white border-2 border-gray-200 hover:border-blue-300 transition-all duration-500 overflow-hidden w-full flex flex-col h-full">
                  <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex flex-col items-center text-center mb-4 md:mb-6">
                      <div className="relative mb-3 md:mb-4">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-orange-500 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500 rounded-full overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className={
                              member.name === "Dr. Esha Ahirwar"
                                ? "w-full object-cover object-center"
                                : "w-full h-full object-cover"
                            }
                            style={member.name === "Dr. Esha Ahirwar" ? { objectPosition: 'center', height: '151%' } : {}}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const nextSibling = target.nextSibling as HTMLElement;
                              if (nextSibling) {
                                target.style.display = 'none';
                                nextSibling.style.display = 'flex';
                              }
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center text-white font-bold text-lg md:text-xl">
                            {member.avatar}
                          </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight">{member.name}</h3>
                      <p className="text-orange-500 font-bold text-sm md:text-base mt-1">{member.role}</p>
                    </div>

                    <div className="space-y-2 flex-1">
                      <p className="text-gray-600 text-center leading-relaxed text-xs md:text-sm">{member.description}</p>
                      <p className="text-gray-700 text-center font-medium text-xs md:text-sm">{member.achievement}</p>
                    </div>

                    {/* Read More Button - Now properly positioned at bottom */}
                    <div className="mt-4 md:mt-6 text-center pt-4">
                      <Button
                        onClick={() => handleReadMore(member.id)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
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

export default About;