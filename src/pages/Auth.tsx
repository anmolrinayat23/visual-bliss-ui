import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight, BookOpen, Award, Users, Sparkles, Target, Phone } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const features = [
    { icon: BookOpen, title: "Expert Courses", description: "Access premium learning resources" },
    { icon: Award, title: "Certifications", description: "Earn recognized certificates" },
  ];



const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await axios.post( `${import.meta.env.VITE_API_URL}/user/login`, {
      email,
      password,

    });
    

    if (res.data.success) {
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      navigate("/em-mat"); // success
    } else {
      alert(res.data.message);
    }
  } catch (err: any) {
    alert(err.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);

  try {
  const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/user/register`,
 {
      
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    });

    console.log("hitt", res)

    if (res.data.success) {
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      navigate("/em-mat");
    } else {
      alert(res.data.message);
    }
  } catch (err: any) {
    alert(err.response?.data?.message || "Signup failed");
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-3xl animate-float-delayed" />
        <motion.div
          className="absolute top-1/2 left-1/4 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/40 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Info Section */}
        <div className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <motion.div
                className="h-16 w-16 bg-orange-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* <span className="text-white font-bold text-lg">EM</span> */}
             <img src="/logo.png" alt="" className="rounded-full" />

              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Educate Me
                </h1>
                <p className="text-orange-600/70 text-sm">Transform Your Future</p>
              </div>
            </Link>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Welcome to Your
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"> Learning Journey</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Join thousands of students who are transforming their careers with expert guidance, 
                premium courses, and personalized counseling.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

           
          </motion.div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-1/2 mb-40 flex items-center justify-center p-4 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <Link to="/" className="lg:hidden flex items-center justify-center gap-2 mb-8">
              <motion.div
                className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-white font-bold">EM</span>
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Educate Me
              </h1>
            </Link>

            {/* Auth Card */}
            <div className="bg-white/90  backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-orange-50 p-2 rounded-none border-b border-orange-200/50">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all duration-300 data-[state=active]:shadow-lg rounded-xl"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all duration-300 data-[state=active]:shadow-lg rounded-xl"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {/* Login Form */}
                  <TabsContent value="login" className="p-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-8">
                      
                        <h2 className="text-3xl mt-10 font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                          Welcome Back!
                        </h2>
                        <p className="text-gray-600">Continue your learning journey</p>
                      </div>

                      <form onSubmit={handleLogin} className="space-y-5">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Label htmlFor="login-email"  className="text-gray-700 mt-10 font-medium mb-2 block">
                            Email Address
                          </Label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-all group-focus-within:scale-110" />
                            <Input
                              id="login-email"
                              name="email"
                              type="email"
                              placeholder="you@example.com"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Label htmlFor="login-password" className="text-gray-700 font-medium mb-2 block">
                            Password
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-all group-focus-within:scale-110" />
                            <Input
                              id="login-password"
                              name="password"
                              type="password"
                              placeholder="••••••••"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <div className="flex items-center justify-between text-sm">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className="text-gray-600">Remember me</span>
                          </label>
                          {/* <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                            Forgot password?
                          </a> */}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Button
                            type="submit"
                            className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl text-base group"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Logging in...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                Sign In
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </motion.div>
                  </TabsContent>

                  {/* Signup Form */}
                  <TabsContent value="signup" className="p-8">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-8">
                      
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                          Create Account
                        </h2>
                        <p className="text-gray-600">Start your learning journey today</p>
                      </div>

                      <form onSubmit={handleSignup} className="space-y-5">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Label htmlFor="signup-name" className="text-gray-700 font-medium mb-2 block">
                            Full Name
                          </Label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              id="signup-name"
                              name="name"
                              type="text"
                              placeholder="John Doe"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Label htmlFor="signup-email" className="text-gray-700 font-medium mb-2 block">
                            Email Address
                          </Label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              id="signup-email"
                              name="email"
                              type="email"
                              placeholder="you@example.com"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          <Label htmlFor="signup-phone" className="text-gray-700 font-medium mb-2 block">
                            Phone
                          </Label>
                          <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              id="signup-phone"
                              name="phone"
                              type="tel"
                              placeholder="1234567890"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Label htmlFor="signup-password" className="text-gray-700 font-medium mb-2 block">
                            Password
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              id="signup-password"
                              name="password"
                              type="password"
                              placeholder="••••••••"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="flex items-start gap-2"
                        >
                         
                          
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Button
                            type="submit"
                            className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl text-base group"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Creating account...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                Create Account
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;