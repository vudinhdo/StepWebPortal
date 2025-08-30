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
    icon: TrendingUp,
    title: "Chi Phí Cao Và Không Linh Hoạt",
    description: "Đầu tư phần cứng đắt đỏ, khó mở rộng khi doanh thu biến động (đặc biệt với doanh nghiệp mùa vụ)."
  },
  {
    icon: AlertTriangle,
    title: "Độ Trễ Cao",
    description: "Server nước ngoài làm chậm ứng dụng, ảnh hưởng đến trải nghiệm người dùng Việt."
  },
  {
    icon: Shield,
    title: "Bảo Mật Rủi Ro",
    description: "Tăng nguy cơ tấn công mạng, không tuân thủ quy định dữ liệu Việt Nam."
  },
  {
    icon: Package,
    title: "Khó Triển Khai",
    description: "DEV mất thời gian setup, CTO lo lắng về integration với hệ thống địa phương."
  }
];

// Benefits of Cloud Server
const benefits = [
  {
    icon: Package,
    title: "Tiết Kiệm Chi Phí Cho CEO",
    description: "Mô hình pay-as-you-go, giảm 50% chi phí so với server vật lý. Không phí ẩn, thanh toán qua ví điện tử Việt (Momo, VNPay) – lý tưởng cho doanh nghiệp vừa và nhỏ."
  },
  {
    icon: TrendingUp,
    title: "Scalability Và Kiến Trúc Mạnh Mẽ Cho CTO",
    description: "Tăng giảm tài nguyên tức thì, hỗ trợ Kubernetes/Docker, tích hợp GPU cho AI (tương tự VNG Cloud). Data center Việt đảm bảo độ trễ thấp <10ms."
  },
  {
    icon: Zap,
    title: "Dễ Triển Khai Cho DEV",
    description: "Template sẵn cho Ubuntu, CentOS, Windows; tích hợp API nhanh với Laravel, Node.js, WordPress. Monitoring realtime qua dashboard tiếng Việt."
  },
  {
    icon: Shield,
    title: "Bảo Mật Cao Cấp",
    description: "Hệ thống nhiều lớp với WAF/Firewall, mã hóa dữ liệu theo tiêu chuẩn Việt Nam, chống DDoS. Backup tự động hàng ngày."
  },
  {
    icon: Headphones,
    title: "Hỗ Trợ 24/7 Và 1-1",
    description: "Đội ngũ chuyên gia Việt Nam sẵn sàng tư vấn qua chat, call hoặc email – không robot, chỉ hỗ trợ thực sự từ người thật!"
  },
  {
    icon: Gauge,
    title: "Uptime 99.99%",
    description: "Đảm bảo kinh doanh không gián đoạn, với bồi thường nếu không đạt."
  }
];

