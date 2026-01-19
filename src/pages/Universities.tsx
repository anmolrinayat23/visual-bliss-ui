import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Building2, GraduationCap, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface University {
  name: string;
  shortName?: string;
  location: string;
  city: string;
  state: string;
  logo?: string;
}

const universities: University[] = [
  { name: "SP Jain Institute of Management and Research", shortName: "SPJIMR", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "/SP Jain Institute of Management and Research.png" },
  { name: "NL Dalmia Institute of Management Studies", shortName: "NL Dalmia", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "/NL Dalmia Institute of Management Studies.png" },
  { name: "IMT Ghaziabad", shortName: "IMT-G", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", logo: "/IMT Ghaziabad.jpg" },
  { name: "IMT Hyderabad", shortName: "IMT-HY", location: "Hyderabad, Telangana", city: "Hyderabad", state: "Telangana", logo: "/IMT Hyderabad.webp" },
  { name: "International Management Institute", shortName: "IMI", location: " Kolkata", city: "Delhi", state: "Delhi", logo: "/International Management Institute.jpeg" },
  { name: "MDI Murshidabad", shortName: "MDI-M", location: "Murshidabad, West Bengal", city: "Murshidabad", state: "West Bengal", logo: "/Management-Development-Institute-Murshidabad-Murshidabad-logo.jpg.webp" },
  { name: "Lal Bahadur Shastri Institute of Management", shortName: "LBSIM", location: "Delhi", city: "Delhi", state: "Delhi", logo: "/Lal Bahadur Shastri Institute of Management.jpeg" },
  { name: "Great Lakes Institute of Management", shortName: "Great Lakes", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "/Great Lakes Institute of Management.png" },
  { name: "Symbiosis Institute of Business Management", shortName: "SIBM", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", logo: "/Symbiosis Institute of Business Management.jpeg" },
  { name: "Quantum University", shortName: "Quantum", location: "Roorkee-Dehradun Highway, Uttarakhand", city: "Mandawar", state: "Uttarakhand", logo: "/Quantum University.jpeg" },
  { name: "Bennett University", shortName: "Bennett", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "/Bennett University.jpeg" },
  { name: "University of Petroleum and Energy Studies", shortName: "UPES", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", logo: "/University of Petroleum and Energy Studies.jpeg" },
  { name: "Doon Business School", shortName: "DBS", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", logo: "/Doon Business School.jpeg" },
  { name: "Jaipuria Institute of Management", shortName: "Jaipuria Noida", location: "Noida, Uttar Pradesh", city: "Noida", state: "Uttar Pradesh", logo: "/Jaipuria Institute of Management.png" },
  { name: "Jaipuria Institute of Management Lucknow", shortName: "Jaipuria Lucknow", location: "Lucknow, Uttar Pradesh", city: "Lucknow", state: "Uttar Pradesh", logo: "/Jaipuria Institute of Management Lucknow.png" },
  { name: "Jaipuria Institute of Management Indore", shortName: "Jaipuria Indore", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", logo: "/Jaipuria Institute of Management Indore.png" },
  { name: "Jaipuria Institute of Management Ghaziabad", shortName: "Jaipuria Ghaziabad", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", logo: "/Jaipuria Institute of Management Ghaziabad.png" },
  { name: "Jaipuria School of Business", shortName: "JSB", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", logo: "/Jaipuria School of Business.jpeg" },
  { name: "GL Bajaj Institute of Management", shortName: "GL Bajaj", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "/GL Bajaj Institute of Management.jpeg" },
  { name: "Harsha Institutions", shortName: "Harsha", location: "Madavara, Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", logo: "/Harsha Institutions.png" },
  { name: "Universal AI University", shortName: "UAI", location: "Karjat, Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "/Universal AI University.png" },
  { name: "Indira University", shortName: "IU", location: "Tathawade, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Indira University.png" },
  { name: "Sai Balaji International Institute", shortName: "SBIIMS", location: "Hinjewadi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Sai Balaji International Institute.jpeg" },
  { name: "FMS-IIRM Jaipur", shortName: "FMS-IIRM", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", logo: "/FMS-IIRM Jaipur.jpeg" },
  { name: "SOIL Institute of Management", shortName: "SOIL", location: "Manesar, Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "/SOIL Institute of Management.jpg" },

  { name: "NMIMS School of Business Management", shortName: "NMIMS", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", logo: "/NMIMS School of Business Management.png" },
  { name: "FORE School of Management", shortName: "FORE", location: "Delhi", city: "Delhi", state: "Delhi", logo: "/FORE School of Managemen.jpeg" },
  { name: "Maharaja Agrasen Business School", shortName: "MABS", location: "Rohini Sector 22, Delhi", city: "Delhi", state: "Delhi", logo: "/Maharaja Agrasen Business School.png" },
  { name: "New Delhi Institute of Management", shortName: "NDIM", location: "Tughlakabad, Delhi", city: "Delhi", state: "Delhi", logo: "/New Delhi Institute of Management.jpeg" },
  { name: "FOSTIIMA Business School", shortName: "FOSTIIMA", location: "Dwarka, Delhi", city: "Delhi", state: "Delhi", logo: "/FOSTIIMA Business School.png" },
  { name: "Dr. DY Patil B-School", shortName: "DY Patil", location: "Tathawade, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Dr. DY Patil B-School.png" },
  { name: "BML Munjal University", shortName: "BMU", location: "Kapriwas, Haryana", city: "Kapriwas", state: "Haryana", logo: "/BML Munjal University.png" },
  { name: "Christ Academy Institute for Advanced Studies", shortName: "CHRIST", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", logo: "/Christ Academy Institute for Advanced Studies.jpeg" },
  { name: "Atlas SkillTech University", shortName: "Atlas", location: "Kurla, Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "/Atlas SkillTech University.png" },
  { name: "Asian Business School", shortName: "ABS", location: "Noida, Uttar Pradesh", city: "Noida", state: "Uttar Pradesh", logo: "/Asian Business School.png" },
  { name: "Amity University", shortName: "Amity", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "/Amity University.png" },
  { name: "Alliance University", shortName: "Alliance", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", logo: "/Alliance University.png" },
  { name: "Woxsen University", shortName: "Woxsen", location: "Sadasivpet, Hyderabad, Telangana", city: "Hyderabad", state: "Telangana", logo: "/Woxsen University.png" },
  { name: "Unique Institute of Business Management", shortName: "UIBM", location: "Katraj, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Unique Institute of Business Management.webp" },
  { name: "Thiagarajar School of Management", shortName: "TSM", location: "Madurai, Tamil Nadu", city: "Madurai", state: "Tamil Nadu", logo: "/Thiagarajar School of Management.jpeg" },
  { name: "Ajeenkya DY Patil University (Sunstone)", shortName: "ADYPU", location: "Charholi Budruk, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Ajeenkya DY Patil University (Sunstone).jpeg" },
  { name: "St. Andrews Institute of Technology & Management", shortName: "St. Andrews", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "/St. Andrews Institute of Technology & Management.jpeg" },
  { name: "Sparsh Global Business School", shortName: "SPARSH", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "/Sparsh Global Business School.jpeg" },
  { name: "Shanti Business School", shortName: "SBS", location: "Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat", logo: "/Shanti Business School.png" },
  { name: "Ramachandran International Institute of Management", shortName: "RIIM", location: "Bavdhan, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Ramachandran International Institute of Management.jpeg" },
  { name: "Pune Institute of Business Management", shortName: "PIBM", location: "Pirangut, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Pune Institute of Business Management.jpeg" },
  { name: "Pimpri Chinchwad University", shortName: "PCU", location: "Mohitewadi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Pimpri Chinchwad University.jpeg" },
  { name: "Pune Business School", shortName: "PBS", location: "Nigdi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Pune Business School.jpeg" },
  { name: "Noida International University", shortName: "NIU", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "/Noida International University.jpeg" },
  { name: "Narayana Business School", shortName: "NBS", location: "Sanathal, Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat", logo: "/Narayana Business School.jpeg" },
  { name: "Mangalmay Institute of Management & Technology", shortName: "Mangalmay", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "/Mangalmay Institute of Management & Technology.png" },
  { name: "Lloyd Business School", shortName: "Lloyd", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "/Lloyd Business School.jpeg" },
  { name: "KR Mangalam University", shortName: "KRM", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "/KR Mangalam University.jpeg" },
  { name: "Jagdish Sheth School of Management", shortName: "JAGSoM", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", logo: "/Jagdish Sheth School of Management.png" },
  { name: "Jagannath International Management School", shortName: "JIMS", location: "Kalkaji, Delhi", city: "Delhi", state: "Delhi", logo: "/Jagannath International Management School.jpeg" },
  { name: "ITM Business School", shortName: "ITM", location: "Kharghar, Navi Mumbai, Maharashtra", city: "Navi Mumbai", state: "Maharashtra", logo: "/ITM Business School.png" },
  { name: "International School of Management Studies", shortName: "ISMS", location: "Ambegaon Budruk, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/International School of Management Studies.jpeg" },
  { name: "ISBS Gurgaon", shortName: "ISBS", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "/ISBS Gurgaon.jpeg" },
  { name: "Indus Business School", shortName: "IIEBM", location: "Wakad, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Indus Business School.jpeg" },
  { name: "Indian School of Business and Research", shortName: "ISBR", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", logo: "/Indian School of Business and Research.gif" },
  { name: "IMS Unison University", shortName: "IMS", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", logo: "/IMS Unison University.jpeg" },
  { name: "Imperial School of Business", shortName: "Imperial", location: "Hinjewadi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Imperial School of Business.jpeg" },
  { name: "IILM Institute Jaipur", shortName: "IILM Jaipur", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", logo: "/IILM Institute Jaipur.jpeg" },
  { name: "IILM Institute Lucknow", shortName: "IILM Lucknow", location: "Lucknow, Uttar Pradesh", city: "Lucknow", state: "Uttar Pradesh", logo: "/IILM Institute Lucknow.jpeg" },
  { name: "IILM Institute Lodhi Road", shortName: "IILM Delhi", location: "Lodhi Road, Delhi", city: "Delhi", state: "Delhi", logo: "/IILM Institute Lodhi Road.png" },
  { name: "IILM Institute Gurgaon", shortName: "IILM Gurgaon", location: "Golf Road, Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "/IILM Institute Gurgaon.jpeg" },
  { name: "IILM Institute Greater Noida", shortName: "IILM G.Noida", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "/IILM Institute Greater Noida.jpeg" },
  { name: "IBMR Business School", shortName: "IBMR", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "/IBMR Business School.jpeg" },
  { name: "HIMT Group of Institutions", shortName: "HIMT", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "/HIMT Group of Institutions.jpeg" },
  { name: "Greater Noida Institute of Technology", shortName: "GNIOT", location: "Knowledge Park II, Greater Noida, UP", city: "Greater Noida", state: "Uttar Pradesh", logo: "/Greater Noida Institute of Technology.jpeg" },
  { name: "Global Institute of Business Studies", shortName: "GIBS", location: "Electronic City, Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", logo: "/Global Institute of Business Studies.png" },
  { name: "GD Goenka University", shortName: "GD Goenka", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "/GD Goenka University.png" },
  { name: "Fortune Institute of International Business", shortName: "FIIB", location: "Vasant Vihar, New Delhi", city: "Delhi", state: "Delhi", logo: "/Fortune Institute of International Business.jpeg" },
  { name: "ASM Institute of International Business and Research", shortName: "ASM IIBR", location: "Pimpri, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/ASM Institute of International Business and Research.jpeg" },
  { name: "Aureole School of Business Management", shortName: "ASBM", location: "Ambi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/Aureole School of Business Management.png" },
  { name: "AKEMI Business School", shortName: "AKEMI", location: "Marunji Road, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "/AKEMI Business School.png" },
];

const statesList = [...new Set(universities.map(u => u.state))].sort();

const Universities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (uni.shortName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesState = selectedState === "All" || uni.state === selectedState;
    return matchesSearch && matchesState;
  });

  const displayedUniversities = showAll ? filteredUniversities : filteredUniversities.slice(0, 12);

  const handleImageError = (uniName: string) => {
    setImageErrors(prev => new Set(prev).add(uniName));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-blue-50">
      <AnnouncementPopup />
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          {/* Background Gradient Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-orange-500 to-orange-600" />
          
          {/* Logo Collage Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Logo Grid - Row 1 */}
            <motion.div 
              className="absolute top-0 left-0 right-0 flex gap-6 items-center"
              animate={{ x: [0, -1200] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[...universities, ...universities].map((uni, index) => (
                <div 
                  key={`row1-${index}`}
                  className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20"
                >
                  {uni.logo && (
                    <img 
                      src={uni.logo} 
                      alt={uni.name}
                      className="w-full h-full object-contain opacity-40 filter brightness-150"
                    />
                  )}
                </div>
              ))}
            </motion.div>
            
            {/* Animated Logo Grid - Row 2 */}
            <motion.div 
              className="absolute top-28 md:top-32 left-0 right-0 flex gap-6 items-center"
              animate={{ x: [-600, 600] }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            >
              {[...universities.slice(20), ...universities.slice(0, 20), ...universities].map((uni, index) => (
                <div 
                  key={`row2-${index}`}
                  className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white/8 backdrop-blur-sm rounded-xl p-2 border border-white/15"
                >
                  {uni.logo && (
                    <img 
                      src={uni.logo} 
                      alt={uni.name}
                      className="w-full h-full object-contain opacity-30 filter brightness-150"
                    />
                  )}
                </div>
              ))}
            </motion.div>
            
            {/* Animated Logo Grid - Row 3 (Center - More Visible) */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex gap-8 items-center"
              animate={{ x: [0, -800] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              {[...universities.slice(40), ...universities, ...universities.slice(0, 40)].map((uni, index) => (
                <div 
                  key={`row3-${index}`}
                  className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white/12 backdrop-blur-md rounded-2xl p-3 border border-white/25 shadow-lg"
                >
                  {uni.logo && (
                    <img 
                      src={uni.logo} 
                      alt={uni.name}
                      className="w-full h-full object-contain opacity-50 filter brightness-150"
                    />
                  )}
                </div>
              ))}
            </motion.div>
            
            {/* Animated Logo Grid - Row 4 */}
            <motion.div 
              className="absolute bottom-28 md:bottom-32 left-0 right-0 flex gap-6 items-center"
              animate={{ x: [-300, -1500] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              {[...universities.slice(60), ...universities, ...universities.slice(0, 60)].map((uni, index) => (
                <div 
                  key={`row4-${index}`}
                  className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white/8 backdrop-blur-sm rounded-xl p-2 border border-white/15"
                >
                  {uni.logo && (
                    <img 
                      src={uni.logo} 
                      alt={uni.name}
                      className="w-full h-full object-contain opacity-30 filter brightness-150"
                    />
                  )}
                </div>
              ))}
            </motion.div>
            
            {/* Animated Logo Grid - Row 5 */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 flex gap-6 items-center"
              animate={{ x: [-800, 400] }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            >
              {[...universities.slice(30), ...universities, ...universities.slice(0, 30)].map((uni, index) => (
                <div 
                  key={`row5-${index}`}
                  className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20"
                >
                  {uni.logo && (
                    <img 
                      src={uni.logo} 
                      alt={uni.name}
                      className="w-full h-full object-contain opacity-35 filter brightness-150"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-orange-500/60 to-orange-600/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
          
          {/* Accent Glow Effects */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/25 rounded-full blur-3xl"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white font-medium mb-6 border border-white/30 shadow-xl"
              >
                <Building2 className="w-5 h-5" />
                <span>Our Partner Network</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                Tied Up Universities
              </h1>
              
              <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
              Access a powerful network of top universities and institutions across India, connected through exclusive admission partnerships for world-class education.
              </p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6 max-w-sm mx-auto mt-12"
              >
                {[
                  { label: "Partner Universities", value: "150", icon: GraduationCap },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-300 group"
                  >
                    <stat.icon className="w-7 h-7 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{stat.value}+</div>
                    <div className="text-sm text-white/90 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249 250 251)" fillOpacity="1"/>
            </svg>
          </div>
        </section>

        {/* Filter Section */}
        <section className="container mx-auto px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/10"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search universities by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-base rounded-xl border-2 border-primary/20 focus:border-primary transition-colors"
                />
              </div>

              {/* State Filter */}
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-primary/20 bg-white text-foreground focus:border-primary transition-colors cursor-pointer min-w-[180px]"
              >
                <option value="All">All States</option>
                {statesList.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing <span className="font-semibold text-primary">{filteredUniversities.length}</span> of {universities.length} universities
            </div> */}
          </motion.div>
        </section>

        {/* Universities Grid */}
        <section className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayedUniversities.map((uni, index) => (
              <motion.div key={`${uni.name}-${index}`} variants={itemVariants}>
                <Card className="group h-full overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-transparent hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Logo */}
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md overflow-hidden">
                        {uni.logo && !imageErrors.has(uni.name) ? (
                          <img 
                            src={uni.logo} 
                            alt={`${uni.shortName || uni.name} logo`}
                            className="w-12 h-12 object-contain"
                            onError={() => handleImageError(uni.name)}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {(uni.shortName || uni.name).charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* University Info */}
                    <div className="flex-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2 cursor-default">
                              {uni.shortName || uni.name}
                            </h3>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="font-semibold">{uni.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {uni.name !== uni.shortName && uni.shortName && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-1 cursor-default">
                                {uni.name}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <p>{uni.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto pt-4 border-t border-gray-100">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="line-clamp-1 cursor-default">{uni.location}</span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-xs">
                            <p>{uni.location}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Show More Button */}
          {filteredUniversities.length > 12 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Button
                onClick={() => setShowAll(!showAll)}
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                {showAll ? "Show Less" : `Show All  Universities`}
                <ChevronDown className={`ml-2 w-5 h-5 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
              </Button>
            </motion.div>
          )}

          {/* No Results */}
          {filteredUniversities.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-primary/50" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Universities Found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-orange-500 to-primary p-8 md:p-12 text-center text-white"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Connect with us to explore admission opportunities at these premier institutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => window.location.href = "/session"}
                >
                  Book a Counselling Session
                </Button>
                  <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => window.location.href = "/courses"}
                >
                   Explore Courses
                </Button>
             
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Universities;
