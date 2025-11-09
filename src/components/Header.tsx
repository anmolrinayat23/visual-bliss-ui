"use client";

import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigate hook

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Courses", href: "/courses" },
    { label: "EM-MAT", href: "/em-mat" },
    { label: "Book Session", href: "/session" },
    { label: "Explore", href: "/explore" },
    { label: "About Us", href: "/about" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b backdrop-blur-sm">
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group flex-shrink-0"
            onClick={closeMobileMenu}
          >
          <img
  src="/logo.png"
  alt="Educate Me Logo"
  className="w-16 h-16 sm:w-15 sm:h-15 rounded-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
/>

            <span className="text-base sm:text-lg font-bold text-foreground transition-colors duration-300 whitespace-nowrap">
              Educate Me
            </span>
          </Link>



          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 overflow-x-auto scrollbar-hide max-w-[500px] lg:max-w-none">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative text-md lg:text-md font-semibold text-foreground hover:text-primary transition-all duration-200 whitespace-nowrap px-2 py-1 rounded-md hover:bg-primary/5 flex-shrink-0
                    after:absolute after:left-2 after:right-2 after:bottom-0 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* ✅ Desktop Button (Now Navigates to /session) */}
          <div className="hidden md:flex flex-shrink-0 ml-4 gap-3">
            <Button size="sm" className="hover:scale-105 transition-all py-6 duration-300 shadow-lg hover:shadow-xl text-sm whitespace-nowrap">
              Book Counsellings
            </Button>
              <Button size="sm" className="hover:scale-105 transition-all py-6 duration-300 shadow-lg hover:shadow-xl text-sm whitespace-nowrap">
             <Link to="/Auth">Login/SignUp</Link>
            </Button>
               <Button size="sm" className="hover:scale-105 transition-all py-6 duration-300 shadow-lg hover:shadow-xl text-sm whitespace-nowrap">
             <Link to="/Dashboard">Admin </Link>
            </Button>
               <Button size="sm" className="hover:scale-105 transition-all py-6 duration-300 shadow-lg hover:shadow-xl text-sm whitespace-nowrap">
             <Link to="/Account">Account</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200 flex-shrink-0"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed left-0 right-0 bg-background border-t transition-all duration-300 ease-in-out overflow-y-auto ${
            isMobileMenuOpen
              ? "top-full max-h-[80vh] opacity-100 shadow-lg"
              : "top-0 max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="relative text-base font-semibold text-foreground hover:text-primary py-3 px-4 rounded-lg hover:bg-muted/50 transition-all duration-200 border-b border-muted/30
                  after:absolute after:left-4 after:right-4 after:bottom-1 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

          <div className="hidden lg:flex items-center gap-3">
        
            <Button asChild size="lg" className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Link to="/session">Book Counselling</Link>
            </Button>
          </div>
            {/* ✅ Mobile Button (optional: also navigate) */}
            <div className="pt-4 mt-2 border-t border-muted/30">
              <Button
                size="lg"
                className="w-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => {
                  navigate("/session");
                  closeMobileMenu();
                }}
              >
                Book Counselling
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 top-full"
          onClick={closeMobileMenu}
        />
      )}
    </header>
  );
};

export default Header;
