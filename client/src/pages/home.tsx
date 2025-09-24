import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Cloud, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Server, 
  Globe, 
  Database,
  Cpu,
  Lock,
  TrendingUp,
  Users,
  Clock,
  Award,
  Star,
  Mail,
  Phone,
  MapPin,
  Monitor,
  Settings,
  Wifi,
  Building,
  Target,
  ShoppingCart,
  Wrench,
  GraduationCap,
  Shield as SecurityIcon,
  Camera,
  HardDrive
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PersonalizedContent from "@/components/personalized-content";
import PersonalizationSettings from "@/components/personalization-settings";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Import individual certification logos
import mctLogo from "@assets/stock_images/microsoft_mct_certif_493f1793.jpg";
import lpiLogo from "@assets/stock_images/linux_lpi_certificat_7b9ff9bb.jpg";
import safeticaLogo from "@assets/stock_images/safetica_dlp_data_lo_bba47609.jpg";
import vcp5Logo from "@assets/stock_images/vmware_vcp5_certific_a526225f.jpg";
import ccnaLogo from "@assets/stock_images/cisco_ccna_certifica_d07d1cf8.jpg";
import cehLogo from "@assets/stock_images/ceh_certified_ethica_af6a104b.jpg";

// Import individual partner logos
import vmwareLogo from "@assets/stock_images/vmware_company_logo_98a8fa28.jpg";
import vzamLogo from "@assets/stock_images/vzam_vietnam_technol_fb730dcd.jpg";
import arubaLogo from "@assets/stock_images/aruba_hpe_hewlett_pa_b3c10f89.jpg";
import fptLogo from "@assets/stock_images/fpt_corporation_viet_ff353a19.jpg";
import dellLogo from "@assets/stock_images/dell_technologies_co_b3482cfd.jpg";
import nakivoLogo from "@assets/stock_images/nakivo_backup_softwa_cf7d1f6e.jpg";
import hvcgLogo from "@assets/stock_images/hvcg_software_vietna_15b303d0.jpg";
import viettelLogo from "@assets/stock_images/viettel_telecommunic_f34dd040.jpg";

// Import individual customer logos
import medlatecLogo from "@assets/stock_images/medlatec_medical_cen_eca53331.jpg";
import bsgLogo from "@assets/stock_images/bsg_vietnam_company__bf28746d.jpg";
import hanoiCultureLogo from "@assets/stock_images/vietnam_government_d_85d825a2.jpg";
import vetcLogo from "@assets/stock_images/vetc_vietnam_express_75e5b865.jpg";
import cmcTelecomLogo from "@assets/stock_images/cmc_telecom_vietnam__b4150596.jpg";
import environmentLogo from "@assets/stock_images/vietnam_department_n_585270eb.jpg";
import five9Logo from "@assets/stock_images/five9_contact_center_24cb331f.jpg";
import monyLogo from "@assets/stock_images/mony_vietnam_financi_86ad3a5d.jpg";
import palVietnamLogo from "@assets/stock_images/pal_vietnam_company__ff591243.jpg";

// Import company images for fallback
import certificationsImage from "@assets/image_1758666044115.png";
import customersPartnersImage from "@assets/image_1758666058304.png";
import serviceProcessImage from "@assets/image_1758666086640.png";
import detailedServicesImage from "@assets/image_1758666113896.png";

