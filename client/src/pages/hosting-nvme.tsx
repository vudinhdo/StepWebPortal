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
  TrendingUp,
  Lock,
  HardDrive,
  Cpu,
  Activity,
  BarChart3,
  RefreshCw,
  FileText,
  HeadphonesIcon,
  Rocket,
  Award,
  ChevronDown,
  ChevronUp,
  Gauge,
  Cloud,
  Code2
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HostingNVME() {
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [compareView, setCompareView] = useState(false);

  // 18 NVME Hosting Packages - From Starter to Enterprise
  const packages = [
    {
      id: 1,
      name: "NV-Starter-1",
      tier: "Starter",
      price: "80.000",
      monthlyPrice: 80000,
      storage: "10 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "10,000 IOPS",
      database: "1 Database",
      email: "1 Email",
      domains: "1 Tên miền",
      subdomains: "Không",
      cpu: "1 vCore",
      ram: "1 GB",
      websites: "1 Website",
      ssl: "SSL Miễn phí",
      backup: "Weekly",
      support: "Email 24h",
      suitable: "Blog cá nhân/Landing page đơn giản"
    },
    {
      id: 2,
      name: "NV-Starter-2",
      tier: "Starter",
      price: "120.000",
      monthlyPrice: 120000,
      storage: "20 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "15,000 IOPS",
      database: "2 Databases",
      email: "2 Emails",
      domains: "2 Tên miền",
      subdomains: "5 Subdomains",
      cpu: "1 vCore",
      ram: "1.5 GB",
      websites: "2 Websites",
      ssl: "SSL Miễn phí",
      backup: "Weekly",
      support: "Email 24h",
      suitable: "Portfolio/Personal projects"
    },
    {
      id: 3,
      name: "NV-Starter-3",
      tier: "Starter",
      price: "180.000",
      monthlyPrice: 180000,
      storage: "30 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "20,000 IOPS",
      database: "3 Databases",
      email: "3 Emails",
      domains: "3 Tên miền",
      subdomains: "10 Subdomains",
      cpu: "2 vCores",
      ram: "2 GB",
      websites: "3 Websites",
      ssl: "SSL Miễn phí",
      backup: "Weekly",
      support: "Email 12h",
      suitable: "Freelancer/Startup nhỏ"
    },
    {
      id: 4,
      name: "NV-Business-1",
      tier: "Business",
      price: "280.000",
      monthlyPrice: 280000,
      storage: "50 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "30,000 IOPS",
      database: "5 Databases",
      email: "5 Emails",
      domains: "5 Tên miền",
      subdomains: "20 Subdomains",
      cpu: "2 vCores",
      ram: "3 GB",
      websites: "5 Websites",
      ssl: "SSL Miễn phí",
      backup: "Daily",
      support: "Chat 8h",
      suitable: "Business Website/E-commerce nhỏ",
      popular: true
    },
    {
      id: 5,
      name: "NV-Business-2",
      tier: "Business",
      price: "400.000",
      monthlyPrice: 400000,
      storage: "80 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "50,000 IOPS",
      database: "10 Databases",
      email: "10 Emails",
      domains: "10 Tên miền",
      subdomains: "50 Subdomains",
      cpu: "3 vCores",
      ram: "4 GB",
      websites: "8 Websites",
      ssl: "SSL Miễn phí + Wildcard",
      backup: "Daily",
      support: "Chat/Phone 4h",
      suitable: "SME/Agency websites"
    },
    {
      id: 6,
      name: "NV-Business-3",
      tier: "Business",
      price: "550.000",
      monthlyPrice: 550000,
      storage: "120 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "75,000 IOPS",
      database: "15 Databases",
      email: "15 Emails",
      domains: "15 Tên miền",
      subdomains: "100 Subdomains",
      cpu: "4 vCores",
      ram: "6 GB",
      websites: "12 Websites",
      ssl: "SSL Miễn phí + Wildcard",
      backup: "Daily + On-demand",
      support: "Priority 2h",
      suitable: "Multiple projects/High-traffic sites"
    },
    {
      id: 7,
      name: "NV-Professional-1",
      tier: "Professional",
      price: "750.000",
      monthlyPrice: 750000,
      storage: "200 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "100,000 IOPS",
      database: "20 Databases",
      email: "20 Emails",
      domains: "20 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "6 vCores",
      ram: "8 GB",
      websites: "20 Websites",
      ssl: "SSL Pro + Wildcard",
      backup: "Hourly",
      support: "Priority 1h",
      suitable: "Professional developers/High-performance apps"
    },
    {
      id: 8,
      name: "NV-Professional-2",
      tier: "Professional",
      price: "1.000.000",
      monthlyPrice: 1000000,
      storage: "300 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "150,000 IOPS",
      database: "30 Databases",
      email: "30 Emails",
      domains: "30 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "8 vCores",
      ram: "12 GB",
      websites: "30 Websites",
      ssl: "SSL Pro + EV",
      backup: "Hourly",
      support: "Dedicated Support",
      suitable: "Production apps/API services"
    },
    {
      id: 9,
      name: "NV-Professional-3",
      tier: "Professional",
      price: "1.350.000",
      monthlyPrice: 1350000,
      storage: "500 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "200,000 IOPS",
      database: "50 Databases",
      email: "50 Emails",
      domains: "50 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "10 vCores",
      ram: "16 GB",
      websites: "50 Websites",
      ssl: "SSL Pro + EV",
      backup: "Real-time",
      support: "24/7 Dedicated",
      suitable: "Development teams/SaaS platforms"
    },
    {
      id: 10,
      name: "NV-Advanced-1",
      tier: "Advanced",
      price: "1.800.000",
      monthlyPrice: 1800000,
      storage: "750 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "300,000 IOPS",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "12 vCores",
      ram: "24 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise",
      backup: "Real-time + GEO",
      support: "24/7 Premium",
      suitable: "Large organizations/Multi-brand"
    },
    {
      id: 11,
      name: "NV-Advanced-2",
      tier: "Advanced",
      price: "2.400.000",
      monthlyPrice: 2400000,
      storage: "1 TB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "400,000 IOPS",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "16 vCores",
      ram: "32 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise + DV",
      backup: "Real-time + Multi-region",
      support: "24/7 Premium + DevOps",
      suitable: "High-traffic platforms/Media sites"
    },
    {
      id: 12,
      name: "NV-Advanced-3",
      tier: "Advanced",
      price: "3.200.000",
      monthlyPrice: 3200000,
      storage: "1.5 TB NVMe SSD",
      bandwidth: "Không giới hạn",
      iops: "500,000 IOPS",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "20 vCores",
      ram: "48 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise + EV",
      backup: "Real-time + Multi-region",
      support: "24/7 Premium + Architect",
      suitable: "Enterprise/Mission-critical systems"
    },
    {
      id: 13,
      name: "NV-Enterprise-1",
      tier: "Enterprise",
      price: "4.000.000",
      monthlyPrice: 4000000,
      storage: "2 TB NVMe SSD",
      bandwidth: "Dedicated 1 Gbps",
      iops: "750,000 IOPS",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "24 vCores",
      ram: "64 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise Suite",
      backup: "Real-time + Global CDN",
      support: "24/7 Enterprise + Architect",
      suitable: "Large corporations/Financial services"
    },
    {
      id: 14,
      name: "NV-Enterprise-2",
      tier: "Enterprise",
      price: "5.500.000",
      monthlyPrice: 5500000,
      storage: "3 TB NVMe SSD",
      bandwidth: "Dedicated 2 Gbps",
      iops: "1,000,000 IOPS",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "32 vCores",
      ram: "96 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise Suite + Custom",
      backup: "Real-time + Multi-cloud",
      support: "24/7 Enterprise + CTO",
      suitable: "Multi-national corps/E-commerce giants"
    },
    {
      id: 15,
      name: "NV-Enterprise-3",
      tier: "Enterprise",
      price: "7.500.000",
      monthlyPrice: 7500000,
      storage: "5 TB NVMe SSD",
      bandwidth: "Dedicated 5 Gbps",
      iops: "1,500,000 IOPS",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "48 vCores",
      ram: "128 GB",
      websites: "Không giới hạn",
      ssl: "Custom SSL Infrastructure",
      backup: "Real-time + Disaster Recovery",
      support: "24/7 White-glove + CTO",
      suitable: "Banking/Healthcare/Government"
    },
    {
      id: 16,
      name: "NV-Enterprise-4",
      tier: "Enterprise",
      price: "10.000.000",
      monthlyPrice: 10000000,
      storage: "8 TB NVMe SSD",
      bandwidth: "Dedicated 10 Gbps",
      iops: "2,000,000 IOPS",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "64 vCores",
      ram: "192 GB",
      websites: "Không giới hạn",
      ssl: "Custom SSL + Zero-Trust",
      backup: "Real-time + Multi-site DR",
      support: "24/7 White-glove + Solutions Architect",
      suitable: "Global platforms/Streaming services"
    },
    {
      id: 17,
      name: "NV-Enterprise-5",
      tier: "Enterprise",
      price: "15.000.000",
      monthlyPrice: 15000000,
      storage: "12 TB NVMe SSD",
      bandwidth: "Dedicated 20 Gbps",
      iops: "3,000,000 IOPS",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "96 vCores",
      ram: "256 GB",
      websites: "Không giới hạn",
      ssl: "Custom SSL + Advanced Protection",
      backup: "Real-time + Global DR",
      support: "24/7 Concierge + Engineering Team",
      suitable: "Fortune 500/Critical infrastructure"
    },
    {
      id: 18,
      name: "NV-Enterprise-6",
      tier: "Enterprise",
      price: "Custom",
      monthlyPrice: 99999999,
      storage: "Custom TB NVMe SSD",
      bandwidth: "Dedicated Custom Gbps",
      iops: "Custom IOPS",
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

  const displayedPackages = showAllPackages ? packages : packages.slice(0, 6);

  // Technical Features specific to NVME
  const technicalFeatures = [
    {
      icon: HardDrive,
      title: "NVMe SSD Storage",
      description: "Công nghệ NVMe (Non-Volatile Memory Express) với tốc độ đọc/ghi gấp 6-10 lần SATA SSD. IOPS cao (10K-3M), latency thấp (< 100µs), ideal cho database-heavy applications và high-traffic websites."
    },
    {
      icon: Zap,
      title: "Ultra-Fast Performance",
      description: "Load time < 0.5s, TTFB (Time To First Byte) < 100ms, hỗ trợ HTTP/2, HTTP/3 với LiteSpeed server. Perfect cho SEO rankings và user experience optimization với Core Web Vitals metrics."
    },
    {
      icon: Gauge,
      title: "High IOPS (I/O Operations)",
      description: "10K-3M IOPS (Input/Output Operations Per Second) tùy gói, xử lý thousands of concurrent requests. Ideal cho e-commerce checkout, API endpoints, và real-time applications với database transactions."
    },
    {
      icon: Activity,
      title: "Low Latency Access",
      description: "Latency < 100 microseconds (µs) cho disk I/O operations, network latency < 20ms trong Vietnam. Critical cho real-time trading platforms, gaming servers, và low-latency API services."
    },
    {
      icon: RefreshCw,
      title: "Automated Backups",
      description: "Weekly/Daily/Hourly/Real-time backups tùy gói, retention 7-90 days, off-site storage, one-click restore. JetBackup integration với incremental backups để tiết kiệm storage và bandwidth."
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Imunify360 AI-powered protection, ModSecurity WAF, DDoS mitigation (up to 10 Gbps), malware scanning, SSL certificates (Free/Pro/EV). Firewall rules và intrusion detection system (IDS)."
    },
    {
      icon: Cloud,
      title: "CDN Integration",
      description: "Cloudflare CDN integration với caching, DDoS protection, và global edge network. Reduce latency cho international visitors, bandwidth savings, và improved SEO rankings."
    },
    {
      icon: Database,
      title: "Database Optimization",
      description: "MySQL 8.0+/MariaDB với query caching, slow query logging, database optimization tools. Redis/Memcached support cho caching, session storage, và performance optimization."
    },
    {
      icon: Cpu,
      title: "Dedicated Resources",
      description: "Dedicated CPU cores (1-96 vCores), guaranteed RAM (1GB-256GB), no overselling. Isolated resources để ensure consistent performance, không bị ảnh hưởng bởi neighbors' traffic."
    },
    {
      icon: BarChart3,
      title: "Real-time Monitoring",
      description: "24/7 uptime monitoring, resource usage dashboard, alerts via email/SMS, performance metrics (CPU, RAM, IOPS, bandwidth). Custom dashboards với Grafana integration cho advanced users."
    },
    {
      icon: Code2,
      title: "Developer Tools",
      description: "SSH/SFTP access, Git integration, WP-CLI, Composer, Node.js, Python support. Multi-PHP versions (7.4-8.3), cron jobs, environment variables (.env), staging environments."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Expert Support",
      description: "Email/Chat/Phone support 24/7, average response time < 1 hour (Priority < 15 mins), expert team với technical knowledge. Free migration assistance và optimization consultations."
    }
  ];

  // Competitor Comparison
  const competitorComparison = [
    { metric: "Disk Technology", step: "NVMe SSD (PCIe 4.0)", competitor: "SATA SSD or HDD" },
    { metric: "IOPS Performance", step: "10K - 3M IOPS", competitor: "1K - 10K IOPS" },
    { metric: "Read/Write Speed", step: "3500/3000 MB/s", competitor: "550/500 MB/s" },
    { metric: "Latency", step: "< 100µs (microseconds)", competitor: "> 500µs" },
    { metric: "Backup Frequency", step: "Real-time to Weekly", competitor: "Weekly or Manual" },
    { metric: "Uptime SLA", step: "99.99% - 99.999%", competitor: "99.5% - 99.9%" },
    { metric: "Support Response", step: "< 1h (Priority < 15min)", competitor: "24h - 48h" },
    { metric: "CDN Integration", step: "Cloudflare Enterprise", competitor: "Basic or None" }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Anh Hoàng Minh",
      role: "CTO",
      company: "E-commerce Startup",
      rating: 5,
      text: "NVMe hosting của STEP giúp trang checkout load nhanh gấp 3 lần, conversion rate tăng 40%! IOPS cao xử lý thousands of concurrent users mùa sale không lag. Backup tự động cứu team khi có incident.",
      avatar: "👨‍💼"
    },
    {
      name: "Chị Lan Anh",
      role: "Full-stack Developer",
      company: "Agency Hà Nội",
      rating: 5,
      text: "Latency thấp và IOPS cao làm database queries nhanh hơn hẳn hosting cũ. API response time giảm từ 800ms xuống < 200ms. Support team technical, giải quyết vấn đề optimization trong vài phút!",
      avatar: "👩‍💻"
    },
    {
      name: "Anh Tuấn Khải",
      role: "DevOps Engineer",
      company: "SaaS Platform",
      rating: 5,
      text: "Real-time backup và monitoring dashboard giúp yên tâm deploy production. NVMe speed làm CI/CD pipelines nhanh hơn, build time giảm 50%. Highly recommended cho production environments!",
      avatar: "🚀"
    }
  ];

  // FAQ
  const faqs = [
    {
      question: "NVMe Hosting khác gì SSD/HDD Hosting thông thường?",
      answer: "NVMe (Non-Volatile Memory Express) sử dụng PCIe interface thay vì SATA, cho tốc độ đọc/ghi gấp 6-10 lần SATA SSD và 50-100 lần HDD. IOPS cao hơn (10K-3M vs 1K-10K), latency thấp hơn (< 100µs vs > 500µs), ideal cho database-heavy apps, e-commerce với high concurrent users, và real-time applications. NVMe hosting phù hợp cho production environments cần maximum performance."
    },
    {
      question: "IOPS là gì và tôi cần bao nhiêu IOPS?",
      answer: "IOPS (Input/Output Operations Per Second) đo lường số lượng read/write operations mà storage có thể xử lý mỗi giây. Blog/Portfolio: 10K-20K IOPS đủ. E-commerce/Business sites: 30K-100K IOPS. High-traffic apps/APIs: 100K-500K IOPS. Enterprise/Real-time systems: 500K-3M IOPS. Higher IOPS = faster database queries, quicker file access, better performance với concurrent users."
    },
    {
      question: "Có hỗ trợ migration từ hosting cũ sang NVMe không?",
      answer: "Có! Chúng tôi hỗ trợ migrate miễn phí websites, databases, emails từ hosting cũ sang NVMe hosting. Team sẽ transfer files, import databases, configure DNS, test kỹ trước khi chuyển DNS chính thức. Zero downtime migration cho most cases. Contact support để schedule migration time phù hợp."
    },
    {
      question: "Có thể nâng cấp hoặc hạ cấp gói NVMe không?",
      answer: "Có thể upgrade/downgrade bất cứ lúc nào. Upgrade có hiệu lực ngay lập tức (instant provisioning), downgrade áp dụng từ kỳ billing tiếp theo. Resources (CPU, RAM, Storage, IOPS) được điều chỉnh theo gói mới. Data được migrate automatically, không mất file hoặc database. Liên hệ support nếu cần assistance."
    },
    {
      question: "Chính sách backup như thế nào? Có thể restore được không?",
      answer: "Starter tiers: Weekly backups, retention 7 days. Business tiers: Daily backups, retention 14 days. Professional tiers: Hourly backups, retention 30 days. Advanced/Enterprise: Real-time backups + multi-region replication, retention 90 days. Tất cả gói support one-click restore qua dashboard, restore time từ 5 phút (files) đến 30 phút (full website) tùy dung lượng."
    },
    {
      question: "NVMe Hosting có giới hạn băng thông hoặc traffic không?",
      answer: "Starter-Advanced tiers: Unlimited bandwidth cho HTTP/HTTPS traffic, không giới hạn visitors hoặc pageviews. Enterprise tiers: Dedicated bandwidth (1-20 Gbps) với QoS policies. Không charge overage fees. Nếu traffic spike bất thường (> 10x normal), team sẽ liên hệ để suggest upgrade hoặc optimization."
    },
    {
      question: "Có hỗ trợ Redis/Memcached cho caching không?",
      answer: "Business tiers trở lên hỗ trợ Redis cache (in-memory data store) cho session storage, query caching, và object caching. Professional/Enterprise tiers có Memcached support cho distributed caching systems. Redis Cluster available cho Enterprise tiers với high availability và failover. Free setup assistance từ support team."
    },
    {
      question: "Uptime SLA là bao nhiêu? Có compensation không?",
      answer: "Starter/Business: 99.9% uptime SLA (< 43 phút downtime/tháng). Professional/Advanced: 99.99% SLA (< 4.3 phút/tháng). Enterprise: 99.999% SLA (< 26 giây/tháng). Nếu không đạt SLA: refund credits tương ứng với downtime percentage. Scheduled maintenance không tính vào downtime. Monitoring 24/7 với alerts."
    },
    {
      question: "Có hỗ trợ SSL certificates không? Loại nào?",
      answer: "Starter-Business: SSL miễn phí (Let's Encrypt AutoSSL) cho tất cả domains. Professional: SSL Pro (DV - Domain Validation) + Wildcard SSL. Advanced: SSL Enterprise (OV - Organization Validation). Enterprise: EV SSL (Extended Validation) + Custom SSL infrastructure. Auto-renewal cho all certificate types, support SNI để host multiple SSL trên shared IP."
    },
    {
      question: "Latency từ Vietnam ra nước ngoài như thế nào?",
      answer: "Servers đặt tại Vietnam datacenters (Hà Nội, HCM) với latency < 20ms trong VN. International latency: Singapore ~30ms, Hong Kong ~40ms, Japan ~60ms, USA West ~150ms, Europe ~200ms. Enterprise tiers support multi-region deployment (Singapore, Tokyo, USA) với global load balancing và CDN để reduce latency cho international traffic."
    },
    {
      question: "Có hỗ trợ staging environment cho testing không?",
      answer: "Professional tiers trở lên hỗ trợ staging/development environments với separate domains (e.g., staging.yoursite.com). Clone production site sang staging với one click, test changes, rồi push lên production. Git integration cho version control. Enterprise tiers có unlimited staging environments với blue-green deployment capabilities."
    },
    {
      question: "Tôi cần bao nhiêu resources (CPU/RAM) cho website?",
      answer: "Blog/Portfolio (< 10K visitors/month): 1-2 vCores, 1-2GB RAM. Business sites (10K-100K visitors): 2-4 vCores, 3-6GB RAM. E-commerce/High-traffic (100K-1M visitors): 6-12 vCores, 8-24GB RAM. Large platforms (> 1M visitors): 12-24 vCores, 24-64GB RAM. Enterprise/Mission-critical: 24+ vCores, 64-256GB RAM. Contact sales để capacity planning và load testing recommendations."
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
                  <HardDrive className="text-white w-6 h-6" />
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  NVMe Performance Hosting
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Hosting NVMe Siêu Tốc – 
                <span className="text-blue-500"> Load &lt; 0.5s, IOPS 3M!</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Công nghệ NVMe SSD tốc độ cao nhất thị trường với IOPS từ 10K đến 3M, 
                latency &lt; 100µs, backup tự động, bảo mật toàn diện. Từ 80K/tháng - 
                Phù hợp mọi quy mô từ blog cá nhân đến enterprise platforms.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-blue-500">&lt; 0.5s</div>
                  <div className="text-sm text-gray-600">Load Time</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-blue-500">3M</div>
                  <div className="text-sm text-gray-600">Max IOPS</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-blue-500">99.99%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
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
                  Xem Bảng Giá 18 Gói NVMe
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
                <span>14 ngày dùng thử miễn phí • Hoàn tiền 100% trong 30 ngày • 5,000+ websites tin dùng</span>
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
                  <span className="text-gray-400 ml-4">NVMe Performance Monitor</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div><span className="text-blue-400">$</span> hdparm -t /dev/nvme0n1</div>
                  <div className="text-gray-500">Timing buffered disk reads:</div>
                  <div className="text-green-500">✓ 10.50 GB in 3.00 seconds = 3500 MB/sec</div>
                  <div><span className="text-blue-400">$</span> fio --name=randread --rw=randread</div>
                  <div className="text-gray-500">IOPS: 1,500,000 (1.5M IOPS)</div>
                  <div className="text-purple-400">Latency: avg=65µs, max=120µs</div>
                </div>

                {/* Performance metrics */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="text-gray-400 text-xs mb-2">Website Performance:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">TTFB (Time To First Byte):</span>
                      <span className="text-green-400">87ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Full Page Load:</span>
                      <span className="text-blue-400">412ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Database Queries:</span>
                      <span className="text-purple-400">143 queries/sec</span>
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
              Tính Năng Kỹ Thuật NVMe Hosting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Công nghệ và tính năng tiên tiến nhất để đảm bảo hiệu suất, bảo mật, và độ tin cậy tối đa
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
              18 Gói NVMe Hosting - Từ Blog Đến Enterprise
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Lựa chọn gói hosting với IOPS và resources phù hợp cho website của bạn
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
                          <span className="font-semibold">{pkg.iops}</span> Performance
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
                    Xem Thêm 12 Gói NVMe Hosting
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
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">IOPS</th>
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
                      {packages.map((pkg, index) => (
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
                            {pkg.iops}
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
              So Sánh NVMe Hosting STEP Với Đối Thủ
            </h2>
            <p className="text-xl text-gray-600">
              Tại sao khách hàng chọn STEP NVMe Hosting?
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left text-lg font-semibold">Tính Năng</th>
                    <th className="py-4 px-6 text-center text-lg font-semibold">
                      STEP NVMe Hosting
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
              Khách Hàng Nói Gì Về STEP NVMe?
            </h2>
            <p className="text-xl text-gray-600">
              Hơn 5,000+ websites tin dùng STEP NVMe Hosting
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
              Giải đáp mọi thắc mắc về NVMe Hosting
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
              Sẵn Sàng Trải Nghiệm Tốc Độ NVMe?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bắt đầu với 14 ngày dùng thử miễn phí. Không cần thẻ tín dụng. 
              Hoàn tiền 100% trong 30 ngày nếu không hài lòng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                data-testid="button-cta-register"
                onClick={() => window.location.href = '/contact'}
              >
                Đăng Ký Ngay - Miễn Phí 14 Ngày
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
