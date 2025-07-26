import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building2, 
  Mail, 
  Sparkles, 
  ArrowRight,
  Clock,
  Award,
  Shield,
  Zap
} from "lucide-react";

interface WelcomeScreenProps {
  onComplete: (userInfo: UserInfo) => void;
  onSkip: () => void;
}

interface UserInfo {
  name: string;
  company: string;
  role: string;
  interests: string[];
}

const roles = [
  { id: "ceo", label: "CEO/Founder", icon: "👑" },
  { id: "cto", label: "CTO/Tech Lead", icon: "🔧" },
  { id: "it-manager", label: "IT Manager", icon: "💼" },
  { id: "developer", label: "Developer", icon: "💻" },
  { id: "sysadmin", label: "System Admin", icon: "⚙️" },
  { id: "business-owner", label: "Business Owner", icon: "🏢" },
  { id: "other", label: "Other", icon: "👤" }
];

const interests = [
  { id: "cloud", label: "Cloud Services", color: "bg-blue-100 text-blue-800" },
  { id: "hosting", label: "Web Hosting", color: "bg-green-100 text-green-800" },
  { id: "servers", label: "Dedicated Servers", color: "bg-purple-100 text-purple-800" },
  { id: "email", label: "Email Solutions", color: "bg-orange-100 text-orange-800" },
  { id: "software", label: "Software Licensing", color: "bg-pink-100 text-pink-800" },
  { id: "consulting", label: "IT Consulting", color: "bg-indigo-100 text-indigo-800" },
  { id: "security", label: "Security Solutions", color: "bg-red-100 text-red-800" },
  { id: "domain", label: "Domain Management", color: "bg-yellow-100 text-yellow-800" }
];

export default function WelcomeScreen({ onComplete, onSkip }: WelcomeScreenProps) {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    company: "",
    role: "",
    interests: []
  });
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      let greeting = "Chào mừng";
      
      if (hour >= 5 && hour < 12) greeting = "Chào buổi sáng";
      else if (hour >= 12 && hour < 18) greeting = "Chào buổi chiều";
      else if (hour >= 18 && hour < 22) greeting = "Chào buổi tối";
      else greeting = "Chúc ngủ ngon";
      
      setCurrentTime(greeting);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRoleSelect = (roleId: string) => {
    setUserInfo(prev => ({ ...prev, role: roleId }));
    setTimeout(() => setStep(3), 300);
  };

  const handleInterestToggle = (interestId: string) => {
    setUserInfo(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleComplete = () => {
    localStorage.setItem('stepUserInfo', JSON.stringify(userInfo));
    onComplete(userInfo);
  };

  const canProceedStep2 = userInfo.name.trim().length >= 2;
  const canProceedStep3 = userInfo.role !== "";
  const canComplete = userInfo.interests.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen flex items-start justify-center p-4 pt-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-2xl"
        >
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            {/* Header with Skip Button */}
            <div className="relative text-center mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log('Skip button clicked');
                  onSkip();
                }}
                className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 p-2 z-10"
                title="Bỏ qua cá nhân hóa"
              >
                ✕
              </Button>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="text-[hsl(207,100%,40%)] mr-2" size={24} />
                  <h1 className="text-2xl font-bold text-[hsl(207,100%,40%)]">
                    {currentTime}!
                  </h1>
                </div>
                <p className="text-gray-600">
                  Hãy để STEP tùy chỉnh trải nghiệm phù hợp với bạn
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Hoặc bấm "✕" để bỏ qua
                </p>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Bước {step}/3</span>
                <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-[hsl(207,100%,40%)] h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <User className="mx-auto text-[hsl(207,100%,40%)] mb-2" size={32} />
                      <h2 className="text-xl font-semibold">Hãy làm quen nhé!</h2>
                      <p className="text-gray-600">Chúng tôi muốn biết bạn là ai</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Tên của bạn *</Label>
                        <Input
                          id="name"
                          placeholder="Nguyễn Văn A"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company">Công ty (tùy chọn)</Label>
                        <Input
                          id="company"
                          placeholder="Công ty ABC"
                          value={userInfo.company}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, company: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep2}
                      className="w-full step-gradient text-white"
                    >
                      Tiếp tục <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Role Selection */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <Building2 className="mx-auto text-[hsl(207,100%,40%)] mb-2" size={32} />
                      <h2 className="text-xl font-semibold">Vai trò của bạn là gì?</h2>
                      <p className="text-gray-600">Điều này giúp chúng tôi đề xuất giải pháp phù hợp</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {roles.map((role) => (
                        <motion.button
                          key={role.id}
                          onClick={() => handleRoleSelect(role.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            userInfo.role === role.id
                              ? 'border-[hsl(207,100%,40%)] bg-blue-50'
                              : 'border-gray-200 hover:border-[hsl(207,100%,40%)]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{role.icon}</span>
                            <span className="font-medium">{role.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Interests */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <Zap className="mx-auto text-[hsl(207,100%,40%)] mb-2" size={32} />
                      <h2 className="text-xl font-semibold">Bạn quan tâm đến dịch vụ nào?</h2>
                      <p className="text-gray-600">Chọn tất cả những gì bạn cần (tối thiểu 1)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {interests.map((interest) => (
                        <motion.button
                          key={interest.id}
                          onClick={() => handleInterestToggle(interest.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            userInfo.interests.includes(interest.id)
                              ? 'border-[hsl(207,100%,40%)] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Badge 
                            className={`${interest.color} ${
                              userInfo.interests.includes(interest.id) ? 'ring-2 ring-[hsl(207,100%,40%)]' : ''
                            }`}
                          >
                            {interest.label}
                          </Badge>
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="flex-1"
                      >
                        Quay lại
                      </Button>
                      <Button
                        onClick={handleComplete}
                        disabled={!canComplete}
                        className="flex-1 step-gradient text-white"
                      >
                        Hoàn thành <Sparkles className="ml-2" size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-6 border-t border-gray-100"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Clock className="text-[hsl(207,100%,40%)] mb-1" size={20} />
                  <span className="text-xs text-gray-600">Hỗ trợ 24/7</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="text-[hsl(207,100%,40%)] mb-1" size={20} />
                  <span className="text-xs text-gray-600">Bảo mật cao</span>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="text-[hsl(207,100%,40%)] mb-1" size={20} />
                  <span className="text-xs text-gray-600">Chất lượng đỉnh cao</span>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}