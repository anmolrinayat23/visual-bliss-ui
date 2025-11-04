import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, Mail, Phone, MapPin, Calendar, BookOpen, 
  Award, TrendingUp, Settings, LogOut, Bell, 
  Clock, CheckCircle2, ArrowRight, Sparkles, Edit,
  Download, Share2, Target, Zap, Trophy, Star,
  GraduationCap, BarChart3, Home
} from "lucide-react";

const Dashboard = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    joinDate: "January 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    role: "Student",
  });

  const [stats] = useState([
    { label: "Courses Enrolled", value: "12", icon: BookOpen, color: "from-orange-500 to-orange-600", change: "+3 this month" },
    { label: "Completed", value: "8", icon: CheckCircle2, color: "from-green-500 to-green-600", change: "+2 this week" },
    { label: "Certificates", value: "5", icon: Award, color: "from-purple-500 to-purple-600", change: "+1 new" },
    { label: "Hours Learned", value: "124", icon: Clock, color: "from-blue-500 to-blue-600", change: "+12 this week" },
  ]);

  const [achievements] = useState([
    { title: "Quick Learner", description: "Completed 3 courses in a month", icon: Zap, unlocked: true },
    { title: "Consistent", description: "7 day learning streak", icon: Target, unlocked: true },
    { title: "Top Performer", description: "Scored 95%+ in 3 courses", icon: Trophy, unlocked: true },
    { title: "Rising Star", description: "Complete 10 courses", icon: Star, unlocked: false },
  ]);

  const [enrolledCourses] = useState([
    { 
      id: 1, 
      name: "Web Development Bootcamp", 
      progress: 75, 
      status: "In Progress", 
      nextClass: "Tomorrow, 10:00 AM",
      instructor: "Dr. Sarah Johnson",
      modules: { completed: 15, total: 20 },
      rating: 4.8
    },
    { 
      id: 2, 
      name: "Data Science Fundamentals", 
      progress: 40, 
      status: "In Progress", 
      nextClass: "Today, 3:00 PM",
      instructor: "Prof. Michael Chen",
      modules: { completed: 8, total: 20 },
      rating: 4.9
    },
    { 
      id: 3, 
      name: "Digital Marketing", 
      progress: 100, 
      status: "Completed", 
      completedDate: "March 15, 2024",
      instructor: "Emily Davis",
      modules: { completed: 12, total: 12 },
      rating: 5.0,
      certificate: true
    },
    { 
      id: 4, 
      name: "Python Programming", 
      progress: 30, 
      status: "In Progress", 
      nextClass: "Monday, 2:00 PM",
      instructor: "Prof. David Lee",
      modules: { completed: 6, total: 20 },
      rating: 4.7
    },
  ]);

  const [upcomingSessions] = useState([
    { id: 1, title: "Career Counselling", date: "March 20, 2024", time: "2:00 PM", counselor: "Dr. Sarah Johnson" },
    { id: 2, title: "Course Guidance", date: "March 22, 2024", time: "10:00 AM", counselor: "Prof. Michael Chen" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 bg-white/90 backdrop-blur-xl border-b border-orange-200/50 sticky top-0 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src="/logo.png"
                  alt="Educate Me"
                  className="h-10 w-10 relative z-10"
                />
              </motion.div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Educate Me
                </span>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="ghost" size="icon" className="hover:bg-orange-50">
                  <Link to="/">
                    <Home className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="relative hover:bg-orange-50">
                  <Bell className="w-5 h-5" />
                  <motion.span 
                    className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="hover:bg-orange-50">
                  <Settings className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50 hover:border-orange-300">
                  <Link to="/auth" className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 mb-8 bg-gradient-to-r from-orange-500 to-orange-600 border-none text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl bg-white text-orange-500">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-white text-orange-500 hover:bg-gray-100 shadow-lg"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {user.role}
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3 mt-4 text-white/90">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined {user.joinDate}</span>
                  </div>
                </div>
              </div>

              <Button className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="p-6 border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 group overflow-hidden relative bg-gradient-to-br from-white to-orange-50/30">
                <motion.div 
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</p>
                      <motion.p 
                        className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {stat.value}
                      </motion.p>
                    </div>
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-xl`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-orange-500" />
              Achievements
            </h2>
            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className={`p-4 border-2 transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600' 
                        : 'bg-gray-300'
                    }`}>
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      {achievement.unlocked && (
                        <Badge className="mt-2 bg-orange-500 hover:bg-orange-600 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="bg-white border border-gray-200 p-1 shadow-md">
              <TabsTrigger 
                value="courses" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                My Courses
              </TabsTrigger>
              <TabsTrigger 
                value="sessions"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Sessions
              </TabsTrigger>
              <TabsTrigger 
                value="progress"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Progress
              </TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
              <AnimatePresence mode="wait">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="p-6 hover:shadow-2xl transition-all duration-300 group border-2 border-orange-100 hover:border-orange-300 bg-gradient-to-br from-white to-orange-50/20">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Course Icon/Image */}
                        <motion.div 
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <GraduationCap className="w-10 h-10 text-white" />
                        </motion.div>

                        {/* Course Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                {course.name}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <Badge 
                                  className={course.status === "Completed" 
                                    ? "bg-green-500 hover:bg-green-600" 
                                    : "bg-orange-500 hover:bg-orange-600"
                                  }
                                >
                                  {course.status}
                                </Badge>
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {course.instructor}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  {course.rating}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {course.certificate && (
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button size="icon" variant="outline" className="border-orange-300 hover:bg-orange-50">
                                    <Download className="w-4 h-4 text-orange-600" />
                                  </Button>
                                </motion.div>
                              )}
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button size="icon" variant="outline" className="border-orange-300 hover:bg-orange-50">
                                  <Share2 className="w-4 h-4 text-orange-600" />
                                </Button>
                              </motion.div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-sm">
                            {course.nextClass && (
                              <span className="flex items-center gap-2 text-orange-600 font-medium">
                                <Clock className="w-4 h-4" />
                                {course.nextClass}
                              </span>
                            )}
                            {course.completedDate && (
                              <span className="flex items-center gap-2 text-green-600 font-medium">
                                <CheckCircle2 className="w-4 h-4" />
                                Completed: {course.completedDate}
                              </span>
                            )}
                            <span className="text-gray-600">
                              {course.modules.completed}/{course.modules.total} modules
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 font-medium">Course Progress</span>
                              <span className="font-bold text-orange-600">{course.progress}%</span>
                            </div>
                            <div className="relative">
                              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${course.progress}%` }}
                                  transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                                  className="h-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-full relative overflow-hidden"
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  />
                                </motion.div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 group/btn">
                              Continue Learning
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="outline" className="border-orange-300 hover:bg-orange-50">
                              <BarChart3 className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </TabsContent>

            {/* Sessions Tab */}
            <TabsContent value="sessions" className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 group">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                          <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{session.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">with {session.counselor}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-orange-600">
                              <Calendar className="w-4 h-4" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1 text-orange-600">
                              <Clock className="w-4 h-4" />
                              {session.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600">
                        Join Session
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress">
              <Card className="p-8 text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                <h3 className="text-xl font-semibold mb-2">Your Learning Journey</h3>
                <p className="text-gray-600 mb-6">
                  Track your progress and achievements across all courses
                </p>
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  View Detailed Report
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
