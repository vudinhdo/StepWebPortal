import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Shield, 
  Server, 
  Users, 
  Check, 
  X, 
  Star,
  ArrowRight,
  Clock,
  Globe,
  Database,
  Zap,
  HardDrive,
  Smartphone,
  Building,
  Monitor,
  Settings,
  Headphones,
  Package,
  Gauge,
  ChevronRight,
  Play,
  Phone,
  AlertTriangle,
  TrendingUp,
  Lock,
  CheckCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CloudOdoo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    currentUsers: '',
    odooModules: [] as string[],
    package: ''
  });
  const { toast } = useToast();

  const benefits = [
    {
      icon: Zap,
      title: "Tối Ưu Hóa Hiệu Suất",
      description: "CPU mạnh mẽ, RAM cao cấp và SSD tốc độ cao đảm bảo Odoo tải trang chỉ trong giây lát, ngay cả với hàng nghìn giao dịch hàng ngày."
    },
    {
      icon: TrendingUp,
      title: "Mở Rộng Linh Hoạt",
      description: "Tăng giảm tài nguyên chỉ với vài cú click – lý tưởng cho doanh nghiệp mùa vụ hoặc đang mở rộng."
    },
    {
      icon: Shield,
      title: "Bảo Mật Cao Cấp",
      description: "Tích hợp hệ thống bảo mật nhiều lớp bao gồm WAF (Web Application Firewall) và Firewall chuyên biệt, dành riêng để bảo vệ ứng dụng Odoo khỏi các mối đe dọa như tấn công DDoS, SQL injection và các lỗ hổng web phổ biến. Kết hợp với mã hóa dữ liệu và backup tự động hàng ngày để bảo vệ dữ liệu kinh doanh quan trọng của bạn."
    },
    {
      icon: Users,
      title: "Hỗ Trợ Chuyên Sâu",
      description: "Đội ngũ chuyên gia Odoo sẵn sàng hỗ trợ cài đặt, tối ưu hóa và di chuyển dữ liệu miễn phí."
    },
    {
      icon: AlertTriangle,
      title: "Tiết Kiệm Chi Phí",
      description: "Chỉ trả cho những gì bạn sử dụng, giảm tới 50% so với server vật lý truyền thống."
    },
    {
      icon: Clock,
      title: "Uptime 99.99%",
      description: "Đảm bảo Odoo luôn sẵn sàng, không gián đoạn kinh doanh."
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "500.000 VNĐ/tháng",
      suitable: "Phù hợp startup nhỏ",
      popular: false,
      specs: "2 vCPU, 4GB RAM, 50GB SSD",
      features: [
        "2 vCPU Intel Xeon",
        "4GB RAM DDR4",
        "50GB SSD NVMe",
        "PostgreSQL tối ưu",
        "Backup tự động",
        "SSL miễn phí",
        "Hỗ trợ 24/7",
        "Migration miễn phí",
        "Thử miễn phí 14 ngày"
      ]
    },
    {
      name: "Business",
      price: "1.200.000 VNĐ/tháng",
      suitable: "Lý tưởng cho doanh nghiệp vừa",
      popular: true,
      specs: "4 vCPU, 8GB RAM, 100GB SSD",
      features: [
        "4 vCPU Intel Xeon",
        "8GB RAM DDR4",
        "100GB SSD NVMe",
        "PostgreSQL + Redis Cache",
        "Backup tự động + snapshot",
        "CDN tích hợp",
        "Monitoring dashboard",
        "Hỗ trợ 24/7",
        "Load balancer",
        "Migration miễn phí",
        "Thử miễn phí 14 ngày"
      ]
    },
    {
      name: "Enterprise",
      price: "2.500.000 VNĐ/tháng",
      suitable: "Dành cho tập đoàn lớn, hỗ trợ tùy chỉnh",
      popular: false,
      specs: "8 vCPU, 16GB RAM, 200GB SSD",
      features: [
        "8 vCPU Intel Xeon",
        "16GB RAM DDR4",
        "200GB SSD NVMe",
        "PostgreSQL + Redis Cluster",
        "Multi-region backup",
        "Advanced monitoring",
        "Dedicated support manager",
        "Custom development",
        "High availability 99.99%",
        "Load balancer",
        "Migration miễn phí",
        "Thử miễn phí 14 ngày"
      ]
    }
  ];

  const odooModules = [
    "CRM - Quản lý khách hàng",
    "Sales - Bán hàng",
    "Accounting - Kế toán",
    "Inventory - Kho bãi",
    "Manufacturing - Sản xuất",
    "HR - Nhân sự",
    "Project - Quản lý dự án",
    "Purchase - Mua hàng",
    "Website - Website builder",
    "eCommerce - Thương mại điện tử",
    "Point of Sale - Bán lẻ",
    "Marketing - Marketing tự động"
  ];

  const handleModuleToggle = (module: string) => {
    setFormData(prev => ({
      ...prev,
      odooModules: prev.odooModules.includes(module)
        ? prev.odooModules.filter(m => m !== module)
        : [...prev.odooModules, module]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Quan tâm đến Cloud Odoo - Gói: ${formData.package}, Công ty: ${formData.company}, Users: ${formData.currentUsers}, Modules: ${formData.odooModules.join(', ')}`
        })
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Gửi thông tin thành công!",
        description: "Chuyên gia Odoo sẽ liên hệ tư vấn trong 2 giờ tới.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        currentUsers: '',
        odooModules: [],
        package: ''
      });
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại hoặc liên hệ hotline 0985.636.289",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section với Odoo branding */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-purple-800/10 via-transparent to-purple-600/10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Cloud Server Tối Ưu Cho Odoo –{" "}
                <span className="text-purple-300">Giải Pháp Hoàn Hảo Cho Doanh Nghiệp Của Bạn</span>
              </h1>
              
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-purple-200">
                Tăng Tốc Độ Kinh Doanh Với Cloud Server Chuyên Dụng Cho Odoo
              </h2>
              
              <p className="text-lg text-purple-100 mb-6 leading-relaxed">
                Bạn đang sử dụng Odoo để quản lý doanh nghiệp? Đừng để server truyền thống làm chậm lại quy trình của bạn! 
                Cloud Server của chúng tôi được thiết kế đặc biệt để chạy Odoo mượt mà, an toàn và linh hoạt. 
                Với hiệu suất cao, mở rộng dễ dàng và hỗ trợ 24/7, bạn có thể tập trung vào phát triển kinh doanh 
                thay vì lo lắng về hạ tầng.
              </p>
              
              <div className="bg-yellow-400 text-purple-900 px-6 py-3 rounded-lg font-bold text-lg inline-block mb-8">
                🎉 Bắt Đầu Ngay Hôm Nay – Thử Miễn Phí 14 Ngày!
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-purple-800 hover:bg-purple-50 font-semibold text-lg px-8 py-4"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Cloud className="mr-2" size={20} />
                  Đăng Ký Ngay
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-800 font-semibold text-lg px-8 py-4"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Phone className="mr-2" size={20} />
                  Liên Hệ Tư Vấn
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                    <div className="text-purple-200 text-sm">Uptime SLA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="text-purple-200 text-sm">Hỗ Trợ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">&lt;2s</div>
                    <div className="text-purple-200 text-sm">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">500+</div>
                    <div className="text-purple-200 text-sm">Odoo Projects</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Cloud Server for Odoo Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Tại Sao Doanh Nghiệp Cần Cloud Server Cho Odoo?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Odoo là nền tảng ERP mạnh mẽ, nhưng để khai thác tối đa, bạn cần một server đáng tin cậy. 
              Server truyền thống thường gặp vấn đề như:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-red-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Hiệu Suất Thấp</h3>
              <p className="text-gray-600 text-sm">
                Tốc độ chậm khi xử lý dữ liệu lớn hoặc nhiều người dùng đồng thời.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Chi Phí Cao</h3>
              <p className="text-gray-600 text-sm">
                Phải đầu tư phần cứng đắt đỏ và bảo trì định kỳ.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="text-red-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rủi Ro Bảo Mật</h3>
              <p className="text-gray-600 text-sm">
                Dễ bị tấn công nếu không có tường lửa chuyên dụng.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="text-red-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Khó Mở Rộng</h3>
              <p className="text-gray-600 text-sm">
                Không linh hoạt khi doanh nghiệp phát triển.
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700 font-semibold">
              Cloud Server của chúng tôi giải quyết tất cả những vấn đề này, giúp Odoo chạy 
              <span className="text-purple-600"> nhanh hơn, an toàn hơn và tiết kiệm chi phí hơn.</span>
            </p>
          </div>
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
              Lợi Ích Nổi Bật Khi Sử Dụng Cloud Server Của Chúng Tôi Cho Odoo
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Chúng tôi hiểu rõ yêu cầu đặc biệt của Odoo và đã tối ưu hóa hạ tầng cloud 
              để mang lại hiệu suất tốt nhất cho ứng dụng ERP quan trọng của bạn.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-4 mx-auto">
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

      {/* Odoo Modules Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Hỗ Trợ Đầy Đủ Các Module Odoo
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cloud hosting được tối ưu hóa cho tất cả các module Odoo phổ biến, 
              đảm bảo hiệu suất ổn định cho toàn bộ hệ sinh thái ERP của doanh nghiệp.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {odooModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-purple-200 hover:border-purple-400"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="text-purple-600" size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{module}</span>
                </div>
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
              Gói Dịch Vụ Phù Hợp Với Mọi Doanh Nghiệp
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chọn gói phù hợp với quy mô của bạn - Tất cả gói đều bao gồm hỗ trợ 24/7 và thử miễn phí 14 ngày!
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
                  pkg.popular ? 'ring-2 ring-purple-500 scale-105' : 'border border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Phổ Biến Nhất
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Gói {pkg.name}</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{pkg.price}</div>
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
                      ? 'bg-purple-600 hover:bg-purple-700' 
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
                🔒 Bảo Mật Cao Cấp - Bảo Vệ Tối Đa Cho Odoo
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Tích hợp hệ thống bảo mật nhiều lớp</strong> bao gồm <span className="text-red-600 font-semibold">WAF (Web Application Firewall)</span> và 
                <span className="text-red-600 font-semibold"> Firewall chuyên biệt</span>, dành riêng để bảo vệ ứng dụng Odoo khỏi các mối đe dọa như 
                <span className="text-red-600 font-semibold"> tấn công DDoS, SQL injection và các lỗ hổng web phổ biến</span>. 
                Kết hợp với <span className="text-blue-600 font-semibold">mã hóa dữ liệu và backup tự động hàng ngày</span> để bảo vệ dữ liệu kinh doanh quan trọng của bạn.
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
                  <span>SQL Injection Protection</span>
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
              Tính Năng Nổi Bật Của Cloud Server Cho Odoo
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Khám phá các tính năng được tối ưu hóa đặc biệt để đảm bảo Odoo của bạn 
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
                <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-semibold">Tính Năng</th>
                    <th className="px-6 py-4 text-left text-lg font-semibold">Mô Tả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Cài Đặt Nhanh Chóng</td>
                    <td className="px-6 py-4 text-gray-600">
                      Cài đặt Odoo chỉ trong 5 phút với template sẵn có. Hỗ trợ phiên bản Odoo 16, 17 và mới nhất.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Tích Hợp Đầy Đủ</td>
                    <td className="px-6 py-4 text-gray-600">
                      Kết nối dễ dàng với các module Odoo như CRM, ERP, E-commerce và Accounting.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Backup & Restore</td>
                    <td className="px-6 py-4 text-gray-600">
                      Backup tự động hàng ngày, khôi phục chỉ với một cú click.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">Monitoring 24/7</td>
                    <td className="px-6 py-4 text-gray-600">
                      Giám sát hiệu suất thời gian thực qua dashboard thân thiện.
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
                      Server đặt tại Việt Nam, Singapore hoặc EU để giảm độ trễ.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
              <Database className="text-purple-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Migration Miễn Phí</h3>
              <p className="text-gray-600 mb-4">
                Chuyển dữ liệu Odoo từ hosting cũ sang STEP Cloud hoàn toàn miễn phí, 
                đảm bảo không mất dữ liệu và downtime tối thiểu.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Backup toàn bộ database & files
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Test migration trên staging
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Rollback plan đầy đủ
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
              <Settings className="text-purple-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Customization Support</h3>
              <p className="text-gray-600 mb-4">
                Đội ngũ developer Odoo giàu kinh nghiệm hỗ trợ customize module, 
                tích hợp API và phát triển tính năng theo yêu cầu riêng.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Custom module development
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={14} />
                  Third-party integration
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
              <Headphones className="text-purple-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Expert Support</h3>
              <p className="text-gray-600 mb-4">
                Hỗ trợ kỹ thuật chuyên sâu về Odoo bởi team có hơn 5 năm kinh nghiệm 
                triển khai Odoo cho các doanh nghiệp tại Việt Nam.
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
              Tư Vấn Cloud Odoo Miễn Phí
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
            className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow-lg border border-purple-100"
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
                    placeholder="Nhập email"
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
                    placeholder="Nhập số điện thoại"
                    required
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
                    Số lượng users hiện tại
                  </label>
                  <Select value={formData.currentUsers} onValueChange={(value) => setFormData(prev => ({ ...prev, currentUsers: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn số lượng users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 users</SelectItem>
                      <SelectItem value="11-50">11-50 users</SelectItem>
                      <SelectItem value="51-100">51-100 users</SelectItem>
                      <SelectItem value="100+">Hơn 100 users</SelectItem>
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
                      <SelectItem value="Odoo Starter">Odoo Starter</SelectItem>
                      <SelectItem value="Odoo Business">Odoo Business</SelectItem>
                      <SelectItem value="Odoo Enterprise">Odoo Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Các module Odoo quan tâm (chọn nhiều)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {odooModules.map((module) => (
                    <button
                      key={module}
                      type="button"
                      onClick={() => handleModuleToggle(module)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm text-left ${
                        formData.odooModules.includes(module)
                          ? "border-purple-500 bg-purple-50 text-purple-900"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {module}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-lg py-4"
              >
                Gửi Yêu Cầu & Nhận Tư Vấn Miễn Phí
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </form>
          </motion.div>
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
              Tìm hiểu thêm thông tin về dịch vụ Cloud Server cho Odoo của chúng tôi
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
                  Cloud Server có tương thích với tất cả phiên bản Odoo không?
                </h3>
                <p className="text-gray-600">
                  Có, chúng tôi hỗ trợ từ Odoo 14 trở lên, bao gồm cả phiên bản Community và Enterprise.
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
                  Làm thế nào để di chuyển Odoo hiện tại sang cloud?
                </h3>
                <p className="text-gray-600">
                  Đội ngũ chúng tôi sẽ hỗ trợ miễn phí, đảm bảo không mất dữ liệu.
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

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn Sàng Nâng Cấp Odoo Của Bạn?
            </h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Đừng chờ đợi nữa! Đăng ký ngay hôm nay để trải nghiệm Cloud Server tối ưu cho Odoo. 
              Thử miễn phí 14 ngày mà không cam kết.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-800 hover:bg-purple-50 font-semibold text-lg px-8 py-4"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Cloud className="mr-2" size={20} />
                Đăng Ký Thử Miễn Phí
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-800 font-semibold text-lg px-8 py-4"
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