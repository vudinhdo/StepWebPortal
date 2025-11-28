import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  Shield, 
  HardDrive, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Clock,
  Users,
  Star,
  X,
  Database,
  TrendingUp,
  Lock,
  Cloud,
  Zap,
  Settings,
  Monitor,
  Award,
  Headphones
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerformanceBenchmark from "@/components/performance-benchmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ServersOverview() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    package: ""
  });

  const benefits = [
    {
      icon: Server,
      title: "Máy Chủ Vật Lý Cao Cấp",
      description: "Intel Xeon processors, SSD NVMe ultra-fast và RAM ECC memory với 100% dedicated resources – lý tưởng cho enterprise applications cần maximum performance và isolated environment cho security và compliance tối đa."
    },
    {
      icon: Cloud,
      title: "Cloud & Virtualization Linh Hoạt", 
      description: "Auto-scaling based trên real traffic, pay-as-you-use pricing và multi-region deployment với disaster recovery tự động – perfect cho modern applications cần elasticity và cost optimization."
    },
    {
      icon: Shield,
      title: "Enterprise Security & Compliance",
      description: "DDoS protection layer 7, firewall hardware-based và 24/7 SOC monitoring với compliance GDPR, ISO 27001 – đảm bảo data protection và regulatory requirements cho enterprise."
    },
    {
      icon: Headphones,
      title: "Support 24/7 & SLA Guarantee",
      description: "Vietnamese expert technicians, 15-minute response time và 99.9% uptime SLA với proactive monitoring – comprehensive support cho business-critical operations mọi lúc mọi nơi."
    }
  ];

  const serverAdvantages = [
    {
      icon: HardDrive,
      title: "SSD NVMe Ultra Performance",
      description: "Latest generation NVMe SSD với read/write speeds lên đến 6GB/s, perfect cho database applications và high I/O workloads. Significantly faster than traditional SATA SSDs."
    },
    {
      icon: Database,
      title: "Dedicated Resource Guarantee",
      description: "100% CPU, RAM và storage allocation không share với users khác. Predictable performance cho mission-critical applications với resource isolation hoàn toàn."
    },
    {
      icon: Settings,
      title: "Full Root Access & Control",
      description: "Complete administrative access với custom software installation, kernel modifications và advanced configurations. Perfect cho developers và system administrators."
    },
    {
      icon: Monitor,
      title: "Real-time Monitoring",
      description: "24/7 server monitoring với alerting system, performance graphs và automated failover. Proactive issue detection và instant notification qua multiple channels."
    },
    {
      icon: Lock,
      title: "Advanced Security Features",
      description: "Multi-layer security với DDoS protection, intrusion detection và automated backup systems. Comprehensive security cho enterprise data protection."
    },
    {
      icon: TrendingUp,
      title: "Scalability & Migration",
      description: "Easy vertical scaling với zero-downtime migrations và horizontal expansion options. Seamless growth path cho expanding businesses."
    }
  ];

  const packages = [
    {
      name: "VPS Starter",
      price: "500.000 VNĐ/tháng",
      storage: "2 CPU, 4GB RAM, 50GB SSD",
      features: "Cloud VPS với cPanel",
      suitable: "Startup/Small business",
      color: "blue",
      specs: [
        "2 vCPU Cores",
        "4GB RAM DDR4",
        "50GB SSD NVMe",
        "Unlimited Bandwidth",
        "cPanel/WHM Included",
        "Free SSL Certificate"
      ]
    },
    {
      name: "VPS Business",
      price: "1.200.000 VNĐ/tháng", 
      storage: "4 CPU, 8GB RAM, 120GB SSD",
      features: "Enhanced performance VPS",
      suitable: "Growing businesses",
      color: "green",
      popular: true,
      specs: [
        "All từ gói Starter",
        "4 vCPU Cores", 
        "8GB RAM DDR4",
        "120GB SSD NVMe",
        "Priority Support",
        "Advanced Monitoring"
      ]
    },
    {
      name: "Dedicated Server",
      price: "8.500.000 VNĐ/tháng",
      storage: "Intel Xeon, 32GB RAM", 
      features: "Full physical server",
      suitable: "Enterprise applications",
      color: "purple",
      specs: [
        "Intel Xeon Processor",
        "32GB RAM ECC",
        "1TB SSD NVMe",
        "10Gbps Network",
        "Full Root Access",
        "24/7 Expert Support"
      ]
    }
  ];

  const testimonial = {
    text: "Máy chủ của STEP đã giúp website của chúng tôi đạt 99.9% uptime và tăng 40% performance!",
    author: "Anh T., CTO tại Tiki"
  };

  const techFeatures = [
    { name: "Intel Xeon", icon: Server },
    { name: "SSD NVMe", icon: HardDrive },
    { name: "DDoS Protection", icon: Shield },
    { name: "24/7 Monitoring", icon: Monitor },
    { name: "Cloud Backup", icon: Cloud },
    { name: "Load Balancer", icon: Settings }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Main form data:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-slate-50/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                  <Server className="text-white w-6 h-6" />
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Enterprise Server Solutions
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Máy Chủ Enterprise – 
                <span className="text-primary"> Dedicated Performance</span> 
                Với 99.9% Uptime Guarantee!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Giải pháp máy chủ toàn diện từ VPS đến dedicated servers với Intel Xeon, SSD NVMe và enterprise security. 
                Dành riêng cho doanh nghiệp cần infrastructure performance cao và reliability tối đa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-check-server-packages"
                >
                  Kiểm Tra Gói Server Phù Hợp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/contact'}
                  data-testid="button-request-quote"
                >
                  Yêu Cầu Báo Giá
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Phục vụ 5000+ doanh nghiệp tại Việt Nam!</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 text-green-400 font-mono text-sm">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4">Server Management Console</span>
                </div>
                
                <div className="space-y-2">
                  <div><span className="text-blue-400">$</span> systemctl status nginx</div>
                  <div><span className="text-blue-400">$</span> top -u apache</div>
                  <div><span className="text-blue-400">$</span> df -h /var/www</div>
                  <div><span className="text-green-500">✓</span> Server uptime: 99.9%!</div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {techFeatures.map((tech, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
                    <tech.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn Server Enterprise Của STEP?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những ưu thế vượt trội của infrastructure enterprise-grade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100"
                data-testid={`benefit-card-${index}`}
              >
                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 rounded-xl p-4 flex-shrink-0">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Server Advantages Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tính Năng Nổi Bật Server Enterprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Công nghệ tiên tiến và infrastructure hiện đại
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {serverAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                data-testid={`advantage-card-${index}`}
              >
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-3 w-fit mb-4">
                  <advantage.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Gói Dịch Vụ Máy Chủ Enterprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lựa chọn server phù hợp với quy mô và performance requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${
                  pkg.popular 
                    ? 'border-primary transform scale-105' 
                    : 'border-gray-200'
                } p-8 hover:shadow-2xl transition-all`}
                data-testid={`package-card-${index}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                  <p className="text-gray-600 text-sm">{pkg.suitable}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 text-base font-semibold ${
                    pkg.popular
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() => window.location.href = '/contact'}
                  data-testid={`button-choose-package-${index}`}
                >
                  Chọn Gói {pkg.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmark Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              So Sánh Hiệu Suất Server Enterprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benchmarks thực tế cho server performance và reliability
            </p>
          </div>
          
          <PerformanceBenchmark />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary/5 to-gray-50 rounded-3xl p-12">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl text-gray-900 font-medium mb-8 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">Vietnam E-commerce Industry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn Sàng Triển Khai Server Enterprise?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Tham gia 5000+ doanh nghiệp tin tưởng STEP. Nhận tư vấn miễn phí và setup support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-get-started"
            >
              Bắt Đầu Ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-contact-expert"
            >
              Liên Hệ Chuyên Gia
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}