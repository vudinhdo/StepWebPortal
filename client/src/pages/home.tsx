import { useState, useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Statistics from "@/components/statistics";
import Testimonials from "@/components/testimonials";
import Resources from "@/components/resources";
import Footer from "@/components/footer";
import WelcomeScreen from "@/components/welcome-screen";
import PersonalizedContent from "@/components/personalized-content";
import PersonalizationSettings from "@/components/personalization-settings";
import { AnimatePresence } from "framer-motion";

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
      }, 2000); // Show after 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleWelcomeComplete = (info: UserInfo) => {
    setUserInfo(info);
    setShowWelcome(false);
    setIsPersonalized(true);
    localStorage.setItem('stepWelcomeShown', 'true');
    localStorage.setItem('stepUserInfo', JSON.stringify(info));
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

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Personalized Hero Section */}
      {isPersonalized && userInfo ? (
        <section className="pt-20 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <PersonalizedContent userInfo={userInfo} />
          </div>
        </section>
      ) : (
        <Hero />
      )}
      
      <Services />
      <Statistics />
      <Testimonials />
      <Resources />
      <Footer />

      {/* Personalization Settings */}
      {isPersonalized && userInfo && (
        <PersonalizationSettings
          userInfo={userInfo}
          onReset={handleResetPersonalization}
          onEdit={handleEditPersonalization}
        />
      )}

      {/* Welcome Screen Modal */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence>

      {/* Skip button for welcome screen */}
      {showWelcome && (
        <div className="fixed bottom-4 right-4 z-[60]">
          <button
            onClick={handleSkipPersonalization}
            className="text-white bg-black/50 hover:bg-black/70 px-4 py-2 rounded-lg text-sm transition-all"
          >
            Bỏ qua
          </button>
        </div>
      )}
    </div>
  );
}