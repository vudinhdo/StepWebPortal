import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerformanceBenchmark from "@/components/performance-benchmark";
import EmailPopup from "@/components/email-popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  DollarSign,
  Globe,
  Settings,
  HeadphonesIcon,
  TrendingUp,
  X,
  Lock
} from "lucide-react";

export default function HostingReseller() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    email: "",
    name: "",
    phone: ""
  });

  const handleEmailSubmit = async (email: string) => {
    console.log('Email submitted for Reseller hosting:', email);
    // Integration with email service would go here
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    expectedClients: "",
    package: ""
  });

  // Show popup after 10 seconds or 50% scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50) {
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
      description: "Kiếm 40-60% commission từ mỗi khách hàng, với mô hình recurring revenue hàng tháng. Lý tưởng cho freelancers, agencies, và doanh nghiệp muốn tạo thêm nguồn thu nhập từ dịch vụ hosting."
    },
    {
      icon: Globe,
      title: "Thương Hiệu Riêng & White-Label",
      description: "Sử dụng domain và branding riêng, control panel tùy chỉnh hoàn toàn. Khách hàng sẽ thấy thương hiệu của bạn thay vì STEP – giúp xây dựng uy tín và khách hàng trung thành lâu dài."
    },
    {
      icon: Users,
      title: "Quản Lý Khách Hàng Dễ Dàng",
      description: "Dashboard reseller chuyên nghiệp để tạo/quản lý hosting accounts, theo dõi usage, billing tự động, và hỗ trợ khách hàng. Không cần kinh nghiệm kỹ thuật sâu để vận hành."
    },
    {
      icon: HeadphonesIcon,
      title: "Hỗ Trợ 24/7 & Training",
      description: "STEP support team hỗ trợ kỹ thuật cho khách hàng của bạn, kèm training và materials để bạn bán hosting hiệu quả. Bạn focus vào marketing, chúng tôi lo phần kỹ thuật."
    }
  ];

  const plans = [
    {
      name: "Starter Reseller",
      price: "500.000",
      originalPrice: "750.000",
      discount: "33%",
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
    author: "Nguyễn Minh Tâm - Digital Agency Owner"
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would integrate with your backend/CRM
    alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24h để setup reseller account.');
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Popup submitted:', popupData);
    setShowPopup(false);
    // Here you would integrate with your email service
    alert('Cảm ơn! Mã giảm giá và hướng dẫn kinh doanh đã được gửi qua email.');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Bắt Đầu Kinh Doanh <span className="text-purple-600">Hosting</span> Ngay Hôm Nay
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Trở thành đối tác reseller với STEP và tạo thu nhập thụ động ổn định. 
              Hoa hồng lên đến 60%, thương hiệu riêng, và hỗ trợ 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => window.location.href = '/contact'}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8"
              >
                Đăng Ký Reseller Ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Xem Bảng Giá
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">Reseller Partners</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime Guarantee</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">60%</div>
                <div className="text-gray-600">Commission tối đa</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn STEP Reseller Hosting?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chương trình reseller được thiết kế để giúp bạn thành công trong kinh doanh hosting
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Chọn Gói Reseller Phù Hợp
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Các gói reseller với mức hoa hồng hấp dẫn và tính năng đầy đủ
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-purple-500 relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Phổ Biến Nhất
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price.toLocaleString()}</span>
                      <span className="text-gray-600">.000 VNĐ/tháng</span>
                    </div>
                    <div className="text-sm text-gray-500 line-through mb-2">
                      {plan.originalPrice.toLocaleString()}.000 VNĐ/tháng
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      Tiết kiệm {plan.discount}
                    </div>
                    <div className="mt-4 text-purple-600 font-semibold">
                      Hoa hồng: {plan.commission}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => {
                      setFormData({...formData, package: plan.name});
                      window.location.href = '/contact';
                    }}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    Chọn Gói {plan.name}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmark Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <PerformanceBenchmark 
          selectedPlan="advanced"
          onPlanSelect={(plan) => {
            setFormData({...formData, package: plan});
            window.location.href = '/contact';
          }}
        />
      </section>

      {/* Testimonial & Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Kinh Doanh Hosting Hiệu Quả
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Với chương trình reseller của STEP, bạn có thể bắt đầu kinh doanh hosting 
                    ngay lập tức với đầu tư tối thiểu. Được hỗ trợ đầy đủ về kỹ thuật và marketing.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">5.0/5</span>
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <cite className="text-sm text-gray-600">– {testimonial.author}</cite>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Cam Kết Của Chúng Tôi</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Setup reseller miễn phí</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Training và marketing materials</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Hỗ trợ kỹ thuật 24/7</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Thanh toán hoa hồng đúng hạn</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-6">
                Hơn 500 reseller partners đang tin tưởng STEP
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Sẵn Sàng Bắt Đầu Kinh Doanh Hosting?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Đăng ký reseller ngay hôm nay và nhận hỗ trợ setup miễn phí!
            </p>

            <div className="bg-white rounded-xl p-8 text-gray-900 max-w-2xl mx-auto">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Tên của bạn *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="tel"
                    placeholder="Số điện thoại *"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                  <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gói Quan Tâm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter Reseller</SelectItem>
                      <SelectItem value="business">Business Reseller</SelectItem>
                      <SelectItem value="enterprise">Enterprise Reseller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Loại hình kinh doanh"
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                  />
                  <Select value={formData.expectedClients} onValueChange={(value) => setFormData({...formData, expectedClients: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Dự kiến số khách hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 khách hàng</SelectItem>
                      <SelectItem value="10-50">10-50 khách hàng</SelectItem>
                      <SelectItem value="50+">50+ khách hàng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Đăng Ký Reseller & Nhận Setup Miễn Phí
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popup matching WordPress style */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 shadow-2xl border border-gray-200 relative"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nhận Khuyến Mãi Đặc Biệt & Hướng Dẫn Kinh Doanh Hosting Miễn Phí!
              </h3>
              <p className="text-sm text-gray-600">
                Chỉ cần điền email để nhận mã giảm 25% cho gói Reseller đầu tiên, 
                kèm e-book "10 Bí Quyết Kinh Doanh Hosting Thành Công 2025"
              </p>
            </div>

            <form onSubmit={handlePopupSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Email của bạn *"
                value={popupData.email}
                onChange={(e) => setPopupData({...popupData, email: e.target.value})}
                required
              />
              <Input
                placeholder="Tên (tùy chọn)"
                value={popupData.name}
                onChange={(e) => setPopupData({...popupData, name: e.target.value})}
              />
              <Input
                type="tel"
                placeholder="Số điện thoại (tùy chọn)"
                value={popupData.phone}
                onChange={(e) => setPopupData({...popupData, phone: e.target.value})}
              />
              <Button 
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                Nhận Ngay & Đăng Ký
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-3">
              Chỉ trong 24h! Bắt đầu kinh doanh hosting ngay hôm nay!
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Contact Form Modal */}

      {/* Email Popup - Show after 15 seconds */}
      <EmailPopup
        title="💼 Ưu Đãi Reseller Hosting!"
        description="Đăng ký email để nhận mã giảm giá 25% gói reseller + e-book kinh doanh hosting miễn phí!"
        buttonText="Nhận Mã Giảm Giá"
        onSubmit={handleEmailSubmit}
        delay={15000}
      />

      <Footer />
    </div>
  );
}