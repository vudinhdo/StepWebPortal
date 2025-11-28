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
  X,
  ShoppingCart,
  Layers,
  Copy,
  Settings,
  Eye,
  Activity
} from "lucide-react";
import { SiWordpress } from "react-icons/si";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const WP_BLUE = "#21759b";
const WP_BLUE_LIGHT = "#21759b15";
const WP_BLUE_DARK = "#1a5f7d";

export default function HostingWordPress() {
  const [activeTab, setActiveTab] = useState("all");
  const [compareView, setCompareView] = useState(false);
  const [activeFaqCategory, setActiveFaqCategory] = useState("all");

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
      badges: [],
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
      badges: [],
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
      badges: [],
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
      badges: ["woocommerce"],
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
      badges: ["woocommerce"],
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
      badges: ["woocommerce", "multisite"],
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
      badges: ["woocommerce", "multisite"],
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
      badges: ["woocommerce", "multisite", "hightraffic"],
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
      badges: ["woocommerce", "multisite", "hightraffic"],
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
      badges: ["woocommerce", "multisite", "hightraffic", "enterprise"],
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
      badges: ["woocommerce", "multisite", "hightraffic", "enterprise"],
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
      badges: ["woocommerce", "multisite", "hightraffic", "enterprise"],
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
      badges: ["woocommerce", "multisite", "hightraffic", "enterprise", "dedicated"],
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
      badges: ["woocommerce", "multisite", "hightraffic", "enterprise", "dedicated"],
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
      badges: ["woocommerce", "multisite", "hightraffic", "enterprise", "dedicated"],
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
      badges: ["woocommerce", "multisite", "hightraffic", "enterprise", "dedicated"],
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
      badges: ["woocommerce", "multisite", "hightraffic", "enterprise", "dedicated"],
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
      badges: ["woocommerce", "multisite", "hightraffic", "enterprise", "dedicated", "custom"],
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

  const tiers = ["all", "Starter", "Business", "Professional", "Advanced", "Enterprise"];

  const getFilteredPackages = () => {
    if (activeTab === "all") {
      return packages.slice(0, 6);
    }
    return packages.filter(pkg => pkg.tier === activeTab);
  };

  const featureCategories = [
    {
      id: "performance",
      title: "Hiệu Suất & Tốc Độ",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      features: [
        {
          icon: Rocket,
          title: "LiteSpeed Web Server",
          description: "Web server thế hệ mới với tốc độ nhanh hơn Apache/Nginx 40-50%, tiết kiệm tài nguyên và tối ưu đặc biệt cho WordPress.",
          wpOptimized: true
        },
        {
          icon: Zap,
          title: "LiteSpeed Cache",
          description: "Cache plugin mạnh mẽ nhất cho WordPress, tích hợp sẵn với LSCache, giúp website tải dưới 1 giây.",
          wpOptimized: true
        },
        {
          icon: HardDrive,
          title: "NVMe SSD Storage",
          description: "Ổ cứng NVMe SSD tốc độ cao gấp 6 lần SSD thường, đọc/ghi 3000MB/s, lý tưởng cho database lớn.",
          wpOptimized: false
        },
        {
          icon: Globe,
          title: "Cloudflare CDN",
          description: "Mạng CDN toàn cầu với 300+ PoP, tăng tốc độ tải trang, giảm băng thông, chống DDoS miễn phí.",
          wpOptimized: false
        }
      ]
    },
    {
      id: "security",
      title: "Bảo Mật & An Toàn",
      icon: Shield,
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      features: [
        {
          icon: Lock,
          title: "Imunify360",
          description: "Hệ thống bảo mật AI-powered tự động phát hiện và chặn malware, virus, backdoor, brute-force attacks.",
          wpOptimized: true
        },
        {
          icon: Shield,
          title: "CloudLinux OS",
          description: "Hệ điều hành chuyên dụng cho shared hosting, cô lập tài nguyên giữa các tài khoản, đảm bảo ổn định tuyệt đối.",
          wpOptimized: false
        },
        {
          icon: RefreshCw,
          title: "JetBackup",
          description: "Sao lưu tự động hàng ngày, lưu trữ đến 30 bản, khôi phục 1-click, bảo vệ dữ liệu tuyệt đối.",
          wpOptimized: true
        }
      ]
    },
    {
      id: "development",
      title: "Staging & Development",
      icon: Code,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      features: [
        {
          icon: Copy,
          title: "Staging Environment",
          description: "Môi trường staging 1-click để test thay đổi trước khi đưa lên production, giảm rủi ro downtime.",
          wpOptimized: true
        },
        {
          icon: Code,
          title: "PHP 7.4 - 8.3",
          description: "Hỗ trợ đa phiên bản PHP, cho phép chọn phiên bản phù hợp với theme/plugin, dễ dàng nâng cấp.",
          wpOptimized: true
        },
        {
          icon: FileText,
          title: "Softaculous",
          description: "Cài đặt WordPress 1-click, tự động update, staging, clone site, quản lý backup dễ dàng.",
          wpOptimized: true
        }
      ]
    },
    {
      id: "database",
      title: "Database & Email",
      icon: Database,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      features: [
        {
          icon: Database,
          title: "MariaDB 10.6+",
          description: "Database hiệu năng cao, tương thích 100% với MySQL, tối ưu cho WordPress và WooCommerce.",
          wpOptimized: true
        },
        {
          icon: Mail,
          title: "Email Hosting",
          description: "Email chuyên nghiệp @tendomain.com, webmail Roundcube, chống spam SpamExperts, IMAP/POP3/SMTP.",
          wpOptimized: false
        },
        {
          icon: HeadphonesIcon,
          title: "24/7 Support",
          description: "Hỗ trợ kỹ thuật WordPress 24/7 qua Ticket, Live Chat, Phone, trung bình phản hồi < 15 phút.",
          wpOptimized: true
        }
      ]
    }
  ];

  const testimonials = [
    {
      text: "Hosting WordPress của STEP đã giúp website của tôi tăng tốc gấp 3 lần. Load time từ 4 giây xuống còn 1.2 giây. Khách hàng rất hài lòng!",
      author: "Anh Minh Tuấn",
      role: "Founder, MinhTuan.Blog",
      rating: 5,
      type: "blogger",
      avatar: "MT"
    },
    {
      text: "Tôi quản lý 25+ website WordPress cho khách hàng trên gói WP-Business-3. Ổn định tuyệt đối, chưa bao giờ downtime, support team rất pro.",
      author: "Chị Hương Giang",
      role: "Web Developer Freelancer",
      rating: 5,
      type: "developer",
      avatar: "HG"
    },
    {
      text: "Di chuyển 8 WordPress sites từ host cũ sang STEP, team support hỗ trợ miễn phí và rất tận tình. Giá rẻ mà quality enterprise-level!",
      author: "Anh Đức Anh",
      role: "Digital Marketing Agency Owner",
      rating: 5,
      type: "agency",
      avatar: "DA"
    },
    {
      text: "WooCommerce store với hàng nghìn sản phẩm chạy mượt mà trên gói Professional. Checkout speed cải thiện 60%, bounce rate giảm đáng kể.",
      author: "Chị Thanh Hà",
      role: "E-commerce Business Owner",
      rating: 5,
      type: "ecommerce",
      avatar: "TH"
    },
    {
      text: "Staging environment giúp tôi test mọi thay đổi trước khi deploy. Không còn lo lắng về lỗi trên production nữa. Professional approach!",
      author: "Anh Quốc Việt",
      role: "WordPress Developer",
      rating: 5,
      type: "developer",
      avatar: "QV"
    },
    {
      text: "Multisite network với 15 sites chạy hoàn hảo. Auto-scaling khi traffic tăng đột biến. Enterprise grade mà giá SME friendly.",
      author: "Anh Hoàng Nam",
      role: "Media Network Manager",
      rating: 5,
      type: "enterprise",
      avatar: "HN"
    }
  ];

  const faqCategories = [
    { id: "all", label: "Tất cả", icon: FileText },
    { id: "performance", label: "Hiệu suất", icon: Zap },
    { id: "security", label: "Bảo mật", icon: Shield },
    { id: "migration", label: "Di chuyển", icon: RefreshCw },
    { id: "ecommerce", label: "WooCommerce", icon: ShoppingCart },
    { id: "general", label: "Chung", icon: Settings }
  ];

  const faqs = [
    {
      category: "performance",
      question: "WordPress Hosting khác gì với Web Hosting thông thường?",
      answer: "WordPress Hosting được tối ưu hóa đặc biệt cho WordPress với LiteSpeed Web Server, LSCache plugin, PHP OPcache, object caching (Redis/Memcached), database optimization, và bảo mật WordPress-specific. Thông thường sẽ nhanh hơn 3-5 lần so với hosting thường."
    },
    {
      category: "general",
      question: "Tôi có thể cài đặt bao nhiêu website WordPress?",
      answer: "Tùy theo gói bạn chọn. Gói Starter cho phép 1-2 sites, Business 3-10 sites, Professional 15-50 sites, Advanced 75-150 sites, Enterprise không giới hạn. Mỗi website sẽ có database riêng biệt."
    },
    {
      category: "migration",
      question: "STEP có hỗ trợ di chuyển website từ hosting cũ không?",
      answer: "Có, chúng tôi hỗ trợ di chuyển miễn phí cho tất cả gói. Team kỹ thuật sẽ migrate toàn bộ files, database, email, thiết lập lại DNS và đảm bảo website hoạt động 100% trước khi cutover. Thời gian di chuyển 24-48h."
    },
    {
      category: "general",
      question: "Tôi có thể nâng cấp/hạ cấp gói bất cứ lúc nào?",
      answer: "Có, bạn có thể upgrade/downgrade gói bất kỳ lúc nào. Upgrade có hiệu lực ngay lập tức, downgrade có hiệu lực từ chu kỳ thanh toán tiếp theo. Phí chênh lệch sẽ được tính theo ngày sử dụng (pro-rated)."
    },
    {
      category: "security",
      question: "Chính sách backup như thế nào?",
      answer: "Tất cả gói đều có backup tự động. Starter: backup hàng tuần, lưu 7 ngày. Business: backup hàng ngày, lưu 30 ngày. Professional: real-time backup, lưu 60-180 ngày. Enterprise: continuous backup với point-in-time recovery. Bạn có thể tự khôi phục qua cPanel."
    },
    {
      category: "ecommerce",
      question: "Hosting có hỗ trợ WooCommerce không?",
      answer: "Có, tất cả gói WordPress Hosting đều hỗ trợ WooCommerce. Gói Business trở lên được tối ưu đặc biệt cho WooCommerce với object caching, database optimization, CDN cho images, và hỗ trợ payment gateway."
    },
    {
      category: "performance",
      question: "Tôi có quyền truy cập SSH/FTP không?",
      answer: "Gói Starter: chỉ FTP. Gói Business: FTP + SFTP. Gói Professional trở lên: Full SSH access, WP-CLI, Git, Composer. Enterprise: Root access, Docker, Kubernetes tùy nhu cầu."
    },
    {
      category: "performance",
      question: "Server đặt ở đâu? Tốc độ với người dùng Việt Nam ra sao?",
      answer: "Server đặt tại datacenter Tier 3 ở Hà Nội và TP.HCM, kết nối trực tiếp với VNIX, FPT, Viettel, VNPT. Tốc độ ping từ Việt Nam < 5ms. Tích hợp Cloudflare CDN giúp tăng tốc toàn cầu."
    },
    {
      category: "general",
      question: "Có giới hạn băng thông hay traffic không?",
      answer: "Tất cả gói đều KHÔNG giới hạn băng thông (unmetered bandwidth). Tuy nhiên, nếu website sử dụng quá nhiều tài nguyên CPU/RAM ảnh hưởng đến server, chúng tôi sẽ liên hệ để tư vấn upgrade hoặc chuyển sang VPS/Cloud Server."
    },
    {
      category: "general",
      question: "Chính sách hoàn tiền như thế nào?",
      answer: "Chúng tôi có chính sách hoàn tiền 30 ngày. Nếu không hài lòng với dịch vụ trong 30 ngày đầu, bạn có thể yêu cầu hoàn tiền 100% (trừ phí tên miền nếu có). Không cần lý do, không câu hỏi thêm."
    },
    {
      category: "ecommerce",
      question: "STEP có hỗ trợ WordPress Multisite không?",
      answer: "Có, gói Business-3 trở lên hỗ trợ WordPress Multisite (network of sites). Professional và Enterprise hỗ trợ cả Multi-network với subdomain/subdirectory/mapped domains, phù hợp cho agency quản lý nhiều sites."
    },
    {
      category: "general",
      question: "Tôi cần bao nhiêu tài nguyên cho website WordPress?",
      answer: "Blog nhỏ: Starter-1 (0.5 vCore, 512MB RAM). Blog trung bình: Starter-3 (1 vCore, 2GB). Business site: Business-1 (2 vCore, 2GB). WooCommerce: Business-2+ (2 vCore, 3GB+). High-traffic: Professional+ (3+ vCore, 6GB+). Chúng tôi sẵn sàng tư vấn miễn phí."
    }
  ];

  const getFilteredFaqs = () => {
    if (activeFaqCategory === "all") return faqs;
    return faqs.filter(faq => faq.category === activeFaqCategory);
  };

  const comparisonPoints = [
    { feature: "Tốc độ load trang", step: "< 1s với LSCache", competitor: "2-4s", icon: Zap, wpAdvantage: true },
    { feature: "Uptime SLA", step: "99.99% - 99.999%", competitor: "99.9%", icon: Server, wpAdvantage: false },
    { feature: "Bảo mật", step: "Imunify360 AI + WAF", competitor: "Basic Firewall", icon: Shield, wpAdvantage: true },
    { feature: "Support", step: "24/7 WordPress Expert", competitor: "Email only", icon: HeadphonesIcon, wpAdvantage: true },
    { feature: "Backup", step: "Hàng ngày + JetBackup", competitor: "Hàng tuần", icon: Database, wpAdvantage: true },
    { feature: "Migration", step: "Miễn phí unlimited", competitor: "Phí $50-100", icon: RefreshCw, wpAdvantage: false },
    { feature: "PHP Version", step: "7.4 - 8.3 Multi-version", competitor: "Single version", icon: Code, wpAdvantage: true },
    { feature: "CDN", step: "Cloudflare Enterprise", competitor: "Basic hoặc không có", icon: Globe, wpAdvantage: false }
  ];

  const renderBadge = (badge: string) => {
    switch (badge) {
      case "woocommerce":
        return (
          <Badge 
            key={badge}
            className="bg-purple-100 text-purple-700 border-purple-200 text-xs"
            data-testid={`badge-${badge}`}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            WooCommerce
          </Badge>
        );
      case "multisite":
        return (
          <Badge 
            key={badge}
            className="bg-blue-100 text-blue-700 border-blue-200 text-xs"
            data-testid={`badge-${badge}`}
          >
            <Layers className="w-3 h-3 mr-1" />
            Multisite
          </Badge>
        );
      case "hightraffic":
        return (
          <Badge 
            key={badge}
            className="bg-orange-100 text-orange-700 border-orange-200 text-xs"
            data-testid={`badge-${badge}`}
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            High Traffic
          </Badge>
        );
      case "enterprise":
        return (
          <Badge 
            key={badge}
            className="bg-red-100 text-red-700 border-red-200 text-xs"
            data-testid={`badge-${badge}`}
          >
            <Award className="w-3 h-3 mr-1" />
            Enterprise
          </Badge>
        );
      case "dedicated":
        return (
          <Badge 
            key={badge}
            className="bg-gray-100 text-gray-700 border-gray-200 text-xs"
            data-testid={`badge-${badge}`}
          >
            <Server className="w-3 h-3 mr-1" />
            Dedicated
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white" data-testid="page-hosting-wordpress">
      <Header />

      {/* Hero Section - WordPress Themed */}
      <section 
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${WP_BLUE} 0%, ${WP_BLUE_DARK} 50%, #135e7c 100%)`
        }}
        data-testid="section-hero"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 C40 10 50 20 50 30 C50 40 40 50 30 50 C20 50 10 40 10 30 C10 20 20 10 30 10' stroke='%23fff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* WordPress Optimized Badge */}
              <div 
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full mb-8 border border-white/30"
                data-testid="badge-wordpress-optimized"
              >
                <SiWordpress className="w-6 h-6" />
                <span className="font-semibold">WordPress Optimized Hosting</span>
                <Badge className="bg-yellow-400 text-yellow-900 font-bold">#1 Việt Nam</Badge>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Hosting WordPress
                <br />
                <span className="text-yellow-300">Siêu Tốc</span>
              </h1>
              
              {/* WordPress Benefits Highlight */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                <div 
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                  data-testid="benefit-1click"
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>1-Click Install</span>
                </div>
                <div 
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                  data-testid="benefit-litespeed"
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>LiteSpeed Cache</span>
                </div>
                <div 
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                  data-testid="benefit-staging"
                >
                  <Copy className="w-4 h-4 text-purple-400" />
                  <span>Staging Environment</span>
                </div>
                <div 
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                  data-testid="benefit-woocommerce"
                >
                  <ShoppingCart className="w-4 h-4 text-pink-400" />
                  <span>WooCommerce Ready</span>
                </div>
              </div>
              
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
                LiteSpeed + LSCache + NVMe SSD + Cloudflare CDN. 
                <br className="hidden md:block" />
                Tối ưu 100% cho WordPress. Uptime 99.99%.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-white hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl"
                  style={{ color: WP_BLUE }}
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-view-packages"
                >
                  <SiWordpress className="mr-2 h-5 w-5" />
                  Xem 18 Gói WordPress
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                  onClick={() => window.location.href = '/contact'}
                  data-testid="button-hero-contact"
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>

              {/* Stats Grid - Mobile Responsive */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
                <div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-5 border border-white/20"
                  data-testid="stat-loadtime"
                >
                  <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">&lt; 1s</div>
                  <div className="text-xs md:text-sm text-blue-100">Load Time</div>
                </div>
                <div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-5 border border-white/20"
                  data-testid="stat-uptime"
                >
                  <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">99.99%</div>
                  <div className="text-xs md:text-sm text-blue-100">Uptime</div>
                </div>
                <div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-5 border border-white/20"
                  data-testid="stat-support"
                >
                  <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">24/7</div>
                  <div className="text-xs md:text-sm text-blue-100">WP Support</div>
                </div>
                <div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-5 border border-white/20"
                  data-testid="stat-packages"
                >
                  <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">18</div>
                  <div className="text-xs md:text-sm text-blue-100">Gói lựa chọn</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Features Section - Grouped with Accordion */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white" data-testid="section-features">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ backgroundColor: WP_BLUE_LIGHT }}>
              <SiWordpress className="w-5 h-5" style={{ color: WP_BLUE }} />
              <span className="font-medium text-sm" style={{ color: WP_BLUE }}>WordPress Optimized Stack</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Công Nghệ & Tính Năng Vượt Trội
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              WordPress Hosting của STEP được xây dựng trên nền tảng công nghệ hàng đầu thế giới
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <Accordion type="multiple" className="space-y-4" data-testid="accordion-features">
              {featureCategories.map((category, catIndex) => (
                <AccordionItem 
                  key={category.id} 
                  value={category.id}
                  className={`bg-white rounded-xl shadow-lg border ${category.borderColor} overflow-hidden`}
                  data-testid={`accordion-item-${category.id}`}
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                        <category.icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-500">{category.features.length} tính năng</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      {category.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors relative"
                          data-testid={`feature-${category.id}-${index}`}
                        >
                          {feature.wpOptimized && (
                            <div className="absolute -top-2 -right-2">
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                                style={{ backgroundColor: WP_BLUE }}
                                title="WordPress Optimized"
                              >
                                <SiWordpress className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>
                          )}
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <feature.icon className={`w-5 h-5 ${category.color}`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                          </div>
                        </motion.div>
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
      <section id="packages" className="py-16 md:py-20 bg-white" data-testid="section-packages">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ backgroundColor: WP_BLUE_LIGHT }}>
              <SiWordpress className="w-5 h-5" style={{ color: WP_BLUE }} />
              <span className="font-medium text-sm" style={{ color: WP_BLUE }}>18 Gói WordPress Hosting</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Chọn Gói Phù Hợp Với Bạn
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 px-4">
              Từ blog cá nhân đến enterprise platform. Từ 50K/tháng đến giải pháp tùy biến.
            </p>

            {/* View Toggle */}
            <div className="flex justify-center gap-3 mb-6">
              <Button
                variant={!compareView ? "default" : "outline"}
                onClick={() => setCompareView(false)}
                style={!compareView ? { backgroundColor: WP_BLUE } : {}}
                data-testid="button-grid-view"
              >
                <Server className="w-4 h-4 mr-2" />
                Xem Dạng Thẻ
              </Button>
              <Button
                variant={compareView ? "default" : "outline"}
                onClick={() => setCompareView(true)}
                style={compareView ? { backgroundColor: WP_BLUE } : {}}
                data-testid="button-compare-view"
              >
                <FileText className="w-4 h-4 mr-2" />
                So Sánh Chi Tiết
              </Button>
            </div>
          </motion.div>

          {!compareView ? (
            <>
              {/* Tier Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" data-testid="tabs-packages">
                <div className="overflow-x-auto pb-2 mb-8">
                  <TabsList className="flex w-max mx-auto bg-gray-100 p-1 rounded-xl">
                    {tiers.map((tier) => (
                      <TabsTrigger 
                        key={tier} 
                        value={tier}
                        className="px-4 md:px-6 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        style={{ 
                          color: activeTab === tier ? WP_BLUE : undefined
                        }}
                        data-testid={`tab-${tier.toLowerCase()}`}
                      >
                        {tier === "all" ? "Tất cả" : tier}
                        <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                          {tier === "all" ? 6 : packages.filter(p => p.tier === tier).length}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="packages-grid">
                    {getFilteredPackages().map((pkg, index) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 relative ${
                          pkg.popular 
                            ? 'scale-105 z-10' 
                            : pkg.best 
                            ? 'scale-105 z-10' 
                            : ''
                        }`}
                        style={{
                          borderColor: pkg.popular ? WP_BLUE : pkg.best ? '#dc2626' : '#e5e7eb'
                        }}
                        data-testid={`package-card-${pkg.id}`}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span 
                              className="text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
                              style={{ backgroundColor: WP_BLUE }}
                              data-testid="badge-popular"
                            >
                              <SiWordpress className="w-4 h-4" />
                              Phổ Biến Nhất
                            </span>
                          </div>
                        )}
                        {pkg.best && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span 
                              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
                              data-testid="badge-enterprise"
                            >
                              <Award className="w-4 h-4" />
                              Enterprise
                            </span>
                          </div>
                        )}

                        <div className="mb-4 pt-2">
                          <div 
                            className="text-sm font-semibold mb-2"
                            style={{ color: WP_BLUE }}
                          >
                            {pkg.tier}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                          <div className="flex items-end gap-2">
                            <span 
                              className="text-4xl font-bold"
                              style={{ color: WP_BLUE }}
                            >
                              {pkg.price}
                            </span>
                            {pkg.price !== "Liên hệ" && <span className="text-gray-500 mb-1">₫/tháng</span>}
                          </div>
                        </div>

                        {/* Feature Badges */}
                        {pkg.badges && pkg.badges.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4" data-testid={`badges-${pkg.id}`}>
                            {pkg.badges.slice(0, 3).map(badge => renderBadge(badge))}
                          </div>
                        )}

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-sm">
                            <HardDrive className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: WP_BLUE }} />
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
                          className="w-full py-6 text-white font-semibold"
                          style={{
                            backgroundColor: pkg.best ? undefined : pkg.popular ? WP_BLUE : '#374151',
                            backgroundImage: pkg.best ? 'linear-gradient(to right, #dc2626, #ea580c)' : undefined
                          }}
                          onClick={() => window.location.href = '/contact'}
                          data-testid={`button-select-${pkg.id}`}
                        >
                          Chọn Gói {pkg.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Show All Button */}
                  {activeTab === "all" && (
                    <div className="text-center mt-10">
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setActiveTab("Starter")}
                        className="border-2 px-8 py-6"
                        style={{ borderColor: WP_BLUE, color: WP_BLUE }}
                        data-testid="button-show-more"
                      >
                        Xem Tất Cả 18 Gói Theo Tier
                        <ChevronDown className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          ) : (
            /* Responsive Comparison Table */
            <div className="overflow-x-auto rounded-xl shadow-xl" data-testid="comparison-table">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr style={{ backgroundColor: WP_BLUE }}>
                    <th className="p-4 text-left font-bold text-white sticky left-0 z-20" style={{ backgroundColor: WP_BLUE, minWidth: '150px' }}>
                      Tính năng
                    </th>
                    {packages.slice(0, 6).map(pkg => (
                      <th key={pkg.id} className="p-4 text-center font-bold text-white min-w-[160px]">
                        <div className="flex flex-col items-center">
                          <span>{pkg.name}</span>
                          <span className="text-yellow-300 text-lg mt-1">
                            {pkg.price}{pkg.price !== "Liên hệ" && "₫"}
                          </span>
                          {pkg.popular && (
                            <Badge className="bg-yellow-400 text-yellow-900 mt-1 text-xs">
                              Phổ biến
                            </Badge>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10 border-r">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-blue-500" />
                        Dung lượng
                      </div>
                    </td>
                    {packages.slice(0, 6).map(pkg => (
                      <td key={pkg.id} className="p-4 text-center text-sm">{pkg.storage}</td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10 border-r">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-green-500" />
                        CPU / RAM
                      </div>
                    </td>
                    {packages.slice(0, 6).map(pkg => (
                      <td key={pkg.id} className="p-4 text-center text-sm">{pkg.cpu} / {pkg.ram}</td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10 border-r">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-purple-500" />
                        Websites
                      </div>
                    </td>
                    {packages.slice(0, 6).map(pkg => (
                      <td key={pkg.id} className="p-4 text-center text-sm">{pkg.websites}</td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10 border-r">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-orange-500" />
                        Database
                      </div>
                    </td>
                    {packages.slice(0, 6).map(pkg => (
                      <td key={pkg.id} className="p-4 text-center text-sm">{pkg.database}</td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10 border-r">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-pink-500" />
                        Email
                      </div>
                    </td>
                    {packages.slice(0, 6).map(pkg => (
                      <td key={pkg.id} className="p-4 text-center text-sm">{pkg.email}</td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10 border-r">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-red-500" />
                        SSL
                      </div>
                    </td>
                    {packages.slice(0, 6).map(pkg => (
                      <td key={pkg.id} className="p-4 text-center text-sm">{pkg.ssl}</td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10 border-r">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-teal-500" />
                        Backup
                      </div>
                    </td>
                    {packages.slice(0, 6).map(pkg => (
                      <td key={pkg.id} className="p-4 text-center text-sm">{pkg.backup}</td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-white z-10 border-r">
                      <div className="flex items-center gap-2">
                        <HeadphonesIcon className="w-4 h-4 text-indigo-500" />
                        Support
                      </div>
                    </td>
                    {packages.slice(0, 6).map(pkg => (
                      <td key={pkg.id} className="p-4 text-center text-sm">{pkg.support}</td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold sticky left-0 bg-gray-50 z-10 border-r"></td>
                    {packages.slice(0, 6).map(pkg => (
                      <td key={pkg.id} className="p-4 text-center">
                        <Button
                          size="sm"
                          className="text-white"
                          style={{ backgroundColor: pkg.popular ? WP_BLUE : '#374151' }}
                          onClick={() => window.location.href = '/contact'}
                          data-testid={`button-table-select-${pkg.id}`}
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

      {/* Comparison with Competitors - Responsive */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white" data-testid="section-comparison">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ backgroundColor: WP_BLUE_LIGHT }}>
              <Activity className="w-5 h-5" style={{ color: WP_BLUE }} />
              <span className="font-medium text-sm" style={{ color: WP_BLUE }}>So sánh với đối thủ</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              So Sánh STEP vs Đối Thủ
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Tại sao STEP WordPress Hosting vượt trội hơn?
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {comparisonPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-xl p-5 md:p-6 shadow-lg border-2 ${
                    point.wpAdvantage ? 'border-blue-200' : 'border-gray-100'
                  }`}
                  data-testid={`comparison-item-${index}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: point.wpAdvantage ? WP_BLUE_LIGHT : '#f3f4f6' }}
                    >
                      <point.icon 
                        className="w-5 h-5"
                        style={{ color: point.wpAdvantage ? WP_BLUE : '#6b7280' }}
                      />
                    </div>
                    {point.wpAdvantage && (
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: WP_BLUE }}
                      >
                        <SiWordpress className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-sm md:text-base">{point.feature}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm"><strong>STEP:</strong> {point.step}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-500"><strong>Khác:</strong> {point.competitor}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Card Format */}
      <section className="py-16 md:py-20 bg-white" data-testid="section-testimonials">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ backgroundColor: WP_BLUE_LIGHT }}>
              <Users className="w-5 h-5" style={{ color: WP_BLUE }} />
              <span className="font-medium text-sm" style={{ color: WP_BLUE }}>WordPress Agencies & Developers</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Khách Hàng Nói Gì Về STEP?
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Hơn 5,000+ website WordPress tin dùng
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                data-testid={`testimonial-card-${index}`}
              >
                {/* Header with Avatar and Type Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: WP_BLUE }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <Badge 
                    className="text-xs capitalize"
                    style={{ 
                      backgroundColor: WP_BLUE_LIGHT,
                      color: WP_BLUE,
                      borderColor: WP_BLUE
                    }}
                  >
                    {testimonial.type}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 leading-relaxed relative">
                  <span className="text-4xl absolute -top-2 -left-1 opacity-20" style={{ color: WP_BLUE }}>"</span>
                  <p className="pl-4">{testimonial.text}</p>
                </blockquote>

                {/* WordPress Badge */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                  <SiWordpress className="w-4 h-4" style={{ color: WP_BLUE }} />
                  <span>WordPress User</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Grouped by Topic */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white" data-testid="section-faq">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ backgroundColor: WP_BLUE_LIGHT }}>
              <FileText className="w-5 h-5" style={{ color: WP_BLUE }} />
              <span className="font-medium text-sm" style={{ color: WP_BLUE }}>WordPress FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Giải đáp mọi thắc mắc về WordPress Hosting
            </p>

            {/* FAQ Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {faqCategories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeFaqCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFaqCategory(cat.id)}
                  className="flex items-center gap-2"
                  style={activeFaqCategory === cat.id ? { backgroundColor: WP_BLUE } : {}}
                  data-testid={`faq-category-${cat.id}`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              {getFilteredFaqs().map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 overflow-hidden"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger 
                    className="text-left font-semibold text-gray-900 hover:no-underline py-5 group"
                  >
                    <div className="flex items-start gap-3 pr-4">
                      <Badge 
                        className="mt-0.5 capitalize text-xs flex-shrink-0"
                        style={{ 
                          backgroundColor: WP_BLUE_LIGHT,
                          color: WP_BLUE
                        }}
                      >
                        {faq.category}
                      </Badge>
                      <span className="group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-6 pl-16">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 md:py-20"
        style={{ 
          background: `linear-gradient(135deg, ${WP_BLUE} 0%, ${WP_BLUE_DARK} 50%, #135e7c 100%)`
        }}
        data-testid="section-cta"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <SiWordpress className="w-5 h-5" />
              <span className="font-medium text-sm">WordPress Optimized Hosting</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Sẵn Sàng Tăng Tốc WordPress Của Bạn?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              🎁 Ưu đãi đặc biệt: Giảm 30% tháng đầu + Migration miễn phí + Tư vấn 1-1
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-white hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl"
                style={{ color: WP_BLUE }}
                onClick={() => window.location.href = '/contact'}
                data-testid="button-cta-register"
              >
                <SiWordpress className="mr-2 h-5 w-5" />
                Đăng Ký Ngay - Nhận Ưu Đãi 30%
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-cta-packages"
              >
                Xem Lại Bảng Giá
              </Button>
            </div>

            <p className="text-sm text-blue-200">
              ✅ Cam kết hoàn tiền 30 ngày • ✅ Không cần thẻ tín dụng • ✅ Setup trong 24h
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
