import { useState, useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Statistics from "@/components/statistics";
import Testimonials from "@/components/testimonials";
import Resources from "@/components/resources";
import TooltipShowcase from "@/components/tooltip-showcase";
import Footer from "@/components/footer";
import WelcomeScreen from "@/components/welcome-screen";
import PersonalizedContent from "@/components/personalized-content";
import PersonalizationSettings from "@/components/personalization-settings";
import EmailPopup from "@/components/email-popup";
import { InlineEditor } from "@/components/inline-editor";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface UserInfo {
  name: string;
  company: string;
  role: string;
  interests: string[];
}

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already completed welcome screen
    const savedUserInfo = localStorage.getItem('stepUserInfo');
    const welcomeShown = localStorage.getItem('stepWelcomeShown');
    
    if (savedUserInfo && welcomeShown) {
      setUserInfo(JSON.parse(savedUserInfo));
      setIsPersonalized(true);
    } else if (!welcomeShown) {
      // Show welcome screen for first-time visitors
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 10000); // Show after 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleWelcomeComplete = (info: UserInfo) => {
    setUserInfo(info);
    setShowWelcome(false);
    setIsPersonalized(true);
    localStorage.setItem('stepWelcomeShown', 'true');
    localStorage.setItem('stepUserInfo', JSON.stringify(info));
    
    // Note: onboarding removed for now
  };

  const handleSkipPersonalization = () => {
    setShowWelcome(false);
    localStorage.setItem('stepWelcomeShown', 'true');
  };

  const handleResetPersonalization = () => {
    localStorage.removeItem('stepUserInfo');
    localStorage.removeItem('stepWelcomeShown');
    setUserInfo(null);
    setIsPersonalized(false);
    setShowWelcome(true);
  };

  const handleEditPersonalization = () => {
    setShowWelcome(true);
  };

  const handleEmailSubmit = async (email: string) => {
    console.log('Email submitted:', email);
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
            onEdit={handleEditPersonalization}
            onReset={handleResetPersonalization}
          />
        )}
        
        {/* Welcome Screen */}
        <AnimatePresence>
          {showWelcome && (
            <WelcomeScreen
              onComplete={handleWelcomeComplete}
              onSkip={handleSkipPersonalization}
            />
          )}
        </AnimatePresence>
        
        {/* Email Popup */}
        <EmailPopup 
          servicePage="home"
          onEmailSubmit={handleEmailSubmit}
        />
      </div>
  );
}