import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Users, Clock, Mail, Cookie, Baby, FileText, Phone } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "Information We Collect",
      icon: Eye,
      content: [
        { label: "Personal Information", text: "Name, email address, phone number, age, academic details, or any information you voluntarily provide during registration or communication." },
        { label: "Usage Information", text: "Pages visited, time spent on the website, device information, browser type, and IP address." },
        { label: "Communication Data", text: "Messages, feedback, or inquiries sent to us via forms, email, or chat features." }
      ]
    },
    {
      id: 2,
      title: "How We Use Your Information",
      icon: Users,
      content: [
        { text: "Providing access to courses, learning materials, and student services" },
        { text: "Managing student accounts and academic progress" },
        { text: "Communicating important updates, announcements, or support messages" },
        { text: "EM-MAT Exam Conduction" },
        { text: "Ensuring platform security and preventing misuse" }
      ],
      note: "We do not sell, rent, or trade student data to third parties."
    },
    {
      id: 3,
      title: "Data Protection & Security",
      icon: Lock,
      content: [
        { text: "Secure servers and encrypted data storage" },
        { text: "Restricted access to personal data (authorized personnel only)" },
        { text: "Regular monitoring and updates to prevent unauthorized access, loss, or misuse" }
      ],
      highlight: "Educate Me takes full responsibility for safeguarding student data and ensuring it is protected against any harm, misuse, or unauthorized disclosure."
    },
    {
      id: 4,
      title: "Data Sharing & Disclosure",
      icon: Shield,
      content: [
        { text: "When required by law or legal authorities" },
        { text: "To trusted service providers who support our platform (under strict confidentiality agreements)" },
        { text: "With your explicit consent" }
      ],
      note: "All third-party partners are required to follow strict data protection standards."
    },
    {
      id: 5,
      title: "Data Retention",
      icon: Clock,
      content: [
        { text: "We retain personal data only for as long as necessary to fulfil educational, legal, and operational purposes. Once data is no longer required, it is securely deleted or anonymized." }
      ]
    },
    {
      id: 6,
      title: "Student Rights & Choices",
      icon: Users,
      content: [
        { text: "Access their personal data" },
        { text: "Request correction or updates to their information" },
        { text: "Request deletion of their data (subject to legal requirements)" },
        { text: "Withdraw consent where applicable" }
      ],
      note: "Requests can be made by contacting us at admissions@educate-me.in"
    },
    {
      id: 7,
      title: "Cookies & Tracking Technologies",
      icon: Cookie,
      content: [
        { text: "We may use cookies and similar technologies to enhance website functionality and improve user experience. Cookies do not collect sensitive personal information and can be managed through your browser settings." }
      ]
    },
    {
      id: 8,
      title: "Children's Privacy",
      icon: Baby,
      content: [
        { text: "We are committed to protecting the privacy of minors. If we collect data from students under the applicable legal age, it is done with appropriate consent and solely for educational purposes." }
      ]
    },
    {
      id: 9,
      title: "Changes to This Privacy Policy",
      icon: FileText,
      content: [
        { text: "We may update this Privacy Policy from time to time to reflect improvements or legal requirements. Any changes will be posted on this page, and continued use of our services indicates acceptance of the updated policy." }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-orange-500 rounded-2xl shadow-lg shadow-primary/30 mb-6"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
                EDUCATE ME - WHERE POTENTIAL BECOMES PROGRESS
              </p>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                At Educate-Me, we are committed to protecting the privacy and personal data of our students, users, and visitors. Your trust matters to us, and we take full responsibility for ensuring that your information is handled securely, lawfully, and transparently.
              </p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 inline-block px-6 py-3 bg-primary/10 rounded-full"
              >
                <p className="text-primary font-medium">
                  By using our website and services, you agree to the practices described in this Privacy Policy.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30 overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-orange-100/50 rounded-bl-[100px] -translate-y-4 translate-x-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                    
                    <div className="relative z-10">
                      {/* Section Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-xl shadow-md">
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                          {section.id}. {section.title}
                        </h2>
                      </div>

                      {/* Section Content */}
                      <div className="pl-0 md:pl-16 space-y-3">
                        {section.content.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-2 w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            <p className="text-gray-700 leading-relaxed">
                              {item.label && (
                                <span className="font-semibold text-gray-900">{item.label}: </span>
                              )}
                              {item.text}
                            </p>
                          </div>
                        ))}

                        {/* Note */}
                        {section.note && (
                          <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                            <p className="text-orange-800 font-medium">{section.note}</p>
                          </div>
                        )}

                        {/* Highlight */}
                        {section.highlight && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-orange-100 rounded-xl border-l-4 border-primary"
                          >
                            <p className="text-gray-800 font-semibold">{section.highlight}</p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-br from-hero-dark to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                10. Contact Us
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us:
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.a
                  href="mailto:admissions@educate-me.in"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-orange-500 rounded-xl text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  admissions@educate-me.in
                </motion.a>
                
                <motion.a
                  href="https://educate-me.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold border border-white/20 transition-all duration-300"
                >
                  <FileText className="w-5 h-5" />
                  educate-me.in
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
