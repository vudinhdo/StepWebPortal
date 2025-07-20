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
  X
} from "lucide-react";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Hosting() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    email: "",
    name: "",
    phone: ""
  });

  // Show popup after 15 seconds or 50% scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 15000);

    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrolled > 50 && !showPopup) {
        setShowPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showPopup]);

  const benefits = [
    {
      icon: Zap,
      title: "Tốc Độ Vượt Trội",
      description: "Hosting NVME với SSD siêu nhanh, load website dưới 1 giây; lý tưởng cho DevOps cần hiệu suất cao mà không cần đầu tư server đắt đỏ."
    },
    {
      icon: Globe,
      title: "Dễ Dàng Tích Hợp", 
      description: "Tùy chỉnh cho WordPress/Laravel, tự động cài đặt CMS, kết nối với tên miền hoặc Cloud Server – phù hợp SMEs muốn nhanh chóng lên mạng."
    },
    {
      icon: Shield,
      title: "Bảo Mật & Ổn Định",
      description: "Firewall nâng cao, SSL miễn phí, backup hàng ngày, uptime 99.99%. Bảo vệ dữ liệu doanh nghiệp bạn khỏi tấn công."
    },
    {
      icon: Users,
      title: "Tiết Kiệm & Linh Hoạt",
      description: "Giá từ 100.000 VNĐ/tháng, scale dễ dàng với Reseller Hosting cho đại lý – hỗ trợ IT Manager quản lý đa website."
    }
  ];

  const pricingPlans = [
    {
      name: "Gói Cơ Bản",
      price: "100.000",
      description: "Hosting WordPress cơ bản",
      features: ["Lưu trữ 10GB", "SSL miễn phí", "Backup hàng ngày", "Support 24/7"],
      suitable: "Website nhỏ/startup",
      color: "orange"
    },
    {
      name: "Gói Nâng Cao", 
      price: "300.000",
      description: "Hosting Laravel/NVME",
      features: ["Lưu trữ 50GB", "SSL miễn phí", "SSD NVME", "CDN tích hợp", "Backup tự động"],
      suitable: "SMEs cần tốc độ cao",
      color: "blue",
      popular: true
    },
    {
      name: "Gói Reseller",
      price: "500.000", 
      description: "Reseller Hosting",
      features: ["Quản lý đa domain", "Bán lại linh hoạt", "WHM/cPanel", "White label"],
      suitable: "Đại lý/hosting reseller",
      color: "purple"
    }
  ];

  const testimonial = {
    text: "Hosting NVME của STEP đã tăng tốc website tôi gấp đôi, hỗ trợ nhanh chóng!",
    author: "Anh C., DevOps tại SMEs Thanh Xuân"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-blue-100 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-[hsl(207,100%,40%)]">Hosting Siêu Tốc</span> – Nền Tảng Website An Toàn Và Hiệu Quả Cho SMEs!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Cung cấp Hosting WordPress, Hosting Laravel, Hosting NVME và Reseller Hosting với tốc độ cao, bảo mật tối ưu. 
              Dễ dàng thiết lập, giá cạnh tranh – giúp doanh nghiệp bạn online mạnh mẽ mà không lo gián đoạn.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button 
                size="lg"
                className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white px-8 py-4 text-lg"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Tìm Gói Hosting Lý Tưởng
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lợi Ích Của Dịch Vụ Hosting Từ STEP
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[hsl(207,100%,40%)] transition-colors duration-300">
                  <benefit.icon className="h-8 w-8 text-[hsl(207,100%,40%)] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bảng Gói Dịch Vụ Hosting
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-lg p-8 relative ${plan.popular ? 'border-2 border-[hsl(207,100%,40%)] transform scale-105' : 'border border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[hsl(207,100%,40%)] text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[hsl(207,100%,40%)]">{plan.price.toLocaleString()}</span>
                    <span className="text-gray-600"> VNĐ/tháng</span>
                  </div>
                  <p className="text-sm text-gray-500">Phù hợp: {plan.suitable}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                  onClick={() => setShowContactForm(true)}
                >
                  Chọn Gói & Nhận Ưu Đãi
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose STEP Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn Dịch Vụ Hosting Từ STEP?
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tích Hợp Toàn Diện</h3>
              <p className="text-gray-600">
                Kết nối mượt mà với dịch vụ khác như Email Microsoft 365 hoặc Máy chủ Thuê, 
                giúp doanh nghiệp bạn vận hành liền mạch từ A-Z.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-xl p-8"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">5.0/5</span>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "{testimonial.text}"
              </blockquote>
              <cite className="text-sm text-gray-600">– {testimonial.author}</cite>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-purple-50 rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cam Kết</h3>
              <p className="text-gray-600 mb-4">
                Dùng thử miễn phí 14 ngày, hoàn tiền nếu không hài lòng. 
                Chúng tôi tập trung vào hạ tầng Việt Nam, an toàn và tối ưu cho doanh nghiệp địa phương.
              </p>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Dùng thử 14 ngày miễn phí</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[hsl(207,100%,40%)] to-blue-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Sẵn Sàng Tăng Tốc Website Của Bạn Với Hosting STEP?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nhận báo giá cá nhân hóa và giảm 25% tháng đầu!
            </p>
            
            <Button 
              size="lg"
              className="bg-white text-[hsl(207,100%,40%)] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => setShowContactForm(true)}
            >
              Gửi Yêu Cầu & Nhận Báo Giá
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactForm open={showContactForm} onOpenChange={setShowContactForm} />

      {/* Email Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full relative"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Nhận Khuyến Mãi Đặc Biệt!
              </h3>
              <p className="text-gray-600">
                Nhận mã giảm 30% cho Hosting NVME đầu tiên, kèm e-book "5 Mẹo Bảo Mật Website 2025"
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email của bạn *"
                  value={popupData.email}
                  onChange={(e) => setPopupData({...popupData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Tên của bạn (tùy chọn)"
                  value={popupData.name}
                  onChange={(e) => setPopupData({...popupData, name: e.target.value})}
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Số điện thoại (tùy chọn)"
                  value={popupData.phone}
                  onChange={(e) => setPopupData({...popupData, phone: e.target.value})}
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle popup form submission
                  console.log('Popup form data:', popupData);
                  setShowPopup(false);
                }}
              >
                Nhận Ngay & Đăng Ký
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Chỉ trong 48h! Đừng bỏ lỡ cơ hội này.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}