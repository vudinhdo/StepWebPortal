import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Server, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Clock,
  Users,
  Star,
  X,
  Code,
  Database,
  TrendingUp,
  Lock
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import PerformanceBenchmark from "@/components/performance-benchmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HostingWordPress() {
  const [showContactForm, setShowContactForm] = useState(false);
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
    currentSite: "",
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
      icon: Code,
      title: "Tối Ưu Cho WordPress",
      description: "Cài đặt một click qua Softaculous, hỗ trợ plugin/theme không giới hạn, cache tích hợp (LiteSpeed) để load site dưới 1 giây – lý tưởng cho người dùng CMS WordPress muốn tốc độ cao mà không cần tùy chỉnh phức tạp."
    },
    {
      icon: Shield,
      title: "Bảo Mật Nâng Cao", 
      description: "Firewall chuyên biệt chống hack WordPress (e.g., chống brute-force, malware scan tự động), SSL miễn phí, backup hàng ngày – bảo vệ dữ liệu website bạn khỏi rủi ro, đặc biệt cho SMEs quản lý nội dung động."
    },
    {
      icon: TrendingUp,
      title: "Hiệu Suất & Linh Hoạt",
      description: "Lưu trữ NVME SSD, băng thông không giới hạn, dễ scale khi traffic tăng (từ blog cá nhân đến e-commerce). Tích hợp với tên miền, Cloud hoặc Email – phù hợp developer/DevOps cần môi trường staging."
    },
    {
      icon: Users,
      title: "Tiết Kiệm Chi Phí",
      description: "Giá từ 100.000 VNĐ/tháng, không phí ẩn, hỗ trợ di chuyển site WordPress miễn phí từ host cũ. Hơn nữa, hỗ trợ 24/7 qua Zalo OA để giải quyết vấn đề nhanh chóng."
    }
  ];

  const packages = [
    {
      name: "Gói Cơ Bản",
      price: "100.000 VNĐ/tháng",
      storage: "Lưu trữ 5GB",
      features: "Cài đặt WP 1 click",
      suitable: "Blog cá nhân/startup WP",
      color: "blue"
    },
    {
      name: "Gói Nâng Cao",
      price: "200.000 VNĐ/tháng", 
      storage: "Lưu trữ 20GB",
      features: "Cache LiteSpeed + SSL",
      suitable: "SMEs với traffic trung bình",
      color: "green",
      popular: true
    },
    {
      name: "Gói Pro",
      price: "400.000 VNĐ/tháng",
      storage: "Lưu trữ 50GB", 
      features: "Bảo mật nâng cao + Staging",
      suitable: "E-commerce/developer WP chuyên sâu",
      color: "purple"
    }
  ];

  const testimonial = {
    text: "Hosting WP của STEP đã làm site WordPress tôi load siêu nhanh, không còn lo crash!",
    author: "Chị D., Blogger & IT Help Desk tại Hà Nội"
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Main form data:', formData);
    // Handle form submission
    setShowContactForm(false);
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Popup form data:', popupData);
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-blue-50/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[hsl(207,100%,40%)] rounded-lg flex items-center justify-center mr-4">
                  <Code className="text-white w-6 h-6" />
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  WordPress Chuyên Biệt
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Hosting WordPress Siêu Tốc – 
                <span className="text-[hsl(207,100%,40%)]"> Nâng Tầm Website CMS</span> 
                Của Bạn Chỉ Trong Phút Chốc!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Dịch vụ Hosting chuyên biệt cho WordPress, tối ưu tốc độ, bảo mật và dễ dàng cài đặt. 
                Dành riêng cho doanh nghiệp SMEs, blogger và developer sử dụng CMS WordPress – 
                giúp site load nhanh, an toàn mà không lo chi phí cao.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Kiểm Tra Hosting WordPress Phù Hợp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-[hsl(207,100%,40%)] text-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,40%)] hover:text-white px-8 py-4 text-lg"
                  onClick={() => setShowContactForm(true)}
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>
              
              <div className="flex items-center mt-8 text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Bắt đầu miễn phí hôm nay để trải nghiệm sự khác biệt!</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">WordPress Speed</span>
                    <span className="text-green-600 font-bold">&lt; 1s</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">Uptime</span>
                    <span className="text-green-600 font-bold">99.99%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-700">Security Score</span>
                    <span className="text-green-600 font-bold">A+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Lợi Ích Của Hosting WordPress Từ STEP
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Được thiết kế đặc biệt cho WordPress với các tính năng tối ưu hóa hiệu suất và bảo mật
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(207,100%,40%)] to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                  <benefit.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Bảng Gói Hosting WordPress
            </h2>
            <p className="text-xl text-gray-600">
              Chọn gói phù hợp với nhu cầu WordPress của bạn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow relative ${
                  pkg.popular ? 'ring-2 ring-[hsl(207,100%,40%)] scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[hsl(207,100%,40%)] text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Phổ Biến Nhất
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-[hsl(207,100%,40%)] mb-4">
                    Từ {pkg.price}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{pkg.storage}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{pkg.features}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>WordPress tối ưu</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Phù hợp:</strong> {pkg.suitable}
                  </p>
                </div>

                <Button 
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    setFormData({...formData, package: pkg.name});
                    setShowContactForm(true);
                  }}
                >
                  Chọn Gói & Di Chuyển Site Miễn Phí
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tại Sao Chọn Hosting WordPress Từ STEP?
            </h2>
          </motion.div>

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
                    Tích Hợp Hoàn Hảo Với CMS
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Được tối ưu hóa cho WordPress (hỗ trợ phiên bản mới nhất, plugin phổ biến như Yoast SEO/WooCommerce), 
                    kết nối mượt mà với dịch vụ khác như Cloud GPU hoặc Email Google Workspace – 
                    giúp bạn tập trung sáng tạo nội dung thay vì kỹ thuật.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
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
              className="bg-green-50 rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Cam Kết Của Chúng Tôi</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Di chuyển site miễn phí</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Dùng thử 30 ngày</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Hoàn tiền nếu không hài lòng</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Hạ tầng tại Hà Nội đảm bảo tốc độ ổn định</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-6">
                Chúng tôi hiểu nhu cầu của người dùng WordPress Việt Nam
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Benchmark Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <PerformanceBenchmark 
          selectedPlan="advanced"
          onPlanSelect={(plan) => {
            setFormData({...formData, package: plan});
            setShowContactForm(true);
          }}
        />
      </section>

      {/* CTA Form Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(207,100%,40%)] to-blue-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Bạn Sẵn Sàng Tối Ưu Website WordPress Của Mình?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nhận di chuyển site miễn phí + giảm 30% tháng đầu!
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
                  <Input
                    placeholder="URL Site Hiện Tại (tùy chọn)"
                    value={formData.currentSite}
                    onChange={(e) => setFormData({...formData, currentSite: e.target.value})}
                  />
                </div>

                <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gói Quan Tâm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Gói Cơ Bản</SelectItem>
                    <SelectItem value="advanced">Gói Nâng Cao</SelectItem>
                    <SelectItem value="pro">Gói Pro</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white"
                >
                  Gửi Yêu Cầu & Nhận Ưu Đãi Di Chuyển
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactForm open={showContactForm} onOpenChange={setShowContactForm} />

      {/* Email Popup */}
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
              <div className="w-12 h-12 bg-[hsl(207,100%,40%)] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nhận Khuyến Mãi Đặc Biệt & Khuyến Nghị Bảo Mật WordPress Miễn Phí!
              </h3>
              <p className="text-sm text-gray-600">
                Chỉ cần điền email để nhận mã giảm 40% cho Hosting WordPress đầu tiên, 
                kèm e-book "10 Mẹo Bảo Mật & Tối Ưu WordPress 2025"
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
                className="w-full bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]"
              >
                Nhận Ngay & Đăng Ký
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-3">
              Chỉ trong 24h! Hành động ngay để site bạn an toàn hơn!
            </p>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}