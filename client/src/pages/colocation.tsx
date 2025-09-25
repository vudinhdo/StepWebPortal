import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Building2,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  Network,
  Database,
  Lock,
  Headphones,
  Settings,
  Activity,
  Gauge,
  ThermometerSun,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { useToast } from "@/hooks/use-toast";

export default function Colocation() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const { toast } = useToast();

  // Real colocation service packages based on BKNS market data
  const colocationPackages = [
    {
      id: "bk-cmc01",
      name: "BK-CMC01",
      subtitle: "Gói cơ bản cho khởi nghiệp",
      price: 1500000,
      unit: "VNĐ/tháng", 
      originalPrice: 1750000,
      popular: true,
      space: "1U Server",
      power: "400W",
      bandwidth: "100Mbps trong nước / 5Mbps quốc tế",
      ips: "1 IPv4",
      color: "hsl(142, 76%, 36%)",
      bgColor: "hsl(142, 76%, 96%)",
      borderColor: "hsl(142, 76%, 70%)",
      features: [
        "Chỗ đặt máy chủ: 1U",
        "Công suất điện: 400W",
        "Lưu lượng thông tin: Không giới hạn",
        "Băng thông trong nước: 100Mbps",
        "Băng thông quốc tế: 5Mbps", 
        "Cổng cắm mạng: 1Gbps",
        "Điện máy nổ dự phòng: Có",
        "UPS: Có",
        "IPv4: 1 IP/máy",
        "Hỗ trợ kỹ thuật: 24/7",
        "Giảm 3% khi thanh toán 12 tháng"
      ],
      support: "Hỗ trợ 24/7",
      sla: "99.5% uptime SLA"
    },
    {
      id: "bk-cmc02",
      name: "BK-CMC02", 
      subtitle: "Nâng cao cho doanh nghiệp",
      price: 1900000,
      unit: "VNĐ/tháng",
      originalPrice: 2200000,
      popular: false,
      space: "1U Server",
      power: "400W",
      bandwidth: "200Mbps trong nước / 10Mbps quốc tế",
      ips: "1 IPv4 + IPv6 miễn phí",
      color: "hsl(207, 100%, 40%)",
      bgColor: "hsl(207, 100%, 96%)",
      borderColor: "hsl(207, 100%, 80%)",
      features: [
        "Chỗ đặt máy chủ: 1U",
        "Công suất điện: 400W",
        "Lưu lượng thông tin: Không giới hạn",
        "Băng thông trong nước: 200Mbps",
        "Băng thông quốc tế: 10Mbps",
        "Cổng cắm mạng: 1Gbps",
        "Điện máy nổ dự phòng: Có",
        "UPS: Có", 
        "IPv4: 1 IP/máy",
        "IPv6: Miễn phí",
        "Hỗ trợ kỹ thuật: 24/7",
        "Giảm 3% khi thanh toán 12 tháng"
      ],
      support: "Hỗ trợ 24/7 ưu tiên",
      sla: "99.8% uptime SLA"
    },
    {
      id: "bk-cmc03",
      name: "BK-CMC03",
      subtitle: "Cao cấp cho enterprise",
      price: 3500000, 
      unit: "VNĐ/tháng",
      originalPrice: 4000000,
      popular: false,
      space: "2U Server",
      power: "800W",
      bandwidth: "500Mbps trong nước / 25Mbps quốc tế",
      ips: "2 IPv4 + IPv6",
      color: "hsl(271, 91%, 65%)",
      bgColor: "hsl(271, 91%, 96%)",
      borderColor: "hsl(271, 91%, 75%)",
      features: [
        "Chỗ đặt máy chủ: 2U",
        "Công suất điện: 800W",
        "Lưu lượng thông tin: Không giới hạn",
        "Băng thông trong nước: 500Mbps",
        "Băng thông quốc tế: 25Mbps",
        "Cổng cắm mạng: 1Gbps",
        "Điện máy nổ dự phòng: Có",
        "UPS: Có",
        "IPv4: 2 IP/máy",
        "IPv6: Có",
        "Remote hands: Có",
        "Hỗ trợ kỹ thuật: 24/7",
        "Giảm 5% khi thanh toán 12 tháng"
      ],
      support: "Dedicated support team", 
      sla: "99.9% uptime SLA"
    },
    {
      id: "bk-quarter-rack",
      name: "BK-Quarter Rack",
      subtitle: "1/4 tủ rack cho SME",
      price: 8500000,
      unit: "VNĐ/tháng", 
      originalPrice: 10000000,
      popular: false,
      space: "1/4 Rack (10U)",
      power: "2.5kW",
      bandwidth: "1Gbps trong nước / 50Mbps quốc tế",
      ips: "4 IPv4 + IPv6",
      color: "hsl(339, 82%, 52%)",
      bgColor: "hsl(339, 82%, 96%)",
      borderColor: "hsl(339, 82%, 75%)",
      features: [
        "Chỗ đặt máy chủ: 1/4 Rack (10U)",
        "Công suất điện: 2.5kW",
        "Lưu lượng thông tin: Không giới hạn",
        "Băng thông trong nước: 1Gbps", 
        "Băng thông quốc tế: 50Mbps",
        "Cổng cắm mạng: 1Gbps",
        "Điện máy nổ dự phòng: Có",
        "UPS: Có",
        "IPv4: 4 IP",
        "IPv6: Có",
        "Remote hands: 4 giờ/tháng",
        "Hỗ trợ kỹ thuật: 24/7",
        "Giảm 8% khi thanh toán 12 tháng"
      ],
      support: "Dedicated account manager",
      sla: "99.9% uptime SLA"
    },
    {
      id: "bk-half-rack", 
      name: "BK-Half Rack",
      subtitle: "1/2 tủ rack cho tăng trưởng",
      price: 15500000,
      unit: "VNĐ/tháng",
      originalPrice: 18000000, 
      popular: false,
      space: "1/2 Rack (21U)",
      power: "5kW",
      bandwidth: "2Gbps trong nước / 100Mbps quốc tế",
      ips: "8 IPv4 + IPv6",
      color: "hsl(195, 100%, 50%)",
      bgColor: "hsl(195, 100%, 96%)",
      borderColor: "hsl(195, 100%, 75%)",
      features: [
        "Chỗ đặt máy chủ: 1/2 Rack (21U)",
        "Công suất điện: 5kW",
        "Lưu lượng thông tin: Không giới hạn",
        "Băng thông trong nước: 2Gbps",
        "Băng thông quốc tế: 100Mbps",
        "Cổng cắm mạng: 10Gbps",
        "Điện máy nổ dự phòng: Có",
        "UPS: Có",
        "IPv4: 8 IP",
        "IPv6: Có", 
        "Remote hands: 8 giờ/tháng",
        "KVM over IP: Có",
        "Hỗ trợ kỹ thuật: 24/7",
        "Giảm 10% khi thanh toán 12 tháng"
      ],
      support: "Priority support specialist",
      sla: "99.95% uptime SLA"
    },
    {
      id: "bk-full-rack",
      name: "BK-Full Rack",
      subtitle: "Tủ rack đầy đủ cho enterprise",
      price: 28500000,
      unit: "VNĐ/tháng",
      originalPrice: 33000000,
      popular: false,
      space: "Full Rack (42U)", 
      power: "10kW",
      bandwidth: "5Gbps trong nước / 200Mbps quốc tế",
      ips: "16 IPv4 + IPv6",
      color: "hsl(25, 95%, 53%)",
      bgColor: "hsl(25, 95%, 96%)",
      borderColor: "hsl(25, 95%, 75%)",
      features: [
        "Chỗ đặt máy chủ: Full Rack (42U)",
        "Công suất điện: 10kW",
        "Lưu lượng thông tin: Không giới hạn",
        "Băng thông trong nước: 5Gbps",
        "Băng thông quốc tế: 200Mbps",
        "Cổng cắm mạng: 10Gbps",
        "Điện máy nổ dự phòng: Có",
        "UPS: Có",
        "IPv4: 16 IP",
        "IPv6: Có",
        "Remote hands: Unlimited",
        "KVM over IP: Có",
        "Private cage option: Có",
        "Hỗ trợ kỹ thuật: 24/7",
        "Giảm 12% khi thanh toán 12 tháng"
      ],
      support: "Executive-level support",
      sla: "99.99% uptime SLA"
    }
  ];

  const premiumFeatures = [
    {
      icon: Building2,
      title: "Data Center Tier 3",
      description: "Cơ sở hạ tầng đạt tiêu chuẩn Tier 3 với độ tin cậy cao, hệ thống dự phòng cho power và cooling.",
      color: "hsl(207, 100%, 40%)"
    },
    {
      icon: Shield,
      title: "Bảo Mật Vật Lý Tối Đa",
      description: "Kiểm soát truy cập sinh trắc học, camera giám sát 24/7, bảo vệ chuyên nghiệp và hệ thống báo động đa lớp.",
      color: "hsl(339, 82%, 52%)"
    },
    {
      icon: Zap,
      title: "Nguồn Điện Dự Phòng", 
      description: "Hệ thống UPS công nghiệp, máy phát điện dự phòng, nguồn điện kép với chất lượng utility-grade.",
      color: "hsl(142, 76%, 36%)"
    },
    {
      icon: ThermometerSun,
      title: "Hệ Thống Làm Mát Tiên Tiến",
      description: "Precision air conditioning, hot/cold aisle containment, monitoring nhiệt độ - độ ẩm 24/7 tự động.",
      color: "hsl(271, 91%, 65%)"
    },
    {
      icon: Network,
      title: "Kết Nối Mạng Cao Cấp",
      description: "Multiple Tier-1 carriers, BGP routing, direct peering với major ISPs, latency thấp toàn cầu.",
      color: "hsl(195, 100%, 50%)"
    },
    {
      icon: Eye,
      title: "Remote Monitoring & Management",
      description: "NOC 24/7, SNMP monitoring, alerting real-time, remote hands service và troubleshooting chuyên sâu.",
      color: "hsl(25, 95%, 53%)"
    }
  ];

  const supportLevels = [
    {
      icon: Headphones,
      title: "24/7 Technical Support",
      description: "Đội ngũ kỹ sư chuyên nghiệp luôn sẵn sàng hỗ trợ qua hotline, email và live chat"
    },
    {
      icon: Users,
      title: "Dedicated Account Manager",
      description: "Quản lý tài khoản riêng biệt cho từng khách hàng, tư vấn và hỗ trợ cá nhân hóa"
    },
    {
      icon: Settings,
      title: "Remote Hands Service",
      description: "Dịch vụ hỗ trợ từ xa, restart server, cable management và troubleshooting tại chỗ"
    },
    {
      icon: Award,
      title: "SLA Cam Kết",
      description: "Cam kết uptime từ 99.5% đến 99.999% với chính sách bồi thường rõ ràng"
    }
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setShowContactForm(true);
  };

  const handleContactSubmit = () => {
    toast({
      title: "Yêu cầu tư vấn đã được gửi!",
      description: "Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút để tư vấn colocation phù hợp nhất.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 px-6 py-3 bg-blue-100 text-blue-700 text-lg font-semibold shadow-lg">
              🏢 Premium Colocation Services
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Thuê Chỗ Đặt Máy Chủ
              </span>
              <br />
              <span className="text-white">Giải pháp an toàn, bảo mật tuyệt đối</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Data Center đạt tiêu chuẩn Tier 3 với bảo mật mạnh mẽ, nguồn điện dự phòng và hỗ trợ 24/7. 
              Khách hàng được phục vụ tận răng với dịch vụ chuyên nghiệp.
            </p>
            
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg inline-block mb-8">
              <span className="text-2xl font-bold">Chỉ từ 1.500.000 VNĐ/tháng</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl"
                  onClick={() => setShowContactForm(true)}
                  data-testid="button-contact-consultation"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Tư Vấn Miễn Phí
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                  data-testid="button-view-packages"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Xem Các Gói Dịch Vụ
                </Button>
              </motion.div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: "Uptime", value: "99.99%", icon: Activity },
                { label: "Data Centers", value: "3", icon: Building2 },
                { label: "Enterprise Clients", value: "500+", icon: Users },
                { label: "Support Response", value: "< 15min", icon: Clock }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  data-testid={`stat-card-${index}`}
                >
                  <stat.icon className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tại Sao Chọn Colocation STEP?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cơ sở hạ tầng đẳng cấp thế giới với dịch vụ chăm sóc khách hàng tận tâm
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`feature-card-${index}`}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div 
                      className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: feature.color }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Gói Dịch Vụ Colocation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lựa chọn gói phù hợp với quy mô và nhu cầu của doanh nghiệp bạn
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colocationPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative"
                data-testid={`package-card-${pkg.id}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 shadow-lg">
                      Phổ Biến Nhất
                    </Badge>
                  </div>
                )}
                
                <Card 
                  className={`h-full border-2 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    pkg.popular ? 'border-blue-400 ring-4 ring-blue-100' : ''
                  }`}
                  style={{
                    backgroundColor: pkg.bgColor,
                    borderColor: pkg.borderColor
                  }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold" style={{ color: pkg.color }}>
                        {pkg.name}
                      </h3>
                      <p className="text-gray-600 mt-1">{pkg.subtitle}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl font-bold" style={{ color: pkg.color }}>
                          {pkg.price.toLocaleString('vi-VN')}
                        </span>
                        <span className="text-gray-500">VNĐ/tháng</span>
                      </div>
                      <div className="text-sm text-gray-400 line-through">
                        {pkg.originalPrice.toLocaleString('vi-VN')} VNĐ
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">Không gian</div>
                        <div className="text-gray-600">{pkg.space}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">Điện năng</div>
                        <div className="text-gray-600">{pkg.power}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">Băng thông</div>
                        <div className="text-gray-600">{pkg.bandwidth}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">IP Public</div>
                        <div className="text-gray-600">{pkg.ips}</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="text-sm text-center">
                        <div className="font-semibold text-gray-900 mb-1">{pkg.support}</div>
                        <div className="text-gray-600">{pkg.sla}</div>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full font-semibold py-3"
                      style={{ backgroundColor: pkg.color }}
                      onClick={() => handlePackageSelect(pkg.id)}
                      data-testid={`button-select-${pkg.id}`}
                    >
                      Chọn Gói Này
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Excellence Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Dịch Vụ Hỗ Trợ Tận Răng
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm dịch vụ khách hàng xuất sắc nhất trong ngành
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {supportLevels.map((support, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                data-testid={`support-card-${index}`}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8 flex gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <support.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {support.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {support.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Sẵn Sàng Thuê Chỗ Đặt Máy Chủ Tại STEP?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Liên hệ ngay để được tư vấn miễn phí và nhận báo giá ưu đãi cho doanh nghiệp
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                    onClick={() => setShowContactForm(true)}
                    data-testid="button-contact-expert"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Liên Hệ Chuyên Gia
                  </Button>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center">
                <div className="flex items-center justify-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">0985.636.289</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">colocation@step.com.vn</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Hà Nội, TP.HCM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* Contact Form Modal */}
      <ContactForm 
        open={showContactForm} 
        onOpenChange={setShowContactForm}
      />
    </div>
  );
}