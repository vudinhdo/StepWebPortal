import { useState } from "react";
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
  Cloud
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Hosting() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [compareView, setCompareView] = useState(false);

  // 18 General Hosting Packages - Technology Agnostic
  const hostingPackages = [
    {
      id: 1,
      name: "HT-Starter-1",
      tier: "Starter",
      price: "50.000",
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
      suitable: "Professional teams/SaaS apps"
    },
    {
      id: 9,
      name: "HT-Professional-3",
      tier: "Professional",
      price: "1.250.000",
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
      name: "HT-Advanced-1",
      tier: "Advanced",
      price: "1.650.000",
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
      name: "HT-Advanced-2",
      tier: "Advanced",
      price: "2.200.000",
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
      name: "HT-Advanced-3",
      tier: "Advanced",
      price: "2.900.000",
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
      suitable: "Enterprise/Mission-critical"
    },
    {
      id: 13,
      name: "HT-Enterprise-1",
      tier: "Enterprise",
      price: "3.600.000",
      monthlyPrice: 3600000,
      storage: "2 TB NVMe SSD",
      bandwidth: "20 TB",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "24 vCores",
      ram: "48 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise Suite",
      backup: "Real-time + Disaster Recovery",
      support: "24/7 Enterprise + Architect",
      suitable: "Large corporations/Financial"
    },
    {
      id: 14,
      name: "HT-Enterprise-2",
      tier: "Enterprise",
      price: "5.000.000",
      monthlyPrice: 5000000,
      storage: "3 TB NVMe SSD",
      bandwidth: "30 TB",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "32 vCores",
      ram: "64 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise Suite + Custom",
      backup: "Real-time + Multi-cloud",
      support: "24/7 Enterprise + CTO",
      suitable: "Multi-national corps/Media"
    },
    {
      id: 15,
      name: "HT-Enterprise-3",
      tier: "Enterprise",
      price: "6.800.000",
      monthlyPrice: 6800000,
      storage: "5 TB NVMe SSD",
      bandwidth: "50 TB",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "48 vCores",
      ram: "96 GB",
      websites: "Không giới hạn",
      ssl: "Custom SSL Infrastructure",
      backup: "Real-time + Global DR",
      support: "24/7 White-glove + CTO",
      suitable: "Banking/Healthcare/Government"
    },
    {
      id: 16,
      name: "HT-Enterprise-4",
      tier: "Enterprise",
      price: "9.000.000",
      monthlyPrice: 9000000,
      storage: "8 TB NVMe SSD",
      bandwidth: "80 TB",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "64 vCores",
      ram: "128 GB",
      websites: "Không giới hạn",
      ssl: "Custom SSL + Zero-Trust",
      backup: "Real-time + Multi-site DR",
      support: "24/7 White-glove + Solutions Team",
      suitable: "Global platforms/Streaming"
    },
    {
      id: 17,
      name: "HT-Enterprise-5",
      tier: "Enterprise",
      price: "13.000.000",
      monthlyPrice: 13000000,
      storage: "12 TB NVMe SSD",
      bandwidth: "120 TB",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "96 vCores",
      ram: "192 GB",
      websites: "Không giới hạn",
      ssl: "Custom SSL + Advanced Protection",
      backup: "Real-time + Global Multi-cloud",
      support: "24/7 Concierge + Engineering Team",
      suitable: "Fortune 500/Critical infrastructure"
    },
    {
      id: 18,
      name: "HT-Enterprise-6",
      tier: "Enterprise",
      price: "Custom",
      monthlyPrice: 99999999,
      storage: "Custom TB NVMe SSD",
      bandwidth: "Custom TB",
      database: "Custom Database Cluster",
      email: "Enterprise Email Suite",
      domains: "Unlimited Premium",
      subdomains: "Unlimited Premium",
      cpu: "Custom vCores",
      ram: "Custom RAM",
      websites: "Unlimited Premium",
      ssl: "Custom Security Suite",
      backup: "Custom DR Solution",
      support: "24/7 Dedicated Engineering Team",
      suitable: "Custom Enterprise Solutions",
      enterprise: true
    }
  ];

  const displayedPackages = showAllPackages ? hostingPackages : hostingPackages.slice(0, 6);

  // Technical Features - Licensed Stack
  const technicalFeatures = [
    {
      icon: Server,
      title: "cPanel/WHM Licensed",
      description: "cPanel control panel bản quyền với giao diện trực quan, quản lý unlimited accounts, 1-click installer cho 400+ apps, file manager, cron jobs, DNS zone editor, backup manager, và staging tools. WHM cho reseller hosting."
    },
    {
      icon: Shield,
      title: "AlmaLinux OS Licensed",
      description: "AlmaLinux OS bản quyền - enterprise-grade Linux distribution, binary compatible với RHEL, hardened kernel, SELinux policies, automatic security updates, long-term support (10 years), và enterprise stability cho production workloads."
    },
    {
      icon: Zap,
      title: "LiteSpeed Enterprise Licensed",
      description: "LiteSpeed Web Server Enterprise bản quyền thay Apache/Nginx, HTTP/3 support, Brotli compression, event-driven architecture với performance gấp 5-10x, LSCache built-in, anti-DDoS capabilities, và resource-efficient operation."
    },
    {
      icon: Lock,
      title: "Imunify360 Licensed",
      description: "Imunify360 bản quyền - AI-powered security suite với proactive malware scanning, automatic patching, intrusion detection & prevention (IDS/IPS), reputation management, advanced firewall rules, và 24/7 SOC monitoring."
    },
    {
      icon: Shield,
      title: "WAF (Web Application Firewall)",
      description: "ModSecurity WAF với OWASP Core Rule Set, layer-7 filtering, SQL injection prevention, XSS protection, bot mitigation, virtual patching, real-time threat intelligence feeds, và customizable security policies cho complete protection."
    },
    {
      icon: Database,
      title: "MySQL/MariaDB Optimized",
      description: "MySQL 8.0+ hoặc MariaDB 10.6+ với query caching, slow query logging, InnoDB optimization, connection pooling, replication support, automated backups, và performance tuning cho database-heavy applications."
    },
    {
      icon: Cloud,
      title: "Cloudflare CDN Integration",
      description: "Cloudflare CDN free integration với global edge network (200+ datacenters), automatic caching, DDoS mitigation up to 100Gbps, SSL/TLS optimization, image optimization, HTTP/3 support, và bandwidth savings up to 60%."
    },
    {
      icon: RefreshCw,
      title: "JetBackup Automated",
      description: "JetBackup system với automated backups (weekly/daily/hourly/real-time), incremental backups để tiết kiệm storage, off-site backup locations, one-click restore, backup rotation policies, và disaster recovery options."
    },
    {
      icon: Code2,
      title: "Multi-PHP Versions",
      description: "PHP 7.4, 8.0, 8.1, 8.2, 8.3 support với PHP Selector, per-directory PHP version control, OPcache enabled, custom php.ini settings, extension management, và backward compatibility cho legacy applications."
    },
    {
      icon: Activity,
      title: "Resource Monitoring",
      description: "Real-time resource monitoring dashboard với CPU/RAM/Disk usage graphs, bandwidth tracking, I/O statistics, process management, alerts & notifications via email/SMS, và historical data analysis cho capacity planning."
    },
    {
      icon: BarChart3,
      title: "Advanced Performance Tools",
      description: "Redis/Memcached caching, HTTP/2 & HTTP/3 support, Brotli & Gzip compression, OPcache optimization, database query optimization, CDN integration, lazy loading, resource minification, và performance benchmarking tools."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Expert Support",
      description: "Email/Chat/Phone support 24/7, average response time < 2 hours (Priority < 30 mins), technical expert team với hosting/server knowledge, free migration assistance, optimization consultations, và proactive monitoring alerts."
    }
  ];

  // Competitor Comparison
  const competitorComparison = [
    { metric: "Control Panel", step: "cPanel/WHM Licensed", competitor: "Custom/Limited panels" },
    { metric: "Operating System", step: "AlmaLinux Enterprise (RHEL-based)", competitor: "Generic Linux or CentOS" },
    { metric: "Web Server", step: "LiteSpeed Enterprise Licensed", competitor: "Apache/Nginx Free" },
    { metric: "Security Suite", step: "Imunify360 + WAF (Licensed)", competitor: "Basic firewall only" },
    { metric: "Backup System", step: "JetBackup Automated (Real-time)", competitor: "Weekly or Manual" },
    { metric: "PHP Support", step: "PHP 7.4 - 8.3 Multi-version", competitor: "Single PHP version" },
    { metric: "Support Response", step: "< 2h (Priority < 30min)", competitor: "24h - 72h" },
    { metric: "Uptime SLA", step: "99.99% - 99.999%", competitor: "99.5% - 99.9%" }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Anh Nguyễn Văn A",
      role: "CEO",
      company: "E-commerce Startup",
      rating: 5,
      text: "Hosting STEP với cPanel và LiteSpeed làm website shop nhanh gấp 3 lần, conversion tăng 35%! Imunify360 bảo vệ khỏi malware attack, support team giải quyết vấn đề trong vài phút.",
      avatar: "👨‍💼"
    },
    {
      name: "Chị Trần Thị B",
      role: "Web Developer",
      company: "Agency Hà Nội",
      rating: 5,
      text: "cPanel interface rất dễ sử dụng, multi-PHP versions giúp maintain cả legacy và modern apps. JetBackup cứu project khi có incident, restore chỉ mất 5 phút. Highly recommended!",
      avatar: "👩‍💻"
    },
    {
      name: "Anh Lê Văn C",
      role: "System Admin",
      company: "Corporate Website",
      rating: 5,
      text: "AlmaLinux stability + Imunify360 security + LiteSpeed performance = perfect combo cho production. WAF chặn 99% malicious traffic. Migrated 20+ sites without downtime!",
      avatar: "🔧"
    }
  ];

  // FAQ
  const faqs = [
    {
      question: "cPanel là gì và tại sao nó quan trọng?",
      answer: "cPanel là control panel phổ biến nhất thế giới, cung cấp giao diện đồ họa trực quan để quản lý hosting. Với cPanel, bạn có thể dễ dàng quản lý files, databases, emails, domains, SSL certificates, backups, cron jobs và install 400+ applications chỉ với vài click. cPanel licensed (bản quyền) đảm bảo updates, security patches, và support chính thức từ vendor."
    },
    {
      question: "AlmaLinux khác gì CentOS/Ubuntu? Tại sao chọn AlmaLinux?",
      answer: "AlmaLinux là enterprise Linux distribution, binary compatible với Red Hat Enterprise Linux (RHEL), được phát triển sau khi CentOS ngừng support. AlmaLinux cung cấp long-term support (10 years), security hardening, SELinux policies, enterprise stability, và regular security updates - lý tưởng cho production environments. Khác với Ubuntu/Debian, AlmaLinux focus vào stability thay vì bleeding-edge features."
    },
    {
      question: "LiteSpeed Enterprise tốt hơn Apache/Nginx như thế nào?",
      answer: "LiteSpeed Enterprise licensed nhanh hơn Apache 5-10 lần, hiệu quả hơn Nginx trong serving dynamic content. Built-in LSCache (tương đương Varnish), HTTP/3 support native, event-driven architecture tiết kiệm resources, anti-DDoS capabilities, và .htaccess compatible với Apache config. Performance improvements đặc biệt rõ rệt cho WordPress/PHP applications với high concurrent users."
    },
    {
      question: "Imunify360 bảo vệ website khỏi những gì?",
      answer: "Imunify360 là AI-powered security suite bảo vệ khỏi: malware (viruses, trojans, backdoors), brute-force attacks, zero-day exploits, DDoS attacks, SQL injection, XSS attacks, và suspicious file modifications. Proactive Defense automatically patches vulnerabilities, Reputation Management blocks malicious IPs, và 24/7 SOC monitoring với real-time threat intelligence. Auto-cleanup infected files."
    },
    {
      question: "WAF (Web Application Firewall) hoạt động như thế nào?",
      answer: "WAF (ModSecurity) filter traffic ở layer 7 (application layer), analyze HTTP/HTTPS requests trước khi đến web server. Block malicious requests dựa trên OWASP Core Rule Set, prevent SQL injection, XSS, file inclusion attacks, bot traffic, và brute-force attempts. Virtual patching bảo vệ vulnerabilities trong applications trước khi có official patches. Customize rules cho từng website."
    },
    {
      question: "Có hỗ trợ migration miễn phí từ hosting cũ không?",
      answer: "Có! Chúng tôi hỗ trợ migrate miễn phí websites, databases, emails từ hosting cũ (cPanel to cPanel or other panels). Team sẽ transfer files via SSH/FTP, import MySQL databases, configure DNS records, test thoroughly trước khi switch DNS. Zero downtime migration cho most cases. Contact support để schedule migration."
    },
    {
      question: "Multi-PHP versions support nghĩa là gì?",
      answer: "Support PHP 7.4, 8.0, 8.1, 8.2, 8.3 đồng thời trên cùng hosting account. Mỗi website/directory có thể chọn PHP version riêng qua PHP Selector trong cPanel, cho phép run legacy apps (PHP 7.4) và modern apps (PHP 8.3) cùng lúc. Switch PHP version không cần restart server, customize php.ini settings per site."
    },
    {
      question: "JetBackup khác gì backup thông thường?",
      answer: "JetBackup là enterprise backup solution với incremental backups (chỉ backup thay đổi, tiết kiệm storage), automated schedules (hourly/daily/weekly/real-time), off-site backup locations (separate servers), instant restore qua cPanel interface, snapshot backups, và retention policies flexible. Free backup storage không tính vào disk quota."
    },
    {
      question: "Uptime SLA 99.99% có nghĩa là gì?",
      answer: "99.99% uptime SLA = maximum 4.3 phút downtime mỗi tháng (52.6 phút/năm). 99.999% (five nines) = maximum 26 giây downtime/tháng. SLA guarantee compensation (service credits) nếu không đạt uptime commitment. Scheduled maintenance không tính vào downtime. Infrastructure monitoring 24/7 với automatic failover."
    },
    {
      question: "Có thể upgrade/downgrade gói hosting không?",
      answer: "Có thể upgrade/downgrade bất cứ lúc nào. Upgrade có hiệu lực ngay lập tức với instant resource provisioning, downgrade áp dụng từ kỳ billing tiếp theo. Data migration tự động, không mất files/databases/emails. Pro-rata billing cho upgrades mid-cycle. Contact support nếu cần assistance với complex migrations."
    },
    {
      question: "Có giới hạn số lượng websites/databases không?",
      answer: "Starter/Business tiers có limits theo gói (1-15 websites, 1-15 databases). Professional trở lên: Không giới hạn websites/databases, chỉ giới hạn bởi disk space và resource allocation. Addon domains, subdomains, parked domains đều được support. Mỗi website có thể có riêng database, email accounts, SSL certificates."
    },
    {
      question: "Redis/Memcached caching có sẵn không?",
      answer: "Business tiers trở lên hỗ trợ Redis (in-memory data store) cho object caching, session storage, và query result caching. Professional/Enterprise tiers có Memcached support cho distributed caching systems. LiteSpeed Cache (LSCache) built-in for all tiers với page caching, browser caching, và CDN integration. Free setup assistance từ support team."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Server className="text-white w-6 h-6" />
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  🏆 Enterprise-Grade Hosting Platform
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Hosting Siêu Tốc – 
                <span className="text-blue-500"> cPanel + LiteSpeed!</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                18 gói hosting từ cơ bản đến enterprise với <strong>cPanel bản quyền</strong>, 
                <strong>AlmaLinux OS</strong>, <strong>LiteSpeed Enterprise</strong>, 
                <strong>Imunify360</strong>, và <strong>WAF hoàn thiện</strong>. 
                Từ 50K/tháng - Phù hợp mọi quy mô!
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-blue-500">cPanel</div>
                  <div className="text-sm text-gray-600">Licensed</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-blue-500">99.99%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-blue-500">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-blue-500">18</div>
                  <div className="text-sm text-gray-600">Gói Hosting</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 px-8 py-6 text-lg font-semibold"
                  data-testid="button-view-packages"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Xem Bảng Giá 18 Gói Hosting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-6 text-lg"
                  data-testid="button-contact"
                  onClick={() => window.location.href = '/contact'}
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>30 ngày hoàn tiền • Migration miễn phí • 10,000+ websites tin dùng</span>
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
                  <span className="text-gray-400 ml-4">cPanel Dashboard</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div><span className="text-blue-400">$</span> cat /etc/os-release</div>
                  <div className="text-gray-500">NAME="AlmaLinux"</div>
                  <div className="text-green-500">VERSION="9.3 (Shamrock Pampas Cat)"</div>
                  <div><span className="text-blue-400">$</span> /usr/local/lsws/bin/lshttpd -v</div>
                  <div className="text-purple-400">LiteSpeed/6.2.2 Enterprise</div>
                  <div><span className="text-blue-400">$</span> imunify360-agent version</div>
                  <div className="text-cyan-400">Imunify360 v7.10.4 (licensed)</div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="text-gray-400 text-xs mb-2">System Status:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Web Server:</span>
                      <span className="text-green-400">LiteSpeed ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Security Suite:</span>
                      <span className="text-blue-400">Imunify360 ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">WAF Status:</span>
                      <span className="text-purple-400">Active ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
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
              Tính Năng Kỹ Thuật Enterprise-Grade
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Công nghệ và bản quyền cao cấp nhất đảm bảo hiệu suất, bảo mật, và độ tin cậy tối đa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {technicalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              18 Gói Hosting - Từ Startup Đến Enterprise
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Lựa chọn gói hosting với resources và tính năng phù hợp cho website của bạn
            </p>

            {/* View Toggle */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={!compareView ? "default" : "outline"}
                onClick={() => setCompareView(false)}
                className={!compareView ? "bg-blue-500 hover:bg-blue-600" : ""}
                data-testid="button-grid-view"
              >
                <Server className="w-4 h-4 mr-2" />
                Xem Dạng Cards
              </Button>
              <Button
                variant={compareView ? "default" : "outline"}
                onClick={() => setCompareView(true)}
                className={compareView ? "bg-blue-500 hover:bg-blue-600" : ""}
                data-testid="button-table-view"
              >
                <FileText className="w-4 h-4 mr-2" />
                Bảng So Sánh Chi Tiết
              </Button>
            </div>
          </motion.div>

          {!compareView ? (
            <>
              {/* Grid View */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {displayedPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative ${
                      pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                    } ${pkg.enterprise ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : ''}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          ⭐ Phổ Biến Nhất
                        </span>
                      </div>
                    )}

                    {pkg.enterprise && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                          👑 Enterprise
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className={`text-sm font-medium mb-2 ${pkg.enterprise ? 'text-gray-300' : 'text-gray-500'}`}>
                        {pkg.tier}
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 ${pkg.enterprise ? 'text-white' : 'text-gray-900'}`}>
                        {pkg.name}
                      </h3>
                      <div className={`text-3xl font-bold mb-2 ${pkg.enterprise ? 'text-yellow-400' : 'text-blue-500'}`}>
                        {pkg.price === "Custom" ? "Liên hệ" : `${pkg.price} VNĐ`}
                      </div>
                      {pkg.price !== "Custom" && (
                        <div className={`text-sm ${pkg.enterprise ? 'text-gray-400' : 'text-gray-500'}`}>
                          /tháng
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <div className="text-sm">
                          <span className="font-semibold">{pkg.storage}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <div className="text-sm">
                          <span className="font-semibold">{pkg.cpu}</span> • {pkg.ram}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <div className="text-sm">{pkg.websites}</div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <div className="text-sm">{pkg.database}</div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <div className="text-sm">Backup: {pkg.backup}</div>
                      </div>
                    </div>

                    <div className={`text-center mb-6 p-3 rounded-lg ${pkg.enterprise ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${pkg.enterprise ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong className={pkg.enterprise ? 'text-white' : ''}>Phù hợp:</strong> {pkg.suitable}
                      </p>
                    </div>

                    <Button 
                      className={`w-full py-6 ${
                        pkg.enterprise 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold'
                          : pkg.popular 
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                      data-testid={`button-select-${pkg.name}`}
                      onClick={() => window.location.href = '/contact'}
                    >
                      {pkg.enterprise ? 'Liên Hệ Tư Vấn' : 'Đăng Ký Ngay'}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {!showAllPackages && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowAllPackages(true)}
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-6"
                    data-testid="button-show-all"
                  >
                    Xem Thêm 12 Gói Hosting
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {showAllPackages && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setShowAllPackages(false);
                      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-6"
                    data-testid="button-show-less"
                  >
                    Thu Gọn
                    <ChevronUp className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Table View */
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow-xl ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-blue-500 sticky top-0 z-10">
                      <tr>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Gói</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Giá/tháng</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Storage</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">CPU/RAM</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Websites</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Database</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Bandwidth</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Backup</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Support</th>
                        <th className="py-4 px-6 text-center text-sm font-semibold text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {hostingPackages.map((pkg, index) => (
                        <tr 
                          key={pkg.id} 
                          className={`hover:bg-gray-50 ${pkg.popular ? 'bg-blue-50' : ''} ${pkg.enterprise ? 'bg-yellow-50' : ''}`}
                        >
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="font-semibold text-gray-900">{pkg.name}</div>
                                <div className="text-xs text-gray-500">{pkg.tier}</div>
                              </div>
                              {pkg.popular && <span className="ml-2 text-blue-500">⭐</span>}
                              {pkg.enterprise && <span className="ml-2">👑</span>}
                            </div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div className="font-bold text-blue-500">
                              {pkg.price === "Custom" ? "Liên hệ" : `${pkg.price} VNĐ`}
                            </div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                            {pkg.storage}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                            <div>{pkg.cpu}</div>
                            <div className="text-xs text-gray-500">{pkg.ram}</div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                            {pkg.websites}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                            {pkg.database}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                            {pkg.bandwidth}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                            {pkg.backup}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                            {pkg.support}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-center">
                            <Button
                              size="sm"
                              className={pkg.enterprise ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}
                              data-testid={`button-select-table-${pkg.name}`}
                              onClick={() => window.location.href = '/contact'}
                            >
                              Chọn Gói
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Competitor Comparison */}
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
              So Sánh STEP Hosting Với Đối Thủ
            </h2>
            <p className="text-xl text-gray-600">
              Tại sao khách hàng chọn STEP Hosting?
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left text-lg font-semibold">Tính Năng</th>
                    <th className="py-4 px-6 text-center text-lg font-semibold">
                      STEP Hosting
                    </th>
                    <th className="py-4 px-6 text-center text-lg font-semibold">Đối Thủ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {competitorComparison.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">{item.metric}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {item.step}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-gray-600 text-sm">
                        {item.competitor}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              Khách Hàng Nói Gì Về STEP Hosting?
            </h2>
            <p className="text-xl text-gray-600">
              Hơn 10,000+ websites tin dùng STEP Hosting
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-xl text-gray-600">
              Giải đáp mọi thắc mắc về Hosting
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-semibold text-gray-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Sẵn Sàng Bắt Đầu Với Hosting Enterprise?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nhận <strong>30 ngày hoàn tiền</strong> + <strong>migration miễn phí</strong>. 
              Hơn 10,000+ website đã tin tưởng!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                data-testid="button-cta-register"
                onClick={() => window.location.href = '/contact'}
              >
                Đăng Ký Ngay - Miễn Phí 30 Ngày
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-500 px-8 py-6 text-lg font-semibold"
                data-testid="button-cta-contact"
                onClick={() => window.location.href = '/contact'}
              >
                Tư Vấn Miễn Phí
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
