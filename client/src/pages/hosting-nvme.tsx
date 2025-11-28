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
  Code2,
  Timer,
  Layers,
  Settings,
  MessageCircle,
  CircleCheck,
  CircleX,
  Sparkles,
  Crown
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HostingNVME() {
  const [animatedIOPS, setAnimatedIOPS] = useState(0);
  const [animatedSpeed, setAnimatedSpeed] = useState(0);
  const [activePackageTab, setActivePackageTab] = useState("Business");

  useEffect(() => {
    const iopsInterval = setInterval(() => {
      setAnimatedIOPS(prev => {
        if (prev >= 1500000) return 1500000;
        return prev + 25000;
      });
    }, 20);
    
    const speedInterval = setInterval(() => {
      setAnimatedSpeed(prev => {
        if (prev >= 3500) return 3500;
        return prev + 50;
      });
    }, 20);
    
    return () => {
      clearInterval(iopsInterval);
      clearInterval(speedInterval);
    };
  }, []);

  const packages = [
    {
      id: 1, name: "NV-Starter-1", tier: "Starter", price: "80.000", monthlyPrice: 80000,
      storage: "10 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "10,000 IOPS", iopsValue: 10000,
      database: "1 Database", email: "1 Email", domains: "1 Tên miền", subdomains: "Không",
      cpu: "1 vCore", ram: "1 GB", websites: "1 Website", ssl: "SSL Miễn phí",
      backup: "Weekly", support: "Email 24h", suitable: "Blog cá nhân/Landing page đơn giản"
    },
    {
      id: 2, name: "NV-Starter-2", tier: "Starter", price: "120.000", monthlyPrice: 120000,
      storage: "20 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "15,000 IOPS", iopsValue: 15000,
      database: "2 Databases", email: "2 Emails", domains: "2 Tên miền", subdomains: "5 Subdomains",
      cpu: "1 vCore", ram: "1.5 GB", websites: "2 Websites", ssl: "SSL Miễn phí",
      backup: "Weekly", support: "Email 24h", suitable: "Portfolio/Personal projects"
    },
    {
      id: 3, name: "NV-Starter-3", tier: "Starter", price: "180.000", monthlyPrice: 180000,
      storage: "30 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "20,000 IOPS", iopsValue: 20000,
      database: "3 Databases", email: "3 Emails", domains: "3 Tên miền", subdomains: "10 Subdomains",
      cpu: "2 vCores", ram: "2 GB", websites: "3 Websites", ssl: "SSL Miễn phí",
      backup: "Weekly", support: "Email 12h", suitable: "Freelancer/Startup nhỏ"
    },
    {
      id: 4, name: "NV-Business-1", tier: "Business", price: "280.000", monthlyPrice: 280000,
      storage: "50 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "30,000 IOPS", iopsValue: 30000,
      database: "5 Databases", email: "5 Emails", domains: "5 Tên miền", subdomains: "20 Subdomains",
      cpu: "2 vCores", ram: "3 GB", websites: "5 Websites", ssl: "SSL Miễn phí",
      backup: "Daily", support: "Chat 8h", suitable: "Business Website/E-commerce nhỏ", popular: true
    },
    {
      id: 5, name: "NV-Business-2", tier: "Business", price: "400.000", monthlyPrice: 400000,
      storage: "80 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "50,000 IOPS", iopsValue: 50000,
      database: "10 Databases", email: "10 Emails", domains: "10 Tên miền", subdomains: "50 Subdomains",
      cpu: "3 vCores", ram: "4 GB", websites: "8 Websites", ssl: "SSL Miễn phí + Wildcard",
      backup: "Daily", support: "Chat/Phone 4h", suitable: "SME/Agency websites"
    },
    {
      id: 6, name: "NV-Business-3", tier: "Business", price: "550.000", monthlyPrice: 550000,
      storage: "120 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "75,000 IOPS", iopsValue: 75000,
      database: "15 Databases", email: "15 Emails", domains: "15 Tên miền", subdomains: "100 Subdomains",
      cpu: "4 vCores", ram: "6 GB", websites: "12 Websites", ssl: "SSL Miễn phí + Wildcard",
      backup: "Daily + On-demand", support: "Priority 2h", suitable: "Multiple projects/High-traffic sites"
    },
    {
      id: 7, name: "NV-Professional-1", tier: "Professional", price: "750.000", monthlyPrice: 750000,
      storage: "200 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "100,000 IOPS", iopsValue: 100000,
      database: "20 Databases", email: "20 Emails", domains: "20 Tên miền", subdomains: "Không giới hạn",
      cpu: "6 vCores", ram: "8 GB", websites: "20 Websites", ssl: "SSL Pro + Wildcard",
      backup: "Hourly", support: "Priority 1h", suitable: "Professional developers/High-performance apps"
    },
    {
      id: 8, name: "NV-Professional-2", tier: "Professional", price: "1.000.000", monthlyPrice: 1000000,
      storage: "300 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "150,000 IOPS", iopsValue: 150000,
      database: "30 Databases", email: "30 Emails", domains: "30 Tên miền", subdomains: "Không giới hạn",
      cpu: "8 vCores", ram: "12 GB", websites: "30 Websites", ssl: "SSL Pro + EV",
      backup: "Hourly", support: "Dedicated Support", suitable: "Production apps/API services"
    },
    {
      id: 9, name: "NV-Professional-3", tier: "Professional", price: "1.350.000", monthlyPrice: 1350000,
      storage: "500 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "200,000 IOPS", iopsValue: 200000,
      database: "50 Databases", email: "50 Emails", domains: "50 Tên miền", subdomains: "Không giới hạn",
      cpu: "10 vCores", ram: "16 GB", websites: "50 Websites", ssl: "SSL Pro + EV",
      backup: "Real-time", support: "24/7 Dedicated", suitable: "Development teams/SaaS platforms"
    },
    {
      id: 10, name: "NV-Advanced-1", tier: "Advanced", price: "1.800.000", monthlyPrice: 1800000,
      storage: "750 GB NVMe SSD", bandwidth: "Không giới hạn", iops: "300,000 IOPS", iopsValue: 300000,
      database: "Không giới hạn", email: "Không giới hạn", domains: "Không giới hạn", subdomains: "Không giới hạn",
      cpu: "12 vCores", ram: "24 GB", websites: "Không giới hạn", ssl: "SSL Enterprise",
      backup: "Real-time + GEO", support: "24/7 Premium", suitable: "Large organizations/Multi-brand"
    },
    {
      id: 11, name: "NV-Advanced-2", tier: "Advanced", price: "2.400.000", monthlyPrice: 2400000,
      storage: "1 TB NVMe SSD", bandwidth: "Không giới hạn", iops: "400,000 IOPS", iopsValue: 400000,
      database: "Không giới hạn", email: "Không giới hạn", domains: "Không giới hạn", subdomains: "Không giới hạn",
      cpu: "16 vCores", ram: "32 GB", websites: "Không giới hạn", ssl: "SSL Enterprise + DV",
      backup: "Real-time + Multi-region", support: "24/7 Premium + DevOps", suitable: "High-traffic platforms/Media sites"
    },
    {
      id: 12, name: "NV-Advanced-3", tier: "Advanced", price: "3.200.000", monthlyPrice: 3200000,
      storage: "1.5 TB NVMe SSD", bandwidth: "Không giới hạn", iops: "500,000 IOPS", iopsValue: 500000,
      database: "Không giới hạn", email: "Không giới hạn", domains: "Không giới hạn", subdomains: "Không giới hạn",
      cpu: "20 vCores", ram: "48 GB", websites: "Không giới hạn", ssl: "SSL Enterprise + EV",
      backup: "Real-time + Multi-region", support: "24/7 Premium + Architect", suitable: "Enterprise/Mission-critical systems"
    },
    {
      id: 13, name: "NV-Enterprise-1", tier: "Enterprise", price: "4.000.000", monthlyPrice: 4000000,
      storage: "2 TB NVMe SSD", bandwidth: "Dedicated 1 Gbps", iops: "750,000 IOPS", iopsValue: 750000,
      database: "Không giới hạn", email: "Không giới hạn", domains: "Không giới hạn", subdomains: "Không giới hạn",
      cpu: "24 vCores", ram: "64 GB", websites: "Không giới hạn", ssl: "SSL Enterprise Suite",
      backup: "Real-time + Global CDN", support: "24/7 Enterprise + Architect", suitable: "Large corporations/Financial services"
    },
    {
      id: 14, name: "NV-Enterprise-2", tier: "Enterprise", price: "5.500.000", monthlyPrice: 5500000,
      storage: "3 TB NVMe SSD", bandwidth: "Dedicated 2 Gbps", iops: "1,000,000 IOPS", iopsValue: 1000000,
      database: "Không giới hạn", email: "Không giới hạn", domains: "Không giới hạn", subdomains: "Không giới hạn",
      cpu: "32 vCores", ram: "96 GB", websites: "Không giới hạn", ssl: "SSL Enterprise Suite + Custom",
      backup: "Real-time + Multi-cloud", support: "24/7 Enterprise + CTO", suitable: "Multi-national corps/E-commerce giants"
    },
    {
      id: 15, name: "NV-Enterprise-3", tier: "Enterprise", price: "7.500.000", monthlyPrice: 7500000,
      storage: "5 TB NVMe SSD", bandwidth: "Dedicated 5 Gbps", iops: "1,500,000 IOPS", iopsValue: 1500000,
      database: "Không giới hạn", email: "Không giới hạn", domains: "Không giới hạn", subdomains: "Không giới hạn",
      cpu: "48 vCores", ram: "128 GB", websites: "Không giới hạn", ssl: "Custom SSL Infrastructure",
      backup: "Real-time + Disaster Recovery", support: "24/7 White-glove + CTO", suitable: "Banking/Healthcare/Government"
    },
    {
      id: 16, name: "NV-Enterprise-4", tier: "Enterprise", price: "10.000.000", monthlyPrice: 10000000,
      storage: "8 TB NVMe SSD", bandwidth: "Dedicated 10 Gbps", iops: "2,000,000 IOPS", iopsValue: 2000000,
      database: "Không giới hạn", email: "Không giới hạn", domains: "Không giới hạn", subdomains: "Không giới hạn",
      cpu: "64 vCores", ram: "192 GB", websites: "Không giới hạn", ssl: "Custom SSL + Zero-Trust",
      backup: "Real-time + Multi-site DR", support: "24/7 White-glove + Solutions Architect", suitable: "Global platforms/Streaming services"
    },
    {
      id: 17, name: "NV-Enterprise-5", tier: "Enterprise", price: "15.000.000", monthlyPrice: 15000000,
      storage: "12 TB NVMe SSD", bandwidth: "Dedicated 20 Gbps", iops: "3,000,000 IOPS", iopsValue: 3000000,
      database: "Không giới hạn", email: "Không giới hạn", domains: "Không giới hạn", subdomains: "Không giới hạn",
      cpu: "96 vCores", ram: "256 GB", websites: "Không giới hạn", ssl: "Custom SSL + Advanced Protection",
      backup: "Real-time + Global DR", support: "24/7 Concierge + Engineering Team", suitable: "Fortune 500/Critical infrastructure"
    },
    {
      id: 18, name: "NV-Enterprise-6", tier: "Enterprise", price: "Custom", monthlyPrice: 99999999,
      storage: "Custom TB NVMe SSD", bandwidth: "Dedicated Custom Gbps", iops: "Custom IOPS", iopsValue: 9999999,
      database: "Custom Database Cluster", email: "Enterprise Email Suite", domains: "Unlimited Premium", subdomains: "Unlimited Premium",
      cpu: "Custom vCores", ram: "Custom RAM", websites: "Unlimited Premium", ssl: "Custom Security Suite",
      backup: "Custom DR Solution", support: "24/7 Dedicated Engineering Team", suitable: "Custom Enterprise Solutions", enterprise: true
    }
  ];

  const tiers = ["Starter", "Business", "Professional", "Advanced", "Enterprise"];
  const getPackagesByTier = (tier: string) => packages.filter(p => p.tier === tier);

  const featureGroups = [
    {
      category: "Speed & Performance",
      icon: Zap,
      color: "from-cyan-500 to-teal-500",
      features: [
        { icon: HardDrive, title: "NVMe SSD Storage", description: "Công nghệ NVMe (Non-Volatile Memory Express) với tốc độ đọc/ghi gấp 6-10 lần SATA SSD. IOPS cao (10K-3M), latency thấp (< 100µs), ideal cho database-heavy applications và high-traffic websites." },
        { icon: Zap, title: "Ultra-Fast Performance", description: "Load time < 0.5s, TTFB (Time To First Byte) < 100ms, hỗ trợ HTTP/2, HTTP/3 với LiteSpeed server. Perfect cho SEO rankings và user experience optimization với Core Web Vitals metrics." },
        { icon: Cloud, title: "CDN Integration", description: "Cloudflare CDN integration với caching, DDoS protection, và global edge network. Reduce latency cho international visitors, bandwidth savings, và improved SEO rankings." }
      ]
    },
    {
      category: "IOPS & I/O Performance",
      icon: Gauge,
      color: "from-blue-500 to-cyan-500",
      features: [
        { icon: Gauge, title: "High IOPS (I/O Operations)", description: "10K-3M IOPS (Input/Output Operations Per Second) tùy gói, xử lý thousands of concurrent requests. Ideal cho e-commerce checkout, API endpoints, và real-time applications với database transactions." },
        { icon: Activity, title: "Low Latency Access", description: "Latency < 100 microseconds (µs) cho disk I/O operations, network latency < 20ms trong Vietnam. Critical cho real-time trading platforms, gaming servers, và low-latency API services." },
        { icon: Database, title: "Database Optimization", description: "MySQL 8.0+/MariaDB với query caching, slow query logging, database optimization tools. Redis/Memcached support cho caching, session storage, và performance optimization." }
      ]
    },
    {
      category: "Security & Protection",
      icon: Shield,
      color: "from-emerald-500 to-green-500",
      features: [
        { icon: Shield, title: "Advanced Security", description: "Imunify360 AI-powered protection, ModSecurity WAF, DDoS mitigation (up to 10 Gbps), malware scanning, SSL certificates (Free/Pro/EV). Firewall rules và intrusion detection system (IDS)." },
        { icon: RefreshCw, title: "Automated Backups", description: "Weekly/Daily/Hourly/Real-time backups tùy gói, retention 7-90 days, off-site storage, one-click restore. JetBackup integration với incremental backups để tiết kiệm storage và bandwidth." },
        { icon: Cpu, title: "Dedicated Resources", description: "Dedicated CPU cores (1-96 vCores), guaranteed RAM (1GB-256GB), no overselling. Isolated resources để ensure consistent performance, không bị ảnh hưởng bởi neighbors' traffic." }
      ]
    },
    {
      category: "Support & Development",
      icon: HeadphonesIcon,
      color: "from-purple-500 to-indigo-500",
      features: [
        { icon: HeadphonesIcon, title: "24/7 Expert Support", description: "Email/Chat/Phone support 24/7, average response time < 1 hour (Priority < 15 mins), expert team với technical knowledge. Free migration assistance và optimization consultations." },
        { icon: BarChart3, title: "Real-time Monitoring", description: "24/7 uptime monitoring, resource usage dashboard, alerts via email/SMS, performance metrics (CPU, RAM, IOPS, bandwidth). Custom dashboards với Grafana integration cho advanced users." },
        { icon: Code2, title: "Developer Tools", description: "SSH/SFTP access, Git integration, WP-CLI, Composer, Node.js, Python support. Multi-PHP versions (7.4-8.3), cron jobs, environment variables (.env), staging environments." }
      ]
    }
  ];

  const competitorComparison = [
    { metric: "Disk Technology", step: "NVMe SSD (PCIe 4.0)", competitor: "SATA SSD or HDD", advantage: "6-10x faster" },
    { metric: "IOPS Performance", step: "10K - 3M IOPS", competitor: "1K - 10K IOPS", advantage: "300x higher" },
    { metric: "Read/Write Speed", step: "3500/3000 MB/s", competitor: "550/500 MB/s", advantage: "6x faster" },
    { metric: "Latency", step: "< 100µs", competitor: "> 500µs", advantage: "5x lower" },
    { metric: "Backup Frequency", step: "Real-time to Weekly", competitor: "Weekly or Manual", advantage: "Better protection" },
    { metric: "Uptime SLA", step: "99.99% - 99.999%", competitor: "99.5% - 99.9%", advantage: "Higher reliability" },
    { metric: "Support Response", step: "< 1h (Priority < 15min)", competitor: "24h - 48h", advantage: "24x faster" },
    { metric: "CDN Integration", step: "Cloudflare Enterprise", competitor: "Basic or None", advantage: "Global reach" }
  ];

  const testimonials = [
    {
      name: "Anh Hoàng Minh", role: "CTO", company: "E-commerce Startup", rating: 5,
      text: "NVMe hosting của STEP giúp trang checkout load nhanh gấp 3 lần, conversion rate tăng 40%! IOPS cao xử lý thousands of concurrent users mùa sale không lag. Backup tự động cứu team khi có incident.",
      avatar: "👨‍💼", metric: "40% conversion tăng"
    },
    {
      name: "Chị Lan Anh", role: "Full-stack Developer", company: "Agency Hà Nội", rating: 5,
      text: "Latency thấp và IOPS cao làm database queries nhanh hơn hẳn hosting cũ. API response time giảm từ 800ms xuống < 200ms. Support team technical, giải quyết vấn đề optimization trong vài phút!",
      avatar: "👩‍💻", metric: "4x API response time"
    },
    {
      name: "Anh Tuấn Khải", role: "DevOps Engineer", company: "SaaS Platform", rating: 5,
      text: "Real-time backup và monitoring dashboard giúp yên tâm deploy production. NVMe speed làm CI/CD pipelines nhanh hơn, build time giảm 50%. Highly recommended cho production environments!",
      avatar: "🚀", metric: "50% faster builds"
    }
  ];

  const faqCategories = [
    {
      category: "NVMe Technology",
      icon: HardDrive,
      faqs: [
        { question: "NVMe Hosting khác gì SSD/HDD Hosting thông thường?", answer: "NVMe (Non-Volatile Memory Express) sử dụng PCIe interface thay vì SATA, cho tốc độ đọc/ghi gấp 6-10 lần SATA SSD và 50-100 lần HDD. IOPS cao hơn (10K-3M vs 1K-10K), latency thấp hơn (< 100µs vs > 500µs), ideal cho database-heavy apps, e-commerce với high concurrent users, và real-time applications." },
        { question: "IOPS là gì và tôi cần bao nhiêu IOPS?", answer: "IOPS (Input/Output Operations Per Second) đo lường số lượng read/write operations mà storage có thể xử lý mỗi giây. Blog/Portfolio: 10K-20K IOPS. E-commerce/Business sites: 30K-100K IOPS. High-traffic apps/APIs: 100K-500K IOPS. Enterprise/Real-time systems: 500K-3M IOPS." }
      ]
    },
    {
      category: "Performance",
      icon: Zap,
      faqs: [
        { question: "Uptime SLA là bao nhiêu?", answer: "Starter/Business: 99.9% uptime SLA (< 43 phút downtime/tháng). Professional/Advanced: 99.99% SLA (< 4.3 phút/tháng). Enterprise: 99.999% SLA (< 26 giây/tháng). Nếu không đạt SLA: refund credits tương ứng với downtime percentage." },
        { question: "Có hỗ trợ Redis/Memcached cho caching không?", answer: "Business tiers trở lên hỗ trợ Redis cache cho session storage, query caching, và object caching. Professional/Enterprise tiers có Memcached support cho distributed caching systems. Redis Cluster available cho Enterprise tiers với high availability và failover." },
        { question: "Latency từ Vietnam ra nước ngoài như thế nào?", answer: "Servers đặt tại Vietnam datacenters với latency < 20ms trong VN. International: Singapore ~30ms, Hong Kong ~40ms, Japan ~60ms, USA West ~150ms, Europe ~200ms. Enterprise tiers support multi-region deployment với global load balancing." }
      ]
    },
    {
      category: "Migration & Setup",
      icon: RefreshCw,
      faqs: [
        { question: "Có hỗ trợ migration từ hosting cũ sang NVMe không?", answer: "Có! Chúng tôi hỗ trợ migrate miễn phí websites, databases, emails từ hosting cũ sang NVMe hosting. Team sẽ transfer files, import databases, configure DNS, test kỹ trước khi chuyển DNS chính thức. Zero downtime migration cho most cases." },
        { question: "Có thể nâng cấp hoặc hạ cấp gói NVMe không?", answer: "Có thể upgrade/downgrade bất cứ lúc nào. Upgrade có hiệu lực ngay lập tức (instant provisioning), downgrade áp dụng từ kỳ billing tiếp theo. Resources được điều chỉnh theo gói mới, data được migrate automatically." },
        { question: "Có hỗ trợ staging environment cho testing không?", answer: "Professional tiers trở lên hỗ trợ staging/development environments với separate domains. Clone production site sang staging với one click, test changes, rồi push lên production. Git integration cho version control." }
      ]
    },
    {
      category: "Backup & Security",
      icon: Shield,
      faqs: [
        { question: "Chính sách backup như thế nào?", answer: "Starter tiers: Weekly backups, retention 7 days. Business tiers: Daily backups, retention 14 days. Professional tiers: Hourly backups, retention 30 days. Advanced/Enterprise: Real-time backups + multi-region replication, retention 90 days. Tất cả gói support one-click restore." },
        { question: "Có hỗ trợ SSL certificates không?", answer: "Starter-Business: SSL miễn phí (Let's Encrypt AutoSSL) cho tất cả domains. Professional: SSL Pro (DV - Domain Validation) + Wildcard SSL. Advanced: SSL Enterprise (OV). Enterprise: EV SSL (Extended Validation) + Custom SSL infrastructure." },
        { question: "NVMe Hosting có giới hạn băng thông không?", answer: "Starter-Advanced tiers: Unlimited bandwidth cho HTTP/HTTPS traffic, không giới hạn visitors. Enterprise tiers: Dedicated bandwidth (1-20 Gbps) với QoS policies. Không charge overage fees." }
      ]
    },
    {
      category: "Resources",
      icon: Cpu,
      faqs: [
        { question: "Tôi cần bao nhiêu resources (CPU/RAM)?", answer: "Blog/Portfolio (< 10K visitors/month): 1-2 vCores, 1-2GB RAM. Business sites (10K-100K visitors): 2-4 vCores, 3-6GB RAM. E-commerce/High-traffic (100K-1M visitors): 6-12 vCores, 8-24GB RAM. Large platforms (> 1M visitors): 12+ vCores, 24-64GB RAM." }
      ]
    }
  ];

  const formatIOPS = (iops: number) => {
    if (iops >= 1000000) return `${(iops / 1000000).toFixed(1)}M`;
    if (iops >= 1000) return `${(iops / 1000).toFixed(0)}K`;
    return iops.toString();
  };

  const getIOPSColor = (iopsValue: number) => {
    if (iopsValue >= 500000) return "from-yellow-400 to-orange-500";
    if (iopsValue >= 100000) return "from-cyan-400 to-blue-500";
    if (iopsValue >= 30000) return "from-green-400 to-emerald-500";
    return "from-gray-400 to-gray-500";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero Section - NVMe Performance Theme */}
      <section 
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d2847 25%, #0f3460 50%, #0d2847 75%, #0a1628 100%)"
        }}
        data-testid="section-hero"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full filter blur-3xl"></div>
          
          {/* Speed Lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                style={{ top: `${20 + i * 15}%`, width: "100%" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* NVMe Performance Badge */}
              <motion.div 
                className="inline-flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Zap className="text-white w-7 h-7" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full border border-cyan-500/30 backdrop-blur-sm">
                  <span className="text-cyan-300 text-sm font-semibold tracking-wide flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    NVMe Performance Hosting
                  </span>
                </div>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="heading-hero">
                Hosting NVMe 
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                  Siêu Tốc – IOPS 3M!
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl" data-testid="text-hero-description">
                Công nghệ NVMe SSD tốc độ cao nhất thị trường với IOPS từ 10K đến 3M, 
                latency &lt; 100µs, backup tự động, bảo mật toàn diện.
              </p>

              {/* Animated Performance Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
                <motion.div 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  data-testid="stat-load-time"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Timer className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-gray-400">Load Time</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">&lt; 0.5s</div>
                </motion.div>
                <motion.div 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-teal-500/20 hover:border-teal-400/40 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  data-testid="stat-iops"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge className="w-4 h-4 text-teal-400" />
                    <span className="text-xs text-gray-400">Max IOPS</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-teal-400">3M</div>
                </motion.div>
                <motion.div 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-green-500/20 hover:border-green-400/40 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  data-testid="stat-uptime"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400">Uptime</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-green-400">99.99%</div>
                </motion.div>
                <motion.div 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/40 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  data-testid="stat-packages"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-gray-400">Gói Hosting</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-purple-400">18</div>
                </motion.div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-6 md:px-8 py-6 text-lg font-semibold shadow-lg shadow-cyan-500/25 group"
                  data-testid="button-view-packages"
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Xem Bảng Giá NVMe
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 px-6 md:px-8 py-6 text-lg"
                  data-testid="button-contact"
                  onClick={() => window.location.href = '/contact'}
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  14 ngày dùng thử
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Hoàn tiền 100%
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  5,000+ websites
                </span>
              </div>
            </motion.div>

            {/* Performance Gauge Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Speed Gauge */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
                  <div className="text-center mb-6">
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Real-time Performance</h3>
                    <div className="text-cyan-400 text-xs">NVMe SSD Monitor</div>
                  </div>
                  
                  {/* Circular Gauge */}
                  <div className="relative w-56 h-56 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="112"
                        cy="112"
                        r="100"
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.1)"
                        strokeWidth="16"
                      />
                      <motion.circle
                        cx="112"
                        cy="112"
                        r="100"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeDasharray={628}
                        initial={{ strokeDashoffset: 628 }}
                        animate={{ strokeDashoffset: 628 * (1 - animatedSpeed / 3500) }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-white">{animatedSpeed.toLocaleString()}</span>
                      <span className="text-cyan-400 text-sm">MB/s</span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-cyan-400 text-xl font-bold">{formatIOPS(animatedIOPS)}</div>
                      <div className="text-gray-500 text-xs">IOPS</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-teal-400 text-xl font-bold">&lt; 100µs</div>
                      <div className="text-gray-500 text-xs">Latency</div>
                    </div>
                  </div>
                  
                  {/* Live Stats */}
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">TTFB</span>
                      <span className="text-green-400 font-mono">87ms</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Full Page Load</span>
                      <span className="text-cyan-400 font-mono">412ms</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Database Queries</span>
                      <span className="text-purple-400 font-mono">143/sec</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Features Section - Grouped with Accordion */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900" data-testid="section-features">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
              <Settings className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-cyan-700 dark:text-cyan-300 text-sm font-medium">Technical Specifications</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="heading-features">
              Tính Năng Kỹ Thuật NVMe
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Công nghệ tiên tiến nhất đảm bảo hiệu suất, bảo mật, và độ tin cậy tối đa
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <Accordion type="multiple" className="space-y-4" data-testid="accordion-features">
              {featureGroups.map((group, groupIndex) => (
                <AccordionItem 
                  key={groupIndex} 
                  value={`group-${groupIndex}`}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  data-testid={`accordion-item-${group.category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <group.icon className="text-white w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{group.category}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{group.features.length} tính năng</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid md:grid-cols-3 gap-4 pt-2">
                      {group.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                          data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-8 h-8 bg-gradient-to-br ${group.color} rounded-lg flex items-center justify-center`}>
                              <feature.icon className="text-white w-4 h-4" />
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</h4>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Packages Section with Tabs */}
      <section id="packages" className="py-16 md:py-20 bg-white dark:bg-gray-950" data-testid="section-packages">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-full mb-4">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-cyan-700 dark:text-cyan-300 text-sm font-medium">18 Gói Hosting</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="heading-packages">
              Chọn Gói NVMe Phù Hợp
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Từ blog cá nhân đến enterprise platforms - Với IOPS và resources tối ưu
            </p>
          </motion.div>

          <Tabs value={activePackageTab} onValueChange={setActivePackageTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent h-auto p-0" data-testid="tabs-packages">
              {tiers.map((tier) => (
                <TabsTrigger 
                  key={tier}
                  value={tier}
                  className={`px-4 md:px-6 py-2.5 rounded-full font-medium transition-all data-[state=active]:shadow-lg ${
                    tier === "Enterprise" 
                      ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-500 data-[state=active]:text-gray-900"
                      : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
                  }`}
                  data-testid={`tab-${tier.toLowerCase()}`}
                >
                  {tier === "Enterprise" && <Crown className="w-4 h-4 mr-1.5" />}
                  {tier}
                  <span className="ml-2 text-xs opacity-75">({getPackagesByTier(tier).length})</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tiers.map((tier) => (
              <TabsContent key={tier} value={tier} className="mt-0" data-testid={`tabcontent-${tier.toLowerCase()}`}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {getPackagesByTier(tier).map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                        pkg.enterprise 
                          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-yellow-500/50' 
                          : pkg.popular 
                            ? 'bg-white dark:bg-gray-800 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20' 
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                      }`}
                      data-testid={`package-card-${pkg.name.toLowerCase()}`}
                    >
                      {/* IOPS Badge */}
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${getIOPSColor(pkg.iopsValue)} text-white text-xs font-bold shadow-md`}>
                        <Gauge className="w-3 h-3 inline mr-1" />
                        {pkg.iops}
                      </div>

                      {pkg.popular && (
                        <div className="absolute -top-0 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-b-lg text-xs font-bold shadow-lg">
                            ⭐ PHỔ BIẾN
                          </div>
                        </div>
                      )}

                      {pkg.enterprise && (
                        <div className="absolute -top-0 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-b-lg text-xs font-bold shadow-lg flex items-center gap-1">
                            <Crown className="w-3 h-3" /> ENTERPRISE
                          </div>
                        </div>
                      )}

                      <div className="p-6 pt-8">
                        <div className="text-center mb-5">
                          <h3 className={`text-xl font-bold mb-2 ${pkg.enterprise ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {pkg.name}
                          </h3>
                          <div className={`text-3xl font-bold ${pkg.enterprise ? 'text-yellow-400' : 'text-cyan-500'}`}>
                            {pkg.price === "Custom" ? "Liên hệ" : `${pkg.price}đ`}
                          </div>
                          {pkg.price !== "Custom" && (
                            <div className={`text-sm ${pkg.enterprise ? 'text-gray-400' : 'text-gray-500'}`}>/tháng</div>
                          )}
                        </div>

                        <div className="space-y-3 mb-5">
                          <div className="flex items-center gap-2">
                            <HardDrive className={`w-4 h-4 flex-shrink-0 ${pkg.enterprise ? 'text-yellow-400' : 'text-cyan-500'}`} />
                            <span className={`text-sm ${pkg.enterprise ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}>
                              {pkg.storage}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Cpu className={`w-4 h-4 flex-shrink-0 ${pkg.enterprise ? 'text-yellow-400' : 'text-cyan-500'}`} />
                            <span className={`text-sm ${pkg.enterprise ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}>
                              {pkg.cpu} • {pkg.ram}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className={`w-4 h-4 flex-shrink-0 ${pkg.enterprise ? 'text-yellow-400' : 'text-cyan-500'}`} />
                            <span className={`text-sm ${pkg.enterprise ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}>
                              {pkg.websites}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Database className={`w-4 h-4 flex-shrink-0 ${pkg.enterprise ? 'text-yellow-400' : 'text-cyan-500'}`} />
                            <span className={`text-sm ${pkg.enterprise ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}>
                              {pkg.database}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <RefreshCw className={`w-4 h-4 flex-shrink-0 ${pkg.enterprise ? 'text-yellow-400' : 'text-cyan-500'}`} />
                            <span className={`text-sm ${pkg.enterprise ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}>
                              Backup: {pkg.backup}
                            </span>
                          </div>
                        </div>

                        <div className={`text-center mb-5 p-3 rounded-lg ${pkg.enterprise ? 'bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
                          <p className={`text-xs ${pkg.enterprise ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            <strong className={pkg.enterprise ? 'text-white' : 'text-gray-900 dark:text-white'}>Phù hợp:</strong> {pkg.suitable}
                          </p>
                        </div>

                        <Button 
                          className={`w-full py-5 font-semibold ${
                            pkg.enterprise 
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900'
                              : pkg.popular 
                                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg shadow-cyan-500/25'
                                : 'bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white'
                          }`}
                          data-testid={`button-select-${pkg.name.toLowerCase()}`}
                          onClick={() => window.location.href = '/contact'}
                        >
                          {pkg.enterprise ? 'Liên Hệ Tư Vấn' : 'Đăng Ký Ngay'}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Competitor Comparison Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900" data-testid="section-comparison">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
              <BarChart3 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-cyan-700 dark:text-cyan-300 text-sm font-medium">So Sánh Hiệu Năng</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="heading-comparison">
              STEP NVMe vs Competitors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Xem sự khác biệt về hiệu suất NVMe của chúng tôi
            </p>
          </motion.div>

          {/* Desktop Table */}
          <div className="hidden md:block max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="w-full" data-testid="table-comparison-desktop">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-teal-500">
                    <th className="py-4 px-6 text-left text-white font-semibold">Metric</th>
                    <th className="py-4 px-6 text-center text-white font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" />
                        STEP NVMe
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-white/80 font-semibold">Đối thủ</th>
                    <th className="py-4 px-6 text-center text-white font-semibold">Lợi thế</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((item, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      data-testid={`comparison-row-${index}`}
                    >
                      <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{item.metric}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold">
                          <CircleCheck className="w-4 h-4" />
                          {item.step}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-gray-500 dark:text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <CircleX className="w-4 h-4 text-gray-400" />
                          {item.competitor}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/40 dark:to-teal-900/40 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                          <TrendingUp className="w-3 h-3" />
                          {item.advantage}
                        </span>
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
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700"
                data-testid={`comparison-card-${index}`}
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{item.metric}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">STEP NVMe:</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm">{item.step}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Đối thủ:</span>
                    <span className="text-gray-400 text-sm">{item.competitor}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/40 dark:to-teal-900/40 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full text-xs font-medium">
                      <TrendingUp className="w-3 h-3" />
                      {item.advantage}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950" data-testid="section-testimonials">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-cyan-700 dark:text-cyan-300 text-sm font-medium">Performance Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="heading-testimonials">
              Khách Hàng Nói Về Hiệu Suất
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Những câu chuyện thành công về performance với NVMe Hosting
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                data-testid={`testimonial-card-${index}`}
              >
                {/* Performance Metric Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full text-white text-xs font-bold mb-4">
                  <TrendingUp className="w-3 h-3" />
                  {testimonial.metric}
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    <div className="text-xs text-cyan-600 dark:text-cyan-400">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Grouped by Topic */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900" data-testid="section-faq">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
              <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-cyan-700 dark:text-cyan-300 text-sm font-medium">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="heading-faq">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tìm câu trả lời cho các câu hỏi về NVMe Hosting
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue={faqCategories[0].category} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent h-auto p-0" data-testid="tabs-faq">
                {faqCategories.map((cat) => (
                  <TabsTrigger 
                    key={cat.category}
                    value={cat.category}
                    className="px-4 py-2 rounded-full font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg flex items-center gap-2"
                    data-testid={`faq-tab-${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <cat.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat.category}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqCategories.map((cat) => (
                <TabsContent key={cat.category} value={cat.category} className="mt-0" data-testid={`faq-content-${cat.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Accordion type="single" collapsible className="space-y-3">
                    {cat.faqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`faq-${faqIndex}`}
                        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden px-0"
                        data-testid={`faq-item-${cat.category.toLowerCase()}-${faqIndex}`}
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left">
                          <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 md:py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d2847 50%, #0f3460 100%)"
        }}
        data-testid="section-cta"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30 mb-6">
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Bắt Đầu Ngay</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-testid="heading-cta">
              Sẵn Sàng Nâng Cấp 
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent"> Tốc Độ Website?</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              Trải nghiệm NVMe Hosting với IOPS cao, latency thấp, và hiệu suất vượt trội. 
              14 ngày dùng thử miễn phí, hoàn tiền 100% trong 30 ngày.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-8 py-6 text-lg font-semibold shadow-lg shadow-cyan-500/25"
                data-testid="button-cta-register"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Chọn Gói NVMe Ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg"
                data-testid="button-cta-contact"
                onClick={() => window.location.href = '/contact'}
              >
                <HeadphonesIcon className="mr-2 h-5 w-5" />
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
