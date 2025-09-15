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
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PersonalizationPopup from "@/components/personalization-popup";

export default function Microsoft365() {
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
          service: `Microsoft 365 - ${formData.package}`,
          message: `Tên công ty: ${formData.company}\nSố user dự kiến: ${formData.userCount}\nGói quan tâm: ${formData.package}\nYêu cầu thiết lập Microsoft 365 và tư vấn chuyển đổi từ hệ thống hiện tại`
        })
      });

      if (response.ok) {
        toast({
          title: "Gửi yêu cầu thành công!",
          description: "Chúng tôi sẽ liên hệ với bạn trong 24h để tư vấn và báo giá Microsoft 365.",
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
      name: "Microsoft 365 Business Basic",
      price: "129.000 VNĐ/user/tháng",
      originalPrice: "155.000 VNĐ/user/tháng",
      storage: "1TB OneDrive",
      meetingCapacity: "300 participants",
      features: [
        "Outlook web và mobile",
        "Microsoft Teams",
        "SharePoint và OneDrive 1TB",
        "Word, Excel, PowerPoint web",
        "Exchange Online 50GB",
        "Bảo mật cơ bản",
        "Hỗ trợ web và chat"
      ],
      suitable: "Công ty nhỏ 1-10 nhân viên",
      color: "blue",
      discount: "17% off năm đầu"
    },
    {
      name: "Microsoft 365 Business Standard", 
      price: "259.000 VNĐ/user/tháng",
      originalPrice: "310.000 VNĐ/user/tháng",
      storage: "1TB OneDrive",
      meetingCapacity: "300 participants",
      features: [
        "Tất cả tính năng Business Basic",
        "Office desktop apps đầy đủ",
        "Outlook desktop",
        "Access và Publisher (PC)",
        "Attendee registration & reporting",
        "Webinar hosting 1000 người",
        "Customer scheduling app"
      ],
      suitable: "SME 10-50 nhân viên",
      color: "green", 
      popular: true,
      discount: "17% off năm đầu"
    },
    {
      name: "Microsoft 365 Business Premium",
      price: "449.000 VNĐ/user/tháng", 
      originalPrice: "540.000 VNĐ/user/tháng",
      storage: "1TB OneDrive",
      meetingCapacity: "300 participants",
      features: [
        "Tất cả tính năng Business Standard",
        "Advanced security features",
        "Intune device management", 
        "Azure Information Protection",
        "Advanced Threat Protection",
        "Azure AD Premium P1",
        "Windows Autopilot deployment"
      ],
      suitable: "Doanh nghiệp 50-300 nhân viên",
      color: "purple",
      discount: "17% off năm đầu"
    },
    {
      name: "Microsoft 365 Apps",
      price: "219.000 VNĐ/user/tháng",
      originalPrice: "263.000 VNĐ/user/tháng", 
      storage: "1TB OneDrive",
      meetingCapacity: "N/A",
      features: [
        "Office desktop apps đầy đủ",
        "Word, Excel, PowerPoint, Outlook",
        "OneDrive 1TB storage",
        "Teams Basic (60 phút/meeting)",
        "Outlook customer manager",
        "No Exchange Online",
        "Chỉ có Office apps"
      ],
      suitable: "Doanh nghiệp chỉ cần Office",
      color: "orange",
      discount: "17% off năm đầu"
    }
  ];

  const features = [
    {
      icon: Mail,
      title: "Outlook Professional",
      description: "Email @yourcompany.com với Focused Inbox, scheduling assistant và 50GB mailbox."
    },
    {
      icon: Video,
      title: "Microsoft Teams",
      description: "Chat, video calls, file sharing và collaboration workspace tích hợp với Office."
    },
    {
      icon: FileText,
      title: "Office 365 Apps",
      description: "Word, Excel, PowerPoint desktop & web với real-time collaboration và AutoSave."
    },
    {
      icon: Cloud,
      title: "OneDrive & SharePoint",
      description: "1TB cloud storage cá nhân và team sites với advanced sharing controls."
    },
    {
      icon: Calendar,
      title: "Calendar & Booking",
      description: "Shared calendars, meeting rooms, booking pages và scheduling assistant."
    },
    {
      icon: Brain,
      title: "AI Copilot",
      description: "AI assistant trong Word, Excel, PowerPoint giúp tạo content và phân tích dữ liệu."
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Bảo Mật Enterprise",
      description: "Advanced Threat Protection, DLP, Azure AD và compliance với GDPR, ISO 27001."
    },
    {
      icon: Smartphone,
      title: "Làm Việc Mọi Nơi",
      description: "Office mobile apps, offline sync và Intune device management cho BYOD."
    },
    {
      icon: Users,
      title: "Quản Lý Tập Trung",
      description: "Microsoft 365 admin center, user management, license assignment và usage reports."
    },
    {
      icon: Zap,
      title: "Tích Hợp Liền Mạch",
      description: "Tích hợp với Windows, Azure, Power Platform và hàng ngàn third-party apps."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PersonalizationPopup storageKey="microsoft-365-personalization" />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Microsoft 365</span>
              <br />
              <span className="text-yellow-300">Giải Pháp Văn Phòng Toàn Diện</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Office, Teams, Exchange, SharePoint - Tất cả trong một. Tăng năng suất làm việc với bộ công cụ Microsoft đầy đủ và bảo mật cao.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
                <Building className="mb-2 md:mb-0 md:mr-4 text-yellow-300 flex-shrink-0" size={32} />
                <div>
                  <div className="text-lg font-bold" data-testid="text-stats-businesses">10,000+ Doanh nghiệp</div>
                  <div className="text-sm text-blue-200">Tin dùng STEP</div>
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
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4"
                data-testid="button-pricing"
              >
                Xem Bảng Giá
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-4"
                data-testid="button-contact"
              >
                Tư Vấn Miễn Phí
              </Button>
            </div>
          </motion.div>
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
              Bảng Giá Microsoft 365 2025
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
              Chọn gói phù hợp với quy mô doanh nghiệp. Giá đã bao gồm VAT và giảm 17% năm đầu.
            </p>
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="mr-2" size={16} />
              Khuyến mãi đặc biệt: Giảm 17% cho khách hàng đăng ký năm đầu
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all relative flex flex-col h-full ${
                  pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
                data-testid={`package-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Phổ Biến Nhất
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-blue-600">{pkg.price}</div>
                    {pkg.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                    )}
                    {pkg.discount && (
                      <div className="text-xs text-green-600 font-medium">{pkg.discount}</div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{pkg.suitable}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>💾 {pkg.storage}</span>
                    <span>👥 {pkg.meetingCapacity}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, package: pkg.name }));
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full mt-auto ${
                    pkg.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white font-semibold`}
                  data-testid={`button-select-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Chọn Gói Này
                </Button>
              </motion.div>
            ))}
          </div>
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
              Tính Năng Chính Microsoft 365
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bộ ứng dụng văn phòng hoàn chỉnh với cloud services và collaboration tools
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
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Tại Sao Chọn Microsoft 365 Từ STEP?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Không chỉ cung cấp license, STEP còn đồng hành cùng doanh nghiệp trong việc triển khai và tối ưu hóa
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
              Migration & Hỗ Trợ Chuyên Nghiệp
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              STEP hỗ trợ migration từ Google Workspace/Exchange và training nhân viên hoàn toàn miễn phí
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
                    <span className="font-medium text-gray-800">Migration từ Google Workspace/Exchange</span>
                    <p className="text-sm text-gray-600 mt-1">Chuyển đổi email, calendar, contacts không mất dữ liệu</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Thiết lập tenant và domain</span>
                    <p className="text-sm text-gray-600 mt-1">Cấu hình Azure AD, DNS records và SSO integration</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Training toàn diện</span>
                    <p className="text-sm text-gray-600 mt-1">Đào tạo sử dụng Office, Teams, SharePoint cho team</p>
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
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Quy Trình Triển Khai
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <span className="text-gray-700">Phân tích nhu cầu và tư vấn gói (1 ngày)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <span className="text-gray-700">Thiết lập tenant và cấu hình (2-3 ngày)</span>
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
              Nhận Tư Vấn Microsoft 365 Miễn Phí
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi sẽ liên hệ trong 24h để tư vấn gói phù hợp và hỗ trợ migration hoàn toàn miễn phí
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-lg p-8 shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full"
                  data-testid="input-name"
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
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                  data-testid="input-phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên công ty *
                </label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  required
                  className="w-full"
                  data-testid="input-company"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng user dự kiến
                </label>
                <Select 
                  value={formData.userCount} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, userCount: value }))}
                >
                  <SelectTrigger data-testid="select-user-count">
                    <SelectValue placeholder="Chọn số lượng user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 users</SelectItem>
                    <SelectItem value="11-50">11-50 users</SelectItem>
                    <SelectItem value="51-100">51-100 users</SelectItem>
                    <SelectItem value="101-300">101-300 users</SelectItem>
                    <SelectItem value="300+">300+ users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gói quan tâm
                </label>
                <Select 
                  value={formData.package} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, package: value }))}
                >
                  <SelectTrigger data-testid="select-package">
                    <SelectValue placeholder="Chọn gói dịch vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Microsoft 365 Business Basic">Business Basic</SelectItem>
                    <SelectItem value="Microsoft 365 Business Standard">Business Standard</SelectItem>
                    <SelectItem value="Microsoft 365 Business Premium">Business Premium</SelectItem>
                    <SelectItem value="Microsoft 365 Apps">Microsoft 365 Apps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
              data-testid="button-submit"
            >
              Gửi Yêu Cầu Tư Vấn Miễn Phí
            </Button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
}