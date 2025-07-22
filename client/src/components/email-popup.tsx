import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, Gift } from "lucide-react";

interface EmailPopupProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
  delay?: number; // Delay in milliseconds
}

export default function EmailPopup({ 
  title = "🎁 Nhận Ưu Đãi Đặc Biệt!", 
  description = "Đăng ký email để nhận mã giảm giá 30% và tips tối ưu hosting miễn phí!",
  buttonText = "Nhận Ngay",
  onSubmit,
  delay = 15000 // 15 seconds
}: EmailPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has already been shown in this session
    const popupShown = localStorage.getItem('email_popup_shown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        // Mark as shown in localStorage
        localStorage.setItem('email_popup_shown', 'true');
        setHasShown(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(email);
      }
      
      // Close popup after successful submission
      setIsVisible(false);
      
      // Show success message (you can customize this)
      alert('Cảm ơn bạn! Mã giảm giá đã được gửi qua email.');
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && !hasShown && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.6 
          }}
          className="fixed top-20 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
        >
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-white hover:text-gray-200 transition-colors"
                aria-label="Đóng popup"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{title}</h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email của bạn..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : buttonText}
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-3">
                Chúng tôi cam kết không spam. Bạn có thể hủy đăng ký bất kỳ lúc nào.
              </p>
            </div>

            {/* Floating animation decoration */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-400 rounded-full animate-pulse opacity-60"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}