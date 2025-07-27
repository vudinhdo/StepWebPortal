import { useState, useEffect } from "react";
import { X, Mail, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface EmailPopupProps {
  discount: string;
  title: string;
  description: string;
  buttonText: string;
  storageKey: string;
}

export default function EmailPopup({ 
  discount, 
  title, 
  description, 
  buttonText,
  storageKey 
}: EmailPopupProps) {
  // Add development reset function (only in dev mode)
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      (window as any).resetEmailPopup = () => {
        localStorage.removeItem(storageKey);
        console.log('Email popup reset - refresh page to see popup in 15 seconds');
      };
    }
  }, [storageKey]);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if popup has been shown before
    const hasShown = localStorage.getItem(storageKey);
    if (hasShown) return;

    // Show popup after 5 seconds for testing (change to 15000 for production)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [storageKey]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Email Subscriber",
          email: email,
          service: "Email Discount Popup",
          message: `Quan tâm đến khuyến mãi ${discount}. Vui lòng liên hệ tư vấn chi tiết.`
        })
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Đăng ký thành công!",
        description: "Chúng tôi sẽ liên hệ với bạn trong 24h để tư vấn chi tiết.",
      });

      handleClose();
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại hoặc liên hệ hotline 0985.636.289",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, x: 100, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] sm:top-6 sm:right-6"
          >
            <Card className="border-2 border-blue-200 shadow-2xl bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-0">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
                  <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Gift className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{discount} OFF</div>
                      <div className="text-blue-100 text-sm">Ưu đãi đặc biệt</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{description}</p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang gửi..." : buttonText}
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Không spam. Chỉ gửi thông tin hữu ích về dịch vụ hosting.
                  </p>
                  
                  {/* Development reset button */}
                  {process.env.NODE_ENV === 'development' && (
                    <button
                      onClick={() => {
                        localStorage.removeItem(storageKey);
                        window.location.reload();
                      }}
                      className="text-xs text-red-500 underline mt-2 block mx-auto"
                    >
                      [Dev] Reset Popup
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}