import { Blocks, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-hero-dark to-black text-white py-16 relative overflow-hidden">
      {/* Decorative gradient line */}
      
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-4 group">
            <Link to="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Educate Me Logo" 
                className="w-20 h-20 rounded-full object-contain"
              />
              <span className="text-2xl font-bold bg-white bg-clip-text text-transparent">
                Educate Me
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
              Empowering students to achieve their academic dreams through expert guidance and personalized counselling.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/share/16Kt4vX8vG/?mibextid=wwXIfr" className="hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/in/nikhil-sewaramani-937997219?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/educate.me.in?igsh=dXY3NXpxamNweTh6" className="hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                About Us
              </Link>
              <Link to="/services" className="text-sm text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                Our Services
              </Link>
              <Link to="/courses" className="text-sm text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                Courses
              </Link>
              <Link to="/em-mat" className="text-sm text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                EM-MAT Exam
              </Link>
              <Link to="/session" className="text-sm text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block">
                Book Session
              </Link>
            </nav>
          </div>

          {/* Our Branches */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Our Branches</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                <span>Bhopal (Head Office)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                <span>Pune - Xion Mall Hinjewadi</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                <span>Noida - Sector 4</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-1 flex-shrink-0" />
                <a href="mailto:admissions@educate-me.in" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  admissions@educate-me.in
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-1 flex-shrink-0" />
                <a href="tel:+917974163158" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  +91 7974163158
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  335 Kalpana Nagar<br />Piplani, Bhopal
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get updates on courses and counselling sessions.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary transition-colors duration-300"
                required
              />
              <Button type="submit" className="w-full hover:scale-105 transition-transform duration-300">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Educate Me. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
