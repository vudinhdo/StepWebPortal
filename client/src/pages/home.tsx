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
  HardDrive,
  CloudSnow,
  Layers,
  MailCheck,
  ShieldCheck,
  Cpu as ProcessorIcon,
  Network,
  Activity,
  Gauge,
  Hexagon,
  Box
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PersonalizedContent from "@/components/personalized-content";
import PersonalizationSettings from "@/components/personalization-settings";
import ContactForm from "@/components/contact-form";
import CloudServicesBlock from "@/components/cloud-services-block";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Import individual certification logos
import mctLogo from "@assets/stock_images/microsoft_certified__4ac49bd2.jpg";
import lpiLogo from "@assets/stock_images/linux_professional_i_86f60517.jpg";
import safeticaLogo from "@assets/stock_images/safetica_data_loss_p_4dcd0791.jpg";
import vcp5Logo from "@assets/stock_images/vmware_certified_pro_3b50b772.jpg";
import ccnaLogo from "@assets/stock_images/cisco_ccna_certified_f86a7696.jpg";
import cehLogo from "@assets/stock_images/ceh_certified_ethica_4ee2900f.jpg";

// Import partner/customer logos
import vmwareLogo from "@assets/stock_images/vmware_company_logo_98a8fa28.jpg";
import vzamLogo from "@assets/stock_images/vzam_vietnam_technol_fb730dcd.jpg";
import arubaLogo from "@assets/stock_images/aruba_hpe_hewlett_pa_b3c10f89.jpg";
import fptLogo from "@assets/stock_images/fpt_corporation_viet_ff353a19.jpg";
import dellLogo from "@assets/stock_images/dell_technologies_co_b3482cfd.jpg";
import nakivoLogo from "@assets/stock_images/nakivo_backup_softwa_cf7d1f6e.jpg";
import hvcgLogo from "@assets/stock_images/hvcg_software_vietna_15b303d0.jpg";
import viettelLogo from "@assets/stock_images/viettel_telecommunic_f34dd040.jpg";
import medlatecLogo from "@assets/stock_images/medlatec_medical_cen_eca53331.jpg";
import bsgLogo from "@assets/stock_images/bsg_vietnam_company__bf28746d.jpg";
import hanoiCultureLogo from "@assets/stock_images/vietnam_government_d_85d825a2.jpg";
import vetcLogo from "@assets/stock_images/vetc_vietnam_express_75e5b865.jpg";
import cmcTelecomLogo from "@assets/stock_images/cmc_telecom_vietnam__b4150596.jpg";
import environmentLogo from "@assets/stock_images/vietnam_department_n_585270eb.jpg";
import five9Logo from "@assets/stock_images/five9_contact_center_24cb331f.jpg";
import monyLogo from "@assets/stock_images/mony_vietnam_financi_86ad3a5d.jpg";
import palVietnamLogo from "@assets/stock_images/pal_vietnam_company__ff591243.jpg";

