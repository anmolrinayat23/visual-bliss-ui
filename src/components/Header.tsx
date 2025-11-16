"use client";

import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, X, User  ,Phone} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Courses", href: "/courses" },
    { label: "EM-MAT", href: "/em-mat" },
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
              className="w-16 h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            />
            <span className="text-lg font-bold text-foreground">
              Educate Me
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative text-md font-semibold text-foreground hover:text-primary transition-all px-2 py-1 rounded-md hover:bg-primary/5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex flex-shrink-0 ml-4 gap-3 items-center">

            {/* Book Counselling */}
             <a 
              href="tel:9131005392" 
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/100 text-primary hover:bg-primary/20 transition-all duration-300 group"
            >
              <Phone className="h-6 w-4 group-hover:scale-110 text-white transition-transform" />
              <span className="font-semibold text-white text-sm">9131005392</span>
            </a>

            {/* LOGIN / PROFILE ICON */}
            {!isLoggedIn ? (
              <Button size="sm" className="hover:scale-105 transition-all py-6 shadow-lg hover:shadow-xl">
                <Link to="/Auth">Login</Link>
              </Button>
            ) : (
              <button
                onClick={() => navigate("/accountpage")}
                className="p-3 rounded-full bg-primary text-white ml-5 hover:bg-primary/80 transition-all"
              >
                <User className="h-6 w-6" />
              </button>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
     {/* Mobile Navigation */}
<div
  className={`
    md:hidden fixed left-0 right-0 bg-background border-t 
    transition-all duration-300 overflow-hidden
    ${isMobileMenuOpen ? "top-[72px] max-h-[70vh] opacity-100" : "top-0 max-h-0 opacity-0"}
  `}
>
  <nav className="flex flex-col p-4">
    {navItems.map((item) => (
      <Link
        key={item.label}
        to={item.href}
        onClick={closeMobileMenu}
        className="text-base font-semibold py-3 border-b"
      >
        {item.label}
      </Link>
    ))}

    <a 
      href="tel:9131005392" 
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 group"
    >
      <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
      <span className="font-semibold text-sm">9131005392</span>
    </a>

    {!isLoggedIn ? (
      <Button
        size="lg"
        className="w-full mt-3"
        onClick={() => {
          navigate("/Auth");
          closeMobileMenu();
        }}
      >
        Login
      </Button>
    ) : (
      <Button
        size="lg"
        className="w-full mt-3 flex gap-3 items-center"
        onClick={() => {
          navigate("/accountpage");
          closeMobileMenu();
        }}
      >
        <User className="h-6 w-6" />
        My Account
      </Button>
    )}
  </nav>
</div>

      </div>
    </header>
  );
};

export default Header;