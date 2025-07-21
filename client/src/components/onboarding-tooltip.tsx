import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Lightbulb, Target, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: "top" | "bottom" | "left" | "right";
  action?: {
    text: string;
    onClick: () => void;
  };
}

interface OnboardingTooltipProps {
  steps: OnboardingStep[];
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export default function OnboardingTooltip({ steps, isActive, onComplete, onSkip }: OnboardingTooltipProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !steps.length) return;

    const updateTooltipPosition = () => {
      const step = steps[currentStep];
      if (!step) return;

      const targetElement = document.querySelector(step.target);
      if (!targetElement) return;

      const targetRect = targetElement.getBoundingClientRect();
      const tooltipElement = tooltipRef.current;
      if (!tooltipElement) return;

      const tooltipRect = tooltipElement.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (step.position) {
        case "top":
          top = targetRect.top - tooltipRect.height - 12;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          break;
        case "bottom":
          top = targetRect.bottom + 12;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          break;
        case "left":
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.left - tooltipRect.width - 12;
          break;
        case "right":
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.right + 12;
          break;
      }

      // Keep tooltip within viewport
      const maxLeft = window.innerWidth - tooltipRect.width - 20;
      const maxTop = window.innerHeight - tooltipRect.height - 20;
      
      left = Math.max(20, Math.min(left, maxLeft));
      top = Math.max(20, Math.min(top, maxTop));

      setTooltipPosition({ top, left });
      setIsVisible(true);

      // Highlight target element
      targetElement.classList.add('onboarding-highlight');
    };

    const timer = setTimeout(() => {
      updateTooltipPosition();
    }, 100);

    window.addEventListener('resize', updateTooltipPosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateTooltipPosition);
      
      // Remove highlight from all elements
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight');
      });
    };
  }, [currentStep, isActive, steps]);

  const handleNext = () => {
    const step = steps[currentStep];
    if (step.action) {
      step.action.onClick();
    }

    if (currentStep < steps.length - 1) {
      // Remove highlight from current element
      const currentTarget = document.querySelector(steps[currentStep].target);
      if (currentTarget) {
        currentTarget.classList.remove('onboarding-highlight');
      }
      
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      // Remove highlight from current element
      const currentTarget = document.querySelector(steps[currentStep].target);
      if (currentTarget) {
        currentTarget.classList.remove('onboarding-highlight');
      }
      
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Remove highlight from all elements
    document.querySelectorAll('.onboarding-highlight').forEach(el => {
      el.classList.remove('onboarding-highlight');
    });
    onSkip();
  };

  if (!isActive || !steps.length || !isVisible) return null;

  const step = steps[currentStep];
  if (!step) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleSkip}
      />

      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 max-w-sm"
          style={{ 
            top: tooltipPosition.top, 
            left: tooltipPosition.left,
            transform: 'translateZ(0)' // Force hardware acceleration
          }}
        >
          {/* Arrow pointer */}
          <div className={`absolute w-3 h-3 bg-white border rotate-45 ${
            step.position === 'top' ? '-bottom-1.5 border-b-0 border-r-0' :
            step.position === 'bottom' ? '-top-1.5 border-t-0 border-l-0' :
            step.position === 'left' ? '-right-1.5 border-r-0 border-t-0' :
            '-left-1.5 border-l-0 border-b-0'
          } ${
            step.position === 'top' || step.position === 'bottom' ? 'left-1/2 -translate-x-1/2' :
            'top-1/2 -translate-y-1/2'
          }`} />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <div className="text-xs text-gray-500">
                    Bước {currentStep + 1} / {steps.length}
                  </div>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {step.content}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    className="text-xs"
                  >
                    <ArrowLeft className="w-3 h-3 mr-1" />
                    Trước
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSkip}
                  className="text-xs text-gray-600"
                >
                  Bỏ qua
                </Button>
              </div>

              <Button
                size="sm"
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-xs"
              >
                {step.action ? step.action.text : (currentStep === steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo')}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Hook for managing onboarding state
export function useOnboarding() {
  const [isActive, setIsActive] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem('onboardingCompleted');
    if (completed) {
      setHasCompletedOnboarding(true);
    } else {
      // Start onboarding after 3 seconds for new users
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const completeOnboarding = () => {
    setIsActive(false);
    setHasCompletedOnboarding(true);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  const skipOnboarding = () => {
    setIsActive(false);
    setHasCompletedOnboarding(true);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboardingCompleted');
    setHasCompletedOnboarding(false);
    setIsActive(true);
  };

  return {
    isActive,
    hasCompletedOnboarding,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding
  };
}

// Predefined onboarding steps for different pages
export const homeOnboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    target: "[data-onboarding='header-logo']",
    title: "Chào mừng đến với STEP!",
    content: "Chúng tôi là công ty hàng đầu về giải pháp công nghệ thông tin tại Việt Nam. Hãy để chúng tôi hướng dẫn bạn khám phá các dịch vụ của chúng tôi.",
    position: "bottom"
  },
  {
    id: "services-menu",
    target: "[data-onboarding='services-menu']",
    title: "Khám Phá Dịch Vụ",
    content: "Nhấp vào đây để xem tất cả các dịch vụ của chúng tôi bao gồm Hosting, Cloud, Domain và nhiều hơn nữa.",
    position: "bottom",
    action: {
      text: "Mở Menu",
      onClick: () => {
        const menu = document.querySelector("[data-onboarding='services-menu']") as HTMLElement;
        menu?.click();
      }
    }
  },
  {
    id: "contact-form",
    target: "[data-onboarding='contact-button']",
    title: "Liên Hệ Tư Vấn",
    content: "Cần hỗ trợ? Nhấp vào đây để mở form liên hệ và nhận tư vấn miễn phí từ chuyên gia của chúng tôi.",
    position: "left"
  },
  {
    id: "blog-section",
    target: "[data-onboarding='blog-section']",
    title: "Tài Nguyên & Blog",
    content: "Khám phá các bài viết, hướng dẫn kỹ thuật và tin tức công nghệ mới nhất từ đội ngũ chuyên gia STEP.",
    position: "top"
  },
  {
    id: "personalization",
    target: "[data-onboarding='personalization-settings']",
    title: "Cá Nhân Hóa Trải Nghiệm",
    content: "Tùy chỉnh trải nghiệm của bạn bằng cách thiết lập sở thích và vai trò của bạn để nhận được gợi ý phù hợp nhất.",
    position: "left"
  }
];

export const hostingOnboardingSteps: OnboardingStep[] = [
  {
    id: "hosting-intro",
    target: "[data-onboarding='hosting-hero']",
    title: "Dịch Vụ Hosting Chuyên Nghiệp",
    content: "Khám phá các gói hosting được tối ưu hóa cho WordPress, Laravel và các ứng dụng web khác với hiệu suất cao và bảo mật tối ưu.",
    position: "bottom"
  },
  {
    id: "hosting-packages",
    target: "[data-onboarding='hosting-packages']",
    title: "Chọn Gói Hosting Phù Hợp",
    content: "So sánh các gói hosting và chọn gói phù hợp với nhu cầu và ngân sách của bạn. Tất cả gói đều có SSL miễn phí và hỗ trợ 24/7.",
    position: "top"
  },
  {
    id: "hosting-features",
    target: "[data-onboarding='hosting-features']",
    title: "Tính Năng Vượt Trội",
    content: "Tìm hiểu về các tính năng đặc biệt như SSD NVMe, LiteSpeed, tối ưu hóa cho framework và hỗ trợ kỹ thuật chuyên sâu.",
    position: "top"
  }
];