// Import images
import certificationsImage from "@assets/image_1758666044115.png";
import customersPartnersImage from "@assets/image_1758666058304.png";
import itServicesImage from "@assets/image_1758729782271.png";
import itProductsImage from "@assets/image_1758729789755.png";
import technicalCertificationsImage from "@assets/image_1758729805095.png";
import customersPartnersNewImage from "@assets/image_1758729815652.png";
import stepLogo from "@assets/logo step_1753193285585.png";

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

  // Crypto-themed metrics with neon colors
  const cloudMetrics = [
    { label: "Uptime", value: "99.99%", icon: Clock, color: "neon-blue" },
    { label: "Clients", value: "5K+", icon: Users, color: "neon-pink" },
    { label: "Data Centers", value: "08", icon: Server, color: "neon-green" },
    { label: "Response", value: "<2min", icon: Zap, color: "neon-purple" }
  ];

  // Cloud services with crypto aesthetic
  const cloudServices = [
    {
      icon: CloudSnow,
      title: "Cloud Server",
      description: "Máy chủ đám mây cao cấp với hiệu năng vượt trội và linh hoạt tối đa",
      features: ["CPU Premium", "NVMe Ultra-Fast", "Auto Backup", "24/7 Support"],
      gradient: "crypto-gradient-cyber"
    },
    {
      icon: Monitor,
      title: "Web Hosting",
      description: "Hosting siêu tốc với bảo mật tuyệt đối và mở rộng không giới hạn",
      features: ["Lightning Speed", "Max Security", "Unlimited Scale", "24/7 Support"],
      gradient: "crypto-gradient-matrix"
    },
    {
      icon: HardDrive,
      title: "Dedicated Server",
      description: "Sức mạnh tuyệt đối với máy chủ riêng và phần cứng chuyên dụng",
      features: ["Dedicated Hardware", "Unlimited Bandwidth", "Deep Support", "Full Control"],
      gradient: "crypto-gradient-neon"
    },
    {
      icon: Building,
      title: "Colocation",
      description: "Hạ tầng datacenter đẳng cấp thế giới với hệ sinh thái đa dạng",
      features: ["10GB Port", "Unlimited Bandwidth", "Diverse Ecosystem", "24/7 Support"],
      gradient: "crypto-gradient-fire"
    },
    {
      icon: MailCheck,
      title: "Email Hybrid",
      description: "Email thông minh tích hợp đa nền tảng với tỉ lệ inbox cao nhất",
      features: ["Cost Saving", "Multi-Platform", "High Inbox Rate", "Smart Integration"],
      gradient: "crypto-gradient-cyber"
    },
    {
      icon: ShieldCheck,
      title: "DLP Protection",
      description: "Bảo vệ dữ liệu toàn diện với AI tiên tiến ngăn chặn rò rỉ",
      features: ["AI-Powered", "Real-time Monitor", "Full Protection", "Smart Detection"],
      gradient: "crypto-gradient-neon"
    }
  ];

  const testimonials = [
    {
      name: "Nguyễn Minh Tuấn",
      company: "FPT Software",
      role: "Infrastructure Manager",
      content: "Cloud Server của STEP giúp chúng tôi tiết kiệm 50% chi phí và scale linh hoạt. GPU computing mạnh mẽ cho AI workload.",
      rating: 5
    },
    {
      name: "Trần Thị Linh",
      company: "VinCommerce",
      role: "IT Director",
      content: "Dedicated Server ổn định 99.9%, băng thông unlimited. E-commerce platform chạy mượt mà trong Black Friday.",
      rating: 5
    },
    {
      name: "Phạm Văn Đức",
      company: "BKAV Corporation",
      role: "Security Lead",
      content: "Email Hybrid hoàn hảo cho security compliance. Anti-spam 99.9%, backup tự động đảm bảo an tâm.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {isPersonalized && userInfo ? (
          <div className="pt-20 pb-8 crypto-gradient-cyber">
            <PersonalizedContent userInfo={userInfo} />
          </div>
        ) : (
          /* CRYPTO AESTHETIC HERO SECTION */
          <section className="relative pt-32 pb-48 overflow-hidden animated-grid">
            {/* Neon Grid Background */}
            <div className="absolute inset-0 crypto-grid-bg opacity-30"></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90"></div>

            {/* Animated Geometric Shapes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  scale: 0.5,
                  opacity: 0.1
                }}
                animate={{
                  x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                  y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                  scale: [0.5, 0.8, 0.5],
                  opacity: [0.1, 0.2, 0.1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Hexagon className="w-24 h-24 text-primary/20" strokeWidth={1} />
              </motion.div>
            ))}

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {/* Neon Badge */}
                  <motion.div
                    className="inline-block mb-8"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(0, 217, 255, 0.3)",
                        "0 0 40px rgba(0, 217, 255, 0.5)",
                        "0 0 20px rgba(0, 217, 255, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="neon-border-blue glass-card px-6 py-3 text-primary font-bold text-base" data-testid="badge-enterprise">
                      🚀 ENTERPRISE CLOUD PLATFORM
                    </Badge>
                  </motion.div>
                  
                  {/* Holographic Title */}
                  <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight" data-testid="text-hero-title">
                    <span className="neon-text-blue block mb-4">
                      ĐIỆN TOÁN ĐÁM MÂY
                    </span>
                    <span className="holographic bg-clip-text text-transparent block">
                      NEXT-GEN INFRASTRUCTURE
                    </span>
                  </h1>
                  
                  {/* Description with Glow */}
                  <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed" data-testid="text-hero-description">
                    Nền tảng hạ tầng IT toàn diện cho doanh nghiệp Việt Nam.
                    <br />
                    <span className="neon-text-blue font-semibold">Cloud Server</span> • 
                    <span className="neon-text-green font-semibold"> Hosting</span> • 
                    <span className="neon-text-pink font-semibold"> Dedicated</span> • 
                    <span className="neon-text-purple font-semibold"> Colocation</span>
                  </p>

                  {/* CTA Buttons with Neon Glow */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        className="crypto-gradient-cyber neon-glow-blue px-10 py-6 text-lg font-bold shadow-2xl hover:brightness-110 transition-all"
                        onClick={() => window.location.href = '/contact'}
                        data-testid="button-start-free"
                      >
                        Xem Demo Sản Phẩm
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline"
                        size="lg"
                        className="glass-card neon-border-pink px-10 py-6 text-lg font-bold text-accent hover:bg-accent/10 transition-all"
                        onClick={() => window.location.href = '/bao-gia'}
                        data-testid="button-quote-builder"
                      >
                        Xây Dựng Báo Giá
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Crypto Metrics Dashboard */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
                >
                  {cloudMetrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="glass-card rounded-2xl p-8 neon-pulse relative overflow-hidden group"
                      data-testid={`metric-card-${index}`}
                    >
                      {/* Glow Effect on Hover */}
                      <div className={`absolute inset-0 ${metric.color === 'neon-blue' ? 'neon-glow-blue' : metric.color === 'neon-pink' ? 'neon-glow-pink' : metric.color === 'neon-green' ? 'neon-glow-green' : 'neon-glow-purple'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      
                      <div className="relative z-10">
                        <metric.icon className={`h-10 w-10 mx-auto mb-4 ${
                          metric.color === 'neon-blue' ? 'text-primary' :
                          metric.color === 'neon-pink' ? 'text-[hsl(330,100%,60%)]' :
                          metric.color === 'neon-green' ? 'text-[hsl(120,100%,50%)]' :
                          'text-accent'
                        }`} />
                        <div className={`text-4xl font-black mb-2 ${
                          metric.color === 'neon-blue' ? 'neon-text-blue' :
                          metric.color === 'neon-pink' ? 'neon-text-pink' :
                          metric.color === 'neon-green' ? 'neon-text-green' :
                          'text-accent'
                        }`}>
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground font-semibold tracking-wide uppercase">
                          {metric.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* CRYPTO SERVICES GRID */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 crypto-grid-bg opacity-10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="neon-border-pink glass-card px-6 py-3 text-accent font-bold mb-6" data-testid="badge-services">
                💎 PREMIUM SERVICES
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black mb-6" data-testid="text-services-title">
                <span className="holographic bg-clip-text text-transparent">
                  Dịch Vụ Hạ Tầng IT
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Giải pháp toàn diện từ Cloud đến Security với công nghệ tiên tiến nhất
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {cloudServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group"
                  data-testid={`service-card-${index}`}
                >
                  <Card className="h-full glass-card border-2 border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden relative">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                    
                    <CardContent className="p-8 relative z-10">
                      {/* Icon with Glow */}
                      <div className="mb-6 relative inline-block">
                        <motion.div
                          className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <service.icon className="w-16 h-16 text-primary" />
                        </motion.div>
                        <service.icon className="w-16 h-16 text-primary relative" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:neon-text-blue transition-all">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-foreground/80">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Button 
                        className="w-full mt-6 crypto-gradient-cyber neon-glow-blue hover:brightness-110 transition-all"
                        size="lg"
                        onClick={() => window.location.href = '/contact'}
                      >
                        Tìm Hiểu Thêm
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CloudServicesBlock */}
        <CloudServicesBlock />

        {/* CRYPTO TESTIMONIALS */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 animated-grid opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="neon-border-green glass-card px-6 py-3 text-[hsl(120,100%,50%)] font-bold mb-6" data-testid="badge-testimonials">
                ⭐ SUCCESS STORIES
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black mb-6" data-testid="text-testimonials-title">
                <span className="neon-text-green">Khách Hàng</span>{" "}
                <span className="holographic bg-clip-text text-transparent">Tin Tưởng</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hơn 5,000+ doanh nghiệp đã chọn STEP cho giải pháp hạ tầng IT
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  data-testid={`testimonial-card-${index}`}
                >
                  <Card className="h-full glass-card border-2 border-white/10 hover:neon-glow-pink transition-all duration-300">
                    <CardContent className="p-8">
                      {/* Stars */}
                      <div className="flex mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-foreground/90 mb-6 leading-relaxed italic">
                        "{testimonial.content}"
                      </p>

                      {/* Author */}
                      <div className="border-t border-white/10 pt-6">
                        <div className="font-bold text-foreground neon-text-pink text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                        <div className="text-primary text-sm font-semibold">{testimonial.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IT SERVICES & PRODUCTS IMAGES */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-card p-4 rounded-2xl neon-border-blue"
                data-testid="it-services-image"
              >
                <img 
                  src={itServicesImage} 
                  alt="Dịch Vụ CNTT"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-card p-4 rounded-2xl neon-border-pink"
                data-testid="it-products-image"
              >
                <img 
                  src={itProductsImage} 
                  alt="Sản Phẩm CNTT"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS & PARTNERS */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-card p-4 rounded-2xl neon-border-purple"
                data-testid="technical-certifications-image"
              >
                <img 
                  src={technicalCertificationsImage} 
                  alt="Chứng Chỉ Kỹ Thuật"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-4 rounded-2xl holographic"
                data-testid="customers-partners-image"
              >
                <img 
                  src={customersPartnersNewImage} 
                  alt="Đối Tác & Khách Hàng"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 crypto-gradient-cyber opacity-20"></div>
          <div className="absolute inset-0 animated-grid opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-8" data-testid="text-cta-title">
                <span className="holographic bg-clip-text text-transparent">
                  Sẵn Sàng Bắt Đầu?
                </span>
              </h2>
              <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Liên hệ ngay để nhận tư vấn miễn phí từ chuyên gia STEP
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="crypto-gradient-neon neon-glow-pink px-12 py-8 text-xl font-bold"
                    onClick={() => window.location.href = '/contact'}
                    data-testid="button-contact"
                  >
                    Liên Hệ Ngay
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Personalization Settings */}
        {!isPersonalized && (
          <PersonalizationSettings 
            userInfo={userInfo} 
            onReset={handleResetPersonalization}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
