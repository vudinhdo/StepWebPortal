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
      icon: MonitorSmartphone,
      title: "Web Applications",
      description: "Hosting nhiều websites, applications với performance ổn định và chi phí tối ưu",
      benefits: ["High-density hosting", "Load balancing", "Auto-scaling ready"]
    }
  ];

  const comparisons = [
    {
      feature: "Số cores tối đa (1 socket)",
      amd: "128 cores",
      intel: "60 cores",
      winner: "amd"
    },
    {
      feature: "Threads tối đa",
      amd: "256 threads",
      intel: "120 threads",
      winner: "amd"
    },
    {
      feature: "Memory channels",
      amd: "12 channels",
      intel: "8 channels",
      winner: "amd"
    },
    {
      feature: "PCIe lanes",
      amd: "128 lanes PCIe 5.0",
      intel: "80 lanes PCIe 5.0",
      winner: "amd"
    },
    {
      feature: "TDP efficiency",
      amd: "Tốt hơn (7nm/5nm)",
      intel: "Trung bình (10nm)",
      winner: "amd"
    },
    {
      feature: "Giá thành",
      amd: "Thấp hơn 20-30%",
      intel: "Cao hơn",
      winner: "amd"
    },
    {
      feature: "Memory encryption",
      amd: "AMD SEV/SEV-ES",
      intel: "Intel SGX",
      winner: "tie"
    }
  ];

  const faqs = [
    {
      question: "AMD EPYC khác gì so với Intel Xeon?",
      answer: "AMD EPYC cung cấp nhiều cores hơn (lên đến 128 cores vs 60 cores của Intel), nhiều PCIe lanes hơn (128 vs 80), và giá thành thấp hơn 20-30%. EPYC sử dụng công nghệ chiplet tiên tiến và process 7nm/5nm, mang lại hiệu năng/watt tốt hơn."
    },
    {
      question: "Cloud AMD phù hợp với workload nào?",
      answer: "Cloud AMD đặc biệt phù hợp với: Multi-threaded applications (databases, virtualization), High-core-count workloads (HPC, rendering), Cost-sensitive deployments, Containerized environments (Kubernetes, Docker), và Memory-intensive applications."
    },
    {
      question: "AMD SEV là gì và tại sao quan trọng?",
      answer: "AMD SEV (Secure Encrypted Virtualization) mã hóa memory của từng VM riêng biệt. Điều này có nghĩa ngay cả hypervisor cũng không thể đọc dữ liệu của VM, bảo vệ khỏi các tấn công từ cloud provider hoặc các tenant khác."
    },
    {
      question: "Có thể migrate từ Intel sang AMD không?",
      answer: "Có, hầu hết ứng dụng chạy trên Intel đều tương thích 100% với AMD mà không cần thay đổi code. Đội ngũ STEP sẽ hỗ trợ migration miễn phí và đảm bảo zero downtime."
    },
    {
      question: "Hiệu năng AMD có ổn định không?",
      answer: "AMD EPYC đã được các hyperscaler lớn như AWS, Google Cloud, Microsoft Azure sử dụng rộng rãi. Các benchmark độc lập (SPECrate, Geekbench) đều cho thấy AMD vượt trội trong multi-threaded workloads."
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
      
      {/* Hero Section - AMD Branding với màu đỏ/cam đặc trưng */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-gray-950 via-red-950 to-orange-950 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* AMD Badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-full px-4 py-2 mb-6">
                <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Cpu className="w-3 h-3 text-white" />
                </div>
                <span className="text-red-200 text-sm font-medium">AMD EPYC Powered Cloud</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Cloud AMD{" "}
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  Hiệu Năng Vượt Trội
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                Tận dụng sức mạnh AMD EPYC với nhiều cores hơn, giá tốt hơn. 
                Lý tưởng cho database, virtualization, HPC và các workload multi-threaded.
              </p>
              
              {/* AMD Highlights */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="bg-red-500/20 border border-red-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-red-300">
                  ✓ Lên đến 128 Cores
                </div>
                <div className="bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-orange-300">
                  ✓ Tiết kiệm 30% chi phí
                </div>
                <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-yellow-300">
                  ✓ AMD SEV Security
                </div>
              </div>

              {/* Performance Badge */}
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-red-300">Best Performance/Price</div>
                    <div className="text-sm text-gray-400">Nhiều cores hơn, giá thành tốt hơn Intel tương đương</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-red-500/20"
                  onClick={() => document.getElementById('amd-packages')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-view-packages"
                >
                  <Cpu className="mr-2 w-5 h-5" />
                  Xem Gói AMD Cloud
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-contact"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Tư Vấn Miễn Phí
                </Button>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-red-500/30 rounded-full px-4 py-2 mb-4">
                    <Award className="w-5 h-5 text-red-400" />
                    <span className="font-semibold text-red-300">AMD EPYC Advantage</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border border-red-400/20" data-testid="stat-cores">
                    <div className="text-3xl font-bold text-white mb-1">128</div>
                    <div className="text-red-200 text-sm">Cores/Socket</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border border-red-400/20" data-testid="stat-saving">
                    <div className="text-3xl font-bold text-white mb-1">30%</div>
                    <div className="text-red-200 text-sm">Cost Saving</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border border-red-400/20" data-testid="stat-pcie">
                    <div className="text-3xl font-bold text-white mb-1">128</div>
                    <div className="text-red-200 text-sm">PCIe 5.0 Lanes</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border border-red-400/20" data-testid="stat-uptime">
                    <div className="text-3xl font-bold text-white mb-1">99.99%</div>
                    <div className="text-red-200 text-sm">Uptime SLA</div>
                  </div>
                </div>

                {/* Processor Pills */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <span className="bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-xs">EPYC Genoa</span>
                  <span className="bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-xs">Zen 4</span>
                  <span className="bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-xs">DDR5</span>
                  <span className="bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-xs">PCIe 5.0</span>
                </div>
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn AMD Cloud?
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
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-red-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <advantage.icon className="text-white w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {advantage.description}
                    </p>
                    <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AMD EPYC vs Intel Xeon
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
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Tiêu Chí</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        AMD EPYC
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        Intel Xeon
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                      <td className={`px-6 py-4 text-center ${row.winner === 'amd' ? 'bg-green-50' : ''}`}>
                        <div className="flex items-center justify-center gap-2">
                          {row.winner === 'amd' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          <span className={row.winner === 'amd' ? 'font-semibold text-green-700' : 'text-gray-600'}>{row.amd}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-center ${row.winner === 'intel' ? 'bg-green-50' : ''}`}>
                        <div className="flex items-center justify-center gap-2">
                          {row.winner === 'intel' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          <span className={row.winner === 'intel' ? 'font-semibold text-green-700' : 'text-gray-600'}>{row.intel}</span>
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

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ứng Dụng Tối Ưu Cho AMD Cloud
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
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
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="text-white w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{useCase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.benefits.map((benefit, idx) => (
                        <span key={idx} className="bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-xs">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gói Dịch Vụ Cloud AMD
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
                    ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white ring-4 ring-red-300 scale-105' 
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
                data-testid={`card-package-${pkg.name.toLowerCase().replace(' ', '-')}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      BEST VALUE
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                  <div className={`text-xs font-medium ${pkg.popular ? 'text-white/80' : 'text-gray-500'}`}>
                    {pkg.processor}
                  </div>
                  <div className={`text-xs ${pkg.popular ? 'text-white/70' : 'text-gray-400'}`}>
                    {pkg.cores}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">{pkg.price}</span>
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
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${pkg.popular ? 'text-white' : 'text-green-500'}`} />
                      <span className={pkg.popular ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, package: pkg.name }));
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-5 font-semibold rounded-xl ${
                    pkg.popular 
                      ? 'bg-white text-red-600 hover:bg-gray-100' 
                      : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white'
                  }`}
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

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-gray-900 via-red-950 to-orange-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tư Vấn Cloud AMD Miễn Phí
            </h2>
            <p className="text-lg text-gray-300">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập họ và tên"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Nhập email"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Nhập số điện thoại"
                    required
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên công ty</label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Nhập tên công ty"
                    data-testid="input-company"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Use case chính</label>
                  <Select value={formData.useCase} onValueChange={(value) => setFormData(prev => ({ ...prev, useCase: value }))}>
                    <SelectTrigger data-testid="select-usecase">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gói quan tâm</label>
                  <Select value={formData.package} onValueChange={(value) => setFormData(prev => ({ ...prev, package: value }))}>
                    <SelectTrigger data-testid="select-package">
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
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold text-lg py-6 rounded-xl"
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg text-gray-600">
              Tìm hiểu thêm về Cloud AMD và AMD EPYC
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
                  className="bg-white rounded-xl border border-gray-200 px-6 shadow-sm"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
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

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-950 via-red-950 to-orange-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Cpu className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn Sàng Trải Nghiệm Sức Mạnh AMD?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Đội ngũ chuyên gia STEP sẵn sàng tư vấn cấu hình AMD Cloud tối ưu cho workload của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold text-lg px-8 py-6 rounded-xl"
                onClick={() => document.getElementById('amd-packages')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-cta-packages"
              >
                <Cpu className="mr-2 w-5 h-5" />
                Xem Gói AMD Cloud
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-xl"
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
      <section id="server-configurator" className="bg-gray-950">
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
            Cấu Hình Cloud AMD Server
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
