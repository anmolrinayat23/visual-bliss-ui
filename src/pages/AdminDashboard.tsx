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
  Award, CalendarDays, IndianRupee, CreditCard, Users,
  XCircle, AlertCircle, ChevronLeft, ChevronRight, Video,
  Edit, Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from 'jspdf';

// Types
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

interface Session {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  studentClass: string;
  interest: string;
  createdAt: string;
  __v?: number;
}

interface AdminData {
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

interface Stat {
  label: string;
  value: string;
  icon: any;
  color: string;
  change: string;
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
  const [ugApplications, setUgApplications] = useState<UGApplication[]>([]);
  const [pgApplications, setPgApplications] = useState<PGApplication[]>([]);
  const [bookSessions, setBookSessions] = useState<Session[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<UGApplication | PGApplication | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UGApplication & PGApplication>>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<UGApplication | PGApplication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState({
    admin: true,
    stats: true,
    ug: true,
    pg: true,
    sessions: true
  });

  // Session State
  const [sessionDeleteConfirmOpen, setSessionDeleteConfirmOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<Session | null>(null);
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isEditingSession, setIsEditingSession] = useState(false);
  const [editSessionFormData, setEditSessionFormData] = useState<Partial<Session>>({});

  // Pagination state
  const [ugCurrentPage, setUgCurrentPage] = useState(1);
  const [pgCurrentPage, setPgCurrentPage] = useState(1);
  const [ugTotalPages, setUgTotalPages] = useState(1);
  const [pgTotalPages, setPgTotalPages] = useState(1);
  const [ugTotalItems, setUgTotalItems] = useState(0);
  const [pgTotalItems, setPgTotalItems] = useState(0);
  const itemsPerPage = 10;

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  const getAuthToken = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || localStorage.getItem('adminToken');
  };

  // Pagination calculation functions
  // Server-side pagination: fetch pages from backend

