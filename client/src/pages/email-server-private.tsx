import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Shield, 
  Server, 
  Users, 
  Check, 
  X, 
  Star,
  ArrowRight,
  Clock,
  Globe,
  Lock,
  Zap,
  HardDrive,
  Smartphone,
  Building
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Email popup component
const EmailPopup = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Email Server Subscriber',
          email,
          phone: phone || '',
          company: '',
          service: 'Email Server Riêng - Popup',
          message: 'Đăng ký nhận khuyến mãi 20% Email Server và e-book bảo mật email'
        })
      });

      if (response.ok) {
        toast({
          title: "Đăng ký thành công!",
          description: "Bạn sẽ nhận được mã giảm giá 20% và e-book bảo mật email trong 5 phút.",
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: 100 }}
        className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 relative border-2 border-[hsl(207,100%,40%)]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[hsl(207,100%,40%)] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="text-white" size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Nhận Khuyến Mãi Đặc Biệt & Khuyến Nghị Bảo Mật Email Miễn Phí!
          </h3>
          <p className="text-xs text-gray-600">
            Chỉ cần điền email để nhận mã <strong className="text-[hsl(207,100%,40%)]">giảm 20%</strong> cho Email Server đầu tiên, 
            kèm e-book <strong>"Top 5 Mẹo Bảo Mật Email Doanh Nghiệp 2025"</strong>
          </p>
          <div className="bg-red-50 text-red-600 text-xs font-semibold py-1 px-2 rounded-full inline-block mt-2">
            ⏰ Chỉ trong 24h!
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input
              type="email"
              placeholder="Email của bạn *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Tên (tùy chọn)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Số điện thoại (tùy chọn)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[hsl(207,100%,40%)] to-blue-600 hover:from-blue-600 hover:to-[hsl(207,100%,40%)] text-white font-semibold text-sm"
          >
            Nhận Ngay & Đăng Ký
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-3">
          Chúng tôi cam kết bảo mật thông tin và không gửi spam
        </p>
      </motion.div>
    </div>
  );
};

