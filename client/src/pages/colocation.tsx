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
  Eye,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { useToast } from "@/hooks/use-toast";

// FAQ Accordion Component
function FAQAccordion({ openFaqIndex, setOpenFaqIndex }: { 
  openFaqIndex: number | null; 
  setOpenFaqIndex: (index: number | null) => void;
}) {
  const faqs = [
    {
      question: "Colocation là gì và tại sao doanh nghiệp nên sử dụng?",
      answer: "Colocation là dịch vụ cho thuê không gian, điện, làm mát và kết nối mạng để đặt máy chủ của khách hàng tại data center chuyên nghiệp. Lợi ích bao gồm: tiết kiệm chi phí xây dựng data center riêng, đảm bảo uptime cao 99.9%, bảo mật vật lý 24/7, băng thông chất lượng cao và hỗ trợ kỹ thuật chuyên nghiệp."
    },
    {
      question: "STEP có những gói colocation nào và giá cả ra sao?",
      answer: "STEP cung cấp 6 gói chính từ S-CMC01 (1.5M VNĐ/tháng) cho startup đến S-Full Rack (28.5M VNĐ/tháng) cho enterprise. Mỗi gói bao gồm không gian rack, điện, băng thông, IP và hỗ trợ 24/7. Khách hàng thanh toán 12 tháng được giảm 3-12% và nhận thêm các dịch vụ bổ sung miễn phí."
    },
    {
      question: "Data center của STEP có đạt chuẩn quốc tế không?",
      answer: "STEP hợp tác với các data center đạt chuẩn Tier III+ có chứng nhận ISO 27001, SOC 2. Hệ thống điện dự phòng N+1, UPS và máy phát điện đảm bảo 99.99% uptime. Hệ thống làm mát chính xác, giám sát 24/7, kiểm soát ra vào bằng thẻ từ và camera an ninh đa lớp."
    },
    {
      question: "Băng thông quốc tế tại STEP có ưu điểm gì?",
      answer: "STEP kết nối trực tiếp 4 tuyến cáp quang quốc tế (AAG, APG, IA, SMW3) và các Internet Exchange Point trong nước. Băng thông quốc tế lên đến 10Gbps với độ trễ thấp < 50ms tới Singapore, < 150ms tới US/EU. Có DDoS Protection miễn phí và redundant routing tự động đảm bảo kết nối ổn định."
    },
    {
      question: "Quy trình triển khai colocation mất bao lâu?",
      answer: "Sau khi ký hợp đồng, STEP sẽ chuẩn bị rack và kết nối trong 24-48h cho gói cơ bản, 3-5 ngày cho gói rack. Khách hàng có thể tự vận chuyển thiết bị hoặc sử dụng dịch vụ vận chuyển của STEP. Đội ngũ kỹ thuật hỗ trợ cài đặt, cấu hình và kiểm tra hệ thống trước khi bàn giao."
    },
    {
      question: "STEP có hỗ trợ remote hands và managed service không?",
      answer: "Có, STEP cung cấp dịch vụ remote hands 24/7 bao gồm: reboot server, thay thế linh kiện, kiểm tra led status, cắm rút cable. Ngoài ra có gói managed service toàn diện: giám sát server, backup, patching, security monitoring và báo cáo hàng tháng với mức phí hợp lý."
    },
    {
      question: "Chính sách bảo mật và backup như thế nào?",
      answer: "STEP áp dụng bảo mật đa lớp: kiểm soát ra vào bằng thẻ từ, camera 24/7, giám sát mạng real-time, firewall hardware. Có dịch vụ backup tự động hàng ngày với lưu trữ offsite, disaster recovery plan và khả năng restore nhanh chóng. Tất cả đều tuân thủ chuẩn ISO 27001."
    },
    {
      question: "Có thể mở rộng hoặc downgrade gói dịch vụ không?",
      answer: "Hoàn toàn có thể. STEP hỗ trợ scale up/down linh hoạt theo nhu cầu kinh doanh. Việc upgrade diễn ra ngay trong ngày, downgrade sẽ có hiệu lực từ kỳ thanh toán tiếp theo. Phí chênh lệch sẽ được tính theo tỷ lệ thời gian sử dụng thực tế."
    }
  ];

  return (
    <>
      {faqs.map((faq, index) => {
        const isOpen = openFaqIndex === index;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="border border-gray-200 rounded-xl overflow-hidden"
            data-testid={`faq-item-${index}`}
          >
            <button
              onClick={() => setOpenFaqIndex(isOpen ? null : index)}
              className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
              data-testid={`faq-question-${index}`}
              aria-expanded={isOpen}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            <motion.div
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 bg-gray-50">
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

export default function Colocation() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { toast } = useToast();

  // Real colocation service packages based on BKNS market data
  const colocationPackages = [
    {
      id: "s-cmc01", 
      name: "S-CMC01",
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
      id: "s-cmc02",
      name: "S-CMC02", 
      subtitle: "Nâng cao cho doanh nghiệp",
      price: 1450000,
      unit: "VNĐ/tháng + VAT",
      originalPrice: 1700000,
      popular: false,
      space: "1U Server",
      power: "300W",
      bandwidth: "300Mbps trong nước / 5Mbps quốc tế",
      ips: "2 IPv4 + IPv6",
      color: "hsl(207, 100%, 40%)",
      bgColor: "hsl(207, 100%, 96%)",
      borderColor: "hsl(207, 100%, 80%)",
      features: [
        "Chỗ đặt máy chủ: 1U",
        "Công suất điện: 300W",
        "Lưu lượng thông tin: Không giới hạn",
        "Băng thông trong nước: 300Mbps",
        "Băng thông quốc tế: 5Mbps",
        "Cổng cắm mạng: 1Gbps",
        "Điện máy nổ dự phòng: Có",
        "UPS: Có", 
        "IPv4: 2 IP/máy",
        "IPv6: Có",
        "Remote hands: Có",
        "Hỗ trợ kỹ thuật: 24/7",
        "Giảm 5% khi thanh toán 12 tháng"
      ],
      support: "Hỗ trợ 24/7 ưu tiên",
      sla: "99.8% uptime SLA"
    },
    {
      id: "s-cmc03",
      name: "S-CMC03",
      subtitle: "Cao cấp cho enterprise",
      price: 2550000, 
      unit: "VNĐ/tháng + VAT",
      originalPrice: 3000000,
      popular: false,
      space: "2U Server",
      power: "750W",
      bandwidth: "300Mbps trong nước / 5Mbps quốc tế",
      ips: "2 IPv4 + IPv6",
      color: "hsl(271, 91%, 65%)",
      bgColor: "hsl(271, 91%, 96%)",
      borderColor: "hsl(271, 91%, 75%)",
      features: [
        "Chỗ đặt máy chủ: 2U",
        "Công suất điện: 750W",
        "Lưu lượng thông tin: Không giới hạn",
        "Băng thông trong nước: 300Mbps",
        "Băng thông quốc tế: 5Mbps",
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
      id: "s-quarter-rack",
      name: "S-Quarter Rack",
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
      id: "s-half-rack",
      name: "S-Half Rack",
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
      id: "s-full-rack",
      name: "S-Full Rack",
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
    window.location.href = '/contact';
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
                  onClick={() => window.location.href = '/contact'}
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

      {/* Supplementary Services Pricing Section */}
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
              Bảng Giá Dịch Vụ Bổ Sung
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Các dịch vụ và tùy chọn bổ sung để tùy chỉnh giải pháp colocation theo nhu cầu của bạn
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: "⚡",
                title: "Tăng thêm công suất điện",
                subtitle: "100W", 
                price: 200000,
                color: "hsl(339, 82%, 52%)",
                bgColor: "hsl(339, 82%, 96%)"
              },
              {
                icon: "🗄️",
                title: "Bổ sung Rack", 
                subtitle: "1U",
                price: 200000,
                color: "hsl(142, 76%, 36%)",
                bgColor: "hsl(142, 76%, 96%)"
              },
              {
                icon: "📦",
                title: "Đặt thêm thiết bị",
                subtitle: "1U, 50W",
                price: 1000000,
                color: "hsl(271, 91%, 65%)",
                bgColor: "hsl(271, 91%, 96%)"
              },
              {
                icon: "📡",
                title: "Băng thông",
                subtitle: "100Mbps/5Mbps",
                price: 200000,
                color: "hsl(207, 100%, 40%)",
                bgColor: "hsl(207, 100%, 96%)"
              },
              {
                icon: "🌐",
                title: "IP",
                subtitle: "01 IP",
                price: 50000,
                color: "hsl(25, 95%, 53%)",
                bgColor: "hsl(25, 95%, 96%)"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                data-testid={`supplementary-service-${index}`}
              >
                <Card 
                  className="h-full border-2 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                  style={{ 
                    backgroundColor: service.bgColor,
                    borderColor: service.color + "40"
                  }}
                >
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <p className="text-sm text-gray-600 mb-4">{service.subtitle}</p>
                    )}
                    <div className="text-center">
                      <span 
                        className="text-2xl font-bold"
                        style={{ color: service.color }}
                      >
                        {service.price.toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                📞 Tư Vấn Dịch Vụ Bổ Sung
              </h3>
              <p className="text-blue-700 mb-4">
                Cần tư vấn chi tiết về các dịch vụ bổ sung phù hợp với hạ tầng của bạn? 
                Liên hệ ngay với chuyên gia của chúng tôi!
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-contact-supplementary"
              >
                <Phone className="mr-2 h-4 w-4" />
                Liên Hệ Tư Vấn
              </Button>
            </div>
          </motion.div>
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
                    onClick={() => window.location.href = '/contact'}
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
                  <span className="font-semibold">info@step.com.vn</span>
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

      {/* STEP Data Center Partnership Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              STEP - ĐỐI TÁC UY TÍN CỦA CÁC DATA CENTER TẠI VIỆT NAM
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Với hơn 15 năm kinh nghiệm, STEP tự hào là đối tác chiến lược của các trung tâm dữ liệu hàng đầu Việt Nam, 
              cung cấp dịch vụ colocation chất lượng cao với tiêu chuẩn quốc tế.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Partner Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                {[
                  {
                    icon: Building2,
                    title: "Data Center Tier III+",
                    desc: "Hợp tác với các data center đạt chuẩn Tier III+ tại Hà Nội và TP.HCM"
                  },
                  {
                    icon: Award,
                    title: "15+ Năm Kinh Nghiệm",
                    desc: "Đối tác tin cậy của FPT, Viettel, VNPT, CMC và các tập đoàn công nghệ lớn"
                  },
                  {
                    icon: Shield,
                    title: "Chứng Nhận ISO 27001",
                    desc: "Đảm bảo an toàn bảo mật theo tiêu chuẩn quốc tế cao nhất"
                  },
                  {
                    icon: Network,
                    title: "Kết Nối Quốc Tế",
                    desc: "Trực tiếp kết nối các cáp quang quốc tế AAG, APG, IA, SMW3"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-white/20 p-3 rounded-xl">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-blue-100 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Partnership Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: "50+", label: "Data Center Partners", icon: Building2 },
                { number: "99.99%", label: "Uptime SLA", icon: Activity },
                { number: "5000+", label: "Servers Hosted", icon: Server },
                { number: "24/7", label: "Expert Support", icon: Headphones }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-white/20"
                >
                  <stat.icon className="h-8 w-8 text-white mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* International Bandwidth Advantages */}
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
              Ưu Thế Băng Thông Quốc Tế Vượt Trội Tại STEP
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Kết nối trực tiếp với các tuyến cáp quang quốc tế, đảm bảo tốc độ và độ ổn định tối ưu cho doanh nghiệp
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Kết Nối Đa Tuyến",
                icon: Network,
                color: "hsl(207, 100%, 40%)",
                bgColor: "hsl(207, 100%, 96%)",
                features: [
                  "Cáp quang AAG (Asia America Gateway)",
                  "Cáp quang APG (Asia Pacific Gateway)", 
                  "Cáp quang IA (Intra Asia)",
                  "Cáp quang SMW3 (Sea-Me-We 3)",
                  "Kết nối VNIX, FPT IX"
                ]
              },
              {
                title: "Tốc Độ Vượt Trội",
                icon: Zap,
                color: "hsl(142, 76%, 36%)",
                bgColor: "hsl(142, 76%, 96%)",
                features: [
                  "Băng thông quốc tế up to 10Gbps",
                  "Độ trễ thấp < 50ms tới Singapore",
                  "Độ trễ < 150ms tới US/EU",
                  "Redundant routing tự động",
                  "Load balancing thông minh"
                ]
              },
              {
                title: "Độ Tin Cậy Cao",
                icon: Shield,
                color: "hsl(339, 82%, 52%)",
                bgColor: "hsl(339, 82%, 96%)",
                features: [
                  "99.9% uptime guarantee",
                  "DDoS Protection miễn phí",
                  "24/7 Network Monitoring",
                  "Automatic failover",
                  "SLA compensation"
                ]
              }
            ].map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                data-testid={`bandwidth-advantage-${index}`}
              >
                <Card 
                  className="h-full border-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ 
                    backgroundColor: advantage.bgColor,
                    borderColor: advantage.color + "40"
                  }}
                >
                  <CardHeader className="text-center pb-4">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: advantage.color + "20" }}
                    >
                      <advantage.icon 
                        className="h-8 w-8"
                        style={{ color: advantage.color }}
                      />
                    </div>
                    <CardTitle 
                      className="text-xl font-bold"
                      style={{ color: advantage.color }}
                    >
                      {advantage.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {advantage.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bandwidth Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              So Sánh Hiệu Năng Băng Thông Quốc Tế
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { region: "Singapore", latency: "< 50ms", speed: "10Gbps", reliability: "99.9%" },
                { region: "USA/EU", latency: "< 150ms", speed: "5Gbps", reliability: "99.8%" },
                { region: "Other Asia", latency: "< 80ms", speed: "8Gbps", reliability: "99.9%" }
              ].map((region, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-lg mb-4 text-blue-600">{region.region}</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{region.latency}</div>
                      <div className="text-sm text-gray-600">Độ trễ</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{region.speed}</div>
                      <div className="text-sm text-gray-600">Tốc độ tối đa</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{region.reliability}</div>
                      <div className="text-sm text-gray-600">Độ tin cậy</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-xl text-gray-600">
              Những thắc mắc phổ biến về dịch vụ thuê chỗ đặt máy chủ tại STEP
            </p>
          </motion.div>

          <div className="space-y-6">
            <FAQAccordion openFaqIndex={openFaqIndex} setOpenFaqIndex={setOpenFaqIndex} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Vẫn Còn Câu Hỏi?
              </h3>
              <p className="text-blue-700 mb-6">
                Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn miễn phí 24/7
              </p>
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-contact-support"
              >
                <Phone className="mr-2 h-5 w-5" />
                Liên Hệ Hỗ Trợ
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}