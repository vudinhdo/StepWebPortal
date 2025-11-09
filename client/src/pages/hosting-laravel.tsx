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
  Cpu
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HostingLaravel() {
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [compareView, setCompareView] = useState(false);

  // 18 Laravel Hosting Packages - From Starter to Enterprise
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
      suitable: "Blog cá nhân/Portfolio đơn giản"
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
      suitable: "Dev thử nghiệm/Personal Project"
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
      suitable: "Freelancer/Small Projects"
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
      popular: true
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
      suitable: "SME/Agency Projects"
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
      suitable: "Multiple Projects/Agency"
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
      suitable: "Developer Teams/High-traffic Apps"
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
      suitable: "Production Apps/SaaS Platform"
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
      suitable: "Enterprise Development Teams"
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
      suitable: "Large Organizations/Multi-brand"
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
      suitable: "SaaS Platforms/High-traffic"
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
      suitable: "Enterprise/Mission-critical Apps"
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
      suitable: "Large Corporations/Financial"
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
      suitable: "Multi-national Corps/E-commerce"
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
      suitable: "Banking/Healthcare/Government"
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
      suitable: "Global SaaS/Fintech"
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
      suitable: "Fortune 500/Critical Infrastructure"
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
      enterprise: true
    }
  ];

  const displayedPackages = showAllPackages ? packages : packages.slice(0, 6);

  // Technical Features specific to Laravel
  const technicalFeatures = [
    {
      icon: Code2,
      title: "PHP 8.1+ Support",
      description: "Hỗ trợ đầy đủ PHP 8.1, 8.2, 8.3 với JIT compiler, typed properties, và performance improvements. Tương thích hoàn hảo với Laravel 9, 10, 11."
    },
    {
      icon: Package,
      title: "Composer & Dependencies",
      description: "Composer 2 pre-installed, hỗ trợ private repositories, package caching để install dependencies nhanh chóng. Compatible với Packagist và custom registries."
    },
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
      icon: Database,
      title: "Redis & Memcached",
      description: "Redis cache server cho session storage, query caching, và Laravel Horizon. Memcached support cho distributed caching systems với high availability."
    },
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
      icon: Cloud,
      title: "NVMe SSD Storage",
      description: "High-performance NVMe SSD storage với tốc độ đọc/ghi vượt trội. Ideal cho Laravel applications với large file storage và media management."
    },
    {
      icon: Shield,
      title: "Security & Firewall",
      description: "Imunify360 protection, ModSecurity WAF, DDoS mitigation, malware scanning, và SSL certificates. Secure .env file management và secrets protection."
    },
    {
      icon: Zap,
      title: "LiteSpeed Web Server",
      description: "LiteSpeed LSAPI cho PHP, HTTP/3 support, built-in caching, và performance optimization. Nhanh hơn Apache/Nginx cho Laravel applications."
    },
    {
      icon: RefreshCw,
      title: "Auto Backup & Recovery",
      description: "Automated daily/hourly backups, JetBackup integration, point-in-time recovery, và off-site storage. One-click restore cho database và files."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Expert Support",
      description: "Laravel-savvy support team 24/7 qua chat, phone, email. Priority support cho production issues, deployment assistance, và performance tuning."
    }
  ];

  // Competitor Comparison
  const competitorComparison = [
    { metric: "Response Time", step: "< 200ms (avg)", competitor: "500ms - 2s" },
    { metric: "Uptime SLA", step: "99.99% - 99.999%", competitor: "99.5% - 99.9%" },
    { metric: "SSH/Git Access", step: "Full SSH + Git Integration", competitor: "Limited or No SSH" },
    { metric: "Queue Workers", step: "Horizon + Supervisor", competitor: "Basic Queue Only" },
    { metric: "CI/CD Support", step: "GitHub Actions + Jenkins", competitor: "Manual Deployment" },
    { metric: "Backup Frequency", step: "Hourly + Real-time", competitor: "Daily or Weekly" },
    { metric: "PHP Versions", step: "Multi-version 8.1-8.3", competitor: "Single PHP version" },
    { metric: "Support Quality", step: "Laravel Experts 24/7", competitor: "General Support" }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Anh Tuấn Anh",
      role: "Senior Laravel Developer",
      company: "Tech Startup Hà Nội",
      rating: 5,
      text: "SSH access và Git integration giúp tôi deploy Laravel app chỉ trong vài phút. Redis cache làm app nhanh hơn hẳn so với hosting cũ. Support team hiểu rõ Laravel, giúp optimize database queries rất tốt!",
      avatar: "👨‍💻"
    },
    {
      name: "Chị Minh Hương",
      role: "Full-stack Developer",
      company: "Agency Hồ Chí Minh",
      rating: 5,
      text: "Horizon dashboard hoạt động mượt mà, queue workers xử lý email và jobs cực ổn định. CI/CD pipeline tự động deploy khi push code lên GitHub - tiết kiệm thời gian deployment đáng kể cho team chúng tôi!",
      avatar: "👩‍💻"
    },
    {
      name: "Anh Đức Minh",
      role: "DevOps Engineer",
      company: "E-commerce Platform",
      rating: 5,
      text: "Performance vượt trội với NVMe SSD và LiteSpeed server. Composer install nhanh, artisan migrate smooth. Backup tự động giúp yên tâm khi làm việc với production database. Highly recommended cho Laravel developers!",
      avatar: "🚀"
    }
  ];

  // FAQ
  const faqs = [
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
      question: "Có thể nâng cấp hoặc hạ cấp gói hosting không?",
      answer: "Có thể upgrade/downgrade bất cứ lúc nào. Upgrade có hiệu lực ngay lập tức, downgrade áp dụng từ kỳ billing tiếp theo. Resources (CPU, RAM, Storage) và features (Redis, Queue workers, CI/CD) sẽ được điều chỉnh theo gói mới. Data được giữ nguyên 100%."
    },
    {
      question: "Chính sách backup cho Laravel applications như thế nào?",
      answer: "Starter tiers: Weekly backups. Business tiers: Daily backups. Professional tiers: Hourly backups. Advanced/Enterprise: Real-time backups + multi-region replication. Tất cả gói đều support JetBackup cho one-click restore cả database và files. Backup retention từ 7 đến 90 ngày tùy gói."
    },
    {
      question: "Có hỗ trợ Laravel Horizon và Queue Workers không?",
      answer: "Business tiers trở lên hỗ trợ Queue Workers với Supervisor process manager. Professional tiers có Laravel Horizon dashboard với monitoring, failed job handling, và metrics. Enterprise tiers có custom queue infrastructure với multi-region workers và advanced orchestration."
    },
    {
      question: "SSH access có giới hạn gì không?",
      answer: "Starter tiers: SSH access cơ bản để chạy Artisan và Composer. Business/Professional: Full SSH với SFTP, Git hooks, và custom scripts. Advanced/Enterprise: Root access với audit logging, security hardening, và compliance tools. Tất cả tiers đều allow chạy artisan migrate, queue:work, schedule:run."
    },
    {
      question: "Server đặt ở đâu? Có ảnh hưởng latency không?",
      answer: "Servers đặt tại Vietnam data centers (Hà Nội, Hồ Chí Minh) với low latency cho users Việt Nam (< 20ms). Enterprise tiers support multi-region deployment (Singapore, Tokyo, USA) với global load balancing và CDN integration cho international traffic."
    },
    {
      question: "Có giới hạn băng thông hoặc traffic không?",
      answer: "Tất cả gói đều unlimited bandwidth cho HTTP/HTTPS traffic. Không giới hạn số lượng requests, API calls, hoặc database queries. Enterprise tiers có dedicated bandwidth và QoS policies để đảm bảo performance ổn định cho high-traffic applications."
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer: "30 ngày money-back guarantee cho tất cả gói. Nếu không hài lòng trong 30 ngày đầu, hoàn 100% phí đã trả, không cần lý do. Đối với Enterprise contracts, có thể negotiate custom SLA và refund terms tùy theo yêu cầu doanh nghiệp."
    },
    {
      question: "Có hỗ trợ CI/CD pipelines cho automated deployment không?",
      answer: "Business tiers: Git integration + basic deployment hooks. Professional tiers: GitHub Actions, GitLab CI, Jenkins integration. Advanced/Enterprise: Custom CI/CD pipelines với automated testing, staging environments, blue-green deployments, và rollback capabilities. Support Docker, Kubernetes orchestration."
    },
    {
      question: "Tôi cần bao nhiêu resources cho Laravel app của mình?",
      answer: "Starter (0.5-1 vCore, 512MB-1.5GB RAM): Blog, portfolio, low-traffic apps. Business (2-3 vCores, 2-4GB RAM): Business websites, startups, moderate traffic. Professional (4-8 vCores, 6-12GB RAM): High-traffic apps, SaaS platforms. Advanced/Enterprise (10+ vCores, 16GB+ RAM): Large-scale apps, microservices, mission-critical systems. Contact sales để capacity planning."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                  <Code2 className="text-white w-6 h-6" />
                </div>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Laravel Framework Hosting
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Hosting Laravel Chuyên Nghiệp – 
                <span className="text-red-500"> Deploy Nhanh, Scale Dễ Dàng!</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Hosting được tối ưu hóa đặc biệt cho Laravel với SSH access, Composer, Git, 
                Redis cache, Queue workers (Horizon), và CI/CD integration. Từ 60K/tháng - 
                Phù hợp cho mọi quy mô từ startup đến enterprise.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-red-500">&lt; 200ms</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-red-500">99.99%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-red-500">24/7</div>
                  <div className="text-sm text-gray-600">Expert Support</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-red-500">18</div>
                  <div className="text-sm text-gray-600">Gói Hosting</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 px-8 py-6 text-lg font-semibold"
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
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-6 text-lg"
                  data-testid="button-contact"
                  onClick={() => window.location.href = '/contact'}
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>14 ngày dùng thử miễn phí • Hoàn tiền 100% trong 30 ngày • 3,000+ Laravel developers tin dùng</span>
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
                  <span className="text-gray-400 ml-4">Laravel Terminal</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div><span className="text-blue-400">$</span> composer install</div>
                  <div className="text-gray-500">Installing dependencies...</div>
                  <div><span className="text-blue-400">$</span> php artisan migrate</div>
                  <div className="text-gray-500">Migrating: 2024_01_01_create_users_table</div>
                  <div><span className="text-blue-400">$</span> php artisan queue:work</div>
                  <div className="text-gray-500">Processing jobs...</div>
                  <div><span className="text-green-500">✓</span> Laravel app deployed successfully!</div>
                  <div className="text-purple-400">App URL: https://your-app.step.com.vn</div>
                </div>

                {/* Performance metrics */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="text-gray-400 text-xs mb-2">Performance Metrics:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Response Time:</span>
                      <span className="text-green-400">145ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Memory Usage:</span>
                      <span className="text-blue-400">42 MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Queue Workers:</span>
                      <span className="text-purple-400">Active (3)</span>
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
              Tính Năng Kỹ Thuật Laravel Hosting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tất cả công cụ và technologies cần thiết để phát triển và deploy Laravel applications chuyên nghiệp
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
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
              18 Gói Laravel Hosting - Từ Startup Đến Enterprise
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Lựa chọn gói hosting phù hợp với quy mô dự án Laravel của bạn
            </p>

            {/* View Toggle */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={!compareView ? "default" : "outline"}
                onClick={() => setCompareView(false)}
                className={!compareView ? "bg-red-500 hover:bg-red-600" : ""}
                data-testid="button-grid-view"
              >
                <Server className="w-4 h-4 mr-2" />
                Xem Dạng Cards
              </Button>
              <Button
                variant={compareView ? "default" : "outline"}
                onClick={() => setCompareView(true)}
                className={compareView ? "bg-red-500 hover:bg-red-600" : ""}
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
                      pkg.popular ? 'ring-2 ring-red-500 scale-105' : ''
                    } ${pkg.enterprise ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : ''}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
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
                      <div className={`text-3xl font-bold mb-2 ${pkg.enterprise ? 'text-yellow-400' : 'text-red-500'}`}>
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
                        <div className="text-sm">{pkg.ssh}</div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${pkg.enterprise ? 'text-yellow-400' : 'text-green-500'}`} />
                        <div className="text-sm">{pkg.git}</div>
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
                            ? 'bg-red-500 hover:bg-red-600'
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
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-6"
                    data-testid="button-show-all"
                  >
                    Xem Thêm 12 Gói Laravel Hosting
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
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-6"
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
                    <thead className="bg-red-500 sticky top-0 z-10">
                      <tr>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Gói</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Giá/tháng</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Storage</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">CPU/RAM</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Laravel Apps</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Database</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">SSH/Git</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Redis/Queue</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Backup</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">Support</th>
                        <th className="py-4 px-6 text-center text-sm font-semibold text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {packages.map((pkg, index) => (
                        <tr 
                          key={pkg.id} 
                          className={`hover:bg-gray-50 ${pkg.popular ? 'bg-red-50' : ''} ${pkg.enterprise ? 'bg-yellow-50' : ''}`}
                        >
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="font-semibold text-gray-900">{pkg.name}</div>
                                <div className="text-xs text-gray-500">{pkg.tier}</div>
                              </div>
                              {pkg.popular && <span className="ml-2 text-red-500">⭐</span>}
                              {pkg.enterprise && <span className="ml-2">👑</span>}
                            </div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div className="font-bold text-red-500">
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
                            <div>{pkg.ssh}</div>
                            <div className="text-xs text-gray-500">{pkg.git}</div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                            <div>{pkg.redis}</div>
                            <div className="text-xs text-gray-500">{pkg.queue}</div>
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
                              className={pkg.enterprise ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600'}
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
              So Sánh Laravel Hosting STEP Với Đối Thủ
            </h2>
            <p className="text-xl text-gray-600">
              Tại sao Laravel developers chọn STEP?
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left text-lg font-semibold">Tính Năng</th>
                    <th className="py-4 px-6 text-center text-lg font-semibold">
                      STEP Laravel Hosting
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
              Laravel Developers Nói Gì Về STEP?
            </h2>
            <p className="text-xl text-gray-600">
              Hơn 3,000+ Laravel developers tin dùng STEP Hosting
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
              Giải đáp mọi thắc mắc về Laravel Hosting
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
      <section className="py-20 bg-gradient-to-br from-red-500 to-red-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Sẵn Sàng Deploy Laravel App Của Bạn?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Bắt đầu với 14 ngày dùng thử miễn phí. Không cần thẻ tín dụng. 
              Hoàn tiền 100% trong 30 ngày nếu không hài lòng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-red-500 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                data-testid="button-cta-register"
                onClick={() => window.location.href = '/contact'}
              >
                Đăng Ký Ngay - Miễn Phí 14 Ngày
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-500 px-8 py-6 text-lg font-semibold"
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
