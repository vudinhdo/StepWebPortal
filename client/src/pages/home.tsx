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
  Play,
  AlertTriangle,
  Package,
  Headphones
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CloudContactForm from "@/components/cloud-contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import individual certification logos
import mctLogo from "@assets/stock_images/microsoft_certified__4ac49bd2.jpg";
import lpiLogo from "@assets/stock_images/linux_professional_i_86f60517.jpg";
import safeticaLogo from "@assets/stock_images/safetica_data_loss_p_4dcd0791.jpg";
import vcp5Logo from "@assets/stock_images/vmware_certified_pro_3b50b772.jpg";
import ccnaLogo from "@assets/stock_images/cisco_ccna_certified_f86a7696.jpg";
import cehLogo from "@assets/stock_images/ceh_certified_ethica_4ee2900f.jpg";

// Import partner and customer logos
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

// Fallback images
import customersPartnersImage from "@assets/image_1758666058304.png";

// IT Challenges for Vietnamese businesses
const itChallenges = [
  {
    icon: TrendingUp,
    title: "Chi Phí IT Cao & Khó Kiểm Soát",
    description: "Đầu tư phần cứng đắt đỏ, khấu hao nhanh, khó dự đoán chi phí vận hành hàng tháng."
  },
  {
    icon: AlertTriangle,
    title: "Thiếu Chuyên Gia IT Nội Bộ",
    description: "Khó tuyển dụng và giữ chân nhân sự IT giỏi, đặc biệt với doanh nghiệp vừa và nhỏ."
  },
  {
    icon: Shield,
    title: "Bảo Mật & Tuân Thủ Phức Tạp",
    description: "Nguy cơ tấn công mạng cao, khó đáp ứng yêu cầu tuân thủ dữ liệu Việt Nam."
  },
  {
    icon: Settings,
    title: "Hệ Thống Lỗi Thời & Khó Nâng Cấp",
    description: "Hạ tầng cũ không đáp ứng nhu cầu chuyển đổi số, nâng cấp tốn kém và phức tạp."
  }
];

// STEP Solutions & Benefits
const stepSolutions = [
  {
    icon: Cloud,
    title: "Hạ Tầng Đám Mây Linh Hoạt",
    description: "Cloud Server, Hosting, Dedicated Server - Chỉ trả cho những gì bạn sử dụng. Mở rộng tức thì khi cần.",
    highlight: "Tiết kiệm đến 60% chi phí"
  },
  {
    icon: Headphones,
    title: "Hỗ Trợ 24/7 Bằng Tiếng Việt",
    description: "Đội ngũ kỹ sư Việt Nam luôn sẵn sàng. Không robot, chỉ con người thật tư vấn 1-1.",
    highlight: "Phản hồi < 15 phút"
  },
  {
    icon: Shield,
    title: "Bảo Mật Đa Lớp & Tuân Thủ",
    description: "Firewall, DDoS protection, mã hóa dữ liệu. Đáp ứng chuẩn bảo mật Việt Nam và quốc tế.",
    highlight: "ISO 27001 Certified"
  },
  {
    icon: Gauge,
    title: "Uptime 99.99% SLA",
    description: "Data center tier 3+ tại Việt Nam. Backup tự động, failover nhanh chóng, đảm bảo kinh doanh không gián đoạn.",
    highlight: "Bồi thường nếu không đạt"
  },
  {
    icon: Users,
    title: "Đội Ngũ Chuyên Gia Dày Dạn",
    description: "15+ năm kinh nghiệm, 6+ chứng chỉ quốc tế (MCT, CCNA, CEH, VCP5). Tư vấn kiến trúc tối ưu.",
    highlight: "5000+ khách hàng tin dùng"
  },
  {
    icon: Zap,
    title: "Triển Khai Nhanh & Dễ Dàng",
    description: "Template sẵn, migration miễn phí, setup trong 24h. Tích hợp mượt mà với hệ thống hiện tại.",
    highlight: "Go live trong 1 ngày"
  }
];

