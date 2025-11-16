import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Shield, 
  CreditCard, 
  Settings, 
  Camera,
  CheckCircle,
  Edit3,
  Save,
  X,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface UserData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

const AccountPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState<UserData | null>(null);
  
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // API instance creator
  const createApi = () => {
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: 'http://localhost:5000',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
  };

 const fetchUserProfile = async () => {
  try {
    setIsLoading(true);

    const { data } = await createApi().get("/user/getprofile");

    console.log("PROFILE API RESPONSE →", data);

    const user = data.data; // ✅ FIX

     const DEFAULT_AVATAR = "/avtar.webp";

       setUserData({
      ...user,
      avatar: DEFAULT_AVATAR, 
    });

    setUserData(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
     avatar: DEFAULT_AVATAR,
    });

  } catch (error: any) {
    console.error("Error fetching profile:", error.response?.data || error);

    if (error.response?.status === 401) {
      handleLogout();
    } else {
      alert(error.response?.data?.message || "Failed to fetch profile data");
    }

  } finally {
    setIsLoading(false);
  }
};

  // Update profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Name and email are required");
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await createApi().put("/user/updateprofile", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      setUserData((prev) => ({ ...prev!, ...formData }));
      setIsEditing(false);

      alert(data.message || "Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };



  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await createApi().put("/user/updatepassword", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      alert(data.message || "Password updated successfully!");
    } catch (error: any) {
      console.error("Error updating password:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await createApi().post("/user/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/auth");
    }
  };

  const handleCancelEdit = () => {
    if (userData) {
      setFormData(userData);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/auth');
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  if (!userData && isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Failed to load profile data</p>
          <Button onClick={() => navigate('/auth')} className="bg-orange-500 hover:bg-orange-600">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Header />
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage your profile and account preferences
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-500 hover:border-orange-300 transition-all duration-200 shadow-sm"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-500 hover:border-orange-300 transition-all duration-200 shadow-sm"
              >
                <Lock className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24 border-orange-200/50 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden min-w-[280px]">
                <CardContent className="p-6">
                  {/* Profile Section */}
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="relative mb-4 group">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-1">
                      <img
  src={userData.avatar || "/avtar.webp"}
  alt="Profile"
  className="w-full h-full rounded-full border-2 border-white object-cover"
  onError={(e) => (e.currentTarget.src = "/images/default-user.png")}
/>

                      </div>
                     
                    </div>
                    
                    {/* User Info */}
                    <div className="w-full space-y-2">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight break-words">
                        {userData.name}
                      </h3>
                      <p className="text-sm text-gray-500 break-all px-2 leading-relaxed">
                        {userData.email}
                      </p>
                      <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Verified Account
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-2">
                    {[
                      { id: 'profile', icon: User, label: 'Profile', badge: null },
                      { id: 'security', icon: Shield, label: 'Security', badge: null },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group border ${
                          activeTab === item.id
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200 border-orange-500'
                            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600 border-orange-100 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            activeTab === item.id 
                              ? 'bg-white/20' 
                              : 'bg-orange-50 group-hover:bg-orange-100'
                          }`}>
                            <item.icon className={`w-4 h-4 transition-transform ${
                              activeTab === item.id ? 'scale-110 text-white' : 'text-orange-600'
                            }`} />
                          </div>
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            activeTab === item.id 
                              ? 'bg-white text-orange-600' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </nav>

                  {/* Additional Info Section */}
                  <div className="mt-8 pt-6 border-t border-orange-100">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Member since</span>
                        <span className="font-medium text-gray-700">2024</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Account status</span>
                        <span className="font-medium text-green-600">Active</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Last login</span>
                        <span className="font-medium text-gray-700">Today</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-orange-200/50 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-200/50 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="space-y-1">
                            <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                              <User className="w-6 h-6 text-orange-500" />
                              Profile Information
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                              Update your personal information and how others see you on the platform
                            </CardDescription>
                          </div>
                          {!isEditing ? (
                            <Button
                              onClick={() => setIsEditing(true)}
                              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit Profile
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                onClick={handleCancelEdit}
                                variant="outline"
                                className="border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                              <Button
                                onClick={handleSaveProfile}
                                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                ) : (
                                  <Save className="w-4 h-4 mr-2" />
                                )}
                                Save Changes
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <form onSubmit={handleSaveProfile} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div className="space-y-3">
                              <Label htmlFor="name" className="text-gray-700 font-medium text-sm">
                                Full Name *
                              </Label>
                              <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                  <User />
                                </div>
                                <Input
                                  id="name"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  disabled={!isEditing}
                                  className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200 rounded-xl"
                                  placeholder="Enter your full name"
                                  required
                                />
                              </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-3">
                              <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                                Email Address *
                              </Label>
                              <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                  <Mail />
                                </div>
                                <Input
                                  id="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  disabled={!isEditing}
                                  className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200 rounded-xl"
                                  placeholder="Enter your email"
                                  required
                                />
                              </div>
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-3">
                              <Label htmlFor="phone" className="text-gray-700 font-medium text-sm">
                                Phone Number
                              </Label>
                              <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                  <Phone />
                                </div>
                                <Input
                                  id="phone"
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  disabled={!isEditing}
                                  className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200 rounded-xl"
                                  placeholder="Enter your phone number"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Edit Mode Notice */}
                          {isEditing && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 shadow-sm"
                            >
                              <div className="flex items-center gap-3 text-orange-700">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Edit mode active</p>
                                  <p className="text-xs text-orange-600">Don't forget to save your changes</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Card className="border-orange-200/50 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-200/50">
                        <div className="space-y-1">
                          <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                            <Shield className="w-6 h-6 text-orange-500" />
                            Security Settings
                          </CardTitle>
                          <CardDescription className="text-gray-600">
                            Manage your password and security preferences
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <form onSubmit={handlePasswordChange} className="space-y-6">
                          <div className="space-y-5">
                            {/* Current Password */}
                            <div className="space-y-3">
                              <Label htmlFor="currentPassword" className="text-gray-700 font-medium text-sm">
                                Current Password *
                              </Label>
                              <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                  <Lock />
                                </div>
                                <Input
                                  id="currentPassword"
                                  type="password"
                                  value={passwordData.currentPassword}
                                  onChange={(e) => setPasswordData({ 
                                    ...passwordData, 
                                    currentPassword: e.target.value 
                                  })}
                                  className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200 rounded-xl"
                                  placeholder="Enter current password"
                                  required
                                />
                              </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-3">
                              <Label htmlFor="newPassword" className="text-gray-700 font-medium text-sm">
                                New Password *
                              </Label>
                              <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                  <Lock />
                                </div>
                                <Input
                                  id="newPassword"
                                  type="password"
                                  value={passwordData.newPassword}
                                  onChange={(e) => setPasswordData({ 
                                    ...passwordData, 
                                    newPassword: e.target.value 
                                  })}
                                  className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200 rounded-xl"
                                  placeholder="Enter new password"
                                  required
                                  minLength={6}
                                />
                              </div>
                              <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-3">
                              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm">
                                Confirm New Password *
                              </Label>
                              <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                  <Lock />
                                </div>
                                <Input
                                  id="confirmPassword"
                                  type="password"
                                  value={passwordData.confirmPassword}
                                  onChange={(e) => setPasswordData({ 
                                    ...passwordData, 
                                    confirmPassword: e.target.value 
                                  })}
                                  className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200 rounded-xl"
                                  placeholder="Confirm new password"
                                  required
                                  minLength={6}
                                />
                              </div>
                            </div>
                          </div>

                          <Button
                            type="submit"
                            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-8 h-12"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Updating Password...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Update Password
                              </>
                            )}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing">
                  <Card className="border-orange-200/50 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900">Billing Information</CardTitle>
                      <CardDescription>
                        Manage your subscription and payment methods
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Subscription</h3>
                        <p className="text-gray-600 mb-6">Upgrade to access premium features and courses</p>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          Upgrade Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences">
                  <Card className="border-orange-200/50 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900">Preferences</CardTitle>
                      <CardDescription>
                        Customize your learning experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { title: 'Email Notifications', description: 'Receive updates about your courses' },
                          { title: 'Course Recommendations', description: 'Get personalized course suggestions' },
                          { title: 'Learning Reminders', description: 'Set reminders for your study schedule' }
                        ].map((pref, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-lg hover:bg-orange-50 transition-colors duration-300"
                          >
                            <div>
                              <h4 className="font-semibold text-gray-900">{pref.title}</h4>
                              <p className="text-sm text-gray-600">{pref.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;