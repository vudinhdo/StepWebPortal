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
  Zap
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
          name: name || 'Email Subscriber',
          email,
          phone: phone || '',
          company: '',
          service: 'Email Enterprise - Popup',
          message: 'Đăng ký nhận khuyến mãi 30% Google Workspace và e-book bảo mật email'
        })
      });

      if (response.ok) {
        toast({
          title: "Đăng ký thành công!",
          description: "Bạn sẽ nhận được mã giảm giá 30% và e-book bảo mật email trong 5 phút.",
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: 100 }}
        className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[hsl(207,100%,40%)] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-white" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Nhận Khuyến Mãi Đặc Biệt & Khuyến Nghị Bảo Mật Email Miễn Phí Ngay!
          </h3>
          <p className="text-sm text-gray-600">
            Chỉ cần điền email để nhận mã <strong className="text-[hsl(207,100%,40%)]">giảm 30%</strong> cho gói Google Workspace đầu tiên, 
            kèm e-book <strong>"5 Mẹo Bảo Mật Email Doanh Nghiệp 2025"</strong>
          </p>
          <div className="bg-red-50 text-red-600 text-xs font-semibold py-1 px-3 rounded-full inline-block mt-2">
            ⏰ Chỉ trong 48h!
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email của bạn *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Tên (tùy chọn)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Số điện thoại (tùy chọn)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[hsl(207,100%,40%)] to-blue-600 hover:from-blue-600 hover:to-[hsl(207,100%,40%)] text-white font-semibold"
          >
            Nhận Ngay & Đăng Ký
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Chúng tôi cam kết bảo mật thông tin và không gửi spam
        </p>
      </motion.div>
    </div>
  );
};