// Core IT Services
const coreServices = [
  {
    icon: CloudSnow,
    title: "Cloud Server",
    description: "Máy chủ đám mây cao cấp với CPU, RAM, SSD tùy chọn. GPU computing cho AI/ML. Thanh toán linh hoạt theo tháng.",
    features: ["Pay-as-you-go", "GPU cho AI/ML", "Auto-scale", "Backup tự động"],
    link: "/Cloud/Cloud Server",
    stepColor: "step-cloud"
  },
  {
    icon: Monitor,
    title: "Web Hosting",
    description: "Hosting tốc độ cao với NVMe SSD. WordPress, Laravel tối ưu. SSL miễn phí, CDN tích hợp.",
    features: ["NVMe siêu tốc", "WordPress tối ưu", "SSL miễn phí", "CDN tích hợp"],
    link: "/Sản Phẩm & Dịch Vụ/Hosting",
    stepColor: "step-hosting"
  },
  {
    icon: HardDrive,
    title: "Dedicated Server",
    description: "Máy chủ riêng với phần cứng chuyên dụng. Băng thông unlimited, full root access, managed service.",
    features: ["Phần cứng chuyên dụng", "Băng thông unlimited", "Full root access", "Managed service"],
    link: "/Sản Phẩm & Dịch Vụ/Dedicated Server",
    stepColor: "step-server"
  },
  {
    icon: Building,
    title: "Colocation",
    description: "Thuê rack/cabinet tại datacenter tier 3+. Điện dự phòng, cooling, security 24/7.",
    features: ["Datacenter tier 3+", "Điện dự phòng", "Cooling chuyên nghiệp", "Security 24/7"],
    link: "/colocation",
    stepColor: "step-colocation"
  },
  {
    icon: MailCheck,
    title: "Email Hybrid",
    description: "Email doanh nghiệp thông minh. Tích hợp Google Workspace/Microsoft 365. Anti-spam 99.9%.",
    features: ["Hybrid với Google/MS365", "Anti-spam 99.9%", "Tiết kiệm chi phí", "Tỷ lệ inbox cao"],
    link: "/hybrid-email",
    stepColor: "step-email"
  },
  {
    icon: ShieldCheck,
    title: "DLP - Data Loss Prevention",
    description: "Ngăn chặn rò rỉ dữ liệu với AI. Giám sát file, email, USB. Dashboard tiếng Việt.",
    features: ["AI detection", "Giám sát realtime", "Báo cáo chi tiết", "Tuân thủ GDPR"],
    link: "/dlp",
    stepColor: "step-dlp"
  }
];

// Technical Certifications
const technicalCertifications = [
  { name: "MCT", fullName: "Microsoft Certificate Windows Server", color: "bg-blue-500", logo: mctLogo },
  { name: "Linux LPI", fullName: "Linux Professional Institute", color: "bg-orange-500", logo: lpiLogo },
  { name: "DLP Safetica", fullName: "Data Loss Prevention của hãng Safetica", color: "bg-green-500", logo: safeticaLogo },
  { name: "VCP5", fullName: "VMware Certified Professional", color: "bg-purple-500", logo: vcp5Logo },
  { name: "Cisco CCNA", fullName: "Cisco Certified Network Associate", color: "bg-cyan-500", logo: ccnaLogo },
  { name: "CEH", fullName: "Certified Ethical Hacker (Master in Hacking)", color: "bg-red-500", logo: cehLogo }
];

