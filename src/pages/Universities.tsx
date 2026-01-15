import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Building2, GraduationCap, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface University {
  name: string;
  shortName?: string;
  location: string;
  city: string;
  state: string;
  category: "Premier" | "Tier-1" | "Tier-2" | "Emerging";
  logo?: string;
}

const universities: University[] = [
  { name: "IIM Rohtak", shortName: "IIM-R", location: "Rohtak, Haryana", city: "Rohtak", state: "Haryana", category: "Premier" },
  { name: "SP Jain Institute of Management and Research", shortName: "SPJIMR", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", category: "Premier" },
  { name: "NL Dalmia Institute of Management Studies", shortName: "NL Dalmia", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", category: "Tier-1" },
  { name: "IMT Ghaziabad", shortName: "IMT-G", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", category: "Premier" },
  { name: "IMT Hyderabad", shortName: "IMT-HY", location: "Hyderabad, Telangana", city: "Hyderabad", state: "Telangana", category: "Tier-1" },
  { name: "International Management Institute", shortName: "IMI", location: "Delhi & Kolkata", city: "Delhi", state: "Delhi", category: "Premier" },
  { name: "MDI Murshidabad", shortName: "MDI-M", location: "Murshidabad, West Bengal", city: "Murshidabad", state: "West Bengal", category: "Tier-1" },
  { name: "Lal Bahadur Shastri Institute of Management", shortName: "LBSIM", location: "Delhi", city: "Delhi", state: "Delhi", category: "Tier-1" },
  { name: "Great Lakes Institute of Management", shortName: "Great Lakes", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Premier" },
  { name: "Symbiosis Institute of Business Management", shortName: "SIBM", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", category: "Premier" },
  { name: "NMIMS School of Business Management", shortName: "NMIMS", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", category: "Premier" },
  { name: "FORE School of Management", shortName: "FORE", location: "Delhi", city: "Delhi", state: "Delhi", category: "Tier-1" },
  { name: "Jaipuria Institute of Management", shortName: "Jaipuria Noida", location: "Noida, Uttar Pradesh", city: "Noida", state: "Uttar Pradesh", category: "Tier-1" },
  { name: "SOIL Institute of Management", shortName: "SOIL", location: "Manesar, Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Tier-1" },
  { name: "Maharaja Agrasen Business School", shortName: "MABS", location: "Rohini Sector 22, Delhi", city: "Delhi", state: "Delhi", category: "Tier-2" },
  { name: "University of Petroleum and Energy Studies", shortName: "UPES", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", category: "Tier-1" },
  { name: "New Delhi Institute of Management", shortName: "NDIM", location: "Tughlakabad, Delhi", city: "Delhi", state: "Delhi", category: "Tier-2" },
  { name: "Indira University", shortName: "IU", location: "Tathawade, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "FOSTIIMA Business School", shortName: "FOSTIIMA", location: "Dwarka, Delhi", city: "Delhi", state: "Delhi", category: "Tier-2" },
  { name: "Dr. DY Patil B-School", shortName: "DY Patil", location: "Tathawade, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "BML Munjal University", shortName: "BMU", location: "Kapriwas, Haryana", city: "Kapriwas", state: "Haryana", category: "Tier-1" },
  { name: "GL Bajaj Institute of Management", shortName: "GL Bajaj", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "Christ Academy Institute for Advanced Studies", shortName: "CHRIST", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Tier-1" },
  { name: "Bennett University", shortName: "Bennett", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Tier-1" },
  { name: "Quantum University", shortName: "Quantum", location: "Roorkee-Dehradun Highway, Uttarakhand", city: "Mandawar", state: "Uttarakhand", category: "Tier-2" },
  { name: "Atlas SkillTech University", shortName: "Atlas", location: "Kurla, Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", category: "Emerging" },
  { name: "Jaipuria Institute of Management Lucknow", shortName: "Jaipuria Lucknow", location: "Lucknow, Uttar Pradesh", city: "Lucknow", state: "Uttar Pradesh", category: "Tier-1" },
  { name: "Jaipuria Institute of Management Indore", shortName: "Jaipuria Indore", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", category: "Tier-2" },
  { name: "Jaipuria Institute of Management Ghaziabad", shortName: "Jaipuria Ghaziabad", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "Harsha Institutions", shortName: "Harsha", location: "Madavara, Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Tier-2" },
  { name: "Asian Business School", shortName: "ABS", location: "Noida, Uttar Pradesh", city: "Noida", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "Amity University", shortName: "Amity", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Tier-1" },
  { name: "Alliance University", shortName: "Alliance", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Tier-1" },
  { name: "FMS-IIRM Jaipur", shortName: "FMS-IIRM", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", category: "Tier-2" },
  { name: "Doon Business School", shortName: "DBS", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", category: "Tier-2" },
  { name: "Woxsen University", shortName: "Woxsen", location: "Sadasivpet, Hyderabad, Telangana", city: "Hyderabad", state: "Telangana", category: "Tier-1" },
  { name: "Universal AI University", shortName: "UAI", location: "Karjat, Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", category: "Emerging" },
  { name: "Unique Institute of Business Management", shortName: "UIBM", location: "Katraj, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "Thiagarajar School of Management", shortName: "TSM", location: "Madurai, Tamil Nadu", city: "Madurai", state: "Tamil Nadu", category: "Tier-2" },
  { name: "Ajeenkya DY Patil University (Sunstone)", shortName: "ADYPU", location: "Charholi Budruk, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "St. Andrews Institute of Technology & Management", shortName: "St. Andrews", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Tier-2" },
  { name: "Sparsh Global Business School", shortName: "SPARSH", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "Shanti Business School", shortName: "SBS", location: "Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat", category: "Tier-2" },
  { name: "Sai Balaji International Institute", shortName: "SBIIMS", location: "Hinjewadi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "Ramachandran International Institute of Management", shortName: "RIIM", location: "Bavdhan, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "Pune Institute of Business Management", shortName: "PIBM", location: "Pirangut, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "Pimpri Chinchwad University", shortName: "PCU", location: "Mohitewadi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "Pune Business School", shortName: "PBS", location: "Nigdi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "Noida International University", shortName: "NIU", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "Narayana Business School", shortName: "NBS", location: "Sanathal, Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat", category: "Tier-2" },
  { name: "Mangalmay Institute of Management & Technology", shortName: "Mangalmay", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "Lloyd Business School", shortName: "Lloyd", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "KR Mangalam University", shortName: "KRM", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Tier-2" },
  { name: "Jaipuria School of Business", shortName: "JSB", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "Jagdish Sheth School of Management", shortName: "JAGSoM", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Tier-1" },
  { name: "Jagannath International Management School", shortName: "JIMS", location: "Kalkaji, Delhi", city: "Delhi", state: "Delhi", category: "Tier-2" },
  { name: "ITM Business School", shortName: "ITM", location: "Kharghar, Navi Mumbai, Maharashtra", city: "Navi Mumbai", state: "Maharashtra", category: "Tier-1" },
  { name: "International School of Management Studies", shortName: "ISMS", location: "Ambegaon Budruk, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "ISBS Gurgaon", shortName: "ISBS", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Tier-2" },
  { name: "Indus Business School", shortName: "IIEBM", location: "Wakad, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "Indian School of Business and Research", shortName: "ISBR", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Tier-1" },
  { name: "IMS Unison University", shortName: "IMS", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", category: "Tier-2" },
  { name: "Imperial School of Business", shortName: "Imperial", location: "Hinjewadi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "IILM Institute Jaipur", shortName: "IILM Jaipur", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", category: "Tier-2" },
  { name: "IILM Institute Lucknow", shortName: "IILM Lucknow", location: "Lucknow, Uttar Pradesh", city: "Lucknow", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "IILM Institute Lodhi Road", shortName: "IILM Delhi", location: "Lodhi Road, Delhi", city: "Delhi", state: "Delhi", category: "Tier-1" },
  { name: "IILM Institute Gurgaon", shortName: "IILM Gurgaon", location: "Golf Road, Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Tier-1" },
  { name: "IILM Institute Greater Noida", shortName: "IILM G.Noida", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "IBMR Business School", shortName: "IBMR", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Tier-2" },
  { name: "HIMT Group of Institutions", shortName: "HIMT", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "Greater Noida Institute of Technology", shortName: "GNIOT", location: "Knowledge Park II, Greater Noida, UP", city: "Greater Noida", state: "Uttar Pradesh", category: "Tier-2" },
  { name: "Global Institute of Business Studies", shortName: "GIBS", location: "Electronic City, Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Tier-2" },
  { name: "GD Goenka University", shortName: "GD Goenka", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Tier-1" },
  { name: "Fortune Institute of International Business", shortName: "FIIB", location: "Vasant Vihar, New Delhi", city: "Delhi", state: "Delhi", category: "Tier-2" },
  { name: "ASM Institute of International Business and Research", shortName: "ASM IIBR", location: "Pimpri, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "Aureole School of Business Management", shortName: "ASBM", location: "Ambi, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
  { name: "AKEMI Business School", shortName: "AKEMI", location: "Marunji Road, Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Tier-2" },
];

const categoryColors = {
  "Premier": "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  "Tier-1": "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
  "Tier-2": "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
  "Emerging": "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
};

const statesList = [...new Set(universities.map(u => u.state))].sort();

const Universities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);

  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (uni.shortName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = selectedCategory === "All" || uni.category === selectedCategory;
    const matchesState = selectedState === "All" || uni.state === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  });

  const displayedUniversities = showAll ? filteredUniversities : filteredUniversities.slice(0, 12);

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

  const stats = {
    total: universities.length,
    premier: universities.filter(u => u.category === "Premier").length,
    tier1: universities.filter(u => u.category === "Tier-1").length,
    states: statesList.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-blue-50">
      <AnnouncementPopup />
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-700" />
          
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6"
              >
                <Building2 className="w-5 h-5" />
                <span>Our Partner Network</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-primary">
                  Tied Up Universities
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Explore our extensive network of premier business schools and universities across India. 
                Your gateway to world-class management education.
              </p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12"
              >
                {[
                  { label: "Partner Universities", value: stats.total, icon: GraduationCap },
                  { label: "Premier Institutes", value: stats.premier, icon: Star },
                  { label: "Tier-1 Colleges", value: stats.tier1, icon: Building2 },
                  { label: "States Covered", value: stats.states, icon: MapPin },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary/10 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}+</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
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
            <div className="flex flex-col lg:flex-row gap-4 items-center">
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

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {["All", "Premier", "Tier-1", "Tier-2", "Emerging"].map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 transition-all duration-300 ${
                      selectedCategory === cat 
                        ? "bg-primary text-white shadow-lg" 
                        : "hover:bg-primary/10 hover:border-primary"
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
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
                    {/* Logo Placeholder */}
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <GraduationCap className="w-8 h-8 text-primary" />
                      </div>
                      <Badge className={`absolute -top-2 -right-2 text-[10px] px-2 py-0.5 ${categoryColors[uni.category]} shadow-md`}>
                        {uni.category}
                      </Badge>
                    </div>

                    {/* University Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {uni.shortName || uni.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                        {uni.name !== uni.shortName && uni.shortName ? uni.name : ""}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto pt-4 border-t border-gray-100">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="line-clamp-1">{uni.location}</span>
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
