import { useState, useEffect } from "react";
import { X, User, Building2, Code, Server, Settings, UserCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface PersonalizationPopupProps {
  storageKey: string;
}

interface UserProfile {
  name: string;
  role: string;
  interests: string[];
}

const roles = [
  { id: "ceo", label: "CEO/Giám đốc", icon: Building2 },
  { id: "cto", label: "CTO/Giám đốc kỹ thuật", icon: Code },
  { id: "it-manager", label: "IT Manager", icon: Settings },
  { id: "developer", label: "Developer", icon: Code },
  { id: "sysadmin", label: "System Admin", icon: Server },
  { id: "business-owner", label: "Chủ doanh nghiệp", icon: Building2 },
  { id: "other", label: "Khác", icon: User }
];

const interests = [
  "Email Server",
  "Cloud Hosting", 
  "WordPress Hosting",
  "Laravel Hosting",
  "NVME Hosting",
  "Reseller Hosting",
  "Domain Services",
  "Backup Solutions"
];

export default function PersonalizationPopup({ storageKey }: PersonalizationPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    role: "",
    interests: []
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if personalization has been completed or skipped
    const hasCompleted = localStorage.getItem(storageKey);
    if (hasCompleted) return;

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [storageKey]);

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, "skipped");
    toast({
      title: "Đã bỏ qua cá nhân hóa",
      description: "Bạn có thể trải nghiệm trang web với nội dung tiêu chuẩn.",
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Save personalization data
    localStorage.setItem(storageKey, "completed");
    localStorage.setItem("userProfile", JSON.stringify(profile));
    
    setIsVisible(false);
    toast({
      title: "Cá nhân hóa hoàn tất!",
      description: `Chào ${profile.name}! Trải nghiệm đã được tùy chỉnh theo nhu cầu của bạn.`,
    });
  };

  const handleInterestToggle = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return profile.name.trim().length > 0;
      case 2: return profile.role.length > 0;
      case 3: return profile.interests.length > 0;
      default: return false;
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
            className="fixed inset-0 bg-black/40 z-40"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-[calc(100vw-2rem)]"
          >
            <Card className="border-2 border-blue-200 shadow-2xl bg-white">
              <CardContent className="p-0">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
                  <button
                    onClick={handleSkip}
                    className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                    title="Bỏ qua cá nhân hóa"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Cá nhân hóa trải nghiệm</h2>
                      <p className="text-blue-100 text-sm">Bước {step}/3</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="bg-white/20 rounded-full h-2">
                    <motion.div 
                      className="bg-white rounded-full h-2"
                      initial={{ width: "33%" }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="font-semibold text-gray-900 text-lg">Chào bạn! Tên bạn là gì?</h3>
                      <p className="text-sm text-gray-600">
                        Để chúng tôi có thể cung cấp trải nghiệm phù hợp nhất
                      </p>
                      <Input
                        type="text"
                        placeholder="Nhập tên của bạn"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="text-lg"
                        autoFocus
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="font-semibold text-gray-900 text-lg">
                        Chào {profile.name}! Vai trò của bạn là gì?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Chọn vai trò phù hợp để nhận gợi ý dịch vụ tốt nhất
                      </p>
                      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                        {roles.map((role) => (
                          <button
                            key={role.id}
                            onClick={() => setProfile(prev => ({ ...prev, role: role.id }))}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                              profile.role === role.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <role.icon className={`h-5 w-5 ${
                              profile.role === role.id ? "text-blue-600" : "text-gray-500"
                            }`} />
                            <span className={`font-medium ${
                              profile.role === role.id ? "text-blue-900" : "text-gray-700"
                            }`}>
                              {role.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="font-semibold text-gray-900 text-lg">
                        Bạn quan tâm đến dịch vụ nào?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Chọn những dịch vụ bạn muốn tìm hiểu (có thể chọn nhiều)
                      </p>
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {interests.map((interest) => (
                          <button
                            key={interest}
                            onClick={() => handleInterestToggle(interest)}
                            className={`p-3 rounded-lg border-2 transition-all text-sm ${
                              profile.interests.includes(interest)
                                ? "border-blue-500 bg-blue-50 text-blue-900"
                                : "border-gray-200 hover:border-gray-300 text-gray-700"
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                      {profile.interests.length > 0 && (
                        <p className="text-xs text-blue-600">
                          Đã chọn: {profile.interests.length} dịch vụ
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={handleSkip}
                      className="flex-1"
                    >
                      Bỏ qua
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {step === 3 ? "Hoàn tất" : "Tiếp tục"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Thông tin sẽ được lưu trữ cục bộ để cải thiện trải nghiệm của bạn
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}