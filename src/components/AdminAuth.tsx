import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight, Shield, Settings, Database, BarChart3, Phone } from "lucide-react";

const AdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const adminFeatures = [
    { icon: Database, title: "Database Management", description: "Full control over course data and users" },
    { icon: BarChart3, title: "Analytics Dashboard", description: "Track platform performance and metrics" },
    { icon: Settings, title: "System Controls", description: "Manage platform settings and configurations" },
    { icon: Shield, title: "Admin Security", description: "Secure access with role-based permissions" },
  ];
const handleAdminLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const email = (document.getElementById("admin-login-email") as HTMLInputElement).value;
  const password = (document.getElementById("admin-login-password") as HTMLInputElement).value;

  try {
    const res = await axios.post(  `${import.meta.env.VITE_API_URL}/admin/login`,{
      email,
      password,
    });

    const adminData = res.data.data;

    localStorage.setItem("adminToken", adminData.token);
    localStorage.setItem("adminUser", JSON.stringify(adminData));

    navigate("/admin-dashboard", { replace: true });

  } catch (err: any) {
    alert(err.response?.data?.message || "Admin login failed");
  } finally {
    setIsLoading(false);
  }
};


const handleAdminSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const name = (document.getElementById("admin-signup-name") as HTMLInputElement).value;
  const email = (document.getElementById("admin-signup-email") as HTMLInputElement).value;
  const phone = (document.getElementById("admin-signup-phone") as HTMLInputElement).value;
  const password = (document.getElementById("admin-signup-password") as HTMLInputElement).value;

  try {
    const res = await axios.post(  `${import.meta.env.VITE_API_URL}/admin/register`,{
      name,
      email,
      phone,
      password,
      secretKey: "EDUCATEME-ADMIN-2024", // REQUIRED
    });

    const adminData = res.data.data;

    localStorage.setItem("adminToken", adminData.token);
    localStorage.setItem("adminUser", JSON.stringify(adminData));

    navigate("/admin-dashboard", { replace: true });

  } catch (err: any) {
    alert(err.response?.data?.message || "Admin registration failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl animate-float-delayed" />
        <motion.div
          className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
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
            className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
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
        {/* Left Side - Admin Info Section */}
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
                className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-blue-600/70 text-sm">Educate Me - Management System</p>
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
                Welcome to
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Admin Dashboard</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Manage courses, users, and platform analytics with powerful admin tools designed for complete control and monitoring.
              </p>
            </motion.div>

            {/* Admin Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {adminFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-blue-200/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Admin Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8"
            >
              {[
                { value: "10K+", label: "Total Users" },
                { value: "50+", label: "Active Courses" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Admin Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <Link to="/" className="lg:hidden flex items-center justify-center gap-2 mb-8">
              <motion.div
                className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </Link>

            {/* Admin Auth Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-200/50 overflow-hidden">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-blue-50 p-2 rounded-none border-b border-blue-200/50">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300 data-[state=active]:shadow-lg rounded-xl"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Admin Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300 data-[state=active]:shadow-lg rounded-xl"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Admin Signup
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {/* Admin Login Form */}
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
                          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-xl"
                        >
                          <Shield className="w-10 h-10 text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                          Admin Access
                        </h2>
                        <p className="text-gray-600">Secure administrator login</p>
                      </div>

                      <form onSubmit={handleAdminLogin} className="space-y-5">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Label htmlFor="admin-login-email" className="text-gray-700 font-medium mb-2 block">
                            Admin Email
                          </Label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-all group-focus-within:scale-110" />
                            <Input
                              id="admin-login-email"
                              type="email"
                              placeholder="admin@educateme.com"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Label htmlFor="admin-login-password" className="text-gray-700 font-medium mb-2 block">
                            Password
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-all group-focus-within:scale-110" />
                            <Input
                              id="admin-login-password"
                              type="password"
                              placeholder="••••••••"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >

                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-all group-focus-within:scale-110" />
                            <Input
                              id="admin-login-role"
                              type="role"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <div className="flex items-center justify-between text-sm">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-600">Remember me</span>
                          </label>
                          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
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
                            className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl text-base group"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Accessing Dashboard...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                Admin Login
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </form>

                      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <p className="text-sm text-blue-700">
                            <strong>Security Note:</strong> This area is restricted to authorized administrators only.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  {/* Admin Signup Form */}
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
                          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-xl"
                        >
                          <UserPlus className="w-10 h-10 text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                          Create Admin Account
                        </h2>
                        <p className="text-gray-600">Register new administrator</p>
                      </div>

                      <form onSubmit={handleAdminSignup} className="space-y-5">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Label htmlFor="admin-signup-name" className="text-gray-700 font-medium mb-2 block">
                            Full Name
                          </Label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                              id="admin-signup-name"
                              type="text"
                              placeholder="John Doe"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Label htmlFor="admin-signup-email" className="text-gray-700 font-medium mb-2 block">
                            Admin Email
                          </Label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                              id="admin-signup-email"
                              type="email"
                              placeholder="admin@educateme.com"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          <Label htmlFor="admin-signup-phone" className="text-gray-700 font-medium mb-2 block">
                            Contact Phone
                          </Label>
                          <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                              id="admin-signup-phone"
                              type="tel"
                              placeholder="1234567890"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Label htmlFor="admin-signup-password" className="text-gray-700 font-medium mb-2 block">
                            Password
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                              id="admin-signup-password"
                              type="password"
                              placeholder="••••••••"
                              className="pl-12 h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-xl"
                              required
                            />
                          </div>
                        </motion.div>


                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Label htmlFor="role" className="text-gray-700 font-medium mb-2 block">
                            Admin Role
                          </Label>
                          <select
                            id="role"
                            className="pl-4 h-14 w-full border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            required
                          >
                            <option value="">Select Role</option>
                            <option value="superadmin">usetr</option>
                            <option value="admin">Admin</option>
                          </select>
                        </motion.div>


                       

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="flex items-start gap-2"
                        >
                          <input
                            type="checkbox"
                            id="admin-terms"
                            className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            required
                          />
                          <label htmlFor="admin-terms" className="text-sm text-gray-600">
                            I agree to the{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                              Admin Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
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
                            className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl text-base group"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Creating Admin Account...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                Create Admin Account
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </form>

                      <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-orange-600" />
                          <p className="text-sm text-orange-700">
                            <strong>Note:</strong> Admin registration requires a valid registration key. Contact system administrator for access.
                          </p>
                        </div>
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

export default AdminAuth;