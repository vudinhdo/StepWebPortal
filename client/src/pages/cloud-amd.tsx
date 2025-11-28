import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  Shield, 
  Server, 
  Check,
  ChevronRight,
  Phone,
  ArrowRight,
  Clock,
  Globe,
  Database,
  HardDrive,
  Users,
  Gauge,
  TrendingUp,
  CheckCircle,
  Star,
  BarChart3,
  Layers,
  Network,
  Lock,
  Headphones,
  Settings,
  Play,
  Target,
  Award,
  Flame,
  Sparkles,
  MonitorSmartphone,
  Scale,
  BatteryCharging,
  Thermometer
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServerConfigurator from "@/components/server-configurator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AMD_RED = "#ED1C24";
const AMD_RED_DARK = "#B91C1C";

export default function CloudAMD() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    useCase: '',
    package: ''
  });
  const { toast } = useToast();

  const amdAdvantages = [
    {
      icon: Cpu,
      title: "Nhiều Cores Hơn, Giá Tốt Hơn",
      description: "AMD EPYC cung cấp tới 128 cores/socket, nhiều hơn 2x so với Intel - lý tưởng cho multi-threaded workloads",
      highlight: "128 Cores/Socket"
    },
    {
      icon: Zap,
      title: "Hiệu Năng/Giá Vượt Trội",
      description: "Giá thành thấp hơn 20-30% so với Intel tương đương, performance per dollar tốt nhất thị trường",
      highlight: "Tiết kiệm 30%"
    },
    {
      icon: BatteryCharging,
      title: "Tiết Kiệm Điện Năng",
      description: "Công nghệ 7nm/5nm tiên tiến giúp giảm 40% điện năng tiêu thụ so với thế hệ trước",
      highlight: "Giảm 40% điện"
    },
    {
      icon: HardDrive,
      title: "Băng Thông Memory Cao",
      description: "Hỗ trợ DDR5-4800 với 12 channels, băng thông memory lên đến 460GB/s",
      highlight: "460GB/s bandwidth"
    },
    {
      icon: Shield,
      title: "Bảo Mật Silicon Level",
      description: "AMD SEV (Secure Encrypted Virtualization) mã hóa VM memory, bảo vệ dữ liệu ngay cả khi hypervisor bị xâm nhập",
      highlight: "AMD SEV Security"
    },
    {
      icon: Scale,
      title: "PCIe Gen 5 Ready",
      description: "Hỗ trợ 128 lanes PCIe Gen 5, sẵn sàng cho NVMe tốc độ cao và GPU mới nhất",
      highlight: "128 PCIe 5.0 lanes"
    }
  ];

  const packages = [
    {
      name: "AMD Starter",
      processor: "EPYC 7313",
      cores: "16 Cores / 32 Threads",
      price: "1.800.000",
      priceUnit: "VNĐ/tháng",
      suitable: "Website, ứng dụng web nhỏ-vừa",
      popular: false,
      specs: {
        cpu: "AMD EPYC 7313 3.0GHz",
        ram: "32GB DDR4 ECC",
        ssd: "250GB NVMe Gen4",
        bandwidth: "Unlimited"
      },
      features: [
        "16 Cores / 32 Threads",
        "32GB DDR4 ECC RAM",
        "250GB NVMe Gen4 SSD",
        "Bandwidth không giới hạn",
        "AMD SEV encryption",
        "IPv4 + IPv6",
        "Backup hàng tuần",
        "Support 24/7"
      ]
    },
    {
      name: "AMD Pro",
      processor: "EPYC 7443",
      cores: "24 Cores / 48 Threads",
      price: "3.500.000",
      priceUnit: "VNĐ/tháng",
      suitable: "Database, ERP, CRM, e-Commerce",
      popular: true,
      specs: {
        cpu: "AMD EPYC 7443 2.85GHz",
        ram: "64GB DDR4 ECC",
        ssd: "500GB NVMe Gen4",
        bandwidth: "Unlimited"
      },
      features: [
        "24 Cores / 48 Threads",
        "64GB DDR4 ECC RAM",
        "500GB NVMe Gen4 SSD",
        "Bandwidth không giới hạn",
        "AMD SEV + SME",
        "Dedicated IPv4",
        "Backup hàng ngày",
        "Priority support",
        "Free migration"
      ]
    },
    {
      name: "AMD Enterprise",
      processor: "EPYC 7543",
      cores: "32 Cores / 64 Threads",
      price: "6.500.000",
      priceUnit: "VNĐ/tháng",
      suitable: "Big Data, AI inference, High-traffic apps",
      popular: false,
      specs: {
        cpu: "AMD EPYC 7543 2.8GHz",
        ram: "128GB DDR4 ECC",
        ssd: "1TB NVMe Gen4",
        bandwidth: "Unlimited"
      },
      features: [
        "32 Cores / 64 Threads",
        "128GB DDR4 ECC RAM",
        "1TB NVMe Gen4 SSD",
        "Bandwidth không giới hạn",
        "Full AMD security suite",
        "Multiple IPv4 + IPv6",
        "Snapshot & backup",
        "Dedicated support manager",
        "SLA 99.99%"
      ]
    },
    {
      name: "AMD Ultra",
      processor: "EPYC 9654",
      cores: "96 Cores / 192 Threads",
      price: "15.000.000",
      priceUnit: "VNĐ/tháng",
      suitable: "HPC, AI Training, Scientific Computing",
      popular: false,
      specs: {
        cpu: "AMD EPYC 9654 2.4GHz (Zen 4)",
        ram: "256GB DDR5 ECC",
        ssd: "2TB NVMe Gen5",
        bandwidth: "10Gbps"
      },
      features: [
        "96 Cores / 192 Threads",
        "256GB DDR5 ECC RAM",
        "2TB NVMe Gen5 SSD",
        "10Gbps network",
        "AMD Infinity Guard",
        "PCIe Gen 5 x128 lanes",
        "NVLink GPU ready",
        "Dedicated engineer",
        "Custom configurations"
      ]
    }
  ];

  const useCases = [
    {
      icon: Database,
      title: "Database & Analytics",
      description: "AMD EPYC với nhiều cores xử lý song song tối ưu cho PostgreSQL, MySQL, MongoDB và các hệ thống analytics lớn",
      benefits: ["Multi-threaded queries", "In-memory processing", "Real-time analytics"]
    },
    {
      icon: Server,
      title: "Virtualization & Containers",
      description: "Chạy nhiều VMs và containers hơn trên cùng hardware nhờ high core count và AMD SEV encryption",
      benefits: ["VMware, Proxmox, KVM", "Docker, Kubernetes", "Secure multi-tenancy"]
    },
    {
      icon: BarChart3,
      title: "Big Data & HPC",
      description: "Xử lý dữ liệu lớn, machine learning inference với băng thông memory cao và PCIe lanes dồi dào",
      benefits: ["Hadoop, Spark clusters", "ML inference at scale", "Scientific computing"]
    },
    {
      icon: Globe,
      title: "Web Applications",
      description: "Chạy multiple web servers, load balancing và high-traffic applications với hiệu năng ổn định",
      benefits: ["High concurrency", "Low latency", "Cost-effective scaling"]
    }
  ];

  const comparisons = [
    { feature: "Max Cores/Socket", amd: "128 cores", intel: "60 cores", winner: "amd" },
    { feature: "Giá thành (cùng cấu hình)", amd: "Thấp hơn 20-30%", intel: "Cao hơn", winner: "amd" },
    { feature: "Memory Channels", amd: "12 channels", intel: "8 channels", winner: "amd" },
    { feature: "PCIe Lanes", amd: "128 lanes PCIe 5.0", intel: "80 lanes PCIe 5.0", winner: "amd" },
    { feature: "Memory Encryption", amd: "AMD SEV (SME, SEV, SEV-ES, SEV-SNP)", intel: "Intel TME/MKTME", winner: "amd" },
    { feature: "Single-thread Performance", amd: "Rất tốt", intel: "Tốt hơn một chút", winner: "intel" },
    { feature: "Ecosystem & Compatibility", amd: "Tốt", intel: "Rộng hơn", winner: "intel" }
  ];

  const faqs = [
    {
      question: "AMD EPYC khác gì so với Intel Xeon?",
      answer: "AMD EPYC cung cấp nhiều cores hơn (lên đến 128 cores vs 60 cores), nhiều PCIe lanes hơn, và giá thành per-core thấp hơn 20-30%. Intel Xeon có thể nhỉnh hơn một chút về single-thread performance nhưng AMD vượt trội về multi-threaded workloads và value."
    },
    {
      question: "AMD SEV là gì và tại sao quan trọng?",
      answer: "AMD SEV (Secure Encrypted Virtualization) là công nghệ bảo mật silicon-level mã hóa memory của mỗi VM riêng biệt. Ngay cả hypervisor hoặc admin cũng không thể đọc được dữ liệu trong VM, đảm bảo privacy tuyệt đối cho các workload nhạy cảm."
    },
    {
      question: "Cloud AMD phù hợp với những ứng dụng nào?",
      answer: "AMD EPYC tối ưu cho: Database clusters (PostgreSQL, MySQL, MongoDB), Virtualization (nhiều VMs trên cùng host), Big Data/Analytics, Web servers với high concurrency, CI/CD pipelines, và các ứng dụng multi-threaded nói chung."
    },
    {
      question: "Có thể migrate từ Intel sang AMD dễ dàng không?",
      answer: "Có! Hầu hết các ứng dụng và OS đều tương thích với cả Intel và AMD x86-64. STEP hỗ trợ migration miễn phí, kiểm tra compatibility và tối ưu performance sau khi chuyển đổi."
    },
    {
      question: "SLA và support như thế nào?",
      answer: "Tất cả gói Cloud AMD đều có SLA 99.9%+ uptime (gói Enterprise/Ultra đạt 99.99%), support 24/7 qua hotline và ticket, response time từ 15 phút đến 2 giờ tùy mức độ ưu tiên."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Cloud AMD - Công ty: ${formData.company}, Use case: ${formData.useCase}, Gói: ${formData.package}`
        })
      });

      if (!response.ok) throw new Error("Failed");

      toast({
        title: "Gửi thông tin thành công!",
        description: "Chuyên gia Cloud AMD sẽ liên hệ trong 2 giờ tới.",
      });

      setFormData({ name: '', email: '', phone: '', company: '', useCase: '', package: '' });
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại hoặc liên hệ 0985.636.289",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - AMD Branding với màu đỏ chính thức */}
      <section className="relative pt-20 pb-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a0000 30%, #2d0a0a 50%, #1a0000 70%, #000000 100%)' }}>
        {/* AMD Arrow Pattern Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="0,0 100,0 100,100" fill={AMD_RED} />
            </svg>
          </div>
          <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="0,100 100,0 100,100" fill={AMD_RED} />
            </svg>
          </div>
          <div className="absolute top-40 left-20 w-96 h-96 rounded-full blur-[150px] animate-pulse" style={{ backgroundColor: `${AMD_RED}30` }} />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-[120px] animate-pulse" style={{ backgroundColor: `${AMD_RED}20`, animationDelay: '1s' }} />
        </div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(237,28,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(237,28,36,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* AMD Badge - Official Style */}
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg" style={{ backgroundColor: AMD_RED }}>
                    <span className="text-white font-black text-xl tracking-tight">AMD</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-lg">EPYC™ Powered</span>
                  <span className="text-gray-400 text-sm">Official Cloud Partner</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
                Cloud Server{" "}
                <span style={{ color: AMD_RED }}>AMD</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Sức mạnh <span className="font-bold text-white">AMD EPYC</span> với nhiều cores hơn, 
                giá tốt hơn - lý tưởng cho database, virtualization và workload đòi hỏi hiệu năng cao.
              </p>
              
              {/* AMD Key Benefits */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl border border-[#ED1C24]/30 bg-[#ED1C24]/10" data-testid="badge-cores">
                  <div className="text-2xl font-black text-white mb-1">128</div>
                  <div className="text-xs text-gray-400">Cores/Socket</div>
                </div>
                <div className="text-center p-4 rounded-xl border border-[#ED1C24]/30 bg-[#ED1C24]/10" data-testid="badge-savings">
                  <div className="text-2xl font-black text-white mb-1">30%</div>
                  <div className="text-xs text-gray-400">Tiết Kiệm</div>
                </div>
                <div className="text-center p-4 rounded-xl border border-[#ED1C24]/30 bg-[#ED1C24]/10" data-testid="badge-sla">
                  <div className="text-2xl font-black text-white mb-1">99.99%</div>
                  <div className="text-xs text-gray-400">Uptime SLA</div>
                </div>
              </div>

              {/* AMD Tech Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['EPYC Genoa', 'Zen 4', 'DDR5', 'PCIe 5.0', 'AMD SEV'].map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{ borderColor: `${AMD_RED}50`, color: AMD_RED, backgroundColor: `${AMD_RED}10` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-105"
                  style={{ backgroundColor: AMD_RED, boxShadow: `0 10px 40px ${AMD_RED}40` }}
                  onClick={() => document.getElementById('amd-packages')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-view-packages"
                >
                  <Cpu className="mr-2 w-5 h-5" />
                  Xem Gói AMD Cloud
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-contact"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Hotline: 0985.636.289
                </Button>
              </div>
            </motion.div>

            {/* AMD Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-[#ED1C24]/30 shadow-2xl overflow-hidden">
                {/* AMD Arrow Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-32 h-32 rotate-45" style={{ backgroundColor: AMD_RED }} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg" style={{ backgroundColor: AMD_RED }}>
                      <span className="text-white font-black text-sm">AMD</span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">EPYC™ Advantage</div>
                      <div className="text-gray-400 text-sm">So sánh với Intel Xeon</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Số cores tối đa", value: "+113%", subtext: "128 vs 60 cores" },
                      { label: "Chi phí per-core", value: "-30%", subtext: "Tiết kiệm đáng kể" },
                      { label: "PCIe Lanes", value: "+60%", subtext: "128 vs 80 lanes" },
                      { label: "Memory Channels", value: "+50%", subtext: "12 vs 8 channels" }
                    ].map((stat, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10" data-testid={`stat-comparison-${idx}`}>
                        <div>
                          <div className="text-gray-400 text-sm">{stat.label}</div>
                          <div className="text-gray-500 text-xs">{stat.subtext}</div>
                        </div>
                        <div className="text-2xl font-black" style={{ color: AMD_RED }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-[#ED1C24]/10 border border-[#ED1C24]/30">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8" style={{ color: AMD_RED }} />
                      <div>
                        <div className="font-bold text-white">Best Performance per Dollar</div>
                        <div className="text-gray-400 text-sm">Tối ưu cho multi-threaded workloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom AMD Arrow */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1440 60" className="w-full h-full" preserveAspectRatio="none">
            <polygon points="0,60 720,0 1440,60" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* AMD Advantages Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: `${AMD_RED}15`, color: AMD_RED }}>
              <Cpu className="w-4 h-4" />
              <span className="font-semibold text-sm">AMD EPYC Technology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Tại Sao Chọn <span style={{ color: AMD_RED }}>AMD</span> Cloud?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              AMD EPYC mang lại lợi thế vượt trội về cores, performance/dollar và công nghệ bảo mật
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amdAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-[#ED1C24]/30"
                data-testid={`advantage-card-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: AMD_RED }}
                  >
                    <advantage.icon className="text-white w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {advantage.description}
                    </p>
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: `${AMD_RED}15`, color: AMD_RED }}
                    >
                      {advantage.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AMD vs Intel Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              <span style={{ color: AMD_RED }}>AMD EPYC</span> vs Intel Xeon
            </h2>
            <p className="text-lg text-gray-600">
              So sánh chi tiết giữa hai nền tảng server hàng đầu
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
            data-testid="comparison-table"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#1a1a1a' }} className="text-white">
                    <th className="px-6 py-4 text-left font-bold">Tiêu Chí</th>
                    <th className="px-6 py-4 text-center font-bold">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: AMD_RED }} />
                        AMD EPYC
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-bold">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-500" />
                        Intel Xeon
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                      <td className={`px-6 py-4 text-center ${row.winner === 'amd' ? 'bg-[#ED1C24]/10' : ''}`}>
                        <div className="flex items-center justify-center gap-2">
                          {row.winner === 'amd' && <CheckCircle className="w-5 h-5" style={{ color: AMD_RED }} />}
                          <span className={row.winner === 'amd' ? 'font-bold' : 'text-gray-600'} style={row.winner === 'amd' ? { color: AMD_RED } : {}}>
                            {row.amd}
                          </span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-center ${row.winner === 'intel' ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-center justify-center gap-2">
                          {row.winner === 'intel' && <CheckCircle className="w-5 h-5 text-blue-500" />}
                          <span className={row.winner === 'intel' ? 'font-bold text-blue-700' : 'text-gray-600'}>{row.intel}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases - AMD Dark Theme */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ứng Dụng Tối Ưu Cho <span style={{ color: AMD_RED }}>AMD Cloud</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              AMD EPYC phát huy tối đa sức mạnh với các workload multi-threaded và memory-intensive
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-[#ED1C24]/20 hover:border-[#ED1C24]/40 transition-all"
                data-testid={`usecase-card-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: AMD_RED }}
                  >
                    <useCase.icon className="text-white w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.benefits.map((benefit, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${AMD_RED}30`, color: '#ff6b6b' }}
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="amd-packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Gói Dịch Vụ <span style={{ color: AMD_RED }}>Cloud AMD</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chọn cấu hình AMD EPYC phù hợp với nhu cầu - Tất cả đều bao gồm AMD SEV security và hỗ trợ 24/7
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl p-6 ${
                  pkg.popular 
                    ? 'text-white ring-4 ring-[#ED1C24]/50 scale-105' 
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
                style={pkg.popular ? { backgroundColor: AMD_RED } : {}}
                data-testid={`card-package-${pkg.name.toLowerCase().replace(' ', '-')}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3" />
                      BEST VALUE
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-black mb-1">{pkg.name}</h3>
                  <div className={`text-xs font-medium ${pkg.popular ? 'text-white/80' : 'text-gray-500'}`}>
                    {pkg.processor}
                  </div>
                  <div className={`text-xs ${pkg.popular ? 'text-white/70' : 'text-gray-400'}`}>
                    {pkg.cores}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-black">{pkg.price}</span>
                  </div>
                  <span className={`text-sm ${pkg.popular ? 'text-white/80' : 'text-gray-500'}`}>{pkg.priceUnit}</span>
                </div>

                <p className={`text-xs text-center mb-4 ${pkg.popular ? 'text-white/80' : 'text-gray-500'}`}>
                  {pkg.suitable}
                </p>

                {/* Specs */}
                <div className={`rounded-xl p-3 mb-4 text-xs space-y-1 ${pkg.popular ? 'bg-white/20' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3" />
                    <span className="truncate">{pkg.specs.cpu.split(' ')[0]} {pkg.specs.cpu.split(' ')[1]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-3 h-3" />
                    <span>{pkg.specs.ram} | {pkg.specs.ssd}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 text-xs">
                  {pkg.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${pkg.popular ? 'text-white' : ''}`} style={!pkg.popular ? { color: AMD_RED } : {}} />
                      <span className={pkg.popular ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, package: pkg.name }));
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-5 font-bold rounded-xl transition-all ${
                    pkg.popular 
                      ? 'bg-white hover:bg-gray-100' 
                      : 'text-white hover:opacity-90'
                  }`}
                  style={pkg.popular ? { color: AMD_RED } : { backgroundColor: AMD_RED }}
                  data-testid={`button-select-${pkg.name.toLowerCase().replace(' ', '-')}`}
                >
                  Chọn Gói Này
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form - AMD Theme */}
      <section id="contact-form" className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a0000 50%, #0a0a0a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: `${AMD_RED}20`, border: `1px solid ${AMD_RED}40` }}>
              <Headphones className="w-4 h-4" style={{ color: AMD_RED }} />
              <span className="font-semibold text-sm" style={{ color: AMD_RED }}>Tư vấn miễn phí 24/7</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Tư Vấn <span style={{ color: AMD_RED }}>Cloud AMD</span> Miễn Phí
            </h2>
            <p className="text-lg text-gray-400">
              Để lại thông tin để chuyên gia tư vấn cấu hình AMD phù hợp nhất
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập họ và tên"
                    required
                    className="border-gray-300 focus:border-[#ED1C24] focus:ring-[#ED1C24]"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Nhập email"
                    required
                    className="border-gray-300 focus:border-[#ED1C24] focus:ring-[#ED1C24]"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại *</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Nhập số điện thoại"
                    required
                    className="border-gray-300 focus:border-[#ED1C24] focus:ring-[#ED1C24]"
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tên công ty</label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Nhập tên công ty"
                    className="border-gray-300 focus:border-[#ED1C24] focus:ring-[#ED1C24]"
                    data-testid="input-company"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Use case chính</label>
                  <Select value={formData.useCase} onValueChange={(value) => setFormData(prev => ({ ...prev, useCase: value }))}>
                    <SelectTrigger data-testid="select-usecase" className="border-gray-300 focus:border-[#ED1C24] focus:ring-[#ED1C24]">
                      <SelectValue placeholder="Chọn use case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="database">Database & Analytics</SelectItem>
                      <SelectItem value="virtualization">Virtualization & Containers</SelectItem>
                      <SelectItem value="bigdata">Big Data & HPC</SelectItem>
                      <SelectItem value="webapp">Web Applications</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gói quan tâm</label>
                  <Select value={formData.package} onValueChange={(value) => setFormData(prev => ({ ...prev, package: value }))}>
                    <SelectTrigger data-testid="select-package" className="border-gray-300 focus:border-[#ED1C24] focus:ring-[#ED1C24]">
                      <SelectValue placeholder="Chọn gói dịch vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AMD Starter">AMD Starter</SelectItem>
                      <SelectItem value="AMD Pro">AMD Pro</SelectItem>
                      <SelectItem value="AMD Enterprise">AMD Enterprise</SelectItem>
                      <SelectItem value="AMD Ultra">AMD Ultra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full text-white font-bold text-lg py-6 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: AMD_RED }}
                data-testid="button-submit"
              >
                Gửi Yêu Cầu Tư Vấn
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg text-gray-600">
              Tìm hiểu thêm về <span style={{ color: AMD_RED }} className="font-bold">Cloud AMD</span> và AMD EPYC
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-xl border border-gray-200 px-6 shadow-sm hover:border-[#ED1C24]/30 transition-all"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-bold text-gray-900 hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - AMD Theme */}
      <section className="py-20 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%)' }}>
        {/* AMD Arrow Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,0 100,50 50,100 0,50" fill={AMD_RED} />
            </svg>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl" style={{ backgroundColor: AMD_RED }}>
              <span className="text-white font-black text-2xl">AMD</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Sẵn Sàng Trải Nghiệm Sức Mạnh <span style={{ color: AMD_RED }}>AMD</span>?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Đội ngũ chuyên gia STEP sẵn sàng tư vấn cấu hình AMD Cloud tối ưu cho workload của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="text-white font-bold text-lg px-8 py-6 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: AMD_RED }}
                onClick={() => document.getElementById('amd-packages')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-cta-packages"
              >
                <Cpu className="mr-2 w-5 h-5" />
                Xem Gói AMD Cloud
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-xl"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-cta-contact"
              >
                <Headphones className="mr-2 w-5 h-5" />
                Liên Hệ Tư Vấn
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Server Configurator Section */}
      <section id="server-configurator" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)' }}>
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: `${AMD_RED}20`, border: `1px solid ${AMD_RED}40` }}>
            <Settings className="w-4 h-4" style={{ color: AMD_RED }} />
            <span className="font-semibold text-sm" style={{ color: AMD_RED }}>Tùy chỉnh linh hoạt</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
            Cấu Hình <span style={{ color: AMD_RED }}>Cloud AMD</span> Server
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Tùy chỉnh cấu hình AMD EPYC theo nhu cầu của bạn
          </p>
        </div>
        <div className="bg-gray-50 rounded-t-3xl">
          <div className="py-12">
            <ServerConfigurator />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
