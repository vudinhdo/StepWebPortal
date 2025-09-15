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

export default function GoogleWorkspace() {
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
          service: `Google Workspace - ${formData.package}`,
          message: `Tên công ty: ${formData.company}\nSố user dự kiến: ${formData.userCount}\nGói quan tâm: ${formData.package}\nYêu cầu thiết lập Google Workspace và tư vấn chuyển đổi từ hệ thống hiện tại`
        })
      });

      if (response.ok) {
        toast({
          title: "Gửi yêu cầu thành công!",
          description: "Chúng tôi sẽ liên hệ với bạn trong 24h để tư vấn và báo giá Google Workspace.",
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
      name: "Business Starter",
      price: "189.000 VNĐ/user/tháng",
      originalPrice: "226.800 VNĐ/user/tháng",
      storage: "30GB Pool",
      meetingCapacity: "100 participants",
      features: [
        "Gmail chuyên nghiệp @yourcompany.com",
        "Google Meet với 100 người tham gia",
        "Google Drive 30GB pool",
        "Google Docs, Sheets, Slides",
        "Google Calendar chia sẻ",
        "Bảo mật 2 lớp",
        "Hỗ trợ 24/7"
      ],
      suitable: "Công ty nhỏ 1-10 nhân viên",
      color: "blue",
      discount: "20% off năm đầu"
    },
    {
      name: "Business Standard", 
      price: "378.000 VNĐ/user/tháng",
      originalPrice: "453.600 VNĐ/user/tháng",
      storage: "2TB/user",
      meetingCapacity: "150 participants",
      features: [
        "Tất cả tính năng Business Starter",
        "2TB lưu trữ mỗi user",
        "Google Meet ghi âm & streaming",
        "Shared Drives không giới hạn",
        "Smart search & AI suggestions",
        "Vault cho lưu trữ & tuân thủ",
        "Endpoint management"
      ],
      suitable: "SME 10-50 nhân viên",
      color: "green", 
      popular: true,
      discount: "20% off năm đầu"
    },
    {
      name: "Business Plus",
      price: "567.000 VNĐ/user/tháng", 
      originalPrice: "680.400 VNĐ/user/tháng",
      storage: "5TB/user",
      meetingCapacity: "250 participants",
      features: [
        "Tất cả tính năng Business Standard",
        "5TB lưu trữ mỗi user",
        "Advanced security & compliance",
        "Data regions control",
        "Advanced endpoint management",
        "Attendance tracking trong Meet",
        "eDiscovery & retention"
      ],
      suitable: "Doanh nghiệp 50-300 nhân viên",
      color: "purple",
      discount: "20% off năm đầu"
    },
    {
      name: "Enterprise",
      price: "Liên hệ báo giá",
      originalPrice: "",
      storage: "Không giới hạn",
      meetingCapacity: "500+ participants",
      features: [
        "Tất cả tính năng Business Plus",
        "Lưu trữ không giới hạn",
        "Advanced security controls",
        "Data loss prevention (DLP)",
        "Enterprise-grade compliance",
        "24/7 premium support",
        "Custom integrations"
      ],
      suitable: "Tập đoàn 300+ nhân viên",
      color: "gray",
      enterprise: true
    }
  ];

  const features = [
    {
      icon: Mail,
      title: "Gmail Chuyên Nghiệp",
      description: "Email @yourcompany.com với khả năng tìm kiếm thông minh, spam protection và 99.9% uptime."
    },
    {
      icon: Video,
      title: "Google Meet",
      description: "Video conference bảo mật cao, ghi âm meeting, chia sẻ màn hình và tích hợp Calendar."
    },
    {
      icon: FileText,
      title: "Docs, Sheets & Slides",
      description: "Chỉnh sửa đồng thời, comment real-time và version history cho tất cả documents."
    },
    {
      icon: Cloud,
      title: "Google Drive",
      description: "Lưu trữ cloud an toàn, sync tự động và chia sẻ file với quyền truy cập linh hoạt."
    },
    {
      icon: Calendar,
      title: "Google Calendar",
      description: "Lịch chia sẻ team, booking rooms, reminder và tích hợp với Gmail & Meet."
    },
    {
      icon: Brain,
      title: "AI Gemini",
      description: "Trợ lý AI giúp viết email, phân tích data, tóm tắt meeting và tăng năng suất làm việc."
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Bảo Mật Enterprise",
      description: "2-factor authentication, SSO, endpoint protection và compliance với GDPR, ISO 27001."
    },
    {
      icon: Smartphone,
      title: "Làm Việc Mọi Nơi",
      description: "Ứng dụng mobile, offline sync và truy cập từ mọi thiết bị với bảo mật cao."
    },
    {
      icon: Users,
      title: "Quản Lý Tập Trung",
      description: "Admin console quản lý user, phân quyền, policy và báo cáo sử dụng chi tiết."
    },
    {
      icon: Zap,
      title: "Tích Hợp Dễ Dàng",
      description: "Kết nối với 1000+ ứng dụng business, migration từ Exchange/Office 365 không downtime."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PersonalizationPopup storageKey="google-workspace-personalization" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="h1 mb-6">
              Google Workspace
            </h1>
            <p className="lead mb-6 opacity-90 prose-constraint mx-auto">
              Giải Pháp Cộng Tác Và Năng Suất Doanh Nghiệp Hàng Đầu Thế Giới
            </p>
            <p className="body mb-10 prose-constraint mx-auto opacity-80">
              Gmail chuyên nghiệp, Google Meet, Drive, Docs và AI Gemini trong một nền tảng thống nhất. 
              Được tin dùng bởi hơn 3 tỷ người dùng với 99.9% uptime và bảo mật enterprise-grade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 nowrap"
                data-testid="button-pricing"
              >
                Xem Bảng Giá
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-4 nowrap"
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
            <h2 className="h2 text-gray-800 mb-6">
              Bảng Giá Google Workspace 2025
            </h2>
            <p className="lead prose-constraint mx-auto mb-4">
              Chọn gói phù hợp với quy mô doanh nghiệp. Giá đã bao gồm VAT và giảm 20% năm đầu.
            </p>
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="mr-2" size={16} />
              Khuyến mãi đặc biệt: Giảm 20% cho khách hàng đăng ký năm đầu
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
                } ${pkg.enterprise ? 'bg-gradient-to-br from-gray-50 to-gray-100' : ''}`}
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
                  <h3 className="h3 text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="mb-2">
                    <div className="h3 text-blue-600">{pkg.price}</div>
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
                      : pkg.enterprise 
                        ? 'bg-gray-700 hover:bg-gray-800'
                        : 'bg-blue-500 hover:bg-blue-600'
                  } text-white font-semibold nowrap`}
                  data-testid={`button-select-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {pkg.enterprise ? 'Liên Hệ Báo Giá' : 'Chọn Gói Này'}
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
            <h2 className="h2 text-gray-800 mb-6">
              Tính Năng Chính Google Workspace
            </h2>
            <p className="lead prose-constraint mx-auto">
              Bộ công cụ cộng tác và năng suất hoàn chỉnh cho doanh nghiệp hiện đại
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
                <h3 className="h3 text-gray-800 mb-3 text-center">
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
            <h2 className="h2 text-gray-800 mb-6">
              Tại Sao Chọn Google Workspace Từ STEP?
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
                className="text-center"
                data-testid={`benefit-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="text-white" size={32} />
                </div>
                <h3 className="h3 text-gray-800 mb-3">
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

      {/* Business Size Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 text-gray-800 mb-6">
              Gói Google Workspace Phù Hợp Quy Mô/Yêu Cầu Doanh Nghiệp
            </h2>
            <p className="lead prose-constraint mx-auto">
              Lựa chọn gói dịch vụ phù hợp với quy mô và nhu cầu cụ thể của doanh nghiệp
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Quy Mô Doanh Nghiệp</th>
                  <th className="px-6 py-4 text-left font-semibold">Số Lượng Nhân Viên</th>
                  <th className="px-6 py-4 text-left font-semibold">Gói Khuyến Nghị</th>
                  <th className="px-6 py-4 text-left font-semibold">Lý Do Lựa Chọn</th>
                  <th className="px-6 py-4 text-left font-semibold">Giá/User/Tháng</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800">Startup/SME</td>
                  <td className="px-6 py-4 text-gray-600">1-10 nhân viên</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Business Starter
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <ul className="text-sm space-y-1">
                      <li>• Chi phí thấp, phù hợp khởi nghiệp</li>
                      <li>• Đầy đủ tính năng cơ bản</li>
                      <li>• 30GB storage/user</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 font-bold text-blue-600">139,000 VNĐ</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="px-6 py-4 font-medium text-gray-800">Doanh nghiệp vừa</td>
                  <td className="px-6 py-4 text-gray-600">11-100 nhân viên</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Business Standard
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <ul className="text-sm space-y-1">
                      <li>• 2TB storage/user</li>
                      <li>• Meeting recording</li>
                      <li>• Shared drives</li>
                      <li>• Tỷ lệ giá/tính năng tốt nhất</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">259,000 VNĐ</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800">Doanh nghiệp lớn</td>
                  <td className="px-6 py-4 text-gray-600">101-300 nhân viên</td>
                  <td className="px-6 py-4">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Business Plus
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <ul className="text-sm space-y-1">
                      <li>• 5TB storage/user</li>
                      <li>• Advanced security</li>
                      <li>• Attendance tracking</li>
                      <li>• Enhanced admin controls</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 font-bold text-purple-600">462,000 VNĐ</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">Tập đoàn/Enterprise</td>
                  <td className="px-6 py-4 text-gray-600">300+ nhân viên</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Enterprise
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <ul className="text-sm space-y-1">
                      <li>• Unlimited storage</li>
                      <li>• Advanced security & DLP</li>
                      <li>• Enterprise support</li>
                      <li>• Custom integrations</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">Liên hệ</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 text-gray-800 mb-6">
              Bảng So Sánh Tính Năng Chi Tiết
            </h2>
            <p className="lead prose-constraint mx-auto">
              So sánh chi tiết các tính năng của từng gói Google Workspace
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold w-1/4">Tính Năng</th>
                  <th className="px-6 py-4 text-center font-semibold">Business Starter</th>
                  <th className="px-6 py-4 text-center font-semibold">Business Standard</th>
                  <th className="px-6 py-4 text-center font-semibold">Business Plus</th>
                  <th className="px-6 py-4 text-center font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Gmail Professional</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Google Drive Storage</td>
                  <td className="px-6 py-4 text-center text-sm">30GB/user</td>
                  <td className="px-6 py-4 text-center text-sm">2TB/user</td>
                  <td className="px-6 py-4 text-center text-sm">5TB/user</td>
                  <td className="px-6 py-4 text-center text-sm">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Google Meet (Video Conferencing)</td>
                  <td className="px-6 py-4 text-center text-sm">100 participants</td>
                  <td className="px-6 py-4 text-center text-sm">150 participants</td>
                  <td className="px-6 py-4 text-center text-sm">500 participants</td>
                  <td className="px-6 py-4 text-center text-sm">500 participants</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Meeting Recording</td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Shared Drives</td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Advanced Security</td>
                  <td className="px-6 py-4 text-center text-sm">Basic</td>
                  <td className="px-6 py-4 text-center text-sm">Standard</td>
                  <td className="px-6 py-4 text-center text-sm">Enhanced</td>
                  <td className="px-6 py-4 text-center text-sm">Enterprise-grade</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Data Loss Prevention (DLP)</td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Advanced Admin Controls</td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Cloud Search</td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Attendance Tracking</td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">24/7 Phone Support</td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-800 bg-gray-50">Custom Integrations</td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
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
            <h2 className="h2 text-gray-800 mb-6">
              Chuyển Đổi & Hỗ Trợ Toàn Diện
            </h2>
            <p className="lead prose-constraint mx-auto">
              STEP hỗ trợ chuyển đổi từ Exchange/Office 365 và đào tạo nhân viên hoàn toàn miễn phí
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="h3 text-gray-800 mb-6">
                Migration Không Gián Đoạn
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Chuyển đổi email từ Exchange/Office 365</span>
                    <p className="text-sm text-gray-600 mt-1">Migration toàn bộ email, contacts, calendar không mất dữ liệu</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Thiết lập tên miền email</span>
                    <p className="text-sm text-gray-600 mt-1">Cấu hình DNS, MX records và SPF/DKIM tự động</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Training nhân viên</span>
                    <p className="text-sm text-gray-600 mt-1">Đào tạo sử dụng Gmail, Drive, Meet cho toàn bộ team</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium text-gray-800">Hỗ trợ 24/7</span>
                    <p className="text-sm text-gray-600 mt-1">Hotline, live chat và remote support khi cần thiết</p>
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
              <h3 className="h3 text-gray-800 mb-4 text-center">
                Quy Trình Triển Khai
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <span className="text-gray-700">Tư vấn và phân tích nhu cầu (1 ngày)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <span className="text-gray-700">Thiết lập tài khoản và cấu hình (2-3 ngày)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <span className="text-gray-700">Migration dữ liệu (3-5 ngày)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                  <span className="text-gray-700">Training team và go-live (1 tuần)</span>
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
            <h2 className="h2 text-gray-800 mb-6">
              Nhận Tư Vấn Google Workspace Miễn Phí
            </h2>
            <p className="lead prose-constraint mx-auto">
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
                    <SelectItem value="Business Starter">Business Starter</SelectItem>
                    <SelectItem value="Business Standard">Business Standard</SelectItem>
                    <SelectItem value="Business Plus">Business Plus</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
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