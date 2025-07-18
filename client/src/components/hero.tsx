import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContactForm from "./contact-form";

export default function Hero() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <section className="pt-20 pb-16 step-hero-gradient">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-[hsl(207,100%,40%)] mb-6">
            Kết nối, bảo vệ và xây dựng hạ tầng CNTT toàn diện với STEP
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Cung cấp giải pháp cloud, hosting, máy chủ và dịch vụ IT đáng tin cậy, giúp doanh nghiệp của bạn phát triển nhanh chóng và an toàn hơn. Hơn 100 dịch vụ dành cho SMEs và chuyên gia IT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="step-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all h-14 step-pulse-animation transform hover:scale-105"
              onClick={() => setShowContactForm(true)}
            >
              Bắt đầu miễn phí
            </Button>
            <Button 
              variant="outline" 
              className="border-[hsl(207,100%,40%)] text-[hsl(207,100%,40%)] px-8 py-4 rounded-lg font-semibold hover:bg-[hsl(207,100%,40%)] hover:text-white transition-all h-14 transform hover:scale-105"
              onClick={() => setShowContactForm(true)}
            >
              Liên hệ chuyên gia
            </Button>
          </div>
        </div>
      </div>
      
      <ContactForm open={showContactForm} onOpenChange={setShowContactForm} />
    </section>
  );
}
