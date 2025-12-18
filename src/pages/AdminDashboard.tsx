import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User, Mail, Phone, BookOpen, Calendar,
  TrendingUp, Download, Search, Filter, Eye, CheckCircle,
  Clock, GraduationCap, Home, Loader2, MapPin, School,
  Award, CalendarDays, IndianRupee, CreditCard,
  XCircle, AlertCircle, Menu, ChevronDown, ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

// Types (same as before)
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
  paymentId?: string;
  examDate: string;
  orderId?: string;
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
  paymentId?: string;
  examDate: string;
  orderId?: string;
  applicationDate: string;
  __v: number;
}

interface AdminData {
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState<AdminData>({
    name: "",
    email: "",
    phone: "",
    role: "Administrator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
  });

  const [ugApplications, setUgApplications] = useState<UGApplication[]>([]);
  const [pgApplications, setPgApplications] = useState<PGApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<UGApplication | PGApplication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ug");
  const [loading, setLoading] = useState({
    admin: true,
    ug: true,
    pg: true
  });
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  const getAuthToken = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  };

  const fetchAdminProfile = async () => {
    try {
      setLoading(prev => ({ ...prev, admin: true }));
      const token = localStorage.getItem("adminToken");

      if (token) {
        const response = await api.get("/admin/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data.data;
        if (data) {
          setAdminData({
            name: data.name || "Admin User",
            email: data.email || "admin@educateme.com",
            phone: data.phone || "+91 9876543210",
            role: data.role || "admin",
            avatar: data.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
          });
        }
      }
    } catch (error) {
      console.error("Error fetching admin profile:", error);
    } finally {
      setLoading(prev => ({ ...prev, admin: false }));
    }
  };

  const fetchUGApplications = async () => {
    try {
      setLoading(prev => ({ ...prev, ug: true }));
      const token = getAuthToken();

      const response = await api.get("/user/ug-applications/getug", {
        headers: { Authorization: `Bearer ${token}` }
      });

      let applications: UGApplication[] = [];
      
      if (Array.isArray(response.data)) {
        applications = response.data;
      } else if (Array.isArray(response.data.applications)) {
        applications = response.data.applications;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        applications = response.data.data;
      }

      setUgApplications(applications);
    } catch (error) {
      console.error("Error fetching UG applications:", error);
      setUgApplications([]);
    } finally {
      setLoading(prev => ({ ...prev, ug: false }));
    }
  };

  const fetchPGApplications = async () => {
    try {
      setLoading(prev => ({ ...prev, pg: true }));
      const token = getAuthToken();
      
      const response = await api.get('/user/pg-applications/getpg', {
        headers: { Authorization: `Bearer ${token}` }
      });

      let applications: PGApplication[] = [];
      
      if (Array.isArray(response.data)) {
        applications = response.data;
      } else if (Array.isArray(response.data.applications)) {
        applications = response.data.applications;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        applications = response.data.data;
      }

      setPgApplications(applications);
    } catch (error) {
      console.error('Error fetching PG applications:', error);
      setPgApplications([]); 
    } finally {
      setLoading(prev => ({ ...prev, pg: false }));
    }
  };

  const handleViewDetails = (app: UGApplication | PGApplication) => {
    setSelectedApplication(app);
    setDialogOpen(true);
  };

  // Payment Status Component with colors
  const PaymentStatusBadge = ({ status }: { status: string }) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'success':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300 hover:bg-green-100 text-xs px-2 py-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-100 text-xs px-2 py-1">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-300 hover:bg-red-100 text-xs px-2 py-1">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-100 text-xs px-2 py-1">
            <AlertCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter applications based on search
  const filteredUGApplications = ugApplications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.mobile.includes(searchTerm) ||
    app.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPGApplications = pgApplications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.mobile.includes(searchTerm) ||
    app.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const stats = [
    { 
      label: "Total Applications", 
      value: (ugApplications.length + pgApplications.length).toString(), 
      icon: BookOpen, 
      color: "from-amber-500 to-orange-500", 
      change: "+12 today" 
    },
    { 
      label: "UG Applications", 
      value: ugApplications.length.toString(), 
      icon: GraduationCap, 
      color: "from-yellow-500 to-amber-500", 
      change: `${ugApplications.filter(a => a.paymentStatus === 'paid').length} paid` 
    },
    { 
      label: "PG Applications", 
      value: pgApplications.length.toString(), 
      icon: User, 
      color: "from-orange-500 to-amber-600", 
      change: `${pgApplications.filter(a => a.paymentStatus === 'paid').length} paid` 
    },
    { 
      label: "Total Revenue", 
      value: "₹" + ((ugApplications.length + pgApplications.length) * 500).toLocaleString(), 
      icon: IndianRupee, 
      color: "from-amber-600 to-yellow-600", 
      change: "+8% this week" 
    },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchAdminProfile(),
        fetchUGApplications(),
        fetchPGApplications()
      ]);
    };
    fetchAllData();
  }, []);

  // Mobile card view for applications
  const MobileApplicationCard = ({ app, isPG }: { app: UGApplication | PGApplication, isPG: boolean }) => {
    return (
      <Card className="mb-4 border-amber-200 bg-white/90 shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Student Info Row */}
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-gray-900 text-sm truncate">{app.name}</div>
                <div className="text-xs text-gray-600 mt-1 truncate">{app.email}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs font-mono text-gray-600">#{app._id.slice(-6)}</div>
                <PaymentStatusBadge status={app.paymentStatus} />
              </div>
            </div>

            {/* Contact & Location */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-600" />
                <span className="truncate">{app.mobile}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600" />
                <span className="truncate">{app.city}</span>
              </div>
            </div>

            {/* Academic Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-amber-50 rounded p-2">
                <div className="text-xs text-gray-600">10th</div>
                <div className="font-semibold text-amber-700">{app.grade10}%</div>
              </div>
              <div className="bg-amber-50 rounded p-2">
                <div className="text-xs text-gray-600">12th</div>
                <div className="font-semibold text-amber-700">{app.grade12}%</div>
              </div>
            </div>

            {/* PG Specific */}
            {isPG && (
              <div className="bg-purple-50 rounded p-2">
                <div className="text-xs text-gray-600">Graduation</div>
                <div className="font-semibold text-purple-700">
                  {(app as PGApplication).graduationScore}%
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center pt-2 border-t border-amber-100">
              <div className="text-xs text-gray-600">
                <CalendarDays className="w-3 h-3 inline mr-1" />
                {app.examDate}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleViewDetails(app)}
                className="text-amber-600 hover:text-amber-700 hover:bg-amber-100 text-xs h-8"
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float hidden sm:block" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl animate-float hidden sm:block" />
      </div>

      {/* Header - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-amber-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="hover:bg-amber-50 h-9 w-9 sm:h-10 sm:w-10">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent leading-tight">
                  EM-MAT Admin
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Manage applications</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right hidden xs:block">
                <p className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[120px] sm:max-w-none">
                  {adminData.name}
                </p>
                <p className="text-xs text-gray-500">{adminData.role}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-amber-200 overflow-hidden">
                <img src={adminData.avatar} alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8">
        {/* Statistics Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="relative overflow-hidden border-amber-200 bg-white/90 hover:shadow-lg transition-shadow">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">{stat.label}</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="truncate">{stat.change}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Applications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-amber-200 bg-white/90 shadow-lg">
            <CardHeader className="border-b border-amber-100 p-4 sm:p-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                    Student Applications
                  </CardTitle>
                  <CardDescription className="text-sm">
                    View and manage all UG & PG applications
                  </CardDescription>
                </div>
                
                {/* Search and Filter Row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full bg-amber-50/50 border-amber-200 text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowMobileFilters(!showMobileFilters)}
                      className="border-amber-200 hover:bg-amber-50 sm:hidden flex-1"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                      {showMobileFilters ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                    </Button>
                    
                    <Button variant="outline" size="icon" className="border-amber-200 hover:bg-amber-50 hidden sm:inline-flex">
                      <Filter className="w-4 h-4" />
                    </Button>
                    
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 sm:px-4">
                      <Download className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </div>

                {/* Mobile Filters Dropdown */}
                {showMobileFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="sm:hidden space-y-3 pt-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Filter by city" className="text-sm" />
                      <Input placeholder="Filter by status" className="text-sm" />
                    </div>
                    <Button variant="outline" className="w-full border-amber-200">
                      Apply Filters
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Tabs Navigation */}
                <TabsList className="w-[calc(100%-16px)] sm:w-[calc(100%-32px)] bg-amber-50 p-1 mx-2 sm:mx-4 mt-4 mb-2">
                  <TabsTrigger 
                    value="ug" 
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-white px-2 sm:px-6 flex-1 text-xs sm:text-sm"
                  >
                    <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="truncate">UG ({ugApplications.length})</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pg" 
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-white px-2 sm:px-6 flex-1 text-xs sm:text-sm"
                  >
                    <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="truncate">PG ({pgApplications.length})</span>
                  </TabsTrigger>
                </TabsList>

                {/* UG Applications Content */}
                <TabsContent value="ug" className="m-0">
                  {loading.ug ? (
                    <div className="py-12 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-amber-600" />
                        <span className="text-gray-600">Loading UG applications...</span>
                      </div>
                    </div>
                  ) : filteredUGApplications.length > 0 ? (
                    <>
                      {/* Mobile View - Cards */}
                      <div className="sm:hidden p-4 space-y-4">
                        {filteredUGApplications.map((app) => (
                          <MobileApplicationCard key={app._id} app={app} isPG={false} />
                        ))}
                      </div>

                      {/* Desktop View - Table */}
                      <div className="hidden sm:block rounded-lg overflow-hidden border-t border-amber-100">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader className="bg-amber-50/80">
                              <TableRow>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm">ID</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm">Student Details</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm hidden md:table-cell">Academic Info</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm">Location</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm hidden lg:table-cell">Exam Date</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm">Payment</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm hidden lg:table-cell">Applied On</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm text-center">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredUGApplications.map((app, index) => (
                                <TableRow 
                                  key={app._id} 
                                  className="hover:bg-amber-50/50 transition-colors border-b border-amber-100"
                                >
                                  <TableCell className="font-mono text-xs text-gray-600">
                                    #{String(index + 1).padStart(3, '0')}
                                  </TableCell>
                                  
                                  <TableCell>
                                    <div className="space-y-1 min-w-[150px]">
                                      <div className="font-semibold text-gray-900 text-sm truncate">{app.name}</div>
                                      <div className="flex items-center gap-1 text-xs text-gray-600 truncate">
                                        <Mail className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{app.email}</span>
                                      </div>
                                      <div className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-md w-fit">
                                        Class: {app.class}
                                      </div>
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell className="hidden md:table-cell">
                                    <div className="space-y-1">
                                      <div className="text-xs">
                                        <span className="text-gray-600">10th: </span>
                                        <span className="font-semibold text-amber-700">{app.grade10}%</span>
                                      </div>
                                      <div className="text-xs">
                                        <span className="text-gray-600">12th: </span>
                                        <span className="font-semibold text-amber-700">{app.grade12}%</span>
                                      </div>
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell>
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1 text-xs">
                                        <MapPin className="w-3 h-3 text-amber-600 flex-shrink-0" />
                                        <span className="font-medium truncate">{app.city}</span>
                                      </div>
                                      <div className="text-xs text-gray-600 pl-4 truncate">{app.state}</div>
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell className="hidden lg:table-cell">
                                    <div className="flex items-center gap-2">
                                      <CalendarDays className="w-4 h-4 text-amber-600" />
                                      <span className="font-medium text-gray-800 text-sm">{app.examDate}</span>
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell>
                                    <div className="space-y-2">
                                      <PaymentStatusBadge status={app.paymentStatus} />
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell className="hidden lg:table-cell">
                                    <div className="text-sm text-gray-600">
                                      {formatDate(app.applicationDate)}
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell>
                                    <div className="flex justify-center">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleViewDetails(app)}
                                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-100 h-8 w-8 p-0"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="space-y-3">
                        <BookOpen className="w-12 h-12 mx-auto text-amber-300" />
                        <div className="text-gray-500">No UG applications found</div>
                        {searchTerm && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSearchTerm("")}
                            className="border-amber-200"
                          >
                            Clear search
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* PG Applications Content */}
                <TabsContent value="pg" className="m-0">
                  {loading.pg ? (
                    <div className="py-12 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-amber-600" />
                        <span className="text-gray-600">Loading PG applications...</span>
                      </div>
                    </div>
                  ) : filteredPGApplications.length > 0 ? (
                    <>
                      {/* Mobile View - Cards */}
                      <div className="sm:hidden p-4 space-y-4">
                        {filteredPGApplications.map((app) => (
                          <MobileApplicationCard key={app._id} app={app} isPG={true} />
                        ))}
                      </div>

                      {/* Desktop View - Table */}
                      <div className="hidden sm:block rounded-lg overflow-hidden border-t border-amber-100">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader className="bg-amber-50/80">
                              <TableRow>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm">ID</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm">Student Details</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm hidden md:table-cell">Academic Info</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm">Location</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm hidden lg:table-cell">Exam Date</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm">Payment</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm hidden lg:table-cell">Applied On</TableHead>
                                <TableHead className="font-semibold text-amber-900 text-xs sm:text-sm text-center">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredPGApplications.map((app, index) => (
                                <TableRow 
                                  key={app._id} 
                                  className="hover:bg-amber-50/50 transition-colors border-b border-amber-100"
                                >
                                  <TableCell className="font-mono text-xs text-gray-600">
                                    #{String(index + 1).padStart(3, '0')}
                                  </TableCell>
                                  
                                  <TableCell>
                                    <div className="space-y-1 min-w-[150px]">
                                      <div className="font-semibold text-gray-900 text-sm truncate">{app.name}</div>
                                      <div className="flex items-center gap-1 text-xs text-gray-600 truncate">
                                        <Mail className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{app.email}</span>
                                      </div>
                                      <div className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-md w-fit">
                                        Class: {app.class}
                                      </div>
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell className="hidden md:table-cell">
                                    <div className="space-y-1">
                                      <div className="text-xs">
                                        <span className="text-gray-600">Graduation: </span>
                                        <span className="font-semibold text-purple-700">{app.graduationScore}%</span>
                                      </div>
                                      <div className="text-xs">
                                        <span className="text-gray-600">Stream: </span>
                                        <span className="font-medium text-gray-800">{app.graduationStream}</span>
                                      </div>
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell>
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1 text-xs">
                                        <MapPin className="w-3 h-3 text-amber-600 flex-shrink-0" />
                                        <span className="font-medium truncate">{app.city}</span>
                                      </div>
                                      <div className="text-xs text-gray-600 pl-4 truncate">{app.state}</div>
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell className="hidden lg:table-cell">
                                    <div className="flex items-center gap-2">
                                      <CalendarDays className="w-4 h-4 text-amber-600" />
                                      <span className="font-medium text-gray-800 text-sm">{app.examDate}</span>
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell>
                                    <div className="space-y-2">
                                      <PaymentStatusBadge status={app.paymentStatus} />
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell className="hidden lg:table-cell">
                                    <div className="text-sm text-gray-600">
                                      {formatDate(app.applicationDate)}
                                    </div>
                                  </TableCell>
                                  
                                  <TableCell>
                                    <div className="flex justify-center">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleViewDetails(app)}
                                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-100 h-8 w-8 p-0"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="space-y-3">
                        <BookOpen className="w-12 h-12 mx-auto text-amber-300" />
                        <div className="text-gray-500">No PG applications found</div>
                        {searchTerm && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSearchTerm("")}
                            className="border-amber-200"
                          >
                            Clear search
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Application Details Dialog - Responsive */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-amber-50 to-yellow-50 p-3 sm:p-6 rounded-lg">
          {selectedApplication && (
            <>
              <DialogHeader className="pr-6">
                <DialogTitle className="text-xl sm:text-2xl text-amber-900">
                  Application Details
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Complete information for {selectedApplication.name}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Personal Info Card */}
                <Card className="border-amber-200 bg-white/80">
                  <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg p-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-600">Full Name</label>
                        <div className="text-sm sm:text-lg font-semibold text-gray-900 truncate">{selectedApplication.name}</div>
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-600">Class</label>
                        <div className="text-sm sm:text-lg font-semibold text-amber-700">{selectedApplication.class}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2">
                        <Mail className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Email</label>
                          <div className="text-gray-800 text-sm sm:text-base truncate">{selectedApplication.email}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Mobile</label>
                          <div className="text-gray-800 text-sm sm:text-base">{selectedApplication.mobile}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 sm:pt-4 border-t border-amber-100">
                      <label className="text-xs sm:text-sm font-medium text-gray-600">Location</label>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                        <span className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                          {selectedApplication.city}, {selectedApplication.state}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Info Card */}
                <Card className="border-amber-200 bg-white/80">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-t-lg p-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <School className="w-4 h-4 sm:w-5 sm:h-5" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-amber-50 p-2 sm:p-3 rounded-lg">
                        <label className="text-xs sm:text-sm font-medium text-gray-600">10th Grade</label>
                        <div className="text-lg sm:text-2xl font-bold text-amber-700">{selectedApplication.grade10}%</div>
                      </div>
                      <div className="bg-amber-50 p-2 sm:p-3 rounded-lg">
                        <label className="text-xs sm:text-sm font-medium text-gray-600">12th Grade</label>
                        <div className="text-lg sm:text-2xl font-bold text-amber-700">{selectedApplication.grade12}%</div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600">Stream</label>
                      <div className="text-sm sm:text-lg font-semibold text-gray-900">{selectedApplication.stream}</div>
                    </div>
                    
                    {/* PG Specific Fields */}
                    {'graduationScore' in selectedApplication && (
                      <>
                        <div className="pt-3 sm:pt-4 border-t border-amber-100">
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Graduation Details</label>
                          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
                            <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                              <label className="text-xs sm:text-sm font-medium text-gray-600">Score</label>
                              <div className="text-lg sm:text-2xl font-bold text-purple-700">
                                {selectedApplication.graduationScore}%
                              </div>
                            </div>
                            <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                              <label className="text-xs sm:text-sm font-medium text-gray-600">Passing Year</label>
                              <div className="text-lg sm:text-2xl font-bold text-purple-700">
                                {selectedApplication.passingYear}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <label className="text-xs sm:text-sm font-medium text-gray-600">Graduation Stream</label>
                            <div className="text-sm sm:text-lg font-semibold text-gray-900">
                              {selectedApplication.graduationStream}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* EM-MAT Details Card */}
                <Card className="border-amber-200 bg-white/80">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-t-lg p-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                      EM-MAT Exam Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                    <div className="bg-amber-50 p-3 sm:p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Selected Exam Date</label>
                          <div className="flex items-center gap-2 mt-1">
                            <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                            <span className="text-base sm:text-xl font-bold text-gray-900">
                              {selectedApplication.examDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600">Application Date</label>
                      <div className="text-sm sm:text-lg text-gray-800">
                        {formatDate(selectedApplication.applicationDate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Details Card */}
                <Card className="border-amber-200 bg-white/80">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg p-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-600">Payment Status</label>
                        <div className="mt-1 sm:mt-2">
                          <PaymentStatusBadge status={selectedApplication.paymentStatus} />
                        </div>
                      </div>
                      <div className="text-right">
                        <label className="text-xs sm:text-sm font-medium text-gray-600">Amount</label>
                        <div className="text-lg sm:text-2xl font-bold text-gray-900">₹500</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      {selectedApplication.paymentId && (
                        <div>
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Payment ID</label>
                          <div className="font-mono text-xs bg-gray-100 p-2 rounded truncate">
                            {selectedApplication.paymentId}
                          </div>
                        </div>
                      )}
                      
                      {selectedApplication.orderId && (
                        <div>
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Order ID</label>
                          <div className="font-mono text-xs bg-gray-100 p-2 rounded truncate">
                            {selectedApplication.orderId}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t border-amber-200">
                <Button 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                  className="border-amber-300 hover:bg-amber-50 w-full sm:w-auto"
                >
                  Close
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;