interface UserInfo {
  name: string;
  company: string;
  role: string;
  interests: string[];
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already completed personalization
    const savedUserInfo = localStorage.getItem('stepUserInfo');
    
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
      setIsPersonalized(true);
    }
  }, []);


  const handleResetPersonalization = () => {
    localStorage.removeItem('stepUserInfo');
    setUserInfo(null);
    setIsPersonalized(false);
    toast({
      title: "Đã xóa cá nhân hóa",
      description: "Dữ liệu cá nhân hóa đã được xóa",
    });
  };



  const [showContactForm, setShowContactForm] = useState(false);

  // Cloud data and statistics
  const cloudMetrics = [
    { label: "Uptime Guarantee", value: "99.99%", icon: Clock },
    { label: "Active Clients", value: "5,000+", icon: Users },
    { label: "Data Centers", value: "8", icon: Server },
    { label: "Support Response", value: "< 2min", icon: Zap }
  ];

  // Technical Certifications data with individual logos
  const technicalCertifications = [
    { name: "MCT", fullName: "Microsoft Certificate Windows Server", color: "bg-blue-500", logo: mctLogo },
    { name: "Linux LPI", fullName: "Linux Professional Institute", color: "bg-orange-500", logo: lpiLogo },
    { name: "DLP Safetica", fullName: "Data Loss Prevention của hãng Safetica", color: "bg-green-500", logo: safeticaLogo },
    { name: "VCP5", fullName: "VMware Certified Professional", color: "bg-purple-500", logo: vcp5Logo },
    { name: "Cisco CCNA", fullName: "Cisco Certified Network Associate", color: "bg-cyan-500", logo: ccnaLogo },
    { name: "CEH", fullName: "Certified Ethical Hacker (Master in Hacking)", color: "bg-red-500", logo: cehLogo }
  ];

  // Service Partners and Customers data with individual logos
  const servicePartners = [
    { name: "VMware", logo: vmwareLogo },
    { name: "CMC Corp", logo: customersPartnersImage }, // Fallback - specific logo failed to download
    { name: "VZAM", logo: vzamLogo },
    { name: "Aruba", logo: arubaLogo },
    { name: "FPT", logo: fptLogo },
    { name: "Dell", logo: dellLogo },
    { name: "Nakivo", logo: nakivoLogo },
    { name: "HVCG Software", logo: hvcgLogo },
    { name: "Viettel", logo: viettelLogo }
  ];

  const customers = [
    { name: "Medlatec", logo: medlatecLogo },
    { name: "BSG", logo: bsgLogo },
    { name: "Sở Văn Hóa Hà Nội", logo: hanoiCultureLogo },
    { name: "VETC", logo: vetcLogo },
    { name: "CMC Telecom", logo: cmcTelecomLogo },
    { name: "Sở Tài Nguyên Môi Trường", logo: environmentLogo },
    { name: "Five9", logo: five9Logo },
    { name: "Mony", logo: monyLogo },
    { name: "Pal Vietnam", logo: palVietnamLogo }
  ];

  // Service Process steps
  const serviceProcess = [
    {
      icon: Target,
      title: "TƯ VẤN GIẢI PHÁP",
      description: "Phân tích nhu cầu và tư vấn giải pháp CNTT phù hợp nhất cho doanh nghiệp",
      color: "step-blue"
    },
    {
      icon: ShoppingCart,
      title: "CUNG CẤP THIẾT BỊ",
      description: "Cung cấp thiết bị, phần cứng và phần mềm chất lượng cao từ các nhà sản xuất uy tín",
      color: "step-light-blue"
    },
    {
      icon: Wrench,
      title: "TRIỂN KHAI THI CÔNG",
      description: "Triển khai, cài đặt và cấu hình hệ thống theo đúng thiết kế và tiêu chuẩn kỹ thuật",
      color: "step-blue"
    },
    {
      icon: Settings,
      title: "DỊCH VỤ VẬN HÀNH TRỌN GÓI",
      description: "Vận hành, bảo trì và hỗ trợ kỹ thuật 24/7 để đảm bảo hệ thống hoạt động ổn định",
      color: "step-light-blue"
    }
  ];


  const cloudServices = [
    {
      icon: Cloud,
      title: "Cloud Server",
      description: "Máy chủ đám mây linh hoạt với CPU/GPU cao cấp, scale tự động và tối ưu chi phí theo nhu cầu sử dụng.",
      features: ["Scale Tự Động", "CPU/GPU Cao Cấp", "Pay-as-you-use", "Docker/K8s Support"],
      stepColor: "step-cloud"
    },
    {
      icon: Globe,
      title: "Web Hosting",
      description: "Hosting WordPress, Laravel, Node.js với SSD NVMe, CDN tích hợp và backup tự động hàng ngày.",
      features: ["SSD NVMe", "CDN Tích Hợp", "SSL Miễn Phí", "Backup Tự Động"],
      stepColor: "step-hosting"
    },
    {
      icon: Server,
      title: "Dedicated Server",
      description: "Máy chủ riêng biệt với phần cứng enterprise, băng thông không giới hạn và quản lý 24/7.",
      features: ["Phần Cứng Enterprise", "Băng Thông Unlimited", "Quản Lý 24/7", "Root Access"],
      stepColor: "step-server"
    },
    {
      icon: Database,
      title: "Colocation",
      description: "Dịch vụ đặt máy chủ tại datacenter với điện lưới dự phòng, bảo mật vật lý và kết nối internet cao cấp.",
      features: ["Điện Lưới Dự Phòng", "Bảo Mật 24/7", "Kết Nối Cao Cấp", "Môi Trường Kiểm Soát"],
      stepColor: "step-colocation"
    },
    {
      icon: Mail,
      title: "Email Hybrid",
      description: "Giải pháp email doanh nghiệp kết hợp cloud và on-premise với bảo mật cao và khả năng mở rộng.",
      features: ["Anti-Spam/Virus", "Backup Email", "Mobile Sync", "Compliance Ready"],
      stepColor: "step-email"
    },
    {
      icon: Shield,
      title: "DLP - Data Loss Prevention",
      description: "Bảo vệ dữ liệu nhạy cảm khỏi rò rỉ với giám sát thời gian thực, phân loại tự động và chính sách bảo mật linh hoạt.",
      features: ["Ngăn Rò Rỉ Dữ Liệu", "Giám Sát Thời Gian Thực", "Chính Sách Theo Vai Trò", "Báo Cáo Tuân Thủ"],
      stepColor: "step-dlp"
    }
  ];

  const testimonials = [
    {
      name: "Nguyễn Minh Tuấn",
      company: "FPT Software",
      role: "Infrastructure Manager",
      content: "Cloud Server của STEP giúp chúng tôi tiết kiệm 50% chi phí và scale linh hoạt theo project. GPU computing rất mạnh cho AI workload.",
      rating: 5
    },
    {
      name: "Trần Thị Linh", 
      company: "VinCommerce",
      role: "IT Director",
      content: "Dedicated Server ổn định 99.9%, băng thông unlimited giúp e-commerce platform chạy mượt mà trong Black Friday. Hỗ trợ 24/7 rất chuyên nghiệp.",
      rating: 5
    },
    {
      name: "Phạm Văn Đức",
      company: "BKAV Corporation",
      role: "Security Lead", 
      content: "Email Hybrid solution hoàn hảo cho security compliance. Anti-spam hiệu quả 99.9%, backup tự động giúp an tâm về dữ liệu.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main>
        {isPersonalized && userInfo ? (
          <div className="pt-20 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <PersonalizedContent userInfo={userInfo} />
          </div>
        ) : (
          /* Modern Hero Section */
          <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10"></div>
              
              {/* Floating Cloud Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-blue-400/20 rounded-full"
                  initial={{ 
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
                  }}
                  animate={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  }}
                  transition={{
                    duration: 20 + Math.random() * 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors" data-testid="badge-enterprise">
                    🚀 Enterprise Cloud Solutions
                  </Badge>
                  
                  <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent mb-6" data-testid="text-hero-title" style={{backgroundImage: `linear-gradient(to right, hsl(var(--step-blue)), hsl(var(--step-light-blue)))`}}>
                    Điện Toán Đám Mây
                    <br />
                    <span className="text-slate-800">Dịch Vụ Hạ Tầng Toàn Diện</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-testid="text-hero-description">
                    Giải pháp hạ tầng IT toàn diện cho doanh nghiệp Việt Nam. Từ 
                    <span className="font-semibold" style={{color: `hsl(var(--step-cloud))`}}> Cloud Server</span>, 
                    <span className="font-semibold" style={{color: `hsl(var(--step-hosting))`}}> Web Hosting</span>, 
                    <span className="font-semibold" style={{color: `hsl(var(--step-server))`}}> Dedicated Server</span>, 
                    <span className="font-semibold" style={{color: `hsl(var(--step-colocation))`}}> Colocation</span>, 
                    <span className="font-semibold" style={{color: `hsl(var(--step-email))`}}> Email Hybrid</span> đến
                    <span className="font-semibold" style={{color: `hsl(var(--step-dlp))`}}> DLP</span> - Tất cả trong một nền tảng.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg" 
                        className="text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                        style={{
                          backgroundImage: `linear-gradient(to right, hsl(var(--step-blue)), hsl(var(--step-light-blue)))`
                        }}
                        onClick={() => setShowContactForm(true)}
                        data-testid="button-start-free"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundImage = `linear-gradient(to right, hsl(var(--step-blue)), hsl(var(--step-blue)))`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundImage = `linear-gradient(to right, hsl(var(--step-blue)), hsl(var(--step-light-blue)))`;
                        }}
                      >
                        Xem Demo Sản Phẩm
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="px-8 py-4 text-lg font-semibold transition-all duration-300"
                        style={{
                          borderColor: `hsl(var(--step-blue))`,
                          color: `hsl(var(--step-blue))`
                        }}
                        onClick={() => window.location.href = '/bao-gia'}
                        data-testid="button-quote-builder"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `hsl(var(--step-blue))`;
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = `hsl(var(--step-blue))`;
                        }}
                      >
                        Xây Dựng Báo Giá
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Cloud Metrics Dashboard */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                  {cloudMetrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
                      data-testid={`metric-card-${index}`}
                    >
                      <metric.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-slate-800 mb-1">{metric.value}</div>
                      <div className="text-sm text-slate-600">{metric.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Cloud Services Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200" data-testid="badge-services">
                ☁️ Cloud Services
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-services-title">
                6 Dịch Vụ Cốt Lõi
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Từ cloud server linh hoạt, hosting chuyên nghiệp, dedicated server cao cấp, colocation an toàn, email hybrid bảo mật đến DLP ngăn chặn rò rỉ dữ liệu - STEP cung cấp giải pháp IT toàn diện.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {cloudServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                  data-testid={`service-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="p-8">
                      <div className="relative">
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`} style={{backgroundColor: `hsl(var(--${service.stepColor}))`}}></div>
                        
                        <div className="relative">
                          <div className={`inline-flex p-4 rounded-xl text-white mb-6`} style={{backgroundColor: `hsl(var(--${service.stepColor}))`}}>
                            <service.icon className="h-8 w-8" />
                          </div>
                          
                          <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                          <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                          
                          <div className="space-y-3">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-slate-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button 
                            className="mt-6 w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 transition-all duration-300"
                            onClick={() => setShowContactForm(true)}
                            data-testid={`button-learn-more-${index}`}
                          >
                            Tìm Hiểu Thêm
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6" data-testid="text-process-title">
                TỔNG QUAN VỀ SẢN PHẨM - GIẢI PHÁP - DỊCH VỤ - HỆ SINH THÁI
              </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {serviceProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="relative"
                    data-testid={`process-step-${index}`}
                  >
                    <Card className="h-full text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                      <CardContent className="p-0">
                        <div className="inline-flex p-4 rounded-xl text-white mb-6 !bg-blue-500 bg-blue-500" style={{backgroundColor: '#3b82f6 !important'}}>
                          <step.icon className="h-8 w-8" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 mb-4">{step.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                    
                    {/* Arrow connector (except for last item) */}
                    {index < serviceProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="h-6 w-6 text-blue-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Technical Certifications Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200" data-testid="badge-certifications">
                🏆 Chứng Chỉ Kỹ Thuật
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-certifications-title">
                Chuyên Môn Được Công Nhận
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Đội ngũ STEP sở hữu các chứng chỉ quốc tế uy tín, đảm bảo chất lượng dịch vụ cao nhất cho khách hàng.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {technicalCertifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  data-testid={`cert-card-${index}`}
                >
                  <Card className="h-full text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-0">
                      <div className={`inline-flex p-4 rounded-xl text-white mb-4 ${cert.color}`}>
                        <img 
                          src={cert.logo} 
                          alt={cert.name}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 mb-2">{cert.name}</h3>
                      <p className="text-xs text-slate-500 leading-tight">{cert.fullName}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Customers and Partners Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200" data-testid="badge-partners">
                🤝 Đối Tác & Khách Hàng
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-partners-title">
                Khách Hàng Của Chúng Tôi
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Được tin tưởng bởi hàng trăm doanh nghiệp và đối tác uy tín trong và ngoài nước.
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              {/* Service Partners */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-center text-slate-700 mb-8">Đối tác dịch vụ</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {servicePartners.map((partner, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      data-testid={`partner-${index}`}
                    >
                      <Card className="p-6 text-center border border-gray-200 hover:border-blue-300 transition-all duration-300 bg-white">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-center h-12 mb-3">
                            <img 
                              src={partner.logo} 
                              alt={partner.name}
                              className="h-8 w-12 object-contain"
                            />
                          </div>
                          <p className="font-medium text-slate-700 text-sm">{partner.name}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Customers */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-center text-slate-700 mb-8">Khách hàng</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {customers.map((customer, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      data-testid={`customer-${index}`}
                    >
                      <Card className="p-6 text-center border border-gray-200 hover:border-green-300 transition-all duration-300 bg-white">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-center h-12 mb-3">
                            <img 
                              src={customer.logo} 
                              alt={customer.name}
                              className="h-8 w-12 object-contain"
                            />
                          </div>
                          <p className="font-medium text-slate-700 text-sm">{customer.name}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200" data-testid="badge-testimonials">
                ⭐ Success Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-testimonials-title">
                Khách Hàng Nói Về Chúng Tôi
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Hơn 5,000+ doanh nghiệp tin tưởng STEP cho giải pháp hạ tầng IT toàn diện.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  data-testid={`testimonial-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-8">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                      <div className="border-t border-slate-200 pt-4">
                        <div className="font-semibold text-slate-800">{testimonial.name}</div>
                        <div className="text-sm text-slate-600">{testimonial.role} tại {testimonial.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-24 relative overflow-hidden" style={{backgroundImage: `linear-gradient(to right, hsl(var(--step-blue)), hsl(var(--step-light-blue)))`}}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-cta-title">
                Sẵn Sàng Chuyển Đổi Số Với STEP?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Liên hệ ngay để được tư vấn miễn phí về giải pháp cloud phù hợp với doanh nghiệp của bạn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                    onClick={() => setShowContactForm(true)}
                    data-testid="button-contact-now"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Liên Hệ Ngay
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                    onClick={() => setShowContactForm(true)}
                    data-testid="button-free-consultation"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Tư Vấn Miễn Phí
                  </Button>
                </motion.div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3" data-testid="contact-phone">
                  <Phone className="h-5 w-5" />
                  <span>0985.636.289</span>
                </div>
                <div className="flex items-center justify-center gap-3" data-testid="contact-email">
                  <Mail className="h-5 w-5" />
                  <span>info@step.com.vn</span>
                </div>
                <div className="flex items-center justify-center gap-3" data-testid="contact-address">
                  <MapPin className="h-5 w-5" />
                  <span>Hà Nội, Việt Nam</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Contact Form Modal */}
      <ContactForm 
        open={showContactForm} 
        onOpenChange={setShowContactForm}
      />
      
      {/* Only show personalization settings if user has completed welcome */}
      {isPersonalized && userInfo && (
        <PersonalizationSettings 
          userInfo={userInfo}
          onReset={handleResetPersonalization}
        />
      )}
    </div>
  );
}