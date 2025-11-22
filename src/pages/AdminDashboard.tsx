import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User, Mail, Phone, Lock, Users, BookOpen, Calendar,
  TrendingUp, Download, Search, Filter, Eye, CheckCircle2,
  Clock, GraduationCap, Home, Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

// Updated Types for our data based on actual API response
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  preference: string;
  score: number;
  date: string;
  status: string;
}

interface Session {
  id: number;
  studentName: string;
  email: string;
  phone: string;
  sessionType: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  counselor: string;
}

interface Stat {
  label: string;
  value: string;
  icon: any;
  color: string;
  change: string;
}

interface AdminData {
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

// Interface for actual API response
interface UGApplication {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  class: string;
  stream: string;
  grade10: string;
  grade12: string;
  paymentStatus: string;
  applicationDate: string;
  __v: number;
}

interface PGApplication {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  class: string;
  stream: string;
  grade10: string;
  grade12: string;
  graduationScore: string;
  graduationStream: string;
  passingYear: string;
  paymentStatus: string;
  applicationDate: string;
  __v: number;
}

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState<AdminData>({
    name: "",
    email: "",
    phone: "",
    role: "Administrator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
  });

  const [stats, setStats] = useState<Stat[]>([]);
  const [emMatUGStudents, setEmMatUGStudents] = useState<Student[]>([]);
  const [emMatPGStudents, setEmMatPGStudents] = useState<Student[]>([]);
  const [bookSessions, setBookSessions] = useState<Session[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState({
    admin: true,
    stats: true,
    ug: true,
    pg: true,
    sessions: true
  });

  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

  // Get authentication token
  const getAuthToken = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  };


const fetchAdminProfile = async () => {
  try {
    setLoading(prev => ({ ...prev, admin: true }));

    const token = localStorage.getItem("adminToken"); // FIXED ✅

    if (!token) {
      console.warn("⚠️ No admin token found");
      throw new Error("Token Missing");
    }

    const response = await api.get("/admin/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log("RAW RESPONSE:", response.data);

    const data = response.data.data; // backend returns { success, data: {...} }

    if (!data) {
      console.error("❌ Admin data not found");
      return;
    }

    setAdminData({
      name: data.name || "Admin User",
      email: data.email || "admin@educateme.com",
      phone: data.phone || "+91 9876543210",
      role: data.role || "admin",
      avatar: data.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
    });

  } catch (error) {
    console.error("❌ Error fetching admin profile:", error);

    setAdminData({
      name: "Admin User",
      email: "admin@educateme.com",
      phone: "+91 9876543210",
      role: "admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
    });

  } finally {
    setLoading(prev => ({ ...prev, admin: false }));
  }
};


  // Helper function to map API data to Student interface
  const mapUGApplicationToStudent = (app: UGApplication): Student => {
    return {
      id: app._id,
      name: app.name,
      email: app.email,
      phone: app.mobile,
      course: app.stream,
      preference: `${app.city}, ${app.state}`,
      score: parseFloat(app.grade12) || 0,
      date: new Date(app.applicationDate).toLocaleDateString('en-IN'),
      status: app.paymentStatus === "pending" ? "Pending" : "Approved"
    };
  };

  const mapPGApplicationToStudent = (app: PGApplication): Student => {
    return {
      id: app._id,
      name: app.name,
      email: app.email,
      phone: app.mobile,
      course: app.graduationStream || app.stream,
      preference: `${app.city}, ${app.state}`,
      score: parseFloat(app.graduationScore) || 0,
      date: new Date(app.applicationDate).toLocaleDateString('en-IN'),
      status: app.paymentStatus === "pending" ? "Pending" : "Approved"
    };
  };

  const fetchUGApplications = async () => {
    try {
      setLoading(prev => ({ ...prev, ug: true }));

      const token = getAuthToken();

      const response = await api.get("/user/ug-applications/getug", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("✅ UG Applications Response:", response.data);

      // Handle different response structures
      let applications: UGApplication[] = [];
      
      if (Array.isArray(response.data)) {
        applications = response.data;
      } else if (Array.isArray(response.data.applications)) {
        applications = response.data.applications;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        applications = response.data.data;
      }

      // Map API data to Student interface
      const mappedStudents = applications.map(mapUGApplicationToStudent);
      setEmMatUGStudents(mappedStudents);

    } catch (error) {
      console.error("❌ Error fetching UG applications:", error);
      setEmMatUGStudents([]);
    } finally {
      setLoading(prev => ({ ...prev, ug: false }));
    }
  };

  const fetchPGApplications = async () => {
    try {
      setLoading(prev => ({ ...prev, pg: true }));
      
      const token = getAuthToken();
      
      const response = await api.get('/user/pg-applications/getpg', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("✅ PG Applications Response:", response.data);

      // Handle different response structures
      let applications: PGApplication[] = [];
      
      if (Array.isArray(response.data)) {
        applications = response.data;
      } else if (Array.isArray(response.data.applications)) {
        applications = response.data.applications;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        applications = response.data.data;
      }

      // Map API data to Student interface
      const mappedStudents = applications.map(mapPGApplicationToStudent);
      setEmMatPGStudents(mappedStudents);
      
    } catch (error) {
      console.error('Error fetching PG applications:', error);
      setEmMatPGStudents([]); 
    } finally {
      setLoading(prev => ({ ...prev, pg: false }));
    }
  };


const fetchBookSessions = async () => {
  try {
    setLoading((prev) => ({ ...prev, sessions: true }));

    // FIXED API ROUTE
    const response = await axios.get("http://localhost:5000/booking/allbooking");

    setBookSessions(response.data || []);
    console.log("a gya ",response)

  } catch (error) {
    console.error("Error fetching sessions:", error);
    setBookSessions([]);
  } finally {
    setLoading((prev) => ({ ...prev, sessions: false }));
  }
};


  useEffect(() => {
    const calculateStats = () => {
      const ugStudents = Array.isArray(emMatUGStudents) ? emMatUGStudents : [];
      const pgStudents = Array.isArray(emMatPGStudents) ? emMatPGStudents : [];
      const sessions = Array.isArray(bookSessions) ? bookSessions : [];

      const totalForms = ugStudents.length + pgStudents.length;
      const ugCount = ugStudents.length;
      const pgCount = pgStudents.length;
      const sessionCount = sessions.length;

      const newStats: Stat[] = [
        { 
          label: "Total EM-MAT Forms", 
          value: totalForms.toString(), 
          icon: BookOpen, 
          color: "from-orange-500 to-orange-600", 
          change: "+12 today" 
        },
        { 
          label: "UG Track Students", 
          value: ugCount.toString(), 
          icon: GraduationCap, 
          color: "from-blue-500 to-blue-600", 
          change: "+8 this week" 
        },
        { 
          label: "PG Track Students", 
          value: pgCount.toString(), 
          icon: Users, 
          color: "from-purple-500 to-purple-600", 
          change: "+4 this week" 
        },
        { 
          label: "Book Sessions", 
          value: sessionCount.toString(), 
          icon: Calendar, 
          color: "from-green-500 to-green-600", 
          change: "+15 today" 
        },
      ];

      setStats(newStats);
      setLoading(prev => ({ ...prev, stats: false }));
    };

    // Only calculate stats when all data is loaded
    if (!loading.ug && !loading.pg && !loading.sessions) {
      calculateStats();
    }
  }, [emMatUGStudents, emMatPGStudents, bookSessions, loading.ug, loading.pg, loading.sessions]);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchAdminProfile(),
          fetchUGApplications(),
          fetchPGApplications(),
          fetchBookSessions()
        ]);
      } catch (error) {
        console.error("Error fetching all data:", error);
      }
    };

    fetchAllData();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Approved": "bg-green-100 text-green-700 border-green-300",
      "Pending": "bg-yellow-100 text-yellow-700 border-yellow-300",
      "Confirmed": "bg-blue-100 text-blue-700 border-blue-300",
      "Rejected": "bg-red-100 text-red-700 border-red-300"
    };
    return variants[status] || "bg-gray-100 text-gray-700";
  };

  // Loading component
  const LoadingRow = () => (
    <TableRow>
      <TableCell colSpan={10} className="text-center py-8">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
          <span className="text-gray-600">Loading data...</span>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="hover:bg-orange-50">
                  <Home className="w-5 h-5 text-orange-600" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Manage students and sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="border-orange-200 hover:bg-orange-50">
                <Download className="w-4 h-4 text-orange-600" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Admin Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img src={adminData.avatar} alt="Admin" className="w-full h-full object-cover" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {loading.admin ? "Loading..." : adminData.name}
                  </CardTitle>
                  <CardDescription className="text-orange-100">
                    {adminData.role}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {loading.admin ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </Label>
                    <Input value={adminData.name} disabled className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input value={adminData.email} disabled className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                    <Input value={adminData.phone} disabled className="bg-gray-50" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading.stats ? (
            Array(4).fill(0).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 2) }}
              >
                <Card className="relative overflow-hidden border-orange-200/50 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 2) }}
              >
                <Card className="relative overflow-hidden border-orange-200/50 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                      <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* EM-MAT Forms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                    EM-MAT Form Submissions
                  </CardTitle>
                  <CardDescription>View and manage student applications</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="border-orange-200">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ug" className="space-y-4">
                <TabsList className="bg-orange-50">
                  <TabsTrigger value="ug" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    UG Track ({loading.ug ? "..." : emMatUGStudents.length})
                  </TabsTrigger>
                  <TabsTrigger value="pg" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    PG Track ({loading.pg ? "..." : emMatPGStudents.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ug" className="space-y-4">
                  <div className="rounded-lg border border-orange-200/50 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-orange-50">
                        <TableRow>
                          <TableHead className="font-semibold">ID</TableHead>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Email</TableHead>
                          <TableHead className="font-semibold">Phone</TableHead>
                          <TableHead className="font-semibold">Course</TableHead>
                          <TableHead className="font-semibold">Preference</TableHead>
                          <TableHead className="font-semibold">Score</TableHead>
                          <TableHead className="font-semibold">Date</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading.ug ? (
                          <LoadingRow />
                        ) : emMatUGStudents.length > 0 ? (
                          emMatUGStudents.map((student , index) => (
                            <TableRow key={student.id} className="hover:bg-orange-50/50 transition-colors">
                              <TableCell className="font-medium">#{index + 1}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell className="text-gray-600">{student.email}</TableCell>
                              <TableCell className="text-gray-600">{student.phone}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-blue-300 text-blue-700">
                                  {student.course}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-600">{student.preference}</TableCell>
                              <TableCell>
                                <span className="font-semibold text-orange-600">{student.score}%</span>
                              </TableCell>
                              <TableCell className="text-gray-600">{student.date}</TableCell>
                              <TableCell>
                                <Badge className={getStatusBadge(student.status)}>
                                  {student.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" className="hover:bg-orange-50">
                                  <Eye className="w-4 h-4 text-orange-600" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                              No UG applications found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="pg" className="space-y-4">
                  <div className="rounded-lg border border-orange-200/50 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-orange-50">
                        <TableRow>
                          <TableHead className="font-semibold">ID</TableHead>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Email</TableHead>
                          <TableHead className="font-semibold">Phone</TableHead>
                          <TableHead className="font-semibold">Course</TableHead>
                          <TableHead className="font-semibold">Preference</TableHead>
                          <TableHead className="font-semibold">Score</TableHead>
                          <TableHead className="font-semibold">Date</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading.pg ? (
                          <LoadingRow />
                        ) : emMatPGStudents.length > 0 ? (
                          emMatPGStudents.map((student ) => (
                            <TableRow key={student.id} className="hover:bg-orange-50/50 transition-colors">
                              <TableCell className="font-medium">#{student.id.slice(-6)}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell className="text-gray-600">{student.email}</TableCell>
                              <TableCell className="text-gray-600">{student.phone}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-purple-300 text-purple-700">
                                  {student.course}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-600">{student.preference}</TableCell>
                              <TableCell>
                                <span className="font-semibold text-orange-600">{student.score}%</span>
                              </TableCell>
                              <TableCell className="text-gray-600">{student.date}</TableCell>
                              <TableCell>
                                <Badge className={getStatusBadge(student.status)}>
                                  {student.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" className="hover:bg-orange-50">
                                  <Eye className="w-4 h-4 text-orange-600" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                              No PG applications found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.7 }}
>
  <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-orange-600" />
            Book Session Requests
          </CardTitle>
          <CardDescription>Manage counselling session bookings</CardDescription>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <div className="rounded-lg border border-orange-200/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-orange-50">
            <TableRow>
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Mobile</TableHead>
              <TableHead className="font-semibold">Stream</TableHead>
              <TableHead className="font-semibold">Interest</TableHead>
              <TableHead className="font-semibold">Created At</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading.sessions ? (
              <LoadingRow />
            ) : bookSessions.length > 0 ? (
              bookSessions.map((session , index) => (
                <TableRow
                  key={session._id}
                  className="hover:bg-orange-50/50 transition-colors"
                >
                  <TableCell className="font-medium">#{index + 1}</TableCell>
                  <TableCell>{session.name}</TableCell>
                  <TableCell className="text-gray-600">{session.email}</TableCell>
                  <TableCell className="text-gray-600">{session.mobile}</TableCell>
                  <TableCell className="text-gray-600">{session.studentClass}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      {session.interest}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Button variant="ghost" size="icon" className="hover:bg-orange-50">
                      <Eye className="w-4 h-4 text-orange-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                  No session requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;