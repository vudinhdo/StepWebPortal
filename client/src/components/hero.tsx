import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "./contact-form";
import { InlineEditor } from "./inline-editor";

export default function Hero() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <section className="pt-20 pb-16 step-hero-gradient relative overflow-hidden" data-onboarding="hero-section">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <InlineEditor
            page="home"
            section="hero"
            elementId="main-title"
            defaultContent="Kết nối, bảo vệ và xây dựng hạ tầng CNTT toàn diện với STEP"
            tag="h1"
            className="h1 text-[hsl(207,100%,40%)] mb-6"
          />
          <InlineEditor
            page="home"
            section="hero"
            elementId="subtitle"
            defaultContent="Cung cấp giải pháp cloud, hosting, máy chủ và dịch vụ IT đáng tin cậy, giúp doanh nghiệp của bạn phát triển nhanh chóng và an toàn hơn. Hơn 100 dịch vụ dành cho SMEs và chuyên gia IT."
            tag="p"
            className="lead mb-8 prose-constraint mx-auto"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Button 
                className="step-gradient text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:shadow-lg transition-all h-12 sm:h-14 step-pulse-animation button-hover nowrap"
                onClick={() => setShowContactForm(true)}
                data-onboarding="hero-cta-button"
              >
                Bắt đầu miễn phí
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Button 
                variant="outline" 
                className="border-[hsl(207,100%,40%)] text-[hsl(207,100%,40%)] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[hsl(207,100%,40%)] hover:text-white transition-all h-12 sm:h-14 button-hover nowrap"
                onClick={() => setShowContactForm(true)}
              >
                Liên hệ chuyên gia
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"
      ></motion.div>
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.3, 0.5] 
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2 
        }}
        className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl"
      ></motion.div>
      
      <ContactForm open={showContactForm} onOpenChange={setShowContactForm} />
    </section>
  );
}