export default function EmailEnterprise() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mailboxCount: '',
    package: ''
  });
  const { toast } = useToast();

  // Show popup after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('emailEnterprisePopupSeen');
      if (!hasSeenPopup) {
        setShowPopup(true);
        localStorage.setItem('emailEnterprisePopupSeen', 'true');
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
          company: '',
          service: `Email Enterprise - ${formData.package}`,
          message: `Số hộp thư cần: ${formData.mailboxCount}\nGói quan tâm: ${formData.package}\nYêu cầu báo giá và tư vấn email doanh nghiệp`
        })
      });

      if (response.ok) {
        toast({
          title: "Gửi yêu cầu thành công!",
          description: "Chúng tôi sẽ liên hệ với bạn trong 24h để tư vấn và báo giá chi tiết.",
        });
        setFormData({ name: '', email: '', phone: '', mailboxCount: '', package: '' });
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
        "Email Server cơ bản",
        "10 Hộp thư",
        "5GB/hộp thư",
        "Webmail cơ bản",
        "Anti-spam cơ bản",
        "Hỗ trợ 8x5"
      ],
      suitable: "Doanh nghiệp nhỏ",
      color: "orange"
    },
    {
      name: "Gói Nâng Cao",
      price: "500.000 VNĐ/tháng",
      features: [
        "Google Workspace/Microsoft 365",
        "50 Hộp thư + Lưu trữ 30GB",
        "Tích hợp Calendar & Drive",
        "Mobile sync",
        "Bảo mật nâng cao",
        "Hỗ trợ 24/7"
      ],
      suitable: "SMEs cần tích hợp",
      color: "blue",
      popular: true
    },
    {
      name: "Gói Doanh Nghiệp",
      price: "1.000.000 VNĐ/tháng",
      features: [
        "Hybrid Email + Vận Hành",
        "Vô hạn hộp thư",
        "Bảo mật nâng cao",
        "Tùy chỉnh server",
        "Backup tự động",
        "Dedicated support"
      ],
      suitable: "Công ty lớn với nhu cầu cao",
      color: "purple"
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "Chuyên Nghiệp & Tùy Chỉnh",
      description: "Tạo địa chỉ email theo tên miền công ty (e.g., ten@congty.com), tích hợp với Outlook hoặc webmail – lý tưởng cho doanh nghiệp cần hình ảnh thương hiệu mạnh mẽ."
    },
    {
      icon: Shield,
      title: "Bảo Mật & Chống Spam",
      description: "Firewall nâng cao, lọc spam AI, mã hóa dữ liệu, và tuân thủ GDPR – an toàn cho thông tin nhạy cảm, tránh mất dữ liệu hoặc hack."
    },
    {
      icon: Zap,
      title: "Tích Hợp Linh Hoạt",
      description: "Kết nối với Google Workspace/Microsoft 365 cho calendar/drive, hoặc Hybrid Email để kết hợp on-premise/cloud – phù hợp SMEs cần đồng bộ email với CRM hoặc công cụ nội bộ."
    },
    {
      icon: Server,
      title: "Vận Hành Dễ Dàng",
      description: "Dịch vụ vận hành chuyên nghiệp, uptime 99.99%, backup hàng ngày, và hỗ trợ 24/7 – giúp IT Manager tập trung kinh doanh thay vì quản lý server."
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
              Email Doanh Nghiệp Chuyên Nghiệp
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Giao Tiếp An Toàn Và Hiệu Quả Cho Công Ty Bạn!
            </p>
            <p className="text-lg mb-8 max-w-4xl mx-auto opacity-80">
              Cung cấp giải pháp email toàn diện cho doanh nghiệp: Email server tùy chỉnh, Google Workspace, 
              Microsoft 365, Hybrid Email và dịch vụ vận hành. Dành riêng cho SMEs và chuyên gia IT cần email 
              ổn định, bảo mật cao, tích hợp dễ dàng.
            </p>
            <Button 
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg" 
              className="bg-white text-[hsl(207,100%,40%)] hover:bg-gray-100 font-semibold text-lg px-8 py-4"
            >
              Tìm Gói Email Phù Hợp Cho Doanh Nghiệp
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
              Lợi Ích Của Dịch Vụ Email Từ STEP
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
              Bảng Gói Dịch Vụ Email
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
                  Chọn Gói & Nhận Tư Vấn Miễn Phí
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
              Tại Sao Chọn Dịch Vụ Email Từ STEP?
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
              <Globe className="text-[hsl(207,100%,40%)] mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Tích Hợp Toàn Diện</h3>
              <p className="text-gray-600">
                Kết nối mượt mà với dịch vụ khác như Hosting hoặc Cloud, giúp doanh nghiệp bạn 
                quản lý email và dữ liệu từ một nền tảng duy nhất.
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
                "Email Hybrid của STEP đã giúp công ty tôi an toàn và chuyên nghiệp hơn bao giờ hết!"
              </blockquote>
              <p className="text-sm text-gray-500">– Anh G., CTO tại SMEs Quốc Oai</p>
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
                <li>✓ Dùng thử 14 ngày</li>
                <li>✓ Hoàn tiền nếu không hài lòng</li>
                <li>✓ Hạ tầng Việt Nam, an toàn và tối ưu</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Email Services Comparison Section */}
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
              So Sánh Các Dịch Vụ Email Trên Thị Trường
            </h2>
            <p className="text-lg text-gray-600">
              Bảng so sánh chi tiết giữa Mail Hybrid STEP, Microsoft 365 và Google Workspace
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[hsl(207,100%,40%)] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Thông Số Kỹ Thuật</th>
                    <th className="px-4 py-3 text-center font-semibold">Microsoft 365 Basic</th>
                    <th className="px-4 py-3 text-center font-semibold">Google Workspace Starter</th>
                    <th className="px-4 py-3 text-center font-semibold">Mail Hybrid STEP</th>
                    <th className="px-4 py-3 text-center font-semibold">Mail Hosting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Chi phí</td>
                    <td className="px-4 py-3 text-center">$3</td>
                    <td className="px-4 py-3 text-center">$4-6</td>
                    <td className="px-4 py-3 text-center bg-green-50">
                      <span className="font-bold text-green-600">$1</span>
                      <div className="text-xs text-gray-500">(cho số lượng trên 1000 Mailbox)</div>
                    </td>
                    <td className="px-4 py-3 text-center">$0.5-0.8</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Bộ nhớ email</td>
                    <td className="px-4 py-3 text-center">50GB</td>
                    <td className="px-4 py-3 text-center">30GB</td>
                    <td className="px-4 py-3 text-center">30GB</td>
                    <td className="px-4 py-3 text-center">5GB</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Lưu trữ đám mây</td>
                    <td className="px-4 py-3 text-center">1TB</td>
                    <td className="px-4 py-3 text-center">30GB (chung với hộp thư)</td>
                    <td className="px-4 py-3 text-center">15GB (Google Drive free)</td>
                    <td className="px-4 py-3 text-center">No support</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Mail client</td>
                    <td className="px-4 py-3 text-center">Webmail / Outlook</td>
                    <td className="px-4 py-3 text-center">Webmail / Outlook</td>
                    <td className="px-4 py-3 text-center">Webmail / Outlook</td>
                    <td className="px-4 py-3 text-center">No support</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Họp video</td>
                    <td className="px-4 py-3 text-center">Teams</td>
                    <td className="px-4 py-3 text-center">Google Meet</td>
                    <td className="px-4 py-3 text-center">Google Meet (free policy)</td>
                    <td className="px-4 py-3 text-center">No support</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Thân thiện người dùng</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="text-yellow-400 fill-current w-4 h-4" />
                        <span className="ml-1">9/10</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="text-yellow-400 fill-current w-4 h-4" />
                        <span className="ml-1">8.5/10</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="text-yellow-400 fill-current w-4 h-4" />
                        <span className="ml-1">8/10</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="text-yellow-400 fill-current w-4 h-4" />
                        <span className="ml-1">5/10</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Tỷ lệ gửi mail vào inbox</td>
                    <td className="px-4 py-3 text-center">Rất cao (9 điểm)</td>
                    <td className="px-4 py-3 text-center">Rất cao (8.5 điểm)</td>
                    <td className="px-4 py-3 text-center bg-green-50">
                      <span className="font-semibold text-green-600">Rất cao (8 điểm)</span>
                    </td>
                    <td className="px-4 py-3 text-center">Trung bình (5 điểm)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Hỗ trợ kỹ thuật</td>
                    <td className="px-4 py-3 text-center">8/10</td>
                    <td className="px-4 py-3 text-center">7/10</td>
                    <td className="px-4 py-3 text-center bg-green-50">
                      <span className="font-semibold text-green-600">7/10</span>
                    </td>
                    <td className="px-4 py-3 text-center">Tùy nhà cung cấp</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Sự ổn định</td>
                    <td className="px-4 py-3 text-center">10/10</td>
                    <td className="px-4 py-3 text-center">10/10</td>
                    <td className="px-4 py-3 text-center bg-green-50">
                      <span className="font-semibold text-green-600">8/10</span>
                    </td>
                    <td className="px-4 py-3 text-center">6/10</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Lọc thư rác</td>
                    <td className="px-4 py-3 text-center">10/10</td>
                    <td className="px-4 py-3 text-center">9/10</td>
                    <td className="px-4 py-3 text-center bg-green-50">
                      <span className="font-semibold text-green-600">8/10</span>
                    </td>
                    <td className="px-4 py-3 text-center">6/10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Tại Sao Chọn Mail Hybrid STEP?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-white" size={32} />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tối Ưu Chi Phí</h4>
                  <p className="text-gray-600 text-sm">
                    Giải pháp lai kết hợp Google Mail và Mail Server của STEP, 
                    tối ưu chi phí cho doanh nghiệp có lượng mailbox lớn
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-white" size={32} />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Bảo Mật Cao</h4>
                  <p className="text-gray-600 text-sm">
                    Email quan trọng từ Leader trở lên vẫn dùng Google Email, 
                    nhân viên khác dùng Mail Hybrid để tối ưu chi phí
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="text-white" size={32} />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Hạ Tầng Việt Nam</h4>
                  <p className="text-gray-600 text-sm">
                    Server đặt tại Việt Nam, hỗ trợ 24/7 bằng tiếng Việt, 
                    phù hợp với doanh nghiệp địa phương
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hybrid Email Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Bảng Giá Smail Hybrid
            </h2>
            <p className="text-lg text-gray-600">
              Dịch vụ Email Server Lai kết hợp với giá cả hợp lý
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Main Service Pricing */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Smail Hybrid - Dịch Vụ Chính</h3>
              
              <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">Dung lượng 5GB</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[hsl(207,100%,40%)]">27.000 VNĐ</div>
                    <div className="text-sm text-gray-500">/ tháng / user</div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Forwarder</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Địa chỉ Email</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Backup email</span>
                    <span className="font-medium">7 ngày</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data transfer</span>
                    <span className="font-medium">Không giới hạn</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Dịch vụ Mail thường:</strong> Outlook + web mail
                  </p>
                </div>
              </div>

              {/* Pricing Options */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cước phí 01 tháng</span>
                    <span className="text-lg font-bold">27.000 VNĐ</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 shadow border-2 border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-800">Discount 10%</span>
                    <span className="text-lg font-bold text-green-600">24.000 VNĐ</span>
                  </div>
                  <div className="text-xs text-green-600">Cước phí 1 tháng sau discount</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 shadow border-2 border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Cước phí 12 tháng</span>
                    <span className="text-lg font-bold text-blue-600">288.000 VNĐ</span>
                  </div>
                  <div className="text-xs text-blue-600">Tiết kiệm 36.000 VNĐ/năm</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800 font-medium">
                  💡 <strong>Bảng chỉ:</strong> Hai trăm lăm mười tám nghìn việt nam đồng
                </p>
              </div>
            </motion.div>

            {/* Additional Services */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Chi Tiết Dịch Vụ Bổ Sung</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Forwarder Email</div>
                      <div className="text-sm text-gray-500">01 forwarder</div>
                    </div>
                    <span className="text-lg font-bold">5.000 VNĐ</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Địa chỉ Email</div>
                      <div className="text-sm text-gray-500">01 mailbox</div>
                    </div>
                    <span className="text-lg font-bold">5.000 VNĐ</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Dung lượng Mailbox</div>
                      <div className="text-sm text-gray-500">01 GB</div>
                    </div>
                    <span className="text-lg font-bold">1.000 VNĐ</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Mail Hybrid</div>
                      <div className="text-sm text-gray-500">01 hybrid account</div>
                    </div>
                    <span className="text-lg font-bold">5.000 VNĐ</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Backup Mail</div>
                      <div className="text-sm text-gray-500">Bandwidth (Mbps)</div>
                    </div>
                    <span className="text-lg font-bold">1.000 VNĐ</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Backup Cloud</div>
                      <div className="text-sm text-gray-500">01 GB</div>
                    </div>
                    <span className="text-lg font-bold">1.000 VNĐ</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Lưu ý:</strong> Dịch vụ tích hợp chạy song song dịch vụ Mail server Google / Mail server riêng
                  nhanh tối ưu chi phí
                </p>
              </div>
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
              Sẵn Sàng Nâng Cấp Hệ Thống Email Doanh Nghiệp Của Bạn?
            </h2>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full inline-block font-semibold">
              🎁 Nhận báo giá cá nhân hóa và giảm 20% tháng đầu!
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
                    Số hộp thư cần (tùy chọn)
                  </label>
                  <Input
                    type="text"
                    placeholder="VD: 10, 50, 100..."
                    value={formData.mailboxCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, mailboxCount: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gói quan tâm *
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

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-[hsl(207,100%,40%)] to-blue-600 hover:from-blue-600 hover:to-[hsl(207,100%,40%)] text-white font-semibold text-lg py-4"
              >
                Gửi Yêu Cầu & Nhận Báo Giá
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