import { Blocks } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Blocks className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Educate Me</span>
          </Link>

          <nav className="flex items-center gap-8">
            <Link to="/contact" className="text-sm text-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>
            <Link to="/privacy" className="text-sm text-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {currentYear} Educate Me. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
