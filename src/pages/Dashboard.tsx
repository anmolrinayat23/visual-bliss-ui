import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, Mail, Phone, MapPin, Calendar, BookOpen, 
  Award, TrendingUp, Settings, LogOut, Bell, 
  Clock, CheckCircle2, ArrowRight, Sparkles, Edit
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
    { label: "Courses Enrolled", value: "12", icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { label: "Completed", value: "8", icon: CheckCircle2, color: "from-green-500 to-green-600" },
    { label: "Certificates", value: "5", icon: Award, color: "from-orange-500 to-orange-600" },
    { label: "Hours Learned", value: "124", icon: Clock, color: "from-purple-500 to-purple-600" },
  ]);

  const [enrolledCourses] = useState([
    { id: 1, name: "Web Development Bootcamp", progress: 75, status: "In Progress", nextClass: "Tomorrow, 10:00 AM" },
    { id: 2, name: "Data Science Fundamentals", progress: 40, status: "In Progress", nextClass: "Today, 3:00 PM" },
    { id: 3, name: "Digital Marketing", progress: 100, status: "Completed", completedDate: "March 15, 2024" },
    { id: 4, name: "Python Programming", progress: 30, status: "In Progress", nextClass: "Monday, 2:00 PM" },
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
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.img
                src="/logo.png"
                alt="Educate Me"
                className="h-10 w-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Educate Me
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/auth" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

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
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
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
              {enrolledCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 group border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {course.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <Badge variant={course.status === "Completed" ? "default" : "outline"}>
                            {course.status}
                          </Badge>
                          {course.nextClass && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.nextClass}
                            </span>
                          )}
                          {course.completedDate && (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              {course.completedDate}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-orange-600">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
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
