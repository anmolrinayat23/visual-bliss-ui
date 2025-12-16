import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Sparkles, Bell, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const AnnouncementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a small delay for better UX
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Auto-hide after 15 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 16000); // 1s delay + 15s visible

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
          className="fixed top-24 right-4 z-50 max-w-sm w-full mx-4 md:mx-0"
        >
          {/* Glow effect behind */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-orange-400/30 blur-xl rounded-2xl" />
          
          <div className="relative bg-gradient-to-br from-hero-dark via-gray-900 to-hero-dark border border-primary/30 rounded-2xl overflow-hidden shadow-2xl">
            {/* Animated background patterns */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute -bottom-10 -left-10 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl"
              />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:rotate-90 group"
            >
              <X className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
            </button>

            {/* Content */}
            <div className="relative p-5">
              {/* Badge */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-3"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  New Announcement
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  EM-MAT Round 1
                </h3>
                
                {/* Date highlight */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl p-3 mb-4 border border-primary/20">
                  <div className="bg-primary rounded-lg p-2">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">1st February 2025</p>
                    <p className="text-gray-400 text-xs">Mark your calendar!</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">
                  Don't miss the opportunity! Register now for EM-MAT Round 1 and take the first step towards your dream career.
                </p>

                {/* CTA Button */}
                <Link to="/em-mat">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white font-semibold py-2.5 rounded-xl group transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                    onClick={handleClose}
                  >
                    Register Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* Bottom decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-orange-400 to-yellow-400" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementPopup;
