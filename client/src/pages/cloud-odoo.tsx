import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Shield, 
  Server, 
  Users, 
  Check, 
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
  Phone,
  TrendingUp,
  Lock,
  CheckCircle,
  Cpu,
  ShoppingCart,
  BarChart3,
  Warehouse,
  Factory,
  UserCog,
  FolderKanban,
  ShoppingBag,
  Layout,
  Store,
  Megaphone,
  Receipt,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServerConfigurator from "@/components/server-configurator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      title: "Hiệu Suất Tối Ưu",
      description: "CPU Intel Xeon, RAM DDR4, SSD NVMe đảm bảo Odoo tải trang trong < 2 giây",
      highlight: "Response < 2s"
    },
    {
      icon: TrendingUp,
      title: "Mở Rộng Linh Hoạt",
      description: "Tăng giảm tài nguyên chỉ với vài click, lý tưởng cho doanh nghiệp đang phát triển",
      highlight: "Scale tức thì"
    },
    {
      icon: Shield,
      title: "Bảo Mật Cao Cấp",
      description: "WAF, DDoS Protection, Firewall chuyên biệt bảo vệ dữ liệu kinh doanh 24/7",
      highlight: "WAF + DDoS Shield"
    },
    {
      icon: Users,
      title: "Hỗ Trợ Chuyên Sâu",
      description: "Đội ngũ chuyên gia Odoo 5+ năm kinh nghiệm, hỗ trợ 24/7 tiếng Việt",
      highlight: "Expert 24/7"
    },
    {
      icon: Database,
      title: "Backup Tự Động",
      description: "Backup hàng ngày, lưu trữ 30 ngày, khôi phục 1-click không mất dữ liệu",
      highlight: "30 days retention"
    },
    {
      icon: Clock,
      title: "Uptime 99.99%",
      description: "SLA cam kết, bồi thường nếu không đạt - đảm bảo kinh doanh liên tục",
      highlight: "SLA bồi thường"
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "500.000",
      priceUnit: "VNĐ/tháng",
      suitable: "Startup, doanh nghiệp nhỏ",
      popular: false,
      specs: {
        cpu: "2 vCPU Intel Xeon",
        ram: "4GB DDR4",
        ssd: "50GB NVMe",
        users: "Đến 10 users"
      },
      features: [
        "PostgreSQL tối ưu",
        "Backup tự động hàng ngày",
        "SSL Let's Encrypt",
        "Hỗ trợ 24/7",
        "Migration miễn phí"
      ],
      cta: "Bắt Đầu Ngay"
    },
    {
      name: "Business",
      price: "1.200.000",
      priceUnit: "VNĐ/tháng",
      suitable: "Doanh nghiệp vừa, đang phát triển",
      popular: true,
      specs: {
        cpu: "4 vCPU Intel Xeon",
        ram: "8GB DDR4",
        ssd: "100GB NVMe",
        users: "Đến 50 users"
      },
      features: [
        "PostgreSQL + Redis Cache",
        "Backup + Snapshot",
        "CDN tích hợp",
        "Monitoring dashboard",
        "Load balancer",
        "Priority support"
      ],
      cta: "Chọn Gói Này"
    },
    {
      name: "Enterprise",
      price: "2.500.000",
      priceUnit: "VNĐ/tháng",
      suitable: "Tập đoàn lớn, multi-company",
      popular: false,
      specs: {
        cpu: "8 vCPU Intel Xeon",
        ram: "16GB DDR4",
        ssd: "200GB NVMe",
        users: "Unlimited users"
      },
      features: [
        "PostgreSQL + Redis Cluster",
        "Multi-region backup",
        "Advanced monitoring",
        "Dedicated support manager",
        "Custom development",
        "High availability 99.99%"
      ],
      cta: "Liên Hệ Tư Vấn"
    }
  ];

  const odooModules = [
    { name: "CRM", desc: "Quản lý khách hàng", icon: Users },
    { name: "Sales", desc: "Bán hàng", icon: ShoppingCart },
    { name: "Accounting", desc: "Kế toán", icon: Receipt },
    { name: "Inventory", desc: "Kho bãi", icon: Warehouse },
    { name: "Manufacturing", desc: "Sản xuất", icon: Factory },
    { name: "HR", desc: "Nhân sự", icon: UserCog },
    { name: "Project", desc: "Quản lý dự án", icon: FolderKanban },
    { name: "Purchase", desc: "Mua hàng", icon: ShoppingBag },
    { name: "Website", desc: "Website builder", icon: Layout },
    { name: "eCommerce", desc: "Thương mại điện tử", icon: Store },
    { name: "POS", desc: "Bán lẻ", icon: Monitor },
    { name: "Marketing", desc: "Marketing tự động", icon: Megaphone }
  ];

  const faqs = [
    {
      question: "Cloud Server có tương thích với tất cả phiên bản Odoo không?",
      answer: "Có, chúng tôi hỗ trợ từ Odoo 14 trở lên, bao gồm cả phiên bản Community và Enterprise. Đội ngũ kỹ thuật sẽ hỗ trợ cài đặt và tối ưu hóa phiên bản phù hợp với nhu cầu của bạn."
    },
    {
      question: "Làm thế nào để di chuyển Odoo hiện tại sang cloud?",
      answer: "Đội ngũ chúng tôi sẽ hỗ trợ migration miễn phí. Quy trình bao gồm: backup toàn bộ database & files, test migration trên staging environment, và go-live với downtime tối thiểu (<30 phút)."
    },
    {
      question: "Có cam kết uptime không? Bồi thường như thế nào?",
      answer: "Chúng tôi cam kết 99.99% uptime với SLA rõ ràng. Nếu uptime dưới 99.9%, bạn sẽ được bồi thường 10% giá trị tháng. Dưới 99%, bồi thường 30%. Dưới 95%, hoàn tiền 100%."
    },
    {
      question: "Phương thức thanh toán nào được chấp nhận?",
      answer: "Chúng tôi chấp nhận: Chuyển khoản ngân hàng (VAT invoice), Thẻ tín dụng/ghi nợ (Visa, Mastercard), Ví điện tử (Momo, VNPay, ZaloPay). Thanh toán theo tháng hoặc năm (giảm 15%)."
    },
    {
      question: "Có thể nâng cấp gói dịch vụ sau khi đăng ký không?",
      answer: "Có, bạn có thể nâng cấp bất cứ lúc nào. Việc nâng cấp được thực hiện trong vòng 30 phút mà không làm gián đoạn hoạt động của Odoo. Phí sẽ được tính theo tỷ lệ ngày còn lại trong tháng."
    }
  ];

  const handleModuleToggle = (moduleName: string) => {
    setFormData(prev => ({
      ...prev,
      odooModules: prev.odooModules.includes(moduleName)
        ? prev.odooModules.filter(m => m !== moduleName)
        : [...prev.odooModules, moduleName]
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
      
      {/* Hero Section - Modern Odoo Branding */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-violet-950 via-purple-900 to-violet-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Odoo Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full flex items-center justify-center">
                  <Package className="w-3 h-3 text-white" />
                </div>
                <span className="text-purple-200 text-sm font-medium">Odoo Cloud Infrastructure</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Cloud Odoo{" "}
                <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-purple-400 bg-clip-text text-transparent">
                  Tối Ưu Cho Doanh Nghiệp
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-purple-100 mb-6 leading-relaxed">
                Hạ tầng cloud được thiết kế chuyên biệt cho Odoo ERP. Hiệu suất cao, bảo mật tuyệt đối, 
                mở rộng linh hoạt - Giúp doanh nghiệp tập trung vào phát triển kinh doanh.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="bg-green-500/20 border border-green-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-green-300">
                  ✓ Odoo 14 - 17 Support
                </div>
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-blue-300">
                  ✓ Community & Enterprise
                </div>
                <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-yellow-300">
                  ⭐ 500+ Projects Deployed
                </div>
              </div>

              {/* Promo Banner */}
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-yellow-900" />
                  </div>
                  <div>
                    <div className="font-bold text-yellow-300">Thử Miễn Phí 14 Ngày</div>
                    <div className="text-sm text-yellow-200/80">Migration miễn phí + Hỗ trợ setup toàn diện</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-purple-50 font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-white/20"
                  onClick={() => document.getElementById('odoo-packages')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-view-packages"
                >
                  <Package className="mr-2 w-5 h-5" />
                  Xem Gói Dịch Vụ
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-contact"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Tư Vấn Miễn Phí
                </Button>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white/5 rounded-2xl">
                    <div className="text-4xl font-bold text-white mb-2">99.99%</div>
                    <div className="text-purple-200 text-sm">Uptime SLA</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-2xl">
                    <div className="text-4xl font-bold text-white mb-2">24/7</div>
                    <div className="text-purple-200 text-sm">Hỗ Trợ Kỹ Thuật</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-2xl">
                    <div className="text-4xl font-bold text-white mb-2">&lt;2s</div>
                    <div className="text-purple-200 text-sm">Page Load Time</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-2xl">
                    <div className="text-4xl font-bold text-white mb-2">500+</div>
                    <div className="text-purple-200 text-sm">Odoo Projects</div>
                  </div>
                </div>

                {/* Feature Pills */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-xs">NVMe SSD</span>
                  <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-xs">PostgreSQL</span>
                  <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-xs">Redis Cache</span>
                  <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-xs">CDN</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn STEP Cloud Cho Odoo?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hạ tầng được tối ưu hóa đặc biệt cho Odoo ERP, đảm bảo hiệu suất tốt nhất cho doanh nghiệp
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-purple-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <benefit.icon className="text-white w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {benefit.description}
                    </p>
                    <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {benefit.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Odoo Modules Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hỗ Trợ Đầy Đủ Các Module Odoo
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tối ưu hóa cho tất cả module Odoo phổ biến, đảm bảo hiệu suất ổn định cho toàn bộ hệ sinh thái ERP
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {odooModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 hover:from-purple-100 hover:to-violet-100 transition-all border border-purple-100 hover:border-purple-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <module.icon className="text-purple-600 w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{module.name}</div>
                    <div className="text-xs text-gray-500">{module.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="odoo-packages" className="py-20 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Gói Dịch Vụ Cloud Odoo
            </h2>
            <p className="text-lg text-purple-200 max-w-3xl mx-auto">
              Chọn gói phù hợp với quy mô doanh nghiệp - Tất cả đều bao gồm hỗ trợ 24/7 và thử miễn phí 14 ngày
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
                className={`relative rounded-2xl p-8 ${
                  pkg.popular 
                    ? 'bg-gradient-to-br from-purple-600 to-violet-700 ring-4 ring-purple-400/50 scale-105' 
                    : 'bg-white/10 backdrop-blur-sm border border-white/20'
                }`}
                data-testid={`card-package-${pkg.name.toLowerCase()}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      PHỔ BIẾN NHẤT
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Gói {pkg.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                    <span className="text-purple-200">{pkg.priceUnit}</span>
                  </div>
                  <p className="text-sm text-purple-200">{pkg.suitable}</p>
                </div>

                {/* Specs */}
                <div className="bg-white/10 rounded-xl p-4 mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Cpu className="w-4 h-4 text-purple-300" />
                    <span>{pkg.specs.cpu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HardDrive className="w-4 h-4 text-purple-300" />
                    <span>{pkg.specs.ram} | {pkg.specs.ssd}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-300" />
                    <span>{pkg.specs.users}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="text-green-400 mr-2 flex-shrink-0 w-4 h-4" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, package: pkg.name }));
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-6 text-lg font-semibold rounded-xl ${
                    pkg.popular 
                      ? 'bg-white text-purple-900 hover:bg-purple-50' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                  data-testid={`button-select-${pkg.name.toLowerCase()}`}
                >
                  {pkg.cta}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Highlight */}
      <section className="py-16 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="text-red-600 w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🔒 Bảo Mật Cao Cấp - Bảo Vệ Tối Đa Cho Odoo
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Tích hợp hệ thống bảo mật nhiều lớp bao gồm <span className="text-red-600 font-semibold">WAF (Web Application Firewall)</span> và 
                  <span className="text-red-600 font-semibold"> Firewall chuyên biệt</span>, bảo vệ Odoo khỏi 
                  <span className="text-red-600 font-semibold"> tấn công DDoS, SQL injection</span> và các lỗ hổng web. 
                  Kết hợp với <span className="text-blue-600 font-semibold">mã hóa dữ liệu và backup tự động hàng ngày</span>.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">WAF Protection</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">DDoS Shield</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">SSL/TLS</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">Daily Backup</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Migration & Hỗ Trợ Chuyên Nghiệp
            </h2>
            <p className="text-lg text-gray-600">
              Đội ngũ chuyên gia Odoo đồng hành cùng bạn từ triển khai đến vận hành
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100"
            >
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Database className="text-white w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Migration Miễn Phí</h3>
              <p className="text-gray-600 mb-6">
                Chuyển dữ liệu Odoo từ hosting cũ sang STEP Cloud hoàn toàn miễn phí, downtime &lt; 30 phút.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="text-green-500 mr-2 w-4 h-4" />
                  Backup toàn bộ database & files
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="text-green-500 mr-2 w-4 h-4" />
                  Test migration trên staging
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="text-green-500 mr-2 w-4 h-4" />
                  Rollback plan đầy đủ
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Settings className="text-white w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Development</h3>
              <p className="text-gray-600 mb-6">
                Đội ngũ developer Odoo giàu kinh nghiệm hỗ trợ customize module theo yêu cầu riêng.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="text-green-500 mr-2 w-4 h-4" />
                  Custom module development
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="text-green-500 mr-2 w-4 h-4" />
                  Third-party integration
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="text-green-500 mr-2 w-4 h-4" />
                  Performance optimization
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100"
            >
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Headphones className="text-white w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Expert Support</h3>
              <p className="text-gray-600 mb-6">
                Hỗ trợ kỹ thuật chuyên sâu bởi team 5+ năm kinh nghiệm triển khai Odoo.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="text-green-500 mr-2 w-4 h-4" />
                  Hotline: 0985.636.289
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="text-green-500 mr-2 w-4 h-4" />
                  Live chat & Zalo OA
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="text-green-500 mr-2 w-4 h-4" />
                  Remote support TeamViewer
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-purple-900 via-violet-900 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tư Vấn Cloud Odoo Miễn Phí
            </h2>
            <p className="text-lg text-purple-200">
              Để lại thông tin để nhận tư vấn chi tiết và báo giá tối ưu cho doanh nghiệp
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
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
                    placeholder="Nhập email"
                    required
                    className="w-full"
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
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Nhập số điện thoại"
                    required
                    className="w-full"
                    data-testid="input-phone"
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
                    data-testid="input-company"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng users hiện tại
                  </label>
                  <Select value={formData.currentUsers} onValueChange={(value) => setFormData(prev => ({ ...prev, currentUsers: value }))}>
                    <SelectTrigger className="w-full" data-testid="select-users">
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
                    <SelectTrigger className="w-full" data-testid="select-package">
                      <SelectValue placeholder="Chọn gói dịch vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Starter">Gói Starter</SelectItem>
                      <SelectItem value="Business">Gói Business</SelectItem>
                      <SelectItem value="Enterprise">Gói Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Các module Odoo quan tâm (chọn nhiều)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {odooModules.map((module) => (
                    <button
                      key={module.name}
                      type="button"
                      onClick={() => handleModuleToggle(module.name)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm text-left ${
                        formData.odooModules.includes(module.name)
                          ? "border-purple-500 bg-purple-50 text-purple-900"
                          : "border-gray-200 hover:border-purple-300 text-gray-700 bg-gray-50"
                      }`}
                      data-testid={`module-${module.name.toLowerCase()}`}
                    >
                      <module.icon className={`w-4 h-4 ${formData.odooModules.includes(module.name) ? 'text-purple-600' : 'text-gray-400'}`} />
                      <span className="font-medium">{module.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold text-lg py-6 rounded-xl"
                data-testid="button-submit"
              >
                Gửi Yêu Cầu & Nhận Tư Vấn Miễn Phí
                <ArrowRight className="ml-2 w-5 h-5" />
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg text-gray-600">
              Tìm hiểu thêm về dịch vụ Cloud Server cho Odoo
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-xl border border-gray-200 px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-violet-950 via-purple-900 to-violet-800 text-white">
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
            <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
              Đừng chờ đợi! Đăng ký ngay để trải nghiệm Cloud Server tối ưu cho Odoo. 
              Thử miễn phí 14 ngày mà không cần cam kết.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-900 hover:bg-purple-50 font-semibold text-lg px-8 py-6 rounded-xl"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Cloud className="mr-2 w-5 h-5" />
                Đăng Ký Thử Miễn Phí
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-xl"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Phone className="mr-2 w-5 h-5" />
                Liên Hệ Tư Vấn
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Server Configurator Section */}
      <section id="server-configurator" className="bg-gray-950">
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
            Cấu Hình Cloud Server Cho Odoo
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Tùy chỉnh cấu hình server theo nhu cầu Odoo của doanh nghiệp
          </p>
        </div>
        <div className="bg-gray-50 rounded-t-3xl">
          <div className="py-12">
            <ServerConfigurator />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