// Service Partners and Customers
const servicePartners = [
  { name: "VMware", logo: vmwareLogo },
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

// Testimonials
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

export default function Home() {
  const [contactFormOpen, setContactFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section - Cloud Server Style */}
        <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6" data-testid="badge-free-trial">
                  <Play className="w-4 h-4" />
                  Tư Vấn Miễn Phí - Triển Khai Trong 24h!
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" data-testid="text-hero-title">
                  Giải Pháp <span className="text-blue-300">Hạ Tầng IT Toàn Diện</span> Cho Doanh Nghiệp Việt Nam
                </h1>
                
                <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed" data-testid="text-hero-description">
                  Từ Cloud Server, Hosting, Email đến Bảo Mật - Tất Cả Trong Một Nền Tảng
                </p>
                
                <div className="bg-blue-800/30 rounded-lg p-5 mb-6 border border-blue-600/30">
                  <p className="text-base text-blue-100 leading-relaxed mb-3">
                    <strong>Kính gửi các CEO, CTO và IT Manager,</strong>
                  </p>
                  <p className="text-base text-blue-200 leading-relaxed">
                    Trong thời đại chuyển đổi số, hạ tầng IT là yếu tố quyết định thành công. STEP cung cấp giải pháp 
                    toàn diện từ tư vấn, triển khai đến vận hành - giúp bạn tập trung vào kinh doanh thay vì lo về IT.
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="text-base text-blue-200 leading-relaxed mb-4">
                    Với 15+ năm kinh nghiệm phục vụ 5000+ doanh nghiệp Việt, chúng tôi cam kết:
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                      <span className="text-sm text-green-300 font-semibold">Tiết kiệm 50-60% chi phí IT</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
                      <span className="text-sm text-cyan-300 font-semibold">Uptime 99.99% SLA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span className="text-sm text-yellow-300 font-semibold">Hỗ trợ 24/7 tiếng Việt</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 mb-6 border border-green-400/30">
                  <p className="text-base text-white font-semibold">
                    🇻🇳 Data Center Tại Việt Nam - Độ Trễ {"<"} 10ms - Tuân Thủ Pháp Luật Việt!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-white text-blue-800 hover:bg-blue-50 font-semibold px-6 py-3"
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-free-consultation"
                  >
                    <Phone className="mr-2" size={18} />
                    Tư Vấn Miễn Phí
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-800 font-semibold px-6 py-3"
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-explore-services"
                  >
                    <Package className="mr-2" size={18} />
                    Khám Phá Dịch Vụ
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Activity className="text-blue-300" size={32} />
                      <h3 className="text-lg font-semibold">Hệ Thống Tổng Quan</h3>
                    </div>
                    <div className="flex items-center gap-2 text-green-300">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Hoạt động</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-blue-200">Dịch vụ đang chạy</span>
                        <span className="text-sm font-medium">5000+ servers</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full transition-all duration-300" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-blue-200">Uptime trung bình</span>
                        <span className="text-sm font-medium">99.99%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full transition-all duration-300" style={{ width: '99.99%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-blue-200">Mức độ hài lòng</span>
                        <span className="text-sm font-medium">4.9/5.0 ⭐</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full transition-all duration-300" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-blue-200">Thời gian phản hồi</span>
                        <span className="text-sm font-medium text-green-300">&lt; 15 phút</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full transition-all duration-300" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-200 block">Data Center</span>
                        <span className="font-medium">🇻🇳 Hà Nội, TP.HCM</span>
                      </div>
                      <div>
                        <span className="text-blue-200 block">Chứng chỉ</span>
                        <span className="font-medium text-green-300">ISO 27001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* IT Challenges Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-testid="text-challenges-title">
                Những Thách Thức IT Mà Doanh Nghiệp Việt Đang Gặp Phải
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Theo khảo sát của Gartner và McKinsey, 70% doanh nghiệp Việt Nam gặp khó khăn trong quản lý hạ tầng IT. 
                Bạn có đang đối mặt với những vấn đề sau?
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {itChallenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-lg border border-red-100"
                  data-testid={`challenge-card-${index}`}
                >
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <challenge.icon className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{challenge.title}</h3>
                  <p className="text-gray-600 text-sm">{challenge.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                <strong className="text-blue-600">STEP giải quyết tất cả</strong>: Hạ tầng đám mây linh hoạt, đội ngũ chuyên gia sẵn sàng 24/7, 
                bảo mật đa lớp và data center tại Việt Nam - Giúp bạn tập trung vào phát triển kinh doanh thay vì lo lắng về IT.
              </p>
            </motion.div>
          </div>
        </section>

        {/* STEP Solutions Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-testid="text-solutions-title">
                Tại Sao Hơn 5000+ Doanh Nghiệp Chọn STEP?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Chúng tôi không chỉ cung cấp công nghệ - Chúng tôi là đối tác chiến lược giúp doanh nghiệp của bạn 
                phát triển bền vững với hạ tầng IT tối ưu.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stepSolutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-lg border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all"
                  data-testid={`solution-card-${index}`}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <solution.icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{solution.description}</p>
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    {solution.highlight}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200" data-testid="badge-services">
                ☁️ Dịch Vụ Hạ Tầng
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-testid="text-services-title">
                Giải Pháp IT Toàn Diện Cho Mọi Nhu Cầu
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Từ Cloud Server, Hosting đến Email và Bảo mật - Tất cả đều có tại STEP với chất lượng cao nhất.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => window.location.href = service.link}
                  data-testid={`service-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-all duration-300" style={{backgroundColor: `hsl(var(--${service.stepColor})/0.1)`}}>
                        <service.icon size={28} style={{color: `hsl(var(--${service.stepColor}))`}} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                        <span>Tìm hiểu thêm</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Certifications Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200" data-testid="badge-certifications">
                🏆 Chứng Chỉ Chuyên Nghiệp
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-testid="text-certifications-title">
                Đội Ngũ Chuyên Gia Được Chứng Nhận Quốc Tế
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                6+ chứng chỉ kỹ thuật quốc tế từ Microsoft, VMware, Cisco, Linux và Ethical Hacking.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technicalCertifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="group"
                  data-testid={`cert-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img 
                          src={cert.logo} 
                          alt={cert.name}
                          className="w-full h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 mb-2">{cert.name}</h3>
                      <p className="text-xs text-gray-600">{cert.fullName}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners & Customers Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200" data-testid="badge-partners">
                🤝 Đối Tác & Khách Hàng
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-testid="text-partners-title">
                Được Tin Dùng Bởi Các Tổ Chức Hàng Đầu
              </h2>
            </motion.div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Đối Tác Công Nghệ</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {servicePartners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                    data-testid={`partner-logo-${index}`}
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-w-full h-16 object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Khách Hàng Tiêu Biểu</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {customers.map((customer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                    data-testid={`customer-logo-${index}`}
                  >
                    <img 
                      src={customer.logo} 
                      alt={customer.name}
                      className="max-w-full h-12 object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200" data-testid="badge-testimonials">
                ⭐ Khách Hàng Đánh Giá
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-testid="text-testimonials-title">
                Câu Chuyện Thành Công Từ Khách Hàng
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hơn 5000+ doanh nghiệp đã tin tưởng STEP cho hạ tầng IT của họ. Đây là những gì họ nói về chúng tôi.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
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
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                      <div className="border-t pt-4">
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-contact-title">
                Sẵn Sàng Nâng Cấp Hạ Tầng IT Của Bạn?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí từ đội ngũ chuyên gia.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <CloudContactForm open={contactFormOpen} onOpenChange={setContactFormOpen} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
