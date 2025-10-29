import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, Target, Users, Award, Rocket } from "lucide-react";

const About = ({showFooter=true}) => {
  const leadershipTeam = [
    {
      name: "Mr. Nikhil Sewaramani",
      role: "Founder & CEO",
      description: "From call center professional to education visionary, Nikhil's journey embodies ambition and purpose.",
      achievement: "IIHM Kolkata graduate with 5+ years in education leadership at Bennett & Sharda University.",
      avatar: "NS",
      image: "/nikhil.jpg",
      highlight: "Inspiring growth, purpose, and excellence"
    },
    {
      name: "Mr. Nilesh Raut",
      role: "Financial Strategist",
      description: "3.5+ years as Financial Analyst with expertise in inventory management and financial operations.",
      achievement: "Bachelor's from NRI College, PGDCA from Makhanlal Institute, MBA from SAM Global University.",
      avatar: "NR",
      image: "/nilesh.jpg",
      highlight: "Analytical mindset driving excellence"
    },
    {
      name: "Ms. Sarkar",
      role: "Student Counseling Head",
      description: "Over a decade of experience in student counseling, mentoring, and academic administration.",
      achievement: "Expert in guiding educational journeys with empathy and strong administrative skills.",
      avatar: "MS",
      image: "/sulekha.jpg",
      highlight: "Empathetic mentor unlocking potential"
    }
  ];

  const visionPoints = [
    { icon: <Target className="w-6 h-6" />, text: "Student-centric ecosystem for unique success paths" },
    { icon: <Rocket className="w-6 h-6" />, text: "Safe space for ideas and innovation to flourish" },
    { icon: <Users className="w-6 h-6" />, text: "Every learner thrives and succeeds uniquely" },
    { icon: <Award className="w-6 h-6" />, text: "Unlocking potential through personalized journeys" }
  ];

  const stats = [
    { number: "1000+", label: "Students Transformed", icon: "🎓" },
    { number: "50+", label: "University Partners", icon: "🏛️" },
    { number: "95%", label: "Success Rate", icon: "📈" },
    { number: "100", label: "Super Scholars", icon: "⭐" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="pt-20">
        {/* Hero Section with Animation */}
        <section className="relative py-5 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 transform skew-y-3 scale-110"></div>
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-gray-200">
              <Star className="w-4 h-4 text-orange-500 fill-current" />
              <span className="text-sm font-semibold text-gray-700">Transforming Education Since 2018</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Redefining Education
              <span className="block bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Where ambition meets opportunity, and every student's potential finds its <span className="text-orange-500 font-bold">purpose</span>.
            </p>
          </div>
        </section>

        {/* Vision Section - Modern Grid */}
        <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500"></div>
                <h2 className="text-4xl font-black text-gray-900">Our Vision</h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500"></div>
              </div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
                Creating a student-centric ecosystem where every learner discovers their unique path to success. 
                We provide the safe space where ideas and innovation can flourish according to potential.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {visionPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:shadow-xl hover:border-orange-200 transition-all duration-500 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    {point.icon}
                  </div>
                  <p className="text-lg text-gray-700 font-medium pt-2">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section - Bold Statement */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute bg-gradient-to-br from-blue-50 to-orange-50"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <Card className="p-12 bg-white/95 backdrop-blur-sm border-0  transform hover:scale-105 transition-transform duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6"></div>
                <h2 className="text-5xl font-black text-gray-900 mb-4">Our Mission</h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed font-medium text-center">
                  To meticulously identify and nurture <span className="text-orange-500 font-bold">100 exceptional minds</span> through rigorous selection, 
                  providing them with fully/partially funded scholarships at top private universities.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <p className="text-gray-800 font-semibold text-center">
                    Beyond placement, we mentor holistically—guiding each student to courses that align with their strengths, 
                    aspirations, and potential for long-term impact.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Leadership Team - Modern Cards */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto max-w-8xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-4">The Visionaries</h2>
              <p className="text-xl text-gray-600">Meet the leaders shaping the future of education</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <Card key={index} className="group bg-white border-2 border-gray-200 hover:border-blue-300 transition-all duration-500 overflow-hidden">
                  <div className="p-8">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="relative mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500 rounded-full overflow-hidden">
                          <img 
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const nextSibling = target.nextSibling as HTMLElement;
                              if (nextSibling) {
                                target.style.display = 'none';
                                nextSibling.style.display = 'flex';
                              }
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center text-white font-bold text-xl">
                            {member.avatar}
                          </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900">{member.name}</h3>
                      <p className="text-orange-500 font-bold">{member.role}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-gray-600 leading-relaxed text-sm">{member.description}</p>
                      <p className="text-gray-700 font-medium text-sm">{member.achievement}</p>
                      <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
                        <p className="text-black font-semibold text-sm text-center">{member.highlight}</p>
                      </div>
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