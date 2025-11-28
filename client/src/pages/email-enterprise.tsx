import { useState } from 'react';
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
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function EmailEnterprise() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mailboxCount: '',
    package: ''
  });
  const { toast } = useToast();

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
      <Header />
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

      <Footer />
    </div>
  );
}