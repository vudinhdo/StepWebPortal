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
  Play
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
      icon: Cloud,
      title: "Cloud Hosting Tối Ưu Cho Odoo",
      description: "Hạ tầng được tối ưu hóa đặc biệt cho Odoo với PostgreSQL hiệu suất cao, Redis cache và CDN toàn cầu."
    },
    {
      icon: Shield,
      title: "Bảo Mật Doanh Nghiệp",
      description: "SSL/TLS mã hóa, backup tự động hàng ngày, firewall WAF và monitoring 24/7 bảo vệ dữ liệu Odoo."
    },
    {
      icon: Zap,
      title: "Hiệu Suất Vượt Trội",
      description: "SSD NVMe, RAM DDR4, CPU Intel Xeon mới nhất đảm bảo Odoo chạy mượt mà ngay cả với hàng nghìn users."
    },
    {
      icon: Users,
      title: "Hỗ Trợ Chuyên Gia Odoo",
      description: "Đội ngũ kỹ thuật am hiểu sâu Odoo, hỗ trợ migration, customization và troubleshooting 24/7."
    }
  ];

  const packages = [
    {
      name: "Odoo Starter",
      price: "2.500.000 VNĐ/tháng",
      suitable: "Phù hợp cho 5-20 users",
      popular: false,
      features: [
        "2 vCPU Intel Xeon",
        "4GB RAM DDR4",
        "50GB SSD NVMe",
        "PostgreSQL 14 tối ưu",
        "Backup tự động hàng ngày",
        "SSL miễn phí",
        "Hỗ trợ 12/7",
        "Migration Odoo miễn phí"
      ]
    },
    {
      name: "Odoo Business",
      price: "4.500.000 VNĐ/tháng",
      suitable: "Phù hợp cho 20-100 users",
      popular: true,
      features: [
        "4 vCPU Intel Xeon",
        "8GB RAM DDR4",
        "100GB SSD NVMe",
        "PostgreSQL + Redis Cache",
        "Backup tự động + snapshot",
        "CDN tích hợp",
        "Monitoring dashboard",
        "Hỗ trợ 24/7",
        "Customization support",
        "Load balancer"
      ]
    },
    {
      name: "Odoo Enterprise",
      price: "8.500.000 VNĐ/tháng",
      suitable: "Phù hợp cho 100+ users",
      popular: false,
      features: [
        "8 vCPU Intel Xeon",
        "16GB RAM DDR4",
        "200GB SSD NVMe",
        "Master-Slave PostgreSQL",
        "Redis Cluster",
        "Multi-region backup",
        "Advanced monitoring",
        "Dedicated support manager",
        "Custom development",
        "High availability 99.9%",
        "Disaster recovery"
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
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <Cloud className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-2">
                    Cloud <span className="text-purple-300">Odoo</span>
                  </h1>
                  <p className="text-purple-200 text-lg">Powered by STEP</p>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 leading-tight">
                Giải Pháp Cloud Hosting Chuyên Biệt Cho Odoo ERP
              </h2>
              
              <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                Hạ tầng cloud được tối ưu hóa đặc biệt cho Odoo với hiệu suất vượt trội, 
                bảo mật cấp doanh nghiệp và hỗ trợ chuyên gia 24/7. Giúp doanh nghiệp 
                triển khai Odoo nhanh chóng và vận hành ổn định.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-purple-800 hover:bg-purple-50 font-semibold text-lg px-8 py-4"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Tư Vấn Miễn Phí
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-800 font-semibold text-lg px-8 py-4"
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="mr-2" size={20} />
                  Xem Demo
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
              Tại Sao Chọn Cloud Odoo Từ STEP?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chúng tôi hiểu rõ yêu cầu đặc biệt của Odoo và đã tối ưu hóa hạ tầng cloud 
              để mang lại hiệu suất tốt nhất cho ứng dụng ERP quan trọng của bạn.
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
              Gói Cloud Odoo Phù Hợp Mọi Quy Mô
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Từ startup đến doanh nghiệp lớn, chúng tôi có gói dịch vụ phù hợp 
              với nhu cầu và ngân sách của mọi tổ chức.
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{pkg.price}</div>
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
      
      <Footer />
    </div>
  );
}