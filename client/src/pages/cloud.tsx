import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Cloud, 
  Server, 
  Cpu, 
  Zap, 
  Shield, 
  DollarSign, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star,
  Phone,
  Database,
  Monitor,
  Settings,
  Package,
  TrendingUp,
  AlertTriangle,
  Clock,
  Lock,
  ChevronRight,
  Check,
  HardDrive
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "../components/header";
import Footer from "../components/footer";
import ServerConfigurator from "@/components/server-configurator";

export default function CloudPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    cloudType: '',
    package: ''
  });
  const { toast } = useToast();

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
          message: `Quan tâm đến Cloud Services - Loại: ${formData.cloudType}, Gói: ${formData.package}, Công ty: ${formData.company}`
        })
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Gửi thông tin thành công!",
        description: "Chuyên gia Cloud sẽ liên hệ tư vấn trong 2 giờ tới.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        cloudType: '',
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

  const benefits = [
    {
      icon: Zap,
      title: "Hiệu Suất Vượt Trội",
      description: "Cloud GPU/AMD xử lý AI và dữ liệu lớn với tốc độ lightning-fast. Cloud Server hỗ trợ Kubernetes cho DevOps hiện đại, Cloud N8N tự động hóa workflow phức tạp – lý tưởng cho SMEs cần scale nhanh mà không cần đầu tư hạ tầng đắt đỏ."
    },
    {
      icon: TrendingUp,
      title: "Mở Rộng Linh Hoạt",
      description: "Auto-scaling thông minh theo nhu cầu thực tế. Tăng giảm tài nguyên trong vài phút với zero-downtime, hoàn hảo cho doanh nghiệp có lưu lượng biến động hoặc đang trong giai đoạn tăng trưởng mạnh."
    },
    {
      icon: Shield,
      title: "Bảo Mật Nhiều Lớp",
      description: "Tích hợp WAF, DDoS protection, SSL certificates và backup tự động hàng ngày. Tuân thủ các tiêu chuẩn bảo mật quốc tế với monitoring 24/7 và incident response nhanh chóng."
    },
    {
      icon: DollarSign,
      title: "Chi Phí Tối Ưu",
      description: "Pay-as-you-use model giúp tiết kiệm 40-60% so với infrastructure truyền thống. Không phí setup, transparent pricing, và có thể kết hợp với các dịch vụ khác của STEP."
    },
    {
      icon: Users,
      title: "Hỗ Trợ Chuyên Sâu",
      description: "Đội ngũ cloud architects và DevOps engineers hỗ trợ 24/7. Migration miễn phí, consultation và optimization liên tục để đảm bảo hiệu suất tối đa."
    },
    {
      icon: Clock,
      title: "SLA 99.99%",
      description: "Uptime được đảm bảo với redundant infrastructure, automatic failover và disaster recovery plan. Business continuity là ưu tiên hàng đầu của chúng tôi."
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "899.000 VNĐ/tháng",
      suitable: "Phù hợp startup và doanh nghiệp nhỏ",
      popular: false,
      specs: "2 vCPU, 4GB RAM, 50GB SSD",
      features: [
        "Cloud Server cơ bản",
        "Docker & Kubernetes support",
        "Backup tự động hàng ngày",
        "SSL certificates miễn phí",
        "Basic monitoring",
        "Support 24/7",
        "API access",
        "Migration assistance",
        "Thử miễn phí 7 ngày"
      ]
    },
    {
      name: "Professional",
      price: "1.899.000 VNĐ/tháng",
      suitable: "Lý tưởng cho doanh nghiệp vừa với nhu cầu AI/ML",
      popular: true,
      specs: "4 vCPU, 8GB RAM, 100GB SSD + GPU",
      features: [
        "Cloud GPU/AMD dedicated",
        "Workflow automation (N8N)",
        "Advanced monitoring & alerting",
        "CDN tích hợp",
        "Load balancer",
        "Priority support",
        "Custom integrations",
        "Security hardening",
        "Migration miễn phí",
        "Thử miễn phí 14 ngày"
      ]
    },
    {
      name: "Enterprise",
      price: "3.999.000 VNĐ/tháng",
      suitable: "Dành cho tập đoàn lớn, multi-cloud strategy",
      popular: false,
      specs: "8 vCPU, 32GB RAM, 500GB SSD + Multi-GPU",
      features: [
        "Multi-cloud deployment",
        "Cloud Odoo + AI integration",
        "Custom development",
        "Dedicated support manager",
        "Advanced security & compliance",
        "Disaster recovery",
        "High availability 99.99%",
        "Multi-region backup",
        "White-glove migration",
        "POC miễn phí 30 ngày"
      ]
    }
  ];

  const cloudTypes = [
    "Cloud Server",
    "Cloud GPU", 
    "Cloud Odoo",
    "Cloud N8N (Automation)",
    "Multi-Cloud Strategy",
    "Hybrid Cloud"
  ];

  const problemsTraditional = [
    {
      icon: TrendingUp,
      title: "Chi Phí Đầu Tư Cao",
      description: "Phải mua server, thiết bị mạng đắt đỏ và thuê nhân sự IT chuyên biệt để vận hành."
    },
    {
      icon: AlertTriangle,
      title: "Khó Mở Rộng",
      description: "Khi cần tăng capacity phải mua thêm hardware, installation phức tạp và mất thời gian."
    },
    {
      icon: Lock,
      title: "Rủi Ro Bảo Mật",
      description: "Tự quản lý security patches, firewall rules mà không có expertise chuyên sâu."
    },
    {
      icon: Settings,
      title: "Maintenance Phức Tạp",
      description: "Phải tự handle hardware failures, software updates và performance optimization."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section với Cloud branding */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-800/10 via-transparent to-indigo-600/10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Giải Pháp Cloud Linh Hoạt –{" "}
                <span className="text-blue-300">Xây Dựng Hạ Tầng Mạnh Mẽ</span>{" "}
                Cho Doanh Nghiệp Hiện Đại
              </h1>
              
              <h2 className="text-xl md:text-2xl font-semibold mb-6 text-blue-200">
                Tăng Tốc Kinh Doanh Với Cloud Infrastructure Tối Ưu
              </h2>
              
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                Bạn đang tìm kiếm giải pháp cloud đáng tin cậy? STEP Cloud cung cấp Cloud GPU, Cloud Server, 
                Cloud Odoo và Cloud N8N với Kubernetes support và workflow automation. Hiệu suất cao, 
                bảo mật nhiều lớp, chi phí tối ưu – hoàn hảo cho SMEs và enterprise cần scale nhanh!
              </p>
              
              <div className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold text-lg inline-block mb-8">
                🚀 Bắt Đầu Ngay Hôm Nay – Thử Miễn Phí 7-30 Ngày!
              </div>
              
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
                    <div className="text-3xl font-bold text-white mb-2">99.99%</div>
                    <div className="text-blue-200 text-sm">Uptime SLA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="text-blue-200 text-sm">Expert Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">&lt;1s</div>
                    <div className="text-blue-200 text-sm">API Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">1000+</div>
                    <div className="text-blue-200 text-sm">Cloud Projects</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Cloud Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Tại Sao Doanh Nghiệp Cần Chuyển Sang Cloud?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Infrastructure truyền thống đang trở thành bottleneck cho sự phát triển của doanh nghiệp. 
              Hạ tầng on-premise thường gặp những vấn đề như:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {problemsTraditional.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <problem.icon className="text-red-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{problem.title}</h3>
                <p className="text-gray-600 text-sm">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700 font-semibold">
              STEP Cloud giải quyết tất cả những vấn đề này, giúp doanh nghiệp 
              <span className="text-blue-600"> vận hành hiệu quả hơn, an toàn hơn và tiết kiệm chi phí hơn.</span>
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
              Lợi Ích Nổi Bật Khi Sử Dụng STEP Cloud Services
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Chúng tôi hiểu rõ thách thức của doanh nghiệp hiện đại và đã thiết kế cloud infrastructure 
              để tối ưu hiệu suất, bảo mật và cost-effectiveness cho business growth.
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
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-blue-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4 mx-auto">
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

      {/* Cloud Services Types Section */}
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
              Đa Dạng Cloud Services Cho Mọi Nhu Cầu
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Từ Cloud Server cơ bản đến AI/ML với Cloud GPU, workflow automation với N8N 
              hay enterprise ERP với Cloud Odoo – chúng tôi có giải pháp cho mọi use case.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cloudTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all border border-blue-200 hover:border-blue-400"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Cloud className="text-blue-600" size={20} />
                  </div>
                  <span className="font-medium text-gray-700">{type}</span>
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
              Chọn gói phù hợp với quy mô của bạn - Tất cả gói đều bao gồm migration support và trial period!
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

      {/* Contact Form Section */}
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
              Bắt Đầu Hành Trình Cloud Transformation
            </h2>
            <p className="text-lg text-gray-600">
              Để lại thông tin để nhận tư vấn miễn phí từ cloud experts của STEP
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-lg border border-blue-200">
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
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full"
                      placeholder="Nhập họ và tên"
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
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full"
                      placeholder="email@company.com"
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
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full"
                      placeholder="0985.636.289"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Công ty
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full"
                      placeholder="Tên công ty"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại Cloud Services quan tâm
                    </label>
                    <Select value={formData.cloudType} onValueChange={(value) => setFormData({...formData, cloudType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại dịch vụ" />
                      </SelectTrigger>
                      <SelectContent>
                        {cloudTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gói dịch vụ quan tâm
                    </label>
                    <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn gói" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.name} value={pkg.name}>{pkg.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg"
                >
                  Gửi Yêu Cầu Tư Vấn
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Security Highlight Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-start gap-6"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="text-blue-600" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🔒 Bảo Mật Enterprise-Grade - An Toàn Tuyệt Đối Cho Cloud Infrastructure
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Hệ thống bảo mật nhiều lớp</strong> bao gồm <span className="text-blue-600 font-semibold">WAF (Web Application Firewall)</span> và 
                <span className="text-blue-600 font-semibold"> DDoS Protection</span> chuyên dụng. Tích hợp SSL certificates tự động, 
                network monitoring 24/7, và compliance với các chuẩn bảo mật quốc tế. 
                <span className="text-blue-600 font-semibold">Backup tự động hàng ngày</span> với geo-redundancy 
                đảm bảo business continuity tuyệt đối.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn Sàng Transform Digital Infrastructure?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Hãy để STEP Cloud đồng hành cùng bạn trong hành trình số hóa. 
              Migration miễn phí + Tư vấn 24/7 + Trial period lên đến 30 ngày!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 font-semibold"
              >
                Bắt Đầu Ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 font-semibold"
                onClick={() => window.location.href = '/contact'}
              >
                <Phone className="mr-2 h-5 w-5" />
                Hotline: 0985.636.289
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Migration miễn phí
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Tư vấn chuyên sâu
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Trial 7-30 ngày
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Server Configuration Section */}
      <section id="server-configurator" className="py-20 bg-gray-50">
        <ServerConfigurator />
      </section>

      <Footer />
    </div>
  );
}