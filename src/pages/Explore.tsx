import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Brain, MessageSquare, TrendingUp, Users, Lightbulb, BookMarked, GraduationCap } from "lucide-react";

const bookCategories = [
  {
    id: "personal-growth",
    title: "Personal Growth & Mindset",
    icon: Brain,
    books: [
      { title: "Atomic Habits", author: "James Clear" },
      { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey" },
      { title: "Mindset: The New Psychology of Success", author: "Carol S. Dweck" },
    ],
  },
  {
    id: "communication",
    title: "Communication & Soft Skills",
    icon: MessageSquare,
    books: [
      { title: "How to Win Friends and Influence People", author: "Dale Carnegie" },
      { title: "The Art of Public Speaking", author: "Dale Carnegie" },
      { title: "Talk Like TED", author: "Carmine Gallo" },
    ],
  },
  {
    id: "business",
    title: "Business, Economics & Management",
    icon: TrendingUp,
    books: [
      { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
      { title: "The Lean Startup", author: "Eric Ries" },
      { title: "Zero to One", author: "Peter Thiel" },
    ],
  },
  {
    id: "leadership",
    title: "Leadership & Inspiration",
    icon: Users,
    books: [
      { title: "Wings of Fire", author: "Dr. A.P.J. Abdul Kalam" },
      { title: "Leaders Eat Last", author: "Simon Sinek" },
      { title: "The Diary of a Young Girl", author: "Anne Frank" },
    ],
  },
  {
    id: "critical-thinking",
    title: "Critical Thinking & General Awareness",
    icon: Lightbulb,
    books: [
      { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari" },
      { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
      { title: "The Tipping Point", author: "Malcolm Gladwell" },
    ],
  },
  {
    id: "literature",
    title: "Literature & Classics",
    icon: BookMarked,
    books: [
      { title: "To Kill a Mockingbird", author: "Harper Lee" },
      { title: "1984", author: "George Orwell" },
      { title: "The Alchemist", author: "Paulo Coelho" },
    ],
  },
  {
    id: "course-relevant",
    title: "Course-Relevant (Optional Picks)",
    icon: GraduationCap,
    books: [
      { title: "The Art of Computer Programming", author: "Donald Knuth", note: "CS students" },
      { title: "Anatomy & Physiology Made Easy", author: "Elaine N. Marieb", note: "BPT/Bio students" },
      { title: "The Elements of Style", author: "William Strunk Jr. & E.B. White", note: "Arts/BA students" },
      { title: "Fountainhead", author: "Ayn Rand", note: "Architecture/Design inspiration" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Explore = () => {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-hero-dark via-primary/5 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.3)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.2)_0%,transparent_50%)]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-gradient-to-r from-primary to-primary/80 p-4 rounded-2xl shadow-glow">
                <BookOpen className="w-16 h-16 text-primary-foreground animate-pulse-ring" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_auto]">
              Discover Curated Resources
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              For Personal Growth, Skill Enhancement & Academic Readiness
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed"
            >
              At Educate-Me, we believe true success begins with preparation. Our exclusive pre-joining 
              resources are thoughtfully designed to help you elevate your knowledge, refine your skills, 
              and build the confidence needed to excel in your academic journey.
            </motion.p>
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float-delayed" />
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-background to-vision-bg">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-muted/50 p-1">
              <TabsTrigger 
                value="books" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Popular Books
              </TabsTrigger>
              <TabsTrigger 
                value="prep" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Prep Materials
              </TabsTrigger>
            </TabsList>

            <TabsContent value="books" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 text-center"
              >
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Popular Books to Read
                </h2>
                <p className="text-lg text-muted-foreground italic">
                  (Actually you have to Read, And Learn)
                </p>
                <p className="text-base text-foreground/80 mt-4 max-w-3xl mx-auto">
                  Immerse yourself in a curated selection of influential books that broaden perspectives, 
                  spark innovative thinking, and nurture leadership qualities — giving you a distinct 
                  intellectual edge even before your first class.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {bookCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div key={category.id} variants={itemVariants}>
                      <Card className="h-full group hover:shadow-hover transition-all duration-300 border-primary/20 hover:border-primary/50 bg-gradient-to-br from-card to-primary/5">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-glow group-hover:scale-110 transition-transform duration-300">
                              <Icon className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                              {category.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {category.books.map((book, bookIndex) => (
                              <motion.li
                                key={bookIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + bookIndex * 0.05 }}
                                className="group/item"
                              >
                                <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200">
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary group-hover/item:scale-150 transition-transform duration-200" />
                                  <div className="flex-1">
                                    <p className="font-semibold text-foreground group-hover/item:text-primary transition-colors duration-200">
                                      {book.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{book.author}</p>
                                    {book.note && (
                                      <p className="text-xs text-primary/70 italic mt-1">({book.note})</p>
                                    )}
                                  </div>
                                </div>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            <TabsContent value="prep" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-block mb-8">
                  <div className="bg-gradient-to-r from-primary to-primary/80 p-6 rounded-2xl shadow-glow">
                    <GraduationCap className="w-20 h-20 text-primary-foreground animate-float" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Course-Wise Pre-Joining Prep Materials
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Access meticulously developed course-specific materials that introduce key concepts, 
                  enhance academic readiness, and familiarize you with the learning environment of top 
                  private universities. Step in prepared, confident, and ready to lead.
                </p>
                
                <Card className="mt-12 border-primary/30 bg-gradient-to-br from-primary/5 to-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">Coming Soon</CardTitle>
                    <CardDescription className="text-base">
                      We're carefully curating specialized preparation materials for various courses. 
                      These resources will help you get a head start in your chosen field.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      {[
                        "Computer Science & Engineering",
                        "Business Administration",
                        "Life Sciences & Biotechnology",
                        "Arts & Humanities",
                        "Architecture & Design",
                        "Physiotherapy & Healthcare",
                      ].map((course, index) => (
                        <motion.div
                          key={course}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-hover"
                        >
                          <p className="font-semibold text-foreground">{course}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Explore;
