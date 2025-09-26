import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
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
  TrendingUp,
  Lock,
  Terminal,
  GitBranch,
  Zap,
  Settings,
  Monitor
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerformanceBenchmark from "@/components/performance-benchmark";
import EmailPopup from "@/components/email-popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HostingLaravel() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    email: "",
    name: "",
    phone: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    package: ""
  });

  const handleEmailSubmit = async (email: string) => {
    console.log('Email submitted for Laravel hosting:', email);
    // Integration with email service would go here
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  // Show popup after 10 seconds or 50% scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50) {
        setShowPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const benefits = [
    {
      icon: Terminal,
      title: "Deploy Nhanh Chóng & Dễ Dàng",
      description: "Hỗ trợ SSH access đầy đủ để chạy artisan commands, Composer install, và Git integration cho deployment tự động – lý tưởng cho lập trình viên cần push code nhanh mà không cần config phức tạp."
    },
    {
      icon: Zap,
      title: "Hiệu Suất Vượt Trội", 
      description: "Sử dụng NVME SSD, LiteSpeed server, Redis/Memcached cho caching, và hỗ trợ PHP 8+ – giúp app Laravel load nhanh, xử lý queues hiệu quả, phù hợp project với traffic cao."
    },
    {
      icon: Shield,
      title: "Bảo Mật & Scale Linh Hoạt",
      description: "Firewall nâng cao, SSL miễn phí, auto-backup, và hỗ trợ cron jobs/schedulers. Dễ scale với Kubernetes hoặc multi-server, an toàn cho dev làm việc với .env và database sensitive."
    },
    {
      icon: Users,
      title: "Tiết Kiệm & Developer-Friendly",
      description: "Giá từ 200.000 VNĐ/tháng, không phí ẩn, hỗ trợ CI/CD (GitHub Actions/Jenkins), và dashboard user-friendly để monitor resources thời gian thực."
    }
  ];

  const laravelAdvantages = [
    {
      icon: Code2,
      title: "Dễ Học Và Sử Dụng",
      description: "Laravel có cú pháp sạch sẽ, dễ hiểu với documentation chi tiết và ví dụ cụ thể. Artisan CLI hỗ trợ automation tasks như migrations và seeding, giúp người mới học nhanh hơn và giảm thời gian code thủ công."
    },
    {
      icon: Settings,
      title: "Tích Hợp Tính Năng Phong Phú",
      description: "Built-in features như Eloquent ORM, routing, authentication, caching, và queue management giúp phát triển nhanh mà không cần third-party libraries. Lý tưởng cho dự án vừa và lớn."
    },
    {
      icon: Lock,
      title: "Bảo Mật Mạnh Mẽ",
      description: "Tích hợp sẵn CSRF protection, encryption, và password hashing, giúp tránh lỗ hổng phổ biến. Laravel cập nhật nhanh để đối phó với threats mới, an toàn cho app doanh nghiệp."
    },
    {
      icon: Users,
      title: "Cộng Đồng Và Hỗ Trợ Lớn",
      description: "Cộng đồng developer đông đảo với Laravel Forge/Envoyer cho deployment dễ dàng. Dễ tìm packages trên Packagist, hỗ trợ tốt cho dự án dài hạn với LTS versions."
    },
    {
      icon: TrendingUp,
      title: "Hiệu Suất Cao Và Scalability",
      description: "Hỗ trợ caching (Redis/Memcached), queue (Horizon), và API building (Sanctum), giúp app scale dễ dàng. Performance tốt hơn framework lightweight nhưng thiếu features."
    },
    {
      icon: Monitor,
      title: "Tích Hợp Hiện Đại",
      description: "Hỗ trợ Vue/React cho frontend, API RESTful, và tools như Laravel Nova cho admin panels – giúp xây dựng app full-stack nhanh chóng, tiết kiệm thời gian cho developer."
    }
  ];

  const packages = [
    {
      name: "Gói Cơ Bản",
      price: "200.000 VNĐ/tháng",
      storage: "PHP 8+, Composer",
      features: "Lưu trữ 10GB SSD",
      suitable: "Project cá nhân/dev thử nghiệm",
      color: "blue",
      specs: [
        "PHP 8.1+, Composer",
        "10GB SSD Storage",
        "SSH Access",
        "Artisan Commands",
        "MySQL Database",
        "SSL Certificate"
      ]
    },
    {
      name: "Gói Nâng Cao",
      price: "400.000 VNĐ/tháng", 
      storage: "SSH + Git Integration",
      features: "Lưu trữ 30GB, Redis Cache",
      suitable: "App trung bình với queues",
      color: "green",
      popular: true,
      specs: [
        "All từ gói Cơ Bản",
        "30GB SSD Storage", 
        "Git Integration",
        "Redis Cache",
        "Queue Workers",
        "Cron Jobs Support"
      ]
    },
    {
      name: "Gói Pro",
      price: "800.000 VNĐ/tháng",
      storage: "CI/CD Full, Multi-Server", 
      features: "Lưu trữ 100GB, Priority Support",
      suitable: "Production app lớn/scale",
      color: "purple",
      specs: [
        "All từ gói Nâng Cao",
        "100GB SSD Storage",
        "CI/CD Pipeline",
        "Multi-Server Setup",
        "Load Balancing",
        "Priority Support 24/7"
      ]
    }
  ];

  const testimonial = {
    text: "Hosting Laravel của STEP deploy siêu nhanh, hỗ trợ SSH giúp tôi push code dễ dàng!",
    author: "Anh E., Lập trình viên DevOps tại Hà Nội"
  };

  const techFeatures = [
    { name: "PHP 8.1+", icon: Code2 },
    { name: "Composer", icon: Settings },
    { name: "SSH Access", icon: Terminal },
    { name: "Git Integration", icon: GitBranch },
    { name: "Redis Cache", icon: Database },
    { name: "Queue Workers", icon: Monitor }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Main form data:', formData);
    // Handle form submission
    // Contact form removed - navigate to /contact page
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Popup form data:', popupData);
    setShowPopup(false);
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
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                  <Code2 className="text-white w-6 h-6" />
                </div>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Laravel Framework
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Hosting Laravel Chuyên Biệt – 
                <span className="text-red-500"> Deploy Ứng Dụng Framework</span> 
                Của Bạn Siêu Nhanh & Ổn Định!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Dịch vụ Hosting tối ưu cho lập trình viên sử dụng Laravel framework, 
                hỗ trợ SSH, Composer, CI/CD và hiệu suất cao. Dành riêng cho developer, 
                DevOps xây dựng web app mạnh mẽ – deploy chỉ trong phút, scale linh hoạt mà không lo downtime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Kiểm Tra Gói Hosting Laravel Phù Hợp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  Deploy Test Ngay
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Khám phá ngay để nâng cấp project Laravel của bạn!</span>
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
                  <span className="text-gray-400 ml-4">Terminal</span>
                </div>
                
                <div className="space-y-2">
                  <div><span className="text-blue-400">$</span> composer install</div>
                  <div><span className="text-blue-400">$</span> php artisan migrate</div>
                  <div><span className="text-blue-400">$</span> php artisan queue:work</div>
                  <div><span className="text-green-500">✓</span> Laravel app deployed successfully!</div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {techFeatures.map((tech, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-md text-center">
                    <tech.icon className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <span className="text-xs font-medium text-gray-700">{tech.name}</span>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Lợi Ích Của Hosting Laravel Từ STEP
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Được thiết kế đặc biệt cho Laravel framework với các tính năng developer-centric
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
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                  <benefit.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Bảng Gói Hosting Laravel
            </h2>
            <p className="text-xl text-gray-600">
              Chọn gói phù hợp với nhu cầu development Laravel của bạn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow relative ${
                  pkg.popular ? 'ring-2 ring-red-500 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Được Chọn Nhiều Nhất
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-red-500 mb-4">
                    Từ {pkg.price}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {pkg.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Phù hợp:</strong> {pkg.suitable}
                  </p>
                </div>

                <Button 
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    setFormData({...formData, package: pkg.name});
                    window.location.href = '/contact';
                  }}
                >
                  Chọn Gói & Deploy Test
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Laravel Framework Advantages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ưu Điểm Của Laravel Framework Cho Phát Triển Web
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Laravel là framework PHP mã nguồn mở mạnh mẽ, được thiết kế để phát triển ứng dụng web 
              nhanh chóng, an toàn và dễ bảo trì. Hosting STEP tối ưu hóa hoàn hảo cho tất cả ưu điểm này.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {laravelAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <advantage.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tại Sao Chọn Hosting Laravel Từ STEP?
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Tích Hợp Framework Hoàn Hảo
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Được tối ưu hóa cho Laravel (hỗ trợ artisan migrate, queue workers, env config), 
                    kết nối mượt mà với dịch vụ khác như Cloud N8N hoặc Database MySQL – 
                    giúp dev tập trung code thay vì server management.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Terminal className="w-5 h-5 text-red-500 mr-2" />
                        <span className="font-semibold text-gray-900">Artisan Ready</span>
                      </div>
                      <p className="text-sm text-gray-600">Full SSH access & Artisan commands</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Database className="w-5 h-5 text-red-500 mr-2" />
                        <span className="font-semibold text-gray-900">Queue Workers</span>
                      </div>
                      <p className="text-sm text-gray-600">Horizon support & Redis integration</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">5.0/5</span>
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <cite className="text-sm text-gray-600">– {testimonial.author}</cite>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Cam Kết Developer-First</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Deploy test miễn phí 14 ngày</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Hoàn tiền nếu không hài lòng</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Hạ tầng địa phương đảm bảo latency thấp</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Support từ team developer Việt Nam</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Cộng đồng Laravel developer lớn</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Packages & extensions phong phú</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-6">
                Hosting được thiết kế bởi developers, cho developers Việt Nam
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Benchmark Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <PerformanceBenchmark 
          selectedPlan="advanced"
          onPlanSelect={(plan) => {
            setFormData({...formData, package: plan});
            window.location.href = '/contact';
          }}
        />
      </section>

      {/* CTA Form Section */}
      <section className="py-20 bg-gradient-to-br from-red-500 to-red-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Sẵn Sàng Deploy Project Laravel Của Bạn Trên Hosting STEP?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nhận code deploy mẫu miễn phí + giảm 25% tháng đầu!
            </p>

            <div className="bg-white rounded-xl p-8 text-gray-900 max-w-2xl mx-auto">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Tên của bạn *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="tel"
                    placeholder="Số điện thoại *"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                  <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gói Quan Tâm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Gói Cơ Bản</SelectItem>
                      <SelectItem value="advanced">Gói Nâng Cao</SelectItem>
                      <SelectItem value="pro">Gói Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder="Project Description (tùy chọn, e.g., 'App Laravel với queues')"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                  rows={3}
                />

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Gửi Yêu Cầu & Nhận Code Deploy Mẫu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Modal */}

      {/* Email Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 shadow-2xl border border-gray-200 relative"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nhận Khuyến Mãi Đặc Biệt & Khuyến Nghị Bảo Mật Laravel Miễn Phí!
              </h3>
              <p className="text-sm text-gray-600">
                Chỉ cần điền email để nhận mã giảm 35% cho Hosting Laravel đầu tiên, 
                kèm e-book "7 Mẹo Bảo Mật & Optimize Laravel 2025"
              </p>
            </div>

            <form onSubmit={handlePopupSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Email của bạn *"
                value={popupData.email}
                onChange={(e) => setPopupData({...popupData, email: e.target.value})}
                required
              />
              <Input
                placeholder="Tên (tùy chọn)"
                value={popupData.name}
                onChange={(e) => setPopupData({...popupData, name: e.target.value})}
              />
              <Input
                type="tel"
                placeholder="Số điện thoại (tùy chọn)"
                value={popupData.phone}
                onChange={(e) => setPopupData({...popupData, phone: e.target.value})}
              />
              <Button 
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Nhận Ngay & Đăng Ký
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-3">
              Chỉ trong 24h! Hành động ngay để project bạn an toàn hơn!
            </p>
          </motion.div>
        </motion.div>
      )}

      <Footer />

      {/* Email Popup - Show after 15 seconds */}
      <EmailPopup
        title="🔥 Ưu Đãi Laravel Hosting!"
        description="Đăng ký email để nhận mã giảm giá 25% hosting Laravel + e-book bảo mật miễn phí!"
        buttonText="Nhận Mã Giảm Giá"
        onSubmit={handleEmailSubmit}
        delay={15000}
      />
    </div>
  );
}