import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight, BookOpen, Award, Users, Sparkles, Target } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  const features = [
    { icon: BookOpen, title: "Expert Courses", description: "Access premium learning resources" },
    { icon: Award, title: "Certifications", description: "Earn recognized certificates" },
    { icon: Users, title: "Expert Mentors", description: "Learn from industry professionals" },
    { icon: Target, title: "Career Goals", description: "Achieve your career aspirations" },
  ];

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
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
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
              <motion.img
                src="/logo.png"
                alt="Educate Me"
                className="h-16 w-16"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8"
            >
              {[
                { value: "10K+", label: "Students" },
                { value: "50+", label: "Courses" },
                { value: "95%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <Link to="/" className="lg:hidden flex items-center justify-center gap-2 mb-8">
              <motion.img
                src="/logo.png"
                alt="Educate Me"
                className="h-12 w-12"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Educate Me
              </h1>
            </Link>

            {/* Auth Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 overflow-hidden">
              <Tabs defaultValue="login" className="w-full">
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
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-xl"
                        >
                          <Sparkles className="w-10 h-10 text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                          Welcome Back!
                        </h2>
                        <p className="text-gray-600">Continue your learning journey</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Label htmlFor="login-email" className="text-gray-700 font-medium mb-2 block">
                            Email Address
                          </Label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-all group-focus-within:scale-110" />
                            <Input
                              id="login-email"
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
                          <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                            Forgot password?
                          </a>
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

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 border-2 hover:bg-gray-50 hover:border-orange-300 transition-all rounded-xl"
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 border-2 hover:bg-gray-50 hover:border-orange-300 transition-all rounded-xl"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                          </svg>
                          GitHub
                        </Button>
                      </div>
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
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-xl"
                        >
                          <UserPlus className="w-10 h-10 text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                          Create Account
                        </h2>
                        <p className="text-gray-600">Start your learning journey today</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
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
                          transition={{ delay: 0.3 }}
                        >
                          <Label htmlFor="signup-password" className="text-gray-700 font-medium mb-2 block">
                            Password
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            <Input
                              id="signup-password"
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
                          <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4 mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            required
                          />
                          <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the{" "}
                            <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline">
                              Privacy Policy
                            </a>
                          </label>
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

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 border-2 hover:bg-gray-50 hover:border-orange-300 transition-all rounded-xl"
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 border-2 hover:bg-gray-50 hover:border-orange-300 transition-all rounded-xl"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                          </svg>
                          GitHub
                        </Button>
                      </div>
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