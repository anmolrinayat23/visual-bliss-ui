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

  const api = () => axios.create({
    baseURL: import.meta.env.VITE_API_URL,

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    }
  });

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);

      const { data } = await api().get("/user/profile");

      console.log("PROFILE API RESPONSE →", data);

      const user = data.user || data;

      setUserData(user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "/api/placeholder/100/100",
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

      const { data } = await api().put("/user/update-profile", {
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

  // Update password
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

      const { data } = await api().put("/user/update-password", {
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
      await api().post("/user/logout");
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
      navigate('/');
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-gray-600 mt-2">Manage your profile and account preferences</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                Logout
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24 border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative group">
                      <img
                        src={userData.avatar}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border-4 border-orange-200 transition-transform duration-300 group-hover:scale-105"
                      />
                      <button className="absolute bottom-0 right-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white hover:bg-orange-600 transition-colors duration-300">
                        <Camera className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{userData.name}</h3>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </div>

                  <nav className="space-y-2">
                    {[
                      { id: 'profile', icon: User, label: 'Profile' },
                      { id: 'security', icon: Shield, label: 'Security' },
                      { id: 'billing', icon: CreditCard, label: 'Billing' },
                      { id: 'preferences', icon: Settings, label: 'Preferences' }
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                          activeTab === item.id
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                  </nav>
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
                  <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-gray-900">Profile Information</CardTitle>
                        <CardDescription>
                          Update your personal information and how others see you on the platform
                        </CardDescription>
                      </div>
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            className="border-gray-300"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSaveProfile}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
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
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700">
                              Full Name *
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={!isEditing}
                                className="pl-11 h-12 border-2 border-gray-200 focus:border-orange-500"
                                placeholder="Enter your full name"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">
                              Email Address *
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                                className="pl-11 h-12 border-2 border-gray-200 focus:border-orange-500"
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-700">
                              Phone Number
                            </Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!isEditing}
                                className="pl-11 h-12 border-2 border-gray-200 focus:border-orange-500"
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>
                        </div>

                        {isEditing && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-4 bg-orange-50 rounded-lg border border-orange-200"
                          >
                            <div className="flex items-center gap-2 text-orange-700">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Make sure to save your changes</span>
                            </div>
                          </motion.div>
                        )}
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900">Security Settings</CardTitle>
                      <CardDescription>
                        Manage your password and security preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordChange} className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-gray-700">
                              Current Password *
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="currentPassword"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ 
                                  ...passwordData, 
                                  currentPassword: e.target.value 
                                })}
                                className="pl-11 h-12 border-2 border-gray-200 focus:border-orange-500"
                                placeholder="Enter current password"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-gray-700">
                              New Password *
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="newPassword"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ 
                                  ...passwordData, 
                                  newPassword: e.target.value 
                                })}
                                className="pl-11 h-12 border-2 border-gray-200 focus:border-orange-500"
                                placeholder="Enter new password"
                                required
                                minLength={6}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-700">
                              Confirm New Password *
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="confirmPassword"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ 
                                  ...passwordData, 
                                  confirmPassword: e.target.value 
                                })}
                                className="pl-11 h-12 border-2 border-gray-200 focus:border-orange-500"
                                placeholder="Confirm new password"
                                required
                                minLength={6}
                              />
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="bg-orange-500 hover:bg-orange-600 text-white"
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
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing">
                  <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
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
                  <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
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
