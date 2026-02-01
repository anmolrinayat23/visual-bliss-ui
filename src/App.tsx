import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop"; // ← NEW IMPORT

import Index from "./pages/Index";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Universities from "./pages/Universities";
import EmMat from "./pages/EmMat";
import BookSession from "./pages/BookSession";
import About from "./pages/About";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import TeamMemberDetail from "./pages/TeamMemberDetail";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";
import Accountpage from './pages/Accountpage';
import AdminAuth from "./components/AdminAuth";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />   {/* ← THIS FIXES THE ISSUE */}
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/universities" element={<Universities />} />

          <Route 
            path="/em-mat" 
            element={
              <ProtectedRoute>
                <EmMat />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/session" 
            element={
            
                <BookSession />
              
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/Auth" element={<Auth />} />
          <Route
            path="/accountpage"
            element={
              <ProtectedRoute>
                <Accountpage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/nikhil45/login" element={<AdminAuth />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/team/:id" element={<TeamMemberDetail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
