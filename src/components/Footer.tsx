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
    <footer className="bg-hero-dark text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Blocks className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">Educate Me</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering students to achieve their academic dreams through expert guidance and personalized counselling.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-gray-400 hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/services" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Our Services
              </Link>
              <Link to="/courses" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Courses
              </Link>
              <Link to="/em-mat" className="text-sm text-gray-400 hover:text-primary transition-colors">
                EM-MAT Exam
              </Link>
              <Link to="/session" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Book Session
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-1 flex-shrink-0" />
                <a href="mailto:info@educateme.com" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  info@educateme.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-1 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  123 Education Street,<br />Learning City, LC 12345
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get updates on courses and counselling sessions.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
              <Button type="submit" className="w-full">
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
