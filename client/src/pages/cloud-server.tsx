import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Cloud,
  Server,
  Shield,
  Zap,
  Database,
  Settings,
  Headphones,
  Users,
  Play,
  Package,
  Gauge,
  ChevronRight,
  Phone,
  AlertTriangle,
  TrendingUp,
  Lock,
  CheckCircle,
  Monitor,
  HardDrive,
  Cpu
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from '@/components/header';
import Footer from '@/components/footer';

// Problems with traditional servers
const problems = [
  {
    icon: AlertTriangle,
    title: "Hiệu Suất Không Ổn Định",
    description: "Khó xử lý tải cao hoặc dữ liệu lớn."
  },
  {
    icon: TrendingUp,
    title: "Chi Phí Cao",
    description: "Đầu tư phần cứng lớn và chi phí bảo trì định kỳ."
  },
  {
    icon: Shield,
    title: "Rủi Ro Bảo Mật",
    description: "Dễ bị tấn công nếu thiếu lớp bảo vệ chuyên sâu."
  },
  {
    icon: Package,
    title: "Khó Mở Rộng",
    description: "Không linh hoạt khi nhu cầu thay đổi."
  }
];

// Benefits of Cloud Server
const benefits = [
  {
    icon: Zap,
    title: "Tối Ưu Hóa Hiệu Suất",
    description: "CPU mạnh mẽ (bao gồm dòng CPU đặc biệt để tăng tốc ứng dụng), RAM cao cấp và SSD tốc độ cao đảm bảo xử lý nhanh chóng, ngay cả với hàng triệu yêu cầu hàng ngày."
  },
  {
    icon: TrendingUp,
    title: "Mở Rộng Linh Hoạt",
    description: "Tăng giảm tài nguyên chỉ với vài cú click – lý tưởng cho doanh nghiệp phát triển nhanh hoặc có nhu cầu theo mùa."
  },
  {
    icon: Shield,
    title: "Bảo Mật Cao Cấp",
    description: "Tích hợp hệ thống bảo mật nhiều lớp bao gồm WAF (Web Application Firewall) và Firewall chuyên biệt, bảo vệ khỏi DDoS, SQL injection và các mối đe dọa khác. Kết hợp mã hóa dữ liệu và backup tự động hàng ngày."
  },
  {
    icon: Headphones,
    title: "Hỗ Trợ Chuyên Sâu",
    description: "Đội ngũ chuyên gia hỗ trợ 24/7 qua chat, email hoặc gọi điện. Dịch vụ hỗ trợ 1-1 cá nhân hóa giúp tùy chỉnh giải pháp theo nhu cầu cụ thể của bạn."
  },
  {
    icon: Package,
    title: "Tiết Kiệm Chi Phí",
    description: "Chỉ trả cho những gì bạn sử dụng, giảm tới 50% so với server vật lý, với mô hình pay-as-you-go giống AWS."
  },
  {
    icon: Gauge,
    title: "Uptime 99.99%",
    description: "Đảm bảo hệ thống luôn sẵn sàng, không gián đoạn hoạt động kinh doanh."
  }
];

// Pricing packages
const packages = [
  {
    name: "Starter",
    price: "500.000 VNĐ/tháng",
    specs: "2 vCPU, 4GB RAM, 50GB SSD",
    suitable: "Phù hợp cho developer cá nhân hoặc dự án nhỏ",
    popular: false,
    features: [
      "2 vCPU cores",
      "4GB RAM",
      "50GB SSD storage",
      "1TB bandwidth",
      "Free SSL certificate",
      "24/7 support",
      "Free backup daily",
      "Control panel access"
    ]
  },
  {
    name: "Business",
    price: "1.200.000 VNĐ/tháng",
    specs: "4 vCPU, 8GB RAM, 100GB SSD",
    suitable: "Lý tưởng cho doanh nghiệp vừa, chạy ứng dụng web hoặc database",
    popular: true,
    features: [
      "4 vCPU cores",
      "8GB RAM",
      "100GB SSD storage",
      "3TB bandwidth",
      "Free SSL certificate",
      "Priority 24/7 support",
      "Automated backup",
      "Advanced monitoring",
      "Load balancer support"
    ]
  },
  {
    name: "Enterprise",
    price: "2.500.000 VNĐ/tháng",
    specs: "8 vCPU, 16GB RAM, 200GB SSD",
    suitable: "Dành cho tổ chức lớn, hỗ trợ tùy chỉnh và tích hợp cao cấp",
    popular: false,
    features: [
      "8 vCPU cores",
      "16GB RAM",
      "200GB SSD storage",
      "10TB bandwidth",
      "Free SSL certificate",
      "Dedicated support manager",
      "Real-time backup",
      "Advanced security features",
      "Custom integrations",
      "SLA guarantee"
    ]
  }
];

