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
  Code,
  Database,
  TrendingUp,
  Lock,
  Gauge,
  HardDrive,
  Mail,
  Cloud,
  RefreshCw,
  FileText,
  HeadphonesIcon,
  Rocket,
  Award,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HostingWordPress() {
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [compareView, setCompareView] = useState(false);

  // 18 WordPress Hosting Packages - From Starter to Enterprise
  const packages = [
    {
      id: 1,
      name: "WP-Starter-1",
      tier: "Starter",
      price: "50.000",
      monthlyPrice: 50000,
      storage: "5 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "1 Database",
      email: "1 Email",
      domains: "1 Tên miền",
      subdomains: "Không",
      cpu: "0.5 vCore",
      ram: "512 MB",
      websites: "1 WordPress Site",
      ssl: "SSL Miễn phí",
      backup: "Hàng tuần",
      support: "Email Support",
      suitable: "Blog cá nhân nhỏ",
      color: "gray",
      features: [
        "WordPress 1-click install",
        "LiteSpeed Cache",
        "Staging Environment",
        "Cloudflare CDN"
      ]
    },
    {
      id: 2,
      name: "WP-Starter-2",
      tier: "Starter",
      price: "75.000",
      monthlyPrice: 75000,
      storage: "10 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "2 Database",
      email: "3 Email",
      domains: "1 Tên miền",
      subdomains: "5 Subdomain",
      cpu: "1 vCore",
      ram: "1 GB",
      websites: "1 WordPress Site",
      ssl: "SSL Miễn phí",
      backup: "Hàng tuần",
      support: "Email + Chat Support",
      suitable: "Blog cá nhân, Portfolio",
      color: "gray",
      features: [
        "WordPress Auto-Update",
        "LiteSpeed Cache",
        "Staging Environment",
        "Cloudflare CDN",
        "Git Integration"
      ]
    },
    {
      id: 3,
      name: "WP-Starter-3",
      tier: "Starter",
      price: "100.000",
      monthlyPrice: 100000,
      storage: "15 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "3 Database",
      email: "5 Email",
      domains: "1 Tên miền",
      subdomains: "10 Subdomain",
      cpu: "1 vCore",
      ram: "2 GB",
      websites: "2 WordPress Sites",
      ssl: "SSL Miễn phí",
      backup: "Hàng ngày",
      support: "Email + Chat + Phone",
      suitable: "Startup, Small Business",
      color: "gray",
      features: [
        "WordPress Auto-Update",
        "LiteSpeed Cache Pro",
        "Staging Environment",
        "Cloudflare CDN",
        "Git Integration",
        "WP-CLI Access"
      ]
    },
    {
      id: 4,
      name: "WP-Business-1",
      tier: "Business",
      price: "150.000",
      monthlyPrice: 150000,
      storage: "20 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "5 Database",
      email: "10 Email",
      domains: "2 Tên miền",
      subdomains: "20 Subdomain",
      cpu: "2 vCore",
      ram: "2 GB",
      websites: "3 WordPress Sites",
      ssl: "SSL Miễn phí + Wildcard",
      backup: "Hàng ngày",
      support: "Priority Support 24/7",
      suitable: "Business Website",
      color: "blue",
      popular: true,
      features: [
        "WordPress Auto-Update",
        "LiteSpeed Cache Enterprise",
        "Multiple Staging",
        "Cloudflare CDN Pro",
        "Git Integration",
        "WP-CLI Access",
        "Redis Cache",
        "Malware Scan Daily"
      ]
    },
    {
      id: 5,
      name: "WP-Business-2",
      tier: "Business",
      price: "200.000",
      monthlyPrice: 200000,
      storage: "30 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "10 Database",
      email: "20 Email",
      domains: "3 Tên miền",
      subdomains: "30 Subdomain",
      cpu: "2 vCore",
      ram: "3 GB",
      websites: "5 WordPress Sites",
      ssl: "SSL Miễn phí + Wildcard",
      backup: "Hàng ngày + On-demand",
      support: "Priority Support 24/7",
      suitable: "SME, Agency",
      color: "blue",
      features: [
        "WordPress Auto-Update",
        "LiteSpeed Cache Enterprise",
        "Multiple Staging",
        "Cloudflare CDN Pro",
        "Git Integration",
        "WP-CLI Access",
        "Redis + Memcached",
        "Malware Scan + Auto-Remove",
        "WooCommerce Optimized"
      ]
    },
    {
      id: 6,
      name: "WP-Business-3",
      tier: "Business",
      price: "250.000",
      monthlyPrice: 250000,
      storage: "40 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "15 Database",
      email: "30 Email",
      domains: "5 Tên miền",
      subdomains: "50 Subdomain",
      cpu: "3 vCore",
      ram: "4 GB",
      websites: "10 WordPress Sites",
      ssl: "SSL Miễn phí + Wildcard",
      backup: "Hàng ngày + On-demand + 30 days retention",
      support: "Dedicated Support 24/7",
      suitable: "Digital Agency, Multi-sites",
      color: "blue",
      features: [
        "WordPress Multisite Support",
        "LiteSpeed Cache Enterprise",
        "Multiple Staging",
        "Cloudflare CDN Enterprise",
        "Git Integration",
        "WP-CLI + SSH Access",
        "Redis + Memcached",
        "Malware Scan + Auto-Remove",
        "WooCommerce + Plugin Support",
        "Free Migration (up to 10 sites)"
      ]
    },
    {
      id: 7,
      name: "WP-Professional-1",
      tier: "Professional",
      price: "300.000",
      monthlyPrice: 300000,
      storage: "50 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "20 Database",
      email: "50 Email",
      domains: "10 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "3 vCore",
      ram: "6 GB",
      websites: "15 WordPress Sites",
      ssl: "SSL Miễn phí + EV SSL",
      backup: "Real-time + 60 days retention",
      support: "Dedicated Support + SLA 99.9%",
      suitable: "Professional Developer, Large Agency",
      color: "green",
      features: [
        "WordPress Multisite Support",
        "LiteSpeed Cache Enterprise",
        "Unlimited Staging",
        "Cloudflare CDN Enterprise",
        "Git + SVN Integration",
        "Full SSH + Root Access",
        "Redis + Memcached + Varnish",
        "Advanced Malware Protection",
        "WooCommerce Optimization",
        "Free Migration (unlimited)",
        "Performance Monitoring",
        "Custom PHP Versions"
      ]
    },
    {
      id: 8,
      name: "WP-Professional-2",
      tier: "Professional",
      price: "400.000",
      monthlyPrice: 400000,
      storage: "75 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "30 Database",
      email: "100 Email",
      domains: "15 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "4 vCore",
      ram: "8 GB",
      websites: "25 WordPress Sites",
      ssl: "SSL Miễn phí + EV SSL",
      backup: "Real-time + 90 days retention",
      support: "Dedicated Support + SLA 99.95%",
      suitable: "High-traffic Websites",
      color: "green",
      features: [
        "WordPress Multisite + Multi-network",
        "LiteSpeed Cache Enterprise Pro",
        "Unlimited Staging",
        "Cloudflare CDN + DDoS Protection",
        "Git + SVN + CI/CD Pipeline",
        "Full SSH + Root Access",
        "Redis + Memcached + Varnish",
        "AI-powered Security",
        "WooCommerce + Advanced E-commerce",
        "White-label Migration Service",
        "24/7 Performance Monitoring",
        "Custom PHP + Node.js Support",
        "Load Balancer Ready"
      ]
    },
    {
      id: 9,
      name: "WP-Professional-3",
      tier: "Professional",
      price: "500.000",
      monthlyPrice: 500000,
      storage: "100 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "50 Database",
      email: "Không giới hạn",
      domains: "20 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "4 vCore",
      ram: "12 GB",
      websites: "50 WordPress Sites",
      ssl: "SSL Miễn phí + EV SSL + Custom",
      backup: "Real-time + 180 days retention",
      support: "Premium Support + SLA 99.99%",
      suitable: "Enterprise Development Teams",
      color: "green",
      features: [
        "Enterprise WordPress Multisite",
        "LiteSpeed Cache Enterprise Pro",
        "Unlimited Staging + Production Clone",
        "Cloudflare CDN + Advanced DDoS",
        "Full DevOps Suite",
        "Full SSH + Root + Docker Access",
        "Complete Cache Stack",
        "AI Security + Threat Intelligence",
        "E-commerce Suite",
        "Managed Migration + Optimization",
        "Advanced Analytics Dashboard",
        "Multi-language PHP + Runtime Support",
        "Auto-scaling Ready",
        "Priority Feature Requests"
      ]
    },
    {
      id: 10,
      name: "WP-Advanced-1",
      tier: "Advanced",
      price: "600.000",
      monthlyPrice: 600000,
      storage: "150 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "30 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "6 vCore",
      ram: "16 GB",
      websites: "75 WordPress Sites",
      ssl: "Enterprise SSL Suite",
      backup: "Real-time + Custom retention",
      support: "Premium Support + SLA 99.99%",
      suitable: "Large Organizations",
      color: "purple",
      features: [
        "Enterprise WordPress Infrastructure",
        "Custom Cache Solutions",
        "Advanced DevOps Tools",
        "Enterprise CDN + Security",
        "Complete CI/CD Integration",
        "Containerized Environments",
        "Enterprise Cache Layer",
        "AI-driven Security Operations",
        "Full E-commerce Platform",
        "White-label Services",
        "Custom Analytics + BI Integration",
        "Multi-runtime Support",
        "Kubernetes Integration",
        "Dedicated Account Manager"
      ]
    },
    {
      id: 11,
      name: "WP-Advanced-2",
      tier: "Advanced",
      price: "750.000",
      monthlyPrice: 750000,
      storage: "200 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "50 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "8 vCore",
      ram: "24 GB",
      websites: "100 WordPress Sites",
      ssl: "Enterprise SSL Suite",
      backup: "Real-time + Custom retention + Geo-redundant",
      support: "VIP Support + SLA 99.99%",
      suitable: "Enterprise Multi-brand",
      color: "purple",
      features: [
        "Multi-datacenter WordPress",
        "Custom Performance Stack",
        "Enterprise DevOps Suite",
        "Global CDN + WAF",
        "Advanced Automation",
        "Multi-cloud Containers",
        "Distributed Cache System",
        "Security Operations Center",
        "Omnichannel E-commerce",
        "Fully Managed Services",
        "Business Intelligence Suite",
        "Complete Runtime Flexibility",
        "Auto-scaling Infrastructure",
        "Strategic Technology Consulting"
      ]
    },
    {
      id: 12,
      name: "WP-Advanced-3",
      tier: "Advanced",
      price: "900.000",
      monthlyPrice: 900000,
      storage: "300 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "100 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "12 vCore",
      ram: "32 GB",
      websites: "150 WordPress Sites",
      ssl: "Enterprise SSL Suite + Custom CA",
      backup: "Real-time + Multi-region + Point-in-time recovery",
      support: "VIP Support + SLA 99.995%",
      suitable: "Large Enterprises, SaaS Platforms",
      color: "purple",
      features: [
        "Global WordPress Network",
        "Hyper-optimized Performance",
        "Complete Automation Platform",
        "Enterprise Security Suite",
        "Full Infrastructure as Code",
        "Kubernetes + Service Mesh",
        "Intelligent Caching + Edge Computing",
        "24/7 Security Operations",
        "Enterprise Commerce Platform",
        "Concierge-level Management",
        "Predictive Analytics + AI",
        "Complete Technology Stack",
        "Global Auto-scaling",
        "C-level Technology Advisory"
      ]
    },
    {
      id: 13,
      name: "WP-Enterprise-1",
      tier: "Enterprise",
      price: "1.100.000",
      monthlyPrice: 1100000,
      storage: "500 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "16 vCore",
      ram: "48 GB",
      websites: "250 WordPress Sites",
      ssl: "Custom Enterprise SSL",
      backup: "Multi-region real-time + Instant recovery",
      support: "White-glove Support + SLA 99.999%",
      suitable: "Fortune 500, Government",
      color: "red",
      features: [
        "Mission-critical WordPress Infrastructure",
        "Custom-engineered Performance",
        "Enterprise Automation + Orchestration",
        "Military-grade Security",
        "Infrastructure as Code + GitOps",
        "Private Kubernetes Cluster",
        "Edge Computing + AI Cache",
        "SOC 2 Compliant Operations",
        "Headless Commerce Ready",
        "24/7 Dedicated Team",
        "Enterprise Data Platform",
        "Custom Technology Integration",
        "Multi-region Active-active",
        "Executive Technology Partnership"
      ]
    },
    {
      id: 14,
      name: "WP-Enterprise-2",
      tier: "Enterprise",
      price: "1.300.000",
      monthlyPrice: 1300000,
      storage: "750 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "20 vCore",
      ram: "64 GB",
      websites: "500 WordPress Sites",
      ssl: "Custom Enterprise SSL + HSM",
      backup: "Continuous + Cross-region + Time-travel",
      support: "White-glove Support + SLA 99.999%",
      suitable: "Global Enterprises",
      color: "red",
      features: [
        "Global-scale WordPress Platform",
        "AI-optimized Performance",
        "Zero-touch Operations",
        "Defense-grade Security + Compliance",
        "Complete Platform Engineering",
        "Dedicated Kubernetes Infrastructure",
        "Intelligent Edge Network",
        "Compliance Center (SOC2, HIPAA, PCI-DSS)",
        "Enterprise Headless + API Platform",
        "Named Support Engineers",
        "Big Data Analytics Platform",
        "Bespoke Integration Services",
        "Active-active Multi-cloud",
        "Board-level Technology Advisory"
      ]
    },
    {
      id: 15,
      name: "WP-Enterprise-3",
      tier: "Enterprise",
      price: "1.500.000",
      monthlyPrice: 1500000,
      storage: "1 TB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "24 vCore",
      ram: "96 GB",
      websites: "1000 WordPress Sites",
      ssl: "Custom Enterprise SSL + HSM + Certificate Authority",
      backup: "Continuous + Global + Instant point-in-time",
      support: "Concierge Support + SLA 99.999% + On-site",
      suitable: "Multinational Corporations",
      color: "red",
      features: [
        "Hyperscale WordPress Infrastructure",
        "Quantum-ready Performance Architecture",
        "Autonomous Operations + Self-healing",
        "Zero-trust Security Model",
        "Cloud-native Platform Engineering",
        "Multi-cloud Kubernetes Federation",
        "AI-powered Global Edge",
        "Full Regulatory Compliance Suite",
        "API-first Composable Commerce",
        "Dedicated Solutions Architects",
        "Real-time Data Science Platform",
        "Strategic Technology Roadmapping",
        "Multi-cloud Disaster Recovery",
        "Technology Innovation Partnership"
      ]
    },
    {
      id: 16,
      name: "WP-Enterprise-4",
      tier: "Enterprise",
      price: "1.750.000",
      monthlyPrice: 1750000,
      storage: "1.5 TB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "32 vCore",
      ram: "128 GB",
      websites: "Không giới hạn",
      ssl: "Fully Managed PKI Infrastructure",
      backup: "Continuous + Global + Blockchain-verified",
      support: "Concierge Support + On-demand On-site",
      suitable: "Global Digital Platforms",
      color: "red",
      features: [
        "Planet-scale WordPress Ecosystem",
        "Next-gen Performance Engineering",
        "AI-driven Autonomous Infrastructure",
        "Cybersecurity Operations Platform",
        "Platform Engineering Excellence",
        "Private Multi-cloud Infrastructure",
        "Quantum-ready Edge Computing",
        "Industry-specific Compliance",
        "Composable DXP Platform",
        "Executive Support Team",
        "ML/AI Analytics Infrastructure",
        "Digital Transformation Consulting",
        "Business Continuity Architecture",
        "Innovation Lab Partnership"
      ]
    },
    {
      id: 17,
      name: "WP-Enterprise-5",
      tier: "Enterprise",
      price: "2.000.000",
      monthlyPrice: 2000000,
      storage: "2 TB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "48 vCore",
      ram: "192 GB",
      websites: "Không giới hạn",
      ssl: "Managed PKI + Custom CA + Quantum-safe",
      backup: "Immutable + Global + Instant recovery anywhere",
      support: "24/7 War Room + On-site Team",
      suitable: "Global Tech Giants",
      color: "red",
      features: [
        "Unlimited WordPress Universe",
        "Hyper-converged Infrastructure",
        "Self-optimizing AI Platform",
        "Threat Intelligence + SOC",
        "DevSecOps Center of Excellence",
        "Sovereign Cloud Options",
        "5G/Edge + Distributed Computing",
        "Multi-jurisdiction Compliance",
        "Enterprise DXP + Microservices",
        "C-suite Direct Support",
        "Data Science + AI/ML Lab",
        "Technology Vision + Strategy",
        "Chaos Engineering + Resilience",
        "Co-innovation Program"
      ]
    },
    {
      id: 18,
      name: "WP-Enterprise-6",
      tier: "Enterprise",
      price: "Liên hệ",
      monthlyPrice: 0,
      storage: "Custom (Multi-PB)",
      bandwidth: "Không giới hạn + Dedicated",
      database: "Không giới hạn + Custom clusters",
      email: "Không giới hạn + Custom infrastructure",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "Custom (100+ vCore)",
      ram: "Custom (500GB+)",
      websites: "Không giới hạn",
      ssl: "Custom PKI Infrastructure",
      backup: "Custom architecture + Regulatory compliance",
      support: "Dedicated Engineering Team",
      suitable: "Custom Enterprise Solutions",
      color: "red",
      best: true,
      features: [
        "Bespoke WordPress Architecture",
        "Custom-designed Infrastructure",
        "AI/ML Platform Engineering",
        "Custom Security Framework",
        "Dedicated Platform Team",
        "Private Infrastructure",
        "Custom Edge + CDN Network",
        "Bespoke Compliance Solutions",
        "Custom Technology Stack",
        "Dedicated CTO-level Advisory",
        "Private Research Partnership",
        "Strategic Technology Alliance",
        "Custom Disaster Recovery",
        "Long-term Innovation Partnership"
      ]
    }
  ];

  const displayedPackages = showAllPackages ? packages : packages.slice(0, 6);

  const technicalFeatures = [
    {
      icon: Rocket,
      title: "LiteSpeed Web Server",
      description: "Web server thế hệ mới với tốc độ nhanh hơn Apache/Nginx 40-50%, tiết kiệm tài nguyên và tối ưu đặc biệt cho WordPress."
    },
    {
      icon: Zap,
      title: "LiteSpeed Cache",
      description: "Cache plugin mạnh mẽ nhất cho WordPress, tích hợp sẵn với LSCache, giúp website tải dưới 1 giây."
    },
    {
      icon: Shield,
      title: "CloudLinux OS",
      description: "Hệ điều hành chuyên dụng cho shared hosting, cô lập tài nguyên giữa các tài khoản, đảm bảo ổn định tuyệt đối."
    },
    {
      icon: Lock,
      title: "Imunify360",
      description: "Hệ thống bảo mật AI-powered tự động phát hiện và chặn malware, virus, backdoor, brute-force attacks."
    },
    {
      icon: Database,
      title: "MariaDB 10.6+",
      description: "Database hiệu năng cao, tương thích 100% với MySQL, tối ưu cho WordPress và WooCommerce."
    },
    {
      icon: Code,
      title: "PHP 7.4 - 8.3",
      description: "Hỗ trợ đa phiên bản PHP, cho phép chọn phiên bản phù hợp với theme/plugin, dễ dàng nâng cấp."
    },
    {
      icon: Globe,
      title: "Cloudflare CDN",
      description: "Mạng CDN toàn cầu với 300+ PoP, tăng tốc độ tải trang, giảm băng thông, chống DDoS miễn phí."
    },
    {
      icon: HardDrive,
      title: "NVMe SSD Storage",
      description: "Ổ cứng NVMe SSD tốc độ cao gấp 6 lần SSD thường, đọc/ghi 3000MB/s, lý tưởng cho database lớn."
    },
    {
      icon: RefreshCw,
      title: "JetBackup",
      description: "Sao lưu tự động hàng ngày, lưu trữ đến 30 bản, khôi phục 1-click, bảo vệ dữ liệu tuyệt đối."
    },
    {
      icon: Mail,
      title: "Email Hosting",
      description: "Email chuyên nghiệp @tendomain.com, webmail Roundcube, chống spam SpamExperts, IMAP/POP3/SMTP."
    },
    {
      icon: FileText,
      title: "Softaculous",
      description: "Cài đặt WordPress 1-click, tự động update, staging, clone site, quản lý backup dễ dàng."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Hỗ trợ kỹ thuật WordPress 24/7 qua Ticket, Live Chat, Phone, trung bình phản hồi < 15 phút."
    }
  ];

  const testimonials = [
    {
      text: "Hosting WordPress của STEP đã giúp website của tôi tăng tốc gấp 3 lần. Load time từ 4 giây xuống còn 1.2 giây. Khách hàng rất hài lòng!",
      author: "Anh Minh Tuấn",
      role: "Founder, MinhTuan.Blog",
      rating: 5
    },
    {
      text: "Tôi quản lý 25+ website WordPress cho khách hàng trên gói WP-Business-3. Ổn định tuyệt đối, chưa bao giờ downtime, support team rất pro.",
      author: "Chị Hương Giang",
      role: "Web Developer Freelancer",
      rating: 5
    },
    {
      text: "Di chuyển 8 WordPress sites từ host cũ sang STEP, team support hỗ trợ miễn phí và rất tận tình. Giá rẻ mà quality enterprise-level!",
      author: "Anh Đức Anh",
      role: "Digital Marketing Agency Owner",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "WordPress Hosting khác gì với Web Hosting thông thường?",
      answer: "WordPress Hosting được tối ưu hóa đặc biệt cho WordPress với LiteSpeed Web Server, LSCache plugin, PHP OPcache, object caching (Redis/Memcached), database optimization, và bảo mật WordPress-specific. Thông thường sẽ nhanh hơn 3-5 lần so với hosting thường."
    },
    {
      question: "Tôi có thể cài đặt bao nhiêu website WordPress?",
      answer: "Tùy theo gói bạn chọn. Gói Starter cho phép 1-2 sites, Business 3-10 sites, Professional 15-50 sites, Advanced 75-150 sites, Enterprise không giới hạn. Mỗi website sẽ có database riêng biệt."
    },
    {
      question: "STEP có hỗ trợ di chuyển website từ hosting cũ không?",
      answer: "Có, chúng tôi hỗ trợ di chuyển miễn phí cho tất cả gói. Team kỹ thuật sẽ migrate toàn bộ files, database, email, thiết lập lại DNS và đảm bảo website hoạt động 100% trước khi cutover. Thời gian di chuyển 24-48h."
    },
    {
      question: "Tôi có thể nâng cấp/hạ cấp gói bất cứ lúc nào?",
      answer: "Có, bạn có thể upgrade/downgrade gói bất kỳ lúc nào. Upgrade có hiệu lực ngay lập tức, downgrade có hiệu lực từ chu kỳ thanh toán tiếp theo. Phí chênh lệch sẽ được tính theo ngày sử dụng (pro-rated)."
    },
    {
      question: "Chính sách backup như thế nào?",
      answer: "Tất cả gói đều có backup tự động. Starter: backup hàng tuần, lưu 7 ngày. Business: backup hàng ngày, lưu 30 ngày. Professional: real-time backup, lưu 60-180 ngày. Enterprise: continuous backup với point-in-time recovery. Bạn có thể tự khôi phục qua cPanel."
    },
    {
      question: "Hosting có hỗ trợ WooCommerce không?",
      answer: "Có, tất cả gói WordPress Hosting đều hỗ trợ WooCommerce. Gói Business trở lên được tối ưu đặc biệt cho WooCommerce với object caching, database optimization, CDN cho images, và hỗ trợ payment gateway."
    },
    {
      question: "Tôi có quyền truy cập SSH/FTP không?",
      answer: "Gói Starter: chỉ FTP. Gói Business: FTP + SFTP. Gói Professional trở lên: Full SSH access, WP-CLI, Git, Composer. Enterprise: Root access, Docker, Kubernetes tùy nhu cầu."
    },
    {
      question: "Server đặt ở đâu? Tốc độ với người dùng Việt Nam ra sao?",
      answer: "Server đặt tại datacenter Tier 3 ở Hà Nội và TP.HCM, kết nối trực tiếp với VNIX, FPT, Viettel, VNPT. Tốc độ ping từ Việt Nam < 5ms. Tích hợp Cloudflare CDN giúp tăng tốc toàn cầu."
    },
    {
      question: "Có giới hạn băng thông hay traffic không?",
      answer: "Tất cả gói đều KHÔNG giới hạn băng thông (unmetered bandwidth). Tuy nhiên, nếu website sử dụng quá nhiều tài nguyên CPU/RAM ảnh hưởng đến server, chúng tôi sẽ liên hệ để tư vấn upgrade hoặc chuyển sang VPS/Cloud Server."
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer: "Chúng tôi có chính sách hoàn tiền 30 ngày. Nếu không hài lòng với dịch vụ trong 30 ngày đầu, bạn có thể yêu cầu hoàn tiền 100% (trừ phí tên miền nếu có). Không cần lý do, không câu hỏi thêm."
    },
    {
      question: "STEP có hỗ trợ WordPress Multisite không?",
      answer: "Có, gói Business-3 trở lên hỗ trợ WordPress Multisite (network of sites). Professional và Enterprise hỗ trợ cả Multi-network với subdomain/subdirectory/mapped domains, phù hợp cho agency quản lý nhiều sites."
    },
    {
      question: "Tôi cần bao nhiêu tài nguyên cho website WordPress?",
      answer: "Blog nhỏ: Starter-1 (0.5 vCore, 512MB RAM). Blog trung bình: Starter-3 (1 vCore, 2GB). Business site: Business-1 (2 vCore, 2GB). WooCommerce: Business-2+ (2 vCore, 3GB+). High-traffic: Professional+ (3+ vCore, 6GB+). Chúng tôi sẵn sàng tư vấn miễn phí."
    }
  ];

  const comparisonPoints = [
    { feature: "Tốc độ load trang", step: "< 1s với LSCache", competitor: "2-4s", icon: Zap },
    { feature: "Uptime SLA", step: "99.99% - 99.999%", competitor: "99.9%", icon: Server },
    { feature: "Bảo mật", step: "Imunify360 AI + WAF", competitor: "Basic Firewall", icon: Shield },
    { feature: "Support", step: "24/7 WordPress Expert", competitor: "Email only", icon: HeadphonesIcon },
    { feature: "Backup", step: "Hàng ngày + JetBackup", competitor: "Hàng tuần", icon: Database },
    { feature: "Migration", step: "Miễn phí unlimited", competitor: "Phí $50-100", icon: RefreshCw },
    { feature: "PHP Version", step: "7.4 - 8.3 Multi-version", competitor: "Single version", icon: Code },
    { feature: "CDN", step: "Cloudflare Enterprise", competitor: "Basic hoặc không có", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">WordPress Hosting #1 Việt Nam</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Hosting WordPress Siêu Tốc
                <br />
                <span className="text-yellow-300">Tải Trang Dưới 1 Giây</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                LiteSpeed + LSCache + NVMe SSD + Cloudflare CDN. 
                Tối ưu 100% cho WordPress. Uptime 99.99%. 
                Bảo mật AI-powered. Support 24/7 bởi WordPress experts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl"
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-view-packages"
                >
                  Xem 18 Gói Hosting WordPress
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                  onClick={() => window.location.href = '/contact'}
                  data-testid="button-contact"
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300 mb-1">&lt; 1s</div>
                  <div className="text-sm text-blue-100">Load Time</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300 mb-1">99.99%</div>
                  <div className="text-sm text-blue-100">Uptime</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300 mb-1">24/7</div>
                  <div className="text-sm text-blue-100">Support</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300 mb-1">18</div>
                  <div className="text-sm text-blue-100">Gói lựa chọn</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Công Nghệ & Tính Năng Vượt Trội
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              WordPress Hosting của STEP được xây dựng trên nền tảng công nghệ hàng đầu thế giới
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
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              18 Gói WordPress Hosting Từ Nhỏ Đến Lớn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Từ blog cá nhân đến enterprise platform. Từ 50K/tháng đến giải pháp tùy biến.
            </p>

            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={!compareView ? "default" : "outline"}
                onClick={() => setCompareView(false)}
                className={!compareView ? "bg-blue-600" : ""}
                data-testid="button-grid-view"
              >
                <Server className="w-4 h-4 mr-2" />
                Xem Dạng Thẻ
              </Button>
              <Button
                variant={compareView ? "default" : "outline"}
                onClick={() => setCompareView(true)}
                className={compareView ? "bg-blue-600" : ""}
                data-testid="button-compare-view"
              >
                <FileText className="w-4 h-4 mr-2" />
                So Sánh Chi Tiết
              </Button>
            </div>
          </motion.div>

          {!compareView ? (
            <>
              {/* Grid View */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayedPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 relative ${
                      pkg.popular ? 'border-blue-500 scale-105' : pkg.best ? 'border-red-500 scale-105' : 'border-gray-200'
                    }`}
                    data-testid={`package-${pkg.id}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          ⭐ Phổ Biến Nhất
                        </span>
                      </div>
                    )}
                    {pkg.best && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          👑 Enterprise
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="text-sm font-semibold text-blue-600 mb-2">{pkg.tier}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-blue-600">{pkg.price}</span>
                        {pkg.price !== "Liên hệ" && <span className="text-gray-500 mb-1">₫/tháng</span>}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm">
                        <HardDrive className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{pkg.storage}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Gauge className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{pkg.cpu} | {pkg.ram} RAM</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Globe className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{pkg.websites}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Database className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{pkg.database}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Lock className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{pkg.ssl}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <p className="text-xs text-gray-500 mb-2 font-semibold">Phù hợp cho:</p>
                      <p className="text-sm text-gray-700 font-medium">{pkg.suitable}</p>
                    </div>

                    <Button
                      className={`w-full ${
                        pkg.best 
                          ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                          : pkg.popular 
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-800 hover:bg-gray-900'
                      } text-white py-6`}
                      onClick={() => window.location.href = '/contact'}
                      data-testid={`button-select-${pkg.id}`}
                    >
                      Chọn Gói {pkg.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              {!showAllPackages && (
                <div className="text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowAllPackages(true)}
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6"
                    data-testid="button-show-all"
                  >
                    Xem Thêm {packages.length - 6} Gói Còn Lại
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {showAllPackages && (
                <div className="text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setShowAllPackages(false);
                      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="border-2 border-gray-400 text-gray-600 hover:bg-gray-50 px-8 py-6"
                    data-testid="button-show-less"
                  >
                    Thu Gọn
                    <ChevronUp className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Comparison Table View */
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-xl rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <th className="p-4 text-left font-bold sticky left-0 bg-blue-600 z-10">Tính năng</th>
                    {packages.map(pkg => (
                      <th key={pkg.id} className="p-4 text-center font-bold min-w-[180px]">
                        <div>{pkg.name}</div>
                        <div className="text-yellow-300 text-lg mt-1">{pkg.price}{pkg.price !== "Liên hệ" && "₫"}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10">💾 Dung lượng</td>
                    {packages.map(pkg => <td key={pkg.id} className="p-4 text-center text-sm">{pkg.storage}</td>)}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10">⚡ CPU / RAM</td>
                    {packages.map(pkg => <td key={pkg.id} className="p-4 text-center text-sm">{pkg.cpu} / {pkg.ram}</td>)}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10">🌐 Websites</td>
                    {packages.map(pkg => <td key={pkg.id} className="p-4 text-center text-sm">{pkg.websites}</td>)}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10">🗄️ Database</td>
                    {packages.map(pkg => <td key={pkg.id} className="p-4 text-center text-sm">{pkg.database}</td>)}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10">📧 Email</td>
                    {packages.map(pkg => <td key={pkg.id} className="p-4 text-center text-sm">{pkg.email}</td>)}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10">🔐 SSL</td>
                    {packages.map(pkg => <td key={pkg.id} className="p-4 text-center text-sm">{pkg.ssl}</td>)}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10">💾 Backup</td>
                    {packages.map(pkg => <td key={pkg.id} className="p-4 text-center text-sm">{pkg.backup}</td>)}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10">🎯 Support</td>
                    {packages.map(pkg => <td key={pkg.id} className="p-4 text-center text-sm">{pkg.support}</td>)}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-gray-50 z-10"></td>
                    {packages.map(pkg => (
                      <td key={pkg.id} className="p-4 text-center">
                        <Button
                          size="sm"
                          className={pkg.best ? 'bg-red-600 hover:bg-red-700' : pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'}
                          onClick={() => window.location.href = '/contact'}
                        >
                          Chọn Gói
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Comparison with Competitors */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              So Sánh STEP vs Đối Thủ
            </h2>
            <p className="text-xl text-gray-600">
              Tại sao STEP WordPress Hosting vượt trội hơn?
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {comparisonPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <point.icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-3">{point.feature}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm"><strong>STEP:</strong> {point.step}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-500"><strong>Khác:</strong> {point.competitor}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Khách Hàng Nói Gì Về STEP?
            </h2>
            <p className="text-xl text-gray-600">
              Hơn 5,000+ website WordPress tin dùng
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
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-xl text-gray-600">
              Giải đáp mọi thắc mắc về WordPress Hosting
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 px-6"
                  data-testid={`faq-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sẵn Sàng Tăng Tốc WordPress Của Bạn?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              🎁 Ưu đãi đặc biệt: Giảm 30% tháng đầu + Migration miễn phí + Tư vấn 1-1
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl"
                onClick={() => window.location.href = '/contact'}
                data-testid="button-cta-contact"
              >
                Đăng Ký Ngay - Nhận Ưu Đãi 30%
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-cta-packages"
              >
                Xem Lại Bảng Giá
              </Button>
            </div>

            <p className="text-sm text-blue-200 mt-8">
              ✅ Cam kết hoàn tiền 30 ngày • ✅ Không cần thẻ tín dụng • ✅ Setup trong 24h
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
