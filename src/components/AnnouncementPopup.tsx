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
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: -100, rotateX: 45 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotateX: 0,
            }}
            exit={{ opacity: 0, scale: 0.5, y: -50, rotateX: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              mass: 0.8
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-sm"
          >
            {/* Animated glow ring */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -inset-2 bg-gradient-to-r from-primary via-orange-400 to-yellow-400 blur-2xl rounded-3xl opacity-60"
            />
            
            {/* Sparkle particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 15)],
                  y: [0, -30 - i * 10]
                }}
                transition={{ 
                  duration: 1.5,
                  delay: 0.5 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                style={{ filter: 'blur(1px)' }}
              />
            ))}
            
            <motion.div 
              className="relative bg-gradient-to-br from-hero-dark via-gray-900 to-hero-dark border-2 border-primary/50 rounded-2xl overflow-hidden shadow-2xl"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(249, 115, 22, 0.3)",
                  "0 0 40px rgba(249, 115, 22, 0.5)",
                  "0 0 20px rgba(249, 115, 22, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Animated background patterns */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ 
                    rotate: -360,
                    scale: [1, 1.4, 1]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute -bottom-10 -left-10 w-36 h-36 bg-orange-500/20 rounded-full blur-2xl"
                />
                
                {/* Floating dots */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    className="absolute w-1.5 h-1.5 bg-primary/50 rounded-full"
                    style={{
                      left: `${15 + i * 18}%`,
                      top: `${20 + i * 12}%`
                    }}
                  />
                ))}
              </div>

              {/* Close button */}
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group border border-white/20"
              >
                <X className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
              </motion.button>

              {/* Content */}
              <div className="relative p-6">
                {/* Badge with pulse */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="flex items-center gap-2 mb-4"
                >
                  <motion.span 
                    className="relative flex h-3 w-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </motion.span>
                  <motion.span 
                    className="text-xs font-bold text-primary uppercase tracking-widest"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🔔 New Announcement
                  </motion.span>
                </motion.div>

                {/* Main heading with bounce */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-3 flex items-center gap-2"
                    animate={{ 
                      textShadow: [
                        "0 0 10px rgba(249, 115, 22, 0)",
                        "0 0 20px rgba(249, 115, 22, 0.5)",
                        "0 0 10px rgba(249, 115, 22, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.span>
                    EM-MAT Round 1
                  </motion.h3>
                  
                  {/* Date highlight with shake */}
                  <motion.div 
                    className="flex items-center gap-3 bg-gradient-to-r from-primary/30 to-orange-500/30 rounded-xl p-4 mb-4 border border-primary/30"
                    whileHover={{ scale: 1.02 }}
                    animate={{
                      borderColor: [
                        "rgba(249, 115, 22, 0.3)",
                        "rgba(249, 115, 22, 0.6)",
                        "rgba(249, 115, 22, 0.3)"
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-primary to-orange-500 rounded-lg p-2.5"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Calendar className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <motion.p 
                        className="text-white font-bold text-xl"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        1st February 2025
                      </motion.p>
                      <p className="text-gray-400 text-xs">📍 Mark your calendar!</p>
                    </div>
                  </motion.div>

                  <motion.p 
                    className="text-gray-300 text-sm mb-5 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Don't miss the opportunity! Register now for EM-MAT Round 1 and take the first step towards your dream career. 🚀
                  </motion.p>

                  {/* CTA Button with pulse */}
                  <Link to="/em-mat">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-primary via-orange-500 to-yellow-500 hover:from-primary/90 hover:via-orange-500/90 hover:to-yellow-500/90 text-white font-bold py-3 rounded-xl group transition-all duration-300 shadow-lg shadow-primary/30 text-base"
                        onClick={handleClose}
                      >
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="flex items-center justify-center gap-2"
                        >
                          Register Now
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.span>
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Bottom decoration with animation */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-orange-400 to-yellow-400"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementPopup;
