import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Shield, HardDrive, Users, Server, Lock, Database, X } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "@/components/contact-form";
import EmailPopup from "@/components/email-popup";
import PerformanceBenchmark from "@/components/performance-benchmark";

export default function HostingNVME() {
  const [showPopup, setShowPopup] = useState(false);

  const handleEmailSubmit = async (email: string) => {
    console.log('Email submitted for NVME hosting:', email);
    // Integration with email service would go here
    await new Promise(resolve => setTimeout(resolve, 1000));
  };
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    package: "",
  });

  // Show popup after 10 seconds or 50% scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50) {
        setShowPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would integrate with HubSpot
    alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ trong 24h để setup backup miễn phí.');
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Popup form submitted');
    // Here you would integrate with HubSpot
    setShowPopup(false);
    alert('Mã giảm 35% đã được gửi qua email! Kiểm tra hộp thư của bạn.');
  };

  const packages = [
    {
      name: "Gói Cơ Bản",
      storage: "NVME SSD 10GB",
      backup: "Backup 1 lần/ngày",
      price: "300.000 VNĐ/tháng",
      description: "Phù hợp: Dự án nhỏ/dev thử nghiệm",
      features: ["NVME SSD tốc độ cao", "Backup tự động hàng ngày", "SSL miễn phí", "PHP 8+ support", "Redis caching"]
    },
    {
      name: "Gói Nâng Cao",
      storage: "NVME SSD 50GB",
      backup: "Backup 3 lần/ngày",
      price: "600.000 VNĐ/tháng",
      description: "Phù hợp: App trung bình với backup nhiều",
      features: ["NVME SSD tốc độ cao", "Backup 3 lần/ngày", "ModSecurity", "SSH Access", "Git deployment", "Firewall DDoS"],
      popular: true
    },
    {
      name: "Gói Pro",
      storage: "NVME SSD 100GB",
      backup: "Backup + Multi-Server",
      price: "1.200.000 VNĐ/tháng",
      description: "Phù hợp: Project lớn cần scale và bảo mật cao",
      features: ["NVME SSD tốc độ cao", "Multi-server scaling", "Backup đa tầng", "Quét malware", "24/7 Support", "Load balancer"]
    }
  ];

  const benefits = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Tốc Độ Cao Nhất",
      description: "Sử dụng ổ cứng NVME SSD, load website dưới 0.5 giây, hỗ trợ PHP 8+, Redis caching – lý tưởng cho lập trình viên cần xử lý tải lớn hoặc app phức tạp như e-commerce/API."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Backup Đầy Đủ",
      description: "Backup tự động 3 lần/ngày, lưu trữ 30 ngày, khôi phục dễ dàng qua dashboard – đảm bảo không mất dữ liệu, phù hợp DevOps cần phục hồi nhanh sau lỗi."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Bảo Mật Tuyệt Đối",
      description: "Firewall chống DDoS, SSL miễn phí, ModSecurity, quét malware định kỳ, và bảo vệ .env file – an toàn tuyệt đối cho dự án nhạy cảm, bảo vệ dữ liệu lập trình viên trước tấn công."
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Linh Hoạt & Hỗ Trợ",
      description: "Tích hợp SSH, Git deployment, scale dễ dàng với multi-server, và đội ngũ hỗ trợ 24/7 qua Zalo OA – giúp dev tập trung phát triển thay vì quản lý server."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-6xl"
        >
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-40 right-20 w-32 h-32 bg-cyan-200 rounded-full opacity-15"
            />
            <motion.div
              animate={{ 
                rotate: 180,
                scale: [1, 1.15, 1],
              }}
              transition={{ 
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-20 left-1/3 w-24 h-24 bg-blue-300 rounded-full opacity-25"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Badge className="bg-blue-600 text-white text-sm px-4 py-2 mb-4">
              <HardDrive className="w-4 h-4 mr-2" />
              NVME Performance
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Hosting NVME Siêu Tốc
            <span className="block text-blue-600">Nâng Cấp Hiệu Suất Website</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Dịch vụ Hosting NVME tối ưu cho lập trình viên và DevOps cần <strong>tốc độ cao</strong>, 
            <strong> backup nhiều lần/ngày</strong> và <strong>bảo mật hàng đầu</strong>. 
            Xử lý tải lớn, an toàn dữ liệu – lý tưởng cho dự án đòi hỏi performance đỉnh cao.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="w-5 h-5 mr-2" />
              Kiểm Tra Gói Hosting NVME Phù Hợp
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all"
              onClick={() => setShowContactForm(true)}
            >
              Tư vấn miễn phí
            </Button>
          </motion.div>

          {/* Developer-focused stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">0.5s</div>
              <div className="text-sm text-gray-600">Load Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">99.99%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3x/day</div>
              <div className="text-sm text-gray-600">Auto Backup</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Lợi Ích Của Hosting NVME Từ STEP
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all group"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Bảng Gói Dịch Vụ Hosting NVME
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative ${pkg.popular ? 'transform scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">Phổ biến nhất</Badge>
                  </div>
                )}
                <Card className={`h-full ${pkg.popular ? 'border-blue-500 shadow-xl' : 'border-gray-200'} hover:shadow-lg transition-all group`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold text-gray-900">{pkg.name}</CardTitle>
                    <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-blue-600">{pkg.price}</div>
                      <div className="text-sm text-gray-600 mt-2">{pkg.storage}</div>
                      <div className="text-sm text-gray-600">{pkg.backup}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    <Button 
                      className={`w-full mt-6 ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white group-hover:scale-105 transition-all`}
                      onClick={() => setShowContactForm(true)}
                    >
                      Chọn Gói & Nhận Backup Test
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Tại Sao Chọn Hosting NVME Từ STEP?
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <Zap className="inline w-6 h-6 mr-2 text-blue-600" />
                  Tối Ưu Hiệu Suất & Backup
                </h3>
                <p className="text-gray-600">
                  Được thiết kế cho dev cần tốc độ cao (e.g., API Laravel, WordPress nặng), 
                  backup đa tầng giúp khôi phục chỉ trong phút, giảm downtime 99.99%.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <Users className="inline w-6 h-6 mr-2 text-green-600" />
                  Đánh Giá Từ Khách Hàng
                </h3>
                <p className="text-gray-600 italic">
                  "Hosting NVME của STEP tăng tốc API gấp đôi, backup cứu tôi khỏi lỗi code!" 
                  – Anh F., Lập trình viên DevOps tại TP.HCM.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <Lock className="inline w-6 h-6 mr-2 text-purple-600" />
                  Cam Kết
                </h3>
                <p className="text-gray-600">
                  Backup test miễn phí 14 ngày, hoàn tiền nếu không hài lòng. 
                  Hạ tầng tại Việt Nam đảm bảo latency thấp, an toàn cho dev địa phương.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Terminal Demo */}
              <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-2">STEP NVME Performance</span>
                </div>
                <div className="space-y-2">
                  <div>$ curl -w "%&#123;time_total&#125;" https://your-app.step.com.vn</div>
                  <div className="text-blue-400">Response time: 0.127s</div>
                  <div>$ ls -la /backups/</div>
                  <div>backup-2025-01-22-06:00.tar.gz</div>
                  <div>backup-2025-01-22-12:00.tar.gz</div>
                  <div>backup-2025-01-22-18:00.tar.gz</div>
                  <div>$ php artisan queue:work --timeout=300</div>
                  <div className="text-green-400">Processing jobs with NVME speed ⚡</div>
                </div>
              </div>
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
            setShowContactForm(true);
          }}
        />
      </section>

      {/* CTA Form Section */}
      <section className="py-20 px-4 step-gradient text-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bạn Sẵn Sàng Tăng Tốc & Bảo Vệ Dự Án Với Hosting NVME?
            </h2>
            <p className="text-xl opacity-90">
              Nhận backup miễn phí 7 ngày + giảm 30% tháng đầu!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Tên *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-gray-700">Số Điện Thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="package" className="text-gray-700">Gói Quan Tâm</Label>
                  <Select value={formData.package} onValueChange={(value) => setFormData({...formData, package: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Chọn gói" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Gói Cơ Bản</SelectItem>
                      <SelectItem value="advanced">Gói Nâng Cao</SelectItem>
                      <SelectItem value="pro">Gói Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="project" className="text-gray-700">Mô Tả Dự Án (VD: API với tải lớn)</Label>
                <Textarea
                  id="project"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                  className="mt-1"
                  rows={3}
                  placeholder="Mô tả ngắn về dự án và yêu cầu kỹ thuật..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold transform hover:scale-105 transition-all"
              >
                <Database className="w-5 h-5 mr-2" />
                Gửi Yêu Cầu & Nhận Backup Miễn Phí
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-900">
              🎁 Nhận Khuyến Mãi Đặc Biệt & Khuyến Nghị Bảo Mật NVME Miễn Phí!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Chỉ cần điền email để nhận mã giảm 35% cho Hosting NVME đầu tiên, kèm e-book 
              "Top 5 Mẹo Bảo Mật Hosting NVME 2025" - Chỉ trong 24h!
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePopupSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="popup-email">Email *</Label>
              <Input id="popup-email" type="email" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="popup-name">Tên (tùy chọn)</Label>
              <Input id="popup-name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="popup-phone">Số Điện Thoại (tùy chọn)</Label>
              <Input id="popup-phone" className="mt-1" />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Nhận Ngay & Đăng Ký
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPopup(false)}
                className="px-3"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Contact Form Modal */}
      <ContactForm 
        open={showContactForm} 
        onOpenChange={setShowContactForm}
      />

      {/* Email Popup - Show after 15 seconds */}
      <EmailPopup
        title="🚀 Ưu Đãi NVME Hosting!"
        description="Đăng ký email để nhận mã giảm giá 35% hosting NVME + backup test miễn phí!"
        buttonText="Nhận Mã Giảm Giá"
        onSubmit={handleEmailSubmit}
        delay={15000}
      />
    </div>
  );
}