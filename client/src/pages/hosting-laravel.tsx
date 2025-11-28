import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Shield, 
  Server, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Clock,
  Users,
  Star,
  X,
  Database,
  TrendingUp,
  Lock,
  Terminal,
  GitBranch,
  Zap,
  Settings,
  Monitor,
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
  Code,
  Package,
  Cpu,
  Layers,
  Workflow,
  Timer,
  HelpCircle
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const LARAVEL_RED = "#FF2D20";

export default function HostingLaravel() {
  const [selectedTier, setSelectedTier] = useState("all");

  const packages = [
    {
      id: 1,
      name: "LV-Starter-1",
      tier: "Starter",
      price: "60.000",
      monthlyPrice: 60000,
      storage: "5 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "1 Database",
      email: "1 Email",
      domains: "1 Tên miền",
      subdomains: "Không",
      cpu: "0.5 vCore",
      ram: "512 MB",
      websites: "1 Laravel App",
      ssl: "SSL Miễn phí",
      php: "PHP 8.1+",
      composer: "Composer",
      ssh: "SSH Access",
      git: "Không",
      redis: "Không",
      queue: "Không",
      cron: "Basic Cron",
      backup: "Weekly",
      support: "Email 24h",
      suitable: "Blog cá nhân/Portfolio đơn giản",
      features: ["PHP 8.1+", "Composer", "SSH"]
    },
    {
      id: 2,
      name: "LV-Starter-2",
      tier: "Starter",
      price: "90.000",
      monthlyPrice: 90000,
      storage: "10 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "2 Databases",
      email: "2 Emails",
      domains: "2 Tên miền",
      subdomains: "5 Subdomains",
      cpu: "1 vCore",
      ram: "1 GB",
      websites: "1 Laravel App",
      ssl: "SSL Miễn phí",
      php: "PHP 8.1+",
      composer: "Composer",
      ssh: "SSH Access",
      git: "Git Integration",
      redis: "Không",
      queue: "Không",
      cron: "Basic Cron",
      backup: "Weekly",
      support: "Email 24h",
      suitable: "Dev thử nghiệm/Personal Project",
      features: ["PHP 8.1+", "Composer", "SSH", "Git"]
    },
    {
      id: 3,
      name: "LV-Starter-3",
      tier: "Starter",
      price: "120.000",
      monthlyPrice: 120000,
      storage: "15 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "3 Databases",
      email: "3 Emails",
      domains: "3 Tên miền",
      subdomains: "10 Subdomains",
      cpu: "1 vCore",
      ram: "1.5 GB",
      websites: "2 Laravel Apps",
      ssl: "SSL Miễn phí",
      php: "PHP 8.1+",
      composer: "Composer",
      ssh: "SSH Access",
      git: "Git Integration",
      redis: "Không",
      queue: "Không",
      cron: "Advanced Cron",
      backup: "Weekly",
      support: "Email 12h",
      suitable: "Freelancer/Small Projects",
      features: ["PHP 8.1+", "Composer", "SSH", "Git", "Artisan"]
    },
    {
      id: 4,
      name: "LV-Business-1",
      tier: "Business",
      price: "180.000",
      monthlyPrice: 180000,
      storage: "25 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "5 Databases",
      email: "5 Emails",
      domains: "5 Tên miền",
      subdomains: "20 Subdomains",
      cpu: "2 vCores",
      ram: "2 GB",
      websites: "3 Laravel Apps",
      ssl: "SSL Miễn phí",
      php: "PHP 8.1+",
      composer: "Composer",
      ssh: "Full SSH",
      git: "Git + CI/CD Basic",
      redis: "Redis Cache",
      queue: "Queue Workers",
      cron: "Advanced Cron",
      backup: "Daily",
      support: "Chat 8h",
      suitable: "Business Website/Startup MVP",
      popular: true,
      features: ["PHP 8.1+", "Composer", "SSH", "Git", "Redis", "Queue Workers"]
    },
    {
      id: 5,
      name: "LV-Business-2",
      tier: "Business",
      price: "250.000",
      monthlyPrice: 250000,
      storage: "40 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "10 Databases",
      email: "10 Emails",
      domains: "10 Tên miền",
      subdomains: "50 Subdomains",
      cpu: "2 vCores",
      ram: "3 GB",
      websites: "5 Laravel Apps",
      ssl: "SSL Miễn phí + Wildcard",
      php: "PHP 8.1+",
      composer: "Composer",
      ssh: "Full SSH",
      git: "Git + CI/CD",
      redis: "Redis Cache",
      queue: "Queue Workers",
      cron: "Advanced Cron",
      backup: "Daily",
      support: "Chat/Phone 4h",
      suitable: "SME/Agency Projects",
      features: ["PHP 8.1+", "Composer", "SSH", "Git", "CI/CD", "Redis", "Queue Workers"]
    },
    {
      id: 6,
      name: "LV-Business-3",
      tier: "Business",
      price: "350.000",
      monthlyPrice: 350000,
      storage: "60 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "15 Databases",
      email: "15 Emails",
      domains: "15 Tên miền",
      subdomains: "100 Subdomains",
      cpu: "3 vCores",
      ram: "4 GB",
      websites: "8 Laravel Apps",
      ssl: "SSL Miễn phí + Wildcard",
      php: "PHP 8.1+",
      composer: "Composer",
      ssh: "Full SSH",
      git: "Git + CI/CD Pro",
      redis: "Redis Cache",
      queue: "Horizon Support",
      cron: "Advanced Cron",
      backup: "Daily + On-demand",
      support: "Priority 2h",
      suitable: "Multiple Projects/Agency",
      features: ["PHP 8.1+", "Composer", "SSH", "Git", "CI/CD", "Redis", "Horizon"]
    },
    {
      id: 7,
      name: "LV-Professional-1",
      tier: "Professional",
      price: "450.000",
      monthlyPrice: 450000,
      storage: "80 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "20 Databases",
      email: "20 Emails",
      domains: "20 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "4 vCores",
      ram: "6 GB",
      websites: "10 Laravel Apps",
      ssl: "SSL Pro + Wildcard",
      php: "PHP Multi-version",
      composer: "Composer 2",
      ssh: "Full SSH + SFTP",
      git: "Git + CI/CD Pro",
      redis: "Redis + Memcached",
      queue: "Horizon + Supervisor",
      cron: "Advanced Scheduler",
      backup: "Daily + Hourly",
      support: "Priority 1h",
      suitable: "Developer Teams/High-traffic Apps",
      features: ["PHP Multi-version", "Composer 2", "SSH", "Git", "CI/CD", "Redis", "Memcached", "Horizon", "Supervisor"]
    },
    {
      id: 8,
      name: "LV-Professional-2",
      tier: "Professional",
      price: "600.000",
      monthlyPrice: 600000,
      storage: "120 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "30 Databases",
      email: "30 Emails",
      domains: "30 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "6 vCores",
      ram: "8 GB",
      websites: "15 Laravel Apps",
      ssl: "SSL Pro + EV",
      php: "PHP Multi-version",
      composer: "Composer 2",
      ssh: "Full SSH + SFTP",
      git: "Git + Advanced CI/CD",
      redis: "Redis Cluster",
      queue: "Horizon Pro",
      cron: "Advanced Scheduler",
      backup: "Hourly",
      support: "Dedicated Support",
      suitable: "Production Apps/SaaS Platform",
      features: ["PHP Multi-version", "Composer 2", "SSH", "SFTP", "Advanced CI/CD", "Redis Cluster", "Horizon Pro"]
    },
    {
      id: 9,
      name: "LV-Professional-3",
      tier: "Professional",
      price: "800.000",
      monthlyPrice: 800000,
      storage: "180 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "50 Databases",
      email: "50 Emails",
      domains: "50 Tên miền",
      subdomains: "Không giới hạn",
      cpu: "8 vCores",
      ram: "12 GB",
      websites: "25 Laravel Apps",
      ssl: "SSL Pro + EV",
      php: "PHP Multi-version",
      composer: "Composer 2",
      ssh: "Full SSH + SFTP",
      git: "Git + Advanced CI/CD",
      redis: "Redis Cluster",
      queue: "Horizon Pro + Custom",
      cron: "Custom Scheduler",
      backup: "Real-time",
      support: "24/7 Dedicated",
      suitable: "Enterprise Development Teams",
      features: ["PHP Multi-version", "Composer 2", "Root SSH", "Advanced CI/CD", "Redis Cluster", "Custom Horizon"]
    },
    {
      id: 10,
      name: "LV-Advanced-1",
      tier: "Advanced",
      price: "1.000.000",
      monthlyPrice: 1000000,
      storage: "250 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "10 vCores",
      ram: "16 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise",
      php: "PHP Multi-version",
      composer: "Composer 2",
      ssh: "Full Access",
      git: "Enterprise CI/CD",
      redis: "Redis Cluster HA",
      queue: "Horizon Enterprise",
      cron: "Custom Scheduler",
      backup: "Real-time + GEO",
      support: "24/7 Premium",
      suitable: "Large Organizations/Multi-brand",
      features: ["PHP Multi-version", "Composer 2", "Full Access", "Enterprise CI/CD", "Redis HA", "Horizon Enterprise"]
    },
    {
      id: 11,
      name: "LV-Advanced-2",
      tier: "Advanced",
      price: "1.300.000",
      monthlyPrice: 1300000,
      storage: "350 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "12 vCores",
      ram: "24 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise + DV",
      php: "PHP Multi-version",
      composer: "Composer 2",
      ssh: "Root Access",
      git: "Enterprise CI/CD",
      redis: "Redis Cluster HA",
      queue: "Horizon Enterprise",
      cron: "Custom Scheduler",
      backup: "Real-time + Multi-region",
      support: "24/7 Premium + DevOps",
      suitable: "SaaS Platforms/High-traffic",
      features: ["PHP Multi-version", "Root Access", "Enterprise CI/CD", "Redis HA", "Multi-region Backup"]
    },
    {
      id: 12,
      name: "LV-Advanced-3",
      tier: "Advanced",
      price: "1.600.000",
      monthlyPrice: 1600000,
      storage: "500 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "16 vCores",
      ram: "32 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise + EV",
      php: "PHP Multi-version",
      composer: "Composer 2",
      ssh: "Root Access",
      git: "Enterprise CI/CD + Custom",
      redis: "Redis Cluster Multi-zone",
      queue: "Custom Queue System",
      cron: "Custom Scheduler",
      backup: "Real-time + Multi-region",
      support: "24/7 Premium + Architect",
      suitable: "Enterprise/Mission-critical Apps",
      features: ["Custom PHP Stack", "Root Access", "Custom CI/CD", "Redis Multi-zone", "Custom Queue"]
    },
    {
      id: 13,
      name: "LV-Enterprise-1",
      tier: "Enterprise",
      price: "2.000.000",
      monthlyPrice: 2000000,
      storage: "750 GB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "20 vCores",
      ram: "48 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise Suite",
      php: "Custom PHP Stack",
      composer: "Composer 2 + Private",
      ssh: "Full Root + Audit",
      git: "Custom CI/CD Pipeline",
      redis: "Redis Enterprise Cluster",
      queue: "Custom Queue Infrastructure",
      cron: "Enterprise Scheduler",
      backup: "Real-time + Global CDN",
      support: "24/7 Enterprise + Architect",
      suitable: "Large Corporations/Financial",
      enterprise: true,
      features: ["Custom Stack", "Private Registry", "Audit Logs", "Custom Pipeline", "Redis Enterprise"]
    },
    {
      id: 14,
      name: "LV-Enterprise-2",
      tier: "Enterprise",
      price: "2.500.000",
      monthlyPrice: 2500000,
      storage: "1 TB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "24 vCores",
      ram: "64 GB",
      websites: "Không giới hạn",
      ssl: "SSL Enterprise Suite + Custom",
      php: "Custom PHP Stack",
      composer: "Composer Enterprise",
      ssh: "Full Root + Security Audit",
      git: "Custom CI/CD + DevSecOps",
      redis: "Redis Enterprise HA",
      queue: "Custom Infrastructure",
      cron: "Enterprise Scheduler",
      backup: "Real-time + Multi-cloud",
      support: "24/7 Enterprise + CTO",
      suitable: "Multi-national Corps/E-commerce",
      enterprise: true,
      features: ["Custom Stack", "DevSecOps", "Security Audit", "Multi-cloud", "Redis Enterprise HA"]
    },
    {
      id: 15,
      name: "LV-Enterprise-3",
      tier: "Enterprise",
      price: "3.000.000",
      monthlyPrice: 3000000,
      storage: "1.5 TB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "32 vCores",
      ram: "96 GB",
      websites: "Không giới hạn",
      ssl: "Custom SSL Infrastructure",
      php: "Custom Stack + Microservices",
      composer: "Composer Enterprise",
      ssh: "Full Root + Compliance",
      git: "Custom DevSecOps Pipeline",
      redis: "Redis Enterprise Multi-region",
      queue: "Custom Infrastructure",
      cron: "Custom Orchestration",
      backup: "Real-time + Disaster Recovery",
      support: "24/7 White-glove + CTO",
      suitable: "Banking/Healthcare/Government",
      enterprise: true,
      features: ["Microservices", "Compliance", "DevSecOps", "Disaster Recovery", "Multi-region Redis"]
    },
    {
      id: 16,
      name: "LV-Enterprise-4",
      tier: "Enterprise",
      price: "4.000.000",
      monthlyPrice: 4000000,
      storage: "2 TB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "48 vCores",
      ram: "128 GB",
      websites: "Không giới hạn",
      ssl: "Custom SSL + Zero-Trust",
      php: "Custom Stack + Kubernetes",
      composer: "Enterprise + Private Registry",
      ssh: "Full Root + Advanced Security",
      git: "Enterprise DevSecOps",
      redis: "Redis Global Cluster",
      queue: "Custom Infrastructure",
      cron: "Custom Orchestration",
      backup: "Real-time + Multi-site DR",
      support: "24/7 White-glove + Solutions Architect",
      suitable: "Global SaaS/Fintech",
      enterprise: true,
      features: ["Kubernetes", "Zero-Trust", "Advanced Security", "Global Cluster", "Multi-site DR"]
    },
    {
      id: 17,
      name: "LV-Enterprise-5",
      tier: "Enterprise",
      price: "5.500.000",
      monthlyPrice: 5500000,
      storage: "3 TB NVMe SSD",
      bandwidth: "Không giới hạn",
      database: "Không giới hạn",
      email: "Không giới hạn",
      domains: "Không giới hạn",
      subdomains: "Không giới hạn",
      cpu: "64 vCores",
      ram: "192 GB",
      websites: "Không giới hạn",
      ssl: "Custom SSL + Advanced Protection",
      php: "Custom Stack + Service Mesh",
      composer: "Enterprise Suite",
      ssh: "Full Root + Hardened Security",
      git: "Enterprise DevSecOps + Compliance",
      redis: "Redis Global HA Cluster",
      queue: "Custom Multi-region",
      cron: "Custom Orchestration",
      backup: "Real-time + Global DR",
      support: "24/7 Concierge + Engineering Team",
      suitable: "Fortune 500/Critical Infrastructure",
      enterprise: true,
      features: ["Service Mesh", "Hardened Security", "Global HA", "Multi-region Queue", "Global DR"]
    },
    {
      id: 18,
      name: "LV-Enterprise-6",
      tier: "Enterprise",
      price: "Custom",
      monthlyPrice: 99999999,
      storage: "Custom Storage",
      bandwidth: "Dedicated Infrastructure",
      database: "Custom Database Cluster",
      email: "Enterprise Email Suite",
      domains: "Unlimited Premium",
      subdomains: "Unlimited Premium",
      cpu: "Custom vCores",
      ram: "Custom RAM",
      websites: "Unlimited Premium",
      ssl: "Custom Security Suite",
      php: "Custom Technology Stack",
      composer: "Enterprise Suite + Custom",
      ssh: "Custom Access Control",
      git: "Custom DevSecOps Platform",
      redis: "Custom Caching Infrastructure",
      queue: "Custom Queue Platform",
      cron: "Custom Automation Platform",
      backup: "Custom DR Solution",
      support: "24/7 Dedicated Engineering Team",
      suitable: "Custom Enterprise Solutions",
      enterprise: true,
      features: ["Custom Everything", "Dedicated Team", "Custom Infrastructure"]
    }
  ];

  const tiers = ["all", "Starter", "Business", "Professional", "Advanced", "Enterprise"];
  
  const getFilteredPackages = () => {
    if (selectedTier === "all") {
      return packages.slice(0, 6);
    }
    return packages.filter(pkg => pkg.tier === selectedTier);
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case "Starter": return "bg-green-100 text-green-800 border-green-300";
      case "Business": return "bg-blue-100 text-blue-800 border-blue-300";
      case "Professional": return "bg-purple-100 text-purple-800 border-purple-300";
      case "Advanced": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Enterprise": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getFeatureBadgeStyle = (feature: string) => {
    if (feature.includes("Redis") || feature.includes("Queue") || feature.includes("Horizon")) {
      return "bg-[#FF2D20]/10 text-[#FF2D20] border-[#FF2D20]/30";
    }
    if (feature.includes("SSH") || feature.includes("Git") || feature.includes("CI/CD")) {
      return "bg-blue-100 text-blue-700 border-blue-300";
    }
    if (feature.includes("PHP") || feature.includes("Composer") || feature.includes("Artisan")) {
      return "bg-purple-100 text-purple-700 border-purple-300";
    }
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  const technicalFeatureGroups = [
    {
      title: "🚀 Deployment & DevOps",
      icon: Rocket,
      features: [
        {
          icon: Terminal,
          title: "Full SSH Access",
          description: "SSH/SFTP access đầy đủ để chạy Artisan commands, database migrations, queue workers, và deployment scripts. Root access cho Enterprise tiers."
        },
        {
          icon: GitBranch,
          title: "Git + CI/CD Integration",
          description: "Git integration với GitHub, GitLab, Bitbucket. CI/CD pipelines tự động với GitHub Actions, Jenkins, hoặc custom scripts cho continuous deployment."
        },
        {
          icon: Package,
          title: "Composer & Dependencies",
          description: "Composer 2 pre-installed, hỗ trợ private repositories, package caching để install dependencies nhanh chóng. Compatible với Packagist và custom registries."
        }
      ]
    },
    {
      title: "⚡ Caching & Performance",
      icon: Zap,
      features: [
        {
          icon: Database,
          title: "Redis & Memcached",
          description: "Redis cache server cho session storage, query caching, và Laravel Horizon. Memcached support cho distributed caching systems với high availability."
        },
        {
          icon: Zap,
          title: "LiteSpeed Web Server",
          description: "LiteSpeed LSAPI cho PHP, HTTP/3 support, built-in caching, và performance optimization. Nhanh hơn Apache/Nginx cho Laravel applications."
        },
        {
          icon: Cloud,
          title: "NVMe SSD Storage",
          description: "High-performance NVMe SSD storage với tốc độ đọc/ghi vượt trội. Ideal cho Laravel applications với large file storage và media management."
        }
      ]
    },
    {
      title: "🔄 Queue & Background Jobs",
      icon: Workflow,
      features: [
        {
          icon: Monitor,
          title: "Queue Workers & Horizon",
          description: "Laravel Horizon dashboard, Supervisor process manager, multiple queue workers, failed job handling, và real-time monitoring cho background tasks."
        },
        {
          icon: Settings,
          title: "Advanced Cron Scheduler",
          description: "Laravel Task Scheduler support, custom cron jobs, scheduled commands, và automated maintenance tasks. Log monitoring và error notifications."
        },
        {
          icon: Timer,
          title: "Real-time Processing",
          description: "WebSocket support, broadcasting events, real-time notifications. Pusher compatible hoặc self-hosted với Laravel Echo Server."
        }
      ]
    },
    {
      title: "🔒 Security & Backup",
      icon: Shield,
      features: [
        {
          icon: Shield,
          title: "Security & Firewall",
          description: "Imunify360 protection, ModSecurity WAF, DDoS mitigation, malware scanning, và SSL certificates. Secure .env file management và secrets protection."
        },
        {
          icon: RefreshCw,
          title: "Auto Backup & Recovery",
          description: "Automated daily/hourly backups, JetBackup integration, point-in-time recovery, và off-site storage. One-click restore cho database và files."
        },
        {
          icon: Code2,
          title: "PHP 8.1+ Support",
          description: "Hỗ trợ đầy đủ PHP 8.1, 8.2, 8.3 với JIT compiler, typed properties, và performance improvements. Tương thích hoàn hảo với Laravel 9, 10, 11."
        },
        {
          icon: HeadphonesIcon,
          title: "24/7 Expert Support",
          description: "Laravel-savvy support team 24/7 qua chat, phone, email. Priority support cho production issues, deployment assistance, và performance tuning."
        }
      ]
    }
  ];

  const competitorComparison = [
    { metric: "Response Time", step: "< 200ms (avg)", competitor: "500ms - 2s", highlight: false },
    { metric: "Uptime SLA", step: "99.99% - 99.999%", competitor: "99.5% - 99.9%", highlight: false },
    { metric: "SSH/Git Access", step: "Full SSH + Git Integration", competitor: "Limited or No SSH", highlight: true },
    { metric: "Queue Workers", step: "Horizon + Supervisor", competitor: "Basic Queue Only", highlight: true },
    { metric: "CI/CD Support", step: "GitHub Actions + Jenkins", competitor: "Manual Deployment", highlight: true },
    { metric: "Backup Frequency", step: "Hourly + Real-time", competitor: "Daily or Weekly", highlight: false },
    { metric: "PHP Versions", step: "Multi-version 8.1-8.3", competitor: "Single PHP version", highlight: false },
    { metric: "Support Quality", step: "Laravel Experts 24/7", competitor: "General Support", highlight: false }
  ];

  const testimonials = [
    {
      name: "Anh Tuấn Anh",
      role: "Senior Laravel Developer",
      company: "Tech Startup Hà Nội",
      rating: 5,
      text: "SSH access và Git integration giúp tôi deploy Laravel app chỉ trong vài phút. Redis cache làm app nhanh hơn hẳn so với hosting cũ. Support team hiểu rõ Laravel, giúp optimize database queries rất tốt!",
      avatar: "👨‍💻",
      highlight: "SSH + Git Deploy"
    },
    {
      name: "Chị Minh Hương",
      role: "Full-stack Developer",
      company: "Agency Hồ Chí Minh",
      rating: 5,
      text: "Horizon dashboard hoạt động mượt mà, queue workers xử lý email và jobs cực ổn định. CI/CD pipeline tự động deploy khi push code lên GitHub - tiết kiệm thời gian deployment đáng kể cho team chúng tôi!",
      avatar: "👩‍💻",
      highlight: "Horizon + CI/CD"
    },
    {
      name: "Anh Đức Minh",
      role: "DevOps Engineer",
      company: "E-commerce Platform",
      rating: 5,
      text: "Performance vượt trội với NVMe SSD và LiteSpeed server. Composer install nhanh, artisan migrate smooth. Backup tự động giúp yên tâm khi làm việc với production database. Highly recommended cho Laravel developers!",
      avatar: "🚀",
      highlight: "NVMe + Performance"
    }
  ];

  const faqGroups = [
    {
      title: "🚀 Deployment & Setup",
      icon: Rocket,
      faqs: [
        {
          question: "Laravel Hosting khác gì Web Hosting thông thường?",
          answer: "Laravel Hosting được tối ưu hóa đặc biệt cho Laravel framework với PHP 8+, Composer pre-installed, SSH access để chạy Artisan commands, Git integration, Redis cache, Queue workers (Horizon), và advanced cron scheduler. Web hosting thông thường thường không có các features developer-specific này và performance không được tối ưu cho Laravel applications."
        },
        {
          question: "Tôi có thể deploy bao nhiêu Laravel applications?",
          answer: "Tùy vào gói: Starter tiers hỗ trợ 1-2 apps, Business tiers 3-8 apps, Professional tiers 10-25 apps, Advanced và Enterprise tiers không giới hạn số lượng Laravel applications. Mỗi app có thể có riêng database, .env configuration, và queue workers."
        },
        {
          question: "Có hỗ trợ di chuyển Laravel app từ hosting khác không?",
          answer: "Có! Chúng tôi hỗ trợ migrate miễn phí Laravel applications từ hosting khác, bao gồm transfer files, database, .env configuration, và setup queue workers. Team sẽ đảm bảo zero downtime và test kỹ trước khi chuyển DNS. Contact support để schedule migration."
        },
        {
          question: "Có hỗ trợ CI/CD pipelines cho automated deployment không?",
          answer: "Business tiers: Git integration + basic deployment hooks. Professional tiers: GitHub Actions, GitLab CI, Jenkins integration. Advanced/Enterprise: Custom CI/CD pipelines với automated testing, staging environments, blue-green deployments, và rollback capabilities. Support Docker, Kubernetes orchestration."
        }
      ]
    },
    {
      title: "🔄 Queue & Background Jobs",
      icon: Workflow,
      faqs: [
        {
          question: "Có hỗ trợ Laravel Horizon và Queue Workers không?",
          answer: "Business tiers trở lên hỗ trợ Queue Workers với Supervisor process manager. Professional tiers có Laravel Horizon dashboard với monitoring, failed job handling, và metrics. Enterprise tiers có custom queue infrastructure với multi-region workers và advanced orchestration."
        },
        {
          question: "SSH access có giới hạn gì không?",
          answer: "Starter tiers: SSH access cơ bản để chạy Artisan và Composer. Business/Professional: Full SSH với SFTP, Git hooks, và custom scripts. Advanced/Enterprise: Root access với audit logging, security hardening, và compliance tools. Tất cả tiers đều allow chạy artisan migrate, queue:work, schedule:run."
        }
      ]
    },
    {
      title: "💾 Database & Storage",
      icon: Database,
      faqs: [
        {
          question: "Chính sách backup cho Laravel applications như thế nào?",
          answer: "Starter tiers: Weekly backups. Business tiers: Daily backups. Professional tiers: Hourly backups. Advanced/Enterprise: Real-time backups + multi-region replication. Tất cả gói đều support JetBackup cho one-click restore cả database và files. Backup retention từ 7 đến 90 ngày tùy gói."
        },
        {
          question: "Tôi cần bao nhiêu resources cho Laravel app của mình?",
          answer: "Starter (0.5-1 vCore, 512MB-1.5GB RAM): Blog, portfolio, low-traffic apps. Business (2-3 vCores, 2-4GB RAM): Business websites, startups, moderate traffic. Professional (4-8 vCores, 6-12GB RAM): High-traffic apps, SaaS platforms. Advanced/Enterprise (10+ vCores, 16GB+ RAM): Large-scale apps, microservices, mission-critical systems. Contact sales để capacity planning."
        }
      ]
    },
    {
      title: "🌐 Server & Network",
      icon: Globe,
      faqs: [
        {
          question: "Server đặt ở đâu? Có ảnh hưởng latency không?",
          answer: "Servers đặt tại Vietnam data centers (Hà Nội, Hồ Chí Minh) với low latency cho users Việt Nam (< 20ms). Enterprise tiers support multi-region deployment (Singapore, Tokyo, USA) với global load balancing và CDN integration cho international traffic."
        },
        {
          question: "Có giới hạn băng thông hoặc traffic không?",
          answer: "Tất cả gói đều unlimited bandwidth cho HTTP/HTTPS traffic. Không giới hạn số lượng requests, API calls, hoặc database queries. Enterprise tiers có dedicated bandwidth và QoS policies để đảm bảo performance ổn định cho high-traffic applications."
        }
      ]
    },
    {
      title: "💰 Billing & Support",
      icon: HelpCircle,
      faqs: [
        {
          question: "Có thể nâng cấp hoặc hạ cấp gói hosting không?",
          answer: "Có thể upgrade/downgrade bất cứ lúc nào. Upgrade có hiệu lực ngay lập tức, downgrade áp dụng từ kỳ billing tiếp theo. Resources (CPU, RAM, Storage) và features (Redis, Queue workers, CI/CD) sẽ được điều chỉnh theo gói mới. Data được giữ nguyên 100%."
        },
        {
          question: "Chính sách hoàn tiền như thế nào?",
          answer: "30 ngày money-back guarantee cho tất cả gói. Nếu không hài lòng trong 30 ngày đầu, hoàn 100% phí đã trả, không cần lý do. Đối với Enterprise contracts, có thể negotiate custom SLA và refund terms tùy theo yêu cầu doanh nghiệp."
        }
      ]
    }
  ];

  const developerFeatures = [
    { icon: Terminal, label: "SSH Access", description: "Artisan commands" },
    { icon: GitBranch, label: "Git Integration", description: "Push to deploy" },
    { icon: Package, label: "Composer 2", description: "Fast installs" },
    { icon: Code, label: "PHP 8.3", description: "Latest features" }
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="page-hosting-laravel">
      <Header />

      {/* Hero Section - Laravel Themed */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${LARAVEL_RED}08 0%, white 50%, ${LARAVEL_RED}05 100%)` }} data-testid="section-hero">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full opacity-10" style={{ background: LARAVEL_RED }}></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 md:w-96 md:h-96 rounded-full opacity-10" style={{ background: LARAVEL_RED }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              {/* Laravel Optimized Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 rounded-full font-semibold text-white shadow-lg"
                  style={{ background: LARAVEL_RED }}
                  data-testid="badge-laravel-optimized"
                >
                  <Code2 className="w-5 h-5 mr-2" />
                  Laravel Optimized
                </motion.div>
                <Badge variant="outline" className="bg-white border-gray-300 text-gray-700" data-testid="badge-php-version">
                  PHP 8.1 - 8.3
                </Badge>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-testid="heading-hero">
                Hosting Laravel Chuyên Nghiệp – 
                <span style={{ color: LARAVEL_RED }}> Deploy Nhanh, Scale Dễ Dàng!</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed" data-testid="text-hero-description">
                Hosting được tối ưu hóa đặc biệt cho Laravel với SSH access, Composer, Git, 
                Redis cache, Queue workers (Horizon), và CI/CD integration. Từ 60K/tháng - 
                Phù hợp cho mọi quy mô từ startup đến enterprise.
              </p>

              {/* Developer Features Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" data-testid="grid-developer-features">
                {developerFeatures.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="bg-white rounded-lg p-3 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                    data-testid={`feature-badge-${idx}`}
                  >
                    <feature.icon className="w-5 h-5 mb-1" style={{ color: LARAVEL_RED }} />
                    <div className="font-semibold text-gray-900 text-sm">{feature.label}</div>
                    <div className="text-xs text-gray-500">{feature.description}</div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" data-testid="grid-stats">
                <div className="bg-white rounded-lg p-3 shadow-md text-center">
                  <div className="text-xl md:text-2xl font-bold" style={{ color: LARAVEL_RED }} data-testid="stat-response-time">&lt; 200ms</div>
                  <div className="text-xs text-gray-600">Response Time</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-md text-center">
                  <div className="text-xl md:text-2xl font-bold" style={{ color: LARAVEL_RED }} data-testid="stat-uptime">99.99%</div>
                  <div className="text-xs text-gray-600">Uptime</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-md text-center">
                  <div className="text-xl md:text-2xl font-bold" style={{ color: LARAVEL_RED }} data-testid="stat-support">24/7</div>
                  <div className="text-xs text-gray-600">Expert Support</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-md text-center">
                  <div className="text-xl md:text-2xl font-bold" style={{ color: LARAVEL_RED }} data-testid="stat-packages">18</div>
                  <div className="text-xs text-gray-600">Gói Hosting</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button 
                  size="lg"
                  className="px-6 py-5 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  style={{ background: LARAVEL_RED }}
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
                  className="px-6 py-5 text-base border-2"
                  style={{ borderColor: LARAVEL_RED, color: LARAVEL_RED }}
                  data-testid="button-contact"
                  onClick={() => window.location.href = '/contact'}
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600" data-testid="text-trial-info">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>14 ngày dùng thử miễn phí • Hoàn tiền 100% trong 30 ngày • 3,000+ Laravel developers tin dùng</span>
              </div>
            </motion.div>

            {/* Terminal Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2"
              data-testid="terminal-preview"
            >
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-4 md:p-6 text-green-400 font-mono text-xs md:text-sm overflow-hidden">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4 text-xs">Laravel Terminal @ STEP Hosting</span>
                </div>
                
                <div className="space-y-1 md:space-y-2 mb-4 md:mb-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <span className="text-blue-400">$</span> composer install --optimize-autoloader
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-gray-500">
                    Installing dependencies... Done!
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                    <span className="text-blue-400">$</span> php artisan migrate --force
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-gray-500">
                    Migrating: create_users_table... Done!
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
                    <span className="text-blue-400">$</span> php artisan horizon
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-gray-500">
                    Horizon started successfully...
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
                    <span className="text-green-500">✓</span> Laravel app deployed successfully!
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} className="text-purple-400">
                    🚀 App URL: https://your-app.step.com.vn
                  </motion.div>
                </div>

                {/* Performance metrics */}
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 2.9 }}
                  className="border-t border-gray-700 pt-3 md:pt-4"
                >
                  <div className="text-gray-400 text-xs mb-2">Performance Metrics:</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-800 rounded p-2">
                      <div className="text-gray-500">Response</div>
                      <div className="text-green-400 font-bold">145ms</div>
                    </div>
                    <div className="bg-gray-800 rounded p-2">
                      <div className="text-gray-500">Memory</div>
                      <div className="text-blue-400 font-bold">42 MB</div>
                    </div>
                    <div className="bg-gray-800 rounded p-2">
                      <div className="text-gray-500">Queue</div>
                      <div className="text-purple-400 font-bold">3 Active</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating badges */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-2 border hidden md:block"
                data-testid="badge-redis"
              >
                <div className="flex items-center text-xs">
                  <Database className="w-4 h-4 mr-1" style={{ color: LARAVEL_RED }} />
                  <span className="font-semibold">Redis Ready</span>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-2 border hidden md:block"
                data-testid="badge-horizon"
              >
                <div className="flex items-center text-xs">
                  <Monitor className="w-4 h-4 mr-1" style={{ color: LARAVEL_RED }} />
                  <span className="font-semibold">Horizon Support</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Features Section with Accordion Groups */}
      <section className="py-16 md:py-20 bg-gray-50" data-testid="section-technical-features">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="heading-technical-features">
              Tính Năng Kỹ Thuật Laravel Hosting
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" data-testid="text-technical-features-description">
              Tất cả công cụ và technologies cần thiết để phát triển và deploy Laravel applications chuyên nghiệp
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <Accordion type="multiple" className="space-y-4" data-testid="accordion-technical-features">
              {technicalFeatureGroups.map((group, groupIndex) => (
                <AccordionItem 
                  key={groupIndex} 
                  value={`group-${groupIndex}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden border-0"
                  data-testid={`accordion-item-${groupIndex}`}
                >
                  <AccordionTrigger className="px-6 py-5 hover:bg-gray-50 text-left" data-testid={`accordion-trigger-${groupIndex}`}>
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{group.title.split(' ')[0]}</span>
                      <span className="font-semibold text-lg text-gray-900">{group.title.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6" data-testid={`accordion-content-${groupIndex}`}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                          data-testid={`feature-card-${groupIndex}-${featureIndex}`}
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${LARAVEL_RED}15` }}>
                            <feature.icon className="w-5 h-5" style={{ color: LARAVEL_RED }} />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
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
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="heading-packages">
              18 Gói Laravel Hosting - Từ Startup Đến Enterprise
            </h2>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-packages-description">
              Lựa chọn gói hosting phù hợp với quy mô dự án Laravel của bạn
            </p>

            {/* Tier Tabs */}
            <Tabs value={selectedTier} onValueChange={setSelectedTier} className="w-full" data-testid="tabs-packages">
              <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-8" data-testid="tabs-list">
                {tiers.map((tier) => (
                  <TabsTrigger 
                    key={tier} 
                    value={tier}
                    className={`px-4 py-2 rounded-full border-2 transition-all data-[state=active]:text-white data-[state=active]:shadow-lg ${
                      tier === "all" 
                        ? "data-[state=active]:bg-gray-800 data-[state=active]:border-gray-800" 
                        : ""
                    }`}
                    style={selectedTier === tier && tier !== "all" ? { background: LARAVEL_RED, borderColor: LARAVEL_RED } : {}}
                    data-testid={`tab-${tier}`}
                  >
                    {tier === "all" ? "Tất Cả" : tier}
                    {tier !== "all" && (
                      <span className="ml-1 text-xs opacity-75">
                        ({packages.filter(p => p.tier === tier).length})
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto" data-testid="grid-packages">
                {getFilteredPackages().map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 relative border-2 ${
                      pkg.popular ? 'scale-105 z-10' : ''
                    } ${pkg.enterprise ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'border-gray-100'}`}
                    style={pkg.popular ? { borderColor: LARAVEL_RED } : {}}
                    data-testid={`package-card-${pkg.id}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg" style={{ background: LARAVEL_RED }} data-testid={`badge-popular-${pkg.id}`}>
                          ⭐ Phổ Biến Nhất
                        </span>
                      </div>
                    )}

                    {pkg.enterprise && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg" data-testid={`badge-enterprise-${pkg.id}`}>
                          👑 Enterprise
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-4 pt-2">
                      <Badge className={`mb-2 ${getTierColor(pkg.tier)}`} data-testid={`badge-tier-${pkg.id}`}>
                        {pkg.tier}
                      </Badge>
                      <h3 className={`text-xl font-bold mb-1 ${pkg.enterprise ? 'text-white' : 'text-gray-900'}`} data-testid={`text-package-name-${pkg.id}`}>
                        {pkg.name}
                      </h3>
                      <div className={`text-2xl md:text-3xl font-bold mb-1 ${pkg.enterprise ? 'text-yellow-400' : ''}`} style={!pkg.enterprise ? { color: LARAVEL_RED } : {}} data-testid={`text-package-price-${pkg.id}`}>
                        {pkg.price === "Custom" ? "Liên hệ" : `${pkg.price} VNĐ`}
                      </div>
                      {pkg.price !== "Custom" && (
                        <div className={`text-sm ${pkg.enterprise ? 'text-gray-400' : 'text-gray-500'}`}>
                          /tháng
                        </div>
                      )}
                    </div>

                    {/* Laravel Feature Badges */}
                    <div className="flex flex-wrap gap-1 mb-4 justify-center" data-testid={`feature-badges-${pkg.id}`}>
                      {pkg.features?.slice(0, 4).map((feature, fIdx) => (
                        <span 
                          key={fIdx} 
                          className={`text-xs px-2 py-0.5 rounded-full border ${getFeatureBadgeStyle(feature)}`}
                          data-testid={`feature-badge-${pkg.id}-${fIdx}`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-start">
                        <CheckCircle className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <span className="font-medium">{pkg.storage}</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <span>{pkg.cpu} • {pkg.ram}</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <span>{pkg.websites}</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <span>{pkg.ssh}</span>
                      </div>
                      {pkg.redis !== "Không" && (
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" style={{ color: LARAVEL_RED }} />
                          <span style={{ color: LARAVEL_RED }} className="font-medium">{pkg.redis}</span>
                        </div>
                      )}
                      {pkg.queue !== "Không" && (
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" style={{ color: LARAVEL_RED }} />
                          <span style={{ color: LARAVEL_RED }} className="font-medium">{pkg.queue}</span>
                        </div>
                      )}
                    </div>

                    <div className={`text-center mb-4 p-2 rounded-lg ${pkg.enterprise ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <p className={`text-xs ${pkg.enterprise ? 'text-gray-300' : 'text-gray-600'}`} data-testid={`text-suitable-${pkg.id}`}>
                        <strong className={pkg.enterprise ? 'text-white' : ''}>Phù hợp:</strong> {pkg.suitable}
                      </p>
                    </div>

                    <Button 
                      className={`w-full py-5 font-semibold ${
                        pkg.enterprise 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900'
                          : pkg.popular 
                            ? ''
                            : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                      style={pkg.popular && !pkg.enterprise ? { background: LARAVEL_RED } : {}}
                      data-testid={`button-select-${pkg.id}`}
                      onClick={() => window.location.href = '/contact'}
                    >
                      {pkg.enterprise ? 'Liên Hệ Tư Vấn' : 'Đăng Ký Ngay'}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {selectedTier === "all" && (
                <div className="text-center mt-10">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setSelectedTier("Business")}
                    className="border-2 px-8 py-5"
                    style={{ borderColor: LARAVEL_RED, color: LARAVEL_RED }}
                    data-testid="button-view-more-packages"
                  >
                    Xem Thêm Các Gói Hosting Khác
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Responsive Competitor Comparison */}
      <section className="py-16 md:py-20 bg-gray-50" data-testid="section-competitor-comparison">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="heading-comparison">
              So Sánh Laravel Hosting STEP Với Đối Thủ
            </h2>
            <p className="text-lg text-gray-600" data-testid="text-comparison-description">
              Tại sao Laravel developers chọn STEP?
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-xl overflow-hidden" data-testid="comparison-table-desktop">
              <table className="w-full">
                <thead style={{ background: `linear-gradient(135deg, ${LARAVEL_RED} 0%, #e53e3e 100%)` }}>
                  <tr className="text-white">
                    <th className="py-4 px-6 text-left text-lg font-semibold">Tính Năng</th>
                    <th className="py-4 px-6 text-center text-lg font-semibold">
                      <div className="flex items-center justify-center">
                        <Award className="w-5 h-5 mr-2" />
                        STEP Laravel Hosting
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-lg font-semibold text-white/80">Đối Thủ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {competitorComparison.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`hover:bg-gray-50 ${item.highlight ? 'bg-red-50/50' : ''}`}
                      data-testid={`comparison-row-${index}`}
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {item.highlight && <span className="text-lg mr-2">⚡</span>}
                        {item.metric}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          item.highlight ? 'text-white' : 'bg-green-100 text-green-800'
                        }`} style={item.highlight ? { background: LARAVEL_RED } : {}}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {item.step}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-gray-500 text-sm">
                        {item.competitor}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4" data-testid="comparison-cards-mobile">
              {competitorComparison.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-lg shadow-md p-4 ${item.highlight ? 'ring-2 ring-[#FF2D20]' : ''}`}
                  data-testid={`comparison-card-${index}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">
                      {item.highlight && <span className="text-lg mr-1">⚡</span>}
                      {item.metric}
                    </span>
                    {item.highlight && (
                      <Badge className="text-white text-xs" style={{ background: LARAVEL_RED }}>Laravel Key</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">STEP</div>
                      <div className="text-sm font-semibold text-green-700">{item.step}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">Đối Thủ</div>
                      <div className="text-sm text-gray-600">{item.competitor}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developer Testimonials */}
      <section className="py-16 md:py-20 bg-white" data-testid="section-testimonials">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="heading-testimonials">
              Laravel Developers Nói Gì Về STEP?
            </h2>
            <p className="text-lg text-gray-600" data-testid="text-testimonials-description">
              Hơn 3,000+ Laravel developers tin dùng STEP Hosting
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
                className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative"
                data-testid={`testimonial-card-${index}`}
              >
                {/* Highlight Badge */}
                <div className="absolute -top-3 right-4">
                  <Badge className="text-white text-xs" style={{ background: LARAVEL_RED }} data-testid={`testimonial-badge-${index}`}>
                    {testimonial.highlight}
                  </Badge>
                </div>

                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 text-sm italic leading-relaxed" data-testid={`testimonial-text-${index}`}>
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section Grouped by Topic */}
      <section className="py-16 md:py-20 bg-gray-50" data-testid="section-faq">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="heading-faq">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg text-gray-600" data-testid="text-faq-description">
              Giải đáp mọi thắc mắc về Laravel Hosting
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqGroups.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                viewport={{ once: true }}
                data-testid={`faq-group-${groupIndex}`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{group.title.split(' ')[0]}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{group.title.split(' ').slice(1).join(' ')}</h3>
                </div>
                <Accordion type="single" collapsible className="space-y-3" data-testid={`faq-accordion-${groupIndex}`}>
                  {group.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`faq-${groupIndex}-${faqIndex}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden border-0"
                      data-testid={`faq-item-${groupIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 text-left font-medium text-gray-900 text-sm md:text-base" data-testid={`faq-trigger-${groupIndex}-${faqIndex}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-gray-600 text-sm leading-relaxed" data-testid={`faq-content-${groupIndex}-${faqIndex}`}>
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
      <section className="py-16 md:py-20" style={{ background: `linear-gradient(135deg, ${LARAVEL_RED} 0%, #c53030 100%)` }} data-testid="section-cta">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-testid="heading-cta">
              Sẵn Sàng Deploy Laravel App Của Bạn?
            </h2>
            <p className="text-lg md:text-xl text-red-100 mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
              Bắt đầu với 14 ngày dùng thử miễn phí. Không cần thẻ tín dụng. 
              Hoàn tiền 100% trong 30 ngày nếu không hài lòng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white hover:bg-gray-100 px-8 py-6 text-base font-semibold shadow-lg"
                style={{ color: LARAVEL_RED }}
                data-testid="button-cta-register"
                onClick={() => window.location.href = '/contact'}
              >
                Đăng Ký Ngay - Miễn Phí 14 Ngày
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white px-8 py-6 text-base font-semibold"
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
