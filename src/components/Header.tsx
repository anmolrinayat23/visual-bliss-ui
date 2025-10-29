import { Button } from "@/components/ui/button";
import { Blocks } from "lucide-react";
import { Link } from "react-router-dom";
import finalLogo from "@/assets/final logo.png";

const Header = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/services" },
    { label: "Courses Offered", href: "/courses" },
    { label: "EM-MAT", href: "/em-mat" },
    { label: "Book a Session", href: "/session" },
    { label: "Explore", href: "/explore" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.png"
              alt="" 
              className="w-12 h-15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" 
            />
            <span className="text-xl font-bold     transition-colors duration-300">
              Educate Me
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-semibold text-foreground hover:text-primary transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-all duration-300">
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild size="lg" className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Link to="/session">Book Counselling</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