  // Pagination component
  const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    type,
    totalItems
  }: { 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void;
    type: 'ug' | 'pg';
    totalItems: number;
  }) => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

  if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between px-4 py-3 border-t border-orange-100 bg-white">
        <div className="text-sm text-gray-700">
          Showing <span className="font-semibold">
            {Math.min(((currentPage - 1) * itemsPerPage) + 1, totalItems)}-
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span> of{" "}
          <span className="font-semibold">{totalItems}</span> applications
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {startPage > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(1)}
                className={`h-8 w-8 p-0 border-orange-200 ${currentPage === 1 ? 'bg-orange-50 text-orange-600' : ''}`}
              >
                1
              </Button>
              {startPage > 2 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </>
          )}

          {pageNumbers.map(page => (
            <Button
              key={page}
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page)}
              className={`h-8 w-8 p-0 border-orange-200 ${
                currentPage === page 
                  ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' 
                  : ''
              }`}
            >
              {page}
            </Button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(totalPages)}
                className={`h-8 w-8 p-0 border-orange-200 ${currentPage === totalPages ? 'bg-orange-50 text-orange-600' : ''}`}
              >
                {totalPages}
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
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

  const fetchUGApplications = async (page?: number) => {
    try {
      setLoading(prev => ({ ...prev, ug: true }));
      const token = getAuthToken();
      const usePage = page || ugCurrentPage || 1;
      const response = await api.get("/user/ug-applications/getug", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: usePage, limit: itemsPerPage, search: searchTerm }
      });

      let applications: UGApplication[] = [];
      let totalPages = 1;
      let totalApplications = 0;

      if (Array.isArray(response.data)) {
        applications = response.data;
        totalApplications = response.data.length;
        totalPages = Math.ceil(totalApplications / itemsPerPage);
      } else if (Array.isArray(response.data.applications)) {
        applications = response.data.applications;
        totalPages = response.data.totalPages || Math.ceil((response.data.totalApplications || applications.length) / itemsPerPage);
        totalApplications = response.data.totalApplications || applications.length;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        applications = response.data.data;
        totalPages = response.data.totalPages || Math.ceil((response.data.totalApplications || applications.length) / itemsPerPage);
        totalApplications = response.data.totalApplications || applications.length;
      }

      setUgApplications(applications);
      setUgTotalPages(totalPages);
      setUgTotalItems(totalApplications);
      setUgCurrentPage(usePage);
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
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 10000, search: searchTerm }
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
      setPgTotalPages(1);
      setPgTotalItems(applications.length);
      setPgCurrentPage(1);
    } catch (error) {
      console.error('Error fetching PG applications:', error);
      setPgApplications([]); 
    } finally {
      setLoading(prev => ({ ...prev, pg: false }));
    }
  };

  const fetchBookSessions = async () => {
    try {
      setLoading((prev) => ({ ...prev, sessions: true }));
      const token = getAuthToken();
      const response = await api.get("/booking/allbooking", {
        headers: { Authorization: `Bearer ${token}` }
      });

      let sessions: Session[] = [];
      if (Array.isArray(response.data)) {
        sessions = response.data;
      } else if (Array.isArray(response.data.bookings)) {
        sessions = response.data.bookings;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        sessions = response.data.data;
      }

      setBookSessions(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setBookSessions([]);
    } finally {
      setLoading((prev) => ({ ...prev, sessions: false }));
    }
  };


  
  const handleDownloadUGPDF = async () => {
    try {
      const token = getAuthToken();
      const response = await api.get('/user/ug-applications/download-pdf', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchTerm },
        responseType: 'blob'
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `UG_Applications_${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading UG PDF:', error);
      // You could add a toast notification here
    }
  };



  const handleDownloadPGPDF = async () => {
    try {
      const token = getAuthToken();
      const response = await api.get('/user/pg-applications/download-pdf', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchTerm },
        responseType: 'blob'
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `PG_Applications_${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PG PDF:', error);
      // You could add a toast notification here
    }
  };



  const handleDownloadApplicationPDF = () => {
    if (!selectedApplication) return;

    const doc = new jsPDF();
    
    // Set up document
    doc.setFontSize(20);
    doc.text('Application Details', 20, 30);
    
    doc.setFontSize(12);
    let yPosition = 50;
    
    // Personal Information
    doc.setFontSize(14);
    doc.text('Personal Information', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Full Name: ${selectedApplication.name}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Email: ${selectedApplication.email}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Mobile: ${selectedApplication.mobile}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Location: ${selectedApplication.city}, ${selectedApplication.state}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Class: ${selectedApplication.class}`, 20, yPosition);
    yPosition += 20;
    
    // Academic Information
    doc.setFontSize(14);
    doc.text('Academic Information', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`10th Grade: ${selectedApplication.grade10}%`, 20, yPosition);
    yPosition += 10;
    doc.text(`12th Grade: ${selectedApplication.grade12}%`, 20, yPosition);
    yPosition += 10;
    doc.text(`Stream: ${selectedApplication.stream}`, 20, yPosition);
    yPosition += 10;
    
    // PG specific fields
    if ('graduationScore' in selectedApplication) {
      doc.text(`Graduation Score: ${selectedApplication.graduationScore}%`, 20, yPosition);
      yPosition += 10;
      doc.text(`Graduation Stream: ${selectedApplication.graduationStream}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Passing Year: ${selectedApplication.passingYear}`, 20, yPosition);
      yPosition += 20;
    } else {
      yPosition += 10;
    }
    
    // Exam Details
    doc.setFontSize(14);
    doc.text('EM-MAT Exam Details', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Selected Exam Date: ${selectedApplication.examDate}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Application Date: ${formatDate(selectedApplication.applicationDate)}`, 20, yPosition);
    yPosition += 20;
    
    // Payment Information
    doc.setFontSize(14);
    doc.text('Payment Information', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Payment Status: ${selectedApplication.paymentStatus}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Amount: ₹500`, 20, yPosition);
    yPosition += 10;
    
    if (selectedApplication.paymentId) {
      doc.text(`Payment ID: ${selectedApplication.paymentId}`, 20, yPosition);
      yPosition += 10;
    }
    
    if (selectedApplication.orderId) {
      doc.text(`Order ID: ${selectedApplication.orderId}`, 20, yPosition);
      yPosition += 10;
    }
    
    // Save the PDF
    const fileName = `${selectedApplication.name.replace(/\s+/g, '_')}_Application_Details.pdf`;
    doc.save(fileName);
  };

  const handleViewDetails = (app: UGApplication | PGApplication) => {
    setSelectedApplication(app);
    setIsEditing(false);
    setEditFormData({});
    setDialogOpen(true);
  };

  const handleEditApplication = (app: UGApplication | PGApplication) => {
    setSelectedApplication(app);
    setEditFormData({ ...app });
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDeleteApplication = (app: UGApplication | PGApplication) => {
    setApplicationToDelete(app);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!applicationToDelete) return;

    try {
      const isUG = !('graduationScore' in applicationToDelete);
      const endpoint = isUG ? `/user/ug-applications/${applicationToDelete._id}` : `/user/pg-applications/${applicationToDelete._id}`;

      await api.delete(endpoint);

      // Refresh the data
      if (isUG) {
        fetchUGApplications(ugCurrentPage);
      } else {
        fetchPGApplications();
      }

      setDeleteConfirmOpen(false);
      setApplicationToDelete(null);
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application');
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedApplication || !editFormData) return;

    try {
      const isUG = !('graduationScore' in selectedApplication);
      const endpoint = isUG ? `/user/ug-applications/${selectedApplication._id}` : `/user/pg-applications/${selectedApplication._id}`;

      await api.put(endpoint, editFormData);

      // Refresh the data
      if (isUG) {
        fetchUGApplications(ugCurrentPage);
      } else {
        fetchPGApplications();
      }

      setDialogOpen(false);
      setIsEditing(false);
      setEditFormData({});
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update application');
    }
  };


  
  const handleViewSession = (session: Session) => {
    setSelectedSession(session);
    setIsEditingSession(false);
    setEditSessionFormData({});
    setSessionDialogOpen(true);
  };

  const handleEditSession = (session: Session) => {
    setSelectedSession(session);
    setEditSessionFormData({ ...session });
    setIsEditingSession(true);
    setSessionDialogOpen(true);
  };

  const handleDeleteSession = (session: Session) => {
    setSessionToDelete(session);
    setSessionDeleteConfirmOpen(true);
  };

  const confirmDeleteSession = async () => {
    if (!sessionToDelete) return;

    try {
      await api.delete(`/booking/${sessionToDelete._id}`);
      fetchBookSessions();
      setSessionDeleteConfirmOpen(false);
      setSessionToDelete(null);
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('Failed to delete session');
    }
  };

  const handleSaveSessionEdit = async () => {
    if (!selectedSession || !editSessionFormData) return;

    try {
      const updatePayload = {
        name: editSessionFormData.name,
        email: editSessionFormData.email,
        mobile: editSessionFormData.mobile,
        studentClass: editSessionFormData.studentClass,
        interest: editSessionFormData.interest
      };

      await api.put(`/booking/${selectedSession._id}`, updatePayload);
      fetchBookSessions();
      setSessionDialogOpen(false);
      setIsEditingSession(false);
      setEditSessionFormData({});
    } catch (error) {
      console.error('Error updating session:', error);
      alert('Failed to update session');
    }
  };

  const PaymentStatusBadge = ({ status }: { status: string }) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'success':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-300 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateStats = () => {
    const ugApps = Array.isArray(ugApplications) ? ugApplications : [];
    const pgApps = Array.isArray(pgApplications) ? pgApplications : [];
    const bookSess = Array.isArray(bookSessions) ? bookSessions : [];

    const totalForms = ugApps.length + pgApps.length;
    const paidForms = [
      ...ugApps.filter(app => app.paymentStatus === 'success' || app.paymentStatus === 'paid'),
      ...pgApps.filter(app => app.paymentStatus === 'success' || app.paymentStatus === 'paid')
    ].length;
    const sessionCount = bookSess.length;

    const newStats: Stat[] = [
      { 
        label: "Total Applications", 
        value: totalForms.toString(), 
        icon: BookOpen, 
        color: "from-orange-500 to-orange-600", 
        change: `${paidForms} paid` 
      },
      { 
        label: "UG Applications", 
        value: ugApps.length.toString(), 
        icon: GraduationCap, 
        color: "from-blue-500 to-blue-600", 
        change: "+8 this week" 
      },
      { 
        label: "PG Applications", 
        value: pgApps.length.toString(), 
        icon: Users, 
        color: "from-purple-500 to-purple-600", 
        change: "+4 this week" 
      },
      { 
        label: "Booked Sessions", 
        value: sessionCount.toString(), 
        icon: Calendar, 
        color: "from-green-500 to-green-600", 
        change: "+15 today" 
      },
    ];

    setStats(newStats);
    setLoading(prev => ({ ...prev, stats: false }));
  };

  useEffect(() => {
    calculateStats();
  }, [ugApplications, pgApplications, bookSessions]);

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
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-orange-100 shadow-sm"
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
                <p className="text-sm text-gray-600">Complete student application management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-700">{adminData.name}</p>
                <p className="text-xs text-gray-500">{adminData.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-orange-200 overflow-hidden">
                <img src={adminData.avatar} alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Statistics Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="border-b border-orange-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    Student Applications
                  </CardTitle>
                  <CardDescription>View and manage all UG & PG applications</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="border-orange-200">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs defaultValue="ug" className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 pt-4">
                  <TabsList className="w-full sm:w-auto bg-orange-50 p-1">
                    <TabsTrigger 
                      value="ug" 
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-4 sm:px-6"
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      UG ({ugApplications.length})
                    </TabsTrigger>
                    <TabsTrigger 
                      value="pg" 
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-4 sm:px-6"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      PG ({pgApplications.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownloadUGPDF}
                      className="border-orange-200 hover:bg-orange-50"
                      disabled={loading.ug || ugApplications.length === 0}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download UG PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownloadPGPDF}
                      className="border-purple-200 hover:bg-purple-50"
                      disabled={loading.pg || pgApplications.length === 0}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PG PDF
                    </Button>
                  </div>
                </div>

                {/* UG Applications Table */}
                <TabsContent value="ug" className="m-0">
                  <div className="rounded-lg overflow-hidden border-t border-orange-100">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-orange-50/80">
                          <TableRow>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">ID</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Student Details</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3 hidden md:table-cell">Academic Info</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Location</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3 hidden lg:table-cell">Exam Date</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Payment</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {loading.ug ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-12">
                                <div className="flex items-center justify-center gap-3">
                                  <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
                                  <span className="text-gray-600">Loading UG applications...</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ) : ugApplications.length > 0 ? (
                            ugApplications.map((app, index) => (
                              <TableRow 
                                key={app._id} 
                                className="hover:bg-orange-50/50 transition-colors border-b border-orange-100"
                              >
                                <TableCell className="px-4 py-3">
                                  <div className="font-mono text-xs text-gray-600">
                                    #{((ugCurrentPage - 1) * itemsPerPage) + index + 1}
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3">
                                  <div className="space-y-1">
                                    <div className="font-semibold text-gray-900 text-sm">{app.name}</div>
                                    <div className="flex items-center gap-1 text-xs text-gray-600">
                                      <Mail className="w-3 h-3" />
                                      <span className="truncate max-w-[150px]">{app.email}</span>
                                    </div>
                                    <div className="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded-md w-fit">
                                      Class: {app.class}
                                    </div>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3 hidden md:table-cell">
                                  <div className="space-y-1">
                                    <div className="text-sm">
                                      <span className="text-gray-600">10th: </span>
                                      <span className="font-semibold text-orange-700">{app.grade10}%</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-600">12th: </span>
                                      <span className="font-semibold text-orange-700">{app.grade12}%</span>
                                    </div>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-sm">
                                      <MapPin className="w-3 h-3 text-orange-600" />
                                      <span className="font-medium">{app.city}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 pl-4">{app.state}</div>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3 hidden lg:table-cell">
                                  <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-orange-600" />
                                    <span className="font-medium text-gray-800 text-sm">{app.examDate}</span>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3">
                                  <div className="space-y-2">
                                    <PaymentStatusBadge status={app.paymentStatus} />
                                    <div className="text-xs text-gray-500">
                                      {formatDate(app.applicationDate)}
                                    </div>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3">
                                  <div className="flex justify-center gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleViewDetails(app)}
                                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 h-8 w-8 p-0"
                                      title="View Details"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEditApplication(app)}
                                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-100 h-8 w-8 p-0"
                                      title="Edit Application"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleDeleteApplication(app)}
                                      className="text-red-600 hover:text-red-700 hover:bg-red-100 h-8 w-8 p-0"
                                      title="Delete Application"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-12">
                                <div className="space-y-3">
                                  <BookOpen className="w-12 h-12 mx-auto text-orange-300" />
                                  <div className="text-gray-500">No UG applications found</div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {/* UG Pagination */}
                    {!loading.ug && ugTotalPages > 1 && (
                      <Pagination
                        currentPage={ugCurrentPage}
                        totalPages={ugTotalPages}
                        totalItems={ugTotalItems}
                        onPageChange={(p) => fetchUGApplications(p)}
                        type="ug"
                      />
                    )}
                  </div>
                </TabsContent>

                {/* PG Applications Table */}
                <TabsContent value="pg" className="m-0">
                  <div className="rounded-lg overflow-hidden border-t border-orange-100">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-orange-50/80">
                          <TableRow>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">ID</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Student Details</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3 hidden md:table-cell">Academic Info</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Location</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3 hidden lg:table-cell">Exam Date</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Payment</TableHead>
                            <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {loading.pg ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-12">
                                <div className="flex items-center justify-center gap-3">
                                  <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
                                  <span className="text-gray-600">Loading PG applications...</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ) : pgApplications.length > 0 ? (
                            pgApplications.map((app, index) => (
                              <TableRow 
                                key={app._id} 
                                className="hover:bg-orange-50/50 transition-colors border-b border-orange-100"
                              >
                                <TableCell className="px-4 py-3">
                                  <div className="font-mono text-xs text-gray-600">
                                    #{((pgCurrentPage - 1) * itemsPerPage) + index + 1}
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3">
                                  <div className="space-y-1">
                                    <div className="font-semibold text-gray-900 text-sm">{app.name}</div>
                                    <div className="flex items-center gap-1 text-xs text-gray-600">
                                      <Mail className="w-3 h-3" />
                                      <span className="truncate max-w-[150px]">{app.email}</span>
                                    </div>
                                    <div className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-md w-fit">
                                      Class: {app.class}
                                    </div>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3 hidden md:table-cell">
                                  <div className="space-y-1">
                                    <div className="text-sm">
                                      <span className="text-gray-600">Graduation: </span>
                                      <span className="font-semibold text-purple-700">{app.graduationScore}%</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-600">Stream: </span>
                                      <span className="font-medium">{app.graduationStream}</span>
                                    </div>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-sm">
                                      <MapPin className="w-3 h-3 text-orange-600" />
                                      <span className="font-medium">{app.city}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 pl-4">{app.state}</div>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3 hidden lg:table-cell">
                                  <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-orange-600" />
                                    <span className="font-medium text-gray-800 text-sm">{app.examDate}</span>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3">
                                  <div className="space-y-2">
                                    <PaymentStatusBadge status={app.paymentStatus} />
                                    <div className="text-xs text-gray-500">
                                      {formatDate(app.applicationDate)}
                                    </div>
                                  </div>
                                </TableCell>
                                
                                <TableCell className="px-4 py-3">
                                  <div className="flex justify-center gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleViewDetails(app)}
                                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 h-8 w-8 p-0"
                                      title="View Details"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEditApplication(app)}
                                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-100 h-8 w-8 p-0"
                                      title="Edit Application"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleDeleteApplication(app)}
                                      className="text-red-600 hover:text-red-700 hover:bg-red-100 h-8 w-8 p-0"
                                      title="Delete Application"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-12">
                                <div className="space-y-3">
                                  <BookOpen className="w-12 h-12 mx-auto text-orange-300" />
                                  <div className="text-gray-500">No PG applications found</div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Book Sessions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="border-b border-orange-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    Counselling Sessions
                  </CardTitle>
                  <CardDescription>Booked counselling session requests</CardDescription>
                </div>
                {/* <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button> */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-orange-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-orange-50">
                      <TableRow>
                        <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">ID</TableHead>
                        <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Student Details</TableHead>
                        <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3 hidden sm:table-cell">Class</TableHead>
                        <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3 hidden md:table-cell">Interest</TableHead>
                        <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Requested On</TableHead>
                        <TableHead className="font-semibold text-orange-900 text-sm px-4 py-3">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading.sessions ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-12">
                            <div className="flex items-center justify-center gap-3">
                              <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
                              <span className="text-gray-600">Loading sessions...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : bookSessions.length > 0 ? (
                        bookSessions.map((session, index) => (
                          <TableRow
                            key={session._id}
                            className="hover:bg-orange-50/50 transition-colors"
                          >
                            <TableCell className="px-4 py-3">
                              <div className="font-mono text-xs text-gray-600">
                                #{String(index + 1).padStart(3, '0')}
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-900 text-sm">{session.name}</div>
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <Mail className="w-3 h-3" />
                                  <span className="truncate max-w-[150px]">{session.email}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3 hidden sm:table-cell">
                              <div className="text-sm text-gray-700">{session.studentClass}</div>
                            </TableCell>
                            <TableCell className="px-4 py-3 hidden md:table-cell">
                              <Badge variant="outline" className="border-green-300 text-green-700 text-xs">
                                {session.interest}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="text-sm text-gray-600">
                                {formatDate(session.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="flex justify-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleViewSession(session)}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 h-8 w-8 p-0"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleEditSession(session)} className="text-orange-600 hover:text-orange-700 hover:bg-orange-100 h-8 w-8 p-0" title="Edit Session">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteSession(session)} className="text-red-600 hover:text-red-700 hover:bg-red-100 h-8 w-8 p-0" title="Delete Session">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-12">
                            <div className="space-y-3">
                              <Video className="w-12 h-12 mx-auto text-orange-300" />
                              <div className="text-gray-500">No session requests found</div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Application Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {isEditing ? 'Edit Application' : 'Application Details'}
                </DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? `Editing application for ${selectedApplication.name}`
                    : `Complete application information for ${selectedApplication.name}`
                  }
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card className="border-orange-200">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-600">Full Name</div>
                        {isEditing ? (
                          <Input
                            value={editFormData.name || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <div className="text-lg font-semibold">{selectedApplication.name}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Class</div>
                        {isEditing ? (
                          <Input
                            value={editFormData.class || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, class: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <div className="text-lg font-semibold text-orange-700">{selectedApplication.class}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-600">Email</div>
                          {isEditing ? (
                            <Input
                              type="email"
                              value={editFormData.email || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                              className="mt-1"
                            />
                          ) : (
                            <div className="text-gray-800">{selectedApplication.email}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-600">Mobile</div>
                          {isEditing ? (
                            <Input
                              value={editFormData.mobile || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, mobile: e.target.value })}
                              className="mt-1"
                            />
                          ) : (
                            <div className="text-gray-800">{selectedApplication.mobile}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-orange-100">
                      <div className="text-sm font-medium text-gray-600">Location</div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <div className="text-xs text-gray-500">City</div>
                          {isEditing ? (
                            <Input
                              value={editFormData.city || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                              className="mt-1"
                            />
                          ) : (
                            <span className="text-lg font-semibold text-gray-900">{selectedApplication.city}</span>
                          )}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">State</div>
                          {isEditing ? (
                            <Input
                              value={editFormData.state || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                              className="mt-1"
                            />
                          ) : (
                            <span className="text-lg font-semibold text-gray-900">{selectedApplication.state}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Information */}
                <Card className="border-orange-200">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <School className="w-5 h-5" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-gray-600">10th Grade</div>
                        {isEditing ? (
                          <Input
                            value={editFormData.grade10 || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, grade10: e.target.value })}
                            className="mt-1"
                            placeholder="%"
                          />
                        ) : (
                          <div className="text-2xl font-bold text-blue-700">{selectedApplication.grade10}%</div>
                        )}
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-gray-600">12th Grade</div>
                        {isEditing ? (
                          <Input
                            value={editFormData.grade12 || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, grade12: e.target.value })}
                            className="mt-1"
                            placeholder="%"
                          />
                        ) : (
                          <div className="text-2xl font-bold text-blue-700">{selectedApplication.grade12}%</div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-600">Stream</div>
                      {isEditing ? (
                        <Input
                          value={editFormData.stream || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, stream: e.target.value })}
                          className="mt-1"
                        />
                      ) : (
                        <div className="text-lg font-semibold text-gray-900">{selectedApplication.stream}</div>
                      )}
                    </div>
                    
                    {'graduationScore' in selectedApplication && (
                      <>
                        <div className="pt-4 border-t border-blue-100">
                          <div className="text-sm font-medium text-gray-600">Graduation Details</div>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <div className="text-sm font-medium text-gray-600">Score</div>
                              {isEditing ? (
                                <Input
                                  value={editFormData.graduationScore || ''}
                                  onChange={(e) => setEditFormData({ ...editFormData, graduationScore: e.target.value })}
                                  className="mt-1"
                                  placeholder="%"
                                />
                              ) : (
                                <div className="text-2xl font-bold text-purple-700">
                                  {selectedApplication.graduationScore}%
                                </div>
                              )}
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <div className="text-sm font-medium text-gray-600">Passing Year</div>
                              {isEditing ? (
                                <Input
                                  value={editFormData.passingYear || ''}
                                  onChange={(e) => setEditFormData({ ...editFormData, passingYear: e.target.value })}
                                  className="mt-1"
                                />
                              ) : (
                                <div className="text-2xl font-bold text-purple-700">
                                  {selectedApplication.passingYear}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="text-sm font-medium text-gray-600">Graduation Stream</div>
                            {isEditing ? (
                              <Input
                                value={editFormData.graduationStream || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, graduationStream: e.target.value })}
                                className="mt-1"
                              />
                            ) : (
                              <div className="text-lg font-semibold text-gray-900">
                                {selectedApplication.graduationStream}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* EM-MAT Details */}
                <Card className="border-orange-200">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      EM-MAT Exam Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-600">Selected Exam Date</div>
                          <div className="flex items-center gap-2 mt-1">
                            <CalendarDays className="w-5 h-5 text-purple-600" />
                            {isEditing ? (
                              <Input
                                type="date"
                                value={editFormData.examDate || ''}
                                onChange={(e) => setEditFormData({ ...editFormData, examDate: e.target.value })}
                                className="flex-1"
                              />
                            ) : (
                              <span className="text-xl font-bold text-gray-900">
                                {selectedApplication.examDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-600">Application Date</div>
                      <div className="text-lg text-gray-800">
                        {formatDate(selectedApplication.applicationDate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="border-orange-200">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-600">Payment Status</div>
                        <div className="mt-2">
                          {isEditing ? (
                            <select
                              value={editFormData.paymentStatus || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, paymentStatus: e.target.value })}
                              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="failed">Failed</option>
                            </select>
                          ) : (
                            <PaymentStatusBadge status={selectedApplication.paymentStatus} />
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-600">Amount</div>
                        <div className="text-2xl font-bold text-gray-900">₹500</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {selectedApplication.paymentId && (
                        <div>
                          <div className="text-sm font-medium text-gray-600">Payment ID</div>
                          <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                            {selectedApplication.paymentId}
                          </div>
                        </div>
                      )}
                      
                      {selectedApplication.orderId && (
                        <div>
                          <div className="text-sm font-medium text-gray-600">Order ID</div>
                          <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                            {selectedApplication.orderId}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t">
                {isEditing ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditFormData({});
                      }}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveEdit}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => setDialogOpen(false)}
                      className="border-orange-300 hover:bg-orange-50"
                    >
                      Close
                    </Button>
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={handleDownloadApplicationPDF}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the application for <strong>{applicationToDelete?.name}</strong>? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-4 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setDeleteConfirmOpen(false)}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Session Details/Edit Dialog */}
      <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl">
          {selectedSession && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {isEditingSession ? 'Edit Session' : 'Session Details'}
                </DialogTitle>
                <DialogDescription>
                  {isEditingSession 
                    ? `Editing session for ${selectedSession.name}`
                    : `Session details for ${selectedSession.name}`
                  }
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-6">
                <Card className="border-orange-200">
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-600">Full Name</div>
                        {isEditingSession ? (
                          <Input
                            value={editSessionFormData.name || ''}
                            onChange={(e) => setEditSessionFormData({ ...editSessionFormData, name: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <div className="text-lg font-semibold">{selectedSession.name}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600">Class</div>
                        {isEditingSession ? (
                          <Input
                            value={editSessionFormData.studentClass || ''}
                            onChange={(e) => setEditSessionFormData({ ...editSessionFormData, studentClass: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <div className="text-lg font-semibold text-orange-700">{selectedSession.studentClass}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-600">Email</div>
                          {isEditingSession ? (
                            <Input
                              type="email"
                              value={editSessionFormData.email || ''}
                              onChange={(e) => setEditSessionFormData({ ...editSessionFormData, email: e.target.value })}
                              className="mt-1"
                            />
                          ) : (
                            <div className="text-gray-800">{selectedSession.email}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-600">Mobile</div>
                          {isEditingSession ? (
                            <Input
                              value={editSessionFormData.mobile || ''}
                              onChange={(e) => setEditSessionFormData({ ...editSessionFormData, mobile: e.target.value })}
                              className="mt-1"
                            />
                          ) : (
                            <div className="text-gray-800">{selectedSession.mobile}</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-600">Interest</div>
                        {isEditingSession ? (
                          <Input
                            value={editSessionFormData.interest || ''}
                            onChange={(e) => setEditSessionFormData({ ...editSessionFormData, interest: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <Badge variant="outline" className="mt-1 border-green-300 text-green-700">
                            {selectedSession.interest}
                          </Badge>
                        )}
                      </div>

                      <div>
                         <div className="text-sm font-medium text-gray-600">Requested On</div>
                         <div className="text-gray-800">{formatDate(selectedSession.createdAt)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t">
                {isEditingSession ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditingSession(false);
                        setEditSessionFormData({});
                      }}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveSessionEdit}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => setSessionDialogOpen(false)}
                    className="border-orange-300 hover:bg-orange-50"
                  >
                    Close
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Session Delete Confirmation Dialog */}
      <Dialog open={sessionDeleteConfirmOpen} onOpenChange={setSessionDeleteConfirmOpen}>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the session request for <strong>{sessionToDelete?.name}</strong>? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-4 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setSessionDeleteConfirmOpen(false)}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteSession}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Session
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;