// Pricing packages
const packages = [
  {
    name: "Starter",
    price: "500.000 VNĐ/tháng",
    specs: "2 vCPU, 4GB RAM, 50GB SSD",
    suitable: "Lý tưởng cho DEV cá nhân hoặc dự án nhỏ",
    popular: false,
    features: [
      "2 vCPU cores",
      "4GB RAM",
      "50GB SSD storage",
      "1TB bandwidth",
      "SSL miễn phí",
      "Hỗ trợ 24/7 tiếng Việt",
      "Backup tự động hàng ngày",
      "Dashboard tiếng Việt"
    ]
  },
  {
    name: "Business",
    price: "1.200.000 VNĐ/tháng",
    specs: "4 vCPU, 8GB RAM, 100GB SSD",
    suitable: "Hoàn hảo cho CTO doanh nghiệp vừa, tích hợp AI",
    popular: true,
    features: [
      "4 vCPU cores",
      "8GB RAM",
      "100GB SSD storage",
      "3TB bandwidth",
      "SSL miễn phí",
      "Hỗ trợ ưu tiên 24/7",
      "Backup tự động",
      "Monitoring nâng cao",
      "Tích hợp ví điện tử Việt"
    ]
  },
  {
    name: "Enterprise",
    price: "2.500.000 VNĐ/tháng",
    specs: "8 vCPU, 16GB RAM, 200GB SSD",
    suitable: "Dành cho CEO tập đoàn, tùy chỉnh cao cấp",
    popular: false,
    features: [
      "8 vCPU cores",
      "16GB RAM",
      "200GB SSD storage",
      "10TB bandwidth",
      "SSL miễn phí",
      "Support manager chuyên riêng",
      "Backup realtime",
      "Bảo mật cao cấp",
      "Tích hợp custom",
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
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Cloud Server – Giải Pháp <span className="text-blue-300">Đám Mây Linh Hoạt, Tiết Kiệm</span> Và An Toàn
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed">
                Nâng Tầm Kinh Doanh Với Cloud Server – Được Thiết Kế Riêng Cho Thị Trường Việt Nam
              </p>
              
              <div className="bg-blue-800/30 rounded-lg p-5 mb-6 border border-blue-600/30">
                <p className="text-base text-blue-100 leading-relaxed mb-3">
                  <strong>Kính gửi các CEO, CTO và Developer thân mến,</strong>
                </p>
                <p className="text-base text-blue-200 leading-relaxed">
                  Trong bối cảnh chuyển đổi số tại Việt Nam đang bùng nổ, Cloud Server của chúng tôi là giải pháp lý tưởng 
                  để bạn tối ưu hóa chi phí, tăng tốc độ triển khai với data center tại Việt Nam.
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-base text-blue-200 leading-relaxed mb-4">
                  Với kinh nghiệm phục vụ hàng ngàn doanh nghiệp Việt, chúng tôi giúp:
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span className="text-sm text-green-300 font-semibold">CEO tiết kiệm 50% chi phí</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
                    <span className="text-sm text-cyan-300 font-semibold">CTO xây dựng kiến trúc scalable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                    <span className="text-sm text-yellow-300 font-semibold">DEV triển khai nhanh chóng</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 mb-6 border border-green-400/30">
                <p className="text-base text-white font-semibold">
                  🇻🇳 Hỗ Trợ Đặc Biệt: 24/7 Qua Tiếng Việt, Tư Vấn 1-1 Cá Nhân Hóa!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-blue-800 hover:bg-blue-50 font-semibold px-6 py-3"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Cloud className="mr-2" size={18} />
                  Đăng Ký Thử Miễn Phí
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-800 font-semibold px-6 py-3"
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Package className="mr-2" size={18} />
                  Xem Báo Giá
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Server className="text-blue-300" size={32} />
                    <h3 className="text-lg font-semibold">Server Status</h3>
                  </div>
                  <div className="flex items-center gap-2 text-green-300">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Online</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-blue-200">CPU Usage</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full transition-all duration-300" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-blue-200">Memory</span>
                      <span className="text-sm font-medium">6.2GB / 16GB</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full transition-all duration-300" style={{ width: '38%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-blue-200">Disk Usage</span>
                      <span className="text-sm font-medium">75GB / 200GB</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full transition-all duration-300" style={{ width: '37%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-blue-200">Bandwidth</span>
                      <span className="text-sm font-medium">2.8TB / 10TB</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full transition-all duration-300" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-blue-200">Uptime</span>
                      <span className="text-sm font-medium">99.99%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full transition-all duration-300" style={{ width: '99%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-200 block">Data Center</span>
                      <span className="font-medium">🇻🇳 Việt Nam</span>
                    </div>
                    <div>
                      <span className="text-blue-200 block">Response Time</span>
                      <span className="font-medium text-green-300">&lt;10ms</span>
                    </div>
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
              Tại Sao Cloud Server Là Lựa Chọn Hàng Đầu Cho CEO, CTO Và DEV Tại Việt Nam?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Theo các báo cáo từ Gartner và xu hướng tại Việt Nam, thị trường cloud đang tăng trưởng mạnh mẽ nhờ nhu cầu chuyển đổi số và AI. 
              Tuy nhiên, nhiều doanh nghiệp Việt gặp thách thức với server truyền thống:
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
              <strong>Cloud Server của chúng tôi giải quyết tất cả</strong>: Data center tại Việt Nam (Hà Nội, TP.HCM), 
              giá cạnh tranh chỉ từ 500.000 VNĐ/tháng, tích hợp AI/ML dễ dàng, và hỗ trợ 24/7 để bạn tập trung vào kinh doanh thay vì IT.
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
              Lợi Ích Nổi Bật – Phù Hợp Với Thị Hiếu Việt Nam
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
              Tính Năng Nổi Bật – Thiết Kế Cho Người Việt
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Các tính năng được tối ưu hóa riêng cho thị trường Việt Nam, từ ngôn ngữ đến tích hợp địa phương.
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
                    <td className="px-6 py-4 font-semibold text-gray-800">Triển Khai Nhanh</td>
                    <td className="px-6 py-4 text-gray-600">
                      Setup server chỉ 5 phút, template tiếng Việt cho OS phổ biến. Tích hợp AI/ML với GPU chuyên dụng.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Tích Hợp Địa Phương</td>
                    <td className="px-6 py-4 text-gray-600">
                      Kết nối dễ dàng với ngân hàng Việt, ví điện tử, và hệ thống ERP như Odoo, SAP.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Backup & Restore</td>
                    <td className="px-6 py-4 text-gray-600">
                      Tự động hàng ngày, khôi phục nhanh, dữ liệu lưu tại Việt Nam tuân thủ PDPA.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Monitoring Thân Thiện</td>
                    <td className="px-6 py-4 text-gray-600">
                      Dashboard tiếng Việt, cảnh báo qua SMS/email.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">SSL Miễn Phí</td>
                    <td className="px-6 py-4 text-gray-600">
                      Chứng chỉ bảo mật Let's Encrypt cho HTTPS, tự động gia hạn.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Data Center Việt Nam</td>
                    <td className="px-6 py-4 text-gray-600">
                      Server tại Hà Nội & TP.HCM, độ trễ thấp cho người dùng Việt.
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
              Gói Dịch Vụ – Giá Việt Nam, Chất Lượng Quốc Tế
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Phù hợp mọi quy mô, từ startup đến doanh nghiệp lớn - 
              Tất cả gói: Hỗ trợ 24/7, 1-1 tiếng Việt, thử miễn phí 14 ngày!
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
              Câu Hỏi Thường Gặp (FAQ) – Dành Cho CEO/CTO/DEV Việt
            </h2>
            <p className="text-lg text-gray-600">
              Giải đáp các thắc mắc phổ biến từ doanh nghiệp Việt Nam
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
                  Cloud Server có tuân thủ quy định dữ liệu Việt Nam không?
                </h3>
                <p className="text-gray-600">
                  Có, data lưu tại Việt Nam, mã hóa theo tiêu chuẩn cao nhất.
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
                  Làm thế nào để migrate từ nhà cung cấp khác (như AWS)?
                </h3>
                <p className="text-gray-600">
                  Hỗ trợ 1-1 miễn phí từ đội ngũ Việt, không mất dữ liệu.
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
                  Có tích hợp AI/ML không?
                </h3>
                <p className="text-gray-600">
                  Có, GPU chuyên dụng cho training model, giá rẻ hơn thị trường.
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
                  Thanh toán thế nào?
                </h3>
                <p className="text-gray-600">
                  Linh hoạt: Chuyển khoản, thẻ tín dụng, ví điện tử Việt.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Khách Hàng Việt Nói Gì?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hãy nghe chia sẻ từ các CEO, CTO và DEV đã thành công với Cloud Server của chúng tôi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Anh Nguyễn Văn A</h4>
                  <p className="text-sm text-gray-600">CEO Công ty TechVN (Hà Nội)</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Là CEO startup, tôi tiết kiệm được hàng chục triệu nhờ cloud này. 
                Hỗ trợ 1-1 nhanh chóng, giúp chúng tôi scale lên gấp đôi doanh thu!"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  B
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Chị Trần Thị B</h4>
                  <p className="text-sm text-gray-600">CTO Doanh nghiệp Fintech (TP.HCM)</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "CTO như tôi đánh giá cao kiến trúc bảo mật và tích hợp AI. 
                Data center Việt giúp độ trễ thấp, lý tưởng cho app mobile Việt Nam."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Anh Lê Văn C</h4>
                  <p className="text-sm text-gray-600">Lead Developer Công ty E-commerce</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "DEV team chúng tôi triển khai code chỉ trong giờ, dashboard tiếng Việt siêu tiện. 
                Không còn lo server crash nữa!"
              </p>
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
              Sẵn Sàng Chuyển Đổi Số Với Cloud Server Việt Nam?
            </h2>
            <p className="text-lg text-gray-600">
              Các CEO, CTO, DEV thân mến, đừng bỏ lỡ cơ hội tối ưu hóa kinh doanh với giải pháp cloud phù hợp nhất cho thị trường Việt. 
              Đăng ký ngay để nhận tư vấn 1-1 miễn phí và thử 14 ngày!
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


      
      <Footer />
    </div>
  );
}