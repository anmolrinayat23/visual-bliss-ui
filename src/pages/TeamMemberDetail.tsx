import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const TeamMemberDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const teamMembers = {
    "nikhil-sewaramani": {
      name: "Mr. Nikhil Sewaramani",
      role: "Founder & CEO",
      image: "/nikhil.jpg",
      fullDescription: `As the Founder and CEO of Educate Me, I am driven by a vision to revolutionize education accessibility and career readiness for students across India and beyond. With a strong foundation in educational leadership and admissions strategy, I built Educate Me as a mission-led platform empowering learners to make informed academic and career decisions through mentorship, technology, and outcome-driven guidance.

I combine entrepreneurial passion with strategic insight, with hands-on experience leading MBA admissions across top universities such as Sharda University and Bennett University (The Times Group), I developed deep expertise in student acquisition, academic counseling, and strategic enrollment growth at a PAN India level. 

Having personally guided thousands of students toward their career goals, I founded Educate Me with a mission far greater than business—to democratize education, provide transparent mentorship, and build a future-ready generation, transforming challenges into opportunities for growth. My journey reflects a commitment to nation-building through education—enabling thousands of aspiring professionals to unlock their potential, secure career-defining opportunities, and step into the global workforce with confidence.

I am not just building a company; I am building a movement—to educate, empower, and elevate.`,
      achievements: [
        "IIHM Kolkata graduate with international exposure in Portland, USA",
        "5+ years in education leadership at Bennett & Sharda University",
        "Founded Educate-Me to empower young minds and connect talent with opportunity",
        "Personally guided thousands of students toward career goals",
        "Expert in student acquisition and strategic enrollment growth"
      ]
    },
    "dr-awanish-sinha": {
      name: "Dr. Awanish Kumar Sinha",
      role: "Guest Faculty Expert - Finance",
      image: "/public/pp.jpg",
      fullDescription: `Welcome Dr. Awanish Kumar Sinha, a distinguished academician and seasoned banking and financial services expert, as our esteemed guest lecturer at Educate Me. Dr. Sinha brings over two decades of rich professional experience across the BFSI sector, having held key leadership roles with reputed institutions such as Yes Bank, ABN AMRO, and HDFC Bank.

A Ph.D. in Finance with extensive expertise in Non-Performing Assets and their impact on financial performance, Dr. Sinha has also made remarkable contributions to academia as a permanent faculty member at Sharda University, where he led critical initiatives in accreditation, curriculum development, and industry-academia collaborations. His work spans diverse domains including corporate banking, treasury management, trade finance, risk management, insurance, and global financial strategies.

Dr. Sinha is widely recognized as a thought leader, consultant, and motivational trainer, actively associated with national institutions including the National Skill Development Corporation, MSME projects, and AIMA. His publications in SCOPUS-indexed journals and his commitment to building financial acumen among professionals make him an inspiring voice in the industry.`,
      achievements: [
        "Ph.D. in Finance with expertise in Non-Performing Assets",
        "Over two decades in BFSI sector leadership roles",
        "Former leadership positions at Yes Bank, ABN AMRO, and HDFC Bank",
        "Permanent faculty member at Sharda University",
        "Publications in SCOPUS-indexed journals",
        "Associated with NSDC, MSME projects, and AIMA"
      ]
    },
    "dr-vaishali-arora": {
      name: "Dr. Vaishali Arora",
      role: "Visiting Faculty Expert - Law & Management",
      image: "/public/DR VAISHALI ARORA.PNG",
      fullDescription: `We are privileged to welcome Dr. Vaishali Arora, an accomplished legal academic and distinguished expert in Media Law and Women & Criminal Law. A graduate of the University of Delhi in both Commerce and Law, Dr. Arora pursued her LL.M from GGSIP University and went on to achieve her Ph.D. from the prestigious Indian Law Institute, New Delhi. She is also a UGC-NET qualified scholar who has devoted her career to advancing legal education and research.

With nearly a decade of rich academic experience across renowned institutions, Dr. Arora has made significant contributions to legal scholarship through ten research publications recognized in UGC-approved journals and two edited books published by globally reputed publishers such as Bloomsbury and Thomson Reuters. Her areas of expertise encompass Media Law, Women and Criminal Law, Contract Law, and Family Law, making her a leading voice in contemporary legal discourse.

Dr. Arora has not only participated in numerous national and international conferences and training programs but has also successfully organized high-profile academic events in collaboration with premier National Law Universities and international law schools. She has served as a judge in prestigious Moot Court Competitions and as a peer reviewer for reputed legal journals, highlighting her influence in the academic and professional legal fraternity.

A recipient of the Best Paper Presenter Award at the Law Commission of India's CLEA Regional Conference, Dr. Arora is known for her insightful perspectives, impactful teaching methodology, and passion for empowering the next generation of legal professionals.`,
      achievements: [
        "Ph.D. from Indian Law Institute, New Delhi",
        "UGC-NET qualified scholar",
        "10+ research publications in UGC-approved journals",
        "Two edited books with Bloomsbury and Thomson Reuters",
        "Expert in Media Law, Women & Criminal Law, Contract Law",
        "Best Paper Presenter Award at Law Commission of India CLEA Conference"
      ]
    },
    "mrs-shilpa-vishnoi": {
      name: "Mrs. Shilpa Agrawal Vishnoi",
      role: "Expert Guest Faculty - Physics & Student Advisory",
      image: "/public/shipla.jpg",
      fullDescription: `We are proud to welcome Mrs. Shilpa Agrawal Vishnoi, a visionary educator with over three decades of excellence in Physics education, as an Expert Guest Faculty at Educate Me. A dynamic mentor and lifelong learner, she has been a cornerstone of academic excellence and student empowerment since 1995.

An alumna of the Regional Institute of Education (RIE), Bhopal, and an M.Sc. in Physics from Barkatullah Vishwavidyalaya, Mrs. Vishnoi has dedicated her career to making Physics engaging, relatable, and deeply inspiring. She has served at Carmel Convent School, Bhopal — one of India's top institutions renowned for its world-class education — where she guided senior secondary students toward board and competitive exam success with clarity, confidence, and compassion.

Known for her hands-on approach to Physics experiments, Mrs. Vishnoi has conducted numerous lab sessions, board practicals, and national-level academic evaluations. She has been honored by the Ministry of Human Resource Development (Government of India) for her students' exceptional results in the CBSE Class XII Board Examinations and recognized by the Science Olympiad Foundation for mentoring winners at the national level.

Her impressive list of accolades includes the "Students' Choice Award" (2025 & 2024) by The Sage Group, the "Best Teacher Award" by Mitesh Rathi Group, the "Avantika Gyan Yagya Samman", and recognition by the Ratna Sagar Group for excellence in professional development.

Beyond academics, Mrs. Vishnoi is deeply committed to community growth and holistic education. She has contributed to the National Education Policy (NEP) implementation team, promoted environmental awareness through the School Environment Parliament, and served as Vice President of the Carmel Ex-Students' Association (CESA) — empowering youth for social and academic advancement.

At Educate Me, Mrs. Vishnoi brings her passion for teaching, her deep connection with students, and her belief that every learner has the power to excel. Her mentorship will guide students not only in mastering Physics but also in building confidence, curiosity, and a growth mindset.

Learning with her is more than studying Physics — it's discovering the joy of understanding how the world works.`,
      achievements: [
        "M.Sc. Physics from Barkatullah Vishwavidyalaya",
        "Over three decades of excellence in Physics education",
        "Honored by Ministry of HRD for exceptional CBSE results",
        "Students' Choice Award (2025 & 2024) by The Sage Group",
        "Best Teacher Award by Mitesh Rathi Group",
        "Contributed to NEP implementation team",
        "Vice President of Carmel Ex-Students' Association"
      ]
    },
    "dr-deepa-kumari": {
      name: "Dr. Deepa Kumari",
      role: "Expert Guest Faculty - Corporate Communication & Entrepreneurial Development",
      image: "/public/dipali.jpg",
      fullDescription: `At Educate Me, we proudly welcome Dr. Deepa Kumari, an accomplished academic leader and innovation-driven mentor with 18+ years of expertise in entrepreneurship development, corporate communication, and strategic leadership.

Dr. Kumari brings an exceptional record from Sharda University, where she has played a pivotal role in nurturing entrepreneurial talent and building real-world business competencies among students. An MBA & Ph.D. scholar, she has designed and taught industry-aligned courses including Social Entrepreneurship, Launch of New Ventures, and Technology & Platform Business Strategy — empowering learners with the mindset and tools to build and lead in the modern business world.

A certified entrepreneurship trainer associated with prestigious bodies like the Wadhwani Foundation, EDI, and the Institution Innovation Council (IIC), Dr. Kumari has mentored countless young innovators. She co-founded the Sharda Entrepreneurial Cell and was a key catalyst in launching the Sharda Launchpad Federation, guiding students from idea to incubation and connecting them with industry experts and investors.

Known for transforming student potential into startup reality, she has hosted impactful sessions featuring industry leaders from NeoStencil, Baluja's, MentorX, and more — building bridges between education and enterprise.

With 20+ research publications, Best Faculty Award recognition, and a career dedicated to fostering confidence, communication, innovation, and leadership — Dr. Kumari is an inspiration for every learner who dreams of building a bold future.

At Educate Me, she will empower students to communicate with clarity, think like entrepreneurs, and step confidently into the corporate world.

We are honored to have her guide our learners toward becoming confident professionals, dynamic entrepreneurs, and future-ready leaders.`,
      achievements: [
        "18+ years expertise in entrepreneurship development",
        "MBA & Ph.D. scholar with 20+ research publications",
        "Certified entrepreneurship trainer with Wadhwani Foundation & EDI",
        "Co-founded Sharda Entrepreneurial Cell",
        "Key catalyst in Sharda Launchpad Federation",
        "Best Faculty Award recognition",
        "Expert in corporate communication and strategic leadership"
      ]
    },
    "dr-avinish": {
      name: "Dr. Avinish",
      role: "Student Mentor & Visiting Faculty",
      image: "/dr-avinish.jpg",
      fullDescription: `Dr. Avinish brings extensive experience as a student mentor and visiting faculty expert, dedicated to holistic student development and academic excellence. With a passion for nurturing young minds, Dr. Avinish has been instrumental in guiding students towards their academic and career goals.

As a dedicated educator and mentor, Dr. Avinish focuses on personalized guidance and support, helping students navigate their educational journeys with confidence and clarity. His approach combines academic rigor with compassionate mentoring, ensuring that each student receives the attention and direction they need to succeed.

With expertise in student development and academic counseling, Dr. Avinish plays a crucial role in shaping the future of our students. His commitment to education and student success makes him an invaluable asset to the Educate Me team, where he continues to inspire and guide the next generation of professionals.`,
      achievements: [
        "Experienced student mentor and visiting faculty",
        "Expert in holistic student development",
        "Dedicated to academic excellence and student success",
        "Personalized guidance and academic counseling",
        "Compassionate mentoring approach",
        "Focus on building student confidence and clarity"
      ]
    },

    
    "kajol-samtani": {
      name: "Ms. Kajol Samtani",
      role: "Academic Excellence Lead",
      image: "/kajol.jpg",
      fullDescription: `Kajol Samtani is an accomplished commerce professional and academic achiever from the Institute for Excellence in Higher Education (IEHE), Bhopal, where she secured 1st Rank in both B.Com (Accounts Hons.) and M.Com (Marketing Management) with distinction.

She has demonstrated exceptional leadership as President of the Commerce Society (2023–24) and Secretary of the Swami Vivekanand Career Guidance Cell, driving impactful student initiatives and institutional growth. Kajol represented her department during the NAAC Inspection and contributed as a Member of the Internal Quality Assurance Cell (IQAC).

Her contributions include organizing flagship events such as Commercio 2k23, the RBI Outreach Program on Financial Stability, and various industry-oriented activities. A recipient of the Shri Chaturbhuj Garg Smriti Padak and multiple Merit Awards, she is recognized for her academic excellence, communication finesse, and organizational acumen.

Fluent in French and certified in Taxation, Kajol blends analytical depth with creativity and professionalism. Her journey exemplifies academic brilliance, leadership excellence, and a passion for continuous learning—values that align perfectly with Educate Me's vision of empowering future-ready leaders.`,
      achievements: [
        "1st Rank in B.Com (Accounts Hons.) and M.Com (Marketing Management)",
        "President of Commerce Society (2023–24)",
        "Secretary of Swami Vivekanand Career Guidance Cell",
        "Member of Internal Quality Assurance Cell (IQAC)",
        "Recipient of Shri Chaturbhuj Garg Smriti Padak",
        "Fluent in French and certified in Taxation",
        "Organized Commercio 2k23 and RBI Outreach Program"
      ]
    },
    "sulekha-sarkar": {
      name: "Ms. Sulekha Sarkar",
      role: "Student Counseling Head",
      image: "/sulekha.jpg",
      fullDescription: `Ms. Sulekha Sarkar brings over a decade of experience in student interaction, counselling, and academic administration. With extensive exposure to student support and tutoring, she has successfully guided learners through their educational journeys with patience and precision.

Known for her empathetic approach and strong administrative skills, Ms. Sarkar is dedicated to mentoring young minds and helping them realize their full potential. Her patient guidance and deep understanding of student needs make her an exceptional leader in our counseling department, ensuring every student receives personalized attention and support throughout their educational journey.`,
      achievements: [
        "Over a decade of experience in student counseling and academic administration",
        "Expert in guiding educational journeys with empathy and precision",
        "Strong administrative skills and dedicated mentoring approach"
      ]
    },
    "nilesh-raut": {
      name: "Mr. Nilesh Raut",
      role: "Financial Strategist",
      image: "/nilesh.jpg",
      fullDescription: `Mr. Nilesh Raut brings over 3.5 years of corporate experience as a Financial Analyst, with diverse expertise in inventory management and financial operations. A dedicated and results-driven professional, he holds a Bachelor's degree from NRI College Bhopal, a PGDCA from Makhanlal Institute, Bhopal, and an MBA from SAM Global University, Bhopal.

His analytical mindset and commitment to excellence make him an invaluable asset to our financial strategy team. Nilesh's expertise spans across financial analysis, inventory optimization, and operational efficiency, ensuring that Educate Me maintains strong financial health while delivering exceptional value to our students.`,
      achievements: [
        "3.5+ years as Financial Analyst with inventory management expertise",
        "Bachelor's from NRI College, PGDCA from Makhanlal Institute, MBA from SAM Global University",
        "Expert in financial analysis and operational efficiency"
      ]
    }
  };

  const member = teamMembers[id];

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto max-w-4xl py-12 px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Team Member Not Found</h1>
            <Button
              onClick={() => navigate('/about')}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Back to Team
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto max-w-6xl py-12 px-6">
          {/* Back Button */}
          <Button
            onClick={() => navigate('/about')}
            className="mb-8 bg-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-300"
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Team
          </Button>

          {/* Member Detail Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="flex flex-col md:flex-row">
              {/* Image Section - Fixed at top */}
              <div className="md:w-2/5 bg-gradient-to-br from-blue-500 to-orange-500 p-8 flex items-start justify-center order-1">
                <div className="w-64 h-64 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden mt-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Content Section - Wider now */}
              <div className="md:w-3/5 p-8 order-2">
                <div className="mb-6">
                  <h1 className="text-3xl font-black text-gray-900 mb-2">{member.name}</h1>
                  <p className="text-xl text-orange-500 font-bold mb-4">{member.role}</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500"></div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {member.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Key Achievements</h2>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamMemberDetail;