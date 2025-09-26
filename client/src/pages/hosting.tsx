import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Server, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Clock,
  Users,
  Star,
  X,
  Database,
  Cpu,
  HardDrive,
  Gauge,
  Award,
  TrendingUp,
  Rocket,
  Crown,
  Diamond
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerformanceBenchmark from "@/components/performance-benchmark";
import EmailPopup from "@/components/email-popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Hosting() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  
  // Color mappings for dynamic Tailwind classes
  const colorClasses = {
    blue: "border-blue-400",
    green: "border-green-400", 
    purple: "border-purple-400",
    orange: "border-orange-400",
    cyan: "border-cyan-400",
    pink: "border-pink-400"
  };



  const benefits = [
    {
      icon: Zap,
      title: "Tốc Độ Siêu Nhanh",
      description: "NVMe SSD với tốc độ đọc/ghi lên đến 3,500 MB/s, CloudFlare CDN toàn cầu, PHP 8.3 tối ưu, cache Redis/Memcached - giúp website load dưới 0.5 giây.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Bảo Mật Toàn Diện", 
      description: "Firewall Web Application (WAF), DDoS Protection 100Gbps, SSL Let's Encrypt miễn phí, malware scanner tự động, backup 3 bản mỗi ngày.",
      gradient: "from-green-400 to-blue-500"
    },
    {
      icon: Globe,
      title: "Dễ Dàng Quản Lý",
      description: "cPanel/DirectAdmin/aPanel tùy chọn, 1-click install 400+ apps (WordPress, Laravel, WooCommerce), staging environment, Git deployment.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Database,
      title: "Hiệu Suất Vượt Trội",
      description: "LiteSpeed Enterprise, HTTP/3, Brotli compression, MariaDB 10.6, PHP OPcache, resource limits linh hoạt theo nhu cầu doanh nghiệp.",
      gradient: "from-blue-400 to-cyan-500"
    }
  ];

  const hostingPackages = [
    {
      name: "Starter",
      subtitle: "Khởi đầu hoàn hảo",
      price: 79000,
      originalPrice: 99000,
      description: "Lý tưởng cho website cá nhân & blog",
      icon: Rocket,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      specs: {
        storage: "10GB NVMe SSD",
        bandwidth: "100GB",
        domains: "1 tên miền",
        email: "5 tài khoản email",
        databases: "2 MySQL databases",
        cpu: "1 CPU Core",
        ram: "1GB RAM"
      },
      features: [
        "SSL miễn phí Let's Encrypt",
        "cPanel control panel",
        "WordPress/Joomla 1-click install",
        "Daily backup",
        "24/7 support",
        "CloudFlare CDN",
        "DDoS Protection Basic"
      ],
      suitable: "Blog cá nhân, portfolio",
      popular: false
    },
    {
      name: "Business",
      subtitle: "Dành cho doanh nghiệp nhỏ",
      price: 149000,
      originalPrice: 199000, 
      description: "Tối ưu cho website doanh nghiệp",
      icon: TrendingUp,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      specs: {
        storage: "25GB NVMe SSD",
        bandwidth: "300GB",
        domains: "5 tên miền",
        email: "25 tài khoản email",
        databases: "10 MySQL databases",
        cpu: "2 CPU Cores",
        ram: "2GB RAM"
      },
      features: [
        "Tất cả tính năng Starter",
        "LiteSpeed Enterprise",
        "Redis Cache",
        "Staging environment",
        "WooCommerce optimized",
        "Advanced security",
        "Priority support"
      ],
      suitable: "SMEs, eCommerce nhỏ",
      popular: true
    },
    {
      name: "Professional",
      subtitle: "Chuyên nghiệp & mạnh mẽ",
      price: 249000,
      originalPrice: 329000,
      description: "Hiệu suất cao cho traffic lớn", 
      icon: Award,
      color: "purple",
      gradient: "from-purple-500 to-violet-500",
      specs: {
        storage: "50GB NVMe SSD",
        bandwidth: "500GB",
        domains: "15 tên miền",
        email: "100 tài khoản email",
        databases: "25 MySQL databases",
        cpu: "4 CPU Cores",
        ram: "4GB RAM"
      },
      features: [
        "Tất cả tính năng Business",
        "HTTP/3 & Brotli compression",
        "Multiple PHP versions",
        "Git deployment",
        "Advanced cache (Redis + Memcached)",
        "Malware protection",
        "Performance monitoring"
      ],
      suitable: "Website traffic cao, agencies",
      popular: false
    },
    {
      name: "Enterprise",
      subtitle: "Giải pháp doanh nghiệp",
      price: 399000,
      originalPrice: 529000,
      description: "Sức mạnh enterprise cho mọi thách thức",
      icon: Crown,
      color: "orange",
      gradient: "from-orange-500 to-red-500",
      specs: {
        storage: "100GB NVMe SSD",
        bandwidth: "1TB",
        domains: "Unlimited",
        email: "Unlimited",
        databases: "Unlimited",
        cpu: "6 CPU Cores", 
        ram: "8GB RAM"
      },
      features: [
        "Tất cả tính năng Professional",
        "Dedicated IP",
        "Custom server configurations",
        "Advanced monitoring & alerts",
        "White-label control panel",
        "Multi-datacenter backup",
        "Dedicated account manager"
      ],
      suitable: "Enterprise, reseller hosting",
      popular: false
    },
    {
      name: "Ultra",
      subtitle: "Hiệu suất tối đa",
      price: 699000, 
      originalPrice: 899000,
      description: "Sức mạnh khủng cho ứng dụng web phức tạp",
      icon: Zap,
      color: "cyan",
      gradient: "from-cyan-500 to-blue-600",
      specs: {
        storage: "200GB NVMe SSD",
        bandwidth: "2TB",
        domains: "Unlimited",
        email: "Unlimited", 
        databases: "Unlimited",
        cpu: "8 CPU Cores",
        ram: "16GB RAM"
      },
      features: [
        "Tất cả tính năng Enterprise",
        "NVMe Raid 10 configuration",
        "Container technology",
        "Load balancer integration",
        "Custom PHP extensions",
        "24/7 server monitoring",
        "Migration service included"
      ],
      suitable: "High-traffic applications, SaaS",
      popular: false
    },
    {
      name: "Platinum",
      subtitle: "Đỉnh cao hosting",
      price: 1299000,
      originalPrice: 1699000, 
      description: "Giải pháp hosting đỉnh cao không giới hạn",
      icon: Diamond,
      color: "pink",
      gradient: "from-pink-500 to-purple-600",
      specs: {
        storage: "500GB NVMe SSD",
        bandwidth: "Unlimited",
        domains: "Unlimited",
        email: "Unlimited",
        databases: "Unlimited", 
        cpu: "12 CPU Cores",
        ram: "32GB RAM"
      },
      features: [
        "Tất cả tính năng Ultra",
        "Guaranteed 99.99% uptime",
        "Private cloud infrastructure",
        "Custom development support",
        "Advanced analytics dashboard",
        "Enterprise SLA",
        "White-glove migration"
      ],
      suitable: "Large enterprises, mission-critical apps",
      popular: false
    }
  ];

  const testimonials = [
    {
      text: "Hosting STEP đã tăng tốc website chúng tôi 400%, conversion rate tăng 25%! Support 24/7 tuyệt vời.",
      author: "Chị M., CEO eCommerce Fashion Brand",
      company: "FashionVN",
      rating: 5
    },
    {
      text: "Migration từ hosting cũ sang STEP chỉ mất 2 giờ, zero downtime. Control panel rất dễ sử dụng!",
      author: "Anh T., CTO",
      company: "TechStartup Hanoi", 
      rating: 5
    }
  ];


  const packageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      {/* Hero Section với Particle Effects */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
              initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center mb-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <Server className="text-white w-6 h-6" />
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2">
                  🚀 Next-Gen Hosting Platform
                </Badge>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Hosting Siêu Tốc
                </span>
                <br />
                Nền Tảng Website 
                <span className="text-orange-600"> Thế Hệ Mới!</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                🔥 <strong>6 gói hosting</strong> từ cơ bản đến enterprise với <strong>NVMe SSD siêu nhanh</strong>, 
                bảo mật AI-powered, backup tự động. 
                <span className="text-blue-600 font-semibold">Tăng 400% hiệu suất website</span> của bạn ngay hôm nay!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-check-hosting-packages"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Khám Phá 6 Gói Hosting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg transition-all duration-300"
                  onClick={() => window.location.href = '/contact'}
                  data-testid="button-hosting-consultation"
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 space-x-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>30 ngày hoàn tiền</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Migration miễn phí</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* 3D Dashboard Preview */}
              <div className="relative transform perspective-1000 rotate-y-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-white rounded-2xl shadow-2xl p-8 border"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 ml-4 font-mono text-sm">cPanel Dashboard</span>
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-green-600 font-medium">WEBSITE SPEED</p>
                          <p className="text-2xl font-bold text-green-700">0.4s</p>
                        </div>
                        <Gauge className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-blue-600 font-medium">UPTIME</p>
                          <p className="text-2xl font-bold text-blue-700">99.99%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Resource Usage */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">CPU Usage</span>
                        <span className="text-gray-800 font-medium">23%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "23%" }}
                          transition={{ duration: 1.5, delay: 1 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Memory Usage</span>
                        <span className="text-gray-800 font-medium">18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "18%" }}
                          transition={{ duration: 1.5, delay: 1.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
                >
                  🔥 Live Traffic: +300%
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
                >
                  ✅ SSL Active
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section với Gradient Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🚀 Tại Sao Chọn 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> STEP Hosting?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những ưu thế vượt trội giúp website của bạn đạt hiệu suất tối đa
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
                data-testid={`benefit-card-${index}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="relative bg-white rounded-2xl shadow-lg p-8 border hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Hosting Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              💎 6 Gói Hosting 
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Từ Thấp Đến Cao</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Từ website cá nhân đến enterprise lớn - chúng tôi có giải pháp hoàn hảo cho mọi nhu cầu
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {hostingPackages.map((pkg, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: {
                    duration: 0.3,
                    type: "spring",
                    stiffness: 400
                  }
                }}
                variants={packageVariants}
                viewport={{ once: true }}
                onHoverStart={() => setSelectedPackage(index)}
                onHoverEnd={() => setSelectedPackage(null)}
                className={`relative group cursor-pointer ${
                  pkg.popular 
                    ? 'lg:scale-105 z-10' 
                    : ''
                }`}
                data-testid={`package-card-${index}`}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${pkg.gradient} rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300`}></div>
                
                <div className={`relative bg-white rounded-2xl shadow-xl border-2 ${
                  pkg.popular 
                    ? 'border-orange-400' 
                    : selectedPackage === index 
                      ? colorClasses[pkg.color as keyof typeof colorClasses] 
                      : 'border-gray-200'
                } p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:scale-[1.02]`}>
                  
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm font-semibold">
                        🔥 Phổ Biến Nhất
                      </Badge>
                    </div>
                  )}
                  
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-r ${pkg.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <pkg.icon className="h-10 w-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 font-medium mb-4">{pkg.subtitle}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-gray-500 line-through text-lg mr-2">{pkg.originalPrice.toLocaleString('vi-VN')}</span>
                        <Badge variant="destructive" className="text-xs">-{Math.round((1 - pkg.price/pkg.originalPrice) * 100)}%</Badge>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className={`text-4xl font-bold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}>
                          {pkg.price.toLocaleString('vi-VN')}
                        </span>
                        <span className="text-gray-600 ml-2">VNĐ/tháng</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                  </div>

                  {/* Specs */}
                  <div className="mb-6 space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-3">Thông số kỹ thuật:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{pkg.specs.storage}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{pkg.specs.bandwidth}</span>
                      </div>
                      <div className="flex items-center">
                        <Server className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{pkg.specs.domains}</span>
                      </div>
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{pkg.specs.cpu}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">Tính năng bao gồm:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <p className="text-xs text-gray-500 mb-4 text-center">Phù hợp: {pkg.suitable}</p>
                    <Button 
                      className={`w-full py-3 text-base font-semibold ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                          : `bg-gradient-to-r ${pkg.gradient} hover:shadow-lg text-white`
                      } transition-all duration-300`}
                      onClick={() => window.location.href = '/contact'}
                      data-testid={`button-choose-package-${index}`}
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Chọn Gói {pkg.name}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmark Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📊 So Sánh Hiệu Suất Hosting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benchmarks thực tế cho tốc độ, uptime và hiệu suất hosting
            </p>
          </motion.div>
          
          <PerformanceBenchmark />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              💬 Khách Hàng Nói Gì Về STEP Hosting?
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 bg-white/10 rounded-full"
              initial={{ x: -200, y: Math.random() * 400 }}
              animate={{ x: window.innerWidth + 200, y: Math.random() * 400 }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 5
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🚀 Sẵn Sàng Tăng Tốc Website?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Nhận ưu đãi <strong>25% tháng đầu</strong> + <strong>migration miễn phí</strong> + 
              <strong>30 ngày hoàn tiền</strong>. Hơn 10,000+ website đã tin tưởng!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-start-hosting"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Bắt Đầu Ngay - Giảm 25%
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg transition-all duration-300"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-contact-hosting-expert"
              >
                Liên Hệ Chuyên Gia
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />



      {/* Email Popup Component */}
      <EmailPopup
        discount="25% OFF"
        title="🎁 Ưu Đãi Hosting Đặc Biệt!"
        description="Đăng ký email để nhận giảm giá 25% tháng đầu + migration miễn phí!"
        buttonText="Nhận Ưu Đãi 25%"
        storageKey="hosting_email_popup_shown"
      />
    </div>
  );
}