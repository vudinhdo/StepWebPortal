import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContactForm from "./contact-form";

export default function Hero() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <section className="pt-20 pb-16 step-hero-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[hsl(207,100%,40%)] mb-6 leading-tight">
            Kết nối, bảo vệ và xây dựng hạ tầng CNTT toàn diện với STEP
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Cung cấp giải pháp cloud, hosting, máy chủ và dịch vụ IT đáng tin cậy, giúp doanh nghiệp của bạn phát triển nhanh chóng và an toàn hơn. Hơn 100 dịch vụ dành cho SMEs và chuyên gia IT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button 
              className="step-gradient text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:shadow-lg transition-all h-12 sm:h-14 step-pulse-animation transform hover:scale-105 button-hover"
              onClick={() => setShowContactForm(true)}
            >
              Bắt đầu miễn phí
            </Button>
            <Button 
              variant="outline" 
              className="border-[hsl(207,100%,40%)] text-[hsl(207,100%,40%)] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[hsl(207,100%,40%)] hover:text-white transition-all h-12 sm:h-14 transform hover:scale-105 button-hover"
              onClick={() => setShowContactForm(true)}
            >
              Liên hệ chuyên gia
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      
      <ContactForm open={showContactForm} onOpenChange={setShowContactForm} />
    </section>
  );
}
