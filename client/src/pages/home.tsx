import { useState, useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Statistics from "@/components/statistics";
import Testimonials from "@/components/testimonials";
import Resources from "@/components/resources";
import TooltipShowcase from "@/components/tooltip-showcase";
import Footer from "@/components/footer";
import PersonalizedContent from "@/components/personalized-content";
import PersonalizationSettings from "@/components/personalization-settings";
import { useToast } from "@/hooks/use-toast";

interface UserInfo {
  name: string;
  company: string;
  role: string;
  interests: string[];
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already completed personalization
    const savedUserInfo = localStorage.getItem('stepUserInfo');
    
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
      setIsPersonalized(true);
    }
  }, []);


  const handleResetPersonalization = () => {
    localStorage.removeItem('stepUserInfo');
    setUserInfo(null);
    setIsPersonalized(false);
    toast({
      title: "Đã xóa cá nhân hóa",
      description: "Dữ liệu cá nhân hóa đã được xóa",
    });
  };



  return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {isPersonalized && userInfo ? (
            <div className="pt-20 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100">
              <PersonalizedContent userInfo={userInfo} />
            </div>
          ) : (
            <Hero />
          )}
          
          <Services />
          <Statistics />
          <Testimonials />
          <Resources />
          <TooltipShowcase />
        </main>
        
        <Footer />
        
        {/* Only show personalization settings if user has completed welcome */}
        {isPersonalized && userInfo && (
          <PersonalizationSettings 
            userInfo={userInfo}
            onReset={handleResetPersonalization}
          />
        )}
        
      </div>
  );
}