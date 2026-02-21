import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Users,
  CheckCircle,
  UserCheck,
  CreditCard,
  Globe,
  Plane,
  DollarSign,
  MapPin,
  ClipboardList,
  Phone,
  Mail,
  Award,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const admissionSteps = [
  { icon: FileText, label: "Fill Application Form" },
  { icon: Upload, label: "Submit Academic Documents" },
  { icon: Users, label: "Admission Committee Review" },
  { icon: ClipboardList, label: "Admission Committee Decision" },
  { icon: CheckCircle, label: "Committee Acceptance" },
  { icon: UserCheck, label: "Student Decision" },
  { icon: CreditCard, label: "Student Acceptance Fee" },
  { icon: Globe, label: "Initiate Visa Documentation Process" },
  { icon: ShieldCheck, label: "Receive Visa" },
  { icon: DollarSign, label: "Full Semester Fee Submission" },
  { icon: Plane, label: "Travel to Barbados" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const AUBMedicine = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="pt-10">
        {/* University Intro */}
        <section className="py-12 md:py-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                American University of Barbados
              </h1>
              <p className="text-lg text-blue-600 font-semibold mb-6">
                School of Medicine
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 sm:p-8 border border-gray-200">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  The American University of Barbados (AUB), School of Medicine,
                  is a globally recognized institution focused on creating the
                  next generation of healthcare professionals. Located in the
                  beautiful Caribbean island of Barbados, AUB offers an
                  affordable, accredited medical degree program with quality
                  clinical training in the USA and the Caribbean.
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  AUB follows a US-style curriculum and provides a highly
                  creative learning environment powered by advanced learning and
                  interactive technologies, including the Anatomage™ Table. The
                  university offers internationally recognized 4-year and
                  5½-year MD programmes taught entirely in English.
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  With clinical rotations available at affiliated hospitals in
                  the United States and the Caribbean, AUB prepares students to
                  practice medicine globally. The university is committed to
                  nurturing compassionate, skilled, and ethical physicians ready
                  to serve communities worldwide.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Admission Process */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900"
            >
              Process of Admission
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {admissionSteps.map((step, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                >
                  <Card className="p-4 sm:p-5 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-blue-500 font-semibold">
                        Step {index + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                        {step.label}
                      </h3>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentorship */}
        <section className="py-12 md:py-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900"
            >
              Mentorship Led By
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <Card className="p-6 sm:p-8 border border-gray-200 max-w-md w-full text-center hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Dr. Eshaa Ahirwar
                </h3>
                <p className="text-blue-600 font-semibold mb-4">(MD)</p>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm sm:text-base">
                    Contact details will be shared upon inquiry
                  </span>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Qualifications & Affiliations */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900"
            >
              Qualification & Affiliation
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 sm:p-8 border border-gray-200">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  The American University of Barbados (AUB) is licensed and
                  recognized by the Ministry of Education, Barbados, accredited
                  by the Caribbean Accreditation Authority for Education in
                  Medicine and other Health Professions (CAAM-HP), and listed in
                  the World Directory of Medical Schools. It operates a US-style
                  curriculum and is ECFMG certified, with clinical rotations
                  available in Barbados and the United States.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Licensed by Ministry of Education, Barbados",
                    "Accredited by CAAM-HP",
                    "Listed in World Directory of Medical Schools",
                    "ECFMG Certified",
                    "US-Style Curriculum",
                    "Clinical Rotations in USA & Caribbean",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AUBMedicine;