export default function EmailServerPrivate() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    userCount: '',
    package: ''
  });
  const { toast } = useToast();

  // Show popup after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('emailServerPrivatePopupSeen');
      if (!hasSeenPopup) {
        setShowPopup(true);
        localStorage.setItem('emailServerPrivatePopupSeen', 'true');
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: `Email Server Riêng - ${formData.package}`,
          message: `Tên công ty: ${formData.company}\nSố user dự kiến: ${formData.userCount}\nGói quan tâm: ${formData.package}\nYêu cầu thiết lập Email Server riêng và báo giá cá nhân hóa`
        })
      });

      if (response.ok) {
        toast({
          title: "Gửi yêu cầu thành công!",
          description: "Chúng tôi sẽ liên hệ với bạn trong 24h để tư vấn và thiết lập miễn phí.",
        });
        setFormData({ name: '', email: '', phone: '', company: '', userCount: '', package: '' });
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const packages = [
    {
      name: "Gói Cơ Bản",
      price: "200.000 VNĐ/tháng",
      features: [
        "5GB/user",
        "Anti-spam cơ bản",
        "Webmail interface",
        "POP3/IMAP support",
        "SSL encryption",
        "Hỗ trợ 8x5"
      ],
      suitable: "Công ty nhỏ/startup",
      color: "orange"
    },
    {
      name: "Gói Nâng Cao",
      price: "500.000 VNĐ/tháng",
      features: [
        "20GB/user",
        "Encryption + Backup",
        "Advanced anti-spam",
        "Mobile sync",
        "Calendar integration",
        "Hỗ trợ 24/7"
      ],
      suitable: "SMEs với email hàng ngày",
      color: "blue",
      popular: true
    },
    {
      name: "Gói Doanh Nghiệp",
      price: "1.000.000 VNĐ/tháng",
      features: [
        "Không giới hạn/user",
        "Tích hợp hybrid + Priority Support",
        "Custom domain rules",
        "CRM integration",
        "Advanced security",
        "Dedicated support"
      ],
      suitable: "Doanh nghiệp lớn cần tùy chỉnh cao",
      color: "purple"
    }
  ];

  const benefits = [
    {
      icon: Building,
      title: "Xây Dựng Thương Hiệu Chuyên Nghiệp",
      description: "Sử dụng email tùy chỉnh @tencongty.vn, tăng uy tín với khách hàng và đối tác – phù hợp SMEs muốn tạo ấn tượng mạnh mẽ thay vì dùng Gmail/Yahoo miễn phí."
    },
    {
      icon: Shield,
      title: "Bảo Mật Và Kiểm Soát Dữ Liệu",
      description: "Server riêng với firewall, anti-spam, encryption SSL/TLS, và backup hàng ngày – đảm bảo dữ liệu email an toàn, tuân thủ GDPR/Việt Nam data laws, tránh rò rỉ thông tin quan trọng."
    },
    {
      icon: HardDrive,
      title: "Dung Lượng Lớn & Linh Hoạt",
      description: "Không giới hạn attachment, tích hợp với Outlook/Thunderbird, hỗ trợ di động – dễ quản lý cho đội ngũ lớn, với tùy chỉnh domain/subdomain."
    },
    {
      icon: Smartphone,
      title: "Hỗ Trợ & Tích Hợp",
      description: "Tích hợp với Google Workspace/Microsoft 365 nếu cần hybrid, hỗ trợ 24/7 qua Zalo OA – giúp IT Manager thiết lập nhanh, không lo downtime."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(207,100%,40%)] to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Email Server Riêng
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Giải Pháp Email Doanh Nghiệp An Toàn, Chuyên Nghiệp Và Linh Hoạt!
            </p>
            <p className="text-lg mb-8 max-w-4xl mx-auto opacity-80">
              Dịch vụ Email Server dành riêng cho công ty bạn, với dung lượng lớn, bảo mật cao và tùy chỉnh đầy đủ. 
              Lý tưởng cho doanh nghiệp cần email @tencongty.com để xây dựng thương hiệu, tránh gián đoạn và kiểm soát 
              dữ liệu hoàn toàn.
            </p>
            <Button 
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg" 
              className="bg-white text-[hsl(207,100%,40%)] hover:bg-gray-100 font-semibold text-lg px-8 py-4"
            >
              Khám Phá Gói Email Server Phù Hợp
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Lợi Ích Của Email Server Riêng Từ STEP
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
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[hsl(207,100%,40%)] to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {benefit.title}  
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Bảng Gói Dịch Vụ Email Server Riêng
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all relative ${
                  pkg.popular ? 'ring-2 ring-[hsl(207,100%,40%)] scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[hsl(207,100%,40%)] text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Phổ Biến Nhất
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-[hsl(207,100%,40%)] mb-2">{pkg.price}</div>
                  <p className="text-gray-600 text-sm">{pkg.suitable}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Check className="text-green-500 mr-2 flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, package: pkg.name }));
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-[hsl(207,100%,40%)] hover:bg-blue-700' 
                      : 'bg-gray-700 hover:bg-gray-800'
                  } text-white font-semibold`}
                >
                  Chọn Gói & Thiết Lập Miễn Phí
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose STEP Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Tại Sao Chọn Email Server Riêng Từ STEP?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <Server className="text-[hsl(207,100%,40%)] mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Tùy Chỉnh & Tích Hợp</h3>
              <p className="text-gray-600">
                Server riêng giúp tùy chỉnh quy tắc email (e.g., auto-forward, filters), kết nối mượt mà 
                với hệ thống CRM hoặc Cloud – lý tưởng cho công ty cần kiểm soát dữ liệu email hoàn toàn.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <Star className="text-yellow-500 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Đánh Giá Từ Khách Hàng</h3>
              <blockquote className="text-gray-600 italic mb-3">
                "Email server riêng của STEP giúp công ty tôi an toàn và chuyên nghiệp hơn bao giờ hết!"
              </blockquote>
              <p className="text-sm text-gray-500">– Anh G., CEO SMEs tại Hà Nội</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <Lock className="text-green-500 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cam Kết</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>✓ Thiết lập miễn phí</li>
                <li>✓ Dùng thử 30 ngày</li>
                <li>✓ Hoàn tiền nếu không hài lòng</li>
                <li>✓ Hạ tầng tại Việt Nam đảm bảo tốc độ nhanh</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Sẵn Sàng Thiết Lập Email Server Riêng Cho Công Ty Bạn?
            </h2>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full inline-block font-semibold">
              🎁 Nhận thiết lập miễn phí + giảm 20% tháng đầu!
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên công ty (tùy chọn)
                  </label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số User Dự Kiến
                  </label>
                  <Input
                    type="text"
                    placeholder="VD: 10, 50, 100..."
                    value={formData.userCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, userCount: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gói quan tâm
                  </label>
                  <Select value={formData.package} onValueChange={(value) => setFormData(prev => ({ ...prev, package: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn gói dịch vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gói Cơ Bản">Gói Cơ Bản</SelectItem>
                      <SelectItem value="Gói Nâng Cao">Gói Nâng Cao</SelectItem>
                      <SelectItem value="Gói Doanh Nghiệp">Gói Doanh Nghiệp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-[hsl(207,100%,40%)] to-blue-600 hover:from-blue-600 hover:to-[hsl(207,100%,40%)] text-white font-semibold text-lg py-4"
              >
                Gửi Yêu Cầu & Nhận Báo Giá Cá Nhân Hóa
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Email Popup */}
      <EmailPopup isVisible={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}