import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerformanceBenchmark from "@/components/performance-benchmark";
import EmailPopup from "@/components/email-popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  DollarSign,
  Globe,
  HeadphonesIcon,
  TrendingUp,
  X,
  Wallet,
  Clock,
  Award,
  Building2,
  Sparkles,
  Percent,
  Gift,
  ChevronRight
} from "lucide-react";

export default function HostingReseller() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    email: "",
    name: "",
    phone: ""
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    expectedClients: "",
    package: ""
  });

  const [formStep, setFormStep] = useState(1);
  const totalSteps = 2;

  useEffect(() => {
    const timer = setTimeout(() => {
      const popupShown = localStorage.getItem('reseller-popup-dismissed');
      if (!popupShown) {
        setShowPopup(true);
      }
    }, 15000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const popupShown = localStorage.getItem('reseller-popup-dismissed');
      if (scrollPercent >= 60 && !popupShown) {
        setShowPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const benefits = [
    {
      icon: DollarSign,
      title: "Thu Nhập Thụ Động Ổn Định",
      description: "Kiếm 40-60% commission từ mỗi khách hàng, với mô hình recurring revenue hàng tháng. Lý tưởng cho freelancers, agencies, và doanh nghiệp muốn tạo thêm nguồn thu nhập từ dịch vụ hosting.",
      highlight: "40-60%",
      highlightLabel: "Hoa hồng"
    },
    {
      icon: Globe,
      title: "Thương Hiệu Riêng & White-Label",
      description: "Sử dụng domain và branding riêng, control panel tùy chỉnh hoàn toàn. Khách hàng sẽ thấy thương hiệu của bạn thay vì STEP – giúp xây dựng uy tín và khách hàng trung thành lâu dài.",
      highlight: "100%",
      highlightLabel: "White-Label"
    },
    {
      icon: Users,
      title: "Quản Lý Khách Hàng Dễ Dàng",
      description: "Dashboard reseller chuyên nghiệp để tạo/quản lý hosting accounts, theo dõi usage, billing tự động, và hỗ trợ khách hàng. Không cần kinh nghiệm kỹ thuật sâu để vận hành.",
      highlight: "Unlimited",
      highlightLabel: "Accounts"
    },
    {
      icon: HeadphonesIcon,
      title: "Hỗ Trợ 24/7 & Training",
      description: "STEP support team hỗ trợ kỹ thuật cho khách hàng của bạn, kèm training và materials để bạn bán hosting hiệu quả. Bạn focus vào marketing, chúng tôi lo phần kỹ thuật.",
      highlight: "24/7",
      highlightLabel: "Hỗ trợ"
    }
  ];

  const plans = [
    {
      name: "Starter Reseller",
      price: "500.000",
      originalPrice: "750.000",
      discount: "33%",
      savings: "250.000",
      features: [
        "20 GB SSD Storage",
        "10 cPanel Accounts",
        "Unlimited Bandwidth",
        "Free SSL Certificates",
        "White-Label Branding",
        "24/7 Technical Support",
        "Reseller Control Panel (WHM)",
        "Free Website Migration"
      ],
      popular: false,
      commission: "40%"
    },
    {
      name: "Business Reseller",
      price: "1.200.000",
      originalPrice: "1.800.000", 
      discount: "33%",
      savings: "600.000",
      features: [
        "50 GB NVME SSD Storage",
        "25 cPanel Accounts",
        "Unlimited Bandwidth", 
        "Free SSL Certificates",
        "White-Label Branding",
        "Priority Support 24/7",
        "Advanced Reseller Tools",
        "Free Domain Registration",
        "Marketing Materials",
        "Billing Integration"
      ],
      popular: true,
      commission: "50%"
    },
    {
      name: "Enterprise Reseller", 
      price: "2.500.000",
      originalPrice: "3.500.000",
      discount: "29%",
      savings: "1.000.000",
      features: [
        "100 GB NVME SSD Storage",
        "Unlimited cPanel Accounts",
        "Unlimited Bandwidth",
        "Free SSL Certificates", 
        "Complete White-Label",
        "Dedicated Account Manager",
        "API Integration",
        "Custom Pricing Control",
        "Advanced Analytics",
        "Revenue Sharing Program"
      ],
      popular: false,
      commission: "60%"
    }
  ];

  const testimonial = {
    text: "Từ khi làm reseller với STEP, thu nhập thụ động của tôi tăng 300%. Support team rất chuyên nghiệp, khách hàng luôn hài lòng với chất lượng hosting.",
    author: "Nguyễn Minh Tâm",
    role: "Digital Agency Owner",
    company: "TechViet Solutions",
    revenue: "25M VNĐ/tháng"
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep < totalSteps) {
      setFormStep(formStep + 1);
      return;
    }
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24h để setup reseller account.');
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Popup submitted:', popupData);
    localStorage.setItem('reseller-popup-dismissed', 'true');
    setShowPopup(false);
    alert('Cảm ơn! Mã giảm giá và hướng dẫn kinh doanh đã được gửi qua email.');
  };

  const closePopup = () => {
    localStorage.setItem('reseller-popup-dismissed', 'true');
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen" data-testid="page-hosting-reseller">
      <Header />
      
      {/* Hero Section - Business/Money focused */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden" data-testid="section-hero">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Commission Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-6 sm:mb-8 shadow-lg"
              data-testid="badge-commission-hero"
            >
              <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Hoa Hồng Lên Đến 60% Mỗi Tháng</span>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Xây Dựng <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Thu Nhập Thụ Động</span>
              <br className="hidden sm:block" />
              <span className="block mt-2">Từ Kinh Doanh Hosting</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-2">
              Trở thành đối tác reseller với STEP – Kiếm tiền online ổn định mỗi tháng. 
              Thương hiệu riêng của bạn, hỗ trợ kỹ thuật từ chúng tôi.
            </p>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-8 sm:mb-10" data-testid="hero-stats">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20"
                data-testid="stat-commission"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-1">40-60%</div>
                <div className="text-xs sm:text-sm text-purple-200">Commission</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20"
                data-testid="stat-partners"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
                <div className="text-xs sm:text-sm text-purple-200">Partners</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20"
                data-testid="stat-uptime"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mb-1">99.9%</div>
                <div className="text-xs sm:text-sm text-purple-200">Uptime</div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12 px-4">
              <Button
                onClick={() => window.location.href = '/contact'}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold px-6 sm:px-10 py-5 sm:py-6 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                data-testid="button-register-reseller"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Bắt Đầu Kiếm Tiền Ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/50 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg backdrop-blur-sm"
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-view-plans"
              >
                Xem Bảng Giá & Hoa Hồng
              </Button>
            </div>

            {/* Mini Testimonial Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto border border-white/20"
              data-testid="testimonial-preview"
            >
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/90 italic mb-3 text-sm sm:text-base">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#8B5CF6] to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  NT
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm sm:text-base">{testimonial.author}</div>
                  <div className="text-purple-200 text-xs sm:text-sm">{testimonial.role} • <span className="text-yellow-400">{testimonial.revenue}</span></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Redesigned */}
      <section className="py-16 sm:py-20 px-4 bg-gray-50" data-testid="section-benefits">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-[#8B5CF6]/10 text-[#8B5CF6] mb-4 px-4 py-1.5 text-sm" data-testid="badge-benefits">
              <TrendingUp className="h-4 w-4 mr-2" />
              Cơ Hội Kinh Doanh
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn STEP <span className="text-[#8B5CF6]">Reseller Hosting</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Chương trình reseller được thiết kế để giúp bạn thành công trong kinh doanh hosting
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                data-testid={`benefit-card-${index}`}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 sm:block">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8B5CF6] to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      {/* Mobile highlight badge */}
                      <div className="sm:hidden bg-[#8B5CF6]/10 rounded-xl p-2 text-center">
                        <div className="text-xl font-bold text-[#8B5CF6]">{benefit.highlight}</div>
                        <div className="text-xs text-gray-500">{benefit.highlightLabel}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {benefit.title}
                        </h3>
                        {/* Desktop highlight badge */}
                        <div className="hidden sm:block bg-[#8B5CF6]/10 rounded-xl px-4 py-2 text-center ml-4 flex-shrink-0">
                          <div className="text-2xl font-bold text-[#8B5CF6]">{benefit.highlight}</div>
                          <div className="text-xs text-gray-500">{benefit.highlightLabel}</div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-[#8B5CF6] to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans - Enhanced Design */}
      <section id="plans" className="py-16 sm:py-20 px-4 bg-white" data-testid="section-pricing">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-green-100 text-green-700 mb-4 px-4 py-1.5 text-sm" data-testid="badge-pricing">
              <Gift className="h-4 w-4 mr-2" />
              Giảm Đến 33%
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Chọn Gói Reseller <span className="text-[#8B5CF6]">Phù Hợp</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Các gói reseller với mức hoa hồng hấp dẫn và tính năng đầy đủ
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl transition-all duration-300 ${
                  plan.popular 
                    ? 'ring-4 ring-[#8B5CF6] shadow-2xl shadow-purple-200/50 scale-[1.02] lg:scale-105' 
                    : 'shadow-lg hover:shadow-xl border border-gray-100'
                }`}
                data-testid={`plan-card-${plan.name.toLowerCase().replace(' ', '-')}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-[#8B5CF6] to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current" />
                      Phổ Biến Nhất
                    </span>
                  </div>
                )}

                {/* Commission Badge - Prominent */}
                <div className="absolute -right-2 top-6 sm:-right-3 sm:top-8 z-10">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900 py-2 px-3 sm:px-4 rounded-l-xl shadow-lg">
                    <div className="text-lg sm:text-xl font-bold">{plan.commission}</div>
                    <div className="text-xs">Hoa hồng</div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-6 sm:mb-8 pt-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    
                    {/* Discount Badge */}
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      <Percent className="h-4 w-4" />
                      Giảm {plan.discount}
                    </div>
                    
                    {/* Pricing */}
                    <div className="mb-2">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 text-sm sm:text-base"> VNĐ/tháng</span>
                    </div>
                    <div className="text-sm text-gray-400 line-through mb-2">
                      {plan.originalPrice} VNĐ/tháng
                    </div>
                    
                    {/* Savings */}
                    <div className="inline-flex items-center gap-1 text-green-600 font-medium text-sm">
                      <CheckCircle className="h-4 w-4" />
                      Tiết kiệm {plan.savings} VNĐ/tháng
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => {
                      setFormData({...formData, package: plan.name});
                      window.location.href = '/contact';
                    }}
                    className={`w-full py-5 sm:py-6 text-base font-semibold ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-purple-600 hover:from-[#7C3AED] hover:to-purple-700 shadow-lg' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    data-testid={`button-select-${plan.name.toLowerCase().replace(' ', '-')}`}
                  >
                    Chọn {plan.name}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmark Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50" data-testid="section-performance">
        <PerformanceBenchmark 
          selectedPlan="advanced"
          onPlanSelect={(plan) => {
            setFormData({...formData, package: plan});
            window.location.href = '/contact';
          }}
        />
      </section>

      {/* Enhanced Testimonial Section */}
      <section className="py-16 sm:py-20 px-4 bg-white" data-testid="section-testimonial">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-[#8B5CF6]/10 text-[#8B5CF6] mb-4 px-4 py-1.5 text-sm" data-testid="badge-success-story">
                <Award className="h-4 w-4 mr-2" />
                Câu Chuyện Thành Công
              </Badge>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Kinh Doanh Hosting <span className="text-[#8B5CF6]">Hiệu Quả</span>
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-lg">
                Với chương trình reseller của STEP, bạn có thể bắt đầu kinh doanh hosting 
                ngay lập tức với đầu tư tối thiểu. Được hỗ trợ đầy đủ về kỹ thuật và marketing.
              </p>

              {/* Enhanced Testimonial Card */}
              <div className="bg-gradient-to-br from-[#8B5CF6]/5 to-purple-100/50 p-6 sm:p-8 rounded-2xl border border-[#8B5CF6]/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 font-medium">5.0/5</span>
                </div>
                
                <blockquote className="text-gray-700 text-base sm:text-lg italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  {/* Company Logo Placeholder */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8B5CF6] to-purple-700 rounded-2xl flex items-center justify-center shadow-lg" data-testid="company-logo-placeholder">
                    <Building2 className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-base sm:text-lg">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-[#8B5CF6] font-semibold text-sm">{testimonial.company}</div>
                  </div>
                </div>
                
                {/* Revenue highlight */}
                <div className="mt-6 pt-6 border-t border-[#8B5CF6]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Thu nhập hiện tại</div>
                      <div className="text-xl font-bold text-green-600">{testimonial.revenue}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#8B5CF6] to-purple-700 rounded-2xl p-6 sm:p-8 text-white"
              data-testid="commitments-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Cam Kết Của Chúng Tôi</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: Gift, text: "Setup reseller miễn phí" },
                  { icon: Award, text: "Training và marketing materials" },
                  { icon: HeadphonesIcon, text: "Hỗ trợ kỹ thuật 24/7" },
                  { icon: DollarSign, text: "Thanh toán hoa hồng đúng hạn" },
                  { icon: Zap, text: "Uptime đảm bảo 99.9%" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white/90">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="h-5 w-5" />
                  <span>Hơn <strong className="text-white">500 reseller partners</strong> đang tin tưởng STEP</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Simplified with Progress */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#8B5CF6] to-purple-800" data-testid="section-contact-form">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <Badge className="bg-white/20 text-white mb-4 px-4 py-1.5 text-sm" data-testid="badge-form-cta">
              <Sparkles className="h-4 w-4 mr-2" />
              Setup Miễn Phí
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Sẵn Sàng Bắt Đầu <span className="text-yellow-300">Kinh Doanh</span>?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-purple-100">
              Đăng ký reseller ngay hôm nay và nhận hỗ trợ setup miễn phí!
            </p>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-gray-900 shadow-2xl">
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">Bước {formStep} / {totalSteps}</span>
                  <span className="text-sm text-[#8B5CF6] font-medium">
                    {formStep === 1 ? 'Thông tin cá nhân' : 'Thông tin kinh doanh'}
                  </span>
                </div>
                <Progress value={(formStep / totalSteps) * 100} className="h-2 bg-gray-200" data-testid="form-progress" />
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5" data-testid="form-reseller-registration">
                {formStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-left mb-4">Thông tin liên hệ</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="text-left">
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Họ và tên *</label>
                        <Input
                          placeholder="Nhập họ và tên"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          className="py-5"
                          data-testid="input-name"
                        />
                      </div>
                      <div className="text-left">
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email *</label>
                        <Input
                          type="email"
                          placeholder="email@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          className="py-5"
                          data-testid="input-email"
                        />
                      </div>
                    </div>
                    <div className="text-left">
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Số điện thoại *</label>
                      <Input
                        type="tel"
                        placeholder="0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                        className="py-5"
                        data-testid="input-phone"
                      />
                    </div>
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-left mb-4">Thông tin kinh doanh</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="text-left">
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Loại hình kinh doanh</label>
                        <Input
                          placeholder="VD: Digital Agency, Freelancer..."
                          value={formData.businessType}
                          onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                          className="py-5"
                          data-testid="input-business-type"
                        />
                      </div>
                      <div className="text-left">
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Gói quan tâm</label>
                        <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
                          <SelectTrigger className="py-5" data-testid="select-package">
                            <SelectValue placeholder="Chọn gói Reseller" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="starter">Starter Reseller - 40% hoa hồng</SelectItem>
                            <SelectItem value="business">Business Reseller - 50% hoa hồng</SelectItem>
                            <SelectItem value="enterprise">Enterprise Reseller - 60% hoa hồng</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="text-left">
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Dự kiến số khách hàng</label>
                      <Select value={formData.expectedClients} onValueChange={(value) => setFormData({...formData, expectedClients: value})}>
                        <SelectTrigger className="py-5" data-testid="select-expected-clients">
                          <SelectValue placeholder="Chọn quy mô dự kiến" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 khách hàng</SelectItem>
                          <SelectItem value="10-50">10-50 khách hàng</SelectItem>
                          <SelectItem value="50+">50+ khách hàng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  {formStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormStep(formStep - 1)}
                      className="flex-1 py-5 border-2"
                      data-testid="button-form-back"
                    >
                      Quay lại
                    </Button>
                  )}
                  <Button 
                    type="submit"
                    size="lg"
                    className={`${formStep === 1 ? 'w-full' : 'flex-1'} bg-gradient-to-r from-[#8B5CF6] to-purple-600 hover:from-[#7C3AED] hover:to-purple-700 text-white py-5 text-base font-semibold shadow-lg`}
                    data-testid="button-form-submit"
                  >
                    {formStep < totalSteps ? (
                      <>
                        Tiếp theo
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Đăng Ký & Nhận Setup Miễn Phí
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Improved Popup - Less intrusive, better design */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && closePopup()}
            data-testid="popup-overlay"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full relative overflow-hidden"
              data-testid="popup-content"
            >
              {/* Purple gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8B5CF6] to-purple-600" />
              
              {/* Close button - More visible */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                data-testid="button-popup-close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6 pt-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Gift className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Ưu Đãi Đặc Biệt Cho Reseller!
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Nhận mã giảm <span className="font-bold text-[#8B5CF6]">25%</span> cho gói Reseller đầu tiên + 
                  E-book "10 Bí Quyết Kinh Doanh Hosting 2025"
                </p>
              </div>

              <form onSubmit={handlePopupSubmit} className="space-y-4" data-testid="form-popup">
                <div>
                  <Input
                    type="email"
                    placeholder="Email của bạn *"
                    value={popupData.email}
                    onChange={(e) => setPopupData({...popupData, email: e.target.value})}
                    required
                    className="py-5 border-2 border-gray-200 focus:border-[#8B5CF6]"
                    data-testid="input-popup-email"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Tên (tùy chọn)"
                    value={popupData.name}
                    onChange={(e) => setPopupData({...popupData, name: e.target.value})}
                    className="py-5 border-2 border-gray-200"
                    data-testid="input-popup-name"
                  />
                  <Input
                    type="tel"
                    placeholder="SĐT (tùy chọn)"
                    value={popupData.phone}
                    onChange={(e) => setPopupData({...popupData, phone: e.target.value})}
                    className="py-5 border-2 border-gray-200"
                    data-testid="input-popup-phone"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#8B5CF6] to-purple-600 hover:from-[#7C3AED] hover:to-purple-700 py-5 text-base font-semibold shadow-lg"
                  data-testid="button-popup-submit"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  Nhận Ưu Đãi Ngay
                </Button>
              </form>

              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Ưu đãi có hiệu lực trong 24h</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Popup - Show after 15 seconds */}
      <EmailPopup
        discount="25%"
        title="💼 Ưu Đãi Reseller Hosting!"
        description="Đăng ký email để nhận mã giảm giá 25% gói reseller + e-book kinh doanh hosting miễn phí!"
        buttonText="Nhận Mã Giảm Giá"
        storageKey="reseller-popup-shown"
      />

      <Footer />
    </div>
  );
}