// Supported platforms
const platforms = [
  "Linux (Ubuntu, CentOS, Debian)",
  "Windows Server",
  "Docker & Kubernetes",
  "WordPress, Laravel, Node.js",
  "MySQL, PostgreSQL",
  "API integrations"
];

export default function CloudServer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    currentInfrastructure: '',
    package: '',
    platforms: [] as string[],
    message: ''
  });

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Play className="w-4 h-4" />
                Thử Miễn Phí 14 Ngày - Không Cam Kết!
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Cloud Server – Giải Pháp <span className="text-blue-300">Đám Mây Linh Hoạt</span> Và Mạnh Mẽ
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Nâng Tầm Kinh Doanh Với Cloud Server Chuyên Nghiệp
              </p>
              
              <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                Bạn đang tìm kiếm giải pháp đám mây đáng tin cậy để chạy ứng dụng, lưu trữ dữ liệu hoặc phát triển dự án? 
                Cloud Server của chúng tôi mang đến hiệu suất vượt trội, linh hoạt cao và bảo mật tối ưu, tương tự như 
                các nhà cung cấp hàng đầu như AWS, Google Cloud, Viettel Cloud hay Bizfly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-blue-800 hover:bg-blue-50 font-semibold text-lg px-8 py-4"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Cloud className="mr-2" size={20} />
                  Đăng Ký Ngay
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-800 font-semibold text-lg px-8 py-4"
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Package className="mr-2" size={20} />
                  Xem Chi Tiết Giá
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <Server className="text-blue-300" size={48} />
                  <div className="text-right">
                    <div className="text-green-400 text-sm font-semibold">● Online</div>
                    <div className="text-blue-200 text-sm">99.99% Uptime</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">CPU Usage</span>
                    <span className="text-white font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-blue-800/50 rounded-full h-2">
                    <div className="bg-blue-300 h-2 rounded-full w-[45%]"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Memory</span>
                    <span className="text-white font-semibold">6.2GB / 16GB</span>
                  </div>
                  <div className="w-full bg-blue-800/50 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full w-[38%]"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
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
              Tại Sao Doanh Nghiệp Nên Chọn Cloud Server?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trong thời đại số, hạ tầng đám mây là yếu tố then chốt để doanh nghiệp cạnh tranh. 
              Server truyền thống thường gặp hạn chế như:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-lg border border-red-100"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <problem.icon className="text-red-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{problem.title}</h3>
                <p className="text-gray-600 text-sm">{problem.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              <strong>Cloud Server của chúng tôi giải quyết tất cả</strong>, mang đến giải pháp đám mây toàn diện, 
              dễ dàng tích hợp với các ứng dụng như web hosting, database, AI/ML, và hơn thế nữa – 
              giống như AWS hay Google Cloud nhưng với <span className="text-blue-600 font-semibold">chi phí hợp lý hơn cho thị trường Việt Nam</span>.
            </p>
          </motion.div>
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
              Lợi Ích Nổi Bật Khi Sử Dụng Cloud Server Của Chúng Tôi
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <benefit.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Highlight Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-start gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="text-red-600" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🔒 Bảo Mật Cao Cấp - Bảo Vệ Tối Đa Cho Cloud Server
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Tích hợp hệ thống bảo mật nhiều lớp</strong> bao gồm <span className="text-red-600 font-semibold">WAF (Web Application Firewall)</span> và 
                <span className="text-red-600 font-semibold"> Firewall chuyên biệt</span>, bảo vệ khỏi các mối đe dọa như 
                <span className="text-red-600 font-semibold"> tấn công DDoS, SQL injection và các mối đe dọa khác</span>. 
                Kết hợp với <span className="text-blue-600 font-semibold">mã hóa dữ liệu và backup tự động hàng ngày</span> để bảo vệ dữ liệu quan trọng của bạn.
              </p>
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>WAF Protection</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>DDoS Mitigation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Advanced Encryption</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Table Section */}
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
              Tính Năng Nổi Bật Của Cloud Server
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Khám phá các tính năng được tối ưu hóa đặc biệt để đảm bảo Cloud Server của bạn 
              hoạt động ổn định và hiệu quả nhất.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-semibold">Tính Năng</th>
                    <th className="px-6 py-4 text-left text-lg font-semibold">Mô Tả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Cài Đặt Nhanh Chóng</td>
                    <td className="px-6 py-4 text-gray-600">
                      Triển khai server chỉ trong vài phút với template sẵn có cho các OS phổ biến như Ubuntu, CentOS, Windows.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Tích Hợp Đầy Đủ</td>
                    <td className="px-6 py-4 text-gray-600">
                      Hỗ trợ dễ dàng kết nối với các dịch vụ như database (MySQL, PostgreSQL), container (Docker, Kubernetes) và API.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Backup & Restore</td>
                    <td className="px-6 py-4 text-gray-600">
                      Backup tự động hàng ngày, khôi phục nhanh chóng chỉ với một cú click.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Monitoring 24/7</td>
                    <td className="px-6 py-4 text-gray-600">
                      Giám sát hiệu suất thời gian thực qua dashboard thân thiện với user.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">SSL Miễn Phí</td>
                    <td className="px-6 py-4 text-gray-600">
                      Chứng chỉ SSL Let's Encrypt để bảo mật kết nối HTTPS.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Hỗ Trợ Đa Vùng</td>
                    <td className="px-6 py-4 text-gray-600">
                      Server đặt tại Việt Nam, Singapore hoặc EU để giảm độ trễ tối đa.
                    </td>
                  </tr>
                </tbody>
              </table>
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
              Gói Dịch Vụ Phù Hợp Với Mọi Quy Mô
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chọn gói phù hợp với nhu cầu của bạn, từ startup đến doanh nghiệp lớn - 
              Tất cả gói đều bao gồm hỗ trợ 24/7 và thử miễn phí 14 ngày!
            </p>
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
                  pkg.popular ? 'ring-2 ring-blue-500 scale-105' : 'border border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Phổ Biến Nhất
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Gói {pkg.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-600 text-sm font-medium">{pkg.specs}</p>
                  <p className="text-gray-500 text-sm">{pkg.suitable}</p>
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
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-700 hover:bg-gray-800'
                  } text-white font-semibold`}
                >
                  Chọn Gói & Triển Khai
                  <ChevronRight className="ml-2" size={16} />
                </Button>
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
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <Database className="text-blue-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Migration Miễn Phí</h3>
              <p className="text-gray-600 mb-4">
                Chuyển dữ liệu từ nhà cung cấp khác sang STEP Cloud hoàn toàn miễn phí, 
                đảm bảo không mất dữ liệu và downtime tối thiểu.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Backup toàn bộ server & databases
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Test migration trên staging
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Zero downtime migration
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <Settings className="text-blue-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Customization Support</h3>
              <p className="text-gray-600 mb-4">
                Đội ngũ DevOps giàu kinh nghiệm hỗ trợ tùy chỉnh server, 
                tích hợp API và phát triển infrastructure theo yêu cầu riêng.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Custom server configuration
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  API & third-party integration
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Performance optimization
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <Headphones className="text-blue-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Expert Support</h3>
              <p className="text-gray-600 mb-4">
                Hỗ trợ kỹ thuật chuyên sâu về Cloud Infrastructure bởi team có hơn 5 năm kinh nghiệm 
                triển khai cho các doanh nghiệp tại Việt Nam.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Hotline: 0985.636.289
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Live chat & Zalo OA
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Remote support via TeamViewer
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Câu Hỏi Thường Gặp (FAQ)
            </h2>
            <p className="text-lg text-gray-600">
              Tìm hiểu thêm thông tin về dịch vụ Cloud Server của chúng tôi
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Cloud Server có tương thích với các nền tảng phổ biến không?
                </h3>
                <p className="text-gray-600">
                  Có, hỗ trợ đầy đủ cho Linux, Windows, Docker, Kubernetes và các ứng dụng như WordPress, Laravel, Node.js.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Làm thế nào để di chuyển dữ liệu từ nhà cung cấp khác?
                </h3>
                <p className="text-gray-600">
                  Đội ngũ hỗ trợ 1-1 sẽ giúp bạn miễn phí, đảm bảo không mất dữ liệu.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Có cam kết uptime không?
                </h3>
                <p className="text-gray-600">
                  Chúng tôi cam kết 99.99% uptime, với bồi thường nếu không đạt.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Phương thức thanh toán nào được chấp nhận?
                </h3>
                <p className="text-gray-600">
                  Chuyển khoản ngân hàng, thẻ tín dụng, hoặc ví điện tử như Momo/VNPay.
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
              Tư Vấn Cloud Server Miễn Phí
            </h2>
            <p className="text-lg text-gray-600">
              Để lại thông tin để nhận tư vấn chi tiết và báo giá tối ưu cho doanh nghiệp
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 border border-gray-200"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập họ và tên"
                    className="w-full"
                    required
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
                    placeholder="Nhập email"
                    className="w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Nhập số điện thoại"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên công ty
                  </label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Nhập tên công ty"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hạ tầng hiện tại
                  </label>
                  <Select value={formData.currentInfrastructure} onValueChange={(value) => setFormData(prev => ({ ...prev, currentInfrastructure: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn hạ tầng hiện tại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on-premise">On-premise servers</SelectItem>
                      <SelectItem value="shared-hosting">Shared hosting</SelectItem>
                      <SelectItem value="vps">VPS/Cloud từ provider khác</SelectItem>
                      <SelectItem value="none">Chưa có hạ tầng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gói dịch vụ quan tâm
                  </label>
                  <Select value={formData.package} onValueChange={(value) => setFormData(prev => ({ ...prev, package: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn gói dịch vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Starter">Cloud Server Starter</SelectItem>
                      <SelectItem value="Business">Cloud Server Business</SelectItem>
                      <SelectItem value="Enterprise">Cloud Server Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Nền tảng/Technologies quan tâm (chọn nhiều)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => handlePlatformToggle(platform)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm text-left ${
                        formData.platforms.includes(platform)
                          ? "border-blue-500 bg-blue-50 text-blue-900"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả nhu cầu cụ thể
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Ví dụ: Cần triển khai web app với database MySQL, dự kiến 1000 users đồng thời..."
                  className="w-full h-24"
                />
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg py-4"
              >
                Gửi Yêu Cầu & Nhận Tư Vấn Miễn Phí
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn Sàng Nâng Cấp Hạ Tầng Của Bạn?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Đừng chờ đợi nữa! Đăng ký ngay hôm nay để trải nghiệm Cloud Server hiệu suất cao. 
              Thử miễn phí 14 ngày mà không cam kết.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-800 hover:bg-blue-50 font-semibold text-lg px-8 py-4"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Cloud className="mr-2" size={20} />
                Đăng Ký Thử Miễn Phí
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-800 font-semibold text-lg px-8 py-4"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Phone className="mr-2" size={20} />
                Liên Hệ Tư Vấn
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}