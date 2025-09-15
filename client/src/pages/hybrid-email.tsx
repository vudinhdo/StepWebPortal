import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Shield, 
  Video, 
  Calendar, 
  FileText, 
  Users, 
  Check, 
  Star,
  ArrowRight,
  Cloud,
  Smartphone,
  Brain,
  MessageSquare,
  HardDrive,
  Zap,
  Building,
  Globe,
  X,
  Server,
  Lock,
  Workflow
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PersonalizationPopup from "@/components/personalization-popup";

export default function HybridEmail() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    userCount: '',
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
          company: formData.company,
          service: `Hybrid Email - ${formData.package}`,
          message: `Tên công ty: ${formData.company}\nSố user dự kiến: ${formData.userCount}\nGói quan tâm: ${formData.package}\nYêu cầu tư vấn giải pháp Hybrid Email và migration từ hệ thống hiện tại`
        })
      });

      if (response.ok) {
        toast({
          title: "Gửi yêu cầu thành công!",
          description: "Chúng tôi sẽ liên hệ với bạn trong 24h để tư vấn và báo giá Hybrid Email.",
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
      name: "Hybrid Basic",
      price: "99.000 VNĐ/user/tháng",
      originalPrice: "120.000 VNĐ/user/tháng",
      storage: "30GB Email + 15GB Drive",
      meetingCapacity: "Google Meet tích hợp",
      features: [
        "Email @yourcompany.com",
        "Kết hợp Gmail + Mail Server riêng",
        "30GB dung lượng email",
        "15GB Google Drive miễn phí",
        "Outlook Desktop & Mobile",
        "Webmail interface",
        "Backup tự động hàng ngày",
        "Hỗ trợ 24/7"
      ],
      suitable: "Công ty nhỏ 1-20 nhân viên",
      color: "blue",
      discount: "20% off năm đầu"
    },
    {
      name: "Hybrid Professional", 
      price: "159.000 VNĐ/user/tháng",
      originalPrice: "190.000 VNĐ/user/tháng",
      storage: "50GB Email + 30GB Drive",
      meetingCapacity: "Google Meet + Zoom tích hợp",
      features: [
        "Tất cả tính năng Hybrid Basic",
        "50GB dung lượng email",
        "30GB Google Drive business",
        "Anti-spam & Anti-virus nâng cao",
        "Email archiving & compliance",
        "Mobile device management",
        "API tích hợp CRM",
        "Priority support"
      ],
      suitable: "SME 20-100 nhân viên",
      color: "green", 
      popular: true,
      discount: "20% off năm đầu"
    },
    {
      name: "Hybrid Enterprise",
      price: "299.000 VNĐ/user/tháng", 
      originalPrice: "360.000 VNĐ/user/tháng",
      storage: "Unlimited Email + 100GB Drive",
      meetingCapacity: "Multi-platform meeting",
      features: [
        "Tất cả tính năng Hybrid Professional",
        "Dung lượng email không giới hạn",
        "100GB Google Drive enterprise",
        "Advanced security & encryption",
        "Single Sign-On (SSO)",
        "Active Directory integration",
        "Disaster recovery",
        "Dedicated account manager"
      ],
      suitable: "Doanh nghiệp 100+ nhân viên",
      color: "purple",
      discount: "20% off năm đầu"
    },
    {
      name: "Hybrid Custom",
      price: "Báo giá theo yêu cầu",
      originalPrice: "Liên hệ tư vấn", 
      storage: "Tùy chỉnh theo nhu cầu",
      meetingCapacity: "Không giới hạn",
      features: [
        "Thiết kế theo yêu cầu riêng",
        "Dung lượng & tính năng tùy chỉnh",
        "On-premise + Cloud hybrid",
        "Multi-domain management",
        "Custom API development",
        "White-label solution",
        "24/7 dedicated support",
        "SLA 99.9% uptime guarantee"
      ],
      suitable: "Tập đoàn & doanh nghiệp lớn",
      color: "orange",
      discount: "Ưu đãi đặc biệt"
    }
  ];

  const features = [
    {
      icon: Mail,
      title: "Email Chuyên Nghiệp",
      description: "Email @yourcompany.com với mailbox dung lượng lớn, giao diện Outlook quen thuộc và webmail hiện đại."
    },
    {
      icon: Workflow,
      title: "Kiến Trúc Hybrid",
      description: "Kết hợp ưu điểm của Gmail và Mail Server riêng, tối ưu chi phí và hiệu suất cho doanh nghiệp."
    },
    {
      icon: Shield,
      title: "Bảo Mật Đa Lớp",
      description: "Anti-spam, anti-virus nâng cao, mã hóa end-to-end và compliance đạt chuẩn quốc tế."
    },
    {
      icon: Cloud,
      title: "Google Drive Tích Hợp",
      description: "Dung lượng Drive miễn phí với tài khoản công ty, đồng bộ file và collaboration tools."
    },
    {
      icon: Smartphone,
      title: "Multi-Platform Support",
      description: "Hỗ trợ Outlook, Apple Mail, mobile apps và webmail với đồng bộ real-time across devices."
    },
    {
      icon: Zap,
      title: "Hiệu Suất Cao",
      description: "Server infrastructure tối ưu, uptime 99.9%, tốc độ gửi/nhận email nhanh chóng và ổn định."
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Tối Ưu Chi Phí",
      description: "Tiết kiệm 40-60% so với Google Workspace hay Microsoft 365 đầy đủ, phù hợp ngân sách SME"
    },
    {
      icon: Shield,
      title: "Bảo Mật Enterprise",
      description: "Hệ thống bảo mật đa lớp, compliance chuẩn quốc tế và data residency tại Việt Nam"
    },
    {
      icon: Brain,
      title: "Migration Chuyên Nghiệp", 
      description: "Hỗ trợ chuyển đổi từ Gmail, Outlook, Exchange Server không mất dữ liệu và downtime"
    },
    {
      icon: Users,
      title: "Hỗ Trợ 24/7",
      description: "Technical support tiếng Việt 24/7, training nhân viên và dedicated account manager"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PersonalizationPopup storageKey="hybrid-email-personalization" />
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-6">
                <Workflow className="text-yellow-300 mr-4" size={56} />
                <h1 className="text-4xl md:text-6xl font-bold">
                  Hybrid Email
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                Giải pháp email lai tối ưu cho doanh nghiệp - Kết hợp sức mạnh của Gmail và Mail Server riêng với chi phí hợp lý
              </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
                <Building className="mb-2 md:mb-0 md:mr-4 text-yellow-300 flex-shrink-0" size={32} />
                <div>
                  <div className="text-lg font-bold" data-testid="text-stats-businesses">5,000+ Doanh nghiệp</div>
                  <div className="text-sm text-blue-200">Đang sử dụng</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
                <Shield className="mb-2 md:mb-0 md:mr-4 text-yellow-300 flex-shrink-0" size={32} />
                <div>
                  <div className="text-lg font-bold" data-testid="text-stats-uptime">99.9% Uptime</div>
                  <div className="text-sm text-blue-200">SLA đảm bảo</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
                <Users className="mb-2 md:mb-0 md:mr-4 text-yellow-300 flex-shrink-0" size={32} />
                <div>
                  <div className="text-lg font-bold" data-testid="text-stats-support">24/7 Support</div>
                  <div className="text-sm text-blue-200">Hỗ trợ tiếng Việt</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                data-testid="button-contact-sales"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Liên hệ tư vấn
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
                data-testid="button-view-pricing"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Xem bảng giá
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              Tính Năng Nổi Bật Hybrid Email
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kết hợp hoàn hảo giữa công nghệ cloud và on-premise để mang lại trải nghiệm email tối ưu
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Gói Hybrid Email Dành Cho Doanh Nghiệp
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Lựa chọn gói phù hợp với quy mô và nhu cầu của doanh nghiệp bạn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-8 ${
                  pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
                data-testid={`package-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="mr-1" size={16} />
                      Phổ biến nhất
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600" data-testid={`price-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {pkg.price}
                    </div>
                    {pkg.originalPrice !== "Liên hệ tư vấn" && (
                      <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                    )}
                    <div className="text-sm text-green-600 font-medium">{pkg.discount}</div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{pkg.suitable}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Storage:</span>
                      <span className="font-medium">{pkg.storage}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Meeting:</span>
                      <span className="font-medium">{pkg.meetingCapacity}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid={`button-select-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, package: pkg.name }));
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Chọn gói này
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
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
              Tại Sao Chọn Hybrid Email Từ STEP?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Không chỉ cung cấp dịch vụ, STEP còn đồng hành cùng doanh nghiệp trong việc tối ưu hóa hệ thống email
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
                className="text-center"
                data-testid={`benefit-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="text-white" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
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

      {/* Migration & Support Section */}
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
              Migration & Hỗ Trợ Chuyên Nghiệp
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              STEP hỗ trợ migration từ mọi hệ thống email và training nhân viên hoàn toàn miễn phí
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Chuyển Đổi Không Gián Đoạn
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Migration từ Gmail/Outlook/Exchange</span>
                    <p className="text-sm text-gray-600 mt-1">Chuyển đổi email, calendar, contacts không mất dữ liệu</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Thiết lập domain và DNS</span>
                    <p className="text-sm text-gray-600 mt-1">Cấu hình MX records, SPF, DKIM cho bảo mật tối ưu</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Training toàn diện</span>
                    <p className="text-sm text-gray-600 mt-1">Đào tạo sử dụng Outlook, webmail và mobile cho team</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Hỗ trợ 24/7</span>
                    <p className="text-sm text-gray-600 mt-1">Hotline, remote support và technical consulting</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Quy Trình Triển Khai
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <span className="text-gray-700">Phân tích hệ thống hiện tại và tư vấn (1 ngày)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <span className="text-gray-700">Thiết lập Hybrid Email và cấu hình (2-3 ngày)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <span className="text-gray-700">Migration dữ liệu và testing (3-5 ngày)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                  <span className="text-gray-700">Training nhân viên và go-live (1 tuần)</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium text-center">
                  ⚡ Toàn bộ quy trình chỉ từ 1-2 tuần
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Nhận Tư Vấn Hybrid Email Miễn Phí
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi sẽ liên hệ trong 24h để tư vấn gói phù hợp và hỗ trợ migration hoàn toàn miễn phí
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    placeholder="Nhập họ và tên"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    placeholder="email@company.com"
                    data-testid="input-email"
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
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    placeholder="0123 456 789"
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên công ty *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                    placeholder="ABC Company"
                    data-testid="input-company"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng user dự kiến
                  </label>
                  <Select 
                    value={formData.userCount} 
                    onValueChange={(value) => setFormData(prev => ({...prev, userCount: value}))}
                  >
                    <SelectTrigger data-testid="select-user-count">
                      <SelectValue placeholder="Chọn số lượng user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-20">1-20 user</SelectItem>
                      <SelectItem value="21-50">21-50 user</SelectItem>
                      <SelectItem value="51-100">51-100 user</SelectItem>
                      <SelectItem value="101-500">101-500 user</SelectItem>
                      <SelectItem value="500+">Trên 500 user</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gói quan tâm
                  </label>
                  <Select 
                    value={formData.package} 
                    onValueChange={(value) => setFormData(prev => ({...prev, package: value}))}
                  >
                    <SelectTrigger data-testid="select-package">
                      <SelectValue placeholder="Chọn gói Hybrid Email" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hybrid Basic">Hybrid Basic</SelectItem>
                      <SelectItem value="Hybrid Professional">Hybrid Professional</SelectItem>
                      <SelectItem value="Hybrid Enterprise">Hybrid Enterprise</SelectItem>
                      <SelectItem value="Hybrid Custom">Hybrid Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                data-testid="button-submit-contact"
              >
                Gửi yêu cầu tư vấn
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}