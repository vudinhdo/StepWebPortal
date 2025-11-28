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
  Database,
  Cpu,
  HardDrive,
  Gauge,
  Award,
  TrendingUp,
  Rocket,
  Crown,
  Diamond,
  FileText,
  Lock,
  Activity,
  RefreshCw,
  Code2,
  HeadphonesIcon,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Cloud,
  X,
  Check,
  Building,
  Briefcase,
  User,
  Settings
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import hostingIllustration from "@assets/generated_images/Cloud_hosting_infrastructure_illustration_24b95542.png";

const STEP_BLUE = "#0066FF";

export default function Hosting() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const hostingPackages = [
    {
      id: 1,
      name: "HT-Starter-1",
      tier: "Starter",
      price: "50.000",
      yearlyPrice: "540.000",
      monthlyPrice: 50000,
      storage: "5 GB NVMe SSD",
      bandwidth: "50 GB",
      database: "1 Database",
      email: "1 Email",
      domains: "1 Tên miền",
      subdomains: "Không",
      cpu: "1 vCore",
      ram: "512 MB",
      websites: "1 Website",
      ssl: "SSL Miễn phí",
      backup: "Weekly",
      support: "Email 48h",
      suitable: "Blog cá nhân/Landing page"
    },
    {
      id: 2,
      name: "HT-Starter-2",
      tier: "Starter",
      price: "90.000",
      yearlyPrice: "972.000",
      monthlyPrice: 90000,
      storage: "10 GB NVMe SSD",
      bandwidth: "100 GB",
      database: "2 Databases",
      email: "2 Emails",
      domains: "1 Tên miền",
      subdomains: "5 Subdomains",
      cpu: "1 vCore",
      ram: "1 GB",
      websites: "2 Websites",
      ssl: "SSL Miễn phí",
      backup: "Weekly",
      support: "Email 24h",
      suitable: "Portfolio/Personal sites"
    },
    {
      id: 3,
      name: "HT-Starter-3",
      tier: "Starter",
      price: "150.000",
      yearlyPrice: "1.620.000",
      monthlyPrice: 150000,
      storage: "20 GB NVMe SSD",
      bandwidth: "200 GB",
      database: "3 Databases",
      email: "5 Emails",
      domains: "2 Tên miền",
      subdomains: "10 Subdomains",
      cpu: "2 vCores",
      ram: "1.5 GB",
      websites: "3 Websites",
      ssl: "SSL Miễn phí",
      backup: "Weekly",
      support: "Email 12h",
      suitable: "Freelancer/Startup nhỏ"
    },
    {
      id: 4,
      name: "HT-Business-1",
      tier: "Business",
      price: "250.000",
      yearlyPrice: "2.700.000",
      monthlyPrice: 250000,
      storage: "40 GB NVMe SSD",
      bandwidth: "400 GB",
      database: "5 Databases",
      email: "10 Emails",
      domains: "3 Tên miền",
      subdomains: "20 Subdomains",
      cpu: "2 vCores",
      ram: "2 GB",
      websites: "5 Websites",
      ssl: "SSL Miễn phí",
      backup: "Daily",
      support: "Chat 8h",
      suitable: "Business Website/SME",
      popular: true
    },
    {
      id: 5,
      name: "HT-Business-2",
      tier: "Business",
      price: "380.000",
      yearlyPrice: "4.104.000",
      monthlyPrice: 380000,
      storage: "60 GB NVMe SSD",
      bandwidth: "600 GB",
      database: "10 Databases",
      email: "20 Emails",
      domains: "5 Tên miền",
      subdomains: "50 Subdomains",
      cpu: "3 vCores",
      ram: "3 GB",
      websites: "10 Websites",
      ssl: "SSL Miễn phí + Wildcard",
      backup: "Daily",
      support: "Chat/Phone 4h",
      suitable: "E-commerce/Growing business"
    },
    {
      id: 6,
      name: "HT-Business-3",
      tier: "Business",
      price: "520.000",
      yearlyPrice: "5.616.000",
      monthlyPrice: 520000,
      storage: "100 GB NVMe SSD",
      bandwidth: "1 TB",
      database: "15 Databases",
      email: "30 Emails",
      domains: "10 Tên miền",
      subdomains: "100 Subdomains",
      cpu: "4 vCores",
      ram: "4 GB",
      websites: "15 Websites",
      ssl: "SSL Miễn phí + Wildcard",
      backup: "Daily + On-demand",
      support: "Priority 2h",
      suitable: "Multi-site/Agency"
    },
    {
      id: 7,
      name: "HT-Professional-1",
      tier: "Professional",
      price: "700.000",
      yearlyPrice: "7.560.000",
      monthlyPrice: 700000,
      storage: "150 GB NVMe SSD",
      bandwidth: "1.5 TB",
      database: "20 Databases",
      email: "50 Emails",
      domains: "15 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "6 vCores",
      ram: "6 GB",
      websites: "25 Websites",
      ssl: "SSL Pro + Wildcard",
      backup: "Hourly",
      support: "Priority 1h",
      suitable: "High-traffic websites/Developers"
    },
    {
      id: 8,
      name: "HT-Professional-2",
      tier: "Professional",
      price: "950.000",
      yearlyPrice: "10.260.000",
      monthlyPrice: 950000,
      storage: "250 GB NVMe SSD",
      bandwidth: "2.5 TB",
      database: "30 Databases",
      email: "100 Emails",
      domains: "25 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "8 vCores",
      ram: "8 GB",
      websites: "40 Websites",
      ssl: "SSL Pro + EV",
      backup: "Hourly",
      support: "Dedicated Support",
      suitable: "Professional teams/SaaS apps",
      popular: true
    },
    {
      id: 9,
      name: "HT-Professional-3",
      tier: "Professional",
      price: "1.250.000",
      yearlyPrice: "13.500.000",
      monthlyPrice: 1250000,
      storage: "400 GB NVMe SSD",
      bandwidth: "4 TB",
      database: "50 Databases",
      email: "Không giới hạn",
      domains: "50 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "10 vCores",
      ram: "12 GB",
      websites: "75 Websites",
      ssl: "SSL Pro + EV",
      backup: "Real-time",
      support: "24/7 Dedicated",
      suitable: "Large agencies/Production apps"
    },
    {
      id: 10,
      name: "HT-Enterprise-1",
      tier: "Enterprise",
      price: "1.650.000",
      yearlyPrice: "17.820.000",
      monthlyPrice: 1650000,
      storage: "600 GB NVMe SSD",
      bandwidth: "6 TB",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "12 vCores",
      ram: "16 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise",
      backup: "Real-time + GEO",
      support: "24/7 Premium",
      suitable: "Large organizations/Multi-brand"
    },
    {
      id: 11,
      name: "HT-Enterprise-2",
      tier: "Enterprise",
      price: "2.200.000",
      yearlyPrice: "23.760.000",
      monthlyPrice: 2200000,
      storage: "1 TB NVMe SSD",
      bandwidth: "10 TB",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "16 vCores",
      ram: "24 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise + DV",
      backup: "Real-time + Multi-region",
      support: "24/7 Premium + DevOps",
      suitable: "High-traffic platforms/Resellers"
    },
    {
      id: 12,
      name: "HT-Enterprise-3",
      tier: "Enterprise",
      price: "2.900.000",
      yearlyPrice: "31.320.000",
      monthlyPrice: 2900000,
      storage: "1.5 TB NVMe SSD",
      bandwidth: "15 TB",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "20 vCores",
      ram: "32 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise + EV",
      backup: "Real-time + Multi-region",
      support: "24/7 Premium + Architect",
      suitable: "Enterprise/Mission-critical",
      enterprise: true
    },
    {
      id: 13,
      name: "HT-Enterprise-4",
      tier: "Enterprise",
      price: "3.500.000",
      yearlyPrice: "37.800.000",
      monthlyPrice: 3500000,
      storage: "2 TB NVMe SSD",
      bandwidth: "20 TB",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "24 vCores",
      ram: "48 GB",
      websites: "Không giới hạn",
      ssl: "Custom Security Suite",
      backup: "Custom DR Solution",
      support: "24/7 Dedicated Engineering Team",
      suitable: "Custom Enterprise Solutions",
      enterprise: true
    }
  ];

  const tierConfig: Record<string, { color: string; bgColor: string; borderColor: string; icon: any }> = {
    "Starter": { color: "text-gray-700", bgColor: "bg-gray-100", borderColor: "border-gray-300", icon: User },
    "Business": { color: "text-[#0066FF]", bgColor: "bg-blue-50", borderColor: "border-[#0066FF]", icon: Briefcase },
    "Professional": { color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-500", icon: Award },
    "Enterprise": { color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-500", icon: Building }
  };

  const getFilteredPackages = () => {
    if (activeTab === "all") {
      return showAllPackages ? hostingPackages : hostingPackages.slice(0, 6);
    }
    const filtered = hostingPackages.filter(pkg => pkg.tier === activeTab);
    return showAllPackages ? filtered : filtered.slice(0, 4);
  };

  const featureGroups = [
    {
      title: "Hiệu Suất Tối Đa",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      features: [
        {
          icon: Server,
          title: "cPanel/WHM Licensed",
          description: "Control panel bản quyền với giao diện trực quan, quản lý unlimited accounts, 1-click installer cho 400+ apps."
        },
        {
          icon: Zap,
          title: "LiteSpeed Enterprise",
          description: "Web Server Enterprise với HTTP/3, Brotli compression, performance gấp 5-10x Apache."
        },
        {
          icon: Database,
          title: "MySQL/MariaDB Optimized",
          description: "MySQL 8.0+ với query caching, InnoDB optimization, connection pooling."
        },
        {
          icon: BarChart3,
          title: "Advanced Performance Tools",
          description: "Redis/Memcached caching, HTTP/2 & HTTP/3, Brotli & Gzip compression."
        }
      ]
    },
    {
      title: "Bảo Mật Toàn Diện",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      features: [
        {
          icon: Shield,
          title: "AlmaLinux OS Licensed",
          description: "Enterprise Linux, binary compatible với RHEL, hardened kernel, SELinux policies."
        },
        {
          icon: Lock,
          title: "Imunify360 Licensed",
          description: "AI-powered security với proactive malware scanning, IDS/IPS, 24/7 SOC monitoring."
        },
        {
          icon: Shield,
          title: "WAF (Web Application Firewall)",
          description: "ModSecurity WAF với OWASP Core Rule Set, SQL injection prevention, XSS protection."
        },
        {
          icon: Cloud,
          title: "Cloudflare CDN Integration",
          description: "Global edge network (200+ datacenters), DDoS mitigation up to 100Gbps."
        }
      ]
    },
    {
      title: "Hỗ Trợ & Backup",
      icon: HeadphonesIcon,
      color: "from-purple-500 to-pink-500",
      features: [
        {
          icon: RefreshCw,
          title: "JetBackup Automated",
          description: "Automated backups (weekly/daily/hourly/real-time), incremental backups, one-click restore."
        },
        {
          icon: Code2,
          title: "Multi-PHP Versions",
          description: "PHP 7.4, 8.0, 8.1, 8.2, 8.3 support với PHP Selector, per-directory control."
        },
        {
          icon: Activity,
          title: "Resource Monitoring",
          description: "Real-time dashboard với CPU/RAM/Disk usage, alerts via email/SMS."
        },
        {
          icon: HeadphonesIcon,
          title: "24/7 Expert Support",
          description: "Email/Chat/Phone support 24/7, response time < 2 hours (Priority < 30 mins)."
        }
      ]
    }
  ];

  const competitorComparison = [
    { metric: "Control Panel", step: "cPanel/WHM Licensed", competitor: "Custom/Limited panels", stepGood: true },
    { metric: "Operating System", step: "AlmaLinux Enterprise", competitor: "Generic Linux", stepGood: true },
    { metric: "Web Server", step: "LiteSpeed Enterprise", competitor: "Apache/Nginx Free", stepGood: true },
    { metric: "Security Suite", step: "Imunify360 + WAF", competitor: "Basic firewall only", stepGood: true },
    { metric: "Backup System", step: "JetBackup Real-time", competitor: "Weekly or Manual", stepGood: true },
    { metric: "PHP Support", step: "PHP 7.4 - 8.3", competitor: "Single PHP version", stepGood: true },
    { metric: "Support Response", step: "< 2h (Priority < 30min)", competitor: "24h - 72h", stepGood: true },
    { metric: "Uptime SLA", step: "99.99% - 99.999%", competitor: "99.5% - 99.9%", stepGood: true }
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn Minh",
      role: "CEO",
      company: "TechStartup VN",
      rating: 5,
      text: "Hosting STEP với cPanel và LiteSpeed làm website shop nhanh gấp 3 lần, conversion tăng 35%! Imunify360 bảo vệ khỏi malware attack.",
      avatar: "NM",
      logo: "🏢"
    },
    {
      name: "Trần Thị Hương",
      role: "Web Developer",
      company: "Digital Agency HN",
      rating: 5,
      text: "cPanel interface rất dễ sử dụng, multi-PHP versions giúp maintain cả legacy và modern apps. JetBackup cứu project khi có incident.",
      avatar: "TH",
      logo: "💻"
    },
    {
      name: "Lê Hoàng Nam",
      role: "System Admin",
      company: "Finance Corp",
      rating: 5,
      text: "AlmaLinux stability + Imunify360 security + LiteSpeed performance = perfect combo cho production. WAF chặn 99% malicious traffic.",
      avatar: "LN",
      logo: "🏦"
    }
  ];

  const faqGroups = [
    {
      title: "Về Control Panel & Công Nghệ",
      icon: Settings,
      faqs: [
        {
          question: "cPanel là gì và tại sao nó quan trọng?",
          answer: "cPanel là control panel phổ biến nhất thế giới, cung cấp giao diện đồ họa trực quan để quản lý hosting. Với cPanel, bạn có thể dễ dàng quản lý files, databases, emails, domains, SSL certificates, backups, cron jobs và install 400+ applications chỉ với vài click."
        },
        {
          question: "LiteSpeed Enterprise tốt hơn Apache/Nginx như thế nào?",
          answer: "LiteSpeed Enterprise licensed nhanh hơn Apache 5-10 lần, hiệu quả hơn Nginx trong serving dynamic content. Built-in LSCache, HTTP/3 support native, event-driven architecture tiết kiệm resources."
        },
        {
          question: "Multi-PHP versions support nghĩa là gì?",
          answer: "Support PHP 7.4, 8.0, 8.1, 8.2, 8.3 đồng thời trên cùng hosting account. Mỗi website/directory có thể chọn PHP version riêng qua PHP Selector trong cPanel."
        }
      ]
    },
    {
      title: "Về Bảo Mật & Backup",
      icon: Shield,
      faqs: [
        {
          question: "Imunify360 bảo vệ website khỏi những gì?",
          answer: "Imunify360 là AI-powered security suite bảo vệ khỏi: malware, brute-force attacks, zero-day exploits, DDoS attacks, SQL injection, XSS attacks. Proactive Defense automatically patches vulnerabilities."
        },
        {
          question: "WAF (Web Application Firewall) hoạt động như thế nào?",
          answer: "WAF (ModSecurity) filter traffic ở layer 7, analyze HTTP/HTTPS requests trước khi đến web server. Block malicious requests dựa trên OWASP Core Rule Set."
        },
        {
          question: "JetBackup khác gì backup thông thường?",
          answer: "JetBackup là enterprise backup solution với incremental backups, automated schedules (hourly/daily/weekly/real-time), off-site backup locations, instant restore qua cPanel interface."
        }
      ]
    },
    {
      title: "Về Gói Dịch Vụ & Hỗ Trợ",
      icon: HeadphonesIcon,
      faqs: [
        {
          question: "Có hỗ trợ migration miễn phí từ hosting cũ không?",
          answer: "Có! Chúng tôi hỗ trợ migrate miễn phí websites, databases, emails từ hosting cũ. Team sẽ transfer files via SSH/FTP, import MySQL databases, configure DNS records."
        },
        {
          question: "Uptime SLA 99.99% có nghĩa là gì?",
          answer: "99.99% uptime SLA = maximum 4.3 phút downtime mỗi tháng. SLA guarantee compensation nếu không đạt uptime commitment. Infrastructure monitoring 24/7 với automatic failover."
        },
        {
          question: "Có thể upgrade/downgrade gói hosting không?",
          answer: "Có thể upgrade/downgrade bất cứ lúc nào. Upgrade có hiệu lực ngay lập tức, downgrade áp dụng từ kỳ billing tiếp theo. Data migration tự động, không mất files/databases/emails."
        }
      ]
    }
  ];

  const navSections = [
    { id: "hero", label: "Tổng quan" },
    { id: "packages", label: "Bảng giá" },
    { id: "features", label: "Tính năng" },
    { id: "comparison", label: "So sánh" },
    { id: "testimonials", label: "Đánh giá" },
    { id: "faq", label: "FAQ" }
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="hosting-page">
      <Header />

      {/* Sticky Navigation */}
      <nav className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 hidden md:block" data-testid="nav-sections">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-3">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-sm font-medium text-gray-600 hover:text-[#0066FF] transition-colors"
                data-testid={`nav-${section.id}`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean Design with STEP Blue */}
      <section id="hero" className="relative bg-gradient-to-br from-[#f0f7ff] via-white to-[#e6f2ff] py-16 md:py-24 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 opacity-30 hidden md:block">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#0066FF]/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#0066FF]/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-[#0066FF] text-white px-4 py-1.5 text-sm font-semibold" data-testid="badge-promo">
                  Giảm 30% năm đầu
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600 px-3 py-1">
                  Uptime 99.99%
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-testid="hero-title">
                Hosting Chuyên Nghiệp
                <span className="text-[#0066FF]"> Tốc Độ Vượt Trội</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl" data-testid="hero-subtitle">
                Hosting NVMe SSD với LiteSpeed Enterprise, cPanel bản quyền và bảo mật Imunify360. 
                Chỉ từ <span className="font-bold text-[#0066FF]">50.000đ/tháng</span>.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Zap, text: "LiteSpeed 10x nhanh hơn" },
                  { icon: Shield, text: "Imunify360 bảo vệ 24/7" },
                  { icon: Server, text: "cPanel bản quyền" },
                  { icon: Clock, text: "Support < 2 giờ" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700" data-testid={`benefit-${idx}`}>
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#0066FF]" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-blue-500/25"
                  data-testid="button-hero-cta"
                  onClick={() => scrollToSection('packages')}
                >
                  Xem Bảng Giá
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white px-8 py-6 text-lg font-semibold"
                  data-testid="button-hero-contact"
                  onClick={() => window.location.href = '/contact'}
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-200" data-testid="trust-badges">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="w-5 h-5 text-[#0066FF]" />
                  <span>ISO 27001</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>PCI DSS</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#0066FF]" />
                  <span>10,000+ websites</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <img 
                  src={hostingIllustration} 
                  alt="Hạ tầng Hosting hiện đại - Server STEP"
                  className="w-full h-auto object-cover rounded-2xl"
                  data-testid="hero-image"
                />
                
                {/* Overlay Stats */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-[#0066FF]">99.99%</div>
                        <div className="text-xs text-gray-500">Uptime SLA</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0066FF]">13</div>
                        <div className="text-xs text-gray-500">Gói Hosting</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0066FF]">24/7</div>
                        <div className="text-xs text-gray-500">Hỗ Trợ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Section with Tabs */}
      <section id="packages" className="py-16 md:py-24 bg-gray-50" data-testid="section-packages">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="packages-title">
              Chọn Gói Hosting Phù Hợp
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Từ blog cá nhân đến doanh nghiệp lớn, chúng tôi có gói phù hợp cho bạn
            </p>

            {/* Monthly/Yearly Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8" data-testid="billing-toggle">
              <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Hàng tháng</span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                data-testid="switch-billing"
              />
              <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                Hàng năm
                <Badge className="ml-2 bg-green-100 text-green-700 text-xs">Tiết kiệm 10%</Badge>
              </span>
            </div>
          </motion.div>

          {/* Tier Tabs */}
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 max-w-2xl mx-auto mb-8 h-auto p-1 bg-gray-100 rounded-xl" data-testid="tabs-tier">
              <TabsTrigger 
                value="all" 
                className="py-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                data-testid="tab-all"
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger 
                value="Starter" 
                className="py-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-700 rounded-lg"
                data-testid="tab-starter"
              >
                <User className="w-4 h-4 mr-1" />
                Starter
              </TabsTrigger>
              <TabsTrigger 
                value="Business" 
                className="py-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0066FF] rounded-lg"
                data-testid="tab-business"
              >
                <Briefcase className="w-4 h-4 mr-1" />
                Business
              </TabsTrigger>
              <TabsTrigger 
                value="Professional" 
                className="py-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600 rounded-lg"
                data-testid="tab-professional"
              >
                <Award className="w-4 h-4 mr-1" />
                Pro
              </TabsTrigger>
              <TabsTrigger 
                value="Enterprise" 
                className="py-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-red-600 rounded-lg"
                data-testid="tab-enterprise"
              >
                <Building className="w-4 h-4 mr-1" />
                Enterprise
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {getFilteredPackages().map((pkg, index) => {
                  const config = tierConfig[pkg.tier];
                  const TierIcon = config.icon;
                  
                  return (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                        pkg.popular ? 'border-[#0066FF] ring-2 ring-[#0066FF]/20' : 'border-gray-100 hover:border-gray-200'
                      } ${pkg.enterprise ? 'bg-gradient-to-br from-gray-900 to-gray-800' : ''}`}
                      data-testid={`package-card-${pkg.id}`}
                    >
                      {/* Popular Badge */}
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-[#0066FF] text-white px-4 py-1 shadow-lg" data-testid={`badge-popular-${pkg.id}`}>
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Phổ biến nhất
                          </Badge>
                        </div>
                      )}

                      {/* Enterprise Badge */}
                      {pkg.enterprise && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 shadow-lg font-bold" data-testid={`badge-enterprise-${pkg.id}`}>
                            <Crown className="w-3 h-3 mr-1" />
                            Enterprise
                          </Badge>
                        </div>
                      )}

                      {/* Tier Badge */}
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4 ${config.bgColor} ${config.color}`}>
                        <TierIcon className="w-3 h-3" />
                        {pkg.tier}
                      </div>

                      {/* Package Name & Price */}
                      <h3 className={`text-xl font-bold mb-2 ${pkg.enterprise ? 'text-white' : 'text-gray-900'}`}>
                        {pkg.name}
                      </h3>
                      <div className="mb-4">
                        <div className={`text-3xl font-bold ${pkg.enterprise ? 'text-yellow-400' : 'text-[#0066FF]'}`}>
                          {isYearly ? pkg.yearlyPrice : pkg.price} <span className="text-base font-normal">VNĐ</span>
                        </div>
                        <div className={`text-sm ${pkg.enterprise ? 'text-gray-400' : 'text-gray-500'}`}>
                          /{isYearly ? 'năm' : 'tháng'}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-6">
                        {[
                          { label: pkg.storage },
                          { label: `${pkg.cpu} • ${pkg.ram}` },
                          { label: pkg.websites },
                          { label: pkg.bandwidth },
                          { label: pkg.backup }
                        ].map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className={`w-4 h-4 flex-shrink-0 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                            <span className={`text-sm ${pkg.enterprise ? 'text-gray-300' : 'text-gray-600'}`}>
                              {feature.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Suitable For */}
                      <div className={`text-xs p-3 rounded-lg mb-4 ${pkg.enterprise ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                        <span className="font-medium">Phù hợp:</span> {pkg.suitable}
                      </div>

                      {/* CTA Button */}
                      <Button 
                        className={`w-full py-5 font-semibold ${
                          pkg.enterprise 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900'
                            : pkg.popular 
                              ? 'bg-[#0066FF] hover:bg-[#0052CC]'
                              : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                        data-testid={`button-select-${pkg.id}`}
                        onClick={() => window.location.href = '/contact'}
                      >
                        {pkg.enterprise ? 'Liên Hệ Tư Vấn' : 'Đăng Ký Ngay'}
                      </Button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Show More Button */}
              {!showAllPackages && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAllPackages(true)}
                    className="border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white px-8 py-6"
                    data-testid="button-show-more"
                  >
                    Xem thêm gói khác
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {showAllPackages && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setShowAllPackages(false);
                      scrollToSection('packages');
                    }}
                    className="border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white px-8 py-6"
                    data-testid="button-show-less"
                  >
                    Thu gọn
                    <ChevronUp className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technical Features Section - Grouped with Accordions */}
      <section id="features" className="py-16 md:py-24 bg-white" data-testid="section-features">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="features-title">
              Công Nghệ Đỉnh Cao
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Phần mềm bản quyền chính hãng, đảm bảo website chạy nhanh, bảo mật và ổn định 24/7
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featureGroups.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                data-testid={`feature-group-${groupIndex}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center mb-4`}>
                  <group.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{group.title}</h3>
                
                <Accordion type="single" collapsible className="space-y-2">
                  {group.features.map((feature, featureIndex) => (
                    <AccordionItem 
                      key={featureIndex} 
                      value={`${groupIndex}-${featureIndex}`}
                      className="bg-white rounded-lg border border-gray-100 overflow-hidden"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-left font-medium text-gray-900 text-sm" data-testid={`accordion-trigger-${groupIndex}-${featureIndex}`}>
                        <div className="flex items-center gap-3">
                          <feature.icon className="w-4 h-4 text-[#0066FF]" />
                          {feature.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3 text-sm text-gray-600">
                        {feature.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison - Responsive Cards on Mobile */}
      <section id="comparison" className="py-16 md:py-24 bg-gray-50" data-testid="section-comparison">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="comparison-title">
              So Sánh Với Đối Thủ
            </h2>
            <p className="text-lg text-gray-600">
              Tại sao khách hàng chọn STEP Hosting?
            </p>
          </motion.div>

          {/* Desktop Table */}
          <div className="hidden md:block max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <table className="w-full" data-testid="comparison-table">
                <thead className="bg-[#0066FF]">
                  <tr>
                    <th className="py-4 px-6 text-left text-white font-semibold">Tính Năng</th>
                    <th className="py-4 px-6 text-center text-white font-semibold">STEP Hosting</th>
                    <th className="py-4 px-6 text-center text-white font-semibold">Đối Thủ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {competitorComparison.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50" data-testid={`comparison-row-${index}`}>
                      <td className="py-4 px-6 font-medium text-gray-900">{item.metric}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                          <Check className="w-4 h-4" />
                          {item.step}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                          <X className="w-4 h-4 text-red-400" />
                          {item.competitor}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4" data-testid="comparison-cards-mobile">
            {competitorComparison.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
                data-testid={`comparison-card-${index}`}
              >
                <h4 className="font-semibold text-gray-900 mb-3">{item.metric}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-700">STEP</span>
                    <div className="flex items-center gap-1 text-sm text-green-700">
                      <Check className="w-4 h-4" />
                      {item.step}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Đối thủ</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <X className="w-4 h-4 text-red-400" />
                      {item.competitor}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Card Design with Logo Placeholders */}
      <section id="testimonials" className="py-16 md:py-24 bg-white" data-testid="section-testimonials">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="testimonials-title">
              Khách Hàng Nói Gì?
            </h2>
            <p className="text-lg text-gray-600">
              Hơn 10,000+ websites tin dùng STEP Hosting
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                data-testid={`testimonial-card-${index}`}
              >
                {/* Company Logo Placeholder */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {testimonial.logo}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#0066FF] flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role} • {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Grouped by Topic */}
      <section id="faq" className="py-16 md:py-24 bg-gray-50" data-testid="section-faq">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="faq-title">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg text-gray-600">
              Giải đáp mọi thắc mắc về Hosting
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {faqGroups.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                data-testid={`faq-group-${groupIndex}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 flex items-center justify-center">
                    <group.icon className="w-5 h-5 text-[#0066FF]" />
                  </div>
                  <h3 className="font-bold text-gray-900">{group.title}</h3>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {group.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`faq-${groupIndex}-${faqIndex}`}
                      className="border border-gray-100 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-left font-medium text-gray-900 text-sm" data-testid={`faq-trigger-${groupIndex}-${faqIndex}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-[#0066FF]" data-testid="section-cta-final">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="cta-title">
              Sẵn Sàng Bắt Đầu?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              30 ngày hoàn tiền • Migration miễn phí • Hỗ trợ 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-[#0066FF] hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg"
                data-testid="button-cta-register"
                onClick={() => window.location.href = '/contact'}
              >
                Đăng Ký Ngay
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0066FF] px-8 py-6 text-lg font-semibold"
                data-testid="button-cta-contact"
                onClick={() => window.location.href = '/contact'}
              >
                Liên Hệ Tư Vấn
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
