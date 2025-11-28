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

export default function ServerServices() {
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
      title: "Server Management & Maintenance",
      description: "Full server administration với proactive monitoring, security patches và performance optimization 24/7 – lý tưởng cho businesses cần focus on core operations mà không phải worry về technical infrastructure management."
    },
    {
      icon: Cloud,
      title: "Migration & Cloud Services", 
      description: "Seamless migration từ on-premises đến cloud và vice versa với zero-downtime strategy và data integrity guarantee – perfect cho digital transformation initiatives và business continuity requirements."
    },
    {
      icon: Shield,
      title: "Security & Backup Solutions",
      description: "Multi-layer security với automated backups, disaster recovery testing và compliance auditing theo standards GDPR, ISO 27001 – comprehensive protection cho enterprise data và business operations."
    },
    {
      icon: Settings,
      title: "Custom Solutions & Integration",
      description: "Tailored server solutions với third-party integrations, custom configurations và scalability planning – designed specifically cho unique business requirements và growth strategies."
    }
  ];

  const serviceAdvantages = [
    {
      icon: Monitor,
      title: "24/7 Server Monitoring",
      description: "Real-time performance tracking với automated alerting, proactive issue detection và immediate response protocols. Comprehensive dashboard cho system visibility."
    },
    {
      icon: Database,
      title: "Data Backup & Recovery",
      description: "Automated daily backups với multiple retention policies, disaster recovery testing và rapid restoration capabilities. Guarantee data protection và business continuity."
    },
    {
      icon: Settings,
      title: "Server Configuration",
      description: "Expert setup và optimization cho maximum performance, security hardening và custom application deployment. Tailored configurations cho specific business needs."
    },
    {
      icon: Lock,
      title: "Security Management",
      description: "Advanced threat protection, vulnerability scanning và automated security updates. Regular security audits và compliance reporting cho enterprise standards."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Server tuning để maximize efficiency, load balancing setup và resource allocation optimization. Continuous performance improvements và monitoring."
    },
    {
      icon: Headphones,
      title: "Expert Technical Support",
      description: "Vietnamese-speaking engineers với enterprise-level expertise, rapid response times và proactive consultation services. Direct access to senior technical staff."
    }
  ];

  const packages = [
    {
      name: "Server Basic",
      price: "2.000.000 VNĐ/tháng",
      storage: "Basic server management",
      features: "Monitoring + Basic support",
      suitable: "SME with 1-3 servers",
      color: "blue",
      specs: [
        "24/7 Server monitoring",
        "Basic security management",
        "Monthly performance reports",
        "Email/ticket support",
        "Regular backup checks",
        "OS updates included"
      ]
    },
    {
      name: "Server Professional",
      price: "4.500.000 VNĐ/tháng", 
      storage: "Advanced management + optimization",
      features: "Full management + consultation",
      suitable: "Growing enterprises",
      color: "green",
      popular: true,
      specs: [
        "All từ gói Basic",
        "Performance optimization", 
        "Advanced security setup",
        "Priority phone support",
        "Weekly consulting calls",
        "Custom configurations"
      ]
    },
    {
      name: "Server Enterprise",
      price: "8.000.000 VNĐ/tháng",
      storage: "Full-service management", 
      features: "Complete outsourced IT",
      suitable: "Large enterprises",
      color: "purple",
      specs: [
        "All từ gói Professional",
        "Dedicated account manager",
        "SLA guarantees",
        "Custom integrations",
        "Disaster recovery planning",
        "Compliance reporting"
      ]
    }
  ];

  const testimonial = {
    text: "Dịch vụ server management của STEP đã giảm 70% thời gian IT admin và tăng 99.9% uptime!",
    author: "Anh D., IT Manager tại VNG Corporation"
  };

  const techFeatures = [
    { name: "cPanel/WHM", icon: Settings },
    { name: "CloudLinux", icon: Cloud },
    { name: "SSD Storage", icon: HardDrive },
    { name: "Load Balancer", icon: Monitor },
    { name: "SSL Cert", icon: Lock },
    { name: "24/7 Support", icon: Headphones }
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
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="text-white w-6 h-6" />
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Server Management Services
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Server Management – 
                <span className="text-green-600"> 24/7 Administration</span> 
                Giảm 70% IT Workload!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Dịch vụ quản lý server toàn diện với monitoring 24/7, security management và performance optimization. 
                Dành riêng cho doanh nghiệp cần outsource IT infrastructure để focus on core business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-check-service-packages"
                >
                  Kiểm Tra Gói Dịch Vụ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/contact'}
                  data-testid="button-free-assessment"
                >
                  Đánh Giá Hệ Thống Miễn Phí
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Quản lý 2000+ servers cho các doanh nghiệp Việt Nam!</span>
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
                  <div><span className="text-blue-400">$</span> htop -u www-data</div>
                  <div><span className="text-blue-400">$</span> systemctl status mysql</div>
                  <div><span className="text-blue-400">$</span> tail -f /var/log/access.log</div>
                  <div><span className="text-green-500">✓</span> All services healthy!</div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {techFeatures.map((tech, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
                    <tech.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
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
              Tại Sao Outsource Server Management?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những lợi ích khi giao server management cho STEP
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
                  <div className="bg-green-100 rounded-xl p-4 flex-shrink-0">
                    <benefit.icon className="h-8 w-8 text-green-600" />
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

      {/* Service Advantages Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Dịch Vụ Quản Lý Server Chuyên Nghiệp
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive server management services với expert team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {serviceAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                data-testid={`advantage-card-${index}`}
              >
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-3 w-fit mb-4">
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
              Gói Dịch Vụ Server Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lựa chọn level support phù hợp với server infrastructure
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
                    ? 'border-green-600 transform scale-105' 
                    : 'border-gray-200'
                } p-8 hover:shadow-2xl transition-all`}
                data-testid={`package-card-${index}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">{pkg.price}</div>
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
                      ? 'bg-green-600 hover:bg-green-700 text-white'
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              So Sánh Hiệu Quả Server Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Before vs After managed services implementation
            </p>
          </div>
          
          <PerformanceBenchmark />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-green-50 to-gray-50 rounded-3xl p-12">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl text-gray-900 font-medium mb-8 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">Vietnam Gaming Industry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn Sàng Outsource Server Management?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Giảm 70% IT workload và tăng 99.9% uptime. Nhận assessment miễn phí cho infrastructure hiện tại.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-free-assessment-cta"
            >
              Đánh Giá Miễn Phí
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-contact-team"
            >
              Liên Hệ Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}