import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Building2, GraduationCap, ChevronDown, BookOpen } from "lucide-react";
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

interface UGUniversity {
  name: string;
  fee: string;
  placement: string;
}

interface UGCategory {
  title: string;
  icon: string;
  universities: UGUniversity[];
}

// PG Universities (existing)
const pgUniversities: University[] = [
  { name: "SP Jain Institute of Management and Research", shortName: "SPJIMR", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "/SP Jain Institute of Management and Research.png" },
  { name: "NL Dalmia Institute of Management Studies", shortName: "NL Dalmia", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "/NL Dalmia Institute of Management Studies.png" },
  { name: "IMT Ghaziabad", shortName: "IMT-G", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", logo: "/IMT Ghaziabad.jpg" },
  { name: "IMT Hyderabad", shortName: "IMT-HY", location: "Hyderabad, Telangana", city: "Hyderabad", state: "Telangana", logo: "/IMT Hyderabad.webp" },
  { name: "International Management Institute", shortName: "IMI", location: "Kolkata", city: "Kolkata", state: "West Bengal", logo: "/International Management Institute.jpeg" },
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
  { name: "Indian School of Business and Research", shortName: "ISB&M", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", logo: "/Indian School of Business and Research.gif" },
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
  { name: "Ashoka University", shortName: "Ashoka", location: "Sonepat, Haryana", city: "Sonepat", state: "Haryana", logo: "/Ashoka University.webp" },
  { name: "Prestige University", shortName: "Prestige", location: "Indore", city: "Indore", state: "Madhya Pradesh", logo: "/Prestige University.webp" },
  { name: "Amity University", shortName: "Amity", location: "Gwalior, Madhya Pradesh", city: "Gwalior", state: "Madhya Pradesh", logo: "/Amity University.webp" },
  { name: "Renaissance University", shortName: "Renaissance", location: "Indore, Madhya Pradesh", city: "Indore", state: "Madhya Pradesh", logo: "/Renaissance University.webp" },
  { name: "SP Jain School of Global Management (SPJSGM)", shortName: "SPJSGM", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", logo: "/SP Jain School of Global Management.webp" },
];

// UG Universities as flat list with category tags
const ugUniversities: (University & { category: string })[] = [
  // BTech
  { name: "Manipal University", shortName: "MANIPAL", location: "All Campuses", city: "Manipal", state: "Karnataka", category: "BTech" },
  { name: "Bennett University", shortName: "BENNETT", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "BTech" },
  { name: "Thapar Institute of Technology", shortName: "THAPAR", location: "Patiala, Punjab", city: "Patiala", state: "Punjab", category: "BTech" },
  { name: "VIT Bhopal", shortName: "VIT", location: "Bhopal, Madhya Pradesh", city: "Bhopal", state: "Madhya Pradesh", category: "BTech" },
  { name: "MANIT Bhopal", shortName: "MANIT", location: "Bhopal, Madhya Pradesh", city: "Bhopal", state: "Madhya Pradesh", category: "BTech" },
  { name: "BITS Pilani", shortName: "BITS Pilani", location: "Pilani, Rajasthan", city: "Pilani", state: "Rajasthan", category: "BTech" },
  { name: "BITS Goa", shortName: "BITS Goa", location: "Goa", city: "Goa", state: "Goa", category: "BTech" },
  { name: "SRM University", shortName: "SRM", location: "All Campuses", city: "Chennai", state: "Tamil Nadu", category: "BTech" },
  { name: "Amrita University", shortName: "Amrita", location: "All Campuses", city: "Coimbatore", state: "Tamil Nadu", category: "BTech" },
  { name: "IIIT Delhi", shortName: "IIIT Delhi", location: "Delhi", city: "Delhi", state: "Delhi", category: "BTech" },
  { name: "Universal AI University", shortName: "UAI", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", category: "BTech" },
  { name: "UPES Dehradun", shortName: "UPES", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", category: "BTech" },
  { name: "GL Bajaj Institute", shortName: "GL Bajaj", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "BTech" },
  { name: "PES University", shortName: "PES", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "BTech" },
  { name: "NMAM Institute of Technology", shortName: "NMAM", location: "Karnataka", city: "Nitte", state: "Karnataka", category: "BTech" },
  { name: "Chandigarh University", shortName: "CU", location: "Chandigarh, Punjab", city: "Chandigarh", state: "Punjab", category: "BTech" },
  { name: "PIET University", shortName: "PIET", location: "Panipat, Haryana", city: "Panipat", state: "Haryana", category: "BTech" },
  { name: "GNIOT Greater Noida", shortName: "GNIOT", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "BTech" },
  // Commerce
  { name: "Mount Carmel College", shortName: "MCC", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Commerce" },
  { name: "SCMS Pune (BBA)", shortName: "SCMS", location: "Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Commerce" },
  { name: "St Joseph's College of Commerce", shortName: "SJCC", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Commerce" },
  { name: "Christ University", shortName: "CHRIST", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Commerce" },
  { name: "Jain University", shortName: "JAIN", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Commerce" },
  { name: "Ashoka University", shortName: "Ashoka", location: "Sonepat, Haryana", city: "Sonepat", state: "Haryana", category: "Commerce" },
  { name: "Bennett University", shortName: "BENNETT", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Commerce" },
  { name: "IMS Ghaziabad", shortName: "IMS", location: "Ghaziabad, Uttar Pradesh", city: "Ghaziabad", state: "Uttar Pradesh", category: "Commerce" },
  { name: "Graphic Era University", shortName: "GEU", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", category: "Commerce" },
  { name: "UPES Dehradun", shortName: "UPES", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", category: "Commerce" },
  { name: "Jaipuria Institute of Management", shortName: "Jaipuria", location: "Noida, Uttar Pradesh", city: "Noida", state: "Uttar Pradesh", category: "Commerce" },
  { name: "Harsha Institutions", shortName: "Harsha", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Commerce" },
  { name: "SRU Warangal", shortName: "SRU", location: "Warangal, Telangana", city: "Warangal", state: "Telangana", category: "Commerce" },
  { name: "PIET University", shortName: "PIET", location: "Panipat, Haryana", city: "Panipat", state: "Haryana", category: "Commerce" },
  { name: "Doon Business School", shortName: "DBS", location: "Dehradun, Uttarakhand", city: "Dehradun", state: "Uttarakhand", category: "Commerce" },
  { name: "St Andrews Gurgaon", shortName: "St Andrews", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Commerce" },
  { name: "Universal AI University", shortName: "UAI", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", category: "Commerce" },
  { name: "NMIMS", shortName: "NMIMS", location: "All Campuses", city: "Mumbai", state: "Maharashtra", category: "Commerce" },
  // Medical
  { name: "American University of Barbados", shortName: "AUB", location: "Barbados (USMLE, ECFMGE)", city: "Barbados", state: "International", category: "Medical" },
  // Nursing
  { name: "SRM College of Nursing", shortName: "SRM Nursing", location: "Chennai, Tamil Nadu", city: "Chennai", state: "Tamil Nadu", category: "Nursing" },
  { name: "Parul University", shortName: "Parul", location: "Vadodara, Gujarat", city: "Vadodara", state: "Gujarat", category: "Nursing" },
  { name: "Manipal College of Nursing", shortName: "Manipal", location: "Manipal, Karnataka", city: "Manipal", state: "Karnataka", category: "Nursing" },
  { name: "Harsha Institutions", shortName: "Harsha", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Nursing" },
  { name: "NIMS Jaipur", shortName: "NIMS", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", category: "Nursing" },
  { name: "KGMU Lucknow", shortName: "KGMU", location: "Lucknow, Uttar Pradesh", city: "Lucknow", state: "Uttar Pradesh", category: "Nursing" },
  { name: "Integral University", shortName: "Integral", location: "Lucknow, Uttar Pradesh", city: "Lucknow", state: "Uttar Pradesh", category: "Nursing" },
  { name: "Chitkara University", shortName: "Chitkara", location: "Punjab", city: "Rajpura", state: "Punjab", category: "Nursing" },
  { name: "SGT University", shortName: "SGT", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Nursing" },
  // B Pharma
  { name: "GLA University", shortName: "GLA", location: "Mathura, Uttar Pradesh", city: "Mathura", state: "Uttar Pradesh", category: "B Pharma" },
  { name: "SGT University", shortName: "SGT", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "B Pharma" },
  { name: "KIIT Odisha", shortName: "KIIT", location: "Bhubaneswar, Odisha", city: "Bhubaneswar", state: "Odisha", category: "B Pharma" },
  { name: "SRM University", shortName: "SRM", location: "Chennai, Tamil Nadu", city: "Chennai", state: "Tamil Nadu", category: "B Pharma" },
  { name: "Nirma University", shortName: "Nirma", location: "Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat", category: "B Pharma" },
  { name: "Harsha Institutions", shortName: "Harsha", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "B Pharma" },
  { name: "Chandigarh University", shortName: "CU", location: "Chandigarh, Punjab", city: "Chandigarh", state: "Punjab", category: "B Pharma" },
  // Forensics
  { name: "Parul University", shortName: "Parul", location: "Vadodara, Gujarat", city: "Vadodara", state: "Gujarat", category: "Forensics" },
  { name: "Jain University", shortName: "JAIN", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Forensics" },
  { name: "Apex University", shortName: "Apex", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", category: "Forensics" },
  { name: "SGT University", shortName: "SGT", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "Forensics" },
  { name: "Integral University", shortName: "Integral", location: "Lucknow, Uttar Pradesh", city: "Lucknow", state: "Uttar Pradesh", category: "Forensics" },
  { name: "Jaipur National University", shortName: "JNU", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", category: "Forensics" },
  { name: "National Forensic Sciences University", shortName: "NFSU", location: "Gandhinagar, Gujarat", city: "Gandhinagar", state: "Gujarat", category: "Forensics" },
  { name: "Christ University", shortName: "CHRIST", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Forensics" },
  // BPT
  { name: "LPU Punjab", shortName: "LPU", location: "Jalandhar, Punjab", city: "Jalandhar", state: "Punjab", category: "BPT" },
  { name: "Chandigarh University", shortName: "CU", location: "Chandigarh, Punjab", city: "Chandigarh", state: "Punjab", category: "BPT" },
  { name: "SGT University", shortName: "SGT", location: "Gurgaon, Haryana", city: "Gurgaon", state: "Haryana", category: "BPT" },
  { name: "KIIT Odisha", shortName: "KIIT", location: "Bhubaneswar, Odisha", city: "Bhubaneswar", state: "Odisha", category: "BPT" },
  { name: "NIMS Jaipur", shortName: "NIMS", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", category: "BPT" },
  { name: "Parul University", shortName: "Parul", location: "Vadodara, Gujarat", city: "Vadodara", state: "Gujarat", category: "BPT" },
  { name: "GLA University", shortName: "GLA", location: "Mathura, Uttar Pradesh", city: "Mathura", state: "Uttar Pradesh", category: "BPT" },
  // Liberal Arts
  { name: "Bennett University", shortName: "BENNETT", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "Liberal Arts" },
  { name: "Symbiosis School of Liberal Arts", shortName: "SSLA", location: "Pune, Maharashtra", city: "Pune", state: "Maharashtra", category: "Liberal Arts" },
  { name: "Jain University", shortName: "JAIN", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "Liberal Arts" },
  { name: "KREA University", shortName: "KREA", location: "Sri City, Andhra Pradesh", city: "Sri City", state: "Andhra Pradesh", category: "Liberal Arts" },
  { name: "Ashoka University", shortName: "Ashoka", location: "Sonepat, Haryana", city: "Sonepat", state: "Haryana", category: "Liberal Arts" },
  // BA
  { name: "Bennett University", shortName: "BENNETT", location: "Greater Noida, Uttar Pradesh", city: "Greater Noida", state: "Uttar Pradesh", category: "BA" },
  { name: "Manav Rachna University", shortName: "MRU", location: "Faridabad, Haryana", city: "Faridabad", state: "Haryana", category: "BA" },
  { name: "NIMS Jaipur", shortName: "NIMS", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", category: "BA" },
  { name: "Apex University", shortName: "Apex", location: "Jaipur, Rajasthan", city: "Jaipur", state: "Rajasthan", category: "BA" },
  { name: "Jain University", shortName: "JAIN", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", category: "BA" },
  { name: "SRM University", shortName: "SRM", location: "All Campuses", city: "Chennai", state: "Tamil Nadu", category: "BA" },
  { name: "Amrita University", shortName: "Amrita", location: "All Campuses", city: "Coimbatore", state: "Tamil Nadu", category: "BA" },
  { name: "KIIT Odisha", shortName: "KIIT", location: "Bhubaneswar, Odisha", city: "Bhubaneswar", state: "Odisha", category: "BA" },
  { name: "Adamas University", shortName: "Adamas", location: "Kolkata, West Bengal", city: "Kolkata", state: "West Bengal", category: "BA" },
  { name: "Brainware University", shortName: "Brainware", location: "Kolkata, West Bengal", city: "Kolkata", state: "West Bengal", category: "BA" },
];

const ugCategoryList = ["All", ...new Set(ugUniversities.map(u => u.category))];

const statesList = [...new Set(pgUniversities.map(u => u.state))].sort();

const Universities = () => {
  const [activeTab, setActiveTab] = useState<"pg" | "ug">("pg");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [ugSearch, setUgSearch] = useState("");
  const [ugCategoryFilter, setUgCategoryFilter] = useState<string>("All");
  const [ugShowAll, setUgShowAll] = useState(false);

  const filteredUniversities = pgUniversities.filter((uni) => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (uni.shortName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesState = selectedState === "All" || uni.state === selectedState;
    return matchesSearch && matchesState;
  });

  const displayedUniversities = showAll ? filteredUniversities : filteredUniversities.slice(0, 12);

  const filteredUgUniversities = ugUniversities.filter((uni) => {
    const matchesSearch = uni.name.toLowerCase().includes(ugSearch.toLowerCase()) ||
      uni.location.toLowerCase().includes(ugSearch.toLowerCase()) ||
      (uni.shortName?.toLowerCase().includes(ugSearch.toLowerCase()) ?? false);
    const matchesCategory = ugCategoryFilter === "All" || uni.category === ugCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const displayedUgUniversities = ugShowAll ? filteredUgUniversities : filteredUgUniversities.slice(0, 12);

  const handleImageError = (uniName: string) => {
    setImageErrors(prev => new Set(prev).add(uniName));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-blue-50">
      <AnnouncementPopup />
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-slate-900" />
          
          {/* Logo Collage - split PG and UG */}
          <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 p-4 opacity-90">
            {pgUniversities.slice(0, 40).map((uni, index) => (
              <motion.div 
                key={`pg-logo-${index}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02, duration: 0.4 }}
                className="aspect-square bg-white rounded-xl p-3 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                {uni.logo && (
                  <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90" />
          
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
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-orange-500 backdrop-blur-md rounded-full text-white font-medium mb-6 border border-orange-400/50 shadow-xl"
              >
                <Building2 className="w-5 h-5" />
                <span>Our Partner Network</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                <span className="bg-gradient-to-r from-orange-400 via-primary to-amber-400 bg-clip-text text-transparent">Tied Up Universities</span>
              </h1>
              
              <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
                Access a powerful network of top universities and institutions across India, connected through exclusive admission partnerships for world-class education.
              </p>

              {/* PG / UG Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center mb-10"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-full p-1.5 border border-white/20 shadow-2xl flex gap-1">
                  <button
                    onClick={() => { setActiveTab("pg"); setShowAll(false); }}
                    className={`relative px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                      activeTab === "pg"
                        ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg scale-105"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 inline-block mr-2 -mt-0.5" />
                    PG Universities
                  </button>
                  <button
                    onClick={() => { setActiveTab("ug"); setShowAll(false); }}
                    className={`relative px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                      activeTab === "ug"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <BookOpen className="w-5 h-5 inline-block mr-2 -mt-0.5" />
                    UG Universities
                  </button>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-row justify-center gap-4 md:gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-primary/30 to-orange-600/30 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-orange-500/40 shadow-2xl hover:border-orange-400 transition-all duration-300 group min-w-[140px] md:min-w-[160px]"
                >
                  <GraduationCap className="w-7 h-7 text-orange-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 drop-shadow-md">150+</div>
                  <div className="text-sm text-orange-200 mt-1">Partner Universities</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative bg-gradient-to-br from-amber-500/40 via-primary/50 to-orange-600/40 backdrop-blur-lg rounded-2xl p-5 md:p-6 border-2 border-amber-400/60 shadow-2xl hover:border-amber-300 transition-all duration-300 group min-w-[140px] md:min-w-[160px] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-400/30 rounded-full blur-xl group-hover:bg-amber-400/50 transition-all duration-300" />
                  <div className="relative z-10">
                    <MapPin className="w-8 h-8 text-amber-300 mx-auto mb-3 group-hover:scale-110 group-hover:text-amber-200 transition-all duration-300" />
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
                      Pan India
                    </div>
                    <div className="text-xs text-amber-200/80 mt-2 font-medium">Nationwide Network</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249 250 251)" fillOpacity="1"/>
            </svg>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {activeTab === "pg" ? (
            <motion.div
              key="pg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              {/* PG Filter Section */}
              <section className="container mx-auto px-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/10"
                >
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Search PG universities by name or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 py-6 text-base rounded-xl border-2 border-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
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
                </motion.div>
              </section>

              {/* PG Universities Grid */}
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

                {filteredUniversities.length > 12 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-12">
                    <Button
                      onClick={() => setShowAll(!showAll)}
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 py-6 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      {showAll ? "Show Less" : "Show All Universities"}
                      <ChevronDown className={`ml-2 w-5 h-5 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
                    </Button>
                  </motion.div>
                )}

                {filteredUniversities.length === 0 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 text-primary/50" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Universities Found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </motion.div>
                )}
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="ug"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* UG Filter Section */}
              <section className="container mx-auto px-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/10"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="Search UG universities by name or location..."
                          value={ugSearch}
                          onChange={(e) => setUgSearch(e.target.value)}
                          className="pl-12 py-6 text-base rounded-xl border-2 border-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ugCategoryList.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setUgCategoryFilter(cat); setUgShowAll(false); }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            ugCategoryFilter === cat
                              ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-md"
                              : "bg-gray-100 text-foreground hover:bg-gray-200"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* UG Universities Grid - same as PG */}
              <section className="container mx-auto px-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {displayedUgUniversities.map((uni, index) => (
                    <motion.div key={`${uni.name}-${uni.category}-${index}`} variants={itemVariants}>
                      <Card className="group h-full overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-transparent hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="relative mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md overflow-hidden">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {(uni.shortName || uni.name).charAt(0)}
                                </span>
                              </div>
                            </div>
                            <span className="absolute top-0 right-0 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {uni.category}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
                              {uni.shortName || uni.name}
                            </h3>
                            {uni.name !== uni.shortName && uni.shortName && (
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                                {uni.name}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto pt-4 border-t border-gray-100">
                            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="line-clamp-1">{uni.location}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                {filteredUgUniversities.length > 12 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-12">
                    <Button
                      onClick={() => setUgShowAll(!ugShowAll)}
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 py-6 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      {ugShowAll ? "Show Less" : "Show All Universities"}
                      <ChevronDown className={`ml-2 w-5 h-5 transition-transform duration-300 ${ugShowAll ? "rotate-180" : ""}`} />
                    </Button>
                  </motion.div>
                )}

                {filteredUgUniversities.length === 0 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 text-primary/50" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Universities Found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </motion.div>
                )}
              </section>
            </motion.div>
          )}
        </AnimatePresence>

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
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
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
