import { Button } from "@/components/ui/button";
import { Blocks } from "lucide-react";
import { Link } from "react-router-dom";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Blocks className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Educate Me</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button size="lg" className="hidden lg:flex">
            Book Counselling
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
