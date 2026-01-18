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
  { name: "IIM Rohtak", shortName: "IIM-R", location: "Rohtak, Haryana", city: "Rohtak", state: "Haryana", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/IIM_Rohtak_Logo.svg/1200px-IIM_Rohtak_Logo.svg.png" },
  { name: "SP Jain Institute of Management and Research", shortName: "SPJIMR", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/SPJIMR_Logo.svg/1200px-SPJIMR_Logo.svg.png" },
  { name: "NL Dalmia Institute of Management Studies", shortName: "NL Dalmia", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "https://www.nldalmia.in/images/logo.png" },
  { name: "IMT Ghaziabad", shortName: "IMT-G", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/IMT_Ghaziabad_logo.svg/1200px-IMT_Ghaziabad_logo.svg.png" },
  { name: "IMT Hyderabad", shortName: "IMT-HY", location: "Hyderabad, Telangana", city: "Hyderabad", state: "Telangana", logo: "https://www.imthyderabad.edu.in/storage/app/public/page-builder/IMT%20Hyd%20Logo.png" },
  { name: "International Management Institute", shortName: "IMI", location: "Delhi & Kolkata", city: "Delhi", state: "Delhi", logo: "https://upload.wikimedia.org/wikipedia/en/7/7d/International_Management_Institute_logo.png" },
  { name: "MDI Murshidabad", shortName: "MDI-M", location: "Murshidabad, West Bengal", city: "Murshidabad", state: "West Bengal", logo: "https://www.mdim.ac.in/assets/images/logo.png" },
  { name: "Lal Bahadur Shastri Institute of Management", shortName: "LBSIM", location: "Delhi", city: "Delhi", state: "Delhi", logo: "https://www.lbsim.ac.in/images/logo.png" },
  { name: "Great Lakes Institute of Management", shortName: "Great Lakes", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "https://www.greatlakes.edu.in/sites/all/themes/developer/images/logo.png" },
  { name: "Symbiosis Institute of Business Management", shortName: "SIBM", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Symbiosis_International_University_logo.svg/1200px-Symbiosis_International_University_logo.svg.png" },
  { name: "NMIMS School of Business Management", shortName: "NMIMS", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/NMIMS_Logo.svg/1200px-NMIMS_Logo.svg.png" },
  { name: "FORE School of Management", shortName: "FORE", location: "Delhi", city: "Delhi", state: "Delhi", logo: "https://www.fsm.ac.in/images/logo.png" },
  { name: "Jaipuria Institute of Management", shortName: "Jaipuria Noida", location: "Noida, Uttar Pradesh", city: "Noida", state: "Uttar Pradesh", logo: "https://www.jaipuria.ac.in/wp-content/uploads/2021/09/jaipuria-logo.png" },
  { name: "SOIL Institute of Management", shortName: "SOIL", location: "Manesar, Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "https://www.soilindia.net/images/logo.png" },
  { name: "Maharaja Agrasen Business School", shortName: "MABS", location: "Rohini Sector 22, Delhi", city: "Delhi", state: "Delhi" },
  { name: "University of Petroleum and Energy Studies", shortName: "UPES", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/UPES_Logo.svg/1200px-UPES_Logo.svg.png" },
  { name: "New Delhi Institute of Management", shortName: "NDIM", location: "Tughlakabad, Delhi", city: "Delhi", state: "Delhi", logo: "https://ndimdelhi.org/wp-content/uploads/2023/03/NDIM-Logo.png" },
  { name: "Indira University", shortName: "IU", location: "Tathawade, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "https://indirauniversity.edu.in/images/logo.png" },
  { name: "FOSTIIMA Business School", shortName: "FOSTIIMA", location: "Dwarka, Delhi", city: "Delhi", state: "Delhi" },
  { name: "Dr. DY Patil B-School", shortName: "DY Patil", location: "Tathawade, Pune, Maharashtra", city: "Pune", state: "Maharashtra", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/DPU_Logo.svg/1200px-DPU_Logo.svg.png" },
  { name: "BML Munjal University", shortName: "BMU", location: "Kapriwas, Haryana", city: "Kapriwas", state: "Haryana", logo: "https://www.bmu.edu.in/wp-content/uploads/2020/01/BMU-Logo.png" },
  { name: "GL Bajaj Institute of Management", shortName: "GL Bajaj", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh" },
  { name: "Christ Academy Institute for Advanced Studies", shortName: "CHRIST", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Christ_University_logo.svg/1200px-Christ_University_logo.svg.png" },
  { name: "Bennett University", shortName: "Bennett", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "https://www.bennett.edu.in/wp-content/uploads/2020/12/bennett-logo.png" },
  { name: "Quantum University", shortName: "Quantum", location: "Roorkee-Dehradun Highway, Uttarakhand", city: "Mandawar", state: "Uttarakhand" },
  { name: "Atlas SkillTech University", shortName: "Atlas", location: "Kurla, Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "https://atlasuniversity.edu.in/wp-content/uploads/2022/01/atlas-logo.png" },
  { name: "Jaipuria Institute of Management Lucknow", shortName: "Jaipuria Lucknow", location: "Lucknow, Uttar Pradesh", city: "Lucknow", state: "Uttar Pradesh", logo: "https://www.jaipuria.ac.in/wp-content/uploads/2021/09/jaipuria-logo.png" },
  { name: "Jaipuria Institute of Management Indore", shortName: "Jaipuria Indore", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", logo: "https://www.jaipuria.ac.in/wp-content/uploads/2021/09/jaipuria-logo.png" },
  { name: "Jaipuria Institute of Management Ghaziabad", shortName: "Jaipuria Ghaziabad", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", logo: "https://www.jaipuria.ac.in/wp-content/uploads/2021/09/jaipuria-logo.png" },
  { name: "Harsha Institutions", shortName: "Harsha", location: "Madavara, Bangalore, Karnataka", city: "Bangalore", state: "Karnataka" },
  { name: "Asian Business School", shortName: "ABS", location: "Noida, Uttar Pradesh", city: "Noida", state: "Uttar Pradesh" },
  { name: "Amity University", shortName: "Amity", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Amity_University_logo.svg/1200px-Amity_University_logo.svg.png" },
  { name: "Alliance University", shortName: "Alliance", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", logo: "https://www.alliance.edu.in/images/logo.png" },
  { name: "FMS-IIRM Jaipur", shortName: "FMS-IIRM", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan" },
  { name: "Doon Business School", shortName: "DBS", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand" },
  { name: "Woxsen University", shortName: "Woxsen", location: "Sadasivpet, Hyderabad, Telangana", city: "Hyderabad", state: "Telangana", logo: "https://www.woxsen.edu.in/assets/images/woxsen-logo.svg" },
  { name: "Universal AI University", shortName: "UAI", location: "Karjat, Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra" },
  { name: "Unique Institute of Business Management", shortName: "UIBM", location: "Katraj, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "Thiagarajar School of Management", shortName: "TSM", location: "Madurai, Tamil Nadu", city: "Madurai", state: "Tamil Nadu" },
  { name: "Ajeenkya DY Patil University (Sunstone)", shortName: "ADYPU", location: "Charholi Budruk, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "St. Andrews Institute of Technology & Management", shortName: "St. Andrews", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana" },
  { name: "Sparsh Global Business School", shortName: "SPARSH", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh" },
  { name: "Shanti Business School", shortName: "SBS", location: "Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat" },
  { name: "Sai Balaji International Institute", shortName: "SBIIMS", location: "Hinjewadi, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "Ramachandran International Institute of Management", shortName: "RIIM", location: "Bavdhan, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "Pune Institute of Business Management", shortName: "PIBM", location: "Pirangut, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "Pimpri Chinchwad University", shortName: "PCU", location: "Mohitewadi, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "Pune Business School", shortName: "PBS", location: "Nigdi, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "Noida International University", shortName: "NIU", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh" },
  { name: "Narayana Business School", shortName: "NBS", location: "Sanathal, Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat" },
  { name: "Mangalmay Institute of Management & Technology", shortName: "Mangalmay", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh" },
  { name: "Lloyd Business School", shortName: "Lloyd", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh" },
  { name: "KR Mangalam University", shortName: "KRM", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana" },
  { name: "Jaipuria School of Business", shortName: "JSB", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", logo: "https://www.jaipuria.ac.in/wp-content/uploads/2021/09/jaipuria-logo.png" },
  { name: "Jagdish Sheth School of Management", shortName: "JAGSoM", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka" },
  { name: "Jagannath International Management School", shortName: "JIMS", location: "Kalkaji, Delhi", city: "Delhi", state: "Delhi" },
  { name: "ITM Business School", shortName: "ITM", location: "Kharghar, Navi Mumbai, Maharashtra", city: "Navi Mumbai", state: "Maharashtra" },
  { name: "International School of Management Studies", shortName: "ISMS", location: "Ambegaon Budruk, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "ISBS Gurgaon", shortName: "ISBS", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana" },
  { name: "Indus Business School", shortName: "IIEBM", location: "Wakad, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "Indian School of Business and Research", shortName: "ISBR", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka" },
  { name: "IMS Unison University", shortName: "IMS", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand" },
  { name: "Imperial School of Business", shortName: "Imperial", location: "Hinjewadi, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "IILM Institute Jaipur", shortName: "IILM Jaipur", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", logo: "https://www.iilm.edu/wp-content/uploads/2021/03/IILM-Logo.png" },
  { name: "IILM Institute Lucknow", shortName: "IILM Lucknow", location: "Lucknow, Uttar Pradesh", city: "Lucknow", state: "Uttar Pradesh", logo: "https://www.iilm.edu/wp-content/uploads/2021/03/IILM-Logo.png" },
  { name: "IILM Institute Lodhi Road", shortName: "IILM Delhi", location: "Lodhi Road, Delhi", city: "Delhi", state: "Delhi", logo: "https://www.iilm.edu/wp-content/uploads/2021/03/IILM-Logo.png" },
  { name: "IILM Institute Gurgaon", shortName: "IILM Gurgaon", location: "Golf Road, Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "https://www.iilm.edu/wp-content/uploads/2021/03/IILM-Logo.png" },
  { name: "IILM Institute Greater Noida", shortName: "IILM G.Noida", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", logo: "https://www.iilm.edu/wp-content/uploads/2021/03/IILM-Logo.png" },
  { name: "IBMR Business School", shortName: "IBMR", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana" },
  { name: "HIMT Group of Institutions", shortName: "HIMT", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh" },
  { name: "Greater Noida Institute of Technology", shortName: "GNIOT", location: "Knowledge Park II, Greater Noida, UP", city: "Greater Noida", state: "Uttar Pradesh" },
  { name: "Global Institute of Business Studies", shortName: "GIBS", location: "Electronic City, Bangalore, Karnataka", city: "Bangalore", state: "Karnataka" },
  { name: "GD Goenka University", shortName: "GD Goenka", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", logo: "https://www.gdgoenka.com/wp-content/uploads/2021/04/gd-goenka-logo.png" },
  { name: "Fortune Institute of International Business", shortName: "FIIB", location: "Vasant Vihar, New Delhi", city: "Delhi", state: "Delhi" },
  { name: "ASM Institute of International Business and Research", shortName: "ASM IIBR", location: "Pimpri, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "Aureole School of Business Management", shortName: "ASBM", location: "Ambi, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
  { name: "AKEMI Business School", shortName: "AKEMI", location: "Marunji Road, Pune, Maharashtra", city: "Pune", state: "Maharashtra" },
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
          {/* Background Gradient Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-orange-500 to-orange-600" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-300/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-400/30 via-transparent to-transparent" />
          
          {/* Animated Geometric Shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-32 left-32 w-20 h-20 border-2 border-white/15 rounded-lg rotate-45 animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-white/20 rounded-full animate-[spin_25s_linear_infinite]" />
          <div className="absolute bottom-32 right-40 w-24 h-24 border-2 border-white/15 rounded-lg rotate-12 animate-[spin_18s_linear_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/10 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-white/10 rounded-lg rotate-45 animate-pulse delay-500" />
          
          {/* Floating Circles */}
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-1/3 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-10 w-48 h-48 bg-amber-200/20 rounded-full blur-2xl"
          />
          
          {/* Dot Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
          
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
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium mb-6 border border-white/30 shadow-lg"
              >
                <Building2 className="w-5 h-5" />
                <span>Our Partner Network</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Tied Up Universities
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                Explore our extensive network of premier business schools and universities across India. 
                Your gateway to world-class management education.
              </p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mt-12"
              >
                {[
                  { label: "Partner Universities", value: "150", icon: GraduationCap },
                  { label: "States Covered", value: statesList.length.toString(), icon: MapPin },
                  { label: "Students Placed", value: "10000", icon: Users },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/25 shadow-2xl hover:bg-white/25 transition-all duration-300 group"
                  >
                    <stat.icon className="w-7 h-7 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{stat.value}+</div>
                    <div className="text-sm text-white/80 mt-1">{stat.label}</div>
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

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing <span className="font-semibold text-primary">{filteredUniversities.length}</span> of {universities.length} universities
            </div>
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
                {showAll ? "Show Less" : `Show All ${filteredUniversities.length} Universities`}
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
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300"
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
